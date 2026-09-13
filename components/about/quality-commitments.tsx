"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import { CardReveal } from "../shared/ux/animations";

const commitments = [
  {
    icon: "selection",
    title: "Sélection rigoureuse",
    description: "Chaque produit est choisi pour sa fiabilité, sa durabilité et son design.",
  },
  {
    icon: "control",
    title: "Contrôles avant expédition",
    description: "Une vérification complète est effectuée avant chaque livraison.",
  },
  {
    icon: "delivery",
    title: "Livraison soignée",
    description: "Nos équipes assurent un transport sécurisé jusqu'à votre domicile.",
  },
  {
    icon: "sav",
    title: "Service après-vente dédié",
    description: "Une assistance réactive pour toute question ou réclamation.",
  },
];

const Icons = {
  selection: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  control: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  delivery: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  sav: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
};

export default function QualityCommitments() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
        <LocalizedText>Nos engagements qualité</LocalizedText>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {commitments.map((item, index) => (
          <CardReveal key={item.icon} index={index} delay={1400}>
          <div
            key={item.title}
            className={`bg-surface border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              {Icons[item.icon as keyof typeof Icons]("w-6 h-6")}
            </div>
            <h3 className="text-base font-semibold text-text mb-1">
              <LocalizedText>{item.title}</LocalizedText>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              <LocalizedText>{item.description}</LocalizedText>
            </p>
          </div>
          </CardReveal>
        ))}
      </div>
    </section>
  );
}