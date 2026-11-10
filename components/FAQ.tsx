"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs, FAQItem } from "@/data/faq";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

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
        <div data-aos="fade-down" className="mx-auto mb-14 grid max-w-4xl gap-5 text-center md:grid-cols-[0.85fr_1.15fr] md:items-end md:text-left">
          <div><span className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#78958F] dark:text-[#9CC8BE]"><span className="h-px w-8 bg-current" />THE LAVERIE EXPERIENCE · 03</span>
          <h2 className="font-headline font-[family-name:var(--font-headline)] font-light text-4xl sm:text-5xl lg:text-6xl text-[#26312E] dark:text-white tracking-tight">
            {t("faq.title")}
          </h2></div>
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#68736D] dark:text-slate-300 md:pb-1">
            {locale === "en" ? "A little clarity makes every experience more comfortable. Here are a few things you may want to know before placing your garments in our care." : "Kami percaya pengalaman yang nyaman dimulai dari informasi yang jelas. Temukan jawaban atas hal-hal yang mungkin ingin Anda ketahui sebelum mempercayakan pakaian kepada kami."}
          </p>
        </div>

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
                      isOpen ? "rotate-180 text-[#00C4D4] dark:text-[#5CE1D6]" : ""
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
