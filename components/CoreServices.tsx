"use client";

import React from "react";
import { Clock, Shirt, Sparkles, BedDouble } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CoreServices() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { locale, t } = useLanguage();

  const services = [
    {
      icon: Clock,
      title: locale === "en" ? "12-Hour Hotel Express" : "Kilat Hotel 12 Jam",
      description:
        locale === "en"
          ? "Specifically designed for travelers and business itineraries. Picked up before 10 AM, returned fresh before 10 PM."
          : "Dirancang khusus untuk tamu hotel dan perjalanan bisnis. Dijemput sebelum 10:00 pagi, diantar kembali segar sebelum 22:00 malam.",
      features:
        locale === "en"
          ? ["Lobby pickup & delivery", "Ozone antibacterial wash", "Evening return guarantee"]
          : ["Antar jemput lobi hotel", "Cuci antibakteri ozon", "Jaminan selesai sore/malam"],
    },
    {
      icon: Shirt,
      title: locale === "en" ? "Wash, Dry & Fold" : "Cuci, Kering & Lipat",
      description:
        locale === "en"
          ? "The ultimate everyday convenience. Temperature-controlled wash, delicate tumble dry, and hotel-crisp folding."
          : "Solusi praktis pakaian sehari-hari. Pencucian dengan suhu terkontrol, pengeringan halus, dan lipatan rapi standar hotel.",
      features:
        locale === "en"
          ? ["Color sorting", "Dermatological detergent", "Sealed hygienic bundles"]
          : ["Pemisahan warna kain", "Deterjen ramah kulit", "Kemasan steril higienis"],
    },
    {
      icon: Sparkles,
      title: locale === "en" ? "Delicate & Dry Cleaning" : "Pakaian Halus & Dry Clean",
      description:
        locale === "en"
          ? "Artisan hand-pressing and gentle solvent-free dry care for suits, silk dresses, cashmere, and designer garments."
          : "Setrika uap manual presisi dan perawatan lembut bebas pelarut keras untuk jas, gaun sutra, kasmir, dan pakaian pesta.",
      features:
        locale === "en"
          ? ["Individual stain treatment", "Hand steam finishing", "Delivered on hangers"]
          : ["Penanganan noda khusus", "Setrika uap manual presisi", "Diantar dengan hanger & cover"],
    },
    {
      icon: BedDouble,
      title: locale === "en" ? "Linen & Duvet Care" : "Perawatan Linen & Selimut",
      description:
        locale === "en"
          ? "Deep thermal sanitization for bed linens, fluffy towels, duvets, and blankets restoring fresh loft and softness."
          : "Sanitasi termal mendalam untuk sprei, handuk tebal, duvet, dan selimut, mengembalikan kelembutan dan kesegaran serat.",
      features:
        locale === "en"
          ? ["High-capacity equipment", "Aroma-free hypoallergenic", "Vacuum packaging available"]
          : ["Mesin kapasitas besar", "Formula hipoalergenik", "Tersedia kemasan vakum"],
    },
  ];

  const chatMessage =
    locale === "en"
      ? "Hello Laverie Laundry! I have a question about your services."
      : "Halo Laverie Laundry! Saya ingin bertanya tentang layanan Anda.";

  return (
    <section id="services" className="py-20 bg-white dark:bg-[#020508] border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
              {locale === "en" ? "Core Services" : "Layanan Utama"}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-slate-200">
              {locale === "en"
                ? "Expert garment treatment and laundry solutions for every textile requirement."
                : "Perawatan pakaian profesional dan solusi laundry untuk setiap jenis serat kain."}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={getNearestChatUrl(chatMessage)}
              onClick={(e) => {
                e.preventDefault();
                openNearestChat(chatMessage);
              }}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-900 dark:text-[#5CE1D6] hover:text-[#00C4D4] dark:hover:text-[#80EFE7] transition-colors cursor-pointer"
            >
              <span>{locale === "en" ? "Consult with our garment specialist" : "Konsultasi dengan spesialis laundry kami"}</span>
            </a>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#F8F9FA] dark:bg-gradient-to-b dark:from-[#132431] dark:to-[#0E1A24] hover:bg-white dark:hover:from-[#172B3A] dark:hover:to-[#11202C] rounded-2xl p-7 border border-gray-200/80 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.14] transition-all duration-300 hover:shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#152B3A] border border-gray-200/80 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] group-hover:bg-[#00C4D4] dark:group-hover:bg-[#00C4D4] group-hover:text-white dark:group-hover:text-gray-950 text-gray-800 dark:text-slate-200 flex items-center justify-center mb-5 transition-colors shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-[#00C4D4] dark:group-hover:text-[#5CE1D6] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/60 dark:border-white/10 space-y-2.5">
                  {svc.features.map((item, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-slate-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C4D4] dark:bg-[#5CE1D6]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
