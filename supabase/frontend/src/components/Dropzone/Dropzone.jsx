import { useId, useRef, useState } from 'react';
import styles from './Dropzone.module.css';

/**
 * Drag-and-drop + click-to-browse file input.
 * @param {{
 *   onFile: (file: File) => void,
 *   disabled?: boolean,
 *   error?: string | null,
 *   accept?: string,
 * }} props
 */
export function Dropzone({ onFile, disabled = false, error = null, accept = 'image/*' }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const labelId = useId();

  function pickFile(file) {
    if (!file) return;
    onFile(file);
  }

  function handleClick() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleKeyDown(event) {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }

  function handleDragOver(event) {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    pickFile(file);
  }

  function handleChange(event) {
    const file = event.target.files?.[0];
    pickFile(file);
    // Allow the same file to be re-picked
    event.target.value = '';
  }

  const classes = [
    styles.zone,
    isDragging ? styles.dragging : '',
    disabled ? styles.disabled : '',
    error ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-labelledby={labelId}
      aria-disabled={disabled}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className={styles.input}
        tabIndex={-1}
        aria-hidden="true"
        disabled={disabled}
      />
      <div className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V4" />
          <path d="m6 10 6-6 6 6" />
          <path d="M5 20h14" />
        </svg>
      </div>
      <p id={labelId} className={styles.title}>
        {isDragging ? 'Drop to upload' : 'Drop an image, or click to browse'}
      </p>
      <p className={styles.hint}>JPG, PNG, WEBP, or GIF — up to 10 MB</p>
    </div>
  );
}
