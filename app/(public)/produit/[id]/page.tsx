"use client";

import { use } from "react";
import { products } from "@/lib/data";
import { LocalizedText } from "@/lib/translation";
import Breadcrumb from "@/components/product/breadcrumb";
import ImageGallery from "@/components/product/image-gallery";
import ProductInfo from "@/components/product/product-info";
import ActionButtons from "@/components/product/action-buttons";
import ProductReviews from "@/components/product/product-reviews";
import RelatedProducts from "@/components/product/related-products";
import { BounceIn, FadeIn, SlideLeft, SlideRight, SlideUp } from "@/components/shared/ux/animations";

type ProductPageProps = {
  params: Promise<{ id: string }>; // ✅ params est une Promesse
};

export default function ProductPage({ params }: ProductPageProps) {
  // ✅ Déballage de la promesse avec React.use()
  const { id } = use(params);
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  // Gestion du produit non trouvé
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-text">
          <LocalizedText>Produit introuvable.</LocalizedText>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={300}>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Catalogue", href: "/catalogue" },
              {
                label: product.category,
                href: `/catalogue?categorie=${encodeURIComponent(product.category)}`,
              },
              { label: product.name },
            ]}
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SlideUp><ImageGallery images={product.images} alt={product.name} /></SlideUp>
          <div>
            <SlideLeft><ProductInfo product={product} /></SlideLeft>
            <SlideRight delay={300}><ActionButtons product={product} /></SlideRight>
          </div>
        </div>

        <ProductReviews productName={product.name} />
        <RelatedProducts products={products} currentProductId={product.id} />
      </div>
    </div>
  );
}