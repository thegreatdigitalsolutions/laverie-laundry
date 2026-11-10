"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  ExternalLink,
  Clock,
  Phone,
  Truck,
  MessageCircle,
} from "lucide-react";
import { OutletItem, defaultOutlets } from "@/data/outlets";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

interface OutletsSectionProps {
  outlets?: OutletItem[];
}

export default function OutletsSection({ outlets = defaultOutlets }: OutletsSectionProps) {
  const { selectOutlet, nearestOutlet } = useOutlets();
  const { t, localize, locale } = useLanguage();
  const visibleOutlets = outlets.filter((o) => o.status !== "Inactive");

  const [activeOutletIndex, setActiveOutletIndex] = useState(() => {
    if (nearestOutlet) {
      const idx = visibleOutlets.findIndex((o) => o.id === nearestOutlet.id);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  useEffect(() => {
    if (nearestOutlet) {
      const idx = visibleOutlets.findIndex((o) => o.id === nearestOutlet.id);
      if (idx !== -1 && idx !== activeOutletIndex) {
        setActiveOutletIndex(idx);
      }
    }
  }, [nearestOutlet, visibleOutlets, activeOutletIndex]);

  const currentOutlet = visibleOutlets[activeOutletIndex] || visibleOutlets[0] || outlets[0];
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    setIsMapLoading(true);
  }, [currentOutlet.id]);

  return (
    <section id="outlets" className="py-20 bg-[#F8F9FA] dark:bg-[#03070C] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Menu Tab directly below */}
        <div data-aos="fade-down" className="mb-8 sm:mb-12">
          <span className="font-body font-[family-name:var(--font-body)] text-xs font-bold tracking-widest text-[#00838F] dark:text-[#5CE1D6] uppercase">
              {locale === "en" ? "Locations & Hubs" : "Lokasi & Layanan"}
            </span>
            <h3 className="font-headline font-[family-name:var(--font-headline)] font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white tracking-tight mt-1 mb-6">
              {t("about.hubsTitle")}
            </h3>

            {/* Menu Tabs for Outlets */}
            {visibleOutlets.length > 1 && (
              <div data-aos="fade-up" data-aos-delay="100" className="flex items-center gap-8 sm:gap-12 border-b border-gray-200/80 dark:border-white/[0.08] overflow-x-auto no-scrollbar">
                {visibleOutlets.map((outlet, idx) => {
                  const isActive = idx === activeOutletIndex;
                  return (
                    <button
                      key={outlet.id}
                      type="button"
                      onClick={() => {
                        setActiveOutletIndex(idx);
                        selectOutlet(outlet);
                      }}
                      className={`group relative pb-3.5 font-subheadline font-[family-name:var(--font-subheadline)] text-base sm:text-lg font-medium tracking-tight transition-colors shrink-0 cursor-pointer ${
                        isActive
                          ? "text-gray-900 dark:text-white font-semibold"
                          : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <span>{outlet.tabName}</span>
                      {/* Active Underline Indicator Bar */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 rounded-full ${
                          isActive
                            ? "w-full bg-[#00C4D4] dark:bg-[#5CE1D6]"
                            : "w-0 group-hover:w-1/2 bg-gray-300 dark:bg-white/20"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Outlet Details Grid */}
          <div
            key={currentOutlet.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-outlet-change"
          >
            {/* Left: Location Details */}
            <div data-aos="fade-right" data-aos-delay="150" className="lg:col-span-5 space-y-5 font-body font-[family-name:var(--font-body)]">
              <div>
                <h4 className="font-subheadline font-[family-name:var(--font-subheadline)] font-medium text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight mb-1">
                  {currentOutlet.name}
                </h4>

                {currentOutlet.phone && (
                  <p className="text-xs font-semibold text-[#00C4D4] dark:text-[#5CE1D6] mb-3 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{currentOutlet.phone}</span>
                  </p>
                )}

                <p className="text-sm sm:text-base text-gray-600 dark:text-slate-200 leading-relaxed">
                  {localize(currentOutlet, "description")}
                </p>
              </div>

              <div className="space-y-3.5 text-sm sm:text-base text-gray-700 dark:text-slate-200">
                <div data-aos="fade-right" data-aos-delay="200" className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E0F7FA] dark:bg-[#163642] text-[#00C4D4] dark:text-[#5CE1D6] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                      {t("about.addressLabel")}
                    </strong>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">{currentOutlet.address}</span>
                  </div>
                </div>

                <div data-aos="fade-right" data-aos-delay="250" className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E0F7FA] dark:bg-[#163642] text-[#00C4D4] dark:text-[#5CE1D6] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                      {t("about.hoursLabel")}
                    </strong>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">{currentOutlet.openingHours}</span>
                  </div>
                </div>

                <div data-aos="fade-right" data-aos-delay="300" className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E0F7FA] dark:bg-[#163642] text-[#00C4D4] dark:text-[#5CE1D6] flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-bold text-sm sm:text-base">
                      {t("about.dispatchLabel")}
                    </strong>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">
                      {localize(currentOutlet, "dispatch")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons — Centered in the middle on mobile, left-aligned on sm+ */}
              <div data-aos="zoom-in-up" data-aos-delay="350" className="pt-2 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 w-full">
                <a
                  href={currentOutlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto max-w-xs sm:max-w-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#00C4D4]/20 hover:shadow-lg hover:shadow-[#00C4D4]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
                >
                  <MapPin className="w-4 h-4 text-gray-950" />
                  <span>{t("about.openMaps")}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-950" />
                </a>

                {(() => {
                  const rawPhone = (currentOutlet.phone || "").replace(/[^0-9]/g, "");
                  const cleanPhone = rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone;
                  const directMsg =
                    locale === "en" ? currentOutlet.whatsappMessage_en : currentOutlet.whatsappMessage;
                  const chatMsg =
                    directMsg ||
                    localize(currentOutlet, "whatsappMessage") ||
                    (locale === "en"
                      ? `Hello ${currentOutlet.name}! I want to ask about your laundry services and pickup.`
                      : `Halo ${currentOutlet.name}! Saya ingin bertanya tentang layanan laundry dan penjemputan.`);
                  const waUrl = cleanPhone
                    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(chatMsg)}`
                    : `https://wa.me/?text=${encodeURIComponent(chatMsg)}`;
                  return (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto max-w-xs sm:max-w-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/30 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>{t("about.chatHub")}</span>
                    </a>
                  );
                })()}
              </div>
            </div>

            {/* Right: Interactive Google Map Embed with Radar & Pin Loader */}
            <div data-aos="fade-left" data-aos-delay="200" className="lg:col-span-7">
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/15 shadow-inner bg-gray-100 dark:bg-[#13222E]">
                
                {/* Shimmering Radar Pulse & MapPin Loading Animation */}
                <div
                  className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-100/95 dark:bg-[#0E1A24]/95 backdrop-blur-xs transition-opacity duration-500 ${
                    isMapLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={!isMapLoading}
                >
                  {/* Pulsing Radar Rings & Pin Icon Only */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full bg-[#00C4D4]/15 dark:bg-[#00C4D4]/25 animate-ping" />
                    <span className="absolute w-14 h-14 rounded-full bg-[#00C4D4]/20 dark:bg-[#00C4D4]/30 animate-pulse" />
                    <div className="relative w-11 h-11 rounded-full bg-white dark:bg-[#152B3A] border border-[#00C4D4]/40 shadow-md flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#00C4D4] animate-bounce" />
                    </div>
                  </div>
                </div>

                {/* Google Map iframe */}
                <iframe
                  key={currentOutlet.id}
                  title={`${currentOutlet.name} Google Maps`}
                  src={currentOutlet.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIsMapLoading(false)}
                  className={`w-full h-full transition-opacity duration-500 ${
                    isMapLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>
          </div>

      </div>
    </section>
  );
}

