"use client";

import React from "react";
import { MessageSquarePlus, Sparkles, Wind, PackageCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProcessSteps() {
  const { locale } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: MessageSquarePlus,
      title: locale === "en" ? "Schedule via WhatsApp" : "Jadwalkan via WhatsApp",
      description:
        locale === "en"
          ? "Message us in under 30 seconds with your hotel room number or doorstep location before 10:00 AM."
          : "Kirim pesan dalam kurang dari 30 detik berisi nomor kamar hotel atau alamat penjemputan sebelum pukul 10:00 pagi.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: locale === "en" ? "Gentle Eco & Ozone Care" : "Pembersihan Lembut & Ozon",
      description:
        locale === "en"
          ? "Fabric inspection, dermatological eco-detergents, and low-temperature ozone sanitization for complete freshness."
          : "Pemeriksaan pakaian, deterjen ramah lingkungan teruji dermatologis, dan sanitasi ozon suhu rendah untuk kesegaran maksimal.",
    },
    {
      number: "03",
      icon: Wind,
      title: locale === "en" ? "Artisan Steam & Crisp Fold" : "Setrika Uap & Lipatan Rapi",
      description:
        locale === "en"
          ? "Wrinkle-release finishing, crisp hotel-grade folding, or hanger preparation with breathable dust covers."
          : "Perapian anti-kusut presisi, lipatan standar hotel, atau opsi gantungan pelindung debu bersirkulasi udara.",
    },
    {
      number: "04",
      icon: PackageCheck,
      title: locale === "en" ? "Evening Delivery (12H)" : "Diantar Malam Hari (12 Jam)",
      description:
        locale === "en"
          ? "Delivered back directly to your hotel concierge or residence the very same evening, ready to wear or pack."
          : "Diantar kembali langsung ke concierge hotel atau kediaman Anda di malam hari yang sama, siap dipakai atau disimpan.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-gray-50/70 dark:bg-[#020508] border-b border-gray-200 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            {locale === "en" ? "Fresh Clothes In 4 Simple Steps" : "Pakaian Bersih Segar dalam 4 Langkah Mudah"}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
            {locale === "en"
              ? "Designed for busy professionals and travelers who value their time and wardrobe."
              : "Dirancang khusus bagi kaum profesional dan wisatawan yang menghargai waktu dan kualitas pakaian."}
          </p>
        </div>

        {/* 4 Cards Grid with high contrast in dark mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] hover:bg-white dark:hover:from-[#172B3A] dark:hover:to-[#11202C] rounded-2xl p-7 border border-gray-200/80 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] transition-all duration-300 hover:shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white dark:bg-[#152B3A] text-gray-700 dark:text-[#00C4D4] border border-gray-200 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#152B3A] border border-gray-200/80 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group-hover:bg-[#00C4D4] dark:group-hover:bg-[#00C4D4] group-hover:text-white dark:group-hover:text-gray-950 text-gray-700 dark:text-slate-200 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-[#00C4D4] dark:group-hover:text-[#5CE1D6] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-white/10 flex items-center text-xs font-semibold text-gray-400 dark:text-slate-400 group-hover:text-[#00C4D4] dark:group-hover:text-[#5CE1D6]">
                  <span>Step {step.number} of 04</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
