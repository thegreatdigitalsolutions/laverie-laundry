"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs, FAQItem } from "@/data/faq";

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = items && items.length > 0 ? items : faqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#03070C] border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
            Everything you need to know about our express hotel turnaround, garment care, and pickup process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-gray-200 dark:divide-white/10 border-y border-gray-200 dark:border-white/10">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-gray-900 dark:text-white hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-slate-300 ${
                      isOpen ? "rotate-180 text-[#00C4D4] dark:text-[#5CE1D6]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6 pt-1 text-sm sm:text-base text-gray-600 dark:text-slate-200 leading-relaxed animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-14 p-7 rounded-3xl bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] border border-gray-200 dark:border-white/[0.06] shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
              Have a special garment or custom hotel request?
            </h4>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 mt-1">
              Our concierge team is available on WhatsApp daily from 07:30 to 21:00.
            </p>
          </div>
          <a
            href="https://wa.me/?text=Hello%20Laverie%20Concierge!%20I%20have%20a%20question%20about%20pickup."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-md shadow-[#00C4D4]/20 hover:shadow-lg hover:shadow-[#00C4D4]/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
            <span>Chat With Concierge</span>
          </a>
        </div>

      </div>
    </section>
  );
}
