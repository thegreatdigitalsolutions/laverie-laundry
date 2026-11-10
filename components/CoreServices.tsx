"use client";

import React from "react";
import { Clock, Shirt, Sparkles, BedDouble, ArrowUpRight } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CoreServices() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { locale, t } = useLanguage();
  const services = [
    { number: "01", icon: Clock, title: locale === "en" ? "12-Hour Hotel Express" : "Kilat Hotel 12 Jam", description: locale === "en" ? "Made for days that cannot wait. We collect before 10 AM and return your clothes fresh before the evening." : "Untuk hari yang tak bisa menunggu. Pakaian dijemput sebelum pukul 10 pagi dan kembali segar sebelum malam tiba.", features: locale === "en" ? ["Lobby pickup & delivery", "Ozone antibacterial wash", "Same-day return"] : ["Antar jemput lobi hotel", "Cuci antibakteri ozon", "Selesai di hari yang sama"] },
    { number: "02", icon: Shirt, title: locale === "en" ? "Wash, Dry & Fold" : "Cuci, Kering & Lipat", description: locale === "en" ? "Everyday essentials receive thoughtful care, from color sorting to a neat, ready-to-wear finish." : "Pakaian sehari-hari dirawat dengan penuh perhatian, mulai dari pemisahan warna hingga hasil akhir yang rapi dan siap dikenakan.", features: locale === "en" ? ["Color sorting", "Skin-friendly detergent", "Neatly folded & sealed"] : ["Pemisahan warna kain", "Deterjen ramah kulit", "Dilipat rapi dan dikemas higienis"] },
    { number: "03", icon: Sparkles, title: locale === "en" ? "Delicate & Dry Cleaning" : "Pakaian Halus & Dry Clean", description: locale === "en" ? "Special pieces deserve a slower, more considered process, with individual stain attention and careful finishing." : "Pakaian istimewa membutuhkan proses yang lebih cermat, dengan penanganan noda secara individual dan penyelesaian yang teliti.", features: locale === "en" ? ["Individual stain treatment", "Careful steam finishing", "Hanger & garment cover"] : ["Penanganan noda khusus", "Setrika uap dengan teliti", "Hanger dan garment cover"] },
    { number: "04", icon: BedDouble, title: locale === "en" ? "Linen & Duvet Care" : "Perawatan Linen & Selimut", description: locale === "en" ? "A deeper refresh for the pieces that make a space feel like home: linens, towels, duvets and blankets." : "Kesegaran menyeluruh untuk perlengkapan yang membuat ruang terasa nyaman: sprei, handuk, duvet, dan selimut.", features: locale === "en" ? ["Deep-care cleaning", "Gentle fabric handling", "Vacuum packaging available"] : ["Pembersihan menyeluruh", "Perawatan serat kain", "Tersedia kemasan vakum"] },
  ];
  const chatMessage = t("common.chatPrompt");
  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#F3F1EA] py-24 text-[#26312E] transition-colors duration-500 dark:bg-[#0B1719] dark:text-[#F3F2EC] sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.16] dark:opacity-[0.10]" style={{ backgroundImage: "url('/images/about/laverie-atelier.jpg')" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#F3F1EA]/90 via-[#F3F1EA]/95 to-[#F3F1EA]/90 dark:from-[#0B1719]/90 dark:via-[#0B1719]/95 dark:to-[#0B1719]/90" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#B9C9B9]/25 blur-[120px] dark:bg-[#28524B]/20" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-[#D8D9CF] pb-12 dark:border-white/10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div data-aos="fade-up"><span className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#78958F] dark:text-[#9CC8BE]"><span className="h-px w-9 bg-current" />{locale === "en" ? "The Laverie experience · 01" : "Pengalaman Laverie · 01"}</span>
            <h2 className="font-headline text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{locale === "en" ? <>Care begins with <em className="text-[#78958F] dark:text-[#9CC8BE]">understanding.</em></> : <>Setiap perawatan dimulai dari <em className="text-[#78958F] dark:text-[#9CC8BE]">memahami.</em></>}</h2></div>
          <div data-aos="fade-up" data-aos-delay="120" className="max-w-2xl lg:pb-1"><p className="text-sm leading-8 text-[#68736D] dark:text-slate-300 sm:text-base">{locale === "en" ? "Different fabrics, different routines, different stories. Tell us what your garments need — we will take it from there, with a process shaped around each one." : "Setiap kain memiliki karakter, setiap orang memiliki rutinitas. Ceritakan apa yang pakaian Anda butuhkan. Selebihnya, biarkan kami merawatnya melalui proses yang disesuaikan."}</p><p className="mt-4 font-subheadline text-lg italic text-[#78958F] dark:text-[#9CC8BE]">{locale === "en" ? "Thoughtful care, from the very first touch." : "Perhatian yang terasa, sejak sentuhan pertama."}</p></div>
        </div>
        <div className="mt-12 grid gap-0 lg:grid-cols-2">
          {services.map((svc, idx) => { const Icon = svc.icon; return <article key={svc.number} data-aos="fade-up" data-aos-delay={idx * 90} className={`group grid grid-cols-[52px_1fr] gap-5 border-b border-[#D8D9CF] py-8 dark:border-white/10 sm:grid-cols-[76px_1fr] sm:gap-7 ${idx % 2 === 0 ? "lg:pr-12 lg:border-r" : "lg:pl-12"}`}>
            <div className="flex flex-col items-center gap-5"><span className="font-headline text-sm text-[#9AA69C]">{svc.number}</span><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CAD3C9] text-[#78958F] transition-all duration-300 group-hover:bg-[#78958F] group-hover:text-white dark:border-white/15 dark:text-[#9CC8BE]"><Icon className="h-5 w-5" /></span></div>
            <div><h3 className="font-subheadline text-2xl font-medium tracking-tight text-[#283430] dark:text-white sm:text-3xl">{svc.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#68736D] dark:text-slate-300">{svc.description}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{svc.features.map((feature) => <span key={feature} className="text-[11px] font-medium tracking-wide text-[#71847A] dark:text-[#A5C5BB]"><span className="mr-2">—</span>{feature}</span>)}</div></div>
          </article>; })}
        </div>
        <div className="mt-12 flex flex-col gap-6 rounded-[28px] bg-[#263A35] p-7 text-white dark:bg-[#142B2C] sm:flex-row sm:items-center sm:justify-between sm:p-9"><div className="max-w-2xl"><span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8D0C3]">{locale === "en" ? "A little more peace of mind" : "Lebih banyak ketenangan"}</span><p className="mt-3 font-subheadline text-2xl leading-snug sm:text-3xl">{locale === "en" ? "More time for the moments that matter." : "Lebih banyak waktu untuk hal yang berarti."}</p><p className="mt-2 text-xs leading-6 text-white/65">{locale === "en" ? "Reliable care, considered timing, and service that fits your day." : "Perawatan yang dapat diandalkan, waktu yang terukur, dan layanan yang mengikuti ritme hari Anda."}</p></div><a href={getNearestChatUrl(chatMessage)} onClick={(e) => { e.preventDefault(); openNearestChat(chatMessage); }} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#E8E9DF] px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#263A35] transition hover:-translate-y-0.5 hover:bg-white">{locale === "en" ? "Talk to our team" : "Konsultasikan kebutuhan Anda"}<ArrowUpRight className="h-4 w-4" /></a></div>
      </div>
    </section>
  );
}
