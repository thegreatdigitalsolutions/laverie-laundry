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
    <section id="faq" className="py-20 bg-white dark:bg-[#03070C] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-gray-200 dark:divide-white/10 border-y border-gray-200 dark:border-white/10">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = localize(faq, "question");
            const answer = localize(faq, "answer");

            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-gray-900 dark:text-white hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-300 ${
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
                    <div className="pb-6 pt-1 text-sm sm:text-base text-gray-600 dark:text-slate-200 leading-relaxed">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-14 p-7 rounded-3xl bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
              {locale === "en" ? "Have a special garment or custom hotel request?" : "Punya permintaan khusus pakaian atau penjemputan hotel?"}
            </h4>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 mt-1">
              {locale === "en" ? "Our concierge team is available on WhatsApp daily from 07:30 to 21:00." : "Tim concierge kami siap melayani di WhatsApp setiap hari mulai pukul 07:30 hingga 21:00."}
            </p>
          </div>
          <a
            href={getNearestChatUrl(t("common.chatPrompt"))}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(t("common.chatPrompt"));
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-md shadow-[#00C4D4]/20 hover:shadow-lg hover:shadow-[#00C4D4]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
            <span>{t("faq.chatBtn")}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
