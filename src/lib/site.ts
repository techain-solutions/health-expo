export const locales = ["en", "nl", "tr", "ru", "ar"] as const;

export type Locale = (typeof locales)[number];

export const publicPages = [
  "home",
  "about",
  "exhibitors",
  "exhibitor-detail",
  "program",
  "tickets",
  "visit",
  "floor-plan",
  "fair-match",
  "participate",
  "participant-info",
  "media",
  "contact",
  "paris",
  "legal",
] as const;

export type PublicPage = (typeof publicPages)[number];

export const legalTabs = ["privacy", "cookies", "terms", "visitors", "exhibitors"] as const;
export type LegalTab = (typeof legalTabs)[number];

export const adminPages = ["dashboard", "event", "exhibitors", "floor-plan", "requests", "team"] as const;
export type AdminPage = (typeof adminPages)[number];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", dir: "ltr" },
  nl: { label: "Nederlands", dir: "ltr" },
  tr: { label: "Türkçe", dir: "ltr" },
  ru: { label: "Русский", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
};

type ShellCopy = {
  about: string;
  exhibitors: string;
  program: string;
  visit: string;
  tickets: string;
  plan: string;
  fairMatch: string;
  exhibit: string;
  media: string;
  contact: string;
  explore: string;
  participate: string;
  documents: string;
  hero: string;
  heroBody: string;
  primary: string;
  secondary: string;
};

export const shellCopy: Record<Locale, ShellCopy> = {
  en: {
    about: "About",
    exhibitors: "Exhibitors",
    program: "Programme",
    visit: "Visit",
    tickets: "Tickets",
    plan: "Floor plan",
    fairMatch: "Fair Match",
    exhibit: "Exhibit",
    media: "Media",
    contact: "Contact",
    explore: "Explore",
    participate: "Participate",
    documents: "Documents",
    hero: "Where health, beauty and opportunity meet.",
    heroBody:
      "Meet leaders in health, beauty, wellness and medical tourism.",
    primary: "Plan your visit",
    secondary: "Exhibit with us",
  },
  nl: {
    about: "Over ons",
    exhibitors: "Exposanten",
    program: "Programma",
    visit: "Bezoeken",
    tickets: "Tickets",
    plan: "Plattegrond",
    fairMatch: "Fair Match",
    exhibit: "Deelnemen",
    media: "Media",
    contact: "Contact",
    explore: "Ontdekken",
    participate: "Deelnemen",
    documents: "Documenten",
    hero: "Waar gezondheid, beauty en kansen samenkomen.",
    heroBody:
      "Ontmoet toonaangevende zorgprofessionals, beauty-innovators, wellness-experts en specialisten in internationaal medisch toerisme—alles onder één dak.",
    primary: "Plan je bezoek",
    secondary: "Neem deel",
  },
  tr: {
    about: "Hakkımızda",
    exhibitors: "Katılımcılar",
    program: "Program",
    visit: "Ziyaret",
    tickets: "Biletler",
    plan: "Fuar planı",
    fairMatch: "Fair Match",
    exhibit: "Katıl",
    media: "Medya",
    contact: "İletişim",
    explore: "Keşfet",
    participate: "Katılım",
    documents: "Belgeler",
    hero: "Sağlık, güzellik ve fırsatın buluştuğu yer.",
    heroBody:
      "Dünya standartlarında sağlık hizmetleri, güzellik inovasyonu, bütünsel yaşam ve uluslararası sağlık turizmi profesyonelleriyle tek çatı altında buluşun.",
    primary: "Ziyaretini planla",
    secondary: "Bizimle katıl",
  },
  ru: {
    about: "О выставке",
    exhibitors: "Участники",
    program: "Программа",
    visit: "Посещение",
    tickets: "Билеты",
    plan: "План выставки",
    fairMatch: "Fair Match",
    exhibit: "Участвовать",
    media: "Медиа",
    contact: "Контакты",
    explore: "Узнать больше",
    participate: "Участие",
    documents: "Документы",
    hero: "Место встречи здоровья, красоты и возможностей.",
    heroBody:
      "Встречайтесь с ведущими специалистами в сфере здравоохранения, красоты, велнеса и медицинского туризма под одной крышей.",
    primary: "Спланировать визит",
    secondary: "Стать участником",
  },
  ar: {
    about: "عن المعرض",
    exhibitors: "العارضون",
    program: "البرنامج",
    visit: "الزيارة",
    tickets: "التذاكر",
    plan: "مخطط المعرض",
    fairMatch: "Fair Match",
    exhibit: "شارك كعارض",
    media: "الإعلام",
    contact: "تواصل معنا",
    explore: "استكشف",
    participate: "المشاركة",
    documents: "المستندات",
    hero: "حيث تلتقي الصحة والجمال والفرص.",
    heroBody:
      "تواصل مع نخبة من خبراء الرعاية الصحية وابتكارات الجمال والعافية الشاملة والسياحة العلاجية الدولية تحت سقف واحد.",
    primary: "خطط لزيارتك",
    secondary: "شارك معنا",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isAdminPage(value: string): value is AdminPage {
  return adminPages.includes(value as AdminPage);
}

export function pageHref(locale: Locale, page: PublicPage, extra?: string): string {
  if (page === "home") return `/${locale}`;
  if (page === "exhibitor-detail") return `/${locale}/exhibitors/${extra ?? "nova-medical-group"}`;
  if (page === "paris") return `/${locale}/paris-2027`;
  if (page === "legal") return `/${locale}/legal/${extra ?? "privacy"}`;
  return `/${locale}/${page}`;
}

export function resolvePublicRoute(slug: string[] = []): {
  page: PublicPage;
  detail?: string;
  legalTab?: LegalTab;
} | null {
  if (slug.length === 0) return { page: "home" };
  if (slug[0] === "exhibitors" && slug[1]) return { page: "exhibitor-detail", detail: slug[1] };
  if (slug[0] === "paris-2027" && slug.length === 1) return { page: "paris" };
  if (slug[0] === "legal") {
    const tab = slug[1] ?? "privacy";
    if (!legalTabs.includes(tab as LegalTab) || slug.length > 2) return null;
    return { page: "legal", legalTab: tab as LegalTab };
  }
  if (slug.length !== 1 || !publicPages.includes(slug[0] as PublicPage)) return null;
  return { page: slug[0] as PublicPage };
}
