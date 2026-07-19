export function uploadToS3(url, file, { onProgress } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url);
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
        const body = xhr.responseText || '(no response body)';
        reject(
          new Error(
            `Upload failed (${xhr.status} ${xhr.statusText}): ${body}`
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
