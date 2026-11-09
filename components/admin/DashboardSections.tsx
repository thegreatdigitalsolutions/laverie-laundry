"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  MapPin,
  Star,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  ChevronsUpDown,
} from "lucide-react";
import { PackageItem } from "@/data/packages";
import { ProductItem } from "@/data/products";
import { OutletItem } from "@/data/outlets";
import { TestimonialItem } from "@/data/testimonials";
import { FAQItem } from "@/data/faq";
import PackagesManager from "./PackagesManager";
import ProductsManager from "./ProductsManager";
import OutletsManager from "./OutletsManager";
import TestimonialsManager from "./TestimonialsManager";
import FaqsManager from "./FaqsManager";

interface DashboardSectionsProps {
  packages: PackageItem[];
  products: ProductItem[];
  outlets: OutletItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
}

type SectionKey = "packages" | "products" | "outlets" | "testimonials" | "faqs";

export default function DashboardSections({
  packages,
  products,
  outlets,
  testimonials,
  faqs,
}: DashboardSectionsProps) {
  // All sections default to collapsed (false)
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    packages: false,
    products: false,
    outlets: false,
    testimonials: false,
    faqs: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allOpen = Object.values(openSections).every(Boolean);

  const toggleAll = () => {
    const nextState = !allOpen;
    setOpenSections({
      packages: nextState,
      products: nextState,
      outlets: nextState,
      testimonials: nextState,
      faqs: nextState,
    });
  };

  const sections = [
    {
      key: "packages" as SectionKey,
      title: "Service Packages",
      description: "Manage laundry packages, pricing, turnaround times, and featured items",
      badge: `${packages.length} Packages`,
      icon: Package,
      viewAllHref: "/admin/packages",
      component: <PackagesManager initialPackages={packages} />,
    },
    {
      key: "products" as SectionKey,
      title: "Products Catalog",
      description: "Manage products, accessories, Excel import/export, and pricing",
      badge: `${products.length} Products`,
      icon: ShoppingBag,
      viewAllHref: "/admin/products",
      component: <ProductsManager initialProducts={products} />,
    },
    {
      key: "outlets" as SectionKey,
      title: "Outlets & Locations",
      description: "Manage branch locations, Google Maps embeds, hours, and dispatch schedules",
      badge: `${outlets.length} Outlets`,
      icon: MapPin,
      viewAllHref: "/admin/outlets",
      component: <OutletsManager initialOutlets={outlets} />,
    },
    {
      key: "testimonials" as SectionKey,
      title: "Customer Reviews",
      description: "Manage verified customer testimonials, ratings, and guest quotes",
      badge: `${testimonials.length} Reviews`,
      icon: Star,
      viewAllHref: "/admin/testimonials",
      component: <TestimonialsManager initialTestimonials={testimonials} />,
    },
    {
      key: "faqs" as SectionKey,
      title: "Frequently Asked Questions",
      description: "Manage question and answer accordions, categories, and bilingual text",
      badge: `${faqs.length} FAQs`,
      icon: HelpCircle,
      viewAllHref: "/admin/faqs",
      component: <FaqsManager initialFaqs={faqs} />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Controls Bar */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          CMS Content Modules
        </h2>
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#00C4D4]/40 dark:hover:border-[#5CE1D6]/40 bg-white dark:bg-[#0D161E] transition-all cursor-pointer shadow-2xs"
        >
          <ChevronsUpDown className="w-3.5 h-3.5" />
          <span>{allOpen ? "Collapse All" : "Expand All"}</span>
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const isOpen = openSections[sec.key];
          const Icon = sec.icon;

          return (
            <div
              key={sec.key}
              className={`bg-white dark:bg-[#0D161E] border rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "border-gray-300 dark:border-white/[0.16] shadow-md"
                  : "border-gray-200/80 dark:border-white/[0.08] shadow-xs hover:border-gray-300 dark:hover:border-white/[0.12]"
              }`}
            >
              {/* Header Bar (Click to toggle) */}
              <div
                onClick={() => toggleSection(sec.key)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 dark:hover:bg-white/[0.02] transition-colors select-none group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105 ${
                      isOpen
                        ? "bg-[#00C4D4] text-gray-950"
                        : "bg-[#E0F7FA] dark:bg-[#152B3A] text-[#00C4D4] dark:text-[#5CE1D6]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                        {sec.title}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-white/10">
                        {sec.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xl">
                      {sec.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href={sec.viewAllHref}
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#00C4D4] dark:hover:text-[#5CE1D6] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#00C4D4]/40 dark:hover:border-[#5CE1D6]/40 bg-gray-50/60 dark:bg-white/[0.02] transition-colors"
                    title={`Open full ${sec.title} page`}
                  >
                    <span>Full Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 bg-gray-100/80 dark:bg-white/[0.04] transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-[#00C4D4]/15 text-[#00838F] dark:text-[#5CE1D6]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="border-t border-gray-100 dark:border-white/[0.06] p-5 sm:p-6 pt-6 animate-in slide-in-from-top-2 fade-in duration-200">
                  {sec.component}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

