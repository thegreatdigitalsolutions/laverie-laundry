"use client";

import React from "react";
import { Star } from "lucide-react";
import { TestimonialItem, defaultTestimonials } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";

interface TestimonialsProps {
  items?: TestimonialItem[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  const { t, localize } = useLanguage();
  const reviews = items && items.length > 0 ? items : defaultTestimonials;

  return (
    <section className="py-20 bg-white dark:bg-[#020508] border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            const role = localize(rev, "role");
            const content = localize(rev, "content");

            return (
              <div
                key={idx}
                className="bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] rounded-2xl p-7 border border-gray-200/80 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] transition-all duration-300 shadow-xs hover:shadow-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote Content */}
                  <p className="text-sm sm:text-base text-gray-700 dark:text-slate-200 leading-relaxed mb-6 font-normal">
                    "{content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-200/60 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{role}</p>
                    <p className="text-xs text-[#00C4D4] dark:text-[#5CE1D6] font-semibold mt-0.5">{rev.hotel}</p>
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
