"use client";

import { useState } from "react";
import { LocalizedText } from "@/lib/translation";

// Types pour les filtres
export type Filters = {
  categories: string[];
  priceMin: number | "";
  priceMax: number | "";
  minRating: number; // 0 = toutes les notes
  availability: string[]; // "in_stock" | "out_of_stock"
};

type FilterSidebarProps = {
  filters: Filters;
  onChange: (newFilters: Filters) => void;
};

const categoriesList = ["Voiture", "Meuble", "Électroménager"];
const availabilityOptions = [
  { value: "in_stock", label: "En stock" },
  { value: "out_of_stock", label: "Rupture de stock" },
];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false); // pour mobile

  // Gestionnaires de mise à jour
  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: updated });
  };

  const handlePriceChange = (field: "priceMin" | "priceMax", value: string) => {
    const num = value === "" ? "" : Number(value);
    onChange({ ...filters, [field]: num });
  };

  const handleRating = (rating: number) => {
    onChange({ ...filters, minRating: rating });
  };

  const toggleAvailability = (value: string) => {
    const updated = filters.availability.includes(value)
      ? filters.availability.filter((a) => a !== value)
      : [...filters.availability, value];
    onChange({ ...filters, availability: updated });
  };

  const resetFilters = () => {
    onChange({
      categories: [],
      priceMin: "",
      priceMax: "",
      minRating: 0,
      availability: [],
    });
  };

  const filtersContent = (
    <div className="space-y-6">
      {/* Catégories */}
      <div>
        <h3 className="text-sm font-semibold text-text mb-2">
          <LocalizedText>Catégories</LocalizedText>
        </h3>
        <div className="space-y-2">
          {categoriesList.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
              />
              <span className="text-sm text-text-muted">
                <LocalizedText>{cat}</LocalizedText>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <h3 className="text-sm font-semibold text-text mb-2">
          <LocalizedText>Prix (FCFA)</LocalizedText>
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handlePriceChange("priceMin", e.target.value)}
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange("priceMax", e.target.value)}
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Note minimale */}
      <div>
        <h3 className="text-sm font-semibold text-text mb-2">
          <LocalizedText>Note minimale</LocalizedText>
        </h3>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`px-2 py-1 rounded-md text-sm ${
                filters.minRating === star
                  ? "bg-primary text-white"
                  : "bg-surface border border-border text-text hover:bg-primary/10"
              }`}
            >
              {star === 0 ? (
                <LocalizedText>Toutes</LocalizedText>
              ) : (
                `${star}★`
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Disponibilité */}
      <div>
        <h3 className="text-sm font-semibold text-text mb-2">
          <LocalizedText>Disponibilité</LocalizedText>
        </h3>
        <div className="space-y-2">
          {availabilityOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.includes(opt.value)}
                onChange={() => toggleAvailability(opt.value)}
                className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
              />
              <span className="text-sm text-text-muted">
                <LocalizedText>{opt.label}</LocalizedText>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Réinitialiser */}
      <button
        onClick={resetFilters}
        className="w-full px-4 py-2 rounded-md bg-surface border border-border text-text hover:bg-primary/10 transition-colors"
      >
        <LocalizedText>Réinitialiser les filtres</LocalizedText>
      </button>
    </div>
  );

  return (
    <>
      {/* Version desktop (visible à partir de lg) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-surface border border-border rounded-lg p-4 shadow-sm">
        {filtersContent}
      </aside>

      {/* Version mobile : bouton + panneau coulissant */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2 rounded-md bg-primary text-white font-medium"
        >
          <LocalizedText>Filtrer</LocalizedText>
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Panneau coulissant */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-80 max-w-full bg-background border-l border-border z-50 p-4 overflow-y-auto transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-text">
              <LocalizedText>Filtres</LocalizedText>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-text hover:bg-surface"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {filtersContent}
        </div>
      </div>
    </>
  );
}