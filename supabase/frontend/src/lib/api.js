// Thin client for the backend's pre-signed URL endpoint.
// All app code goes through this — no component calls fetch() directly.

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // Fail fast at import time in dev so a missing env var is obvious,
  // not a confusing 404 at the first upload attempt.
  console.warn(
    '[upload] VITE_API_URL is not set. Check frontend/.env — copy from .env.example.'
  );
}

/**
 * Request a pre-signed S3 PUT URL from the backend.
 * @param {{ fileName: string, fileType: string }} args
 * @returns {Promise<{ url: string, key: string }>}
 */
export async function getPreSignedUrl({ fileName, fileType }) {
  const res = await fetch(`${API_URL}/api/v1/upload/pre-signed-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, fileType }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `Pre-sign request failed (${res.status} ${res.statusText}): ${text || 'no body'}`
    );
  }

  const json = await res.json();
  if (!json?.data?.url || !json?.data?.key) {
    throw new Error('Pre-sign response missing { data: { url, key } }');
  }

  return { url: json.data.url, key: json.data.key };
}
