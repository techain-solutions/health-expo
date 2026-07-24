import { cp, mkdir, rm } from "node:fs/promises";

const files = [
  "index.html",
  "styles.css",
  "script.js",
  "admin.html",
  "admin.css",
  "admin.js",
  "og.png",
  "assets",
  "downloads"
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

for (const file of files) {
  await cp(file, `dist/${file}`, { recursive: true });
}

console.log("Built client-approval prototype in dist/.");
