"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Philosophy() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative isolate w-full min-h-screen lg:h-screen flex items-center overflow-hidden bg-[#FAF8F5] dark:bg-[#070D12] transition-colors duration-300"
    >
      {/* Background Image: High-res photograph showing sunlit window, hydrangeas, tea cup on left, and soft wall on right */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/about/laverie-philosophy-bg.jpg"
          alt="Laverie Philosophy - Simplify Your Day"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left lg:object-center w-full h-full opacity-80 dark:opacity-35"
          quality={95}
        />
        {/* High-contrast solid fade mask: ensures 100% crisp legibility on the right while flowers and window stay vibrant */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-white/80 to-[#FAF8F5] dark:from-transparent dark:via-[#070D12]/70 dark:to-[#070D12] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column Spacer on desktop: Keeps the hydrangeas, tea cup & window completely unobstructed */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />

          {/* Right Column: Editorial Typography with Maximum Contrast */}
          <div className="lg:col-span-7 xl:col-span-6 max-w-xl mx-auto lg:mx-0 flex flex-col space-y-6 text-left bg-white/90 dark:bg-black/75 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none shadow-sm lg:shadow-none">
            
            {/* Category Tag */}
            <div className="space-y-2">
              <span className="font-body font-bold text-xs tracking-[0.25em] text-[#5A4333] dark:text-[#E8D8C8] uppercase">
                {t("philosophy.tag")}
              </span>

              {/* Main Headline — Libre Baskerville (Italic Serif) */}
              <h2 className="font-headline font-[family-name:var(--font-headline)] italic font-bold text-4xl sm:text-5xl lg:text-[54px] text-gray-950 dark:text-white leading-[1.08] tracking-tight">
                {t("philosophy.headline")}
              </h2>
            </div>

            {/* Subheadline — Canela */}
            <h3 className="font-subheadline font-[family-name:var(--font-subheadline)] font-semibold sm:font-medium text-xl sm:text-2xl lg:text-[26px] text-gray-950 dark:text-slate-100 leading-snug tracking-tight">
              {t("philosophy.subheadline")}
            </h3>

            {/* Body Text — Manrope (High contrast text-gray-950 in light mode) */}
            <div className="font-body font-[family-name:var(--font-body)] font-medium sm:font-normal text-sm sm:text-base text-gray-900 dark:text-slate-200 leading-relaxed space-y-3.5">
              <p>
                {t("philosophy.p1")}
              </p>
              <p>
                {t("philosophy.p2")}
              </p>
              <p>
                {t("philosophy.p3")}
              </p>
            </div>

            {/* Centered Divider with Laverie Cyan Emblem */}
            <div className="flex items-center justify-center gap-4 pt-2 pb-1">
              <div className="h-[1px] w-20 sm:w-28 bg-gray-400/80 dark:bg-white/30" />
              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                <Image
                  src="/logo/laverie-icon.png"
                  alt="Laverie Emblem"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="h-[1px] w-20 sm:w-28 bg-gray-400/80 dark:bg-white/30" />
            </div>

            {/* Tagline — Canela Italic */}
            <p className="font-subheadline font-[family-name:var(--font-subheadline)] italic font-semibold sm:font-medium text-center text-base sm:text-lg text-gray-950 dark:text-slate-100 tracking-wide">
              {t("philosophy.tagline")}
            </p>

            {/* Brand Signature Footnote */}
            <div className="text-center space-y-0.5 pt-1">
              <p className="font-body font-bold text-[11px] sm:text-xs tracking-[0.22em] text-[#007A87] dark:text-[#5CE1D6] uppercase">
                {t("philosophy.brand")}
              </p>
              <p className="font-headline font-[family-name:var(--font-headline)] italic font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-300">
                {t("philosophy.brandTagline")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
