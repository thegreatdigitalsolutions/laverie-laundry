"use client";

import React, { useRef } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Baby, BedDouble, BriefcaseBusiness,
  Footprints, Shirt, Sparkles, ShoppingBag,
} from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CoreServices() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { locale, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const isEn = locale === "en";

  const services = [
    {
      number: "01", icon: Shirt,
      title: isEn ? "Everyday Garment Care" : "Perawatan Pakaian Harian",
      description: isEn
        ? "Thoughtful cleaning for the pieces you reach for every day, from shirts and blouses to trousers, skirts, knitwear and more."
        : "Perawatan untuk pakaian yang menemani keseharian Anda, mulai dari kemeja, blus, celana, rok, hingga sweater.",
      examples: isEn ? "Shirts · Blouses · Trousers · Skirts · Knitwear" : "Kemeja · Blus · Celana · Rok · Sweater",
      tone: "from-[#D9E3DC] to-[#F1EEE5]",
    },
    {
      number: "02", icon: Sparkles,
      title: isEn ? "Batik & Delicate Wear" : "Batik & Pakaian Istimewa",
      description: isEn
        ? "Special garments receive considered attention, including batik, kebaya, dresses, blazers, suits and formalwear."
        : "Pakaian istimewa mendapatkan perhatian lebih, termasuk batik, kebaya, gaun, blazer, jas, dan busana formal.",
      examples: isEn ? "Batik · Kebaya · Dresses · Blazers · Suits" : "Batik · Kebaya · Gaun · Blazer · Jas",
      tone: "from-[#E8DCCB] to-[#F4EEE5]",
    },
    {
      number: "03", icon: BriefcaseBusiness,
      title: isEn ? "Bag & Accessory Care" : "Perawatan Tas & Aksesori",
      description: isEn
        ? "From compact everyday pieces to larger bags, plus selected accessories that complete your look."
        : "Dari tas kecil untuk kebutuhan harian hingga tas berukuran besar, serta aksesori pilihan yang melengkapi penampilan.",
      examples: isEn ? "Small · Medium · Large bags · Scarves · Ties · Hats" : "Tas kecil · Sedang · Besar · Syal · Dasi · Topi",
      tone: "from-[#D9E1E3] to-[#F1F0E9]",
    },
    {
      number: "04", icon: BedDouble,
      title: isEn ? "Home Linen & Bedding" : "Linen & Perlengkapan Rumah",
      description: isEn
        ? "A fresh start for the comforts of home: bed covers, sheets, blankets, duvets, towels and mattress protectors."
        : "Kesegaran untuk kenyamanan rumah: bed cover, sprei, selimut, duvet, handuk, hingga pelindung kasur.",
      examples: isEn ? "Bed covers · Sheets · Duvets · Towels · Blankets" : "Bed cover · Sprei · Duvet · Handuk · Selimut",
      tone: "from-[#DCE5DD] to-[#F3F0E7]",
    },
    {
      number: "05", icon: Footprints,
      title: isEn ? "Footwear Care" : "Perawatan Alas Kaki",
      description: isEn
        ? "Give your footwear a little extra attention, from everyday sandals to shoes, boots and leather footwear."
        : "Berikan perhatian lebih pada alas kaki Anda, mulai dari sandal, sepatu, boots, hingga sepatu kulit.",
      examples: isEn ? "Shoes · Sandals · Boots · Leather shoes" : "Sepatu · Sandal · Boots · Sepatu kulit",
      tone: "from-[#E6DFD3] to-[#F5F0E7]",
    },
    {
      number: "06", icon: Baby,
      title: isEn ? "Baby Gear & Stroller Care" : "Perawatan Perlengkapan Bayi",
      description: isEn
        ? "Care for the essentials that travel with your little one, including strollers and car seats."
        : "Perawatan untuk perlengkapan yang menemani si kecil bepergian, termasuk stroller dan car seat.",
      examples: isEn ? "Strollers · Car seats" : "Stroller · Car seat",
      tone: "from-[#DDE4E1] to-[#F5F0E8]",
    },
    {
      number: "07", icon: ShoppingBag,
      title: isEn ? "Curtains & Home Textiles" : "Gorden & Tekstil Interior",
      description: isEn
        ? "Refresh the details that shape your space, including curtains, vitrage, carpets and rugs."
        : "Segarkan detail yang membentuk suasana ruang, termasuk gorden, vitrage, karpet, dan keset.",
      examples: isEn ? "Curtains · Vitrage · Carpets · Rugs" : "Gorden · Vitrase · Karpet · Keset",
      tone: "from-[#E3E2D7] to-[#F4EFE6]",
    },
  ];

  const scrollCards = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction === "right" ? trackRef.current.clientWidth * 0.78 : -trackRef.current.clientWidth * 0.78,
      behavior: "smooth",
    });
  };

  const chatMessage = t("common.chatPrompt");

  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#F3F1EA] py-24 text-[#26312E] transition-colors duration-700 dark:bg-[#0B1719] dark:text-[#F3F2EC] sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.16] dark:opacity-[0.10]" style={{ backgroundImage: "url('/images/about/laverie-atelier.jpg')" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#F3F1EA]/90 via-[#F3F1EA]/95 to-[#F3F1EA]/90 dark:from-[#0B1719]/90 dark:via-[#0B1719]/95 dark:to-[#0B1719]/90" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#B9C9B9]/25 blur-[120px] dark:bg-[#28524B]/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#D8D9CF] pb-10 dark:border-white/10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div className="service-heading-reveal">
            <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#78958F] dark:text-[#9CC8BE]">
              <span className="h-px w-9 bg-current" />{isEn ? "The Laverie experience · 01" : "Pengalaman Laverie · 01"}
            </span>
            <h2 className="font-headline text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {isEn ? <>Care for every <em className="text-[#78958F] dark:text-[#9CC8BE]">kind of day.</em></> : <>Perawatan untuk setiap <em className="text-[#78958F] dark:text-[#9CC8BE]">cerita harian.</em></>}
            </h2>
          </div>
          <div className="max-w-2xl service-heading-reveal service-heading-reveal-delay">
            <p className="text-sm leading-8 text-[#68736D] dark:text-slate-300 sm:text-base">
              {isEn
                ? "From the clothes you wear to the comforts that make a house feel like home, discover thoughtful care for more of what matters."
                : "Dari pakaian yang Anda kenakan hingga perlengkapan yang membuat rumah terasa nyaman, temukan perawatan untuk lebih banyak hal yang berarti."}
            </p>
            <p className="mt-4 font-subheadline text-lg italic text-[#78958F] dark:text-[#9CC8BE]">
              {isEn ? "One place. Many ways to care." : "Satu tempat, untuk lebih banyak kebutuhan."}
            </p>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#89938C] dark:text-slate-400">
            {isEn ? "Explore our services" : "Jelajahi layanan kami"}
            <span className="ml-3 font-normal tracking-normal text-[#A1A9A1] dark:text-slate-500">{isEn ? "Swipe to discover" : "Geser untuk melihat lainnya"}</span>
          </p>
          <div className="flex gap-2">
            <button type="button" aria-label={isEn ? "Scroll services left" : "Geser layanan ke kiri"} onClick={() => scrollCards("left")} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9D1C8] text-[#53665D] transition duration-300 hover:-translate-y-0.5 hover:border-[#78958F] hover:bg-[#78958F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78958F] dark:border-white/15 dark:text-slate-200"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" aria-label={isEn ? "Scroll services right" : "Geser layanan ke kanan"} onClick={() => scrollCards("right")} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9D1C8] text-[#53665D] transition duration-300 hover:-translate-y-0.5 hover:border-[#78958F] hover:bg-[#78958F] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78958F] dark:border-white/15 dark:text-slate-200"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={trackRef} className="service-horizontal-track mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-7 pt-2">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <article key={svc.number} className="service-card group relative flex min-h-[390px] w-[82vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white/65 p-6 shadow-[0_16px_45px_-35px_rgba(35,55,47,0.35)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#9EB7A9] hover:bg-white/90 hover:shadow-[0_28px_65px_-38px_rgba(35,55,47,0.48)] dark:border-white/10 dark:bg-[#142321]/75 dark:hover:bg-[#192D2A] sm:min-h-[410px] sm:w-[340px] sm:p-7" style={{ animationDelay: `${idx * 75}ms` }}>
                <div className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${svc.tone} opacity-35 transition-opacity duration-500 group-hover:opacity-60 dark:opacity-[0.10]`} />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-headline text-sm tracking-widest text-[#9AA69C] dark:text-[#9BB9AC]">{svc.number}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B9C9BD]/80 bg-white/65 text-[#66877A] shadow-sm transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-[#78958F] group-hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-[#B6D3C7]"><Icon className="h-6 w-6" strokeWidth={1.55} /></span>
                </div>
                <div className="relative z-10 mt-14">
                  <h3 className="font-subheadline text-[25px] font-medium leading-tight tracking-tight text-[#283430] dark:text-white">{svc.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#68736D] dark:text-slate-300">{svc.description}</p>
                </div>
                <div className="relative z-10 mt-auto border-t border-[#BFCBBF]/60 pt-5 dark:border-white/10">
                  <p className="text-[9px] font-bold uppercase tracking-[0.19em] text-[#84958A] dark:text-[#A4C1B4]">{isEn ? "Includes" : "Kategori layanan"}</p>
                  <p className="mt-2 text-xs leading-6 text-[#56675E] dark:text-slate-300">{svc.examples}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-6 rounded-[28px] bg-[#263A35] p-7 text-white shadow-[0_24px_70px_-42px_rgba(20,40,32,0.55)] transition-transform duration-500 hover:shadow-[0_30px_80px_-42px_rgba(20,40,32,0.7)] dark:bg-[#142B2C] sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8D0C3]">{isEn ? "A little more peace of mind" : "Lebih banyak ketenangan"}</span>
            <p className="mt-3 font-subheadline text-2xl leading-snug sm:text-3xl">{isEn ? "More time for the moments that matter." : "Lebih banyak waktu untuk hal yang berarti."}</p>
            <p className="mt-2 text-xs leading-6 text-white/65">{isEn ? "Reliable care, considered timing, and service that fits your day." : "Perawatan yang dapat diandalkan, waktu yang terukur, dan layanan yang mengikuti ritme hari Anda."}</p>
          </div>
          <a href={getNearestChatUrl(chatMessage)} onClick={(e) => { e.preventDefault(); openNearestChat(chatMessage); }} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#E8E9DF] px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#263A35] transition duration-300 hover:-translate-y-1 hover:bg-white">{isEn ? "Talk to our team" : "Konsultasikan kebutuhan Anda"}<ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
