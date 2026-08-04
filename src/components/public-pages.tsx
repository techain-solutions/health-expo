/* eslint-disable @next/next/no-img-element -- Floor-plan source is a dynamic Supabase Storage URL. */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

import { ExhibitorCard, type PublicExhibitor } from "@/components/exhibitor-card";
import { ExhibitorDirectory } from "@/components/exhibitor-directory";
import { ExclusiveAccordion } from "@/components/exclusive-accordion";
import { MaterialIcon } from "@/components/material-icon";
import { StaticForm } from "@/components/static-form";
import { getDictionary } from "@/lib/i18n";
import { localizeExhibitor } from "@/lib/exhibitors/localize";
import {
  pageHref,
  shellCopy,
  type LegalTab,
  type Locale,
  type PublicPage,
} from "@/lib/site";

type PageProps = {
  locale: Locale;
  detail?: string;
  legalTab?: LegalTab;
  sector?: string;
};

type PublishedEvent = {
  title: string;
  starts_on: string;
  ends_on: string;
  opens_at: string;
  closes_at: string;
  venue: string;
  city: string;
  address: string;
  description: string;
  ticket_url: string | null;
};

type PublicFloorPlan = { publicUrl: string; originalName: string; contentType: string };

export const exhibitors: PublicExhibitor[] = [
  {
    id: "placeholder-nova",
    letter: "N",
    style: "",
    name: "Nova Medical Group",
    slug: "nova-medical-group",
    category: "Medical tourism",
    text: "International care pathways and specialist hospital services.",
    websiteUrl: null,
    isFeatured: true,
  },
  {
    id: "placeholder-althea", letter: "A",
    style: "coral",
    name: "Althea Aesthetics",
    slug: "althea-aesthetics",
    category: "Aesthetic medicine",
    text: "Modern non-surgical aesthetics with a patient-first approach.",
    websiteUrl: null,
    isFeatured: true,
  },
  {
    id: "placeholder-lumen", letter: "L",
    style: "green",
    name: "Lumen Skin Science",
    slug: "lumen-skin-science",
    category: "Skincare",
    text: "Evidence-led professional skincare and diagnostic innovation.",
    websiteUrl: null,
    isFeatured: true,
  },
  {
    id: "placeholder-origin", letter: "O",
    style: "sky",
    name: "Origin Wellness Lab",
    slug: "origin-wellness-lab",
    category: "Wellness",
    text: "Holistic programmes for body, mind and sustainable wellbeing.",
    websiteUrl: null,
    isFeatured: false,
  },
  {
    id: "placeholder-vita", letter: "V",
    style: "teal",
    name: "Vita Preventive Care",
    slug: "vita-preventive-care",
    category: "Preventive health",
    text: "Personal health insight, screening and lifestyle support.",
    websiteUrl: null,
    isFeatured: false,
  },
  {
    id: "placeholder-elara", letter: "E",
    style: "",
    name: "Elara Hair Institute",
    slug: "elara-hair-institute",
    category: "Haircare",
    text: "Advanced hair health, restoration and professional products.",
    websiteUrl: null,
    isFeatured: false,
  },
];

function getLocalizedExhibitors(locale: Locale, managedExhibitors?: PublicExhibitor[]) {
  return (managedExhibitors ?? exhibitors).map((exhibitor) => localizeExhibitor(exhibitor, locale));
}

function formatEventDates(event: PublishedEvent, locale: Locale) {
  const start = new Date(`${event.starts_on}T00:00:00Z`);
  const end = new Date(`${event.ends_on}T00:00:00Z`);
  const formatter = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return event.starts_on === event.ends_on ? formatter.format(start) : `${formatter.format(start)} – ${formatter.format(end)}`;
}

function backgroundImage(path: string): CSSProperties {
  return { backgroundImage: `url("${path}")` };
}

function PageHero({
  locale,
  title,
  description,
  subtitle,
  image,
  children,
}: {
  locale: Locale;
  title: string;
  description: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}) {
  const copy = getDictionary(locale);
  return (
    <section
      className={`page-hero${image ? " page-hero--image" : ""}${subtitle ? " page-hero--with-subtitle" : ""}`}
      style={image ? backgroundImage(image) : undefined}
    >
      <div className="shell">
        <div className="breadcrumbs">
          <Link href={pageHref(locale, "home")}>{copy.common.home}</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1>{title}</h1>
        {subtitle ? <p className="page-hero__subtitle">{subtitle}</p> : null}
        <p>{description}</p>
        {children ? <div className="page-hero__actions">{children}</div> : null}
      </div>
    </section>
  );
}

function CtaBand({
  locale,
  title,
  text,
  page,
  label,
  className,
  showArrow = true,
}: {
  locale: Locale;
  title: string;
  text: string;
  page: PublicPage;
  label: string;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <section className={`cta-band${className ? ` ${className}` : ""}`}>
      <div className="shell">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link className="button button--white" href={pageHref(locale, page)}>
          <span>{label}</span> {showArrow ? <MaterialIcon name="arrow_forward" /> : null}
        </Link>
      </div>
    </section>
  );
}

