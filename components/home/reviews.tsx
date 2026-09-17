"use client";

import { useState, useEffect } from "react";
import { LocalizedText } from "@/lib/translation";
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
// Données des avis (7 avis — contexte international)
// Compatibles avec le type attendu par ReviewCard (location + country)
// ------------------------------
const reviews = [
  {
    id: 1,
    name: "Kenfack Jean",
    location: "Douala",
    country: "Cameroun",
    rating: 5,
    date: "15 janvier 2025",
    category: "Meuble",
    product: "Canapé Chesterfield",
    text: "J'ai commandé un canapé Chesterfield importé de Chine. La qualité est exceptionnelle et la livraison a été rapide. Je recommande vivement !",
    initials: "KJ",
  },
  {
    id: 2,
    name: "Grâce Mbuyi",
    location: "Kinshasa",
    country: "RDC",
    rating: 5,
    date: "10 février 2025",
    category: "Voiture",
    product: "Toyota RAV4",
    text: "Ma Toyota RAV4 est arrivée de Dubaï en parfait état. Service client impeccable, je referai appel à Exaucé sans hésiter.",
    initials: "GM",
  },
  {
    id: 3,
    name: "Aïssatou Diallo",
    location: "Dakar",
    country: "Sénégal",
    rating: 5,
    date: "5 mars 2025",
    category: "Électroménager",
    product: "Réfrigérateur Side-by-Side",
    text: "Le réfrigérateur importé de Turquie est silencieux et très économe. Le site est clair, la commande simple et la livraison à Dakar a été respectée.",
    initials: "AD",
  },
  {
    id: 4,
    name: "Kouassi Yao",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    rating: 4,
    date: "18 mars 2025",
    category: "Meuble",
    product: "Canapé d'angle",
    text: "Très satisfait du canapé d'angle importé de Chine. Bon rapport qualité-prix et équipe commerciale très réactive pour organiser la livraison à Abidjan.",
    initials: "KY",
  },
  {
    id: 5,
    name: "Paul Nguema",
    location: "Libreville",
    country: "Gabon",
    rating: 5,
    date: "2 avril 2025",
    category: "Voiture",
    product: "Berline Élégance 2025",
    text: "Ma berline importée de Turquie est magnifique, finition haut de gamme. Les démarches d'importation ont été gérées de bout en bout par l'équipe.",
    initials: "PN",
  },
  {
    id: 6,
    name: "Mahamat Idriss",
    location: "N'Djamena",
    country: "Tchad",
    rating: 5,
    date: "20 avril 2025",
    category: "Voiture",
    product: "SUV Premium X500",
    text: "SUV robuste, parfait pour les routes du Tchad. Livraison depuis Dubaï en 3 semaines comme annoncé. Vraiment professionnel.",
    initials: "MI",
  },
  {
    id: 7,
    name: "Amadou Coulibaly",
    location: "Bamako",
    country: "Mali",
    rating: 4,
    date: "12 mai 2025",
    category: "Électroménager",
    product: "Four encastrable",
    text: "Four encastrable de bonne qualité, importé de Chine. Petit délai supplémentaire à la douane mais équipe très communicative. Je recommande.",
    initials: "AC",
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