"use client";

import { useEffect, useMemo, useState } from "react";

import { ExhibitorCard, type PublicExhibitor } from "@/components/exhibitor-card";
import { MaterialIcon } from "@/components/material-icon";
import type { Locale } from "@/lib/site";

const sectorFilters = ["health", "beauty", "wellness", "medical-tourism"] as const;
type SectorFilter = (typeof sectorFilters)[number];

function isSectorFilter(value: string | undefined): value is SectorFilter {
  return Boolean(value && sectorFilters.includes(value as SectorFilter));
}

function matchesSector(category: string, sector: SectorFilter) {
  const value = category.toLocaleLowerCase();
  if (sector === "medical-tourism") return value.includes("medical tourism");
  if (sector === "wellness") return value.includes("wellness");
  if (sector === "beauty") return /aesthetic|beauty|cosmetic|skincare|haircare/.test(value);
  return /health|care|medical/.test(value) && !value.includes("medical tourism");
}

export function ExhibitorDirectory({
  exhibitors,
  locale,
  labels,
  initialSector,
  initialSectorLabel,
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
  initialSector?: string;
  initialSectorLabel?: string;
}) {
  const categories = useMemo(
    () => Array.from(new Set(exhibitors.map((item) => item.category))).sort((a, b) => a.localeCompare(b)),
    [exhibitors],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSector, setSelectedSector] = useState<SectorFilter | "">(
    isSectorFilter(initialSector) ? initialSector : "",
  );

  useEffect(() => {
    setSelectedSector(isSectorFilter(initialSector) ? initialSector : "");
    setCategory("");
    setQuery("");
  }, [initialSector]);

  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    return exhibitors.filter(
      (item) =>
        (!selectedSector || matchesSector(item.category, selectedSector)) &&
        (!category || item.category === category) &&
        (!normalized ||
          `${item.name} ${item.category} ${item.text}`.toLocaleLowerCase(locale).includes(normalized)),
    );
  }, [category, exhibitors, locale, query, selectedSector]);

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
          {selectedSector ? (
            <button
              aria-pressed="true"
              className="tag is-active"
              onClick={() => setSelectedSector("")}
              type="button"
            >
              {initialSectorLabel}
            </button>
          ) : (
            <button
              aria-pressed={!category}
              className={`tag${category ? "" : " is-active"}`}
              onClick={() => { setSelectedSector(""); setCategory(""); }}
              type="button"
            >
              {labels.all}
            </button>
          )}
          {categories.map((value) => (
            <button
              aria-pressed={!selectedSector && category === value}
              className={`tag${!selectedSector && category === value ? " is-active" : ""}`}
              key={value}
              onClick={() => { setSelectedSector(""); setCategory(value); }}
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
