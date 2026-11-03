"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  HelpCircle,
  MessageSquareQuote,
  ExternalLink,
  Menu,
  X,
  Clock,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "./LogoutButton";
import { AdminUser } from "@/lib/auth";

interface AdminShellProps {
  user: AdminUser;
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Service Packages",
      href: "/admin/packages",
      icon: Package,
      active: pathname.startsWith("/admin/packages"),
      count: "3 tiers",
    },
    {
      name: "FAQ Accordions",
      href: "/admin/faqs",
      icon: HelpCircle,
      active: pathname.startsWith("/admin/faqs"),
      count: "5 items",
    },
    {
      name: "Customer Reviews",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      active: pathname.startsWith("/admin/testimonials"),
      count: "3 curated",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#03070C] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0D161E]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-white/[0.08] px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Left: Mobile trigger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-[#0D161E] p-1 border border-white/10 shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/logo/laverie-logo.png"
                  alt="Laverie Laundry"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                  Laverie<span className="text-[#00C4D4]">.</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-white/[0.08] dark:text-gray-300">
                  Console
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Live Website */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.08] transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-gray-200 dark:border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00C4D4] to-[#0096A3] text-gray-950 flex items-center justify-center font-bold text-xs shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                  {user.email}
                </p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 space-y-5">
          {/* Navigation Links */}
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-3 shadow-xs">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Content & Widgets
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      item.active
                        ? "bg-[#00C4D4] text-gray-950 shadow-sm shadow-[#00C4D4]/30 font-bold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.count && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          item.active
                            ? "bg-black/15 text-gray-950"
                            : "bg-gray-100 dark:bg-white/[0.08] text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Operational Status Card */}
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Operations Status</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/[0.05]">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00C4D4]" /> Express Pickup
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">Before 10 AM</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/[0.05]">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00C4D4]" /> Same-Day Return
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">Before 10 PM</span>
              </div>
            </div>
            <div className="mt-3 pt-2 text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
              Active dispatch protocol for hotel concierge & residences.
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-[#0D161E] h-full p-5 flex flex-col z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/[0.08] mb-4">
                <span className="font-bold text-sm text-gray-900 dark:text-white">Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        item.active
                          ? "bg-[#00C4D4] text-gray-950 font-bold"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.count && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.08] text-gray-500 dark:text-gray-400">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-gray-100 dark:border-white/[0.08]">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 p-2 font-semibold hover:text-[#00C4D4]"
                >
                  <span>View Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
