"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FAQItem } from "@/data/faq";
import { saveFaqsAction } from "@/app/admin/actions";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

interface FaqsManagerProps {
  initialFaqs: FAQItem[];
}

export default function FaqsManager({ initialFaqs }: FaqsManagerProps) {
  const [savedFaqs, setSavedFaqs] = useState<FAQItem[]>(initialFaqs);
  const [faqsList, setFaqsList] = useState<FAQItem[]>(initialFaqs);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FAQItem | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setSavedFaqs(initialFaqs);
    setFaqsList(initialFaqs);
  }, [initialFaqs]);

  const currentList = useMemo(() => {
    if (editingIndex !== null && editForm !== null) {
      const updated = [...faqsList];
      updated[editingIndex] = editForm;
      return updated;
    }
    return faqsList;
  }, [faqsList, editingIndex, editForm]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(currentList) !== JSON.stringify(savedFaqs);
  }, [currentList, savedFaqs]);

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...faqsList[index] });
    setStatusMessage(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const saveCurrentEdit = () => {
    if (!editForm || editingIndex === null) return;
    const updated = [...faqsList];
    updated[editingIndex] = editForm;
    setFaqsList(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleAddNew = () => {
    const newFaq: FAQItem = {
      question: "New Customer Question?",
      answer: "Write a detailed, informative answer here for website visitors.",
    };
    setFaqsList([...faqsList, newFaq]);
    setEditingIndex(faqsList.length);
    setEditForm(newFaq);
  };

  const confirmDelete = () => {
    if (deletingIndex === null) return;
    const updated = faqsList.filter((_, i) => i !== deletingIndex);
    setFaqsList(updated);
    if (editingIndex === deletingIndex) {
      cancelEdit();
    }
    setDeletingIndex(null);
  };

  const handleReset = () => {
    setFaqsList(savedFaqs);
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
      const res = await saveFaqsAction(listToSave);
      if (res.success) {
        setFaqsList(listToSave);
        setSavedFaqs(listToSave);
        setEditingIndex(null);
        setEditForm(null);
        setStatusMessage({
          type: "success",
          text: "FAQs successfully saved!",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to save FAQs.",
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
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>FAQs ({faqsList.length})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.08] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
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

      {/* FAQ Cards List */}
      <div className="space-y-4">
        {faqsList.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#0D161E] rounded-3xl p-6 border border-gray-200/80 dark:border-white/[0.08] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-[#13222E]/60 p-3.5 rounded-2xl border border-gray-100 dark:border-white/[0.04]">
                  {faq.answer}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 sm:self-center">
              <button
                type="button"
                onClick={() => startEdit(idx)}
                className="h-10 px-4 rounded-xl bg-gray-100 dark:bg-[#13222E] hover:bg-gray-200 dark:hover:bg-[#182C3D] text-xs font-semibold text-gray-800 dark:text-gray-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setDeletingIndex(idx)}
                className="h-10 w-10 flex items-center justify-center rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit FAQ Dialog Modal */}
      {editingIndex !== null && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/[0.08]">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Edit FAQ
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
                Question
              </label>
              <input
                type="text"
                value={editForm.question}
                onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#13222E] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                Answer
              </label>
              <textarea
                rows={4}
                value={editForm.answer}
                onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
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
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? Remember to click Save to apply changes."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingIndex(null)}
      />
    </div>
  );
}
