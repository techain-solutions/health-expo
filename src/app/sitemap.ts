import type { MetadataRoute } from "next";

import { locales, publicPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return locales.flatMap((locale) => publicPages.filter((page) => !["exhibitor-detail", "legal"].includes(page)).map((page) => ({ url: `${origin}/${locale}${page === "home" ? "" : `/${page === "paris" ? "paris-2027" : page}`}`, lastModified: new Date() })));
}
