import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Package, HelpCircle, Star, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getCMSContent } from "@/lib/sheets";
import DashboardSections from "@/components/admin/DashboardSections";

export const metadata = {
  title: "Admin Dashboard | Laverie Laundry",
  description: "Manage Laverie Laundry website content",
};

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { packages, faqs, testimonials, outlets, products } = await getCMSContent();

  return (
    <AdminShell user={session}>
      <div className="space-y-10 pb-12">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overview and quick edit of your website content.
          </p>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            href="/admin/packages"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Packages
              </span>
              <Package className="w-4 h-4 text-gray-400 group-hover:text-[#00C4D4] transition-colors" />
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {packages.length}
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Products
              </span>
              <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-[#00C4D4] transition-colors" />
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {products?.length || 0}
            </div>
          </Link>

          <Link
            href="/admin/outlets"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Outlets
              </span>
              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#00C4D4] transition-colors" />
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {outlets.length}
            </div>
          </Link>

          <Link
            href="/admin/faqs"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                FAQs
              </span>
              <HelpCircle className="w-4 h-4 text-gray-400 group-hover:text-[#00C4D4] transition-colors" />
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {faqs.length}
            </div>
          </Link>

          <Link
            href="/admin/testimonials"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Reviews
              </span>
              <Star className="w-4 h-4 text-gray-400 group-hover:text-[#00C4D4] transition-colors" />
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {testimonials.length}
            </div>
          </Link>
        </div>

        {/* Expandable / Collapsible CMS Content Sections (Default Collapsed) */}
        <section>
          <DashboardSections
            packages={packages}
            products={products || []}
            outlets={outlets}
            testimonials={testimonials}
            faqs={faqs}
          />
        </section>
      </div>
    </AdminShell>
  );
}
