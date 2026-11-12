"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs, FAQItem } from "@/data/faq";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { t, localize, locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = items && items.length > 0 ? items : faqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative isolate overflow-hidden py-24 sm:py-32 bg-[#F8F7F2] dark:bg-[#0A1417] transition-colors duration-500">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.17] dark:opacity-[0.10]" style={{ backgroundImage: "url('/images/hero/laverie-hero-clean.jpg')" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#F8F7F2]/90 via-[#F8F7F2]/95 to-[#F8F7F2]/90 dark:from-[#0A1417]/90 dark:via-[#0A1417]/95 dark:to-[#0A1417]/90" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title={t("faq.title")}
          quote={t("faq.subtitle")}
          p1={
            locale === "en"
              ? "A little clarity makes every experience more comfortable. Here are answers to common questions about our services, pickup coordination, and garment hygiene."
              : "Kami percaya pengalaman yang nyaman dimulai dari informasi yang transparan. Temukan jawaban seputar layanan penjemputan, waktu pengerjaan, dan standar higienitas kami."
          }
          p2={
            locale === "en"
              ? "Free pickup and delivery is available within a 5 km radius across PIK and Pluit. If your location is further, our concierge is always ready via WhatsApp."
              : "Fasilitas gratis antar jemput berlaku untuk radius 5 km di area PIK dan Pluit. Jika Anda berada di luar radius tersebut, tim kami siap membantu via WhatsApp."
          }
        />

        {/* Accordion List */}
        <div data-aos="fade-up" data-aos-delay="100" className="divide-y divide-[#DCDDD4] border-y border-[#DCDDD4] font-body font-[family-name:var(--font-body)] dark:divide-white/10 dark:border-white/10">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = localize(faq, "question");
            const answer = localize(faq, "answer");
            const delay = Math.min((idx + 1) * 70, 400);

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-subheadline font-[family-name:var(--font-subheadline)] font-medium text-lg sm:text-xl text-[#303B36] dark:text-white hover:text-[#78958F] dark:hover:text-[#9CC8BE] transition-colors cursor-pointer tracking-tight"
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out bg-[#E9ECE5] dark:bg-white/10 text-[#78958F] dark:text-slate-300 ${
                      isOpen ? "rotate-180 text-[#78958F] dark:text-[#9CC8BE]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pt-1 text-sm sm:text-base text-[#68736D] dark:text-slate-300 leading-8">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
