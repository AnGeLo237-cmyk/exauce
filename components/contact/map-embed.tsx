"use client";

import { LocalizedText } from "@/lib/translation";

// Les 2 boutiques principales
const hubs = [
  {
    city: "Shanghai",
    country: "Chine",
    role: "Siège & centre d'approvisionnement",
    flag: "🇨🇳",
    coordinates: "31.2304° N, 121.4737° E",
  },
  {
    city: "Dubaï",
    country: "Émirats Arabes Unis",
    role: "Hub logistique & commercial",
    flag: "🇦🇪",
    coordinates: "25.2048° N, 55.2708° E",
  },
];

export default function MapEmbed() {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="p-5">
        {/* En-tête */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-text">
            <LocalizedText>Nos boutiques principales</LocalizedText>
          </h3>
        </div>

        {/* Liste des hubs */}
        <div className="space-y-3">
          {hubs.map((hub) => (
            <div
              key={hub.city}
              className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/40 transition-colors"
            >
              <span className="text-2xl shrink-0" aria-hidden="true">
                {hub.flag}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm flex items-baseline flex-wrap gap-1">
                  <LocalizedText>{hub.city}</LocalizedText>
                  <span className="text-text-muted font-normal">
                    · <LocalizedText>{hub.country}</LocalizedText>
                  </span>
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  <LocalizedText>{hub.role}</LocalizedText>
                </p>
                <p className="text-[10px] text-text-muted/70 mt-0.5 font-mono">
                  {hub.coordinates}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note de livraison */}
        <p className="text-xs text-text-muted text-center mt-4 pt-3 border-t border-border">
          <LocalizedText>
            Livraison assurée dans 12 pays d'Afrique et de la Caraïbe
          </LocalizedText>
        </p>
      </div>

      {/* Bandeau décoratif */}
      <div className="relative h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
    </div>
  );
}