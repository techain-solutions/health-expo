import Image from "next/image";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/auth-actions";
import { MaterialIcon } from "@/components/material-icon";
import { getStaffAuthState } from "@/lib/auth/dal";
import { hasSupabaseEnvironment } from "@/lib/supabase/config";

type LoginSearchParams = {
  error?: string;
  next?: string;
  signedOut?: string;
};

export const metadata = {
  title: "Staff sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<LoginSearchParams>;
}) {
  const params = await searchParams;
  const { staff } = await getStaffAuthState();
  if (staff) redirect(params.next ?? "/admin");

  const configured = hasSupabaseEnvironment();
  const error =
    params.error === "configuration"
      ? "Authentication is not configured for this environment."
      : params.error === "invalid"
        ? "The email or password is incorrect, or this account cannot access the administration."
        : null;

  return (
    <main className="login-preview">
      <section className="login-art" aria-label="Health and Beauty Expo">
        <h1>Secure event administration.</h1>
        <p>Authorized staff can access the focused Rijswijk 2026 management workspace.</p>
      </section>
      <section className="login-form">
        <div className="login-card">
          <Image
            alt="Health and Beauty Expo"
            height={104}
            priority
            src="/assets/health-beauty-expo-logo.png"
            width={200}
          />
          <h2>Staff sign in</h2>
          <p>Use the account provisioned for you by the project administrator.</p>
          {params.signedOut === "1" ? (
            <p className="auth-message auth-message--success" role="status">
              You have been signed out.
            </p>
          ) : null}
          {error ? (
            <p className="auth-message auth-message--error" role="alert">
              {error}
            </p>
          ) : null}
          <form action={loginAction}>
            <input name="next" type="hidden" value={params.next ?? "/admin"} />
            <div className="admin-field">
              <label htmlFor="staff-email">Email address</label>
              <input
                autoComplete="username"
                disabled={!configured}
                id="staff-email"
                maxLength={254}
                name="email"
                required
                type="email"
              />
            </div>
            <div className="admin-field">
              <label htmlFor="staff-password">Password</label>
              <input
                autoComplete="current-password"
                disabled={!configured}
                id="staff-password"
                maxLength={1024}
                minLength={12}
                name="password"
                required
                type="password"
              />
            </div>
            <button className="admin-btn admin-btn--primary" disabled={!configured} type="submit">
              Sign in <MaterialIcon name="login" />
            </button>
          </form>
          <p className="auth-support">
            Public registration is disabled.
            <br />
            Contact the project administrator if you need an account.
          </p>
        </div>
      </section>
    </main>
  );
}
