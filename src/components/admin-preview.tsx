"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { signOutAction } from "@/app/admin/auth-actions";
import {
  createStaffAccountAction,
  setStaffAccountStateAction,
  updateStaffRoleAction,
} from "@/app/admin/team-actions";
import { MaterialIcon } from "@/components/material-icon";
import { allowedAdminPages, staffRoleLabels, type StaffRole } from "@/lib/auth/permissions";
import type { StaffIdentity } from "@/lib/auth/session";
import type { ManagedStaffAccount } from "@/lib/auth/staff-management";
import type { AdminPage } from "@/lib/site";

const roleDescriptions: Record<StaffRole, string> = {
  administrator: "Full access to every administration section.",
  staff: "Day-to-day event, exhibitor and request access.",
  organizer: "Read-only access to event, exhibitor and floor-plan sections.",
};

const navItems: Array<[AdminPage, string, string]> = [
  ["dashboard", "space_dashboard", "Overview"],
  ["event", "event", "Event information"],
  ["exhibitors", "storefront", "Exhibitors"],
  ["floor-plan", "map", "Floor plan"],
  ["requests", "inbox", "Form requests"],
  ["team", "group", "Team access"],
];

export type DashboardStatus = {
  newRequests: number;
  ticketUrlSet: boolean;
  floorPlanPublished: boolean;
  eventPublished: boolean;
  exhibitorCount: number;
};

function PageHead({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children ? <div className="head-actions">{children}</div> : null}
    </div>
  );
}

