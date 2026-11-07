"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale } from "@/data/translations";
import { getStaticTranslation, getLocalized } from "@/lib/i18nHelper";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  localize: <T extends Record<string, any>>(item: T | null | undefined, field: string) => any;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "laverie_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (savedLocale === "en" || savedLocale === "id") {
        setLocaleState(savedLocale);
      }
      setMounted(true);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
    }
  }, []);

  const toggleLocale = useCallback(() => {
    const nextLocale: Locale = locale === "id" ? "en" : "id";
    setLocale(nextLocale);
  }, [locale, setLocale]);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => {
      return getStaticTranslation(path, locale, params);
    },
    [locale]
  );

  const localize = useCallback(
    <T extends Record<string, any>>(item: T | null | undefined, field: string) => {
      return getLocalized(item, field, locale);
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        localize,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

