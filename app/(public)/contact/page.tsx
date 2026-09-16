"use client";

import { LocalizedText } from "@/lib/translation";
import ContactInfoCard from "@/components/contact/contact-info-card";
import ContactForm from "@/components/contact/contact-form";
import MapEmbed from "@/components/contact/map-embed";
import OpeningHours from "@/components/contact/opening-hours";
import { FadeIn } from "@/components/shared/ux/animations";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête enrichi */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              <LocalizedText>Contactez notre équipe internationale</LocalizedText>
            </h1>
            <p className="mt-3 text-lg text-text-muted max-w-3xl mx-auto">
              <LocalizedText>
                Une question sur nos produits importés de Chine et de Turquie ?
                Notre équipe basée à Shanghai et à Dubaï vous répond dans les
                plus brefs délais, où que vous soyez en Afrique ou dans la Caraïbe.
              </LocalizedText>
            </p>

            {/* Badges d'ancrage */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { city: "Shanghai" },
                { city: "Dubaï" },
                { city: "12 pays desservis" },
              ].map((badge) => (
                <span
                  key={badge.city}
                  className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-1.5 text-sm text-text"
                >
                  <span className="font-medium">{badge.city}</span>
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Coordonnées et hubs */}
        <FadeIn delay={100}>
          <div className="mb-12">
            <ContactInfoCard />
          </div>
        </FadeIn>

        {/* Formulaire + Carte + Horaires */}
        <FadeIn delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ContactForm />
            <div className="space-y-8">
              <MapEmbed />
              <OpeningHours />
            </div>
          </div>
        </FadeIn>

        {/* Bloc d'appel à l'action final */}
        <FadeIn delay={300}>
          <div className="mt-12 text-center bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-2">
              <LocalizedText>Prêt à commander depuis votre pays ?</LocalizedText>
            </h3>
            <p className="text-sm text-text-muted mb-4 max-w-xl mx-auto">
              <LocalizedText>
                Parcourez notre catalogue de voitures, meubles et électroménagers
                importés, et contactez-nous pour un devis personnalisé.
              </LocalizedText>
            </p>
            <a
              href="/catalogue"
              className="star-pulse inline-block px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              <LocalizedText>Voir le catalogue</LocalizedText>
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}