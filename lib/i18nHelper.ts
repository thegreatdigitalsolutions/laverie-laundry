import { translations, Locale, TranslationDictionary } from "@/data/translations";

/**
 * Retrieves the localized value for a given field from an item.
 * If locale is "en", it checks for `${field}_en` first; otherwise it falls back to the original Indonesian field.
 */
export function getLocalized<T extends Record<string, any>>(
  item: T | null | undefined,
  field: string,
  locale: Locale
): any {
  if (!item) return "";

  if (locale === "en") {
    const enField = `${field}_en`;
    const enVal = item[enField];
    if (Array.isArray(enVal)) {
      if (enVal.length > 0) return enVal;
    } else if (enVal !== undefined && enVal !== null && enVal !== "") {
      return enVal;
    }
  }

  return item[field] !== undefined && item[field] !== null ? item[field] : "";
}

/**
 * Returns localized string for static dictionary paths like "nav.about"
 */
export function getStaticTranslation(
  path: string,
  locale: Locale,
  params?: Record<string, string | number>
): string {
  const parts = path.split(".");
  let current: any = translations[locale] || translations.id;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return path; // Fallback to key
    }
  }

  if (typeof current !== "string") {
    return path;
  }

  let result = current;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      result = result.replaceAll(`{${key}}`, String(value));
    });
  }

  return result;
}

