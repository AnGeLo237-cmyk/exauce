"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";
import { FadeIn } from "../shared/ux/animations";

// Jalons chronologiques
const milestones = [
  { year: "2022", text: "Création de l'entreprise à Shanghai (Chine)" },
  { year: "2023", text: "Ouverture d'une boutique et déplacement du siège social à Dubaï (EAU)" },
  { year: "2024", text: "Extension des ventes aux pays d'Afrique et de la Caraïbe" },
  { year: "2025", text: "Renforcement des partenariats avec les fournisseurs turcs" },
];

// Hubs et zones de vente
const hubs = [
  {
    city: "Shanghai",
    country: "Chine",
    role: "Bureau logistique & centre d'approvisionnement",
  },
  {
    city: "Dubaï",
    country: "Émirats Arabes Unis",
    role: "Siège social & Bureau commercial",
  },
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
        {/* Colonne texte */}
        <FadeIn delay={600}>
          <div className="flex-1 space-y-4">
            <p className="text-text-muted leading-relaxed">
              <LocalizedText>
                Fondée le 12 novembre 2022 à Shanghai, en Chine, notre entreprise
                est née de la volonté de rendre accessibles des produits de qualité
                importés de Chine et de Turquie à un large public.
              </LocalizedText>
            </p>
            <p className="text-text-muted leading-relaxed">
              <LocalizedText>
                Nous disposons de deux boutiques principales : Shanghai, notre
                centre logistique et d'approvisionnement, et Dubaï, notre siège social
                et bureau commercial pour l'Afrique et la Caraïbe.
              </LocalizedText>
            </p>
            <p className="text-text-muted leading-relaxed">
              <LocalizedText>
                Depuis, nous avons étendu notre activité à 12 autres pays du monde : Cameroun,
                RDC, Guinée Conakry, Congo Brazzaville, Gabon, Haïti, Sénégal,
                Burkina Faso, Côte d'Ivoire, Tchad, Togo et Mali.
              </LocalizedText>
            </p>

            {/* Hubs en encart visuel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {hubs.map((hub, index) => (
                <div
                  key={hub.city}
                  className={`flex items-start gap-3 p-3 rounded-lg bg-surface border border-border transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div>
                    <p className="font-semibold text-text text-sm">
                      <LocalizedText>{hub.city}</LocalizedText>
                      <span className="text-text-muted font-normal">
                        {" · "}
                        <LocalizedText>{hub.country}</LocalizedText>
                      </span>
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      <LocalizedText>{hub.role}</LocalizedText>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Colonne chronologie */}
        <div className="flex">
          <ul className="space-y-4">
            {milestones.map((item, index) => (
              <li
                key={item.year}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="flex-shrink-0 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {item.year}
                </span>
                <span className="text-text mt-2">
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