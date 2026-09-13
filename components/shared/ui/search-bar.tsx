"use client";

import { useClientTranslation } from "@/lib/translation";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  const { translated: placeholder } = useClientTranslation("Rechercher un produit...");

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}