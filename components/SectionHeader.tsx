"use client";

import React from "react";
import Image from "next/image";

interface SectionHeaderProps {
  title: string;
  quote?: string;
  p1?: string;
  p2?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionHeader({
  title,
  quote,
  p1,
  p2,
  className = "",
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      data-aos="fade-up"
      className={`max-w-4xl mx-auto text-center mb-16 ${className}`}
    >
      {/* 1. Main Title */}
      <h2
        className={`font-headline font-[family-name:var(--font-headline)] font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] ${
          dark ? "text-white" : "text-[#202A29] dark:text-white"
        }`}
      >
        {title}
      </h2>

      {/* 2. Italic Quote / Subtitle with quotation marks */}
      {quote && (
        <p
          className={`mt-4 font-subheadline font-[family-name:var(--font-subheadline)] italic text-xl sm:text-2xl lg:text-[25px] leading-snug tracking-tight ${
            dark
              ? "text-[#5CE1D6]"
              : "text-[#3A4B46] dark:text-[#B6D6CC]"
          }`}
        >
          &ldquo;{quote.replace(/^["“]|["”]$/g, "")}&rdquo;
        </p>
      )}

      {/* 3. Narrative Paragraphs */}
      {(p1 || p2) && (
        <div
          className={`mt-6 mx-auto max-w-3xl space-y-3.5 font-body font-[family-name:var(--font-body)] text-sm sm:text-base leading-relaxed ${
            dark
              ? "text-slate-300"
              : "text-[#616D68] dark:text-slate-300"
          }`}
        >
          {p1 && <p>{p1}</p>}
          {p2 && <p>{p2}</p>}
        </div>
      )}

      {/* 4. Center Laverie Emblem Divider */}
      <div className="flex items-center justify-center gap-4 pt-8 pb-1 select-none pointer-events-none">
        <div
          className={`h-[1px] w-20 sm:w-28 ${
            dark ? "bg-white/25" : "bg-[#D2CFC5] dark:bg-white/20"
          }`}
        />
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
          <Image
            src="/logo/laverie-icon.png"
            alt="Laverie Emblem"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div
          className={`h-[1px] w-20 sm:w-28 ${
            dark ? "bg-white/25" : "bg-[#D2CFC5] dark:bg-white/20"
          }`}
        />
      </div>
    </div>
  );
}

