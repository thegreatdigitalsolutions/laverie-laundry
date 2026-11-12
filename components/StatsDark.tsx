"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function StatsDark() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const numLocale = isEn ? "en-US" : "id-ID";

  // Dynamic benchmark calculation: starting January 1, 2024, adds 500 kg each month
  const { totalTons, totalKg, totalPcs } = useMemo(() => {
    const startDate = new Date(2024, 0, 1);
    const now = new Date();
    const monthsElapsed = Math.max(
      1,
      (now.getFullYear() - 2024) * 12 + (now.getMonth() - startDate.getMonth()) + 1
    );
    const kg = monthsElapsed * 500;
    const tons = (kg / 1000).toFixed(1);
    const pcs = Math.round(kg * 4.5);
    return {
      totalTons: tons,
      totalKg: kg,
      totalPcs: pcs,
    };
  }, []);

  const formattedKg = totalKg.toLocaleString(numLocale);
  const formattedPcs = totalPcs.toLocaleString(numLocale);

  const metrics = [
    {
      value: `${totalTons}+ Ton`,
      label: isEn ? "Tons of Laundry Processed" : "Ton Cucian Diproses",
      description: isEn
        ? `Over ${formattedKg} kg of everyday clothes and fine home linens washed with eco-friendly formulas since Jan 2024.`
        : `Lebih dari ${formattedKg} kg cucian harian dan linen telah dicuci higienis sejak 1 Januari 2024 (+500 kg/bulan).`,
    },
    {
      value: `${formattedPcs}+ Pcs`,
      label: isEn ? "Delicates & Garments Treated" : "Pakaian Satuan & Delicates",
      description: isEn
        ? "Couture gowns, silk dresses, suits, batik, designer bags, and footwear given bespoke care."
        : "Puluhan ribu gaun sutra, jas, batik tulis, sepatu, dan tas berharga dirawat satuan dengan standar atelier.",
    },
    {
      value: "100% Free",
      label: isEn ? "Free Pickup & Delivery (5 km)" : "Gratis Antar Jemput (5 km)",
      description: isEn
        ? "Complimentary doorstep service for PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, and Pantai Mutiara."
        : "Layanan penjemputan gratis untuk PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, dan Pantai Mutiara.",
    },
    {
      value: "12 Jam",
      label: isEn ? "Same-Day Express" : "Layanan Kilat Hari yang Sama",
      description: isEn
        ? "Picked up before 10 AM, returned fresh, crisp, and sealed before 10 PM dinner."
        : "Dijemput sebelum jam 10 pagi, diantar kembali bersih wangi dalam kemasan steril sebelum jam 10 malam.",
    },
  ];

  return (
    <section className="py-24 bg-[#081219] dark:bg-[#020508] text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient center aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Bottom separation accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/25 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Consistent template (no extra sub-badge) */}
        <SectionHeader
          dark
          title={isEn ? "Our Numbers Speak for Themselves" : "Standar Kualitas Nyata Berdasarkan Angka"}
          quote={isEn ? "Proven excellence in every wash, from hundreds of tons to delicate individual pieces." : "Bukti nyata dedikasi dan standar kualitas kami dalam merawat setiap helai pakaian Anda."}
          p1={
            isEn
              ? "Built on fabric integrity, hospital-grade hygiene sanitization, and seamless door-to-door coordination."
              : "Berlandaskan integritas serat kain, standar sterilisasi higienis perhotelan, dan koordinasi antar jemput yang tepat waktu."
          }
          p2={
            isEn
              ? `Over ${totalTons} tons of garments and ${formattedPcs}+ delicate pieces cared for, with 100% free pickup within 5 km.`
              : `Lebih dari ${totalTons} ton cucian dan ${formattedPcs}+ pakaian istimewa telah kami tangani dengan fasilitas gratis antar jemput radius 5 km.`
          }
        />

        {/* Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10 font-body font-[family-name:var(--font-body)]">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              data-aos="zoom-in-up"
              data-aos-delay={(idx + 1) * 100}
              className={`flex flex-col justify-start ${
                idx === 0
                  ? "lg:pr-8"
                  : idx === metrics.length - 1
                  ? "lg:pl-8"
                  : "lg:px-8"
              } border-b border-white/10 lg:border-b-0 pb-6 lg:pb-0 last:border-b-0`}
            >
              <div className="font-subheadline font-[family-name:var(--font-subheadline)] font-bold text-3xl sm:text-4xl lg:text-4xl xl:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#5CE1D6] mb-2 leading-none py-1">
                {item.value}
              </div>
              <p className="font-subheadline font-[family-name:var(--font-subheadline)] text-base sm:text-lg font-medium text-white tracking-wide mb-1.5 mt-1">
                {item.label}
              </p>
              <p className="font-body font-[family-name:var(--font-body)] text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
