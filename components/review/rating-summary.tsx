"use client";

import { LocalizedText } from "@/lib/translation";
import StarRating from "../shared/ui/star-rating";

type DistributionItem = {
  stars: number;
  count: number;
};

type RatingSummaryProps = {
  averageRating: number;
  totalReviews: number;
  distribution: DistributionItem[]; // ex: [{stars: 5, count: 150}, {stars: 4, count: 40}, ...]
};

export default function RatingSummary({
  averageRating,
  totalReviews,
  distribution,
}: RatingSummaryProps) {
  // Calculer le pourcentage pour chaque barre
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Note moyenne globale */}
        <div className="text-center">
          <p className="text-4xl font-bold text-text">
            <LocalizedText>{averageRating.toFixed(1).replace(".", ",")}</LocalizedText>
          </p>
          <StarRating rating={averageRating} size="lg" />
          <p className="mt-2 text-sm text-text-muted">
            <LocalizedText>Basé sur</LocalizedText> {totalReviews}{" "}
            <LocalizedText>avis</LocalizedText>
          </p>
        </div>

        {/* Barres de répartition */}
        <div className="flex-1 w-full space-y-2">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <span className="text-xs font-medium text-text w-8">
                {item.stars} ★
              </span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-text-muted w-10 text-right">
                {Math.round((item.count / totalReviews) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}