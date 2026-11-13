"use client";

import React from "react";
import { Star } from "lucide-react";
import { TestimonialItem, defaultTestimonials } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

interface TestimonialsProps {
  items?: TestimonialItem[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  const { t, localize, locale } = useLanguage();
  const reviews = items && items.length > 0 ? items : defaultTestimonials;

  return (
    <section className="py-20 bg-white dark:bg-[#020508] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          title={t("testimonials.title")}
          quote={t("testimonials.subtitle")}
          p1={
            locale === "en"
              ? "We take pride in earning the trust of discerning guests and residents who demand immaculate fabric care and punctual service."
              : "Sebuah kehormatan bagi kami dipercaya oleh tamu hotel berbintang, wisatawan, dan residen lokal yang mengutamakan kualitas dan ketepatan waktu."
          }
          p2={
            locale === "en"
              ? "Discover how our attentive approach transforms everyday laundry into effortless peace of mind."
              : "Simak bagaimana kepedulian kami pada setiap detail memberikan rasa nyaman dan kepraktisan tanpa rasa khawatir."
          }
        />

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body font-[family-name:var(--font-body)]">
          {reviews.map((rev, idx) => {
            const role = localize(rev, "role");
            const content = localize(rev, "content");
            const anim = idx === 0 ? "fade-right" : idx === 1 ? "zoom-in" : "fade-left";
            const delay = (idx + 1) * 150;

            return (
              <div
                key={idx}
                data-aos={anim}
                data-aos-delay={delay}
                className="bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] rounded-2xl p-7 border border-gray-200/80 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] transition-all duration-300 shadow-xs hover:shadow-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote Content — Canela italic */}
                  <p className="font-subheadline font-[family-name:var(--font-subheadline)] italic text-base sm:text-lg text-gray-800 dark:text-slate-100 leading-relaxed mb-6 font-normal">
                    &ldquo;{content}&rdquo;
                  </p>
                </div>

                {/* Author Info — Manrope */}
                <div className="pt-4 border-t border-gray-200/60 dark:border-white/10 flex items-center justify-between font-body font-[family-name:var(--font-body)]">
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
