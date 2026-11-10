"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsDark() {
  const { locale } = useLanguage();

  const metrics = [
    {
      value: "12H",
      label: locale === "en" ? "Same-Day Express" : "Kilat Hari yang Sama",
      description:
        locale === "en"
          ? "Pick up before 10 AM, returned before evening dinner."
          : "Dijemput sebelum jam 10 pagi, diantar kembali sebelum makan malam.",
    },
    {
      value: "15,000+",
      label: locale === "en" ? "Garments Treated" : "Pakaian Ditangani",
      description:
        locale === "en"
          ? "From delicate couture silks to everyday laundry."
          : "Mulai dari sutra halus gaun pesta hingga pakaian kasual harian.",
    },
    {
      value: "25+",
      label: locale === "en" ? "Partner Hotels" : "Hotel & Villa Mitra",
      description:
        locale === "en"
          ? "Trusted by boutique villas & luxury suites."
          : "Dipercaya oleh villa butik & kamar hotel berbintang.",
    },
    {
      value: "99.8%",
      label: locale === "en" ? "On-Time Dispatch" : "Ketepatan Waktu",
      description:
        locale === "en"
          ? "Reliable coordination right to your concierge."
          : "Koordinasi terpercaya tepat waktu langsung ke concierge Anda.",
    },
  ];

  return (
    <section className="py-24 bg-[#081219] dark:bg-[#020508] text-white relative overflow-hidden transition-colors duration-300 border-b border-gray-800 dark:border-white/10">
      {/* Ambient center aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Bottom separation accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/25 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            {locale === "en" ? "Our numbers speak for themselves" : "Kualitas Nyata Berdasarkan Angka"}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal">
            {locale === "en"
              ? "Built on punctuality, fabric integrity, and seamless hotel coordination."
              : "Berlandaskan ketepatan waktu, perlindungan serat kain, dan koordinasi hotel yang mulus."}
          </p>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-start ${
                idx === 0
                  ? "lg:pr-8"
                  : idx === metrics.length - 1
                  ? "lg:pl-8"
                  : "lg:px-8"
              } border-b border-white/10 lg:border-b-0 pb-6 lg:pb-0 last:border-b-0`}
            >
              <div className="font-extrabold text-3xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#5CE1D6] mb-2 leading-none py-1">
                {item.value}
              </div>
              <p className="text-base sm:text-lg font-bold text-white tracking-wide mb-1.5 mt-1">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
