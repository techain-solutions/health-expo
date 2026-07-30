const requiredPublicVariables = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
] as const;

export function hasSupabaseEnvironment() {
  return requiredPublicVariables.every((name) => Boolean(process.env[name]));
}

export function getSupabaseEnvironment() {
  if (!hasSupabaseEnvironment()) {
    throw new Error("Supabase environment is not configured.");
  }

  return {
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  };
}