function InfoCard({
  number,
  title,
  text,
  children,
}: {
  number: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <article className="info-card">
      <span className="info-card__number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </article>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  options,
  minLength,
}: {
  name?: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  minLength?: number;
}) {
  const fieldName = name ?? label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/(^-|-$)/g, "");
  return (
    <div className="field">
      <label htmlFor={fieldName}>
        {label} <span>*</span>
      </label>
      {options ? (
        <select defaultValue="" id={fieldName} name={fieldName} required>
          <option value="">{placeholder ?? "Select one"}</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea id={fieldName} maxLength={2000} minLength={minLength ?? 10} name={fieldName} placeholder={placeholder} required />
      ) : (
        <input
          id={fieldName}
          maxLength={type === "email" ? 254 : 2000}
          minLength={minLength ?? (type === "tel" ? 6 : 2)}
          name={type === "email" ? "email" : fieldName}
          type={type}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
}

function FormLayout({
  locale,
  kicker,
  title,
  intro,
  noteTitle,
  note,
  formTitle,
  buttonLabel,
  requestType,
  children,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  intro: string;
  noteTitle?: string;
  note?: string;
  formTitle: string;
  buttonLabel: string;
  requestType?: "contact" | "participation" | "media" | "fair_match";
  children: ReactNode;
}) {
  return (
    <div className="shell form-shell">
      <div className="form-intro">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
        {note ? (
          <div className="contact-card">
            <b>{noteTitle}</b>
            <span>{note}</span>
          </div>
        ) : null}
      </div>
      <StaticForm buttonLabel={buttonLabel} locale={locale} requestType={requestType} title={formTitle}>
        {children}
      </StaticForm>
    </div>
  );
}

function HomePage({
  locale,
  event,
  managedExhibitors,
}: PageProps & { event?: PublishedEvent; managedExhibitors?: PublicExhibitor[] }) {
  const dictionary = getDictionary(locale);
  const pageCopy = dictionary.home;
  const copy = shellCopy[locale];
  const [beforeOpportunity, afterOpportunity = ""] = copy.hero.split("opportunity");
  const localizedHero =
    locale === "en" ? (
      <>
        {beforeOpportunity}
        <em>opportunity</em>
        {afterOpportunity}
      </>
    ) : (
      copy.hero
    );

  return (
    <>
      <section className={`hero hero--cinematic${locale === "ar" ? " hero--cinematic--rtl" : ""}`}>
        <div
          className="hero-backdrop"
          role="img"
            aria-label={pageCopy.heroImageAlt}
        />
        <div className="shell hero-cinematic__content">
          <div className="hero-copy">
            <p className="eyebrow">{event?.title ?? dictionary.event.eyebrowFallback}</p>
            <h1>{localizedHero}</h1>
            <p>{copy.heroBody}</p>
            <div className="hero-actions">
              <Link className="button button--coral" href={pageHref(locale, "tickets")}>
                {copy.primary} <MaterialIcon name="open_in_new" />
              </Link>
              <Link className="button button--outline" href={pageHref(locale, "participate")}>
                {copy.secondary} <MaterialIcon name="arrow_forward" />
              </Link>
            </div>
            <div className="event-meta">
              <div>
                <MaterialIcon className="meta-icon" name="calendar_month" />
                <p>
                  <b><span dir="ltr">{event ? formatEventDates(event, locale) : dictionary.event.datesFallback}</span></b>
                  <small><span dir="ltr">{event ? `${event.opens_at.slice(0, 5)}–${event.closes_at.slice(0, 5)}` : dictionary.event.hoursFallback}</span></small>
                </p>
              </div>
              <div>
                <MaterialIcon className="meta-icon" name="location_on" />
                <p>
                  <b>{event?.venue ?? dictionary.event.venueFallback}</b>
                  <small>{event ? event.city : dictionary.event.cityFallback}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="shell sector-bar sector-bar--overlay">
          <p>{copy.explore} {pageCopy.exploreSuffix}</p>
          {pageCopy.sectors.map((sector, index) => (
            <Link href={`${pageHref(locale, "exhibitors")}?sector=${["health", "beauty", "wellness", "medical-tourism"][index]}#directory`} key={sector}>
              <span>0{index + 1}</span>
              <b>{sector}</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="section section--cream home-experience">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="kicker">{pageCopy.experience.kicker}</p>
              <h2>{pageCopy.experience.title}</h2>
            </div>
            <p>
              {pageCopy.experience.text}
            </p>
          </div>
          <div className="card-grid">
            {pageCopy.experience.cards.map(({ kicker, title, text }, index) => (
              <article className="image-card" key={title} style={backgroundImage(["/assets/about-hero.jpg", "/assets/experience-card.jpg", "/assets/media-sample.jpg"][index])}>
                <div className="image-card__content">
                  <p className="kicker">{kicker}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading section-heading--center">
            <p className="kicker">{pageCopy.ambition.kicker}</p>
            <h2>{pageCopy.ambition.title}</h2>
            <p>{pageCopy.ambition.text}</p>
          </div>
          <div className="card-grid card-grid--4">
            <InfoCard number="01" title={pageCopy.ambition.cards[0].title} text={pageCopy.ambition.cards[0].text}>
              <Link href={pageHref(locale, "visit")}>{pageCopy.ambition.cards[0].link} <MaterialIcon name="arrow_forward" /></Link>
            </InfoCard>
            <InfoCard number="02" title={pageCopy.ambition.cards[1].title} text={pageCopy.ambition.cards[1].text}>
              <Link href={pageHref(locale, "participate")}>{pageCopy.ambition.cards[1].link} <MaterialIcon name="arrow_forward" /></Link>
            </InfoCard>
            <InfoCard number="03" title={pageCopy.ambition.cards[2].title} text={pageCopy.ambition.cards[2].text}>
              <Link href={pageHref(locale, "fair-match")}>{pageCopy.ambition.cards[2].link} <MaterialIcon name="arrow_forward" /></Link>
            </InfoCard>
            <InfoCard number="04" title={pageCopy.ambition.cards[3].title} text={pageCopy.ambition.cards[3].text}>
              <Link href={pageHref(locale, "media")}>{pageCopy.ambition.cards[3].link} <MaterialIcon name="arrow_forward" /></Link>
            </InfoCard>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="kicker">{pageCopy.featured.kicker}</p>
              <h2>{pageCopy.featured.title}</h2>
            </div>
            <Link className="button button--outline" href={pageHref(locale, "exhibitors")}>
              {dictionary.common.viewAllExhibitors} <MaterialIcon name="arrow_forward" />
            </Link>
          </div>
          <div className="exhibitor-grid">
            {getLocalizedExhibitors(locale, managedExhibitors).filter((exhibitor) => exhibitor.isFeatured).slice(0, 3).map((exhibitor) => (
              <ExhibitorCard exhibitor={exhibitor} key={exhibitor.name} locale={locale} />
            ))}
          </div>
          {getLocalizedExhibitors(locale, managedExhibitors).some((exhibitor) => exhibitor.isFeatured) ? null : <p className="demo-note">{pageCopy.featured.empty}</p>}
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="kicker">{pageCopy.programme.kicker}</p>
              <h2>{pageCopy.programme.title}</h2>
            </div>
            <p>{pageCopy.programme.text}</p>
          </div>
          <div className="approval-note">
            <p>{pageCopy.programme.text}</p>
            <Link href={pageHref(locale, "program")}>{pageCopy.programme.link} <MaterialIcon name="arrow_forward" /></Link>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="shell split">
          <div className="media-frame media-frame--poster">
            <Image src="/assets/poster-english.png" alt={pageCopy.campaign.posterAlt} width={826} height={1169} />
          </div>
          <div className="split-copy">
            <p className="kicker">{pageCopy.campaign.kicker}</p>
            <h2>{pageCopy.campaign.title}</h2>
            <p>{pageCopy.campaign.text}</p>
            <ul className="detail-list">
              {pageCopy.campaign.items.map((item) => <li key={item.term}><b>{item.term}</b><span>{item.text}</span></li>)}
            </ul>
            <Link className="button button--primary" href={pageHref(locale, "about")}>{pageCopy.campaign.link} <MaterialIcon name="arrow_forward" /></Link>
          </div>
        </div>
      </section>
      <section className="section section--dark section--fair-match">
        <div className="shell split">
          <div className="split-copy">
            <p className="kicker">{pageCopy.fairMatch.kicker}</p>
            <h2 className="light-heading">{pageCopy.fairMatch.title}</h2>
            <p className="light-copy">{pageCopy.fairMatch.text}</p>
            <Link className="button button--white" href={pageHref(locale, "fair-match")}>{pageCopy.fairMatch.link} <MaterialIcon name="arrow_forward" /></Link>
          </div>
          <ol className="timeline">
            {pageCopy.fairMatch.steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3 className="light-heading">{step.title}</h3><p className="light-copy">{step.text}</p></div></li>)}
          </ol>
        </div>
      </section>
      <CtaBand locale={locale} title={pageCopy.cta.title} text={pageCopy.cta.text} page="tickets" label={pageCopy.cta.label} />
    </>
  );
}

function AboutPage({ locale }: PageProps) {
  const copy = getDictionary(locale).about;
  return (
    <>
      <PageHero
        locale={locale}
        title={copy.title}
        description={copy.description}
        image="/assets/about-hero.jpg"
      >
        <Link className="button button--white" href={pageHref(locale, "tickets")}>{copy.primaryCta} <MaterialIcon name="arrow_forward" /></Link>
        <Link className="button button--ghost" href={pageHref(locale, "participate")}>{copy.secondaryCta} <MaterialIcon name="arrow_forward" /></Link>
      </PageHero>
      <section className="section"><div className="shell split"><div className="split-copy"><p className="kicker">{copy.positioning.kicker}</p><h2>{copy.positioning.title}</h2><p>{copy.positioning.body1}</p><p>{copy.positioning.body2}</p></div><div className="quote-card"><p>{copy.positioning.quote}</p><small>{copy.positioning.quoteSource}</small></div></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.expect.kicker}</p><h2>{copy.expect.title}</h2></div><div className="card-grid">{copy.expect.cards.map((card,index)=><InfoCard number={`0${index+1}`} title={card.title} text={card.text} key={card.title}/>)}</div></div></section>
      <section className="section section--about-stats"><div className="shell"><div className="stats-row">{copy.stats.map((stat) => <div className="stat" key={stat.label}><b>{stat.value}</b><span>{stat.label}</span></div>)}</div></div></section>
      <CtaBand locale={locale} title={copy.cta.title} text={copy.cta.text} page="participate" label={copy.cta.label} />
    </>
  );
}

function ExhibitorsPage({ locale, managedExhibitors, sector }: PageProps & { managedExhibitors?: PublicExhibitor[] }) {
  const copy = getDictionary(locale).exhibitors;
  const directory = getLocalizedExhibitors(locale, managedExhibitors);
  const sectorLabels = getDictionary(locale).home.sectors;
  const sectorIndex = ["health", "beauty", "wellness", "medical-tourism"].indexOf(sector ?? "");
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description} />
      <section className="section section--exhibitor-directory" id="directory"><div className="shell"><ExhibitorDirectory exhibitors={directory} initialSector={sector} initialSectorLabel={sectorIndex >= 0 ? sectorLabels[sectorIndex] : undefined} locale={locale} labels={{ search: copy.searchLabel, placeholder: copy.searchPlaceholder, all: copy.filterAll, empty: copy.empty, noMatches: copy.noMatches, resultCount: copy.resultCount }} /></div></section>
      <CtaBand locale={locale} title={copy.cta.title} text={copy.cta.text} page="participate" label={copy.cta.label} />
    </>
  );
}

function ProgramPage({ locale }: PageProps) {
  const copy = getDictionary(locale).program;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description} />
      <section className="section"><div className="shell"><div className="approval-note approval-note--top"><h2>{copy.pending.title}</h2><p>{copy.pending.text}</p><Link href={pageHref(locale, "contact")}>{copy.pending.cta} <MaterialIcon name="arrow_forward" /></Link></div></div></section>
    </>
  );
}

function ExhibitorDetailPage({ locale, detail, managedExhibitors }: PageProps & { managedExhibitors?: PublicExhibitor[] }) {
  const copy = getDictionary(locale);
  const directory = getLocalizedExhibitors(locale, managedExhibitors);
  const matched = directory.find((item) => item.slug === detail);
  const aboutTitleWords = copy.exhibitorDetail.about.title.split(" ");
  const aboutTitleEnding = aboutTitleWords.splice(-2).join(" ");
  if (!matched) notFound();
  return (
    <>
      <PageHero locale={locale} title={matched.name} description={`${copy.exhibitorDetail.featuredLabel} · ${matched.category}.`}>
        {matched.websiteUrl ? <a className="button button--white" href={matched.websiteUrl} target="_blank" rel="noopener noreferrer">{copy.common.visitWebsite} <MaterialIcon name="open_in_new" /></a> : null}
        <Link className="button button--ghost" href={pageHref(locale, "exhibitors")}>{copy.common.allExhibitors}</Link>
      </PageHero>
      <section className="section"><div className="shell split"><div className="exhibitor-detail-logo">{matched.imageUrl ? <img src={matched.imageUrl} alt={`${matched.name} exhibitor`} /> : <span className={`fake-logo${matched.style ? ` fake-logo--${matched.style}` : ""}`}>{matched.letter}</span>}</div><div className="split-copy"><p className="kicker">{copy.exhibitorDetail.about.kicker}</p><h2>{aboutTitleWords.join(" ")} <span className="exhibitor-detail-title-ending">{aboutTitleEnding}</span></h2><p>{matched.text}</p><ul className="detail-list"><li><b>{copy.exhibitorDetail.categoryLabel}</b><span>{matched.category}</span></li>{matched.websiteUrl ? <li><b>{copy.exhibitorDetail.websiteLabel}</b><a href={matched.websiteUrl} target="_blank" rel="noopener noreferrer">{copy.common.visitWebsite}</a></li> : null}</ul></div></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading"><div><p className="kicker">{copy.exhibitorDetail.fairMatch.kicker}</p><h2>{copy.exhibitorDetail.fairMatch.title}</h2></div><p>{copy.exhibitorDetail.fairMatch.text}</p></div><Link className="button button--primary" href={pageHref(locale,"fair-match")}>{copy.exhibitorDetail.fairMatch.link} <MaterialIcon name="arrow_forward" /></Link></div></section>
    </>
  );
}

function TicketsPage({ locale, event }: PageProps & { event?: PublishedEvent }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.tickets;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={`${copy.descriptionPrefix} ${event?.title ?? copy.descriptionFallback}.`}>
        {event?.ticket_url ? <Link className="button button--white" href={`/go/tickets?locale=${locale}`}>{copy.openTickets} <MaterialIcon name="open_in_new" /></Link> : <p className="validation-banner">{copy.ticketsPending}</p>}
      </PageHero>
      <section className="section"><div className="shell split"><div className="split-copy"><p className="kicker">{copy.details.kicker}</p><h2>{copy.details.title}</h2><ul className="detail-list"><li><b>{copy.details.dates}</b><span dir="ltr">{event ? formatEventDates(event, locale) : dictionary.event.datesFallback}</span></li><li><b>{copy.details.hours}</b><span dir="ltr">{event ? `${event.opens_at.slice(0,5)}–${event.closes_at.slice(0,5)}` : dictionary.event.hoursFallback}</span></li><li><b>{copy.details.venue}</b><span>{event ? `${event.venue}, ${event.address}` : `${dictionary.event.venueFallback}, ${dictionary.event.addressFallback}`}</span></li><li><b>{copy.details.format}</b><span>{event?.description ?? copy.details.formatFallback}</span></li></ul></div><div className="media-frame" style={backgroundImage("/assets/tickets-frame.jpg")}/></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.visit.kicker}</p><h2>{copy.visit.title}</h2></div><div className="card-grid">{copy.visit.cards.map((card,index)=><InfoCard number={`0${index+1}`} title={card.title} text={card.text} key={card.title}/>)}</div></div></section>
      <CtaBand locale={locale} title={copy.cta.title} text={copy.cta.text} page="visit" label={copy.cta.label}/>
    </>
  );
}

