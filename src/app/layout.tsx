import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { isLocale, localeMeta } from "@/lib/site";

import "./public.css";

export const metadata: Metadata = {
  title: {
    default: "Health & Beauty Expo — Rijswijk 2026",
    template: "%s — Health & Beauty Expo",
  },
  description:
    "Health & Beauty Expo Rijswijk 2026 — health, beauty, wellness and international opportunity.",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const localeHeader = (await headers()).get("x-health-expo-locale") ?? "en";
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  return (
    <html dir={localeMeta[locale].dir} lang={locale} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The approved design uses these exact Google Fonts families and weights. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
