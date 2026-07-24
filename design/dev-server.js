import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf"
};

createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    const requestedFile = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const sourcePath = resolve(root, requestedFile);
    if (!sourcePath.startsWith(`${resolve(root)}/`)) throw new Error("Invalid path");
    const content = await readFile(sourcePath);
    response.writeHead(200, {
      "content-type": mime[extname(sourcePath)] || "application/octet-stream",
      "x-content-type-options": "nosniff",
      "cache-control": [".html", ".css", ".js"].includes(extname(sourcePath)) ? "no-cache" : "public, max-age=3600"
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Local URL: http://127.0.0.1:${port}`);
});
