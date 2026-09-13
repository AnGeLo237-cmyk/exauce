"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import ProcessStep from "./process-step";

const steps = [
  {
    icon: "search" as const,
    title: "Parcourir le catalogue",
    description: "Explorez notre large gamme de voitures, meubles et électroménagers grâce à des filtres intuitifs.",
    href: "/catalogue",
  },
  {
    icon: "file" as const,
    title: "Consulter les fiches produit",
    description: "Chaque produit dispose d'une fiche détaillée : photos, caractéristiques, prix et avis clients.",
    href: "/catalogue",
  },
  {
    icon: "comment" as const,
    title: "Faire des commentaires",
    description: "Partagez votre expérience et lisez les retours d'autres acheteurs pour faire le bon choix.",
    href: "/avis-clients",
  },
  {
    icon: "phone" as const,
    title: "Contacter le vendeur",
    description: "Une question ? Notre équipe est disponible pour vous accompagner avant et après votre achat.",
    href: "/contact",
  },
];

export default function SectionHowToUseSite() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Utiliser le site</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>Quatre étapes simples pour trouver et acquérir le produit qu'il vous faut.</LocalizedText>
          </p>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={index}
              active={activeStep === index}
              onClick={() => setActiveStep(index)}
              isLast={index === steps.length - 1}
              layout="vertical"
            />
          ))}
        </div>

        {/* Desktop horizontal avec barre de progression */}
        <div className="hidden md:block relative">
          <div className="flex items-start justify-between">
            {/* Ligne de fond */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
            {/* Ligne de progression animée */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                active={activeStep === index}
                onClick={() => setActiveStep(index)}
                isLast={index === steps.length - 1}
                layout="horizontal"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}