"use client";

import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import { Product } from "@/lib/data";

type ActionButtonsProps = {
  product: Product;
};

export default function ActionButtons({ product }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {/* Bouton Demander un devis */}
      <Link
        href={`/contact?subject=Demande de devis&product=${encodeURIComponent(product.name)}`}
        className="flex-1 min-w-[160px] px-4 py-2 rounded-md bg-surface border border-primary text-primary font-medium hover:bg-primary/10 transition-colors text-center"
      >
        <LocalizedText>Demander un devis</LocalizedText>
      </Link>

      {/* Bouton Contacter le vendeur */}
      <Link
        href={`/contact?subject=Question sur ${encodeURIComponent(product.name)}`}
        className="w-full sm:w-auto px-4 py-2 rounded-md bg-surface border border-border text-text font-medium hover:bg-primary/10 transition-colors text-center"
      >
        <LocalizedText>Contacter le vendeur</LocalizedText>
      </Link>
    </div>
  );
}