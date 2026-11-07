"use client";

import React from "react";
import { MessageCircle, ArrowRight, Clock, MapPin } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";

export default function CTA() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  return (
    <section className="py-24 bg-white dark:bg-[#020508] text-gray-900 dark:text-white relative overflow-hidden border-b border-gray-100 dark:border-transparent transition-colors duration-300">
      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Headline */}
        <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          Ready to give your <br />
          clothes some care?
        </h2>

        <p className="text-base sm:text-xl text-gray-600 dark:text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Let Laverie handle the laundry so you can focus on what matters. Book before <strong className="text-gray-900 dark:text-white font-bold">10:00 AM</strong> for evening delivery straight to your hotel lobby or doorstep.
        </p>

        {/* Primary Action Button - Solid White Luxury Dark Styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getNearestChatUrl("Hello Laverie Laundry! I am ready to book a pickup.")}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat("Hello Laverie Laundry! I am ready to book a pickup.");
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md shadow-[#00C4D4]/25 hover:shadow-lg hover:shadow-[#00C4D4]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current text-gray-950" />
            <span>Book via WhatsApp</span>
          </a>

          <a
            href="#packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/30 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Review Package Rates</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-14 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-500 dark:text-slate-300">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> 12-Hour Express Turnaround
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> Selected Hotels & Doorstep Areas
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C4D4] dark:bg-[#5CE1D6]"></span> Instant WhatsApp Confirmation
          </span>
        </div>
      </div>
    </section>
  );
}
