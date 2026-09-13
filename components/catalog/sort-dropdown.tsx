"use client";

import { LocalizedText } from "@/lib/translation";

export type SortOption = "relevance" | "price_asc" | "price_desc" | "rating" | "newest";

type SortDropdownProps = {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Pertinence" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "rating", label: "Meilleures notes" },
  { value: "newest", label: "Nouveautés" },
];

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-products" className="text-sm text-text-muted whitespace-nowrap">
        <LocalizedText>Trier par</LocalizedText>
      </label>
      <select
        id="sort-products"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            <LocalizedText>{opt.label}</LocalizedText>
          </option>
        ))}
      </select>
    </div>
  );
}