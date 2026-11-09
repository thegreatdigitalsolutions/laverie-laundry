"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { OutletItem, defaultOutlets } from "@/data/outlets";
import {
  findNearestOutlet,
  formatWhatsAppUrl,
  Coordinates,
} from "@/lib/outletsHelper";
import { MapPin, MessageCircle, X, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized } from "@/lib/i18nHelper";

interface OutletsContextType {
  outlets: OutletItem[];
  activeOutlets: OutletItem[];
  nearestOutlet: OutletItem | null;
  openNearestChat: (customMessage?: string) => void;
  getNearestChatUrl: (customMessage?: string) => string;
  selectOutlet: (outlet: OutletItem, openChat?: boolean) => void;
  openPicker: (pendingMsg?: string) => void;
}

const OutletsContext = createContext<OutletsContextType | null>(null);

const STORAGE_KEY = "laverie_selected_outlet_id";

export function OutletsProvider({
  outlets = defaultOutlets,
  children,
}: {
  outlets?: OutletItem[];
  children: React.ReactNode;
}) {
  const { locale } = useLanguage();
  const activeOutlets = outlets.filter((o) => o.status !== "Inactive");

  const [nearestOutlet, setNearestOutlet] = useState<OutletItem | null>(() => {
    return activeOutlets.length > 0 ? activeOutlets[0] : null;
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const getOutletMessage = useCallback(
    (outlet: OutletItem | null | undefined, customMessage?: string) => {
      if (customMessage) return customMessage;
      if (!outlet) {
        return locale === "en"
          ? "Hello Laverie Laundry! I would like to book a laundry pickup today."
          : "Halo Laverie Laundry! Saya ingin memesan layanan antar jemput laundry hari ini.";
      }
      const directLocalized =
        locale === "en" ? outlet.whatsappMessage_en : outlet.whatsappMessage;
      return (
        directLocalized ||
        getLocalized(outlet, "whatsappMessage", locale) ||
        (locale === "en"
          ? "Hello Laverie Laundry! I would like to book a laundry pickup today."
          : "Halo Laverie Laundry! Saya ingin memesan layanan antar jemput laundry hari ini.")
      );
    },
    [locale]
  );

  // Auto-detect location on client mount if supported or restore saved outlet
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if user previously selected or detected an outlet
    const savedId = localStorage.getItem(STORAGE_KEY);
    if (savedId) {
      const match = activeOutlets.find((o) => o.id === savedId);
      if (match) {
        setNearestOutlet(match);
        return;
      }
    }

    // 2. Try geolocation quietly in background if permissions permit
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const nearest = findNearestOutlet(activeOutlets, userCoords);
          if (nearest) {
            setNearestOutlet(nearest);
            localStorage.setItem(STORAGE_KEY, nearest.id);
          }
        },
        () => {
          // If denied or timed out, default remains activeOutlets[0]
        },
        { timeout: 4000, maximumAge: 600000 }
      );
    }
  }, [activeOutlets]);

  const selectOutlet = useCallback(
    (outlet: OutletItem, openChat = false) => {
      setNearestOutlet(outlet);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, outlet.id);
      }
      if (openChat) {
        const msg = getOutletMessage(outlet, pendingMessage || undefined);
        const url = formatWhatsAppUrl(outlet.phone, msg);
        window.open(url, "_blank", "noopener,noreferrer");
      }
      setIsPickerOpen(false);
      setPendingMessage(null);
    },
    [pendingMessage, getOutletMessage]
  );

  const openPicker = useCallback((pendingMsg?: string) => {
    setPendingMessage(pendingMsg || null);
    setIsPickerOpen(true);
  }, []);

  const openNearestChat = useCallback(
    (customMessage?: string) => {
      // If we already have a saved or detected nearest outlet, open immediately
      if (nearestOutlet && typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
        const msg = getOutletMessage(nearestOutlet, customMessage);
        const url = formatWhatsAppUrl(nearestOutlet.phone, msg);
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }

      // If geolocation is available and not yet saved, try getting current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords: Coordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const nearest = findNearestOutlet(activeOutlets, userCoords) || nearestOutlet || activeOutlets[0];
            if (nearest) {
              setNearestOutlet(nearest);
              localStorage.setItem(STORAGE_KEY, nearest.id);
              const msg = getOutletMessage(nearest, customMessage);
              const url = formatWhatsAppUrl(nearest.phone, msg);
              window.open(url, "_blank", "noopener,noreferrer");
            }
          },
          () => {
            // If location denied or unavailable, show fast 1-click outlet selector
            openPicker(customMessage);
          },
          { timeout: 3000 }
        );
      } else {
        openPicker(customMessage);
      }
    },
    [nearestOutlet, activeOutlets, openPicker, getOutletMessage]
  );

  const getNearestChatUrl = useCallback(
    (customMessage?: string) => {
      const target = nearestOutlet || activeOutlets[0];
      const msg = getOutletMessage(target, customMessage);
      return formatWhatsAppUrl(target?.phone, msg);
    },
    [nearestOutlet, activeOutlets, getOutletMessage]
  );

  return (
    <OutletsContext.Provider
      value={{
        outlets,
        activeOutlets,
        nearestOutlet,
        openNearestChat,
        getNearestChatUrl,
        selectOutlet,
        openPicker,
      }}
    >
      {children}

      {/* 1-Click Nearest Outlet Selector Dialog */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00C4D4]" />
                  <span>{locale === "en" ? "Select Nearest Outlet" : "Pilih Outlet Terdekat"}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                  {locale === "en" ? "Connect with the closest Laverie atelier to your location:" : "Hubungi atelier Laverie terdekat dari lokasi Anda:"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPickerOpen(false);
                  setPendingMessage(null);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              {activeOutlets.map((outlet) => {
                const isSelected = nearestOutlet?.id === outlet.id;
                return (
                  <button
                    key={outlet.id}
                    type="button"
                    onClick={() => selectOutlet(outlet, true)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#00C4D4]/10 border-[#00C4D4] dark:bg-[#00C4D4]/15"
                        : "bg-gray-50 dark:bg-white/[0.04] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-transparent">
                          {outlet.tabName}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#00838F] dark:text-[#38D9CD]">
                            • {locale === "en" ? "Current" : "Aktif"}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {outlet.name}
                      </div>
                      {outlet.phone && (
                        <div className="text-xs text-[#00C4D4] dark:text-[#5CE1D6] mt-0.5 font-mono">
                          {outlet.phone}
                        </div>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#00C4D4] group-hover:bg-[#00C4D4]/10 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-400 dark:text-slate-500 text-center pt-2">
              {locale === "en"
                ? "You will be directed straight to WhatsApp chat with the selected outlet."
                : "Anda akan langsung diarahkan ke percakapan WhatsApp dengan outlet yang dipilih."}
            </p>
          </div>
        </div>
      )}
    </OutletsContext.Provider>
  );
}

export function useOutlets() {
  const ctx = useContext(OutletsContext);
  if (!ctx) {
    // Graceful fallback if used outside provider
    return {
      outlets: defaultOutlets,
      activeOutlets: defaultOutlets,
      nearestOutlet: defaultOutlets[0] || null,
      openNearestChat: (customMsg?: string) => {
        const url = formatWhatsAppUrl(defaultOutlets[0]?.phone, customMsg);
        if (typeof window !== "undefined") window.open(url, "_blank");
      },
      getNearestChatUrl: (customMsg?: string) => {
        return formatWhatsAppUrl(defaultOutlets[0]?.phone, customMsg);
      },
      selectOutlet: () => {},
      openPicker: () => {},
    };
  }
  return ctx;
}

