// Categories.tsx
"use client";

import { LocalizedText } from "@/lib/translation";
import { CategoryCard } from "@/components/shared/ui/category-card";

// ------------------------------
// Types
// ------------------------------
type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

// Données des catégories
const categories: Category[] = [
  {
    slug: "voitures",
    name: "Voitures",
    description:
      "Des berlines élégantes aux SUV spacieux, trouvez le véhicule de vos rêves.",
    image: "/images/categories/Voitures.jpg",
    alt: "Catégorie Voitures",
  },
  {
    slug: "meubles",
    name: "Meubles",
    description:
      "Canapés, tables, rangements : meublez votre intérieur avec style et confort.",
    image: "/images/categories/Meubles.jpeg",
    alt: "Catégorie Meubles",
  },
  {
    slug: "electromenagers",
    name: "Appareils électroménagers",
    description:
      "Réfrigérateurs, lave-linge, fours : l'équipement moderne pour votre quotidien.",
    image: "/images/categories/AppareilsElectromenagers.jpeg",
    alt: "Catégorie Appareils électroménagers",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Nos Catégories</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>
              Explorez nos trois univers : des véhicules performants, des meubles
              élégants et des appareils électroménagers innovants.
            </LocalizedText>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}