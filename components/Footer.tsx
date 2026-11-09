"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";
import { OutletItem, defaultOutlets } from "@/data/outlets";

interface FooterProps {
  outlets?: OutletItem[];
}

export default function Footer({ outlets }: FooterProps) {
  const { nearestOutlet, activeOutlets: ctxActiveOutlets, selectOutlet, openNearestChat, getNearestChatUrl } = useOutlets();
  const { t, locale, localize } = useLanguage();

  const activeOutlets = (outlets && outlets.length > 0)
    ? outlets.filter((o) => o.status !== "Inactive")
    : (ctxActiveOutlets && ctxActiveOutlets.length > 0)
    ? ctxActiveOutlets
    : defaultOutlets;

  const currentOutlet = nearestOutlet || activeOutlets[0] || defaultOutlets[0];

  const chatMessage =
    locale === "en"
      ? "Hello Laverie Laundry! I would like to ask about your services."
      : "Halo Laverie Laundry! Saya ingin bertanya tentang layanan Anda.";

  return (
    <footer className="bg-[#020406] text-gray-400 pt-16 pb-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white/10 p-1 border border-white/10">
                <Image
                  src="/logo/laverie-logo.png"
                  alt="Laverie Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                  LAVERIE
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-0.5">
                  Premium Laundry
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {locale === "en"
                ? "Don’t waste your luggage on yesterday. Professional same-day hotel express and bespoke fabric care, crafted for seamless living and effortless travel."
                : "Jangan habiskan liburan Anda untuk mencuci baju kemarin. Layanan kilat express hotel di hari yang sama dan perawatan pakaian premium untuk keseharian praktis dan perjalanan tanpa beban."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/laverie_laundry/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00C4D4] hover:text-white text-gray-300 flex items-center justify-center transition-colors border border-white/10"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href={getNearestChatUrl(chatMessage)}
                onClick={(e) => {
                  e.preventDefault();
                  openNearestChat(chatMessage);
                }}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00C4D4] hover:text-white text-gray-300 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-[#00C4D4] transition-colors">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#00C4D4] transition-colors">{t("nav.process")}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C4D4] transition-colors">{t("nav.services")}</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#00C4D4] transition-colors">{t("nav.packages")}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00C4D4] transition-colors">{t("nav.faq")}</a>
              </li>
              <li>
                <Link href="/laundry-premium-jakarta" className="hover:text-[#00C4D4] transition-colors">
                  Laundry Premium Jakarta
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Operating Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              {t("footer.contact")}
            </h4>

            {/* Active Outlets Switcher if more than 1 outlet */}
            {activeOutlets.length > 1 && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {activeOutlets.map((outlet) => {
                  const isSelected = outlet.id === currentOutlet?.id;
                  return (
                    <button
                      key={outlet.id}
                      type="button"
                      onClick={() => selectOutlet(outlet)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#00C4D4] text-gray-950 font-semibold shadow-xs"
                          : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      {outlet.tabName}
                    </button>
                  );
                })}
              </div>
            )}

            <div key={currentOutlet.id} className="space-y-3 text-sm animate-outlet-change">
              {/* Operating Hours */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#00C4D4] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white block font-medium">
                    {locale === "en" ? "Daily Operations" : "Operasional Harian"}
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    {currentOutlet.openingHours}
                  </span>
                </div>
              </div>

              {/* Outlet Location & Coverage */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C4D4] mt-0.5 shrink-0" />
                <div>
                  {currentOutlet.mapsUrl ? (
                    <a
                      href={currentOutlet.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white block font-medium hover:text-[#00C4D4] transition-colors"
                    >
                      {currentOutlet.name}
                    </a>
                  ) : (
                    <span className="text-white block font-medium">
                      {currentOutlet.name}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 block mt-0.5">
                    {currentOutlet.address}
                  </span>
                  {currentOutlet.dispatch && (
                    <span className="text-[11px] text-[#00C4D4] block mt-0.5">
                      {localize(currentOutlet, "dispatch")}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone / Contact */}
              {currentOutlet.phone && (
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#00C4D4] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-white block font-medium">
                      {locale === "en" ? "Concierge & Inquiries" : "Concierge & Informasi"}
                    </span>
                    <a
                      href={`tel:${currentOutlet.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-xs text-gray-400 hover:text-[#00C4D4] transition-colors block mt-0.5"
                    >
                      {currentOutlet.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Laverie Laundry. {t("footer.copyright")}</p>
          <p>{locale === "en" ? "Premium Hotel Express & Bespoke Fabric Care" : "Layanan Laundry Hotel Express & Perawatan Kain Premium"}</p>
        </div>
      </div>
    </footer>
  );
}
