"use client";

import { useTheme } from "@/components/shared/ui/theme/theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center justify-center"
      aria-label={resolvedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="icon-spin w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}