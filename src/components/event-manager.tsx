"use client";

import { publishEventAction, saveEventAction } from "@/app/admin/event-actions";
import { normalizeTime } from "@/lib/event/input";

type EventRow = {
  title: string;
  starts_on: string;
  ends_on: string;
  opens_at: string;
  closes_at: string;
  venue: string;
  city: string;
  address: string;
  description: string;
  visitor_information: string;
  ticket_url: string | null;
  publication_status: "draft" | "published";
};

const notices: Record<string, string> = {
  saved: "Event changes saved.",
  published: "Event published.",
  draft: "Event returned to draft.",
  error: "We could not save these event changes. Check the fields and try again.",
};

export function EventManager({
  event,
  canEdit,
  canPublish,
  notice,
}: {
  event: EventRow;
  canEdit: boolean;
  canPublish: boolean;
  notice?: string;
}) {
  const message = notice ? notices[notice] : undefined;
  // `<input type="time">` only accepts HH:MM, while Postgres returns HH:MM:SS.
  const opensAt = normalizeTime(event.opens_at) ?? "";
  const closesAt = normalizeTime(event.closes_at) ?? "";

  return (
    <div className="admin-page">
      <div className="page-head">
        <div>
          <h1>Event information</h1>
          <p>Manage the Rijswijk 2026 event record.</p>
        </div>
      </div>
      {message ? (
        <p
          className={`auth-message ${notice === "error" ? "auth-message--error" : "auth-message--success"}`}
          role={notice === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
      <div className="admin-grid">
        <form action={saveEventAction} className="form-panel">
          <h2>Event details</h2>
          <fieldset disabled={!canEdit}>
            <div className="form-row">
              <label className="admin-field">
                Event name
                <input defaultValue={event.title} maxLength={140} minLength={2} name="title" required />
              </label>
              <label className="admin-field">
                Venue
                <input defaultValue={event.venue} maxLength={140} minLength={2} name="venue" required />
              </label>
            </div>
            <div className="form-row">
              <label className="admin-field">
                Start date
                <input defaultValue={event.starts_on} name="startsOn" required type="date" />
              </label>
              <label className="admin-field">
                End date
                <input defaultValue={event.ends_on} name="endsOn" required type="date" />
              </label>
            </div>
            <div className="form-row">
              <label className="admin-field">
                Opening time
                <input defaultValue={opensAt} name="opensAt" required type="time" />
              </label>
              <label className="admin-field">
                Closing time
                <input defaultValue={closesAt} name="closesAt" required type="time" />
              </label>
            </div>
            <div className="form-row">
              <label className="admin-field">
                City
                <input defaultValue={event.city} maxLength={100} minLength={2} name="city" required />
              </label>
              <label className="admin-field">
                Address
                <input defaultValue={event.address} maxLength={240} minLength={5} name="address" required />
              </label>
            </div>
            <label className="admin-field">
              Description
              <textarea defaultValue={event.description} maxLength={2000} minLength={20} name="description" required />
            </label>
            <label className="admin-field">
              Visitor information
              <textarea defaultValue={event.visitor_information} maxLength={2000} name="visitorInformation" />
            </label>
            <label className="admin-field">
              External ticket URL
              <input defaultValue={event.ticket_url ?? ""} name="ticketUrl" placeholder="https://" type="url" />
            </label>
            <p className="helper">
              Leave the ticket URL empty until the organiser confirms the platform. The public ticket button stays
              hidden while it is empty.
            </p>
            <button className="admin-btn admin-btn--primary" type="submit">
              Save event
            </button>
          </fieldset>
          {canEdit ? null : <p className="helper">Organizers have read-only access to the event record.</p>}
        </form>
        <aside>
          <div className="side-card">
            <h3>Publication</h3>
            <p className="helper">
              Current state: <b>{event.publication_status}</b>
            </p>
            {canPublish ? (
              <form action={publishEventAction}>
                <input
                  name="status"
                  type="hidden"
                  value={event.publication_status === "published" ? "draft" : "published"}
                />
                <button className="admin-btn admin-btn--primary" type="submit">
                  {event.publication_status === "published" ? "Return to draft" : "Publish event"}
                </button>
              </form>
            ) : (
              <p className="helper">Only an Administrator can change publication.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
