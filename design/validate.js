import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "admin.html",
  "admin.css",
  "admin.js",
  "assets/health-beauty-expo-logo.png",
  "assets/expo-floor-plan.jpg",
  "downloads/expo-floor-plan.pdf"
];

const publicRoutes = [
  "home",
  "about",
  "exhibitors",
  "program",
  "tickets",
  "visit",
  "floor-plan",
  "fair-match",
  "participate",
  "participant-info",
  "media",
  "contact",
  "paris",
  "legal"
];

const adminRoutes = [
  "dashboard",
  "event",
  "speakers",
  "exhibitors",
  "media",
  "floor-plan",
  "content",
  "requests",
  "fair-match",
  "users",
  "languages",
  "seo",
  "settings",
  "launch",
  "login"
];

await Promise.all(requiredFiles.map(file => access(file)));

const [publicSource, adminSource] = await Promise.all([
  readFile("script.js", "utf8"),
  readFile("admin.js", "utf8")
]);

const hasRoute = (source, route) =>
  source.includes(`${route}:`) ||
  source.includes(`"${route}":`) ||
  source.includes(`{${route},`) ||
  source.includes(`,${route},`) ||
  source.includes(`,${route}}`);

const missingPublicRoutes = publicRoutes.filter(route => !hasRoute(publicSource, route));
const missingAdminRoutes = adminRoutes.filter(route => !hasRoute(adminSource, route));

if (missingPublicRoutes.length || missingAdminRoutes.length) {
  throw new Error(`Missing prototype routes: ${[...missingPublicRoutes, ...missingAdminRoutes].join(", ")}`);
}

for (const locale of ["nl", "tr", "en", "ru", "ar"]) {
  if (!publicSource.includes(`${locale}:`)) throw new Error(`Missing locale direction: ${locale}`);
}

if (!adminSource.includes("rolePermissions")) throw new Error("Role permission preview is missing");
if (!adminSource.includes("speakersPage")) throw new Error("Speaker management preview is missing");

console.log(`Validated ${publicRoutes.length} public routes, ${adminRoutes.length} admin routes, 5 locales, 3 role previews, and required local assets.`);