function Dashboard({ allowed, status }: { allowed: AdminPage[]; status: DashboardStatus }) {
  const cards: Array<[AdminPage, string, string, string]> = [
    ["exhibitors", "storefront", "Exhibitors", "Add, update, reorder or remove participating exhibitors."],
    ["floor-plan", "map", "Floor plan", "Replace the public floor plan."],
    ["event", "event", "Event information", "Dates, location, opening hours, ticket link and visitor information."],
    ["requests", "inbox", "Form requests", "Read and follow up website submissions."],
    ["team", "group", "Team access", "Create staff accounts and manage roles."],
  ];

  return (
    <div className="admin-page">
      <PageHead title="Administration panel" text="Manage the public website content for Rijswijk 2026.">
        <Link className="admin-btn admin-btn--outline" href="/en" target="_blank">
          Open website <MaterialIcon name="open_in_new" />
        </Link>
      </PageHead>
      <div className="metric-grid">
        {cards
          .filter(([page]) => allowed.includes(page))
          .map(([page, icon, title, text]) => (
            <Link className="metric" href={`/admin/${page}`} key={page}>
              <div className="metric-top">
                <MaterialIcon className="metric-icon" name={icon} />
                <small>
                  Open <MaterialIcon name="arrow_forward" />
                </small>
              </div>
              <b>{title}</b>
              <span>{text}</span>
            </Link>
          ))}
      </div>
      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Current website state</h2>
          </div>
          <div className="panel-body">
            <div className="status-list">
              <div className="status-item">
                <span>Event publication</span>
                <b className={`status ${status.eventPublished ? "status--success" : "status--draft"}`}>
                  {status.eventPublished ? "Published" : "Draft"}
                </b>
              </div>
              <div className="status-item">
                <span>Active exhibitors</span>
                <b className={`status ${status.exhibitorCount ? "status--success" : "status--warning"}`}>
                  {status.exhibitorCount}
                </b>
              </div>
              <div className="status-item">
                <span>Managed floor plan</span>
                <b className={`status ${status.floorPlanPublished ? "status--success" : "status--draft"}`}>
                  {status.floorPlanPublished ? "Published" : "Bundled plan"}
                </b>
              </div>
            </div>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Attention needed</h2>
          </div>
          <div className="panel-body">
            <div className="status-list">
              <div className="status-item">
                <span>External ticketing link</span>
                <b className={`status ${status.ticketUrlSet ? "status--success" : "status--danger"}`}>
                  {status.ticketUrlSet ? "Configured" : "Missing"}
                </b>
              </div>
              <div className="status-item">
                <span>Unread form requests</span>
                <b className={`status ${status.newRequests ? "status--warning" : "status--success"}`}>
                  {status.newRequests}
                </b>
              </div>
            </div>
            {status.ticketUrlSet ? null : (
              <p className="helper">
                Add the ticket platform URL on the Event information page. Until then the public ticket button stays
                hidden.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const teamNotices = {
  created: "The staff account was created. Share the initial password through a secure channel.",
  updated: "The staff role was updated.",
  state: "The staff access state was updated.",
  error: "We could not complete that account change. Check the fields and try again.",
} as const;

function TeamPage({ accounts, notice }: { accounts: ManagedStaffAccount[]; notice?: string }) {
  const message = notice && notice in teamNotices ? teamNotices[notice as keyof typeof teamNotices] : null;

  return (
    <div className="admin-page">
      <PageHead title="Team access" text="Create and manage operational staff accounts without terminal commands." />
      {message ? (
        <p
          className={`auth-message ${notice === "error" ? "auth-message--error" : "auth-message--success"}`}
          role={notice === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
      <div className="admin-grid staff-access-grid">
        <form action={createStaffAccountAction} className="form-panel">
          <h2>Add staff account</h2>
          <p className="helper staff-access__intro">
            The initial Administrator is protected and must remain provisioned by the secure setup script.
          </p>
          <div className="form-row">
            <div className="admin-field">
              <label htmlFor="staff-display-name">Full name</label>
              <input autoComplete="name" id="staff-display-name" maxLength={100} name="displayName" required />
            </div>
            <div className="admin-field">
              <label htmlFor="staff-role">Role</label>
              <select defaultValue="staff" id="staff-role" name="role">
                <option value="staff">Employee / Staff</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label htmlFor="new-staff-email">Email address</label>
            <input autoComplete="email" id="new-staff-email" maxLength={254} name="email" required type="email" />
          </div>
          <div className="admin-field">
            <label htmlFor="new-staff-password">Initial password</label>
            <input
              autoComplete="new-password"
              id="new-staff-password"
              minLength={12}
              name="password"
              required
              type="password"
            />
            <p className="helper">At least 12 characters. It is never displayed again after creation.</p>
          </div>
          <button className="admin-btn admin-btn--primary" type="submit">
            <MaterialIcon name="person_add" /> Create account
          </button>
        </form>
        <aside>
          <div className="side-card">
            <h3>Access policy</h3>
            <div className="status-list">
              <div className="status-item">
                <span>Administrator bootstrap</span>
                <b className="status status--draft">Script only</b>
              </div>
              <div className="status-item">
                <span>Roles available here</span>
                <b className="status status--success">2 roles</b>
              </div>
              <div className="status-item">
                <span>Public registration</span>
                <b className="status status--danger">Disabled</b>
              </div>
            </div>
          </div>
          <div className="side-card">
            <h3>Password delivery</h3>
            <p className="helper">
              Share the initial password through a secure channel. Email invitations require Supabase SMTP
              configuration on the remote project.
            </p>
          </div>
        </aside>
      </div>
      <section className="table-panel staff-account-table">
        <div className="table-tools">
          <div>
            <b>Staff accounts</b>
            <p className="helper">
              Roles and active access are checked on the server for every administration request.
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Role</th>
              <th>Access</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => {
              const protectedAccount = account.role === "administrator";
              return (
                <tr key={account.userId}>
                  <td>
                    <div className="table-identity">
                      <span className="mini-logo">{account.displayName.slice(0, 2).toUpperCase()}</span>
                      <span>
                        <strong>{account.displayName}</strong>
                        <small>{account.email}</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    {protectedAccount ? (
                      <span className="status status--draft">Administrator</span>
                    ) : (
                      <form action={updateStaffRoleAction} className="staff-account-action">
                        <input name="userId" type="hidden" value={account.userId} />
                        <select
                          aria-label={`Role for ${account.displayName}`}
                          defaultValue={account.role}
                          name="role"
                        >
                          <option value="staff">Employee / Staff</option>
                          <option value="organizer">Organizer</option>
                        </select>
                        <button className="admin-btn admin-btn--outline" type="submit">
                          Save
                        </button>
                      </form>
                    )}
                  </td>
                  <td>
                    <span className={`status ${account.isActive ? "status--success" : "status--danger"}`}>
                      {account.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(account.createdAt))}</td>
                  <td>
                    {protectedAccount ? (
                      <span className="helper">Protected</span>
                    ) : (
                      <form action={setStaffAccountStateAction}>
                        <input name="userId" type="hidden" value={account.userId} />
                        <input name="activeState" type="hidden" value={account.isActive ? "inactive" : "active"} />
                        <button
                          className={`admin-btn ${account.isActive ? "admin-btn--danger" : "admin-btn--primary"}`}
                          type="submit"
                        >
                          <MaterialIcon name={account.isActive ? "person_off" : "person_check"} />{" "}
                          {account.isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export function AdminPreview({
  page,
  staff,
  accounts = [],
  status,
  notice,
  content,
}: {
  page: AdminPage;
  staff: StaffIdentity;
  accounts?: ManagedStaffAccount[];
  status: DashboardStatus;
  notice?: string;
  content?: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const allowed = [...allowedAdminPages(staff.role)];
  const initials = staff.displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="admin-app" data-authenticated-admin="true">
      <aside className={`sidebar${sidebarOpen ? " is-open" : ""}`} id="admin-sidebar">
        <div className="admin-logo">
          <Image src="/assets/health-beauty-expo-logo.png" alt="Health and Beauty Expo" width={200} height={104} />
          <span>STAFF ADMIN</span>
        </div>
        <nav className="side-nav" aria-label="Staff administration">
          <p>Panel</p>
          {navItems
            .filter(([target]) => allowed.includes(target))
            .map(([target, icon, label]) => (
              <Link className={target === page ? "is-active" : ""} href={`/admin/${target}`} key={target}>
                <MaterialIcon name={icon} />
                {label}
                {target === "requests" && status.newRequests > 0 ? <i>{status.newRequests}</i> : null}
              </Link>
            ))}
        </nav>
        <div className="sidebar-foot">
          <div className="avatar">{initials || "ST"}</div>
          <p>
            <b>{staff.displayName}</b>
            <span>{staffRoleLabels[staff.role]}</span>
          </p>
          <form action={signOutAction}>
            <button aria-label="Sign out" type="submit">
              <MaterialIcon name="logout" />
            </button>
          </form>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            aria-controls="admin-sidebar"
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Close administration navigation" : "Open administration navigation"}
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((open) => !open)}
            type="button"
          >
            <MaterialIcon name="menu" />
          </button>
          <div className="topbar-context">
            <span>Health &amp; Beauty Expo</span>
            <b>Rijswijk 2026</b>
          </div>
          <div className="topbar-actions">
            <span className="prototype-chip">{staffRoleLabels[staff.role]}</span>
            <Link href="/en" target="_blank">
              View website <MaterialIcon name="open_in_new" />
            </Link>
          </div>
        </header>
        <div className="role-context">
          <b>{staffRoleLabels[staff.role]}</b>
          <span>{roleDescriptions[staff.role]}</span>
          <i>{staff.email}</i>
        </div>
        {content ?? (page === "team" ? (
          <TeamPage accounts={accounts} notice={notice} />
        ) : (
          <Dashboard allowed={allowed} status={status} />
        ))}
      </div>
    </div>
  );
}
