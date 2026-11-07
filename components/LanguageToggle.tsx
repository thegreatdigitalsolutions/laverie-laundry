"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
  variant?: "pill" | "compact";
}

export default function LanguageToggle({ className = "", variant = "pill" }: LanguageToggleProps) {
  const { locale, setLocale, toggleLocale } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={`Switch to ${locale === "id" ? "English" : "Indonesian"}`}
        className={`h-9 px-3 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
          locale === "en"
            ? "bg-[#00C4D4]/15 border-[#00C4D4]/40 text-[#00838F] dark:text-[#5CE1D6]"
            : "bg-gray-50 dark:bg-white/[0.07] border-gray-200 dark:border-white/15 text-gray-700 dark:text-slate-200 hover:border-gray-300 dark:hover:border-white/25"
        } hover:scale-105 active:scale-95 ${className}`}
      >
        <Globe className="w-3.5 h-3.5 shrink-0 text-[#00C4D4]" />
        <span>{locale.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 rounded-full border border-gray-200 dark:border-white/15 bg-gray-100/90 dark:bg-white/[0.06] backdrop-blur-xs shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          locale === "id"
            ? "bg-[#00C4D4] text-gray-950 shadow-xs"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          locale === "en"
            ? "bg-[#00C4D4] text-gray-950 shadow-xs"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}

