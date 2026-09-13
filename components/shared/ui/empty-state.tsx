"use client";

import { LocalizedText } from "@/lib/translation";

type EmptyStateProps = {
  onReset?: () => void; // optionnel : réinitialiser les filtres
};

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-border">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-text">
        <LocalizedText>Aucun résultat trouvé</LocalizedText>
      </h3>
      <p className="mt-2 text-sm text-text-muted max-w-sm mx-auto">
        <LocalizedText>
          Essayez de modifier vos filtres ou votre recherche pour trouver des avis.
        </LocalizedText>
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <LocalizedText>Réinitialiser les filtres</LocalizedText>
        </button>
      )}
    </div>
  );
}