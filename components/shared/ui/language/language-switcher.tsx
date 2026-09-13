// components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "@/lib/translation";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="px-4 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}