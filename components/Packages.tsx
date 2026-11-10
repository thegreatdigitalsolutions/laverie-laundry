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
  const { t } = useLanguage();
  const displayPackages = items && items.length > 0 ? items : packages;

  return (
    <section id="packages" className="py-20 bg-[#F8F9FA] dark:bg-[#060E16] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.1),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-down" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline font-[family-name:var(--font-headline)] font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-tight">
            {t("packages.title")}
          </h2>
          <p className="mt-3 font-subheadline font-[family-name:var(--font-subheadline)] text-lg sm:text-xl text-gray-700 dark:text-slate-200">
            {t("packages.subtitle")}
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