function VisitPage({ locale }: PageProps) {
  const copy = getDictionary(locale).visit;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}/>
      <section className="section"><div className="shell split"><div className="split-copy"><p className="kicker">{copy.practical.kicker}</p><h2>{copy.practical.title}</h2><ul className="detail-list"><li><b>{copy.practical.dates}</b><span dir="ltr">{copy.practical.datesValue}</span></li><li><b>{copy.practical.hours}</b><span dir="ltr">{copy.practical.hoursValue}</span></li><li><b>{copy.practical.venue}</b><span>{copy.practical.venueValue}</span></li><li><b>{copy.practical.address}</b><span>{copy.practical.addressValue}</span></li><li><b>{copy.practical.languages}</b><span>{copy.practical.languagesValue}</span></li></ul><Link className="button button--primary" href={pageHref(locale,"floor-plan")}>{copy.practical.planLink} <MaterialIcon name="arrow_forward" /></Link></div><div className="media-frame" style={backgroundImage("/assets/visit-frame.jpg")}/></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading"><div><p className="kicker">{copy.before.kicker}</p><h2>{copy.before.title}</h2></div></div><div className="card-grid card-grid--4">{copy.before.cards.map((card,index)=><InfoCard number={`0${index+1}`} title={card.title} text={card.text} key={card.title}/>)}</div></div></section>
      <CtaBand locale={locale} title={copy.cta.title} text={copy.cta.text} page="contact" label={copy.cta.label} showArrow={false}/>
    </>
  );
}

