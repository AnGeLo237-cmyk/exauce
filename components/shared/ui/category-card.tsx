// CategoryCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { LocalizedText } from "@/lib/translation";

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

type CategoryCardProps = {
  category: Category;
  index: number;
};

export function CategoryCard({ category, index }: CategoryCardProps) {
  const getVariants = (index: number): Variants => {
    switch (index) {
      case 0:
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        };
      case 1:
        return {
          hidden: { opacity: 0, scale: 0.85, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        };
      case 2:
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={getVariants(index)}
    >
      <Link
        href={`/catalogue?categorie=${category.slug}`}
        className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="relative h-64 w-full">
          <Image
            src={category.image}
            alt={category.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">
            <LocalizedText>{category.name}</LocalizedText>
          </h3>
          <p className="text-sm text-white/80 line-clamp-2">
            <LocalizedText>{category.description}</LocalizedText>
          </p>
          <span className="mt-2 inline-block text-sm font-semibold text-accent-light group-hover:text-white transition-colors">
            <LocalizedText>Explorer</LocalizedText> →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}