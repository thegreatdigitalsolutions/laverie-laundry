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
        className={`h-9 px-3 rounded-full border border-gray-400/70 dark:border-white/30 bg-white/60 dark:bg-white/[0.08] backdrop-blur-md text-gray-950 dark:text-white hover:bg-white/90 dark:hover:bg-white/[0.18] transition-all duration-200 flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs ${className}`}
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
      className={`h-9 inline-flex items-center p-1 rounded-full border border-gray-400/70 hover:border-gray-600 dark:border-white/30 dark:hover:border-white/50 bg-white/60 dark:bg-white/[0.08] backdrop-blur-md shadow-xs transition-all duration-200 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={`h-7 px-2.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
          locale === "id"
            ? "bg-[#00C4D4] text-gray-950 shadow-xs"
            : "text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white"
        }`}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`h-7 px-2.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
          locale === "en"
            ? "bg-[#00C4D4] text-gray-950 shadow-xs"
            : "text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}

