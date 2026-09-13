"use client";

import ProductCard from "../shared/ui/product-card";
import { Product } from "@/lib/data";
import { CardReveal } from "../shared/ux/animations";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return null; // sera géré par EmptyState dans la page parente
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <CardReveal key={product.id} index={index} threshold={0.2}>
          <ProductCard product={product} />
        </CardReveal>
      ))}
    </div>
  );
}