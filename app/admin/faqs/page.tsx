import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getFaqs } from "@/lib/sheets";
import FaqsManager from "@/components/admin/FaqsManager";

export const metadata = {
  title: "FAQs | Laverie Laundry",
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          FAQs
        </h1>
        <FaqsManager initialFaqs={faqsList} />
      </div>
    </AdminShell>
  );
}
