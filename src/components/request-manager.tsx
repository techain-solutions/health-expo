import Link from "next/link";

import { deleteRequestAction, markRequestReviewedAction } from "@/app/admin/request-actions";
import {
  requestPageSize,
  requestStatuses,
  requestTypes,
  type RequestStatus,
  type RequestType,
} from "@/lib/requests/service";
import type { Json } from "@/lib/supabase/database.types";

type RequestRow = {
  id: string;
  request_type: string;
  email: string;
  payload: Json;
  status: string;
  created_at: string;
};

const notices: Record<string, string> = {
  reviewed: "Request marked as reviewed.",
  deleted: "Request permanently deleted.",
  error: "We could not complete that change. Try again.",
};

const typeLabels: Record<string, string> = {
  contact: "Contact",
  participation: "Participation",
  media: "Media accreditation",
  fair_match: "Fair Match",
};

function fields(payload: Json) {
  return typeof payload === "object" && payload && !Array.isArray(payload)
    ? Object.entries(payload).filter(([, value]) => typeof value === "string")
    : [];
}

function humanizeKey(key: string) {
  return key.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase());
}

/** Serializes the active filters so actions can return to the same view. */
function filterQuery(type?: RequestType, status?: RequestStatus, page?: number) {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (status) params.set("status", status);
  if (page && page > 1) params.set("page", String(page));
  return params.toString();
}

function filterHref(type?: RequestType, status?: RequestStatus, page?: number) {
  const query = filterQuery(type, status, page);
  return query ? `/admin/requests?${query}` : "/admin/requests";
}

export function RequestManager({
  items,
  total,
  page,
  type,
  status,
  canDelete,
  notice,
}: {
  items: RequestRow[];
  total: number;
  page: number;
  type?: RequestType;
  status?: RequestStatus;
  canDelete: boolean;
  notice?: string;
}) {
  const message = notice ? notices[notice] : undefined;
  const lastPage = Math.max(1, Math.ceil(total / requestPageSize));
  const currentQuery = filterQuery(type, status, page);
  const rangeStart = total === 0 ? 0 : (page - 1) * requestPageSize + 1;
  const rangeEnd = Math.min(page * requestPageSize, total);

  return (
    <div className="admin-page">
      <div className="page-head">
        <div>
          <h1>Form requests</h1>
          <p>Contact, participation, accreditation and Fair Match requests recorded by the website.</p>
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
      <div className="table-panel">
        <div className="table-tools">
          <div className="filters-group">
            <span className="filters-label">Type</span>
            <div className="filters">
              <Link className={`filter${type ? "" : " is-active"}`} href={filterHref(undefined, status)}>
                All types
              </Link>
              {requestTypes.map((value) => (
                <Link
                  className={`filter${type === value ? " is-active" : ""}`}
                  href={filterHref(value, status)}
                  key={value}
                >
                  {typeLabels[value]}
                </Link>
              ))}
            </div>
          </div>
          <div className="filters-group">
            <span className="filters-label">Status</span>
            <div className="filters">
              <Link className={`filter${status ? "" : " is-active"}`} href={filterHref(type, undefined)}>
                All states
              </Link>
              {requestStatuses.map((value) => (
                <Link
                  className={`filter${status === value ? " is-active" : ""}`}
                  href={filterHref(type, value)}
                  key={value}
                >
                  {value === "new" ? "New" : "Reviewed"}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {items.length ? (
          <>
            <table className="request-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{typeLabels[item.request_type] ?? item.request_type}</td>
                    <td className="request-cell">{item.email}</td>
                    <td>
                      {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(
                        new Date(item.created_at),
                      )}
                    </td>
                    <td>
                      <span className={`status ${item.status === "new" ? "status--warning" : "status--success"}`}>
                        {item.status === "new" ? "New" : "Reviewed"}
                      </span>
                    </td>
                    <td className="request-payload">
                      <dl>
                        {fields(item.payload).map(([key, value]) => (
                          <div key={key}>
                            <dt>{humanizeKey(key)}</dt>
                            <dd>{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </td>
                    <td>
                      <div className="row-actions">
                        {item.status === "new" ? (
                          <form action={markRequestReviewedAction}>
                            <input name="id" type="hidden" value={item.id} />
                            <input name="query" type="hidden" value={currentQuery} />
                            <button className="admin-btn admin-btn--outline" type="submit">
                              Mark reviewed
                            </button>
                          </form>
                        ) : null}
                        {canDelete ? (
                          <form action={deleteRequestAction}>
                            <input name="id" type="hidden" value={item.id} />
                            <input name="query" type="hidden" value={currentQuery} />
                            <button className="admin-btn admin-btn--danger" type="submit">
                              Delete
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-pagination">
              <p className="helper">
                Showing {rangeStart}–{rangeEnd} of {total}
              </p>
              <div className="row-actions">
                {page > 1 ? (
                  <Link className="admin-btn admin-btn--outline" href={filterHref(type, status, page - 1)}>
                    Previous
                  </Link>
                ) : null}
                {page < lastPage ? (
                  <Link className="admin-btn admin-btn--outline" href={filterHref(type, status, page + 1)}>
                    Next
                  </Link>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <p className="helper">No requests match these filters.</p>
        )}
      </div>
      {canDelete ? (
        <p className="helper">
          Deleting a request permanently erases the submitted personal data. Use it for GDPR erasure requests.
        </p>
      ) : null}
    </div>
  );
}
