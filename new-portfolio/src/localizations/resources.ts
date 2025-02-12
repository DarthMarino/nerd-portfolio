import * as i18n from "@solid-primitives/i18n";
import type * as en from "./i18n/en";

export type Locale = "en" | "es";
export type RawDictionary = typeof en.dict;
export type Dictionary = i18n.Flatten<RawDictionary>;

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const dict: RawDictionary = (await import(`./i18n/${locale}.ts`)).dict;
  return i18n.flatten(dict); // flatten the dictionary to make all nested keys available top-level
}
