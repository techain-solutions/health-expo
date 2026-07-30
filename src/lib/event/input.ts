export type EventInput = {
  title: string;
  startsOn: string;
  endsOn: string;
  opensAt: string;
  closesAt: string;
  venue: string;
  city: string;
  address: string;
  description: string;
  visitorInformation: string;
  ticketUrl: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
// Postgres returns `time` columns as HH:MM:SS, so both shapes have to be accepted.
const timePattern = /^(\d{2}):(\d{2})(?::\d{2})?$/;

const keys = [
  "title",
  "startsOn",
  "endsOn",
  "opensAt",
  "closesAt",
  "venue",
  "city",
  "address",
  "description",
  "visitorInformation",
  "ticketUrl",
] as const;

/** Trims seconds so the value round-trips through an `<input type="time">`. */
export function normalizeTime(value: string): string | null {
  const match = timePattern.exec(value.trim());
  if (!match) return null;
  const [, hours, minutes] = match;
  if (Number(hours) > 23 || Number(minutes) > 59) return null;
  return `${hours}:${minutes}`;
}

export function parseEventInput(value: Record<string, unknown>): EventInput | null {
  if (keys.some((key) => typeof value[key] !== "string")) return null;
  const input = Object.fromEntries(
    keys.map((key) => [key, (value[key] as string).trim()]),
  ) as EventInput;

  const opensAt = normalizeTime(input.opensAt);
  const closesAt = normalizeTime(input.closesAt);
  if (!opensAt || !closesAt || closesAt <= opensAt) return null;
  input.opensAt = opensAt;
  input.closesAt = closesAt;

  if (
    input.title.length < 2 ||
    input.title.length > 140 ||
    input.venue.length < 2 ||
    input.city.length < 2 ||
    input.address.length < 5 ||
    input.description.length < 20 ||
    input.description.length > 2000 ||
    input.visitorInformation.length > 2000 ||
    !datePattern.test(input.startsOn) ||
    !datePattern.test(input.endsOn) ||
    input.endsOn < input.startsOn
  ) {
    return null;
  }

  if (input.ticketUrl) {
    try {
      const url = new URL(input.ticketUrl);
      if (!["http:", "https:"].includes(url.protocol)) return null;
    } catch {
      return null;
    }
  }

  return input;
}
