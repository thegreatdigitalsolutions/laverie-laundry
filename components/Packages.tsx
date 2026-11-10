"use client";

import React from "react";
import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";
import { PackageItem } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";

interface PackagesProps {
  items?: PackageItem[];
}

export default function Packages({ items }: PackagesProps) {
  const { t, locale } = useLanguage();
  const displayPackages = items && items.length > 0 ? items : packages;

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#E9E6DC] dark:bg-[#101C1D] relative overflow-hidden transition-colors duration-500">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(120,149,143,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-down" className="text-center max-w-3xl mx-auto mb-16">
          <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#78958F] dark:text-[#9CC8BE]"><span className="h-px w-8 bg-current" />{ "THE LAVERIE EXPERIENCE · 02" }</span>
          <h2 className="font-headline font-[family-name:var(--font-headline)] font-light text-4xl sm:text-5xl lg:text-6xl text-[#26312E] dark:text-white tracking-tight">
            {t("packages.title")}
          </h2>
          <p className="mt-5 font-subheadline font-[family-name:var(--font-subheadline)] text-lg sm:text-xl text-[#68736D] dark:text-slate-300">
            {t("packages.subtitle")}<span className="mt-3 block text-sm leading-7 text-[#7B827A] dark:text-slate-400">{locale === "en" ? "Choose the care that best suits your needs. Every option is designed to deliver a considered result without compromising comfort." : "Pilih perawatan yang paling sesuai dengan kebutuhan Anda. Setiap pilihan dirancang untuk memberi hasil yang terasa, tanpa mengurangi kenyamanan."}</span>
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {displayPackages.map((pkg, idx) => {
            const anim = idx === 0 ? "fade-right" : idx === 1 ? "zoom-in" : "fade-left";
            const delay = (idx + 1) * 150;
            return (
              <div
                key={pkg.id}
                data-aos={anim}
                data-aos-delay={delay}
                className="flex flex-col"
              >
                <PackageCard pkg={pkg} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
