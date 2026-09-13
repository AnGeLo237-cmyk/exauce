"use client";

import { useState } from "react";
import { useClientTranslation } from "@/lib/translation";

type InteractiveStarSelectorProps = {
  value: number; // note actuelle (0 à 5)
  onChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
};

export default function InteractiveStarSelector({
  value,
  onChange,
  size = "md",
}: InteractiveStarSelectorProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClass = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  }[size];

  const activeRating = hoverRating || value;

  // Traduction pour aria-label
  const { translated: starAriaLabel } = useClientTranslation("étoile(s)");

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none transition-transform hover:scale-110"
          aria-label={`${star} ${starAriaLabel}`}
        >
          <svg
            className={`${sizeClass} ${
              activeRating >= star
                ? "text-accent"
                : "text-gray-300 dark:text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.073 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
          </svg>
        </button>
      ))}
    </div>
  );
}