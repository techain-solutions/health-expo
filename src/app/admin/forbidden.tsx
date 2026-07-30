import Link from "next/link";

import { signOutAction } from "@/app/admin/auth-actions";
import { MaterialIcon } from "@/components/material-icon";

export default function Forbidden() {
  return (
    <main className="auth-state">
      <section className="auth-state__card">
        <MaterialIcon className="auth-state__icon" name="lock" />
        <p className="auth-state__eyebrow">Access denied</p>
        <h1>You do not have permission to open this administration section.</h1>
        <p>Your account is signed in, but its active staff role does not allow this route.</p>
        <div className="auth-state__actions">
          <Link className="admin-btn admin-btn--primary" href="/admin">
            Return to dashboard
          </Link>
          <form action={signOutAction}>
            <button className="admin-btn admin-btn--outline" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
