"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  ExternalLink,
  Clock,
  Phone,
  Truck,
  MessageCircle,
  Check,
} from "lucide-react";
import { OutletItem, defaultOutlets } from "@/data/outlets";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface OutletsSectionProps {
  outlets?: OutletItem[];
}

export default function OutletsSection({ outlets = defaultOutlets }: OutletsSectionProps) {
  const { selectOutlet, nearestOutlet, isWithin5km } = useOutlets();
  const { t, localize, locale } = useLanguage();
  const visibleOutlets = outlets.filter((o) => o.status !== "Inactive");

  const currentOutlet =
    nearestOutlet ||
    visibleOutlets[0] ||
    outlets[0];

  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    setIsMapLoading(true);
  }, [currentOutlet?.id]);

  const handleSelectOutlet = (outlet: OutletItem) => {
    selectOutlet(outlet);
  };

  return (
    <section id="outlets" className="relative isolate overflow-hidden bg-[#F6F5F1] py-24 transition-colors duration-500 dark:bg-[#071018] sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.15] dark:opacity-[0.10]" style={{ backgroundImage: "url('/images/hero/laverie-luggage-express.jpg')" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#F6F5F1]/90 via-[#F6F5F1]/95 to-[#F6F5F1]/90 dark:from-[#071018]/90 dark:via-[#071018]/95 dark:to-[#071018]/90" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#B9D9D5]/25 blur-[110px] dark:bg-[#1A5960]/15" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#D8C8AE]/20 blur-[100px] dark:bg-[#243A42]/20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: 100% consistent with other sections */}
        <SectionHeader
          title={locale === "en" ? "Our Outlets" : "Outlet Kami"}
          quote={locale === "en" ? "Good care, within reach." : "Perawatan terbaik, lebih dekat dengan Anda."}
          p1={
            locale === "en"
              ? "With dedicated ateliers in Pantai Indah Kapuk and GreenBay Pluit, exceptional garment care is always close to where you stay or live."
              : "Melalui outlet atelier kami di Pantai Indah Kapuk dan GreenBay Pluit, perawatan pakaian berkualitas selalu hadir lebih dekat dari kediaman Anda."
          }
          p2={
            locale === "en"
              ? "Serving PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, and Pantai Mutiara with Free Doorstep Pickup & Delivery within 5 km."
              : "Melayani area PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, dan Pantai Mutiara dengan fasilitas GRATIS Antar Jemput radius 5 km."
          }
        />

        {/* Outlet Switcher Tabs */}
        {visibleOutlets.length > 1 && (
          <div data-aos="fade-up" data-aos-delay="80" className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visibleOutlets.map((outlet, idx) => {
              const isActive = outlet.id === currentOutlet.id;
              const isPik =
                outlet.id.toLowerCase().includes("pik") ||
                outlet.tabName.toLowerCase().includes("pik");

              return (
                <button
                  key={outlet.id}
                  type="button"
                  onClick={() => handleSelectOutlet(outlet)}
                  aria-pressed={isActive}
                  className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 sm:px-6 cursor-pointer ${
                    isActive
                      ? "border-[#607F78] bg-white shadow-[0_12px_35px_-24px_rgba(36,61,56,0.45)] dark:border-[#8BC9C1] dark:bg-[#10212A]"
                      : "border-[#E1E0D9] bg-white/45 hover:border-[#B6C7C1] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-[#607F78] text-white"
                          : "bg-[#EAEDE8] text-[#75827C] dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span>
                      <span
                        className={`block font-subheadline text-base font-semibold tracking-tight ${
                          isActive ? "text-[#263633] dark:text-white" : "text-[#68716E] dark:text-slate-300"
                        }`}
                      >
                        {outlet.tabName}
                      </span>
                      <span className="mt-1 block text-xs text-[#929A95]">
                        {isPik
                          ? locale === "en"
                            ? "Coverage: PIK 1, PIK 2, Muara Karang (5 km Radius)"
                            : "Cakupan: PIK 1, PIK 2, Muara Karang (Radius 5 km)"
                          : locale === "en"
                          ? "Coverage: Greenbay, Pluit, Pantai Mutiara (5 km Radius)"
                          : "Cakupan: Greenbay, Pluit, Pantai Mutiara (Radius 5 km)"}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                      isActive
                        ? "border-[#607F78] bg-[#607F78]/10 text-[#607F78] dark:border-[#8BC9C1] dark:bg-[#8BC9C1]/15 dark:text-[#8BC9C1]"
                        : "border-[#E3E5DF] text-transparent group-hover:border-[#607F78]/50 dark:border-white/10"
                    }`}
                  >
                    <Check className={`h-4 w-4 transition-transform duration-200 ${isActive ? "scale-100" : "scale-75 opacity-0"}`} />
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Outlet Details & Map Card */}
        <div key={currentOutlet.id} className="grid overflow-hidden rounded-[28px] border border-[#E1E0D9] bg-white shadow-[0_24px_70px_-48px_rgba(30,47,43,0.35)] dark:border-white/10 dark:bg-[#0C1922] lg:grid-cols-[0.88fr_1.12fr] transition-all duration-300">
          <div className="flex flex-col p-6 sm:p-9 lg:p-11">
            <div>
              <h3 className="font-headline font-[family-name:var(--font-headline)] text-3xl font-light leading-tight tracking-tight text-[#202A29] dark:text-white sm:text-4xl">
                {currentOutlet.name}
              </h3>
              {currentOutlet.phone && (
                <a
                  href={`tel:${currentOutlet.phone.replace(/[^0-9+]/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#607F78] transition-colors hover:text-[#4D6962] dark:text-[#8BC9C1]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {currentOutlet.phone}
                </a>
              )}
              <p className="mt-5 text-sm leading-7 text-[#737D78] dark:text-slate-300">
                {localize(currentOutlet, "description")}
              </p>
            </div>

            <div className="my-8 h-px w-full bg-[#E9E9E3] dark:bg-white/10" />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#607F78] dark:bg-[#18313A] dark:text-[#8BC9C1]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">
                    {t("about.addressLabel")}
                  </span>
                  <p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">
                    {currentOutlet.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#607F78] dark:bg-[#18313A] dark:text-[#8BC9C1]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">
                    {t("about.hoursLabel")}
                  </span>
                  <p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">
                    {currentOutlet.openingHours}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#607F78] dark:bg-[#18313A] dark:text-[#8BC9C1]">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">
                    {t("about.dispatchLabel")}
                  </span>
                  <p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">
                    {localize(currentOutlet, "dispatch")}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: Maps & Chat Outlet */}
            <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
              <a
                href={currentOutlet.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#607F78] px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4D6962] hover:shadow-lg hover:shadow-[#607F78]/25 cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
                {t("about.openMaps")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {(() => {
                const rawPhone = (currentOutlet.phone || "").replace(/[^0-9]/g, "");
                const cleanPhone = rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone;
                
                const buttonText = isWithin5km
                  ? (locale === "en" ? "Order Pickup (Free 5 km)" : "Pesan Antar Jemput")
                  : t("about.chatHub");

                const directMsg = isWithin5km
                  ? (locale === "en"
                      ? `Hello ${currentOutlet.name}! My location is verified within your 5 km radius. I would like to order free doorstep pickup & delivery.`
                      : `Halo ${currentOutlet.name}! Lokasi saya dalam radius 5 km. Saya ingin memesan layanan antar jemput laundry gratis.`)
                  : (locale === "en"
                      ? `Hello ${currentOutlet.name}! My location is currently beyond 5 km. Inquiring about courier/pickup options.`
                      : `Halo ${currentOutlet.name}! Lokasi saya berada di luar radius 5 km. Ingin chat & konsultasi opsi penjemputan/kurir.`);

                const waUrl = cleanPhone
                  ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(directMsg)}`
                  : `https://wa.me/?text=${encodeURIComponent(directMsg)}`;

                return (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/wa inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#607F78]/50 bg-white dark:bg-[#10212A] px-5 text-xs font-bold uppercase tracking-[0.1em] text-[#223530] dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#607F78] hover:border-[#607F78] hover:text-white hover:shadow-lg hover:shadow-[#607F78]/25 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-[#607F78] group-hover/wa:text-white transition-colors duration-300" />
                    <span>{buttonText}</span>
                  </a>
                );
              })()}
            </div>
          </div>

          <div className="relative min-h-[340px] bg-[#E8ECE8] dark:bg-[#14252D] lg:min-h-[650px]">
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center bg-[#E8ECE8]/95 backdrop-blur-sm transition-opacity duration-500 dark:bg-[#14252D]/95 ${
                isMapLoading ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isMapLoading}
            >
              <div className="flex flex-col items-center gap-3 text-[#78958F]">
                <span className="h-10 w-10 animate-pulse rounded-full border border-[#78958F]/40 bg-white/70 shadow-[0_0_0_12px_rgba(120,149,143,0.08)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  {locale === "en" ? "Loading map" : "Memuat peta"}
                </span>
              </div>
            </div>
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
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                isMapLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
