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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 transition-colors disabled:opacity-50 cursor-pointer"
      title="Sign out of Admin CMS"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{isPending ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}

