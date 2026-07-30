import { en, type Dictionary } from "./en";
import { nl } from "./nl";
import { ru } from "./ru";
import { tr } from "./tr";

import type { Locale } from "../site";

/*
 * Arabic content is kept in a separate module while it is reviewed. Importing
 * it lazily here would make the public rendering asynchronous, so the current
 * typed dictionary is exported normally with the other four locales.
 */
import { ar } from "./ar";

export const dictionaries: Record<Locale, Dictionary> = { en, nl, tr, ru, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
