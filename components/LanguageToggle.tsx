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
            ? "bg-[#00C4D4]/20 border-[#00C4D4] text-gray-950 dark:text-[#5CE1D6]"
            : "bg-transparent dark:bg-white/[0.07] border-gray-400/80 dark:border-white/20 text-gray-950 dark:text-slate-200 hover:border-gray-600 dark:hover:border-white/30"
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
      className={`inline-flex items-center p-0.5 rounded-full border border-gray-400/80 dark:border-white/20 bg-transparent dark:bg-white/[0.06] backdrop-blur-xs shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
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
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
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

