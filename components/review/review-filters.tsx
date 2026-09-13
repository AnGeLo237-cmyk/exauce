"use client";

import { LocalizedText, useClientTranslation } from "@/lib/translation";

type Category = "Toutes" | "Voitures" | "Meubles" | "Électroménagers";
type SortOption = "recent" | "oldest" | "rating" | "useful";

type ReviewFiltersProps = {
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectedRating: number; // 0 = toutes, 3, 4, 5
  setSelectedRating: (rating: number) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const categories: Category[] = ["Toutes", "Voitures", "Meubles", "Électroménagers"];
const ratingOptions = [0, 5, 4, 3]; // 0 = toutes
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "rating", label: "Meilleures notes" },
  { value: "useful", label: "Plus utiles" },
];

export default function ReviewFilters({
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
}: ReviewFiltersProps) {
  const { translated: searchPlaceholder } = useClientTranslation("Rechercher un avis...");

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-background border border-border text-text hover:bg-primary/10"
              }`}
            >
              <LocalizedText>{cat}</LocalizedText>
            </button>
          ))}
        </div>

        {/* Notes minimales */}
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(r)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedRating === r
                  ? "bg-primary text-white"
                  : "bg-background border border-border text-text hover:bg-primary/10"
              }`}
            >
              {r === 0 ? (
                <LocalizedText>Toutes les notes</LocalizedText>
              ) : (
                <span>
                  {r} ★<LocalizedText>+</LocalizedText>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-text-muted whitespace-nowrap">
            <LocalizedText>Trier par</LocalizedText>
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                <LocalizedText>{opt.label}</LocalizedText>
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recherche */}
      <div className="mt-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  );
}