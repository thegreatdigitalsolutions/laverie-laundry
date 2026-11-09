"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useOutlets } from "@/context/OutletsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { openNearestChat, getNearestChatUrl } = useOutlets();
  const { t, locale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatMessage = t("common.chatPrompt");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.packages"), href: "#packages" },
    { name: t("nav.faq"), href: "#faq" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 dark:bg-[#03070C]/90 backdrop-blur-md py-4 border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300 ${
        isScrolled ? "shadow-sm dark:shadow-black/60" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center group" aria-label="Laverie Premium Laundry">
          <div className="relative h-9 sm:h-10 w-[186px] sm:w-[207px] transition-transform duration-200 group-hover:scale-[1.02]">
            {/* Light mode: dark text version */}
            <Image
              src="/logo/laverie-logo-light.png"
              alt="Laverie Premium Laundry"
              fill
              sizes="(max-width: 640px) 186px, 207px"
              className="object-contain object-left dark:hidden"
              priority
            />
            {/* Dark mode: white text version */}
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00C4D4] dark:after:bg-[#5CE1D6] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Action, Language Selection & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />

          <a
            href={getNearestChatUrl(chatMessage)}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(chatMessage);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm transition-all duration-200 shadow-sm shadow-[#00C4D4]/20 hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
            <span>{t("nav.bookWhatsapp")}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle, Language Toggle & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle variant="compact" />
          <ThemeToggle />

          <a
            href={getNearestChatUrl(chatMessage)}
            onClick={(e) => {
              e.preventDefault();
              openNearestChat(chatMessage);
            }}
            className="p-2 rounded-full bg-[#00C4D4] text-gray-950 shadow-sm cursor-pointer"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-white dark:bg-[#03070C] border-b border-gray-200 dark:border-white/[0.08] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
                <a
                  href={getNearestChatUrl(chatMessage)}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    openNearestChat(chatMessage);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-sm shadow-md shadow-[#00C4D4]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-gray-950" />
                  <span>{t("nav.bookWhatsapp")}</span>
                </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
