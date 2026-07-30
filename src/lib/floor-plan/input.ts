const allowedTypes = new Map([
  ["application/pdf", "pdf"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export const floorPlanMaxBytes = 10 * 1024 * 1024;

export function validateFloorPlan(file: File | null) {
  if (!file || file.size === 0 || file.size > floorPlanMaxBytes) return null;
  const extension = allowedTypes.get(file.type);
  if (!extension || !/^[a-zA-Z0-9._ -]{1,180}$/.test(file.name)) return null;
  return { extension, contentType: file.type, originalName: file.name };
}
