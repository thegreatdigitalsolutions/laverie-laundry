"use client";

import React from "react";
import { MessageCircle, ArrowRight, Clock, MapPin } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CTA() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { t, locale } = useLanguage();

  const chatMessage =
    locale === "en"
      ? "Hello Laverie Laundry! I am ready to book a pickup."
      : "Halo Laverie Laundry! Saya siap memesan layanan antar jemput laundry.";

  return (
    <section className="py-24 bg-white dark:bg-[#020508] text-gray-900 dark:text-white relative overflow-hidden border-b border-gray-100 dark:border-transparent transition-colors duration-300">
      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Headline */}
        <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          {locale === "en" ? (
            <>Ready to give your <br /> clothes some care?</>
          ) : (
            <>Siap memanjakan pakaian Anda <br /> dengan perawatan terbaik?</>
          )}
        </h2>

        <p className="text-base sm:text-xl text-gray-600 dark:text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {locale === "en" ? (
            <>Let Laverie handle the laundry so you can focus on what matters. Book before <strong className="text-gray-900 dark:text-white font-bold">10:00 AM</strong> for evening delivery straight to your hotel lobby or doorstep.</>
          ) : (
            <>Biarkan Laverie menangani cucian Anda agar Anda dapat menikmati hari sepenuhnya. Pesan sebelum <strong className="text-gray-900 dark:text-white font-bold">10:00 Pagi</strong> untuk pengantaran sore/malam langsung ke lobi hotel atau pintu Anda.</>
          )}
        </p>

        {/* Primary Action Button - Solid White Luxury Dark Styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getNearestChatUrl(chatMessage)}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(chatMessage);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md shadow-[#00C4D4]/25 hover:shadow-lg hover:shadow-[#00C4D4]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current text-gray-950" />
            <span>{t("nav.bookWhatsapp")}</span>
          </a>

          <a
            href="#packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/30 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t("hero.exploreBtn")}</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-14 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-500 dark:text-slate-300">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> {locale === "en" ? "12-Hour Express Turnaround" : "Layanan Kilat 12 Jam"}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> {locale === "en" ? "Selected Hotels & Doorstep Areas" : "Area Hotel & Penjemputan Pilihan"}
          </span>
          <span className="flex items-center gap-2">
            <WhatsAppIcon className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6] shrink-0" /> {locale === "en" ? "Instant WhatsApp Confirmation" : "Konfirmasi Cepat via WhatsApp"}
          </span>
        </div>
      </div>
    </section>
  );
}
