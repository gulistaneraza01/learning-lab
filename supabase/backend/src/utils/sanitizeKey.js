export function sanitizeKey(fileName) {
  const ext = fileName.split('.').pop();
  const base = fileName.slice(0, -(ext.length + 1));
  const safe = base
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return safe ? `${safe}.${ext}` : `${Date.now()}.${ext}`;
}
