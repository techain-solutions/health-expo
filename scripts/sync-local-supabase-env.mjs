import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rawStatus = execFileSync("npx", ["supabase", "status", "--output", "json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "inherit"],
});
const status = JSON.parse(rawStatus);

const url = status.API_URL;
const publishableKey = status.PUBLISHABLE_KEY ?? status.ANON_KEY;
const serviceRoleKey = status.SERVICE_ROLE_KEY;

if (!url || !publishableKey || !serviceRoleKey) {
  throw new Error("The local Supabase stack did not return the required API keys.");
}

const contents = [
  "# Generated from the local Supabase stack. Do not commit this file.",
  `NEXT_PUBLIC_SUPABASE_URL=${url}`,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${publishableKey}`,
  `SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`,
  "",
].join("\n");

writeFileSync(resolve(".env.local"), contents, { encoding: "utf8", mode: 0o600 });
process.stdout.write("Local Supabase environment written to .env.local.\n");
