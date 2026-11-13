"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductItem, defaultProducts } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { useOutlets } from "@/context/OutletsContext";
import SectionHeader from "@/components/SectionHeader";
import {
  formatProductPrice,
  getProductCategory,
  getLocalizedProductName,
  getLocalizedProductCategory,
  printBrochure,
} from "@/lib/productsHelper";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface PackagesProps {
  products?: ProductItem[];
  items?: any[];
}

export default function Packages({ products }: PackagesProps) {
  const { locale } = useLanguage();
  const { openNearestChat, getNearestChatUrl, isWithin5km } = useOutlets();
  const isEn = locale === "en";

  const allProducts = useMemo(() => {
    return products && products.length > 0 ? products : defaultProducts;
  }, [products]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile paginates by 12 (6 rows x 2 cols), Desktop/PC paginates by 20 (5 rows x 4 cols)
  const itemsPerPage = isMobile ? 12 : 20;

  const categories = [
    { id: "all", label_id: "Semua Kategori", label_en: "All Categories" },
    { id: "Atasan & Luaran", label_id: "Atasan & Luaran", label_en: "Tops & Outerwear" },
    { id: "Bawahan & Gaun", label_id: "Bawahan & Gaun", label_en: "Bottoms & Dresses" },
    { id: "Bedding & Home Linen", label_id: "Bedding & Linen", label_en: "Bedding & Linen" },
    { id: "Sepatu, Tas & Koper", label_id: "Sepatu & Tas", label_en: "Shoes & Bags" },
    { id: "Aksesoris & Perlengkapan", label_id: "Aksesoris & Lainnya", label_en: "Accessories & More" },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      const cat = item.category || getProductCategory(item.name).id;
      const matchesCategory =
        selectedCategory === "all" || cat === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const localizedName = getLocalizedProductName(item, isEn).toLowerCase();
      const rawName = item.name.toLowerCase();
      const matchesSearch =
        !query ||
        rawName.includes(query) ||
        localizedName.includes(query) ||
        cat.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery, isEn]);

  // Responsive Pagination (12 on mobile, 10 on desktop)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, startIndex, itemsPerPage]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleOrderProduct = (p: ProductItem) => {
    const formattedPrice = formatProductPrice(p.price);
    const localizedName = getLocalizedProductName(p, isEn);
    const baseMsg = isEn
      ? `Hello Laverie! I would like to inquire/order laundry care for: ${localizedName} (${formattedPrice}).`
      : `Halo Laverie! Saya ingin konsultasi dan memesan layanan laundry untuk: ${localizedName} (${formattedPrice}).`;

    const msg = isWithin5km
      ? `${baseMsg}${
          isEn
            ? " (Location within 5 km free pickup radius)."
            : " (Lokasi dalam radius < 5 km - Gratis Antar Jemput)."
        }`
      : baseMsg;

    if (openNearestChat) {
      openNearestChat(msg, isWithin5km ? "order" : "chat");
    } else {
      window.open(
        getNearestChatUrl(msg, isWithin5km ? "order" : "chat"),
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleDownloadBrochure = () => {
    printBrochure(allProducts, isEn);
  };

  return (
    <section
      id="packages"
      className="py-24 sm:py-32 bg-[#E9E6DC] dark:bg-[#101C1D] relative isolate overflow-hidden transition-colors duration-500"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.18] dark:opacity-[0.10]"
        style={{ backgroundImage: "url('/images/packages/laverie-packaging.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#E9E6DC]/92 via-[#E9E6DC]/96 to-[#E9E6DC]/92 dark:from-[#101C1D]/92 dark:via-[#101C1D]/96 dark:to-[#101C1D]/92"
      />

      {/* Ambient background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(120,149,143,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Standard consistent template */}
        <SectionHeader
          title={isEn ? "Price List" : "Daftar Harga"}
          quote={
            isEn
              ? "Transparent, considered pricing for every piece in your wardrobe and home."
              : "Harga transparan dan terjangkau untuk setiap busana, linen, dan perlengkapan Anda."
          }
          p1={
            isEn
              ? "From everyday essentials and delicate silk blouses to king-size bedlinens, designer footwear, and strollers — every item receives individual attention."
              : "Dari kemeja harian, batik tulis, gaun sutra, hingga sprei king size, sepatu, dan stroller — setiap helai dirawat dengan standar higienis ozon 1 mesin 1 pelanggan."
          }
          p2={
            isEn
              ? "Enjoy complimentary Free Doorstep Pickup & Delivery within our 5 km service perimeter across PIK 1, PIK 2, Muara Karang, Pluit, Greenbay, and Pantai Mutiara."
              : "Nikmati kemudahan fasilitas GRATIS Antar Jemput langsung ke lobi atau pintu Anda dalam radius 5 km di area PIK dan Pluit."
          }
        />

        {/* Action Bar: Search Input & Download Brochure Button */}
        <div data-aos="fade-up" className="mt-10 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75847F] dark:text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={
                isEn
                  ? "Search garment (e.g. Batik, Bed Cover, Blazer, Shoes)..."
                  : "Cari pakaian (contoh: Batik, Bed Cover, Blazer, Sepatu)..."
              }
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/85 dark:bg-[#162529]/80 border border-[#D5D3CA] dark:border-white/10 text-sm text-[#24312D] dark:text-white placeholder-[#87958F] dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#78958F] dark:focus:ring-[#8EE0D2] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#75847F] hover:text-[#24312D] dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Download Brochure Button */}
          <div className="flex items-center gap-3">
            <a
              href="/laverie-price-list-brochure.png"
              download="Laverie-Price-List-Brochure.png"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-[#607F78] hover:bg-[#4D6962] text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{isEn ? "Download Brochure" : "Unduh Brosur"}</span>
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div data-aos="fade-up" data-aos-delay="50" className="mb-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#607F78] text-white shadow-sm dark:bg-[#607F78] dark:text-white"
                    : "bg-white/70 hover:bg-white text-[#52605B] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-slate-300 border border-[#DCDAD0] dark:border-white/10"
                }`}
              >
                {isEn ? cat.label_en : cat.label_id}
              </button>
            );
          })}
        </div>

        {/* Results Counter: Clean, no ozone subtitle */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#6B7974] dark:text-slate-400">
          <span>
            {isEn
              ? `Showing ${filteredProducts.length > 0 ? startIndex + 1 : 0}–${endIndex} of ${filteredProducts.length} items`
              : `Menampilkan ${filteredProducts.length > 0 ? startIndex + 1 : 0}–${endIndex} dari ${filteredProducts.length} item`}
          </span>
        </div>

        {/* Price List Items Grid (Compact 2-col mobile, 4-5 col PC) */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 items-stretch">
            {paginatedProducts.map((p, idx) => {
              const formattedPrice = formatProductPrice(p.price);
              const localizedCategory = getLocalizedProductCategory(p, isEn);
              const localizedName = getLocalizedProductName(p, isEn);

              return (
                <div
                  key={p.id || idx}
                  className="group relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl bg-white/80 dark:bg-[#122125]/85 border border-[#DDD9CE] dark:border-white/10 shadow-2xs hover:shadow-sm hover:border-[#607F78] dark:hover:border-[#607F78]/60 transition-all duration-300"
                >
                  <div className="min-w-0">
                    {/* Category subtle tag */}
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#607F78] dark:text-[#8EE0D2] mb-0.5 truncate opacity-90">
                      {localizedCategory}
                    </span>

                    {/* Item Name (Fully Localized, Compact) */}
                    <h3
                      className="font-subheadline font-semibold text-xs sm:text-[14px] text-[#23312E] dark:text-white leading-tight truncate"
                      title={localizedName}
                    >
                      {localizedName}
                    </h3>
                  </div>

                  {/* Compact Price & Fast WhatsApp Order CTA */}
                  <div className="mt-2.5 pt-2 border-t border-[#EAE7DC] dark:border-white/10 flex items-center justify-between gap-1.5">
                    <span className="font-headline font-bold text-xs sm:text-sm text-[#1A2623] dark:text-[#8EE0D2] truncate">
                      {formattedPrice}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOrderProduct(p)}
                      className="inline-flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-[#607F78] hover:bg-[#4D6962] text-white text-[10px] sm:text-[11px] font-semibold tracking-wide transition-all duration-300 shadow-2xs cursor-pointer active:scale-95 shrink-0"
                      title={isEn ? `Order ${localizedName}` : `Pesan ${localizedName}`}
                    >
                      <WhatsAppIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current shrink-0" />
                      <span>{isEn ? "Order" : "Pesan"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty search state */
          <div className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-white/[0.02] border border-[#DDD9CE] dark:border-white/10">
            <p className="text-base text-[#52605B] dark:text-slate-300 font-medium">
              {isEn
                ? `No garment found matching "${searchQuery}".`
                : `Tidak ditemukan pakaian yang cocok dengan pencarian "${searchQuery}".`}
            </p>
            <p className="mt-1 text-xs text-[#788882] dark:text-slate-400">
              {isEn
                ? "Looking for a custom fabric or specialized item? Chat our concierge via WhatsApp."
                : "Mencari bahan khusus atau perlengkapan lainnya? Hubungi tim concierge kami via WhatsApp."}
            </p>
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#607F78] hover:bg-[#4D6962] text-white text-xs font-semibold cursor-pointer"
            >
              <span>{isEn ? "Reset Search" : "Reset Pencarian"}</span>
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div data-aos="fade-up" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => Math.max(1, prev - 1));
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-white/5 border border-[#DCDAD0] dark:border-white/10 text-[#4A5752] dark:text-slate-300 hover:bg-[#607F78] hover:text-white dark:hover:bg-[#607F78] dark:hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{isEn ? "Prev" : "Sebelumnya"}</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`min-w-9 h-9 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#607F78] text-white shadow-sm dark:bg-[#607F78] dark:text-white"
                      : "bg-white/80 dark:bg-white/5 border border-[#DCDAD0] dark:border-white/10 text-[#4A5752] dark:text-slate-300 hover:bg-white dark:hover:bg-white/10"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-white/5 border border-[#DCDAD0] dark:border-white/10 text-[#4A5752] dark:text-slate-300 hover:bg-[#78958F] hover:text-white dark:hover:bg-[#8EE0D2] dark:hover:text-[#0A171D] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <span>{isEn ? "Next" : "Selanjutnya"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
