"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, ArrowRight, Clock, Hotel, ShieldCheck } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";

export default function Hero() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#03070C] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-gray-200 dark:border-white/[0.06] transition-colors duration-300">
      {/* Ambient background gradients with soft atmospheric depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.14),transparent_70%)] blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
      <div className="absolute -bottom-20 left-0 w-[450px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.08),transparent_70%)] blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 animate-slide-up">
            
            {/* Main Headline */}
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white tracking-tight leading-[1.12]">
              Don’t waste your luggage on yesterday.
            </h1>

            {/* Sub-headline & High-Contrast Description */}
            <div className="space-y-3 max-w-xl">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#5CE1D6] tracking-tight">
                Fresh clothes. Same day.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 leading-relaxed font-normal">
                Professional laundry service for your everyday life and travels. Pick up from your hotel lobby or doorstep before 10 AM and enjoy our 12-hour express laundry service delivered back the same evening.
              </p>
            </div>

            {/* Action Buttons - Solid White Luxury Dark Styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <a
                href={getNearestChatUrl("Hello Laverie Laundry! I would like to book a laundry pickup today.")}
                onClick={(e) => {
                  e.preventDefault();
                  openNearestChat("Hello Laverie Laundry! I would like to book a laundry pickup today.");
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-[#00C4D4]/25 hover:shadow-lg hover:shadow-[#00C4D4]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
                <span>Book via WhatsApp</span>
              </a>

              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/30 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
              >
                <span>View Packages</span>
              </a>
            </div>

            {/* Key trust indicators with sharp contrast */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-xs text-gray-600 dark:text-slate-300">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] border border-gray-100 dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group transition-all duration-200 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#152B3A] text-[#00C4D4] flex items-center justify-center shrink-0 shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">12H Express</span>
                  <span className="text-gray-500 dark:text-slate-300">Evening return</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] border border-gray-100 dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group transition-all duration-200 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#152B3A] text-[#00C4D4] flex items-center justify-center shrink-0 shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">Hotel Concierge</span>
                  <span className="text-gray-500 dark:text-slate-300">Lobby hand-off</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] border border-gray-100 dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group transition-all duration-200 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#152B3A] text-[#00C4D4] flex items-center justify-center shrink-0 shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">Ozone Clean</span>
                  <span className="text-gray-500 dark:text-slate-300">Fiber-safe care</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Hero Visual */}
          <div className="lg:col-span-5 relative animate-float">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/80 border border-gray-200/80 dark:border-white/[0.08] bg-white dark:bg-[#07111A] transition-transform hover:scale-[1.01] duration-500">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/images/hero/laverie-hero-clean.jpg"
                    alt="Laverie Premium Laundry - Clean travel clothes and same-day express service"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
