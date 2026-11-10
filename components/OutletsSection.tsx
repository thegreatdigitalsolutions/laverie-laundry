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
    <section id="outlets" className="relative isolate overflow-hidden bg-[#F6F5F1] py-24 transition-colors duration-500 dark:bg-[#071018] sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.15] dark:opacity-[0.10]" style={{ backgroundImage: "url('/images/hero/laverie-luggage-express.jpg')" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#F6F5F1]/90 via-[#F6F5F1]/95 to-[#F6F5F1]/90 dark:from-[#071018]/90 dark:via-[#071018]/95 dark:to-[#071018]/90" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#B9D9D5]/25 blur-[110px] dark:bg-[#1A5960]/15" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#D8C8AE]/20 blur-[100px] dark:bg-[#243A42]/20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="mb-12 grid gap-6 border-b border-[#D9D8D1] pb-9 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#718D89] dark:text-[#8BC9C1]">
              <span className="h-px w-8 bg-current" /> {locale === "en" ? "The Laverie experience · 04" : "Pengalaman Laverie · 04"}
            </span>
            <h2 className="font-headline font-[family-name:var(--font-headline)] text-4xl font-light leading-[1.08] tracking-tight text-[#202A29] dark:text-[#F2F4F1] sm:text-5xl lg:text-6xl">
              {locale === "en" ? "Good care, " : "Perawatan terbaik, "}<span className="italic text-[#78958F] dark:text-[#8BC9C1]">{locale === "en" ? "within reach." : "lebih dekat."}</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#68716E] dark:text-slate-300 sm:text-base">
              {locale === "en" ? "And when you are ready, there is always a Laverie nearby. Visit us, meet our team, or arrange a pickup from the comfort of your day." : "Kini Anda tahu bagaimana kami merawat setiap detail. Saatnya bertemu lebih dekat — kunjungi outlet kami atau atur penjemputan dengan mudah."}
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="block font-headline text-4xl font-light tracking-tight text-[#78958F] dark:text-[#8BC9C1]">0{visibleOutlets.length}</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A918D]">{locale === "en" ? "Available locations" : "Lokasi tersedia"}</span>
          </div>
        </div>

        {visibleOutlets.length > 1 && (
          <div data-aos="fade-up" data-aos-delay="80" className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visibleOutlets.map((outlet, idx) => {
              const isActive = idx === activeOutletIndex;
              return (
                <button key={outlet.id} type="button" onClick={() => { setActiveOutletIndex(idx); selectOutlet(outlet); }}
                  aria-pressed={isActive}
                  className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 sm:px-6 ${isActive ? "border-[#78958F] bg-white shadow-[0_12px_35px_-24px_rgba(36,61,56,0.45)] dark:border-[#5D9991] dark:bg-[#10212A]" : "border-[#E1E0D9] bg-white/45 hover:border-[#B6C7C1] hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-white/[0.06]"}`}>
                  <span className="flex items-center gap-4">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-colors ${isActive ? "bg-[#78958F] text-white" : "bg-[#EAEDE8] text-[#75827C] dark:bg-white/10 dark:text-slate-300"}`}>0{idx + 1}</span>
                    <span>
                      <span className={`block font-subheadline text-base font-semibold tracking-tight ${isActive ? "text-[#263633] dark:text-white" : "text-[#68716E] dark:text-slate-300"}`}>{outlet.tabName}</span>
                      <span className="mt-1 block text-xs text-[#929A95]">{locale === "en" ? "Laverie Premium Laundry" : "Laverie Premium Laundry"}</span>
                    </span>
                  </span>
                  <span className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all ${isActive ? "border-[#78958F] text-[#78958F] dark:border-[#8BC9C1] dark:text-[#8BC9C1]" : "border-[#E3E5DF] text-[#A3AAA5] group-hover:translate-x-1 dark:border-white/10"}`}><ExternalLink className="h-3.5 w-3.5" /></span>
                </button>
              );
            })}
          </div>
        )}

        <div key={currentOutlet.id} className="grid overflow-hidden rounded-[28px] border border-[#E1E0D9] bg-white shadow-[0_24px_70px_-48px_rgba(30,47,43,0.35)] dark:border-white/10 dark:bg-[#0C1922] lg:grid-cols-[0.88fr_1.12fr] animate-outlet-change">
          <div className="flex flex-col p-6 sm:p-9 lg:p-11">
            <div data-aos="fade-up">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#78958F] dark:text-[#8BC9C1]"><MapPin className="h-3.5 w-3.5" /> {locale === "en" ? "Our location" : "Lokasi kami"}</span>
              <h3 className="mt-4 font-headline font-[family-name:var(--font-headline)] text-3xl font-light leading-tight tracking-tight text-[#202A29] dark:text-white sm:text-4xl">{currentOutlet.name}</h3>
              {currentOutlet.phone && <a href={`tel:${currentOutlet.phone.replace(/[^0-9+]/g, "")}`} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#78958F] transition-colors hover:text-[#426C64] dark:text-[#8BC9C1]"><Phone className="h-3.5 w-3.5" />{currentOutlet.phone}</a>}
              <p className="mt-5 text-sm leading-7 text-[#737D78] dark:text-slate-300">{localize(currentOutlet, "description")}</p>
            </div>

            <div className="my-8 h-px w-full bg-[#E9E9E3] dark:bg-white/10" />
            <div className="space-y-6">
              <div className="flex gap-4" data-aos="fade-up" data-aos-delay="100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#78958F] dark:bg-[#18313A] dark:text-[#8BC9C1]"><MapPin className="h-4 w-4" /></div>
                <div><span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">{t("about.addressLabel")}</span><p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">{currentOutlet.address}</p></div>
              </div>
              <div className="flex gap-4" data-aos="fade-up" data-aos-delay="160">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#78958F] dark:bg-[#18313A] dark:text-[#8BC9C1]"><Clock className="h-4 w-4" /></div>
                <div><span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">{t("about.hoursLabel")}</span><p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">{currentOutlet.openingHours}</p></div>
              </div>
              <div className="flex gap-4" data-aos="fade-up" data-aos-delay="220">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[#78958F] dark:bg-[#18313A] dark:text-[#8BC9C1]"><Truck className="h-4 w-4" /></div>
                <div><span className="block text-[10px] font-bold uppercase tracking-[0.17em] text-[#929B95]">{t("about.dispatchLabel")}</span><p className="mt-1 text-sm leading-6 text-[#48534E] dark:text-slate-200">{localize(currentOutlet, "dispatch")}</p></div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
              <a href={currentOutlet.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#78958F] px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#607F78] hover:shadow-lg hover:shadow-[#78958F]/20"><MapPin className="h-4 w-4" />{t("about.openMaps")}<ExternalLink className="h-3.5 w-3.5" /></a>
              {(() => {
                const rawPhone = (currentOutlet.phone || "").replace(/[^0-9]/g, "");
                const cleanPhone = rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone;
                const directMsg = locale === "en" ? currentOutlet.whatsappMessage_en : currentOutlet.whatsappMessage;
                const chatMsg = directMsg || localize(currentOutlet, "whatsappMessage") || (locale === "en" ? `Hello ${currentOutlet.name}! I want to ask about your laundry services and pickup.` : `Halo ${currentOutlet.name}! Saya ingin bertanya tentang layanan laundry dan penjemputan.`);
                const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(chatMsg)}` : `https://wa.me/?text=${encodeURIComponent(chatMsg)}`;
                return <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#DCE2DC] px-5 text-xs font-bold uppercase tracking-[0.1em] text-[#53645D] transition-all duration-300 hover:border-[#78958F] hover:bg-[#F5F7F3] dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/[0.06]"><MessageCircle className="h-4 w-4 text-[#25D366]" />{t("about.chatHub")}</a>;
              })()}
            </div>
          </div>

          <div className="relative min-h-[340px] bg-[#E8ECE8] dark:bg-[#14252D] lg:min-h-[650px]">
            <div className={`absolute inset-0 z-10 flex items-center justify-center bg-[#E8ECE8]/95 backdrop-blur-sm transition-opacity duration-500 dark:bg-[#14252D]/95 ${isMapLoading ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!isMapLoading}>
              <div className="flex flex-col items-center gap-3 text-[#78958F]"><span className="h-10 w-10 animate-pulse rounded-full border border-[#78958F]/40 bg-white/70 shadow-[0_0_0_12px_rgba(120,149,143,0.08)]" /><span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{locale === "en" ? "Loading map" : "Memuat peta"}</span></div>
            </div>
            <iframe key={currentOutlet.id} title={`${currentOutlet.name} Google Maps`} src={currentOutlet.mapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={() => setIsMapLoading(false)} className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${isMapLoading ? "opacity-0" : "opacity-100"}`} />
            <div className="pointer-events-none absolute bottom-5 left-5 z-20 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#53645D] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0C1922]/85 dark:text-slate-200">Laverie Premium Laundry</div>
          </div>
        </div>
      </div>
    </section>
  );
}
