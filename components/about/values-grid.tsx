"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import { CardReveal } from "../shared/ux/animations";

const values = [
  {
    icon: "quality",
    title: "Qualité",
    description: "Sélection rigoureuse de produits durables et performants.",
  },
  {
    icon: "transparency",
    title: "Transparence",
    description: "Descriptions claires, prix justes et communication honnête.",
  },
  {
    icon: "proximity",
    title: "Proximité",
    description: "Une équipe à l'écoute, avant et après votre achat.",
  },
  {
    icon: "innovation",
    title: "Innovation",
    description: "Des solutions modernes pour une expérience d'achat optimale.",
  },
];

const Icons = {
  quality: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  transparency: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  proximity: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  innovation: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.7c-.5.4-.9 1-.9 1.8v.5H8.9v-.5c0-.8-.4-1.4-.9-1.8A7 7 0 0 1 12 2z" />
    </svg>
  ),
};

export default function ValuesGrid() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
        <LocalizedText>Nos valeurs</LocalizedText>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <CardReveal key={value.title} index={index} delay={1400}>
          <div
            key={value.title}
            className={`bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              {Icons[value.icon as keyof typeof Icons]("w-6 h-6")}
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">
              <LocalizedText>{value.title}</LocalizedText>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              <LocalizedText>{value.description}</LocalizedText>
            </p>
          </div>
          </CardReveal>
        ))}
      </div>
    </section>
  );
}