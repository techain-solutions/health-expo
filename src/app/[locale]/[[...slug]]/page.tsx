import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicPageContent } from "@/components/public-pages";
import { PublicShell } from "@/components/public-shell";
import { getEvent } from "@/lib/event/service";
import { listExhibitors } from "@/lib/exhibitors/service";
import { getFloorPlan } from "@/lib/floor-plan/service";
import { getDictionary } from "@/lib/i18n";
import { isLocale, resolvePublicRoute } from "@/lib/site";

type RouteParams = {
  locale: string;
  slug?: string[];
};

type RouteSearchParams = {
  sector?: string | string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) return {};
  const route = resolvePublicRoute(slug);
  if (!route) return {};
  const copy = getDictionary(locale);
  const titleByPage = {
    home: copy.home.title,
    about: copy.about.metaTitle,
    exhibitors: copy.exhibitors.metaTitle,
    "exhibitor-detail": copy.exhibitorDetail.metaTitlePrefix,
    program: copy.program.metaTitle,
    tickets: copy.tickets.metaTitle,
    visit: copy.visit.metaTitle,
    "floor-plan": copy.floorPlan.metaTitle,
    "fair-match": copy.fairMatch.metaTitle,
    participate: copy.participate.metaTitle,
    "participant-info": copy.participantInfo.metaTitle,
    media: copy.media.metaTitle,
    contact: copy.contact.metaTitle,
    paris: copy.paris.metaTitle,
    legal: copy.legal.metaTitle,
  };
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const path = slug.join("/");
  const canonical = `${origin}/${locale}${path ? `/${path}` : ""}`;
  const languages = Object.fromEntries(
    ["en", "nl", "tr", "ru", "ar"].map((targetLocale) => [
      targetLocale,
      `${origin}/${targetLocale}${path ? `/${path}` : ""}`,
    ]),
  );
  const resolvedTitle =
    route.page === "home"
      ? { absolute: titleByPage.home }
      : titleByPage[route.page];
  return {
    title: resolvedTitle,
    description: route.page === "home" ? copy.home.description : undefined,
    alternates: { canonical, languages },
    openGraph: {
      title: titleByPage[route.page],
      locale,
      type: "website",
      url: canonical,
    },
  };
}

export default async function LocalePage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const route = resolvePublicRoute(slug);
  if (!route) notFound();
  const query = await searchParams;
  const sector = typeof query.sector === "string" ? query.sector : undefined;

  const routeExtra = route.page === "legal" ? route.legalTab : route.detail;
  const isDynamicPage = ["home", "exhibitors", "exhibitor-detail", "tickets", "fair-match"].includes(route.page);
  const [event, activeExhibitors] = isDynamicPage
    ? await Promise.all([
        getEvent().catch(() => null),
        listExhibitors(true).catch(() => null),
      ])
    : [null, null];
  const publishedEvent = event?.publication_status === "published" ? event : undefined;
  const floorPlan = route.page === "floor-plan" ? await getFloorPlan().catch(() => null) : null;
  const managedExhibitors = activeExhibitors?.map((exhibitor, index) => ({
    id: exhibitor.id,
    letter: exhibitor.name.slice(0, 1).toUpperCase(),
    style: ["", "coral", "green", "sky", "teal"][index % 5],
    name: exhibitor.name,
    slug: exhibitor.slug,
    category: exhibitor.category,
    text: exhibitor.description,
    websiteUrl: exhibitor.website_url,
    isFeatured: exhibitor.is_featured,
    imageUrl: exhibitor.image_url,
  }));

  return (
    <PublicShell locale={locale} page={route.page} routeExtra={routeExtra}>
      {route.page === "home" ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: publishedEvent?.title ?? "Health & Beauty Expo Rijswijk 2026",
              startDate: publishedEvent?.starts_on ?? "2026-10-24",
              endDate: publishedEvent?.ends_on ?? "2026-10-25",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: publishedEvent?.venue ?? "De Broodfabriek",
                address: publishedEvent?.address ?? "Volmerlaan 12, 2288 GD Rijswijk",
              },
              url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/${locale}`,
            }).replaceAll("<", "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      <PublicPageContent
        detail={route.detail}
        legalTab={route.legalTab}
        locale={locale}
        page={route.page}
        sector={sector}
        event={publishedEvent}
        managedExhibitors={managedExhibitors}
        floorPlan={floorPlan}
      />
    </PublicShell>
  );
}
