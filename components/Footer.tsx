"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              Don’t waste your luggage on yesterday. Professional same-day hotel express and bespoke fabric care, crafted for seamless living and effortless travel.
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
                href="https://wa.me/?text=Hello%20Laverie%20Laundry!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00C4D4] hover:text-white text-gray-300 flex items-center justify-center transition-colors border border-white/10"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-[#00C4D4] transition-colors">About Laverie</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#00C4D4] transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C4D4] transition-colors">Core Services</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#00C4D4] transition-colors">Laundry Packages</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00C4D4] transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Location & Operating Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Contact & Hours
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#00C4D4] mt-0.5 shrink-0" />
                <div>
                  <span className="text-white block font-medium">Daily Operations</span>
                  <span className="text-xs text-gray-400">07:30 AM - 21:00 PM WITA</span>
                  <span className="text-xs text-[#00C4D4] block mt-0.5">Express Cutoff: 10:00 AM for Same-Day</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#00C4D4] mt-0.5 shrink-0" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/aAEsvnwHZAUsbqmq9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white block font-medium hover:text-[#00C4D4] transition-colors"
                  >
                    Laverie PIK Outlet ↗
                  </a>
                  <span className="text-xs text-gray-400">Pantai Indah Kapuk, Jakarta Utara. Complimentary hotel lobby & doorstep pickup.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
