import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getTestimonials } from "@/lib/sheets";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const metadata = {
  title: "Reviews | Laverie Laundry",
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reviews
        </h1>
        <TestimonialsManager initialTestimonials={testimonialsList} />
      </div>
    </AdminShell>
  );
}
