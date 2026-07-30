"use client";

import { useMemo, useState } from "react";

import { ExhibitorCard, type PublicExhibitor } from "@/components/exhibitor-card";
import { MaterialIcon } from "@/components/material-icon";
import type { Locale } from "@/lib/site";

export function ExhibitorDirectory({
  exhibitors,
  locale,
  labels,
}: {
  exhibitors: PublicExhibitor[];
  locale: Locale;
  labels: {
    search: string;
    placeholder: string;
    all: string;
    empty: string;
    noMatches: string;
    resultCount: string;
  };
}) {
  const categories = useMemo(
    () => Array.from(new Set(exhibitors.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [exhibitors],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return exhibitors.filter(
      (item) =>
        (!category || item.category === category) &&
        (!normalized ||
          `${item.name} ${item.category} ${item.text}`.toLocaleLowerCase(locale).includes(normalized)),
    );
  }, [category, exhibitors, locale, query]);

  return (
    <>
      <div className="exhibitor-toolbar">
        <div className="search-field">
          <label className="sr-only" htmlFor="exhibitor-search">
            {labels.search}
          </label>
          <input
            id="exhibitor-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.placeholder}
            type="search"
            value={query}
          />
          <MaterialIcon name="search" />
        </div>
        <div className="tag-row" aria-label={labels.search}>
          <button
            aria-pressed={!category}
            className={`tag${category ? "" : " is-active"}`}
            onClick={() => setCategory("")}
            type="button"
          >
            {labels.all}
          </button>
          {categories.map((value) => (
            <button
              aria-pressed={category === value}
              className={`tag${category === value ? " is-active" : ""}`}
              key={value}
              onClick={() => setCategory(value)}
              type="button"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      {visible.length ? (
        <>
          <p className="form-note" role="status">
            {visible.length} {labels.resultCount}
          </p>
          <div className="exhibitor-grid">
            {visible.map((exhibitor) => (
              <ExhibitorCard exhibitor={exhibitor} key={exhibitor.id} locale={locale} />
            ))}
          </div>
        </>
      ) : (
        <p className="demo-note">{exhibitors.length ? labels.noMatches : labels.empty}</p>
      )}
    </>
  );
}