function FloorPlanPage({ locale, floorPlan }: PageProps & { floorPlan?: PublicFloorPlan | null }) {
  const copy = getDictionary(locale).floorPlan;
  const isPdf = floorPlan?.contentType === "application/pdf";
  const planUrl = floorPlan?.publicUrl ?? "/assets/expo-floor-plan.jpg";
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}/>
      <section className="section section--soft"><div className="shell"><div className="floor-plan-card">{isPdf ? <iframe className="floor-plan-pdf" src={`${planUrl}#toolbar=0&navpanes=0&view=FitH`} title={`${copy.currentPlan}: ${floorPlan.originalName}`} /> : floorPlan ? <img src={planUrl} alt={copy.imageAlt} /> : <Image src="/assets/expo-floor-plan.jpg" alt={copy.imageAlt} width={2000} height={1414}/>}<div className="legend">{copy.legend.map((item)=><span key={item}>{item}</span>)}</div><div className="floor-plan-actions">{isPdf ? null : <a className="button button--primary" href={planUrl} target="_blank" rel="noreferrer">{copy.openLarge} <MaterialIcon name="open_in_new" /></a>}<a className="button button--outline" href={floorPlan ? "/api/floor-plan/download" : "/downloads/expo-floor-plan.pdf"}>{copy.download} <MaterialIcon name="download" /></a></div></div></div></section>
      <CtaBand className="cta-band--floor-plan" locale={locale} title={copy.cta.title} text={copy.cta.text} page="exhibitors" label={copy.cta.label} showArrow={false}/>
    </>
  );
}

