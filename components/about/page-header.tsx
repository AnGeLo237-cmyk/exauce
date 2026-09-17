"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";

export default function PageHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg mb-12 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div
        className={`relative px-6 py-12 md:px-12 md:py-16 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <LocalizedText>À Propos de notre activité</LocalizedText>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
          <LocalizedText>
            Découvrez notre histoire, nos valeurs et notre engagement pour votre
            satisfaction, depuis Shanghai jusqu'à votre porte.
          </LocalizedText>
        </p>
      </div>
    </div>
  );
}