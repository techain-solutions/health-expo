"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { FlagSprite, LocaleFlag } from "@/components/locale-flag";
import { MaterialIcon } from "@/components/material-icon";
import { Field } from "@/components/public-pages";
import { StaticForm } from "@/components/static-form";
import { getDictionary } from "@/lib/i18n";
import { localeMeta, locales, pageHref, type Locale, type PublicPage } from "@/lib/site";

type PublicShellProps = {
  locale: Locale;
  page: PublicPage;
  children: ReactNode;
  routeExtra?: string;
};

const primaryPages: Array<[PublicPage, "about" | "exhibitors" | "program" | "exhibit" | "media" | "contact"]> = [
  ["about", "about"],
  ["exhibitors", "exhibitors"],
  ["program", "program"],
  ["participate", "exhibit"],
  ["media", "media"],
  ["contact", "contact"],
];

export function PublicShell({ locale, page, children, routeExtra }: PublicShellProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.shell;
  const nav = copy.nav;
  const contactCopy = dictionary.contact;
  const meta = localeMeta[locale];
  const preserveExtra = page === "legal" || page === "exhibitor-detail" ? routeExtra : undefined;
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const languagePickerRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const languageOptionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const contactFabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale, meta.dir]);

  useEffect(() => {
    const bar = scrollProgressRef.current;
    if (!bar) return;
    let ticking = false;
    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar!.style.transform = `scaleX(${progress})`;
      backToTopRef.current?.classList.toggle("is-visible", window.scrollY > 500);
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [page]);

  useEffect(() => {
    document.body.classList.toggle("language-open", languageOpen);
    if (languageOpen) {
      requestAnimationFrame(() => languageOptionRefs.current[locales.indexOf(locale)]?.focus());
    }
    return () => document.body.classList.remove("language-open");
  }, [languageOpen, locale]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    document.body.classList.toggle("contact-open", contactOpen);
    if (!contactOpen) return;
    const fab = contactFabRef.current;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setContactOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("contact-open");
      document.removeEventListener("keydown", onKeyDown);
      fab?.focus();
    };
  }, [contactOpen]);

  useEffect(() => {
    const motionClass = page === "home" ? "home-main--motion" : page === "about" ? "about-main--motion" : page === "program" ? "program-main--motion" : page === "exhibitors" ? "exhibitors-main--motion" : page === "exhibitor-detail" ? "exhibitor-detail-main--motion" : page === "tickets" ? "tickets-main--motion" : page === "floor-plan" ? "floor-plan-main--motion" : page === "visit" ? "visit-main--motion" : page === "fair-match" ? "fair-match-main--motion" : page === "participate" ? "participate-main--motion" : page === "media" ? "media-main--motion" : page === "contact" ? "contact-main--motion" : page === "paris" ? "paris-main--motion" : page === "participant-info" ? "participant-info-main--motion" : page === "legal" ? "legal-main--motion" : undefined;
    const revealClass = page === "home" ? "home-reveal" : page === "about" ? "about-reveal" : page === "program" ? "program-reveal" : page === "exhibitors" ? "exhibitors-reveal" : page === "exhibitor-detail" ? "exhibitor-detail-reveal" : page === "tickets" ? "tickets-reveal" : page === "floor-plan" ? "floor-plan-reveal" : page === "visit" ? "visit-reveal" : page === "fair-match" ? "fair-match-reveal" : page === "participate" ? "participate-reveal" : page === "media" ? "media-reveal" : page === "contact" ? "contact-reveal" : page === "paris" ? "paris-reveal" : page === "participant-info" ? "participant-info-reveal" : page === "legal" ? "legal-reveal" : undefined;
    if (!motionClass || !revealClass) return;
    const main = document.getElementById("main");
    if (!main) return;

    const sections = [...main.querySelectorAll<HTMLElement>(":scope > .section, :scope > .cta-band")];
    const animationFrames: number[] = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animateStats(section: HTMLElement) {
      if (reduceMotion || (!section.classList.contains("section--about-stats") && !section.classList.contains("section--media-stats"))) return;
      section.querySelectorAll<HTMLElement>(".stat b").forEach((stat) => {
        if (stat.dataset.counted === "true") return;
        const target = Number(stat.textContent?.trim());
        if (!Number.isInteger(target) || target < 0) return;
        stat.dataset.counted = "true";
        stat.classList.add("is-counting");
        stat.textContent = "0";
        const duration = 1800;
        let startTime: number | undefined;
        const tick = (time: number) => {
          startTime ??= time;
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          stat.textContent = String(Math.round(target * eased));
          if (progress < 1) animationFrames.push(requestAnimationFrame(tick));
        };
        animationFrames.push(requestAnimationFrame(tick));
      });
    }
    main.classList.add(motionClass);
    sections.forEach((section) => section.classList.add(revealClass));

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        animateStats(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
      main.classList.remove(motionClass);
      sections.forEach((section) => section.classList.remove(revealClass, "is-visible"));
    };
  }, [page]);

  useEffect(() => {
    function closeLanguageMenu(event: MouseEvent) {
      if (!languagePickerRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    }
    document.addEventListener("click", closeLanguageMenu);
    return () => document.removeEventListener("click", closeLanguageMenu);
  }, []);

  function handleLanguageTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    setLanguageOpen(true);
  }

  function handleLanguageMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const activeIndex = languageOptionRefs.current.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setLanguageOpen(false);
      languageTriggerRef.current?.focus();
      return;
    }
    if (event.key === "Tab") {
      setLanguageOpen(false);
      return;
    }
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") nextIndex = (activeIndex + 1 + locales.length) % locales.length;
    if (event.key === "ArrowUp") nextIndex = (activeIndex - 1 + locales.length) % locales.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = locales.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    languageOptionRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="public-site" lang={locale} dir={meta.dir} data-locale={locale}>
      <FlagSprite />
      <div className="scroll-progress" ref={scrollProgressRef} aria-hidden="true" />
      <a className="skip-link" href="#main">
        {copy.skipToContent}
      </a>
      <header className="site-header">
        <div className="shell nav-shell">
          <Link className="logo-link" href={pageHref(locale, "home")} aria-label={copy.homeLabel}>
            <Image
              src="/assets/health-beauty-expo-logo.png"
              alt="Health and Beauty Expo"
              width={260}
              height={116}
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label={copy.primaryNav}>
            {primaryPages.slice(0, 3).map(([target, key]) => (
              <Link className={page === target ? "is-active" : ""} href={pageHref(locale, target)} key={target}>
                {nav[key]}
              </Link>
            ))}
            <div className="nav-drop">
              <button type="button" aria-haspopup="true">
                {nav.visit} <MaterialIcon name="expand_more" />
              </button>
              <div className="nav-drop__panel">
                <Link href={pageHref(locale, "tickets")}>
                  <b>{nav.tickets}</b>
                  <small>{copy.navHints.tickets}</small>
                </Link>
                <Link href={pageHref(locale, "visit")}>
                  <b>{nav.planVisit}</b>
                  <small>{copy.navHints.visit}</small>
                </Link>
                <Link href={pageHref(locale, "floor-plan")}>
                  <b>{nav.plan}</b>
                  <small>{copy.navHints.plan}</small>
                </Link>
                <Link href={pageHref(locale, "fair-match")}>
                  <b>{nav.fairMatch}</b>
                  <small>{copy.navHints.fairMatch}</small>
                </Link>
              </div>
            </div>
            {primaryPages.slice(3).map(([target, key]) => (
              <Link className={page === target ? "is-active" : ""} href={pageHref(locale, target)} key={target}>
                {nav[key]}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-picker" ref={languagePickerRef}>
              <button
                className="language-trigger"
                aria-controls="language-menu"
                aria-expanded={languageOpen}
                aria-label={`${copy.selectLanguage} — ${copy.currentLanguage}: ${meta.label}`}
                aria-haspopup="listbox"
                onClick={() => setLanguageOpen((open) => !open)}
                onKeyDown={handleLanguageTriggerKeyDown}
                ref={languageTriggerRef}
                type="button"
              >
                <LocaleFlag locale={locale} />
                <b className="language-trigger__code">{locale.toUpperCase()}</b>
                <MaterialIcon className="language-trigger__caret" name="expand_more" />
              </button>
              <div
                className="language-menu"
                id="language-menu"
                role="listbox"
                aria-label={copy.selectLanguage}
                hidden={!languageOpen}
                onKeyDown={handleLanguageMenuKeyDown}
              >
                {locales.map((targetLocale, index) => (
                  <Link
                    aria-selected={targetLocale === locale}
                    href={pageHref(targetLocale, page, preserveExtra)}
                    key={targetLocale}
                    onClick={() => setLanguageOpen(false)}
                    ref={(node) => {
                      languageOptionRefs.current[index] = node;
                    }}
                    role="option"
                  >
                    <LocaleFlag locale={targetLocale} />
                    <span>{localeMeta[targetLocale].label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link className="button button--small button--primary desktop-ticket" href={pageHref(locale, "tickets")}>
              {nav.tickets} <MaterialIcon name="open_in_new" />
            </Link>
            <button
                className="menu-toggle"
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? copy.closeNav : copy.openNav}
                onClick={() => setMobileOpen((open) => !open)}
                type="button"
            >
              <span />
              <span />
              <span />
            </button>
            <nav
              className={`mobile-menu${mobileOpen ? " is-open" : ""}`}
              id="mobile-menu"
              aria-label={copy.mobileNav}
            >
              {primaryPages.slice(0, 3).map(([target, key]) => (
                <Link href={pageHref(locale, target)} key={target} onClick={() => setMobileOpen(false)}>
                  {nav[key]}
                </Link>
              ))}
              <Link href={pageHref(locale, "tickets")} onClick={() => setMobileOpen(false)}>{nav.tickets}</Link>
              <Link href={pageHref(locale, "visit")} onClick={() => setMobileOpen(false)}>{nav.planVisit}</Link>
              <Link href={pageHref(locale, "floor-plan")} onClick={() => setMobileOpen(false)}>{nav.plan}</Link>
              <Link href={pageHref(locale, "fair-match")} onClick={() => setMobileOpen(false)}>{nav.fairMatch}</Link>
              {primaryPages.slice(3).map(([target, key]) => (
                <Link href={pageHref(locale, target)} key={target} onClick={() => setMobileOpen(false)}>
                  {nav[key]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className={page === "home" ? "home-main" : page === "about" ? "about-main" : page === "program" ? "program-main" : page === "exhibitors" ? "exhibitors-main" : page === "exhibitor-detail" ? "exhibitor-detail-main" : page === "tickets" ? "tickets-main" : page === "floor-plan" ? "floor-plan-main" : page === "visit" ? "visit-main" : page === "fair-match" ? "fair-match-main" : page === "participate" ? "participate-main" : page === "media" ? "media-main" : page === "contact" ? "contact-main" : page === "paris" ? "paris-main" : page === "participant-info" ? "participant-info-main" : page === "legal" ? "legal-main" : undefined} id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <Image
              src="/assets/health-beauty-expo-logo.png"
              alt="Health and Beauty Expo"
              width={260}
              height={116}
            />
            <p>{copy.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <b>{nav.explore}</b>
            <Link href={pageHref(locale, "about")}>{nav.about}</Link>
            <Link href={pageHref(locale, "exhibitors")}>{nav.exhibitors}</Link>
            <Link href={pageHref(locale, "program")}>{nav.program}</Link>
            <Link href={pageHref(locale, "fair-match")}>{nav.fairMatch}</Link>
            <Link href={pageHref(locale, "media")}>{nav.media}</Link>
          </div>
          <div className="footer-links">
            <b>{nav.participate}</b>
            <Link href={pageHref(locale, "participate")}>{copy.footer.standPackages}</Link>
            <Link href={`${pageHref(locale, "participate")}#sponsorship`}>{copy.footer.sponsorship}</Link>
            <Link href={pageHref(locale, "participant-info")}>{copy.footer.participantGuide}</Link>
          </div>
          <div className="footer-links">
            <b>{nav.documents}</b>
            <a className="footer-links__manual" href="/downloads/participant-manual-2026-en.pdf" target="_blank">
              {copy.footer.exhibitorManualEn}
            </a>
            <a className="footer-links__manual" href="/downloads/participant-manual-2026.pdf" target="_blank">
              {copy.footer.participantManualNl}
            </a>
            <a href="/downloads/exhibitor-agreement-nl.pdf" target="_blank">
              {copy.footer.exhibitorAgreement}
            </a>
            <a href="/downloads/stand-pricing-2026.pdf" target="_blank">
              {copy.footer.standPriceList}
            </a>
            <a href="/downloads/expo-floor-plan.pdf" target="_blank">
              {copy.footer.floorPlanPdf}
            </a>
            <Link href={pageHref(locale, "legal", "terms")}>{copy.footer.generalTerms}</Link>
          </div>
          <div className="footer-links">
            <b>{nav.visit}</b>
            <Link href={pageHref(locale, "tickets")}>{nav.tickets}</Link>
            <Link href={pageHref(locale, "visit")}>{nav.planVisit}</Link>
            <Link href={pageHref(locale, "floor-plan")}>{nav.plan}</Link>
            <Link href={pageHref(locale, "paris")}>{copy.footer.paris}</Link>
          </div>
          <div className="footer-event">
            <p>{copy.footer.dates}</p>
            <b>{copy.footer.venue}</b>
            <span>{copy.footer.city}</span>
            <small>{copy.footer.hours}</small>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>{copy.footer.rights}</p>
          <div>
            <Link href={pageHref(locale, "legal", "privacy")}>{copy.footer.privacy}</Link>
            <Link href={pageHref(locale, "legal", "cookies")}>{copy.footer.cookies}</Link>
            <Link href={pageHref(locale, "legal", "terms")}>{copy.footer.terms}</Link>
          </div>
        </div>
      </footer>
      <button
        className="back-to-top"
        ref={backToTopRef}
        type="button"
        aria-label={copy.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <MaterialIcon name="arrow_upward" />
      </button>
      {page === "contact" ? null : (
        <button
          className="contact-fab"
          ref={contactFabRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={contactOpen}
          aria-label={contactCopy.title}
          onClick={() => setContactOpen(true)}
        >
          <MaterialIcon name="chat" />
        </button>
      )}
      {contactOpen && page !== "contact" ? (
        <div className="contact-modal-backdrop" onClick={() => setContactOpen(false)}>
          <div
            aria-labelledby="contact-modal-title"
            aria-modal="true"
            className="contact-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="contact-modal__head">
              <h2 id="contact-modal-title">{contactCopy.title}</h2>
              <button
                aria-label={copy.closeNav}
                className="contact-modal__close"
                onClick={() => setContactOpen(false)}
                type="button"
              >
                <MaterialIcon name="close" />
              </button>
            </div>
            <p className="contact-modal__intro">{contactCopy.form.intro}</p>
            <StaticForm buttonLabel={contactCopy.form.button} locale={locale} requestType="contact" title={contactCopy.form.formTitle}>
              <div className="form-row">
                <Field name="name" label={contactCopy.form.fields.name} placeholder={contactCopy.form.fields.namePlaceholder} />
                <Field label={contactCopy.form.fields.email} type="email" placeholder={contactCopy.form.fields.emailPlaceholder} />
              </div>
              <Field name="subject" label={contactCopy.form.fields.subject} options={contactCopy.form.fields.subjectOptions} locale={locale} />
              <Field name="message" label={contactCopy.form.fields.message} type="textarea" placeholder={contactCopy.form.fields.messagePlaceholder} />
            </StaticForm>
          </div>
        </div>
      ) : null}
    </div>
  );
}
