"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 animate-pulse ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`w-9 h-9 rounded-full transition-all duration-200 border flex items-center justify-center cursor-pointer ${
        isDark
          ? "bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border-white/20 hover:border-white/30 shadow-xs hover:scale-105 active:scale-95"
          : "bg-transparent hover:bg-black/5 text-gray-950 border-gray-400/80 hover:border-gray-700 shadow-xs hover:scale-105 active:scale-95"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-slate-200 hover:text-white transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-gray-950 transition-colors" />
      )}
    </button>
  );
}
