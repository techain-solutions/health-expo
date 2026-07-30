"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { MaterialIcon } from "@/components/material-icon";
import { getDictionary } from "@/lib/i18n";
import { pageHref, type Locale } from "@/lib/site";

type StaticFormProps = {
  title: string;
  buttonLabel: string;
  children: ReactNode;
  locale: Locale;
  requestType?: "contact" | "participation" | "media" | "fair_match";
};

export function StaticForm({ title, buttonLabel, children, locale, requestType }: StaticFormProps) {
  const copy = getDictionary(locale).forms;
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requestType) return;
    const data = new FormData(event.currentTarget);
    const fields = Object.fromEntries(
      [...data.entries()]
        .filter(([key]) => !["website", "email", "consent"].includes(key))
        .map(([key, value]) => [key, String(value)]),
    );
    setMessage(copy.sending);
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: requestType,
        email: data.get("email"),
        fields,
        website: data.get("website"),
        consent: data.get("consent") === "yes",
      }),
    });
    if (response.ok) {
      event.currentTarget.reset();
      setMessage(copy.success);
      return;
    }
    setMessage(response.status === 429 ? copy.rateLimited : response.status === 400 ? copy.invalid : copy.error);
  }

  return (
    <form className="static-form" data-static-form="true" onSubmit={handleSubmit}>
      <h3 className="form-section-title">{title}</h3>
      {children}
      {requestType ? (
        <>
          <input aria-hidden="true" autoComplete="off" className="sr-only" name="website" tabIndex={-1} />
          <label className="check-field">
            <input name="consent" required type="checkbox" value="yes" />
            <span>
              {copy.consent} <a href={pageHref(locale, "legal", "privacy")}>{copy.privacyLink}</a>
            </span>
          </label>
        </>
      ) : null}
      <button className="button button--primary" disabled={!requestType} type="submit">
        {buttonLabel} <MaterialIcon name="arrow_forward" />
      </button>
      {requestType ? <p className="form-note">{copy.note}</p> : null}
      <p aria-live="polite" className="form-note">
        {message}
      </p>
    </form>
  );
}
