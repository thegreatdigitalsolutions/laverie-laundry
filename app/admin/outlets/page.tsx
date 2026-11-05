import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getOutlets } from "@/lib/sheets";
import OutletsManager from "@/components/admin/OutletsManager";

export const metadata = {
  title: "Outlets | Laverie Laundry",
  description: "Manage laundry outlet locations and concierge hubs",
};

export default async function AdminOutletsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const outletsList = await getOutlets();

  return (
    <AdminShell user={session}>
      <div className="space-y-6 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Outlets
        </h1>
        <OutletsManager initialOutlets={outletsList} />
      </div>
    </AdminShell>
  );
}

