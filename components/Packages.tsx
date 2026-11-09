"use client";

import React from "react";
import Image from "next/image";
import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";
import { CheckCircle2 } from "lucide-react";
import { PackageItem } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";

interface PackagesProps {
  items?: PackageItem[];
}

export default function Packages({ items }: PackagesProps) {
  const { t } = useLanguage();
  const displayPackages = items && items.length > 0 ? items : packages;

  return (
    <section id="packages" className="py-20 bg-[#F8F9FA] dark:bg-[#060E16] relative overflow-hidden border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.1),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-tight">
            {t("packages.title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
            {t("packages.subtitle")}
          </p>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {displayPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Packaging Showcase Banner */}
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-white/[0.06] shadow-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.6)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
            <Image
              src="/images/packages/laverie-packaging.jpg"
              alt="Laverie signature presentation packaging"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-tight">
              {t("packages.showcaseTitle")}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 leading-relaxed font-normal">
              {t("packages.showcaseDesc")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> {t("packages.showcaseCheck1")}
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> {t("packages.showcaseCheck2")}
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" /> {t("packages.showcaseCheck3")}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
