"use client";

import { LocalizedText } from "@/lib/translation";
import ReviewCard from "@/components/shared/ui/review-card";
import { CardReveal } from "../shared/ux/animations";

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

// Avis fictifs pour la démonstration (à remplacer par des données réelles)
const getMockReviews = (productName: string): Review[] => [
  {
    id: 1,
    name: "Marie Ngo Bassa",
    location: "Douala, Cameroun",
    rating: 5,
    date: "2025-03-15",
    category: "Produit",
    product: productName,
    text: "Très satisfaite de mon achat, c'est de la qualité.",
    initials: "MB",
  },
  {
    id: 2,
    name: "Jean-Paul Mballa",
    location: "Yaoundé, Cameroun",
    rating: 4,
    date: "2025-03-10",
    category: "Produit",
    product: productName,
    text: "Bon produit, livraison rapide. Je recommande.",
    initials: "JM",
  },
  {
    id: 3,
    name: "Aïcha Aboubakar",
    location: "Garoua, Cameroun",
    rating: 5,
    date: "2025-03-05",
    category: "Produit",
    product: productName,
    text: "Parfait, correspond exactement à la description.",
    initials: "AA",
  },
];

type ProductReviewsProps = {
  productName: string;
};

export default function ProductReviews({ productName }: ProductReviewsProps) {
  const reviews = getMockReviews(productName);

  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold text-text mb-6">
        <LocalizedText>Avis clients</LocalizedText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <CardReveal key={review.id} index={index} delay={200}>
            <ReviewCard key={review.id} review={review} />
          </CardReveal>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a
          href="/avis-clients"
          className="text-sm text-primary hover:text-primary-hover underline"
        >
          <LocalizedText>Voir tous les avis</LocalizedText>
        </a>
      </div>
    </section>
  );
}