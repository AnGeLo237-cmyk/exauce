"use client";

import { LocalizedText } from "@/lib/translation";
import ReviewCard from "@/components/shared/ui/review-card";
import { CardReveal } from "@/components/shared/ux/animations";

// Type local (compatible avec ReviewCard)
type Review = {
  id: number;
  name: string;
  location: string;   // Ville
  country: string;    // ⚠️ Champ requis par ReviewCard
  rating: number;
  date: string;
  category: string;
  product: string;
  text: string;
  initials: string;
};

// Avis fictifs pour la fiche produit (adapte le pays selon ton contexte)
const getMockReviews = (productName: string): Review[] => [
  {
    id: 1,
    name: "Marie Ngo Bassa",
    location: "Douala",
    country: "Cameroun",
    rating: 5,
    date: "2025-03-15",
    category: "Produit",
    product: productName,
    text: "Très satisfaite de mon achat, la qualité est au rendez-vous. Livraison rapide.",
    initials: "MB",
  },
  {
    id: 2,
    name: "Jean-Paul Mballa",
    location: "Kinshasa",
    country: "RDC",
    rating: 4,
    date: "2025-03-10",
    category: "Produit",
    product: productName,
    text: "Bon produit, correspond à la description. Je recommande.",
    initials: "JM",
  },
  {
    id: 3,
    name: "Aïssatou Diallo",
    location: "Dakar",
    country: "Sénégal",
    rating: 5,
    date: "2025-03-05",
    category: "Produit",
    product: productName,
    text: "Parfait, conforme à mes attentes. Équipe très professionnelle.",
    initials: "AD",
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
            <ReviewCard review={review} />
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