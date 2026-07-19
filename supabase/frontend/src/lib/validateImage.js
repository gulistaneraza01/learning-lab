// Client-side image validation. Mirrors what the backend should also enforce.
// Returns null on success, or a user-facing error message on failure.

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function validateImage(file) {
  if (!file) return 'No file selected.';

  if (!ALLOWED_TYPES.has(file.type)) {
    return `Unsupported file type "${file.type || 'unknown'}". Allowed: JPG, PNG, WEBP, GIF.`;
  }

  if (file.size > MAX_BYTES) {
    const sizeMb = (file.size / 1024 / 1024).toFixed(1);
    return `File is ${sizeMb} MB — limit is 10 MB.`;
  }

  if (file.size === 0) {
    return 'File is empty.';
  }

  return null;
}
