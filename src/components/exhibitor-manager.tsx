/* eslint-disable @next/next/no-img-element -- exhibitor images use an environment-specific Supabase Storage origin */
"use client";

import { useEffect, useState, type FormEvent } from "react";

import { deleteExhibitorAction, saveExhibitorAction } from "@/app/admin/exhibitor-actions";
import { MaterialIcon } from "@/components/material-icon";

export type ExhibitorRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  website_url: string | null;
  image_url: string | null;
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
  const message = notice ? notices[notice] : undefined;
  const nextOrder = items.reduce((highest, item) => Math.max(highest, item.display_order), -1) + 1;
  const [editingId, setEditingId] = useState<string | undefined>(isNew ? undefined : selectedId);
  const [formOpen, setFormOpen] = useState(Boolean(isNew || selectedId));
  const selected = items.find((item) => item.id === editingId);

  useEffect(() => {
    if (!formOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setFormOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [formOpen]);

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
            <button className="admin-btn admin-btn--primary" onClick={() => { setEditingId(undefined); setFormOpen(true); }} type="button">
              <MaterialIcon name="add" /> New exhibitor
            </button>
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
      <div>
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
                      <div className="table-identity">
                        {item.image_url ? <img className="exhibitor-admin-thumb" src={item.image_url} alt="" /> : <span className="mini-logo">{item.name.slice(0, 1)}</span>}
                        <span><strong>{item.name}</strong><br /><small>{item.slug}</small></span>
                      </div>
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
                        <button
                          aria-label={`Edit ${item.name}`}
                          className="admin-btn admin-btn--outline"
                          onClick={() => { setEditingId(item.id); setFormOpen(true); }}
                          type="button"
                        >
                          <MaterialIcon name="edit" /> Edit
                        </button>
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
      </div>
      {formOpen ? <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}>
        <div aria-labelledby="exhibitor-form-title" aria-modal="true" className="admin-modal" role="dialog">
        <form action={saveExhibitorAction} className="form-panel" key={selected?.id ?? "new"}>
          <div className="admin-modal__head"><h2 id="exhibitor-form-title">{selected ? `Edit ${selected.name}` : "Add exhibitor"}</h2><button aria-label="Close exhibitor form" className="admin-modal__close" onClick={() => setFormOpen(false)} type="button"><MaterialIcon name="close" /></button></div>
          <fieldset disabled={!editable}>
            <input name="id" type="hidden" value={selected?.id ?? ""} />
            <label className="admin-field">
              Name
              <input defaultValue={selected?.name ?? ""} maxLength={140} minLength={2} name="name" required />
            </label>
            <label className="admin-field">
              Exhibitor image
              <input accept="image/jpeg,image/png,image/webp" name="image" required={!selected} type="file" />
              <span className="helper">JPG, PNG or WebP, maximum 5 MB.{selected?.image_url ? " Leave empty to keep the current image." : ""}</span>
            </label>
            {selected?.image_url ? <img className="exhibitor-form-preview" src={selected.image_url} alt={`Current image for ${selected.name}`} /> : null}
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
              <button className="admin-btn admin-btn--outline" onClick={() => setFormOpen(false)} type="button">Cancel</button>
            ) : null}
          </fieldset>
          {editable ? null : <p className="helper">Organizers have read-only access to exhibitors.</p>}
        </form>
        </div>
      </div> : null}
    </div>
  );
}
