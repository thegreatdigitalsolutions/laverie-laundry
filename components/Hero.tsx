"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  const { openNearestChat, getNearestChatUrl, isWithin5km } = useOutlets();
  const { t, locale } = useLanguage();

  const chatMessage = t("common.chatPrompt");
  const bookBtnText = isWithin5km
    ? t("hero.bookBtn")
    : locale === "en"
    ? "Chat with Us"
    : "Chat dengan Kami";

  const scrollToNextSection = useCallback(() => {
    const nextSection = document.getElementById("about") || document.getElementById("process");
    if (!nextSection) return;

    const navOffset = 72;
    const targetY = nextSection.getBoundingClientRect().top + window.pageYOffset - navOffset;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden transition-colors duration-300 pt-20 sm:pt-24 pb-8"
    >
      {/* Background Image: Clean logo removal, normal natural brightness */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/hero/laverie-hero-bg.jpg"
          alt="Laverie Luxury Laundry Atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-center w-full h-full"
          quality={95}
        />
      </div>

      {/* Targeted lightening/darkening gradient specifically behind the text area on the left;
          keeps text 100% crisp and legible while the perfume bottle and flowers on the right remain natural */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[80%] lg:w-[62%] z-[1] bg-gradient-to-r from-white/95 via-white/85 sm:via-white/75 to-transparent dark:from-[#03070C]/95 dark:via-[#03070C]/85 sm:dark:via-[#03070C]/75 dark:to-transparent pointer-events-none transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.08),transparent_70%)] blur-3xl pointer-events-none z-[1]" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10 lg:pt-14 relative z-10 flex-1 flex flex-col justify-center">
        <div data-aos="fade-up" data-aos-duration="800" className="max-w-2xl space-y-6">
          {/* Main Headline — Libre Baskerville */}
          <h1 className="font-headline font-[family-name:var(--font-headline)] font-bold text-4xl sm:text-5xl lg:text-[56px] text-gray-950 dark:text-white tracking-tight leading-[1.12]">
            {t("hero.title")}
          </h1>

          {/* Sub-headline & Description — Canela & Manrope */}
          <div className="space-y-3 max-w-xl">
            <p className="font-subheadline font-[family-name:var(--font-subheadline)] text-2xl sm:text-3xl font-medium sm:font-normal text-gray-950 dark:text-[#9CC8BE] tracking-tight">
              {t("hero.highlight")}
            </p>
            <p className="font-body font-[family-name:var(--font-body)] text-base sm:text-lg text-gray-900 dark:text-slate-100 leading-relaxed font-medium sm:font-normal">
              {t("hero.description")}
            </p>
          </div>

          {/* Divider & Action Buttons Group — Centered on mobile, left-aligned on desktop */}
          <div className="w-full sm:w-fit flex flex-col items-center mx-auto sm:mx-0 pt-2">
            
            {/* Divider Centered in the Middle of the Buttons */}
            <div className="flex items-center justify-center gap-3 pb-3.5">
              <div className="h-[1px] w-14 sm:w-20 bg-gray-400/70 dark:bg-white/25" />
              <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                <Image
                  src="/logo/laverie-icon.png"
                  alt="Laverie Emblem"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <div className="h-[1px] w-14 sm:w-20 bg-gray-400/70 dark:bg-white/25" />
            </div>

            {/* Action Buttons — Elevated Luxury Pair */}
            <div className="font-body font-[family-name:var(--font-body)] flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full max-w-xs sm:max-w-none sm:w-auto">
              {/* Primary: Solid deep ocean teal — bold, refined, and comfortable to look at in dark mode */}
              <a
                href={getNearestChatUrl(chatMessage)}
                onClick={(e) => {
                  e.preventDefault();
                  openNearestChat(chatMessage);
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#607F78] hover:bg-[#4D6962] active:bg-[#3E554F] text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-md shadow-[#607F78]/25 hover:shadow-lg hover:shadow-[#607F78]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                <span>{bookBtnText}</span>
              </a>

              {/* Secondary: High-contrast frosted glass with micro-arrow */}
              <a
                href="#packages"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("laverie-nav-scroll"));
                  const pkg = document.getElementById("packages");
                  if (pkg) {
                    const navOffset = 72;
                    const targetY = pkg.getBoundingClientRect().top + window.pageYOffset - navOffset;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
                className="group inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/80 hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-gray-950 dark:text-white border border-gray-300/80 hover:border-gray-500 dark:border-white/20 dark:hover:border-white/35 backdrop-blur-md font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-sm"
              >
                <span>{t("hero.exploreBtn")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Arrow Only (No encapsulating box/circle) */}
      <div className="relative z-10 pb-8 flex justify-center">
        <button
          type="button"
          onClick={scrollToNextSection}
          className="text-[#78958F] dark:text-[#9CC8BE] hover:opacity-80 transition-opacity cursor-pointer animate-scroll-bounce p-2"
          title="Scroll down"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
}
