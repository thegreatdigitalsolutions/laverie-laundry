"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
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

interface AboutProps {
  outlets?: OutletItem[];
}

export default function About({ outlets = defaultOutlets }: AboutProps) {
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

  const features = [
    {
      icon: Sparkles,
      title: "Quality Care",
      description: "Individual fabric assessment, pH-balanced formulas, and meticulous steam pressing.",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic Process",
      description: "Hospitality-grade sterilization that removes 99.9% of bacteria without damaging colors.",
    },
    {
      icon: Zap,
      title: "Easy Service",
      description: "Seamless door-to-door handoff with 12-hour turnaround before your evening dinner.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F8F9FA] dark:bg-[#03070C] relative overflow-hidden border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section: Image & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Luxury Atelier Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl dark:shadow-black/70 border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#08121B] group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about/laverie-atelier.jpg"
                  alt="Laverie Luxury Laundry Atelier"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Right: Content Structure */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight tracking-tight">
              Laundry care, made simple.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 dark:text-slate-200 leading-relaxed font-normal">
              <p>
                Born from the demanding pace of modern travel and boutique hospitality, <strong className="text-gray-900 dark:text-white font-bold">Laverie</strong> redefines garment care. We believe you should spend your valuable hours exploring, conducting business, or relaxing—never burdened with laundry chores or compromised hotel wardrobe delays.
              </p>
              <p>
                From everyday linens to bespoke evening wear, our precision care combines eco-certified detergents, gentle low-heat ozone drying, and hand-finished steam pressing to protect fibers and restore crispness.
              </p>
            </div>

            {/* Checklist items with high contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "12-Hour Express Turnaround",
                "Hotel Concierge Coordination",
                "Sealed & Anti-Crease Packaging",
                "Hypoallergenic Eco Formulations",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-gray-800 dark:text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Feature Cards with high contrast */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] rounded-2xl p-7 border border-gray-200/80 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] dark:hover:from-[#172B3A] dark:hover:to-[#11202C] shadow-xs hover:shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#152B3A] text-gray-800 dark:text-[#00C4D4] group-hover:bg-[#00C4D4] group-hover:text-white dark:group-hover:bg-[#00C4D4] dark:group-hover:text-gray-950 flex items-center justify-center mb-5 transition-colors border border-gray-100 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Outlets & Service Hubs Section with Top Tabs */}
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-white/[0.06] shadow-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.6)]">
          
          {/* Header Title & Menu Tab directly below */}
          <div className="mb-8">
            <h3 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight mt-1 mb-6">
              Our Outlets
            </h3>

            {/* Menu Tabs for Outlets - directly below Our Outlets */}
            {visibleOutlets.length > 1 && (
              <div className="flex items-center gap-8 sm:gap-12 border-b border-gray-200/80 dark:border-white/[0.08] overflow-x-auto no-scrollbar">
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
                      className={`group relative pb-3.5 text-sm sm:text-base font-bold tracking-tight transition-colors shrink-0 cursor-pointer ${
                        isActive
                          ? "text-gray-900 dark:text-white"
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
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h4 className="font-extrabold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-tight mb-1">
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
                <div className="flex items-start gap-3">
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

                <div className="flex items-start gap-3">
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

                <div className="flex items-start gap-3">
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

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={currentOutlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#00C4D4]/20 hover:shadow-lg hover:shadow-[#00C4D4]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-gray-950" />
                  <span>{t("about.openMaps")}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-950" />
                </a>

                {(() => {
                  const rawPhone = (currentOutlet.phone || "").replace(/[^0-9]/g, "");
                  const cleanPhone = rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone;
                  const chatMsg =
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/30 bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>{t("about.chatHub")}</span>
                    </a>
                  );
                })()}
              </div>
            </div>

            {/* Right: Interactive Google Map Embed */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/15 shadow-inner bg-gray-100 dark:bg-[#13222E]">
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
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
