import { forbidden, notFound, redirect } from "next/navigation";

import { AdminPreview } from "@/components/admin-preview";
import { EventManager } from "@/components/event-manager";
import { ExhibitorManager } from "@/components/exhibitor-manager";
import { FloorPlanManager } from "@/components/floor-plan-manager";
import { RequestManager } from "@/components/request-manager";
import { getStaffAuthState } from "@/lib/auth/dal";
import { canAccessAdminPage } from "@/lib/auth/permissions";
import { listManagedStaffAccounts } from "@/lib/auth/staff-management";
import { getEvent } from "@/lib/event/service";
import { listExhibitors } from "@/lib/exhibitors/service";
import { getFloorPlan } from "@/lib/floor-plan/service";
import {
  countNewRequests,
  listPublicRequests,
  requestStatuses,
  requestTypes,
  type RequestStatus,
  type RequestType,
} from "@/lib/requests/service";
import { isAdminPage } from "@/lib/site";

type AdminSearchParams = {
  notice?: string;
  id?: string;
  new?: string;
  page?: string;
  type?: string;
  status?: string;
};

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ page?: string[] }>;
  searchParams: Promise<AdminSearchParams>;
}) {
  const { page = [] } = await params;
  if (page.length > 1) notFound();
  const requestedPage = page[0] ?? "dashboard";
  if (!isAdminPage(requestedPage)) notFound();

  const { staff, user } = await getStaffAuthState();
  if (!user) {
    const nextPath = requestedPage === "dashboard" ? "/admin" : `/admin/${requestedPage}`;
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
  if (!staff || !canAccessAdminPage(staff.role, requestedPage)) forbidden();

  const query = await searchParams;
  const canEdit = staff.role !== "organizer";

  if (requestedPage === "event") {
    const event = await getEvent();
    return (
      <EventManager
        canEdit={canEdit}
        canPublish={staff.role === "administrator"}
        event={event}
        notice={query.notice}
      />
    );
  }

  if (requestedPage === "exhibitors") {
    const items = await listExhibitors();
    return (
      <ExhibitorManager
        editable={canEdit}
        isNew={query.new === "1"}
        items={items}
        notice={query.notice}
        selectedId={query.id}
      />
    );
  }

  if (requestedPage === "floor-plan") {
    const asset = await getFloorPlan();
    return <FloorPlanManager asset={asset} editable={canEdit} notice={query.notice} />;
  }

  if (requestedPage === "requests") {
    const type = requestTypes.includes(query.type as RequestType) ? (query.type as RequestType) : undefined;
    const status = requestStatuses.includes(query.status as RequestStatus)
      ? (query.status as RequestStatus)
      : undefined;
    const requestedIndex = Number.parseInt(query.page ?? "1", 10);
    const pageIndex = Number.isFinite(requestedIndex) && requestedIndex > 0 ? requestedIndex : 1;
    const { items, total } = await listPublicRequests({ page: pageIndex, status, type });
    return (
      <RequestManager
        canDelete={staff.role === "administrator"}
        items={items}
        notice={query.notice}
        page={pageIndex}
        status={status}
        total={total}
        type={type}
      />
    );
  }

  const [accounts, newRequests, event, exhibitors, floorPlan] = await Promise.all([
    requestedPage === "team" ? listManagedStaffAccounts() : Promise.resolve([]),
    canAccessAdminPage(staff.role, "requests") ? countNewRequests().catch(() => 0) : Promise.resolve(0),
    getEvent().catch(() => null),
    listExhibitors(true).catch(() => []),
    getFloorPlan().catch(() => null),
  ]);

  return (
    <AdminPreview
      accounts={accounts}
      notice={query.notice}
      page={requestedPage}
      staff={staff}
      status={{
        newRequests,
        ticketUrlSet: Boolean(event?.ticket_url),
        floorPlanPublished: Boolean(floorPlan),
        eventPublished: event?.publication_status === "published",
        exhibitorCount: exhibitors?.length ?? 0,
      }}
    />
  );
}
