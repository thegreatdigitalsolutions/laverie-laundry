"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "./LogoutButton";
import { AdminUser } from "@/lib/auth";

interface AdminShellProps {
  user: AdminUser;
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Packages", href: "/admin/packages" },
    { name: "Products", href: "/admin/products" },
    { name: "Outlets", href: "/admin/outlets" },
    { name: "FAQs", href: "/admin/faqs" },
    { name: "Reviews", href: "/admin/testimonials" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#03070C] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#03070C]/90 backdrop-blur-md py-4 border-b border-gray-100 dark:border-white/[0.06] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name - Clicks directly to live site */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center group"
            title="View Website"
          >
            <div className="relative h-9 w-[186px] transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/logo/laverie-logo-light.png"
                alt="Laverie Premium Laundry"
                fill
                sizes="186px"
                className="object-contain object-left dark:hidden"
                priority
              />
              <Image
                src="/logo/laverie-logo-dark.png"
                alt="Laverie Premium Laundry"
                fill
                sizes="186px"
                className="object-contain object-left hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#00C4D4] dark:text-[#5CE1D6] font-semibold after:w-full"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] after:w-0"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#00C4D4] dark:after:bg-[#5CE1D6] hover:after:w-full after:transition-all after:duration-200`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
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
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-[#00C4D4] dark:text-[#5CE1D6] bg-gray-50 dark:bg-white/5 font-semibold"
                        : "text-gray-700 dark:text-gray-200 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-end px-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {children}
      </main>
    </div>
  );
}
