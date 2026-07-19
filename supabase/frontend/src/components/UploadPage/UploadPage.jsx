import { useEffect, useRef, useState } from 'react';
import { Dropzone } from '../Dropzone/Dropzone.jsx';
import { ProgressBar } from '../ProgressBar/ProgressBar.jsx';
import { getPreSignedUrl } from '../../lib/api.js';
import { uploadToS3 } from '../../lib/uploadToS3.js';
import { validateImage } from '../../lib/validateImage.js';
import styles from './UploadPage.module.css';

const PUBLIC_BASE = import.meta.env.VITE_SUPABASE_PUBLIC_BASE;
const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

function buildPublicUrl(key) {
  if (!PUBLIC_BASE || !BUCKET) return null;
  return `${PUBLIC_BASE.replace(/\/$/, '')}/${BUCKET}/${key}`;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/**
 * Single-file image upload page.
 * State machine: idle → uploading(progress) → success | error
 */
export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [publicUrl, setPublicUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const xhrRef = useRef(null);

  // Revoke object URLs on unmount or when replaced
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function reset() {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setFile(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setStatus('idle');
    setProgress(0);
    setError(null);
    setPublicUrl(null);
    setCopied(false);
  }

  async function startUpload(picked) {
    const validationError = validateImage(picked);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    setStatus('uploading');
    setProgress(0);
    setError(null);
    setPublicUrl(null);
    setCopied(false);

    try {
      const { url, key } = await getPreSignedUrl({
        fileName: picked.name,
        fileType: picked.type,
      });

      await uploadToS3(url, picked, {
        onProgress: (pct) => setProgress(pct),
      });

      const finalUrl = buildPublicUrl(key);
      setPublicUrl(finalUrl);
      setProgress(100);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
      setStatus('error');
    }
  }

  async function handleCopy() {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked by the browser; non-fatal.
      setCopied(false);
    }
  }

  const isUploading = status === 'uploading';

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Supabase Storage</p>
          <h1 className={styles.title}>Upload an image</h1>
          <p className={styles.subtitle}>
            Drop a file below. It goes directly to your Supabase bucket — the backend
            only signs the upload, it never sees the file.
          </p>
        </header>

        <section className={styles.card} aria-labelledby="upload-card-title">
          <h2 id="upload-card-title" style={{ display: 'none' }}>
            Upload
          </h2>

          <Dropzone
            onFile={startUpload}
            disabled={isUploading}
            error={status === 'error' ? error : null}
          />

          {file && status !== 'idle' && (
            <div className={styles.previewWrap}>
              <img
                src={previewUrl}
                alt=""
                width="96"
                height="96"
                className={styles.preview}
              />
              <div className={styles.fileMeta}>
                <p className={styles.fileName} title={file.name}>{file.name}</p>
                <p className={styles.fileSize}>
                  {file.type} · {formatBytes(file.size)}
                </p>
              </div>
            </div>
          )}

          {isUploading && <ProgressBar value={progress} label="Uploading to Supabase" />}

          {status === 'error' && (
            <div className={styles.error} role="alert">
              <p className={styles.errorTitle}>Upload failed</p>
              <p className={styles.errorBody}>{error}</p>
              <div className={styles.actions}>
                <button type="button" className={`${styles.btn} ${styles.secondary}`} onClick={reset}>
                  Try again
                </button>
              </div>
            </div>
          )}

          {status === 'success' && publicUrl && (
            <div className={styles.success}>
              <div className={styles.successHeader}>
                <span className={styles.successBadge} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className={styles.successTitle}>Uploaded successfully</p>
              </div>
              <p className={styles.successMeta}>
                Your image is now publicly accessible at the URL below.
              </p>
              <div className={styles.urlRow}>
                <span className={styles.urlText} title={publicUrl}>{publicUrl}</span>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.secondary}`}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy URL'}
                </button>
                <a
                  className={`${styles.btn} ${styles.primary}`}
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.ghost}`}
                  onClick={reset}
                >
                  Upload another
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
