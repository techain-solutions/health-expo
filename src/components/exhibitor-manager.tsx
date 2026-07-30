"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import { deleteExhibitorAction, saveExhibitorAction } from "@/app/admin/exhibitor-actions";
import { MaterialIcon } from "@/components/material-icon";

export type ExhibitorRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  website_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
};

const notices: Record<string, string> = {
  saved: "Exhibitor saved.",
  deleted: "Exhibitor deleted.",
  duplicate: "That slug is already used by another exhibitor. Choose a different one.",
  error: "Check the fields and try again.",
};

const successNotices = new Set(["saved", "deleted"]);

export function ExhibitorManager({
  items,
  editable,
  notice,
  selectedId,
  isNew,
}: {
  items: ExhibitorRow[];
  editable: boolean;
  notice?: string;
  selectedId?: string;
  isNew?: boolean;
}) {
  const selected = isNew ? undefined : items.find((item) => item.id === selectedId);
  const message = notice ? notices[notice] : undefined;
  const nextOrder = items.reduce((highest, item) => Math.max(highest, item.display_order), -1) + 1;

  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    const name = event.currentTarget.dataset.exhibitorName ?? "this exhibitor";
    if (!window.confirm(`Delete ${name}? This removes the exhibitor from the public website immediately.`)) {
      event.preventDefault();
    }
  }

  return (
    <div className="admin-page">
      <div className="page-head">
        <div>
          <h1>Exhibitors</h1>
          <p>Manage the public exhibitor directory.</p>
        </div>
        {editable ? (
          <div className="head-actions">
            <Link className="admin-btn admin-btn--primary" href="/admin/exhibitors?new=1">
              <MaterialIcon name="add" /> New exhibitor
            </Link>
          </div>
        ) : null}
      </div>
      {message ? (
        <p
          className={`auth-message ${successNotices.has(notice ?? "") ? "auth-message--success" : "auth-message--error"}`}
          role={successNotices.has(notice ?? "") ? "status" : "alert"}
        >
          {message}
        </p>
      ) : null}
      <div className="admin-grid">
        <section className="table-panel">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>State</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length ? (
                items.map((item) => (
                  <tr key={item.id} className={item.id === selected?.id ? "is-selected" : undefined}>
                    <td>
                      <strong>{item.name}</strong>
                      <br />
                      <small>{item.slug}</small>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`status ${item.is_active ? "status--success" : "status--draft"}`}>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                      {item.is_featured ? <span className="status status--warning">Featured</span> : null}
                    </td>
                    <td>{item.display_order}</td>
                    <td>
                      <div className="row-actions">
                        <Link
                          aria-label={`Edit ${item.name}`}
                          className="admin-btn admin-btn--outline"
                          href={`/admin/exhibitors?id=${item.id}`}
                        >
                          <MaterialIcon name="edit" /> Edit
                        </Link>
                        {editable ? (
                          <form
                            action={deleteExhibitorAction}
                            data-exhibitor-name={item.name}
                            onSubmit={confirmDelete}
                          >
                            <input name="id" type="hidden" value={item.id} />
                            <button
                              aria-label={`Delete ${item.name}`}
                              className="admin-btn admin-btn--danger"
                              type="submit"
                            >
                              <MaterialIcon name="delete" /> Delete
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No exhibitors yet. Use “New exhibitor” to add the first one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <form action={saveExhibitorAction} className="form-panel" key={selected?.id ?? (isNew ? "new" : "empty")}>
          <h2>{selected ? `Edit ${selected.name}` : "Add exhibitor"}</h2>
          <fieldset disabled={!editable}>
            <input name="id" type="hidden" value={selected?.id ?? ""} />
            <label className="admin-field">
              Name
              <input defaultValue={selected?.name ?? ""} maxLength={140} minLength={2} name="name" required />
            </label>
            <label className="admin-field">
              Slug
              <input
                defaultValue={selected?.slug ?? ""}
                name="slug"
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                required
                title="Lowercase letters, numbers and single hyphens only."
              />
            </label>
            <label className="admin-field">
              Category
              <input defaultValue={selected?.category ?? ""} maxLength={80} minLength={2} name="category" required />
            </label>
            <label className="admin-field">
              Description
              <textarea
                defaultValue={selected?.description ?? ""}
                maxLength={1000}
                minLength={20}
                name="description"
                required
              />
            </label>
            <label className="admin-field">
              Website URL
              <input
                defaultValue={selected?.website_url ?? ""}
                name="websiteUrl"
                placeholder="https://"
                type="url"
              />
            </label>
            <label className="admin-field">
              Display order
              <input
                defaultValue={selected?.display_order ?? nextOrder}
                min="0"
                name="displayOrder"
                required
                type="number"
              />
            </label>
            <label className="check-field">
              <input defaultChecked={selected?.is_active ?? true} name="isActive" type="checkbox" /> Visible on the
              public website
            </label>
            <label className="check-field">
              <input defaultChecked={selected?.is_featured ?? false} name="isFeatured" type="checkbox" /> Featured on
              the home page
            </label>
            <button className="admin-btn admin-btn--primary" type="submit">
              {selected ? "Save changes" : "Create exhibitor"}
            </button>
            {selected ? (
              <Link className="admin-btn admin-btn--outline" href="/admin/exhibitors?new=1">
                Cancel and start a new exhibitor
              </Link>
            ) : null}
          </fieldset>
          {editable ? null : <p className="helper">Organizers have read-only access to exhibitors.</p>}
        </form>
      </div>
    </div>
  );
}
