"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { OutletItem, defaultOutlets } from "@/data/outlets";
import {
  findNearestOutlet,
  formatWhatsAppUrl,
  checkServiceRadius,
  Coordinates,
} from "@/lib/outletsHelper";
import { MapPin, X, ChevronRight, ShieldCheck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OutletsContextType {
  outlets: OutletItem[];
  activeOutlets: OutletItem[];
  nearestOutlet: OutletItem | null;
  isWithin5km: boolean;
  userDistance: number | null;
  locationChecked: boolean;
  orderActionLabel: string;
  openNearestChat: (customMessage?: string, forceAction?: "order" | "chat") => void;
  getNearestChatUrl: (customMessage?: string, forceAction?: "order" | "chat") => string;
  selectOutlet: (outlet: OutletItem, openChat?: boolean) => void;
  openPicker: (pendingMsg?: string) => void;
}

const OutletsContext = createContext<OutletsContextType | null>(null);

const STORAGE_OUTLET_KEY = "laverie_selected_outlet_id";

export function OutletsProvider({
  outlets = defaultOutlets,
  children,
}: {
  outlets?: OutletItem[];
  children: React.ReactNode;
}) {
  const { locale } = useLanguage();
  const activeOutlets = useMemo(
    () => outlets.filter((o) => o.status !== "Inactive"),
    [outlets]
  );

  const [nearestOutlet, setNearestOutlet] = useState<OutletItem | null>(() => {
    return activeOutlets.length > 0 ? activeOutlets[0] : null;
  });

  // Track if user explicitly selected an outlet
  const userHasSelectedManually = useRef<boolean>(false);
  const hasRunGeo = useRef<boolean>(false);

  // Default: always expect > 5 km unless verified by location
  const [isWithin5km, setIsWithin5km] = useState<boolean>(false);
  const [userDistance, setUserDistance] = useState<number | null>(null);
  const [locationChecked, setLocationChecked] = useState<boolean>(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const getOutletMessage = useCallback(
    (outlet: OutletItem | null | undefined, customMessage?: string, forceAction?: "order" | "chat") => {
      const isOrder = forceAction ? forceAction === "order" : isWithin5km;

      if (customMessage) {
        if (
          !isOrder &&
          !customMessage.toLowerCase().includes("5 km") &&
          !customMessage.toLowerCase().includes("5km")
        ) {
          return locale === "en"
            ? `${customMessage} (Note: Location beyond 5 km. Inquiring about courier/pickup options.)`
            : `${customMessage} (Catatan: Lokasi di luar radius 5 km. Mohon info penjemputan/kurir khusus.)`;
        }
        return customMessage;
      }

      if (!outlet) {
        return isOrder
          ? locale === "en"
            ? "Hello Laverie Laundry! I would like to book a free laundry pickup (within 5 km radius)."
            : "Halo Laverie Laundry! Saya ingin memesan layanan antar jemput laundry gratis (Radius 5 km)."
          : locale === "en"
          ? "Hello Laverie Laundry! I would like to chat and inquire about your laundry and pickup services."
          : "Halo Laverie Laundry! Saya ingin chat dan konsultasi mengenai layanan laundry dan penjemputan.";
      }

      if (!isOrder) {
        return locale === "en"
          ? `Hello ${outlet.name}! My location is currently beyond your 5 km free delivery radius. Would like to inquire if courier or special pickup is available.`
          : `Halo ${outlet.name}! Lokasi saya berada di luar radius 5 km. Apakah bisa konsultasi penjemputan atau pengiriman via kurir?`;
      }

      return locale === "en"
        ? `Hello ${outlet.name}! My location is verified within your 5 km radius. I would like to order free doorstep pickup & delivery.`
        : `Halo ${outlet.name}! Lokasi saya dalam radius 5 km. Saya ingin memesan layanan antar jemput laundry gratis.`;
    },
    [locale, isWithin5km]
  );

  // Auto-detect location on client mount: read from location, otherwise always expect > 5km
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasRunGeo.current) return;
    hasRunGeo.current = true;

    // Restore saved outlet preference if any
    const savedOutletId = localStorage.getItem(STORAGE_OUTLET_KEY);
    if (savedOutletId) {
      const match = activeOutlets.find((o) => o.id === savedOutletId);
      if (match) {
        setNearestOutlet(match);
        userHasSelectedManually.current = true;
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationChecked(true);
          const userCoords: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const radiusCheck = checkServiceRadius(userCoords, activeOutlets, 5);

          // Only true if GPS proves user is within 5 km of an outlet
          setIsWithin5km(radiusCheck.isWithinRange);
          setUserDistance(radiusCheck.distanceKm);

          // Only set nearestOutlet if user has not manually chosen an outlet
          if (radiusCheck.nearestOutlet && !userHasSelectedManually.current && !savedOutletId) {
            setNearestOutlet(radiusCheck.nearestOutlet);
            localStorage.setItem(STORAGE_OUTLET_KEY, radiusCheck.nearestOutlet.id);
          }
        },
        () => {
          // If denied, unavailable, or timed out -> ALWAYS expect > 5 km
          setLocationChecked(true);
          setIsWithin5km(false);
          setUserDistance(null);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      setLocationChecked(true);
      setIsWithin5km(false);
    }
  }, [activeOutlets]);

  const selectOutlet = useCallback(
    (outlet: OutletItem, openChat = false) => {
      userHasSelectedManually.current = true;
      setNearestOutlet(outlet);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_OUTLET_KEY, outlet.id);
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
    (customMessage?: string, forceAction?: "order" | "chat") => {
      const target = nearestOutlet || activeOutlets[0];
      if (target) {
        const msg = getOutletMessage(target, customMessage, forceAction);
        const url = formatWhatsAppUrl(target.phone, msg);
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [nearestOutlet, activeOutlets, getOutletMessage]
  );

  const getNearestChatUrl = useCallback(
    (customMessage?: string, forceAction?: "order" | "chat") => {
      const target = nearestOutlet || activeOutlets[0];
      const msg = getOutletMessage(target, customMessage, forceAction);
      return formatWhatsAppUrl(target?.phone, msg);
    },
    [nearestOutlet, activeOutlets, getOutletMessage]
  );

  const orderActionLabel = isWithin5km
    ? locale === "en"
      ? "Order via WhatsApp"
      : "Pesan via WhatsApp"
    : locale === "en"
    ? "Chat Outlet"
    : "Chat Outlet";

  return (
    <OutletsContext.Provider
      value={{
        outlets,
        activeOutlets,
        nearestOutlet,
        isWithin5km,
        userDistance,
        locationChecked,
        orderActionLabel,
        openNearestChat,
        getNearestChatUrl,
        selectOutlet,
        openPicker,
      }}
    >
      {children}

      {/* 1-Click Outlet Selector Dialog */}
      {isPickerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/[0.08]">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#78958F] dark:text-[#9CC8BE]" />
                  <span>{locale === "en" ? "Select Nearest Outlet" : "Pilih Outlet Terdekat"}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                  {locale === "en"
                    ? "Connect directly via WhatsApp with your preferred Laverie atelier:"
                    : "Hubungi atelier Laverie pilihan Anda langsung via WhatsApp:"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPickerOpen(false);
                  setPendingMessage(null);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Outlets list */}
            <div className="space-y-2 pt-1">
              {activeOutlets.map((outlet) => {
                const isSelected = nearestOutlet?.id === outlet.id;
                return (
                  <button
                    key={outlet.id}
                    type="button"
                    onClick={() => selectOutlet(outlet, true)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#78958F]/10 border-[#78958F] dark:bg-[#78958F]/20"
                        : "bg-gray-50 dark:bg-white/[0.04] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-transparent">
                          {outlet.tabName}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#78958F] dark:text-[#9CC8BE]">
                            • {locale === "en" ? "Selected" : "Dipilih"}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {outlet.name}
                      </div>
                      {outlet.phone && (
                        <div className="text-xs text-[#78958F] dark:text-[#9CC8BE] mt-0.5 font-mono">
                          {outlet.phone}
                        </div>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#78958F] group-hover:bg-[#78958F]/10 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </OutletsContext.Provider>
  );
}

export function useOutlets() {
  const ctx = useContext(OutletsContext);
  if (!ctx) {
    return {
      outlets: defaultOutlets,
      activeOutlets: defaultOutlets,
      nearestOutlet: defaultOutlets[0] || null,
      isWithin5km: false,
      userDistance: null,
      locationChecked: false,
      orderActionLabel: "Chat Outlet",
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
