"use server";

import { authenticateAdmin } from "@/lib/sheets";
import { setSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface LoginState {
  error: string | null;
  success?: boolean;
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const result = await authenticateAdmin(email, password);

  if (!result.success || !result.user) {
    return { error: result.error || "Authentication failed. Please try again." };
  }

  await setSessionCookie(result.user);
  redirect("/admin");
}

