import type { Locale } from "@/lib/site";

const flagSymbols: Record<Locale, string> = {
  en: "flag-gb",
  nl: "flag-nl",
  tr: "flag-tr",
  ru: "flag-ru",
  ar: "flag-sa",
};

export function FlagSprite() {
  return (
    <svg
      aria-hidden="true"
      className="flag-sprite"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id="flag-gb" viewBox="0 0 60 40">
        <clipPath id="flag-gb-quadrants">
          <path d="M30 20 60 20 60 40Z M30 20 30 40 0 40Z M30 20 0 20 0 0Z M30 20 30 0 60 0Z" />
        </clipPath>
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
        <path
          d="M0 0 60 40M60 0 0 40"
          stroke="#C8102E"
          strokeWidth="5"
          clipPath="url(#flag-gb-quadrants)"
        />
        <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
        <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
      </symbol>
      <symbol id="flag-nl" viewBox="0 0 60 40">
        <rect width="60" height="40" fill="#fff" />
        <rect width="60" height="13.33" fill="#AE1C28" />
        <rect y="26.67" width="60" height="13.33" fill="#21468B" />
      </symbol>
      <symbol id="flag-tr" viewBox="0 0 60 40">
        <rect width="60" height="40" fill="#E30A17" />
        <circle cx="24" cy="20" r="9" fill="#fff" />
        <circle cx="27.5" cy="20" r="7.2" fill="#E30A17" />
        <path d="m35.4 20 8.1-2.63-5.01 6.9v-8.53l5.01 6.9z" fill="#fff" />
      </symbol>
      <symbol id="flag-ru" viewBox="0 0 60 40">
        <rect width="60" height="40" fill="#fff" />
        <rect y="13.33" width="60" height="13.33" fill="#0039A6" />
        <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
      </symbol>
      <symbol id="flag-sa" viewBox="0 0 60 40">
        <rect width="60" height="40" fill="#165D31" />
        <path
          d="M12 15.5h30M12 19h22M12 22.5h26"
          stroke="#fff"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path d="M12 27.5h30" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M42 26v3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </symbol>
    </svg>
  );
}

export function LocaleFlag({ locale }: { locale: Locale }) {
  if (locale === "ar") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="flag" src="/assets/flag-sa.svg" alt="" aria-hidden="true" />;
  }
  return (
    <svg className="flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
      <use href={`#${flagSymbols[locale]}`} />
    </svg>
  );
}
