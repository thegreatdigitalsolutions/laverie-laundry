import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import {
  Package,
  HelpCircle,
  MessageSquareQuote,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Star,
  Hotel,
  ArrowRight,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { getCMSContent } from "@/lib/sheets";

export const metadata = {
  title: "Admin Dashboard | Laverie Laundry Console",
  description: "Operations & Content Management Console for Laverie Laundry",
};

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { packages, faqs, testimonials } = await getCMSContent();

  return (
    <AdminShell user={session}>
      <div className="space-y-8 pb-12">
        {/* Executive Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-[#081219] dark:bg-[#07111A] border border-gray-200/80 dark:border-white/[0.08] p-6 sm:p-8 text-white shadow-xl shadow-black/10">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,196,212,0.18),transparent_70%)] blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00C4D4]/15 text-[#5CE1D6] border border-[#00C4D4]/30 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00C4D4] animate-pulse" />
                <span>Console Active • Logged in as {session.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Operations & Content Hub
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Manage your live laundry packages, customer FAQ accordions, verified guest reviews,
                and same-day hotel express logistics. All editable content syncs directly with Google Sheets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-gray-950 bg-[#00C4D4] hover:bg-[#00B4C3] transition-all text-xs shadow-md shadow-[#00C4D4]/20"
              >
                <span>Preview Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Packages */}
          <Link
            href="/admin/packages"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 group-hover:text-[#00C4D4] transition-colors">
                Service Tiers
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] dark:bg-[#00C4D4]/15 text-[#008B99] dark:text-[#5CE1D6] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {packages.length} Packages
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Click to edit packages
            </p>
          </Link>

          {/* FAQ Accordions */}
          <Link
            href="/admin/faqs"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 group-hover:text-[#00C4D4] transition-colors">
                Customer FAQs
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {faqs.length} Answers
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Click to edit FAQs
            </p>
          </Link>

          {/* Customer Reviews */}
          <Link
            href="/admin/testimonials"
            className="group bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs hover:border-[#00C4D4]/50 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 group-hover:text-[#00C4D4] transition-colors">
                Verified Reviews
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              {testimonials.length} Endorsements
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Click to edit reviews
            </p>
          </Link>

          {/* Express Dispatch Window */}
          <div className="bg-white dark:bg-[#0D161E] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
                12H Express Speed
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="font-extrabold text-2xl text-gray-900 dark:text-white">
              10 AM → 10 PM
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Same-day turnaround window
            </p>
          </div>
        </div>

        {/* SECTION 1: Service Packages Widget */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-[#00C4D4]" />
                <span>Service Packages ({packages.length})</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Live pricing tiers and turnaround options presented to customers on the site
              </p>
            </div>
            <Link
              href="/admin/packages"
              className="text-xs font-bold text-[#00C4D4] hover:underline inline-flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Packages in Sheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white dark:bg-[#0D161E] rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  pkg.popular
                    ? "border-[#00C4D4] shadow-lg shadow-[#00C4D4]/10 ring-1 ring-[#00C4D4]/30"
                    : "border-gray-200/80 dark:border-white/[0.08] shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
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

                  <div className="mt-2 mb-4 flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {pkg.unit}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-50 dark:bg-[#13222E] border border-gray-200/60 dark:border-white/[0.06] text-xs font-medium text-gray-700 dark:text-gray-300 mb-4 w-full">
                    <Clock className="w-3.5 h-3.5 text-[#00C4D4] shrink-0" />
                    <span>Turnaround: {pkg.turnaround}</span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                      Included Care Features:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4D4] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center gap-2">
                  <Link
                    href="/admin/packages"
                    className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-[#13222E] hover:bg-gray-200 dark:hover:bg-[#182C3D] text-xs font-bold text-gray-800 dark:text-gray-200 inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit in Sheets</span>
                  </Link>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-[#13222E] dark:hover:bg-[#182C3D] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.08] transition-colors"
                    title="Test WhatsApp Trigger"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Verified Customer Testimonials Widget */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-amber-500" />
                <span>Customer Testimonials ({testimonials.length})</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Curated feedback from boutique villas, luxury suites, and international travelers
              </p>
            </div>
            <Link
              href="/admin/testimonials"
              className="text-xs font-bold text-[#00C4D4] hover:underline inline-flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Reviews in Sheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0D161E] rounded-3xl p-6 border border-gray-200/80 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 leading-relaxed italic mb-5">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00C4D4] to-cyan-700 text-gray-950 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                        {rev.role}
                      </p>
                      <p className="text-[11px] font-semibold text-[#00C4D4] dark:text-[#5CE1D6] truncate flex items-center gap-1">
                        <Hotel className="w-3 h-3 shrink-0" />
                        <span>{rev.hotel}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/admin/testimonials"
                    className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    title="Edit in Sheets"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FAQ Accordions Widget */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-500" />
                <span>Frequently Asked Questions ({faqs.length})</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Core Q&A items displayed on the public website accordion
              </p>
            </div>
            <Link
              href="/admin/faqs"
              className="text-xs font-bold text-[#00C4D4] hover:underline inline-flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit FAQs in Sheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white dark:bg-[#0D161E] rounded-3xl border border-gray-200/80 dark:border-white/[0.08] divide-y divide-gray-100 dark:divide-white/[0.06] overflow-hidden shadow-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 hover:bg-gray-50/50 dark:hover:bg-[#13222E]/40 transition-colors flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1.5">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/faqs"
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white shrink-0"
                  title="Edit in Sheets"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Concierge & Logistics Status */}
        <section className="bg-gradient-to-br from-[#081219] to-[#0E1A24] rounded-3xl border border-gray-200/60 dark:border-white/[0.08] p-6 sm:p-7 text-white shadow-xl shadow-black/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00C4D4]/20 text-[#5CE1D6] mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Operating Protocols</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Hotel Lobby & Villa Logistics Standards
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Current dispatch parameters, delivery schedule checkpoints, and fabric sanitization standards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Full Service Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs">
            <div>
              <h4 className="font-bold text-sm text-[#00C4D4] mb-1.5">12H Express Window</h4>
              <p className="text-slate-300 leading-relaxed">
                Collection from hotel reception or villa doorstep prior to 10:00 AM.
                Delivery guaranteed before 10:00 PM the same evening.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#00C4D4] mb-1.5">Sanitization Standards</h4>
              <p className="text-slate-300 leading-relaxed">
                Medical-grade ozone washing cycle, allergen-free pH-neutral softeners,
                and sealed moisture-barrier garment packaging.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#00C4D4] mb-1.5">Order Thresholds</h4>
              <p className="text-slate-300 leading-relaxed">
                Minimum pickup volume of 3 KG for standard wash & fold, or Rp 50.000 minimum
                order for express hotel concierge bookings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
