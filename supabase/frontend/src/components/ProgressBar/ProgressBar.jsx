import { useId } from 'react';
import styles from './ProgressBar.module.css';

/**
 * ARIA-correct progress bar.
 * @param {{ value: number, label?: string }} props
 */
export function ProgressBar({ value, label = 'Uploading' }) {
  const id = useId();
  const safe = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <label htmlFor={id} className={styles.label}>{label}</label>
        <span className={styles.pct} aria-hidden="true">{safe}%</span>
      </div>
      <div
        id={id}
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${safe} percent`}
        className={styles.track}
      >
        <div className={styles.fill} style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}
