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
        <div data-aos="fade-down" className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-headline font-[family-name:var(--font-headline)] font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-tight">
            {t("faq.title")}
          </h2>
          <p className="mt-3 font-subheadline font-[family-name:var(--font-subheadline)] text-lg sm:text-xl text-gray-700 dark:text-slate-200">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* Accordion List */}
        <div data-aos="fade-up" data-aos-delay="100" className="divide-y divide-gray-200 dark:divide-white/10 border-y border-gray-200 dark:border-white/10 font-body font-[family-name:var(--font-body)]">
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
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-subheadline font-[family-name:var(--font-subheadline)] font-medium text-lg sm:text-xl text-gray-900 dark:text-white hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] transition-colors cursor-pointer tracking-tight"
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

      </div>
    </section>
  );
}
