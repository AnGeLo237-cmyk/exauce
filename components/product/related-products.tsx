"use client";

import { useMemo } from "react";
import { LocalizedText } from "@/lib/translation";
import { Product } from "@/lib/data";
import ProductCard from "@/components/shared/ui/product-card";
import { CardReveal } from "../shared/ux/animations";

type RelatedProductsProps = {
  products: Product[]; // liste complète
  currentProductId: number;
  maxItems?: number;
};

export default function RelatedProducts({
  products,
  currentProductId,
  maxItems = 4,
}: RelatedProductsProps) {
  const current = products.find((p) => p.id === currentProductId);

  const related = useMemo(() => {
    if (!current) return [];
    return products
      .filter((p) => p.category === current.category && p.id !== currentProductId)
      .slice(0, maxItems);
  }, [products, currentProductId, current, maxItems]);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold text-text mb-6">
        <LocalizedText>Produits similaires</LocalizedText>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <CardReveal key={product.id} index={index} delay={200}>
            <ProductCard key={product.id} product={product} />
          </CardReveal>
        ))}
      </div>
    </section>
  );
}