"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import StarRating from "@/components/shared/ui/star-rating";
import { Product, FALLBACK_IMAGE } from "@/lib/data";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // État local pour gérer la source de l'image avec fallback dynamique
  const [imgSrc, setImgSrc] = useState(product.images?.[0] || FALLBACK_IMAGE);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/produit/${product.id}`} className="block relative h-48 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgSrc(FALLBACK_IMAGE)} // ← Fallback en cas d'erreur de chargement
        />
      </Link>
      <div className="p-4">
        <Link href={`/produit/${product.id}`}>
          <h3 className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
            <LocalizedText>{product.name}</LocalizedText>
          </h3>
        </Link>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          <LocalizedText>{product.category}</LocalizedText>
        </p>
        <div className="mt-2 flex flex-col items-center justify-between">
          <span className="text-xl font-bold text-[var(--color-primary)]">
            {formatPrice(product.price)}
          </span>
          <StarRating rating={product.rating} size="sm" />
        </div>
        <Link
          href={`/produit/${product.id}`}
          className="mt-3 block w-full text-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          <LocalizedText>Voir détails</LocalizedText>
        </Link>
      </div>
    </div>
  );
}