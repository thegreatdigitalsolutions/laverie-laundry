import React from "react";
import Image from "next/image";

interface SectionDividerProps {
  className?: string;
  width?: "normal" | "wide";
}

export default function SectionDivider({ className = "", width = "normal" }: SectionDividerProps) {
  const lineWidth = width === "wide" ? "w-24 sm:w-36" : "w-16 sm:w-28";
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="600"
      className={`flex items-center justify-center gap-4 py-6 sm:py-8 select-none pointer-events-none ${className}`}
    >
      <div className={`h-[1px] ${lineWidth} bg-gray-300/80 dark:bg-white/20 transition-colors`} />
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
        <Image
          src="/logo/laverie-icon.png"
          alt="Laverie Emblem"
          width={18}
          height={18}
          className="object-contain"
        />
      </div>
      <div className={`h-[1px] ${lineWidth} bg-gray-300/80 dark:bg-white/20 transition-colors`} />
    </div>
  );
}

