"use client";

import { useState, useEffect } from "react";
import { LocalizedText } from "@/lib/translation";
import StarRating from "@/components/shared/ui/star-rating";
import ReviewCard from "@/components/shared/ui/review-card";

// ------------------------------
// Icônes SVG (flèches) conservées localement
// ------------------------------
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ------------------------------
// Données des avis (enrichies pour correspondre au type attendu par ReviewCard)
// ------------------------------
const reviews = [
  {
    id: 1,
    name: "Kenfack Jean",
    location: "Douala, Littoral",
    rating: 5,
    date: "15 janvier 2025",
    category: "Mobilier",
    product: "Canapé Chesterfield",
    text: "J'ai acheté un canapé Chesterfield, la qualité est exceptionnelle et la livraison a été rapide. Je recommande vivement !",
    initials: "KJ",
  },
  {
    id: 2,
    name: "Talla Emmanuel",
    location: "Yaoundé, Centre",
    rating: 4,
    date: "10 février 2025",
    category: "Automobile",
    product: "Toyota Prado",
    text: "Très bon service client, la Toyota que j'ai commandée correspondait parfaitement à la description. Merci pour le professionnalisme.",
    initials: "TE",
  },
  {
    id: 3,
    name: "Njoya Aminatou",
    location: "Garoua, Nord",
    rating: 5,
    date: "5 mars 2025",
    category: "Électroménager",
    product: "Réfrigérateur Two Side",
    text: "Le réfrigérateur est arrivé en parfait état, silencieux et économe. Le site est clair et la commande très simple.",
    initials: "AK",
  },
];

// ------------------------------
// Section Avis Clients (Review)
// ------------------------------
export default function Review() {
  const [current, setCurrent] = useState(0);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Avis Clients</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>
              Découvrez ce que nos clients disent de leur expérience avec nous.
            </LocalizedText>
          </p>
        </div>

        {/* Carrousel */}
        <div className="relative max-w-2xl mx-auto">
          {/* Conteneur des avis */}
          <div className="relative min-h-[280px]">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-opacity duration-500 ${
                  index === current ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Boutons précédent / suivant */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-16 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border text-text hover:bg-primary hover:text-white transition-colors shadow"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-16 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border text-text hover:bg-primary hover:text-white transition-colors shadow"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicateurs */}
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === current
                    ? "bg-primary scale-110"
                    : "bg-border hover:bg-text-muted"
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}