function FairMatchPage({ locale, managedExhibitors }: PageProps & { managedExhibitors?: PublicExhibitor[] }) {
  const copy = getDictionary(locale).fairMatch;
  const directory = getLocalizedExhibitors(locale, managedExhibitors);
  return (
    <>
      <PageHero locale={locale} title={copy.title} subtitle={copy.subtitle} description={copy.description}>
        <a className="button button--white" href="#request">{copy.heroCta} <MaterialIcon name="arrow_forward" /></a>
      </PageHero>
      <section className="section"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.how.kicker}</p><h2>{copy.how.title}</h2><p className="fair-match-how-text">{copy.how.text}</p></div><div className="card-grid">{copy.how.cards.map((card,index)=><InfoCard number={`0${index+1}`} title={card.title} text={card.text} key={card.title}/>)}</div></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading section-heading--fair-match-participants"><div><p className="kicker">{copy.participants.kicker}</p><h2>{copy.participants.title}</h2></div><p>{copy.participants.text}</p></div>{directory.length ? <div className="clinic-grid">{directory.slice(0,5).map((item)=><article className="clinic-card" key={item.id}><div className="clinic-card__head"><span className={`fake-logo${item.style?` fake-logo--${item.style}`:""}`}>{item.letter}</span><div><small>{item.category}</small><h3>{item.name}</h3></div></div><p>{item.text}</p><Link className="button button--outline button--small" href={pageHref(locale, "exhibitor-detail", item.slug)}>{getDictionary(locale).common.viewProfile}</Link></article>)}</div> : <p className="demo-note">{copy.participants.empty}</p>}</div></section>
      <section className="section" id="request"><FormLayout locale={locale} kicker={copy.form.kicker} title={copy.form.title} intro={copy.form.intro} noteTitle={copy.form.noteTitle} note={copy.form.note} formTitle={copy.form.formTitle} buttonLabel={copy.form.button} requestType="fair_match"><div className="form-row"><Field name="first-name" label={copy.form.fields.firstName} placeholder={copy.form.fields.firstNamePlaceholder}/><Field name="last-name" label={copy.form.fields.lastName} placeholder={copy.form.fields.lastNamePlaceholder}/></div><div className="form-row"><Field label={copy.form.fields.email} type="email" placeholder={copy.form.fields.emailPlaceholder}/><Field name="phone" label={copy.form.fields.phone} type="tel" placeholder={copy.form.fields.phonePlaceholder}/></div><Field name="request" label={copy.form.fields.request} type="textarea" placeholder={copy.form.fields.requestPlaceholder}/></FormLayout></section>
    </>
  );
}

