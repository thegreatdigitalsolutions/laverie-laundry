"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { ProductItem } from "@/data/products";
import { saveProductsAction } from "@/app/admin/actions";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  FileSpreadsheet,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import * as XLSX from "xlsx";

interface ProductsManagerProps {
  initialProducts: ProductItem[];
}

export default function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const [savedProducts, setSavedProducts] = useState<ProductItem[]>(initialProducts);
  const [productsList, setProductsList] = useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductItem>({
    id: "",
    name: "",
    price: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Delete state
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Excel Upload Preview Modal state
  const [excelPreviewData, setExcelPreviewData] = useState<{
    fileName: string;
    products: ProductItem[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & saving
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setSavedProducts(initialProducts);
    setProductsList(initialProducts);
  }, [initialProducts]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(productsList) !== JSON.stringify(savedProducts);
  }, [productsList, savedProducts]);

  // Pagination state (10 items per page)
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productsList;
    const q = searchQuery.toLowerCase();
    return productsList.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q)
    );
  }, [productsList, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Reset to page 1 on search filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Ensure current page remains valid if items are deleted or filtered
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, startIndex]);

  // Generate next ID
  const generateNextId = () => {
    const existingIds = productsList.map((p) => p.id);
    let counter = productsList.length + 1;
    let nextId = `PROD-${String(counter).padStart(3, "0")}`;
    while (existingIds.includes(nextId)) {
      counter++;
      nextId = `PROD-${String(counter).padStart(3, "0")}`;
    }
    return nextId;
  };

  // Open modal for adding
  const handleAddNew = () => {
    setModalMode("add");
    setEditingIndex(null);
    setFormData({
      id: generateNextId(),
      name: "",
      price: "Rp ",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (index: number) => {
    setModalMode("edit");
    setEditingIndex(index);
    setFormData({ ...productsList[index] });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Save modal form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Product name is required.");
      return;
    }
    if (!formData.price.trim()) {
      setFormError("Product price is required.");
      return;
    }
    const cleanId = formData.id.trim() || generateNextId();

    // Check duplicate ID if adding or changing ID
    const duplicate = productsList.find(
      (p, idx) => p.id === cleanId && (modalMode === "add" || idx !== editingIndex)
    );
    if (duplicate) {
      setFormError(`Product ID "${cleanId}" is already used. Please choose another.`);
      return;
    }

    const newProduct: ProductItem = {
      id: cleanId,
      name: formData.name.trim(),
      price: formData.price.trim(),
    };

    if (modalMode === "add") {
      setProductsList([...productsList, newProduct]);
    } else if (editingIndex !== null) {
      const updated = [...productsList];
      updated[editingIndex] = newProduct;
      setProductsList(updated);
    }

    setIsModalOpen(false);
    setStatusMessage(null);
  };

  // Delete product
  const confirmDelete = () => {
    if (deletingIndex === null) return;
    const updated = productsList.filter((_, i) => i !== deletingIndex);
    setProductsList(updated);
    setDeletingIndex(null);
    setStatusMessage(null);
  };

  // Reset to last saved
  const handleReset = () => {
    setProductsList(savedProducts);
    setStatusMessage(null);
  };

  // Save changes to Google Sheets
  const handleSaveToSheet = async () => {
    if (!hasChanges || isSaving) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveProductsAction(productsList);
      if (res.success) {
        setSavedProducts(productsList);
        setStatusMessage({
          type: "success",
          text: `Successfully saved ${productsList.length} products to Google Sheets (sheet: products)!`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to save products to Google Sheets.",
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setStatusMessage({
        type: "error",
        text: `Failed to save products: ${msg}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Download Excel (.xlsx)
  const handleDownloadExcel = () => {
    try {
      const dataToExport = productsList.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Auto-fit column widths
      worksheet["!cols"] = [
        { wch: 16 }, // id
        { wch: 38 }, // name
        { wch: 20 }, // price
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "products");

      const today = new Date().toISOString().split("T")[0];
      XLSX.writeFile(workbook, `laverie_products_${today}.xlsx`);

      setStatusMessage({
        type: "success",
        text: `Excel file downloaded (${productsList.length} products).`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Export failed";
      setStatusMessage({
        type: "error",
        text: `Error generating Excel file: ${msg}`,
      });
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Handle Excel file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result;
        if (!buffer) return;

        const workbook = XLSX.read(buffer, { type: "array" });
        // Find sheet named 'products' (case-insensitive) or default to first sheet
        let sheetName = workbook.SheetNames.find(
          (name) => name.trim().toLowerCase() === "products"
        );
        if (!sheetName) {
          sheetName = workbook.SheetNames[0];
        }

        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
          setStatusMessage({
            type: "error",
            text: "No sheets found in the uploaded Excel file.",
          });
          return;
        }

        // Convert sheet to json
        const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, {
          defval: "",
        });

        if (rawRows.length === 0) {
          setStatusMessage({
            type: "error",
            text: "The uploaded Excel sheet contains no data rows.",
          });
          return;
        }

        const parsedProducts: ProductItem[] = [];

        rawRows.forEach((row, index) => {
          // Identify keys case-insensitively
          const keys = Object.keys(row);
          const findVal = (possibleNames: string[]) => {
            const matchedKey = keys.find((k) =>
              possibleNames.includes(k.trim().toLowerCase())
            );
            return matchedKey ? String(row[matchedKey] || "").trim() : "";
          };

          const idVal = findVal(["id", "product_id", "productid", "item_id", "sku"]);
          const nameVal = findVal(["name", "product_name", "productname", "nama", "item_name"]);
          const priceVal = findVal(["price", "harga", "rate", "cost", "unit_price"]);

          // Skip completely blank rows
          if (!idVal && !nameVal && !priceVal) return;

          parsedProducts.push({
            id: idVal || `PROD-${String(index + 1).padStart(3, "0")}`,
            name: nameVal || "Unnamed Product",
            price: priceVal || "Rp 0",
          });
        });

        if (parsedProducts.length === 0) {
          setStatusMessage({
            type: "error",
            text: "Could not identify any valid product rows. Please ensure your Excel sheet has columns: id, name, price.",
          });
          return;
        }

        setExcelPreviewData({
          fileName: file.name,
          products: parsedProducts,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Parse error";
        setStatusMessage({
          type: "error",
          text: `Failed to read Excel file: ${msg}`,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Apply imported Excel data
  const applyImport = (mode: "replace" | "append") => {
    if (!excelPreviewData) return;

    if (mode === "replace") {
      setProductsList(excelPreviewData.products);
      setStatusMessage({
        type: "success",
        text: `Replaced products with ${excelPreviewData.products.length} items from ${excelPreviewData.fileName}. Don't forget to click "Save Changes"!`,
      });
    } else {
      // Append / Merge: update existing IDs or add new ones
      const existingMap = new Map(productsList.map((p) => [p.id, p]));
      excelPreviewData.products.forEach((p) => {
        existingMap.set(p.id, p);
      });
      const merged = Array.from(existingMap.values());
      setProductsList(merged);
      setStatusMessage({
        type: "success",
        text: `Merged ${excelPreviewData.products.length} items from ${excelPreviewData.fileName}. Total products: ${merged.length}. Click "Save Changes" to sync.`,
      });
    }

    setExcelPreviewData(null);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Excel */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx, .xls, .csv"
        className="hidden"
      />

      {/* Status Message Alert */}
      {statusMessage && (
        <div
          className={`flex items-start justify-between gap-3 p-4 rounded-xl border text-sm transition-all animate-in fade-in ${
            statusMessage.type === "success"
              ? "bg-[#E0F7FA]/70 dark:bg-[#00C4D4]/10 border-[#00C4D4]/40 text-[#00838F] dark:text-[#5CE1D6]"
              : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#00C4D4]" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            )}
            <p className="font-medium">{statusMessage.text}</p>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Action & Summary Bar */}
      <div className="bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E0F7FA] dark:bg-[#152B3A] text-[#00C4D4] dark:text-[#5CE1D6] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Products CMS
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connected to Google Sheet: <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">products</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Add, Upload Excel, Download Excel */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadExcel}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gray-50 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
            title="Download current products list to an Excel (.xlsx) file"
          >
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Download Excel</span>
          </button>

          <button
            type="button"
            onClick={triggerFileInput}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gray-50 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
            title="Upload products from an Excel (.xlsx, .xls, .csv) file"
          >
            <Upload className="w-4 h-4 text-[#00C4D4] dark:text-[#5CE1D6]" />
            <span>Upload Excel</span>
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00C4D4]/20 hover:shadow-lg hover:shadow-[#00C4D4]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search & List Metrics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, product name, or price..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0D161E] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#00C4D4]"
          />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 self-end sm:self-center">
          <span>
            {filteredProducts.length > 0 ? (
              <>
                Showing <strong className="text-gray-900 dark:text-white">{startIndex + 1}–{endIndex}</strong> of{" "}
                <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> products
              </>
            ) : (
              <span>0 products</span>
            )}
          </span>
        </div>
      </div>

      {/* Products Table (3 columns: id, name, price + actions) */}
      <div className="bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 dark:bg-white/[0.02] border-b border-gray-200/80 dark:border-white/[0.06] text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              <tr>
                <th className="py-3.5 px-6 w-36">ID</th>
                <th className="py-3.5 px-6">Product Name</th>
                <th className="py-3.5 px-6 w-48">Price</th>
                <th className="py-3.5 px-6 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.06]">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <ShoppingBag className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="font-semibold">No products found</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {searchQuery ? "Try a different search query" : "Click 'Add Product' or 'Upload Excel' to add items."}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((prod) => {
                  const actualIndex = productsList.findIndex((p) => p.id === prod.id);
                  return (
                    <tr
                      key={prod.id}
                      className="hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* ID Column */}
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-[#5CE1D6] border border-gray-200/80 dark:border-white/10">
                          {prod.id}
                        </span>
                      </td>

                      {/* Name Column */}
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        {prod.name}
                      </td>

                      {/* Price Column */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {prod.price}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(actualIndex)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="Edit product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingIndex(actualIndex)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (10 per page) */}
        {filteredProducts.length > 0 && (
          <div className="border-t border-gray-200/80 dark:border-white/[0.06] px-6 py-4 bg-gray-50/50 dark:bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Page <strong className="text-gray-900 dark:text-white">{currentPage}</strong> of{" "}
              <strong className="text-gray-900 dark:text-white">{totalPages}</strong> ({filteredProducts.length} items total)
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Previous page"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
                    // Window logic for large number of pages
                    if (
                      totalPages > 7 &&
                      pNum !== 1 &&
                      pNum !== totalPages &&
                      Math.abs(pNum - currentPage) > 1
                    ) {
                      if (pNum === 2 || pNum === totalPages - 1) {
                        return (
                          <span key={pNum} className="px-1 text-xs text-gray-400">
                            …
                          </span>
                        );
                      }
                      return null;
                    }

                    const isCurrent = pNum === currentPage;
                    return (
                      <button
                        key={pNum}
                        type="button"
                        onClick={() => setCurrentPage(pNum)}
                        className={`min-w-8 h-8 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-[#00C4D4] text-gray-950 shadow-2xs"
                            : "border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Next page"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating / Sticky Unsaved Changes Bar */}
      {hasChanges && (
        <div className="sticky bottom-6 z-40 bg-gray-950 dark:bg-[#13222E] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C4D4] animate-pulse" />
            <span>You have unsaved changes ({productsList.length} products).</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToSheet}
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00C4D4]/30 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-600 dark:text-red-400">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Product ID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. PROD-001"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-sm text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#00C4D4] font-mono"
                  required
                />
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Unique identifier stored in the Google Sheet ID column.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Premium Laundry Bag"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-sm text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#00C4D4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. Rp 75.000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] text-sm text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#00C4D4]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00C4D4]/20 cursor-pointer"
                >
                  {modalMode === "add" ? "Add Product" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Excel Upload Preview Modal */}
      {excelPreviewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 text-[#00C4D4]">
                <FileSpreadsheet className="w-5 h-5 shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    Import Excel Data
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    File: <strong className="text-gray-700 dark:text-gray-200">{excelPreviewData.fileName}</strong> ({excelPreviewData.products.length} products found)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setExcelPreviewData(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview of first 5 rows */}
            <div className="border border-gray-200/80 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gray-50 dark:bg-white/[0.04] px-3.5 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 border-b border-gray-200/80 dark:border-white/10">
                Preview (First {Math.min(5, excelPreviewData.products.length)} of {excelPreviewData.products.length} items)
              </div>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100/60 dark:bg-white/[0.02] text-gray-500 dark:text-gray-400 font-semibold">
                    <tr>
                      <th className="py-2 px-3">ID</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.06]">
                    {excelPreviewData.products.slice(0, 5).map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                        <td className="py-2 px-3 font-mono font-medium text-gray-800 dark:text-[#5CE1D6]">
                          {p.id}
                        </td>
                        <td className="py-2 px-3 text-gray-900 dark:text-white">
                          {p.name}
                        </td>
                        <td className="py-2 px-3 font-semibold text-gray-800 dark:text-gray-200">
                          {p.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              How would you like to apply this Excel data to your catalog?
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setExcelPreviewData(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => applyImport("append")}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-[#00C4D4]/40 hover:bg-[#00C4D4]/10 text-[#00838F] dark:text-[#5CE1D6] font-semibold text-xs transition-colors cursor-pointer"
                title="Keep existing products and add or update rows from this Excel file"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Merge / Append</span>
              </button>
              <button
                type="button"
                onClick={() => applyImport("replace")}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#00C4D4] hover:bg-[#00B4C3] text-gray-950 font-bold text-xs transition-all shadow-md shadow-[#00C4D4]/20 cursor-pointer"
                title="Replace all existing products with the rows in this Excel file"
              >
                <span>Replace All</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deletingIndex !== null}
        title="Delete Product"
        message={
          deletingIndex !== null && productsList[deletingIndex]
            ? `Are you sure you want to delete "${productsList[deletingIndex].name}" (${productsList[deletingIndex].id})? You can cancel or reset before saving changes.`
            : "Are you sure you want to delete this product?"
        }
        confirmText="Delete Product"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingIndex(null)}
      />
    </div>
  );
}

