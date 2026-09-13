"use client";

import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import SectionHowToUseSite from "@/components/how-it-works/section-how-to-use-site";
import SectionPurchaseProcess from "@/components/how-it-works/section-purchase-process";
import PaymentInfo from "@/components/how-it-works/payment-info";
import { SlideLeft, ZoomIn, SlideUp, SlideRight, BounceIn, FadeIn, CardReveal } from "@/components/shared/ux/animations";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de page */}
        <SlideLeft>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Comment ça marche ?</LocalizedText>
          </h1>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>
              Découvrez comment utiliser notre site et comment se déroule l&apos;achat de nos produits.
            </LocalizedText>
          </p>
        </div>
        </SlideLeft>

        {/* Section 1 : Utiliser le site (4 étapes) */}
        <BounceIn delay={100}>
        <SectionHowToUseSite />
        </BounceIn>

        {/* Section 2 : Processus d'achat (6 étapes) */}
        <FadeIn delay={200}>
        <SectionPurchaseProcess />
        </FadeIn>

        {/* Encart paiement */}
        <SlideLeft>
        <div className="mt-12">
          <PaymentInfo />
        </div>
        </SlideLeft>

        {/* Appel à l'action final */}
        <SlideLeft>
        <div className="text-center mt-12 space-x-4">
          <Link
            href="/catalogue"
            className=" star-pulse inline-block px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
          >
            <LocalizedText>Voir le catalogue</LocalizedText>
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-md bg-surface border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            <LocalizedText>Nous contacter</LocalizedText>
          </Link>
        </div>
        </SlideLeft>
      </div>
    </div>
  );
}