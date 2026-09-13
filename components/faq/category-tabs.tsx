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
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((cat, index) => (
        <CardReveal delay={800} key={cat} index={index} threshold={0.2}>
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
  );
}