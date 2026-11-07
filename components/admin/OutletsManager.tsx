"use client";

import React, { useState } from "react";
import { OutletItem } from "@/data/outlets";
import { saveOutletsAction } from "@/app/admin/actions";
import {
  MapPin,
  Clock,
  Phone,
  Truck,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  AlertCircle,
  X,
  ExternalLink,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

interface OutletsManagerProps {
  initialOutlets: OutletItem[];
}

export default function OutletsManager({ initialOutlets }: OutletsManagerProps) {
  const [outletsList, setOutletsList] = useState<OutletItem[]>(initialOutlets);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<OutletItem | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...outletsList[index] });
    setStatusMessage(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const saveCurrentEdit = () => {
    if (!editForm || editingIndex === null) return;
    const updated = [...outletsList];
    updated[editingIndex] = editForm;
    setOutletsList(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleAddNew = () => {
    const newOutlet: OutletItem = {
      id: `outlet-${Date.now()}`,
      tabName: "New Location",
      name: "Laverie Outlet",
      phone: "+62 812-3456-7890",
      description: "Express laundry care and concierge handoff for boutique hotels and villas.",
      address: "Street Address, City, Province",
      openingHours: "07:30 AM – 21:00 PM Daily",
      dispatch: "Coverage for local hotels and residences",
      mapsUrl: "https://maps.google.com",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
      whatsappMessage: "Hello Laverie! I would like to inquire about laundry pickup.",
      status: "Active",
    };
    setOutletsList([...outletsList, newOutlet]);
    setEditingIndex(outletsList.length);
    setEditForm(newOutlet);
  };

  const confirmDelete = () => {
    if (deletingIndex === null) return;
    const updated = outletsList.filter((_, i) => i !== deletingIndex);
    setOutletsList(updated);
    if (editingIndex === deletingIndex) {
      cancelEdit();
    }
    setDeletingIndex(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveOutletsAction(outletsList);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: "Outlets successfully saved!",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to save outlets.",
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
            <MapPin className="w-4 h-4 text-[#00C4D4]" />
            <span>Outlets ({outletsList.length})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.08] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Outlet</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] active:scale-[0.99] disabled:opacity-60 shadow-md shadow-[#00C4D4]/20 transition-all cursor-pointer"
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

      {/* Outlets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outletsList.map((outlet, idx) => (
          <div
            key={outlet.id}
            className="bg-white dark:bg-[#0D161E] rounded-3xl p-6 border border-gray-200/80 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-white/[0.08] dark:text-gray-300">
                  {outlet.tabName}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    (outlet.status || "Active") === "Active"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                      : "bg-gray-100 text-gray-600 dark:bg-white/[0.08] dark:text-gray-400 border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {(outlet.status || "Active") === "Active" ? "Active" : "Inactive"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {outlet.name}
              </h3>
              {outlet.phone && (
                <p className="text-xs font-semibold text-[#00C4D4] dark:text-[#5CE1D6] mb-3 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{outlet.phone}</span>
                </p>
              )}

              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                {outlet.description}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-gray-100 dark:border-white/[0.06] text-xs text-gray-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#00C4D4] shrink-0 mt-0.5" />
                  <span>{outlet.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#00C4D4] shrink-0 mt-0.5" />
                  <span>{outlet.openingHours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#00C4D4] shrink-0 mt-0.5" />
                  <span>{outlet.dispatch}</span>
                </div>
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
                title="Delete Outlet"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Outlet Dialog Modal */}
      {editingIndex !== null && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/[0.08]">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Edit Outlet
              </h3>
              <button
                type="button"
                onClick={cancelEdit}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Tab Label (Short)
                </label>
                <input
                  type="text"
                  value={editForm.tabName}
                  onChange={(e) => setEditForm({ ...editForm, tabName: e.target.value })}
                  placeholder="e.g. PIK, Jakarta"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Status
                </label>
                <select
                  value={editForm.status || "Active"}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                >
                  <option value="Active">Active (Show on website)</option>
                  <option value="Inactive">Inactive (Hide from website)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Full Outlet Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={editForm.phone || ""}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="e.g. +62 812-3456-7890"
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
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
                Address
              </label>
              <input
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={editForm.openingHours}
                  onChange={(e) => setEditForm({ ...editForm, openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Dispatch Coverage
                </label>
                <input
                  type="text"
                  value={editForm.dispatch}
                  onChange={(e) => setEditForm({ ...editForm, dispatch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Google Maps Link
              </label>
              <input
                type="text"
                value={editForm.mapsUrl}
                onChange={(e) => setEditForm({ ...editForm, mapsUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                value={editForm.mapsEmbedUrl}
                onChange={(e) => setEditForm({ ...editForm, mapsEmbedUrl: e.target.value })}
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
        title="Delete Outlet"
        message="Are you sure you want to delete this outlet? Remember to click Save to apply changes."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingIndex(null)}
      />
    </div>
  );
}

