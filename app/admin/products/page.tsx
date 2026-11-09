import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getProducts } from "@/lib/sheets";
import ProductsManager from "@/components/admin/ProductsManager";

export const metadata = {
  title: "Products | Laverie Laundry",
  description: "Manage laundry products catalog and pricing with Excel import/export",
};

export default async function AdminProductsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const productsList = await getProducts();

  return (
    <AdminShell user={session}>
      <div className="space-y-6 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Products
        </h1>
        <ProductsManager initialProducts={productsList} />
      </div>
    </AdminShell>
  );
}

