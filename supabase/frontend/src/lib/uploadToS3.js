/**
 * Upload a File to a pre-signed URL with real progress events.
 * Uses XHR because fetch() does not expose upload progress.
 *
 * @param {string} url       Pre-signed PUT URL.
 * @param {File}   file      The file to send.
 * @param {{ onProgress?: (pct: number) => void }} [opts]
 * @returns {Promise<void>}  Resolves on 2xx; rejects on any failure.
 */
export function uploadToS3(url, file, { onProgress } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url);
    // Supabase's pre-signed URL is signed for a specific Content-Type —
    // sending the wrong one yields a 403 SignatureDoesNotMatch.
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && typeof onProgress === 'function') {
        const pct = Math.round((event.loaded / event.total) * 100);
        onProgress(pct);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(
          new Error(
            `Upload failed (${xhr.status} ${xhr.statusText}). Check the bucket exists, is public-readable, and the Content-Type matches the signed request.`
          )
        );
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload — check your connection.'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted.'));
    });

    xhr.send(file);
  });
}
