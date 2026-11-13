"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useOutlets } from "@/context/OutletsContext";
import { servicesData, ServiceItem } from "@/data/services";
import SectionHeader from "@/components/SectionHeader";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CoreServices() {
  const { t, locale } = useLanguage();
  const { openNearestChat, getNearestChatUrl, isWithin5km } = useOutlets();
  const isEn = locale === "en";
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleOrder = (svc: ServiceItem) => {
    const baseMsg = isEn ? svc.whatsappMessage_en : svc.whatsappMessage;
    const msg = isWithin5km
      ? `${baseMsg}${
          isEn
            ? " (Location within 5 km free pickup radius)."
            : " (Lokasi dalam radius < 5 km - Gratis Antar Jemput)."
        }`
      : baseMsg;

    if (openNearestChat) {
      openNearestChat(msg, isWithin5km ? "order" : "chat");
    } else {
      window.open(getNearestChatUrl(msg, isWithin5km ? "order" : "chat"), "_blank", "noopener,noreferrer");
    }
  };

  const toggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#FAF8F5] dark:bg-[#070E12] py-24 sm:py-32 text-[#26312E] dark:text-[#F3F2EC] transition-colors duration-500"
    >
      {/* Background atelier texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.14] dark:opacity-[0.08]"
        style={{ backgroundImage: "url('/images/about/laverie-atelier.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/96 to-[#FAF8F5]/90 dark:from-[#070E12]/90 dark:via-[#070E12]/96 dark:to-[#070E12]/90"
      />

      {/* Atmospheric ambient glows */}
      <div className="pointer-events-none absolute -right-36 top-16 h-[520px] w-[520px] rounded-full bg-[#B9C9B9]/20 blur-[130px] dark:bg-[#28524B]/15" />
      <div className="pointer-events-none absolute -left-36 bottom-24 h-[480px] w-[480px] rounded-full bg-[#D8C8AE]/18 blur-[120px] dark:bg-[#1A5960]/12" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Consistent template */}
        <SectionHeader
          title={t("services.title")}
          quote={t("services.subtitle")}
          p1={t("services.introP1")}
          p2={t("services.introP2")}
        />

        {/* 5 Uniform Services Cards: Larger size, 3 on top & 2 on bottom (centered), full-bleed background */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch">
          {servicesData.map((svc, idx) => {
            const isExpanded = activeCardId === svc.id;
            const anim = "fade-up";
            const delay = (idx + 1) * 90;
            const primaryTitle = isEn ? svc.title : svc.title_id;
            const secondaryTitle = isEn ? svc.titleSecondary : svc.titleSecondary_id;

            // Positioning for 3 on top, 2 centered on bottom:
            // Mobile (1 col): full width.
            // Tablet (md - 6 cols): Cards 0,1 on row 1 (span 3). Cards 2,3 on row 2 (span 3). Card 4 on row 3 centered (col-start-2 span 4).
            // Desktop (lg - 6 cols): Cards 0,1,2 on row 1 (span 2 each). Card 3 & 4 on row 2 centered (Card 3 at col 2 span 2, Card 4 at col 4 span 2).
            let gridPlacement = "col-span-1 md:col-span-3 lg:col-span-2";
            if (idx === 3) {
              gridPlacement = "col-span-1 md:col-span-3 lg:col-start-2 lg:col-span-2";
            } else if (idx === 4) {
              gridPlacement = "col-span-1 md:col-start-2 md:col-span-4 lg:col-start-4 lg:col-span-2";
            }

            return (
              <article
                key={svc.id}
                data-aos={anim}
                data-aos-delay={delay}
                onClick={() => toggleCard(svc.id)}
                className={`group relative h-[560px] sm:h-[580px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_-16px_rgba(0,0,0,0.65)] transition-all duration-500 flex flex-col justify-end p-6 sm:p-7 cursor-pointer select-none ${gridPlacement}`}
              >
                {/* 1. Full Bleed Background Image covering the entire card */}
                <Image
                  src={svc.image}
                  alt={primaryTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  priority={idx < 2}
                />

                {/* 2. Seamless dark gradient overlay for effortless legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15 transition-colors duration-500 group-hover:from-black/98 group-hover:via-black/75 pointer-events-none" />

                {/* 3. Bottom Content: Combined Title & Brief Description, with Full Description expanding on hover */}
                <div className="relative z-10 flex flex-col justify-end text-white min-w-0">
                  {/* Combined Title: Primary in white, Secondary in blue text */}
                  <h3 className="font-headline font-normal text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2 break-words">
                    <span>{primaryTitle}</span>
                    {secondaryTitle && (
                      <span className="text-[#8EE0D2] font-normal"> – {secondaryTitle}</span>
                    )}
                  </h3>

                  {/* Brief Description (Quote) */}
                  <p className="font-subheadline italic text-xs sm:text-[13px] text-slate-200/90 leading-relaxed mb-2.5 line-clamp-2 group-hover:line-clamp-none">
                    &ldquo;{isEn ? svc.quote : svc.quote_id}&rdquo;
                  </p>

                  {/* Full Description - Expands smoothly on hover (or on click for mobile) */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isExpanded
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2 pb-2.5 border-t border-white/20">
                        <p className="font-body text-xs text-slate-200/95 leading-relaxed">
                          {isEn ? svc.description : svc.description_id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price - below brief description (and below expanded full description) */}
                  <div className="pt-1 pb-3.5 text-xs sm:text-[13px] font-semibold text-[#8EE0D2] tracking-wide">
                    {isEn ? svc.price : svc.price_id}
                  </div>

                  {/* Order Button: Primary brand color (#607F78), WhatsApp icon + Order text only (no arrow) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrder(svc);
                    }}
                    className="w-full py-3 px-4 rounded-xl sm:rounded-2xl bg-[#607F78] hover:bg-[#4D6962] active:bg-[#3E554F] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-black/30 hover:shadow-black/50 transition-all duration-300 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                    <span>Order</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
