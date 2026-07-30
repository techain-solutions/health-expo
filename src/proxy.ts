import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";
import { isLocale } from "@/lib/site";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) return updateSession(request);
  const locale = request.nextUrl.pathname.split("/")[1];
  if (!isLocale(locale)) return NextResponse.next();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-health-expo-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/en/:path*", "/nl/:path*", "/tr/:path*", "/ru/:path*", "/ar/:path*"],
};
