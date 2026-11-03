"use server";

import { clearSessionCookie, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  savePackagesToSheet,
  saveFaqsToSheet,
  saveTestimonialsToSheet,
} from "@/lib/sheets";
import { PackageItem } from "@/data/packages";
import { FAQItem } from "@/data/faq";
import { TestimonialItem } from "@/data/testimonials";
import { revalidatePath } from "next/cache";

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function savePackagesAction(packagesList: PackageItem[]) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const result = await savePackagesToSheet(packagesList);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/packages");
  }
  return result;
}

export async function saveFaqsAction(faqsList: FAQItem[]) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const result = await saveFaqsToSheet(faqsList);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/faqs");
  }
  return result;
}

export async function saveTestimonialsAction(testimonialsList: TestimonialItem[]) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please sign in." };
  }

  const result = await saveTestimonialsToSheet(testimonialsList);
  if (result.success) {
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");
  }
  return result;
}
