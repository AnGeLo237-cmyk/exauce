"use client";

import Image from "next/image";
import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import { motion, Variants } from "framer-motion";
import StarRating from "@/components/shared/ui/star-rating"; // Import du composant externe

// Types
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number; // de 0 à 5
  image: string;
  href: string;
};

// Données mock (à remplacer par vos données réelles ou API)
const products: Product[] = [
  {
    id: 1,
    name: "Toyota Prado",
    category: "Voitures",
    price: 30000000, // 30 000 000 FCFA
    rating: 4.8,
    image: "/images/products/Toyota.jpg",
    href: "/catalogue",
  },
  {
    id: 2,
    name: "Canapé Chesterfield",
    category: "Meubles",
    price: 850000, // 850 000 FCFA
    rating: 4.5,
    image: "/images/products/Couch.jpg",
    href: "/catalogue",
  },
  {
    id: 3,
    name: "Réfrigérateur Two Side",
    category: "Appareils électroménagers",
    price: 1200000, // 1 200 000 FCFA
    rating: 4.7,
    image: "/images/products/Freezer.jpg",
    href: "/catalogue",
  },
  {
    id: 4,
    name: "Hyundai Santa Fe 2023",
    category: "Voitures",
    price: 25000000, // 25 000 000 FCFA
    rating: 4,
    image: "/images/products/Hyundai.jpeg",
    href: "/catalogue",
  },
];

export default function BestProducts() {
  // Définition des variantes d'animation pour chaque carte (selon l'index)
  const getCardVariants = (index: number): Variants => {
    // Alternance de directions : pair = gauche, impair = droite
    const direction = index % 2 === 0 ? -50 : 50;
    // Variantes de rotation légère pour varier
    const rotate = index % 3 === 0 ? -5 : index % 3 === 1 ? 5 : 0;

    return {
      hidden: {
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40,
        scale: 0.9,
        rotate: index % 2 === 0 ? -2 : 2,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };
  };

  // Variantes du conteneur (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // décalage de 120ms entre chaque carte
        delayChildren: 0.1,    // petit délai avant la première
      },
    },
  };

  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            <LocalizedText>Meilleurs Produits</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-[var(--color-text-muted)]">
            <LocalizedText>
              Découvrez notre sélection exclusive des produits les plus appréciés.
            </LocalizedText>
          </p>
        </div>

        {/* Grille de produits avec animations */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }} // se rejoue à chaque entrée dans le viewport
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={getCardVariants(index)}
              className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-[var(--shadow)] hover:shadow-lg transition-shadow"
            >
              {/* Image produit */}
              <Link href={product.href} className="block relative h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Contenu */}
              <div className="p-4">
                <Link href={product.href}>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                    <LocalizedText>{product.name}</LocalizedText>
                  </h3>
                </Link>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  <LocalizedText>{product.category}</LocalizedText>
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-[var(--color-primary)]">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "XAF",
                    }).format(product.price)}
                  </span>
                  {/* Utilisation du composant StarRating importé, avec la taille "sm" */}
                  <StarRating rating={product.rating} size="sm" />
                </div>
                <Link
                  href={product.href}
                  className="mt-3 block w-full text-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                  <LocalizedText>Voir détails</LocalizedText>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}