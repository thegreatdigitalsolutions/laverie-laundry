"use client";

import React from "react";
import { Check, MessageCircle, Clock } from "lucide-react";
import type { PackageItem } from "@/data/packages";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

interface PackageCardProps {
  pkg: PackageItem;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { localize, t, locale } = useLanguage();

  const turnaround = localize(pkg, "turnaround");
  const description = localize(pkg, "description");
  const rawFeatures = localize(pkg, "features");
  const features: string[] = Array.isArray(rawFeatures) ? rawFeatures : pkg.features;
  const whatsappMessage =
    (locale === "en" ? pkg.whatsappMessage_en : pkg.whatsappMessage) ||
    localize(pkg, "whatsappMessage") ||
    (locale === "en"
      ? `Hello Laverie! I would like to order the ${pkg.name} package.`
      : `Halo Laverie! Saya ingin memesan paket ${pkg.name}.`);

  const whatsappUrl = getNearestChatUrl(whatsappMessage);

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        pkg.popular
          ? "bg-white dark:bg-gradient-to-b dark:from-[#132A39] dark:to-[#0A1721] text-gray-900 dark:text-white border-2 border-[#00C4D4] shadow-2xl shadow-[#00C4D4]/15 dark:shadow-[0_0_50px_rgba(0,196,212,0.22),inset_0_1px_0_0_rgba(0,196,212,0.7)] lg:-translate-y-3 lg:scale-[1.03] z-20 hover:-translate-y-4"
          : "bg-white dark:bg-gradient-to-b dark:from-[#11202C] dark:to-[#09131C] text-gray-900 dark:text-white border border-gray-200/90 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] z-10 hover:-translate-y-1"
      }`}
    >
      <div>
        {/* Featured Tag for Center Card */}
        {pkg.popular && (
          <div className="mb-3">
            <span className="inline-flex items-center text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00C4D4]/15 dark:bg-[#00C4D4]/20 text-[#00838F] dark:text-[#38D9CD] border border-[#00C4D4]/30">
              {t("packages.featuredBadge")}
            </span>
          </div>
        )}

        {/* Package Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight">
            {pkg.name}
          </h3>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            pkg.popular
              ? "bg-[#00C4D4]/15 dark:bg-[#00C4D4]/20 text-[#00838F] dark:text-[#38D9CD] border-[#00C4D4]/30"
              : "bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-slate-200 border-gray-200/80 dark:border-white/10"
          }`}>
            <Clock className={`w-3.5 h-3.5 ${pkg.popular ? "text-[#00C4D4] dark:text-[#38D9CD]" : "text-gray-400 dark:text-slate-400"}`} />
            <span>{turnaround}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Pricing Block */}
        <div className={`pb-6 mb-6 border-b ${pkg.popular ? "border-[#00C4D4]/20 dark:border-[#00C4D4]/30" : "border-gray-100 dark:border-white/10"}`}>
          <div className="flex items-baseline gap-2">
            <span className={`font-extrabold tracking-tight ${
              pkg.popular
                ? "text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-[#5CE1D6]"
                : "text-3xl sm:text-4xl text-gray-900 dark:text-white"
            }`}>
              {pkg.price}
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
              {pkg.unit}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5">
            {locale === "en" ? "*Includes eco wash, delicate dry & seal packaging" : "*Termasuk cuci ramah lingkungan, pengeringan halus & kemasan steril"}
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-3.5 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-200">
            {locale === "en" ? "What’s included:" : "Termasuk dalam paket:"}
          </p>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                pkg.popular
                  ? "bg-[#00C4D4]/20 text-[#00C4D4] dark:bg-[#00C4D4]/25 dark:text-[#38D9CD]"
                  : "bg-[#E0F7FA] dark:bg-white/10 text-[#00C4D4] dark:text-slate-200"
              }`}>
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className={`text-sm leading-relaxed ${pkg.popular ? "text-gray-900 dark:text-white font-semibold" : "text-gray-700 dark:text-slate-200 font-medium"}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order CTA Button - Solid White vs Glass Styling */}
      <a
        href={whatsappUrl}
        onClick={(e) => {
          e.preventDefault();
          openNearestChat(whatsappMessage);
        }}
        className={`w-full rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
          pkg.popular
            ? "py-4 px-5 text-sm bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 shadow-lg shadow-[#00C4D4]/30 hover:shadow-[#00C4D4]/50"
            : "py-3.5 px-4 text-xs bg-gray-900 hover:bg-black text-white dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-white dark:border dark:border-white/15"
        }`}
      >
        <MessageCircle className={`w-4 h-4 ${pkg.popular ? "fill-current text-gray-950" : "fill-current"}`} />
        <span>{t("packages.orderBtn")}</span>
      </a>
    </div>
  );
}
