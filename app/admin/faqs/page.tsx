import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getFaqs } from "@/lib/sheets";
import FaqsManager from "@/components/admin/FaqsManager";

export const metadata = {
  title: "FAQ Accordions | Laverie Laundry Console",
  description: "Manage frequently asked questions",
};

export default async function AdminFaqsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const faqsList = await getFaqs();

  return (
    <AdminShell user={session}>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/admin"
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-xs font-semibold text-[#00C4D4]">FAQs</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Edit customer questions and answers. Changes sync directly to Google Sheets.
            </p>
          </div>

          <Link
            href="/#faq"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] transition-colors shadow-xs"
          >
            <span>View on Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Interactive Editor */}
        <FaqsManager initialFaqs={faqsList} />
      </div>
    </AdminShell>
  );
}