function ParticipatePage({ locale }: PageProps) {
  const copy = getDictionary(locale).participate;
  const packages = [
    ["Stand 1","15 m²","€3,495"],
    ["Stand 2","30 m²","€4,950"],
    ["Stand 3","15 m²","€4,995"],
    ["Stand 4","30 m²","€6,995"],
  ];
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}><a className="button button--white" href="#packages">{copy.heroCta} <MaterialIcon name="arrow_forward" /></a><Link className="button button--ghost" href={pageHref(locale,"participant-info")}>{copy.heroSecondary}</Link></PageHero>
      <section className="section" id="packages"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.packages.kicker}</p><h2>{copy.packages.title}</h2><p>{copy.packages.text}</p></div><div className="pricing-grid">{packages.map(([name,size,price],index)=><article className={`price-card${index===1?" is-featured":""}`} key={name}><div className="price-card__label"><span>{size}</span>{index===1?<i>{copy.packages.popular}</i>:null}</div><h3>{name}</h3><p className="price">{price}</p><ul>{copy.packages.includes.map((item)=><li key={item}>{item}</li>)}</ul><a className={`button ${index===1?"button--white":"button--outline"}`} href="#participation-form">{copy.packages.request} <MaterialIcon name="arrow_forward" /></a></article>)}</div><div className="floor-plan-actions"><a className="button button--outline" href="/assets/stands-1-2.jpg" target="_blank" rel="noopener noreferrer">{copy.packages.previewStands12}</a><a className="button button--outline" href="/assets/stands-3-4.jpg" target="_blank" rel="noopener noreferrer">{copy.packages.previewStands34}</a><a className="button button--outline" href="/downloads/stand-pricing-2026.pdf" target="_blank" rel="noopener noreferrer">{copy.packages.downloadPriceList} <MaterialIcon name="download" /></a></div></div></section>
      <section className="section section--cream" id="sponsorship"><div className="shell"><div className="section-heading section-heading--sponsorship"><div><p className="kicker">{copy.sponsorship.kicker}</p><h2>{copy.sponsorship.title}</h2></div><p>{copy.sponsorship.text}</p></div><div className="sponsor-grid">{copy.sponsorship.tiers.map((tier,index)=><article className={`sponsor-card sponsor-card--${["bronze","silver","gold"][index]}`} key={tier.name}><span className="sponsor-card__medal">{tier.name.slice(0,1)}</span><h3>{tier.name}</h3><p>{tier.text}</p></article>)}</div></div></section>
      <section className="section section--soft" id="participation-form"><FormLayout locale={locale} kicker={copy.form.kicker} title={copy.form.title} intro={copy.form.intro} noteTitle={copy.form.noteTitle} note={copy.form.note} formTitle={copy.form.formTitle} buttonLabel={copy.form.button} requestType="participation"><div className="form-row"><Field name="company" label={copy.form.fields.company} placeholder={copy.form.fields.companyPlaceholder}/><Field name="contact" label={copy.form.fields.contact} placeholder={copy.form.fields.contactPlaceholder}/></div><div className="form-row"><Field label={copy.form.fields.email} type="email" placeholder={copy.form.fields.emailPlaceholder}/><Field name="phone" label={copy.form.fields.phone} type="tel" placeholder={copy.form.fields.phonePlaceholder}/></div><Field name="interest" label={copy.form.fields.interest} placeholder={copy.form.fields.interestPlaceholder} options={packages.map(([name,size])=>`${name} — ${size}`)}/><Field name="about" label={copy.form.fields.about} type="textarea" placeholder={copy.form.fields.aboutPlaceholder}/></FormLayout></section>
      <CtaBand className="cta-band--participant-guide" locale={locale} title={copy.cta.title} text={copy.cta.text} page="participant-info" label={copy.cta.label} showArrow={false}/>
    </>
  );
}

