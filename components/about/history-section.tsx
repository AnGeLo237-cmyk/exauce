"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import { FadeIn } from "../shared/ux/animations";

const milestones = [
  { year: "2022", text: "Création de l'entreprise à Douala" },
  { year: "2023", text: "Lancement de la boutique en ligne" },
  { year: "2024", text: "Extension aux appareils électroménagers" },
];

export default function HistorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-16">
      <FadeIn delay={800}>
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
        <LocalizedText>Notre histoire</LocalizedText>
      </h2>
      </FadeIn>
      <div className="flex flex-col md:flex-row gap-8">
        <FadeIn delay={600}>
        <div className="flex-1">
          <p className="text-text-muted leading-relaxed mb-4">
            <LocalizedText>
              Fondée le 12 Novembre 2022, notre entreprise est née d'une passion pour les produits de qualité et le service client. Depuis, nous avons grandi pour devenir une référence dans la vente de voitures, meubles et électroménagers au Cameroun.
            </LocalizedText>
          </p>
          <p className="text-text-muted leading-relaxed">
            <LocalizedText>
              Notre showroom à Douala et notre boutique en ligne nous permettent de servir des clients dans tout le pays et au-delà, avec un engagement constant envers l'excellence.
            </LocalizedText>
          </p>
        </div>
        </FadeIn>
        <div className="flex-1">
          <ul className="space-y-4">
            {milestones.map((item, index) => (
              <li
                key={item.year}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {item.year}
                </span>
                <span className="text-text mt-1">
                  <LocalizedText>{item.text}</LocalizedText>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}