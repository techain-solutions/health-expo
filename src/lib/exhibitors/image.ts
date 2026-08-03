const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export const exhibitorImageMaxBytes = 5 * 1024 * 1024;

export function validateExhibitorImage(file: File | null) {
  if (!file || file.size === 0) return null;
  if (file.size > exhibitorImageMaxBytes) throw new Error("Image exceeds 5 MB");
  const extension = allowedImageTypes.get(file.type);
  if (!extension) throw new Error("Unsupported exhibitor image type");
  return { contentType: file.type, extension };
}
