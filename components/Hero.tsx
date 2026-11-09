"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { MessageCircle, ChevronDown } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { t } = useLanguage();

  const chatMessage = t("common.chatPrompt");

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
      {/* Background Image: Reversed horizontally, clean logo removal, normal natural brightness (not darkened) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/hero/laverie-hero-bg.jpg"
          alt="Laverie Luxury Laundry Atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
          quality={95}
        />
      </div>

      {/* Soft directional gradient for readability behind text on the left;
          the right half (perfume, candle, floral bokeh) remains 100% natural and un-darkened */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-[#03070C]/90 dark:via-[#03070C]/50 dark:to-transparent pointer-events-none transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.08),transparent_70%)] blur-3xl pointer-events-none z-[1]" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10 lg:pt-14 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          {/* Main Headline */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-950 dark:text-white tracking-tight leading-[1.12] drop-shadow-xs">
            {t("hero.title")}
          </h1>

          {/* Sub-headline & Description */}
          <div className="space-y-3 max-w-xl">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#5CE1D6] tracking-tight">
              {t("hero.highlight")}
            </p>
            <p className="text-base sm:text-lg text-gray-800 dark:text-slate-200 leading-relaxed font-normal">
              {t("hero.description")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <a
              href={getNearestChatUrl(chatMessage)}
              onClick={(e) => {
                e.preventDefault();
                openNearestChat(chatMessage);
              }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-[#00C4D4]/25 hover:shadow-lg hover:shadow-[#00C4D4]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
              <span>{t("hero.bookBtn")}</span>
            </a>

            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/80 dark:bg-white/[0.12] backdrop-blur-md hover:bg-white dark:hover:bg-white/[0.20] text-gray-800 dark:text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
            >
              <span>{t("hero.exploreBtn")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Arrow Only (No encapsulating box/circle) */}
      <div className="relative z-10 pb-8 flex justify-center">
        <button
          type="button"
          onClick={scrollToNextSection}
          className="text-[#00C4D4] dark:text-[#5CE1D6] hover:opacity-80 transition-opacity cursor-pointer animate-scroll-bounce p-2"
          title="Scroll down"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 stroke-[2.2]" />
        </button>
      </div>
    </section>
  );
}
