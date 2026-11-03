import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Sign In | Laverie Laundry CMS",
  description: "Sign in to Laverie Laundry content management dashboard",
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F8FAFC] dark:bg-[#03070C] text-gray-900 dark:text-white transition-colors duration-200">
      <LoginForm />
    </div>
  );
}
