"use client";

import { LocalizedText, useClientTranslation } from "@/lib/translation";
import StarRating from "./star-rating";

type Review = {
  id: number;
  name: string;
  location: string;   // Ville
  country: string;    // Pays
  rating: number;
  date: string;
  category: string;
  product: string;
  text: string;
  initials: string;
};

type ReviewCardProps = {
  review: Review;
};

// Correspondance pays → emoji drapeau
const COUNTRY_FLAGS: Record<string, string> = {
  "Cameroun": "🇨🇲",
  "RDC": "🇨🇩",
  "Guinée Conakry": "🇬🇳",
  "Congo Brazzaville": "🇨🇬",
  "Gabon": "🇬🇦",
  "Haïti": "🇭🇹",
  "Sénégal": "🇸🇳",
  "Burkina Faso": "🇧🇫",
  "Côte d'Ivoire": "🇨🇮",
  "Tchad": "🇹🇩",
  "Togo": "🇹🇬",
  "Mali": "🇲🇱",
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const { translated: usefulAriaLabel } = useClientTranslation("Marquer comme utile");
  const { translated: reportAriaLabel } = useClientTranslation("Signaler");

  const flag = COUNTRY_FLAGS[review.country] || "🌍";

  return (
    <div className="bg-surface border border-border rounded-lg p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
      {/* En-tête : avatar + nom + localisation */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text truncate">
            <LocalizedText>{review.name}</LocalizedText>
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1 truncate">
            <span className="text-sm" aria-hidden="true">{flag}</span>
            <span className="truncate">
              <LocalizedText>{review.location}</LocalizedText>
              {", "}
              <LocalizedText>{review.country}</LocalizedText>
            </span>
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="mt-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Catégorie et produit */}
      <p className="mt-2 text-xs text-text-muted">
        <span className="font-medium">
          <LocalizedText>{review.category}</LocalizedText>
        </span>{" "}
        · <LocalizedText>{review.product}</LocalizedText>
      </p>

      {/* Texte */}
      <p className="mt-3 text-sm text-text leading-relaxed">
        <LocalizedText>{review.text}</LocalizedText>
      </p>

      {/* Pied de carte */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-text-muted">{review.date}</p>
        <div className="flex gap-2">
          <button
            className="text-xs font-medium text-text-muted hover:text-primary transition-colors"
            aria-label={usefulAriaLabel}
          >
            <LocalizedText>Utile</LocalizedText>
          </button>
          <span className="text-text-muted">·</span>
          <button
            className="text-xs font-medium text-text-muted hover:text-primary transition-colors"
            aria-label={reportAriaLabel}
          >
            <LocalizedText>Signaler</LocalizedText>
          </button>
        </div>
      </div>
    </div>
  );
}