"use client";

import { LocalizedText, useClientTranslation } from "@/lib/translation";
import StarRating from "./star-rating";

type Review = {
  id: number;
  name: string;
  location: string;
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

export default function ReviewCard({ review }: ReviewCardProps) {
  // Traductions des libellés pour les aria-label
  const { translated: usefulAriaLabel } = useClientTranslation("Marquer comme utile");
  const { translated: reportAriaLabel } = useClientTranslation("Signaler");

  return (
    <div className="bg-surface border border-border rounded-lg p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          {review.initials}
        </div>
        <div>
          <p className="font-semibold text-text">
            <LocalizedText>{review.name}</LocalizedText>
          </p>
          <p className="text-xs text-text-muted">
            <LocalizedText>{review.location}</LocalizedText>
          </p>
        </div>
      </div>

      <div className="mt-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      <p className="mt-2 text-xs text-text-muted">
        <span className="font-medium">
          <LocalizedText>{review.category}</LocalizedText>
        </span>{" "}
        · <LocalizedText>{review.product}</LocalizedText>
      </p>

      <p className="mt-3 text-sm text-text leading-relaxed">
        <LocalizedText>{review.text}</LocalizedText>
      </p>

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