function ParticipantInfoPage({ locale }: PageProps) {
  const copy = getDictionary(locale).participantInfo;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}><a className="button button--white" href="/downloads/participant-manual-2026.pdf" target="_blank" rel="noopener noreferrer">{copy.downloadFull} <MaterialIcon name="download" /></a><a className="button button--ghost" href="/downloads/participant-manual-2026-en.pdf" target="_blank" rel="noopener noreferrer">{copy.downloadEnglish} <MaterialIcon name="download" /></a></PageHero>
      <section className="section"><div className="shell split split--wide"><div className="split-copy"><p className="kicker">{copy.keyDates.kicker}</p><h2>{copy.keyDates.title}</h2><ul className="detail-list">{copy.keyDates.items.map((item)=><li key={item.term}><b>{item.term}</b><span>{item.text}</span></li>)}</ul></div><ol className="timeline">{copy.keyDates.steps.map((step,index)=><li key={step.title}><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading section-heading--participant-documents"><div><p className="kicker">{copy.documents.kicker}</p><h2>{copy.documents.title}</h2></div><p>{copy.documents.text}</p></div><div className="download-grid">{copy.documents.items.map((item)=><article className="download-card" key={item.title}><MaterialIcon name="download" /><b>{item.title}</b><small>{copy.documents.sourceLabel}</small><a href={item.href} target="_blank" rel="noopener noreferrer">{copy.documents.open}</a></article>)}</div></div></section>
      <section className="section"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.topics.kicker}</p><h2>{copy.topics.title}</h2></div><ExclusiveAccordion items={copy.topics.items}/></div></section>
    </>
  );
}

function MediaPage({ locale }: PageProps) {
  const copy = getDictionary(locale).media;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}><a className="button button--white" href="#accreditation">{copy.heroCta} <MaterialIcon name="arrow_forward" /></a></PageHero>
      <section className="section"><div className="shell"><div className="section-heading"><div><p className="kicker">{copy.accreditation.kicker}</p><h2>{copy.accreditation.title}</h2></div><p>{copy.accreditation.text}</p></div><div className="card-grid">{copy.accreditation.cards.map((card,index)=><InfoCard number={`0${index+1}`} title={card.title} text={card.text} key={card.title}/>)}</div></div></section>
      <section className="section section--soft"><div className="shell split"><div><p className="kicker">{copy.criteria.kicker}</p><ExclusiveAccordion items={copy.criteria.items}/></div><div className="media-frame" style={backgroundImage("/assets/tickets-frame.jpg")}/></div></section>
      <section className="section section--media-stats"><div className="shell"><div className="section-heading section-heading--center"><p className="kicker">{copy.commitment.kicker}</p><h2>{copy.commitment.title}</h2></div><div className="stats-row">{copy.commitment.stats.map((stat)=><div className="stat" key={stat.label}><b>{stat.value}</b><span>{stat.label}</span></div>)}</div></div></section>
      <section className="section section--cream" id="accreditation"><FormLayout locale={locale} kicker={copy.form.kicker} title={copy.form.title} intro={copy.form.intro} noteTitle={copy.form.noteTitle} note={copy.form.note} formTitle={copy.form.formTitle} buttonLabel={copy.form.button} requestType="media"><div className="form-row"><Field name="name" label={copy.form.fields.name} placeholder={copy.form.fields.namePlaceholder}/><Field label={copy.form.fields.email} type="email" placeholder={copy.form.fields.emailPlaceholder}/></div><div className="form-row"><Field name="organisation" label={copy.form.fields.organisation} placeholder={copy.form.fields.organisationPlaceholder}/><Field name="application-type" label={copy.form.fields.type} options={copy.form.fields.typeOptions}/></div><Field name="website" label={copy.form.fields.website} type="url" placeholder="https://"/><Field name="audience" label={copy.form.fields.audience} type="textarea" placeholder={copy.form.fields.audiencePlaceholder}/></FormLayout></section>
    </>
  );
}

