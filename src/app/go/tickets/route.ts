import { NextResponse } from "next/server";

import { getEvent } from "@/lib/event/service";
import { safeTicketDestination } from "@/lib/tickets";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale") ?? "en";
  try {
    const event = await getEvent();
    const ticketUrl = event.publication_status === "published" ? event.ticket_url : null;
    return NextResponse.redirect(safeTicketDestination(ticketUrl, siteUrl, locale));
  } catch {
    return NextResponse.redirect(safeTicketDestination(null, siteUrl, locale));
  }
}
