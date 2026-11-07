"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PackageItem } from "@/data/packages";
import { savePackagesAction } from "@/app/admin/actions";
import {
  Package,
  CheckCircle2,
  Edit3,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

interface PackagesManagerProps {
  initialPackages: PackageItem[];
}

export default function PackagesManager({ initialPackages }: PackagesManagerProps) {
  const [savedPackages, setSavedPackages] = useState<PackageItem[]>(initialPackages);
  const [packagesList, setPackagesList] = useState<PackageItem[]>(initialPackages);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PackageItem | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setSavedPackages(initialPackages);
    setPackagesList(initialPackages);
  }, [initialPackages]);

  const currentList = useMemo(() => {
    if (editingIndex !== null && editForm !== null) {
      const updated = [...packagesList];
      updated[editingIndex] = editForm;
      return updated;
    }
    return packagesList;
  }, [packagesList, editingIndex, editForm]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(currentList) !== JSON.stringify(savedPackages);
  }, [currentList, savedPackages]);

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...packagesList[index], features: [...packagesList[index].features] });
    setStatusMessage(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const saveCurrentEdit = () => {
    if (!editForm || editingIndex === null) return;
    const updated = [...packagesList];
    updated[editingIndex] = editForm;
    setPackagesList(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleAddNew = () => {
    const newPkg: PackageItem = {
      id: `pkg-${Date.now()}`,
      name: "New Custom Service",
      badge: "NEW",
      price: "Rp 20.000",
      unit: "/ KG",
      turnaround: "24 Hours",
      description: "High quality laundry care tailored to your garments.",
      features: ["Gentle machine wash", "Steam press", "Eco packaging"],
      popular: false,
      whatsappMessage: "Hello Laverie! I would like to book this service.",
    };
    setPackagesList([...packagesList, newPkg]);
    setEditingIndex(packagesList.length);
    setEditForm(newPkg);
  };

  const confirmDelete = () => {
    if (deletingIndex === null) return;
    const updated = packagesList.filter((_, i) => i !== deletingIndex);
    setPackagesList(updated);
    if (editingIndex === deletingIndex) {
      cancelEdit();
    }
    setDeletingIndex(null);
  };

  const handleReset = () => {
    setPackagesList(savedPackages);
    setEditingIndex(null);
    setEditForm(null);
    setStatusMessage(null);
  };

  const handleSave = async () => {
    if (!hasChanges || isSaving) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const listToSave = currentList;
      const res = await savePackagesAction(listToSave);
      if (res.success) {
        setPackagesList(listToSave);
        setSavedPackages(listToSave);
        setEditingIndex(null);
        setEditForm(null);
        setStatusMessage({
          type: "success",
          text: "Packages successfully saved!",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to save packages.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00C4D4]" />
            <span>Packages ({packagesList.length})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.08] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>

          {hasChanges && (
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 border border-gray-200 dark:border-white/[0.08] hover:border-red-200 dark:hover:border-red-900/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Reset all changes back to last saved version"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              !hasChanges
                ? "bg-gray-200/80 dark:bg-white/[0.06] text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                : isSaving
                ? "text-gray-950 bg-[#00C4D4] opacity-70 cursor-not-allowed shadow-none"
                : "text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] active:scale-[0.99] shadow-md shadow-[#00C4D4]/20 cursor-pointer"
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-gray-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Feedback Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 text-xs font-medium border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60"
              : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-900/60"
          }`}
        >
          {statusMessage.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 leading-relaxed">{statusMessage.text}</div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packagesList.map((pkg, idx) => (
          <div
            key={pkg.id}
            className={`bg-white dark:bg-[#0D161E] rounded-3xl p-6 border transition-all flex flex-col justify-between ${
              pkg.popular
                ? "border-[#00C4D4] ring-1 ring-[#00C4D4]/30 shadow-md shadow-[#00C4D4]/10"
                : "border-gray-200/80 dark:border-white/[0.08] shadow-xs"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-white/[0.08] dark:text-gray-300">
                  {pkg.badge || "Standard Tier"}
                </span>
                {pkg.popular && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00C4D4] text-gray-950">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {pkg.name}
              </h3>

              <div className="mt-2 mb-4 flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {pkg.price}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {pkg.unit}
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {pkg.turnaround}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                {pkg.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                  Features ({pkg.features.length})
                </span>
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4D4] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center gap-2">
              <button
                type="button"
                onClick={() => startEdit(idx)}
                className="flex-1 h-10 px-4 rounded-xl bg-gray-100 dark:bg-[#13222E] hover:bg-gray-200 dark:hover:bg-[#182C3D] text-xs font-semibold text-gray-800 dark:text-gray-200 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setDeletingIndex(idx)}
                className="h-10 w-10 flex items-center justify-center rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                title="Delete Package"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Package Dialog Modal */}
      {editingIndex !== null && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/[0.08]">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Edit Package
              </h3>
              <button
                type="button"
                onClick={cancelEdit}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Package Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={editForm.unit}
                  onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Turnaround
                </label>
                <input
                  type="text"
                  value={editForm.turnaround}
                  onChange={(e) => setEditForm({ ...editForm, turnaround: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Badge
                </label>
                <input
                  type="text"
                  value={editForm.badge || ""}
                  onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                  placeholder="e.g. MOST POPULAR"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`popular-${editForm.id}`}
                checked={editForm.popular || false}
                onChange={(e) => setEditForm({ ...editForm, popular: e.target.checked })}
                className="rounded border-gray-300 text-[#00C4D4] focus:ring-[#00C4D4]"
              />
              <label htmlFor={`popular-${editForm.id}`} className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Featured Card
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Features (one per line)
              </label>
              <textarea
                rows={3}
                value={editForm.features.join("\n")}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    features: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                  })
                }
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                WhatsApp Message Template
              </label>
              <input
                type="text"
                value={editForm.whatsappMessage}
                onChange={(e) => setEditForm({ ...editForm, whatsappMessage: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={cancelEdit}
                className="h-10 px-4 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.08] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCurrentEdit}
                className="h-10 px-5 rounded-xl text-xs font-bold text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deletingIndex !== null}
        title="Delete Package"
        message="Are you sure you want to delete this package? Remember to click Save to apply changes."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingIndex(null)}
      />
    </div>
  );
}
