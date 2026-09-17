"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { LocalizedText } from "@/lib/translation";
import { FadeIn } from "@/components/shared/ux/animations";
import {
  CM, CD, CG, GA, TD,
  SN, CI, GN, BF, TG, ML,
  HT,
} from "country-flag-icons/react/3x2";

// ================================================================
// Types et données
// ================================================================
type FlagComponent = ComponentType<{ className?: string; title?: string }>;

type Region = {
  name: string;
  tagline: string;
  accent: string;
  countries: { name: string; Flag: FlagComponent }[];
};

const regions: Region[] = [
  {
    name: "Afrique Centrale",
    tagline: "Cœur de notre activité",
    accent: "text-emerald-600 dark:text-emerald-400",
    countries: [
      { name: "Cameroun", Flag: CM },
      { name: "RDC", Flag: CD },
      { name: "Congo Brazzaville", Flag: CG },
      { name: "Gabon", Flag: GA },
      { name: "Tchad", Flag: TD },
    ],
  },
  {
    name: "Afrique de l'Ouest",
    tagline: "Marchés dynamiques",
    accent: "text-amber-600 dark:text-amber-400",
    countries: [
      { name: "Sénégal", Flag: SN },
      { name: "Côte d'Ivoire", Flag: CI },
      { name: "Guinée Conakry", Flag: GN },
      { name: "Burkina Faso", Flag: BF },
      { name: "Togo", Flag: TG },
      { name: "Mali", Flag: ML },
    ],
  },
  {
    name: "Caraïbe",
    tagline: "Nouveau relais",
    accent: "text-sky-600 dark:text-sky-400",
    countries: [{ name: "Haïti", Flag: HT }],
  },
];

// Compteur global : total de pays desservis
const TOTAL_COUNTRIES = regions.reduce((sum, r) => sum + r.countries.length, 0);

// Réglages du slider
const AUTOPLAY_MS = 5000;   // durée d'affichage d'un slide
const TRANSITION_MS = 700;  // durée de la transition entre slides

// ================================================================
// Slide (contenu d'une région, pleine largeur du conteneur)
// ================================================================
function Slide({ region }: { region: Region }) {
  return (
    <article className="w-full rounded-2xl border border-border bg-background p-6 sm:p-8">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className={`text-xl font-bold tracking-tight ${region.accent}`}>
            <LocalizedText>{region.name}</LocalizedText>
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            <LocalizedText>{region.tagline}</LocalizedText>
          </p>
        </div>
        <span className="font-mono text-2xl font-bold tabular-nums text-text">
          {String(region.countries.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {region.countries.map((country) => (
          <div
            key={country.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-2.5 transition-colors hover:border-primary/40"
          >
            <country.Flag
              className="h-6 w-9 shrink-0 rounded-[3px] shadow-sm ring-1 ring-black/5"
              title={country.name}
            />
            <span className="truncate text-xs font-medium text-text">
              <LocalizedText>{country.name}</LocalizedText>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

// ================================================================
// Composant principal
// ================================================================
export default function CountriesServed() {
  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);

  // Boucle infinie : on duplique les slides pour que le défilement
  // ne s'arrête jamais (aucun retour à zéro visible).
  const slides = [...regions, ...regions];

  // Défilement automatique (toutes les AUTOPLAY_MS)
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  // Quand on atteint la fin de la première série, on repart à 0
  // sans animation (invisible pour l'utilisateur).
  const handleTransitionEnd = () => {
    if (index >= regions.length) {
      setTransitionEnabled(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-14">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ------------------------------------------------ */}
        {/* En-tête : titre à gauche, compteur à droite        */}
        {/* ------------------------------------------------ */}
        <FadeIn>
          <header className="mb-8 flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <LocalizedText>Pays desservis</LocalizedText>
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-text md:text-3xl">
                <LocalizedText>Trois régions, un réseau continu</LocalizedText>
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                <LocalizedText>
                  Laissez défiler pour découvrir, région par région, l&apos;ensemble
                  des pays où nous livrons nos produits importés.
                </LocalizedText>
              </p>
            </div>

            {/* Compteur global */}
            <div className="shrink-0 text-right">
              <p className="font-mono text-4xl font-bold leading-none tabular-nums text-primary">
                {String(TOTAL_COUNTRIES).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                <LocalizedText>Pays desservis</LocalizedText>
              </p>
            </div>
          </header>
        </FadeIn>

        {/* ------------------------------------------------ */}
        {/* Slider automatique                                 */}
        {/* ------------------------------------------------ */}
        <FadeIn delay={150}>
          <div
            className="overflow-hidden rounded-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: transitionEnabled
                  ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((region, i) => (
                <div key={`${region.name}-${i}`} className="w-full shrink-0">
                  <Slide region={region} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ------------------------------------------------ */}
        {/* Lien sous le slider                                */}
        {/* ------------------------------------------------ */}
        <FadeIn delay={300}>
          <div className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              <LocalizedText>
                Votre pays n&apos;est pas dans la liste ? Contactez-nous.
              </LocalizedText>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}