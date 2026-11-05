import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getPackages } from "@/lib/sheets";
import PackagesManager from "@/components/admin/PackagesManager";

export const metadata = {
  title: "Packages | Laverie Laundry",
  description: "Manage laundry service packages and pricing",
};

export default async function AdminPackagesPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const packagesList = await getPackages();

  return (
    <AdminShell user={session}>
      <div className="space-y-6 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Packages
        </h1>
        <PackagesManager initialPackages={packagesList} />
      </div>
    </AdminShell>
  );
}
