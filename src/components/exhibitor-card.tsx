/* eslint-disable @next/next/no-img-element -- exhibitor images use an environment-specific Supabase Storage origin */
import Link from "next/link";

import { MaterialIcon } from "@/components/material-icon";
import { getDictionary } from "@/lib/i18n";
import { pageHref, type Locale } from "@/lib/site";

export type PublicExhibitor = {
  id: string;
  letter: string;
  style: string;
  name: string;
  slug: string;
  category: string;
  filterCategory?: string;
  text: string;
  websiteUrl: string | null;
  isFeatured: boolean;
  imageUrl?: string | null;
};

export function ExhibitorCard({ locale, exhibitor }: { locale: Locale; exhibitor: PublicExhibitor }) {
  const copy = getDictionary(locale);
  return (
    <article className="exhibitor-card" data-category={exhibitor.category.toLowerCase()}>
      <div className="exhibitor-card__visual">
        {exhibitor.imageUrl ? <img src={exhibitor.imageUrl} alt={`${exhibitor.name} exhibitor`} /> : <span className={`fake-logo${exhibitor.style ? ` fake-logo--${exhibitor.style}` : ""}`}>{exhibitor.letter}</span>}
      </div>
      <div className="exhibitor-card__body">
        <small>{exhibitor.category}</small>
        <h3>{exhibitor.name}</h3>
        <p>{exhibitor.text}</p>
        <Link href={pageHref(locale, "exhibitor-detail", exhibitor.slug)}>
          {copy.common.viewProfile} <MaterialIcon name="arrow_forward" />
        </Link>
      </div>
    </article>
  );
}
