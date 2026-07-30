export const requestTypes = ["contact", "participation", "media", "fair_match"] as const;
export type PublicRequestType = (typeof requestTypes)[number];

const requiredFields: Record<PublicRequestType, readonly string[]> = {
  contact: ["name", "subject", "message"],
  participation: ["company", "contact", "phone", "interest", "about"],
  media: ["name", "organisation", "application-type", "website", "audience"],
  fair_match: ["first-name", "last-name", "phone", "request"],
};

const minimumLengths: Record<string, number> = {
  name: 2,
  "first-name": 2,
  "last-name": 2,
  company: 2,
  contact: 2,
  phone: 6,
  subject: 2,
  message: 10,
  interest: 2,
  about: 10,
  organisation: 2,
  "application-type": 2,
  website: 8,
  audience: 10,
  request: 10,
};

export const maxRequestBodyBytes = 16_384;
export const maxRequestFields = 25;
export const maxRequestFieldLength = 2_000;

export type ValidPublicRequest = {
  type: PublicRequestType;
  email: string;
  fields: Record<string, string>;
};

export function parsePublicRequest(value: unknown): ValidPublicRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (
    typeof body.type !== "string" ||
    !requestTypes.includes(body.type as PublicRequestType) ||
    body.website ||
    body.consent !== true ||
    typeof body.email !== "string"
  ) {
    return null;
  }

  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!body.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) return null;

  const entries = Object.entries(body.fields);
  if (!entries.length || entries.length > maxRequestFields) return null;
  const fields: Record<string, string> = {};
  let totalLength = 0;
  for (const [key, rawValue] of entries) {
    if (!/^[a-z0-9_-]{1,80}$/.test(key) || typeof rawValue !== "string") return null;
    const fieldValue = rawValue.trim();
    if (fieldValue.length > maxRequestFieldLength) return null;
    totalLength += fieldValue.length;
    if (totalLength > 12_000) return null;
    fields[key] = fieldValue;
  }

  const type = body.type as PublicRequestType;
  if (
    requiredFields[type].some((key) => {
      const fieldValue = fields[key] ?? "";
      return fieldValue.length < (minimumLengths[key] ?? 1);
    })
  ) {
    return null;
  }

  if (type === "media") {
    try {
      const website = new URL(fields.website);
      if (!["http:", "https:"].includes(website.protocol)) return null;
    } catch {
      return null;
    }
  }

  return { type, email, fields };
}

export function isAllowedRequestOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([new URL(request.url).origin]);
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try {
      allowed.add(new URL(configured).origin);
    } catch {
      // Invalid configuration must not broaden the origin boundary.
    }
  }
  return allowed.has(origin);
}
