import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnvironment } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export function createClient() {
  const { publishableKey, url } = getSupabaseEnvironment();
  return createBrowserClient<Database>(url, publishableKey);
}
