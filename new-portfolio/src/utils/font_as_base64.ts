export function loadFontAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const base64String = arrayBufferToBase64(buffer);
        resolve(base64String);
      })
      .catch((error) => reject(error));
  });
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binary);
}
