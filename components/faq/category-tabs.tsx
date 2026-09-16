"use client";

import { LocalizedText } from "@/lib/translation";
import { CardReveal } from "../shared/ux/animations";

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="relative mb-8">
      {/* Défilement horizontal sur mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 scrollbar-hide">
        {categories.map((cat, index) => (
          <CardReveal delay={600} key={cat} index={index} threshold={0.2}>
            <button
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface border border-border text-text-muted hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <LocalizedText>{cat}</LocalizedText>
            </button>
          </CardReveal>
        ))}
      </div>
    </div>
  );
}