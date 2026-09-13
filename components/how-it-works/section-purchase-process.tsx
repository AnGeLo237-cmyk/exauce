"use client";

import { useState } from "react";
import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import { Icons } from "@/components/shared/ui/icons";

const steps = [
  {
    icon: "catalog",
    title: "Consultation du catalogue et des fiches produit en ligne",
    description: "Découvrez nos produits, comparez les modèles, lisez les avis.",
    href: "/catalogue",
  },
  {
    icon: "select",
    title: "Sélection et contact du vendeur",
    description: "Choisissez votre produit, contactez-nous via le formulaire ou WhatsApp.",
    href: "/contact",
  },
  {
    icon: "chat",
    title: "Discussion avec le vendeur",
    description: "Échangez sur les détails, posez vos questions, demandez des photos supplémentaires.",
  },
  {
    icon: "calendar",
    title: "Rendez-vous et préparation de la commande",
    description: "Organisez un rendez-vous (physique ou visio) pour valider l'achat. Nous préparons les documents.",
  },
  {
    icon: "truck",
    title: "Livraison et paiement",
    description: "Livraison partout au Cameroun. Paiement flexible : en une fois ou en plusieurs tranches (une avance peut être demandée avant expédition).",
  },
  {
    icon: "star",
    title: "Suivi post-livraison et avis client",
    description: "Nous assurons un suivi après réception. Laissez votre avis pour aider la communauté.",
    href: "/avis-clients",
  },
];

export default function SectionPurchaseProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const renderStep = (step: (typeof steps)[number], index: number) => {
    const isActive = activeStep === index;
    const content = (
      <div
        className={`bg-surface border border-border rounded-lg p-6 shadow-sm transition-all duration-300 ${
          isActive
            ? "border-primary shadow-md scale-[1.02]"
            : "hover:border-primary/50 hover:shadow-md"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {Icons[step.icon as keyof typeof Icons]("w-5 h-5")}
          </div>
          <span className="text-sm font-bold text-primary">Étape {index + 1}</span>
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">
          <LocalizedText>{step.title}</LocalizedText>
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          <LocalizedText>{step.description}</LocalizedText>
        </p>
      </div>
    );

    if (step.href) {
      return (
        <Link
          key={step.title}
          href={step.href}
          className="block h-full"
          onClick={() => setActiveStep(index)}
        >
          {content}
        </Link>
      );
    }

    return (
      <div key={step.title} className="h-full" onClick={() => setActiveStep(index)}>
        {content}
      </div>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Le processus d'achat</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>De la sélection à la livraison, suivez nos six étapes claires et flexibles.</LocalizedText>
          </p>
        </div>

        {/* Timeline mobile (verticale) */}
        <div className="md:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative pl-16">
                {/* Point central */}
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white z-10">
                  {Icons[step.icon as keyof typeof Icons]("w-5 h-5")}
                </div>
                {renderStep(step, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline desktop (zigzag) */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />
          <div className="relative">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={step.title} className={`relative flex items-center mb-8 ${isLeft ? "justify-start" : "justify-end"}`}>
                  {/* Point central */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white z-10">
                    {Icons[step.icon as keyof typeof Icons]("w-5 h-5")}
                  </div>
                  {/* Carte */}
                  <div className={`w-5/12 ${isLeft ? "pr-8" : "pl-8"}`}>
                    {renderStep(step, index)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}