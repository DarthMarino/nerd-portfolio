export function loadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Handle CORS issues
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg")); // Convert image to base64
      } else {
        reject(new Error("Canvas context not available"));
      }
    };
    img.onerror = (error) => reject(error);
    img.src = url; // URL to your image
  });
}
