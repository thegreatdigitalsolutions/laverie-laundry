import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTestimonials } from "@/lib/sheets";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const metadata = {
  title: "Customer Reviews | Laverie Laundry Console",
  description: "Manage guest testimonials and reviews",
};

export default async function AdminTestimonialsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const testimonialsList = await getTestimonials();

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
              <span className="text-xs font-semibold text-[#00C4D4]">Reviews</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Customer Reviews & Endorsements
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Edit guest reviews, hotel properties, and star ratings. Changes sync directly to Google Sheets.
            </p>
          </div>

          <Link
            href="/#testimonials"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] transition-colors shadow-xs"
          >
            <span>View on Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Interactive Editor */}
        <TestimonialsManager initialTestimonials={testimonialsList} />
      </div>
    </AdminShell>
  );
}
