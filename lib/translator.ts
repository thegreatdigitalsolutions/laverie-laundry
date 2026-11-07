/**
 * Server-side auto translation helper from Indonesian (id) to English (en).
 * Uses Google's translation service with in-memory caching for speed.
 */

const translationCache = new Map<string, string>();

export async function translateIdToEn(text: string): Promise<string> {
  if (!text || typeof text !== "string") return "";
  const trimmed = text.trim();
  if (!trimmed) return "";

  // Check cache
  if (translationCache.has(trimmed)) {
    return translationCache.get(trimmed)!;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      next: { revalidate: 86400 }, // Cache translation response
    });

    if (!res.ok) {
      return trimmed;
    }

    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map((chunk: any) => chunk[0] || "").join("");
      if (translated) {
        translationCache.set(trimmed, translated);
        return translated;
      }
    }
    return trimmed;
  } catch (err) {
    console.error("Translation error for:", trimmed, err);
    return trimmed;
  }
}

export async function translateListIdToEn(list: string[]): Promise<string[]> {
  if (!Array.isArray(list)) return [];
  return Promise.all(list.map((item) => translateIdToEn(item)));
}