function ContactPage({ locale }: PageProps) {
  const copy = getDictionary(locale).contact;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description}/>
      <section className="section"><FormLayout locale={locale} kicker={copy.form.kicker} title={copy.form.title} intro={copy.form.intro} noteTitle={copy.form.noteTitle} note={copy.form.note} formTitle={copy.form.formTitle} buttonLabel={copy.form.button} requestType="contact"><div className="form-row"><Field name="name" label={copy.form.fields.name} placeholder={copy.form.fields.namePlaceholder}/><Field label={copy.form.fields.email} type="email" placeholder={copy.form.fields.emailPlaceholder}/></div><Field name="subject" label={copy.form.fields.subject} options={copy.form.fields.subjectOptions}/><Field name="message" label={copy.form.fields.message} type="textarea" placeholder={copy.form.fields.messagePlaceholder}/></FormLayout></section>
      <section className="section section--soft"><div className="shell"><div className="section-heading"><div><p className="kicker">{copy.findUs.kicker}</p><h2>{copy.findUs.title}</h2></div><a className="button button--outline" href="https://maps.google.com/?q=De%20Broodfabriek%2C%20Volmerlaan%2012%2C%202288%20GD%20Rijswijk" target="_blank" rel="noopener noreferrer">{copy.findUs.maps} <MaterialIcon name="open_in_new" /></a></div><div className="map-card"><MaterialIcon className="map-card__pin" name="location_on" /><div className="map-card__body"><b>{copy.findUs.venue}</b><span>{copy.findUs.address}</span><span>{copy.findUs.country}</span></div></div></div></section>
    </>
  );
}

function ParisPage({ locale }: PageProps) {
  const copy = getDictionary(locale).paris;
  return (
    <>
      <PageHero locale={locale} title={copy.title} description={copy.description} image="/assets/paris-hero.jpg"><Link className="button button--white" href={pageHref(locale, "contact")}>{copy.heroCta} <MaterialIcon name="arrow_forward" /></Link></PageHero>
      <section className="section"><div className="shell split"><div className="split-copy"><p className="kicker">{copy.intro.kicker}</p><h2>{copy.intro.title}</h2><p>{copy.intro.body1}</p><p>{copy.intro.body2}</p></div><div className="quote-card"><p>{copy.intro.quote}</p><small>{copy.intro.quoteSource}</small></div></div></section>
    </>
  );
}

function LegalPage({ locale, legalTab = "privacy" }: PageProps) {
  const copy = getDictionary(locale).legal;
  const tabs = copy.tabs;
  const current = tabs[legalTab];
  return (
    <>
      <PageHero locale={locale} title={current.label} description={copy.heroDescription}/>
      <section className="section"><div className="shell legal-layout"><nav className="legal-nav" aria-label={copy.navLabel}>{(Object.keys(tabs) as LegalTab[]).map((tab)=><Link className={tab===legalTab?"is-active":""} href={pageHref(locale,"legal",tab)} key={tab}>{tabs[tab].label}</Link>)}</nav><article className="legal-copy"><p className="validation-banner">{copy.draftNotice}</p><h2>{current.heading}</h2><p>{current.intro}</p><h3>{copy.sections.scopeTitle}</h3><p>{copy.sections.scopeText}</p><h3>{copy.sections.responsibilitiesTitle}</h3><p>{copy.sections.responsibilitiesText}</p><h3>{copy.sections.contactTitle}</h3><p>{copy.sections.contactText}</p></article></div></section>
    </>
  );
}

export function PublicPageContent({
  page,
  locale,
  detail,
  legalTab,
  sector,
  event,
  managedExhibitors,
  floorPlan,
}: PageProps & { page: PublicPage; event?: PublishedEvent; managedExhibitors?: PublicExhibitor[]; floorPlan?: PublicFloorPlan | null }) {
  const props = { locale, detail, legalTab, sector, event, managedExhibitors, floorPlan };
  switch (page) {
    case "home": return <HomePage {...props} />;
    case "about": return <AboutPage {...props} />;
    case "exhibitors": return <ExhibitorsPage {...props} />;
    case "exhibitor-detail": return <ExhibitorDetailPage {...props} />;
    case "program": return <ProgramPage {...props} />;
    case "tickets": return <TicketsPage {...props} />;
    case "visit": return <VisitPage {...props} />;
    case "floor-plan": return <FloorPlanPage {...props} />;
    case "fair-match": return <FairMatchPage {...props} />;
    case "participate": return <ParticipatePage {...props} />;
    case "participant-info": return <ParticipantInfoPage {...props} />;
    case "media": return <MediaPage {...props} />;
    case "contact": return <ContactPage {...props} />;
    case "paris": return <ParisPage {...props} />;
    case "legal": return <LegalPage {...props} />;
  }
}
