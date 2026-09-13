"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import { Icons } from "@/components/shared/ui/icons"
import { StepItem, Step } from "@/components/shared/ui/step-item";

// ------------------------------
// Données des étapes
// ------------------------------
const steps: Step[] = [
  {
    icon: "search",
    title: "Parcourir le catalogue",
    description:
      "Explorez notre large gamme de voitures, meubles et électroménagers grâce à des filtres intuitifs.",
  },
  {
    icon: "file",
    title: "Consulter les fiches produit",
    description:
      "Chaque produit dispose d'une fiche détaillée : photos, caractéristiques, prix et avis clients.",
  },
  {
    icon: "comment",
    title: "Faire des commentaires",
    description:
      "Partagez votre expérience et lisez les retours d'autres acheteurs pour faire le bon choix.",
  },
  {
    icon: "phone",
    title: "Contacter le vendeur",
    description:
      "Une question ? Notre équipe est disponible pour vous accompagner avant et après votre achat.",
  },
];

// ------------------------------
// Section How It Works
// ------------------------------
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  // Animation automatique : passe à l'étape suivante toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Comment ça marche ?</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            <LocalizedText>
              Quatre étapes simples pour trouver et acquérir le produit qu&apos;il vous faut.
            </LocalizedText>
          </p>
        </div>

        {/* Contenu : version mobile (verticale) et desktop (horizontale) */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <StepItem
              key={step.title}
              step={step}
              index={index}
              active={activeStep === index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <div className="hidden md:block">
          <div className="flex items-start justify-between relative">
            {/* Ligne de connexion horizontale */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
            {/* Ligne de progression animée (optionnelle) */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center w-1/4 px-2"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    activeStep === index
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-text-muted"
                  }`}
                >
                  {Icons[step.icon as keyof typeof Icons]("w-5 h-5")}
                </div>
                <span className="mt-2 text-sm font-bold text-text">
                  {index + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-text">
                  <LocalizedText>{step.title}</LocalizedText>
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  <LocalizedText>{step.description}</LocalizedText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}