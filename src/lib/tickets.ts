export function safeTicketDestination(ticketUrl: string | null, siteUrl: string, locale = "en") {
  const safeLocale = ["en", "nl", "tr", "ru", "ar"].includes(locale) ? locale : "en";
  if (!ticketUrl) return new URL(`/${safeLocale}/tickets`, siteUrl);
  try {
    const target = new URL(ticketUrl);
    return target.protocol === "http:" || target.protocol === "https:"
      ? target
      : new URL(`/${safeLocale}/tickets`, siteUrl);
  } catch {
    return new URL(`/${safeLocale}/tickets`, siteUrl);
  }
}
