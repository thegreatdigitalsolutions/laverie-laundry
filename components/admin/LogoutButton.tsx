"use client";

import React, { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 transition-colors disabled:opacity-50 cursor-pointer"
      title="Sign Out"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{isPending ? "..." : "Sign Out"}</span>
    </button>
  );
}
