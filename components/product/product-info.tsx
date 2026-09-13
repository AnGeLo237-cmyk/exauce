"use client";

import { LocalizedText } from "@/lib/translation";
import StarRating from "@/components/shared/ui/star-rating";
import { Product } from "@/lib/data";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* Nom et catégorie */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text">
          <LocalizedText>{product.name}</LocalizedText>
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          <LocalizedText>{product.category}</LocalizedText>
          {product.brand && (
            <>
              {" · "}
              <span className="font-medium">
                <LocalizedText>{product.brand}</LocalizedText>
              </span>
            </>
          )}
        </p>
      </div>

      {/* Prix et note */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        <div className="flex items-center gap-1">
          <StarRating rating={product.rating} size="md" />
          <span className="text-sm text-text-muted">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </div>

      {/* Disponibilité */}
      <div>
        {product.stock > 0 ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
            <span className="w-2 h-2 rounded-full bg-success" />
            <LocalizedText>En stock</LocalizedText> ({product.stock})
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-error">
            <span className="w-2 h-2 rounded-full bg-error" />
            <LocalizedText>Rupture de stock</LocalizedText>
          </span>
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-text mb-2">
          <LocalizedText>Description</LocalizedText>
        </h2>
        <p className="text-text-muted leading-relaxed">
          <LocalizedText>{product.description}</LocalizedText>
        </p>
      </div>

      {/* Spécifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-text mb-2">
            <LocalizedText>Caractéristiques</LocalizedText>
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between p-2 bg-surface border border-border rounded-md">
                <dt className="text-sm text-text-muted">
                  <LocalizedText>{key}</LocalizedText>
                </dt>
                <dd className="text-sm font-medium text-text">
                  <LocalizedText>{value}</LocalizedText>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}