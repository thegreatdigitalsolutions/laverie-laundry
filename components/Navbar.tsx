"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

// Clean WhatsApp outlined icon matching reference design
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function Navbar() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { t, locale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatMessage = t("common.chatPrompt");

  // Track scroll position for transparent navbar at top & active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Determine active section based on current scroll position
      const sections = ["hero", "about", "services", "packages", "faq", "outlets"];
      const scrollOffset = scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollOffset) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Requested navbar list with dynamic translation
  const navLinks = [
    { name: t("nav.home") || (locale === "en" ? "Home" : "Beranda"), href: "#hero", id: "hero" },
    { name: t("nav.philosophy") || (locale === "en" ? "Our Philosophy" : "Filosofi Kami"), href: "#about", id: "about" },
    { name: t("nav.services") || (locale === "en" ? "Services" : "Layanan"), href: "#services", id: "services" },
    { name: locale === "en" ? "Price List" : "Pricelist", href: "#packages", id: "packages" },
    { name: t("nav.faq") || "FAQ", href: "#faq", id: "faq" },
    { name: locale === "en" ? "Outlets" : "Outlet", href: "#outlets", id: "outlets" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("laverie-nav-scroll"));
      const targetId = href.replace("#", "");

      if (targetId === "hero") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setActiveSection("hero");
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          setActiveSection(targetId);
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3.5 sm:py-4 transition-colors duration-300 font-body font-[family-name:var(--font-body)] ${
        isScrolled || mobileMenuOpen
          ? "bg-white/95 dark:bg-[#03070C]/90 backdrop-blur-md shadow-sm"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={(e) => handleSmoothScroll(e, "#hero", "hero")}
          className="flex items-center group cursor-pointer"
          aria-label="Laverie Premium Laundry"
        >
          <div className="relative h-9 sm:h-10 w-[186px] sm:w-[207px] transition-transform duration-200 group-hover:scale-[1.02]">
            {/* Light mode: dark text logo (both on top and when scrolled) */}
            <Image
              src="/logo/laverie-logo-light.png"
              alt="Laverie Premium Laundry"
              fill
              sizes="(max-width: 640px) 186px, 207px"
              className="object-contain object-left dark:hidden"
              priority
            />
            {/* Dark mode: crisp white text logo */}
            <Image
              src="/logo/laverie-logo-dark.png"
              alt="Laverie Premium Laundry"
              fill
              sizes="(max-width: 640px) 186px, 207px"
              className="object-contain object-left hidden dark:block"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href, link.id)}
                className={`relative py-1.5 text-sm transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-gray-950 dark:text-white font-bold"
                    : "text-gray-900 dark:text-gray-200 hover:text-black dark:hover:text-white font-semibold"
                }`}
              >
                {link.name}

                {/* Cyan active indicator underline from reference image */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2.5px] bg-[#78958F] dark:bg-[#9CC8BE] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Side: Controls & Outlined Glassy WhatsApp Pill */}
        <div className="hidden sm:flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />

          {/* CTA: Bordered + Subtle Glassy Pill */}
          <a
            href={getNearestChatUrl(chatMessage)}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(chatMessage);
            }}
            className="h-9 inline-flex items-center gap-2 px-4.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border border-gray-400/70 hover:border-gray-600 dark:border-white/30 dark:hover:border-white/50 bg-white/60 hover:bg-white/90 dark:bg-white/[0.08] dark:hover:bg-white/[0.18] backdrop-blur-md text-gray-950 dark:text-white shadow-xs hover:shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 text-gray-950 dark:text-white" />
            <span>{t("nav.bookWhatsapp") || (locale === "en" ? "Order via WhatsApp" : "Pesan via WhatsApp")}</span>
          </a>
        </div>

        {/* Mobile Header Bar: WhatsApp Icon (no text, no background) + Menu Toggle */}
        <div className="flex md:hidden items-center gap-1">
          <a
            href={getNearestChatUrl(chatMessage)}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(chatMessage);
            }}
            className="p-2 text-gray-950 dark:text-white hover:text-[#78958F] dark:hover:text-[#9CC8BE] active:scale-90 transition-transform cursor-pointer"
            aria-label="Order via WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-gray-950 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-5 pt-3 pb-6 bg-white/95 dark:bg-[#070D12]/95 backdrop-blur-xl shadow-xl animate-menu-slide-down">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href, link.id)}
                  className={`px-3 py-2.5 text-base font-semibold rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "text-[#607F78] dark:text-[#9CC8BE] bg-[#78958F]/10 font-bold"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#78958F] dark:bg-[#9CC8BE]" />
                  )}
                </a>
              );
            })}

            {/* Menu Preferences: Language Toggle & Dark/Light Mode */}
            <div className="pt-4 mt-3 border-t border-gray-200/80 dark:border-white/10 flex items-center justify-between px-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {locale === "en" ? "Preferences" : "Pengaturan"}
              </span>
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
