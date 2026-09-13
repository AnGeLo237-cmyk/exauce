"use client";

import { useState, useEffect, useRef } from "react";
import { LocalizedText } from "@/lib/translation";
import ContactInfoCard from "@/components/contact/contact-info-card";
import ContactForm from "@/components/contact/contact-form";
// import SocialLinks from "@/components/contact/social-links";
import MapEmbed from "@/components/contact/map-embed";
import OpeningHours from "@/components/contact/opening-hours";
import { SlideLeft, ZoomIn, SlideUp, SlideRight, BounceIn, FadeIn, CardReveal } from "@/components/shared/ux/animations";

// ---------- Page principale ----------
export default function ContactPage() {
  // ---------- Hook personnalisé pour détecter l'apparition dans le viewport ----------
  function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      }, options);

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        observer.disconnect();
      };
    }, [options]);

    return { ref, isVisible };
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              <LocalizedText>Contactez-nous</LocalizedText>
            </h1>
            <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
              <LocalizedText>
                Une question ? Un projet ? Notre équipe vous répond dans les plus brefs délais.
              </LocalizedText>
            </p>
          </div>
        </FadeIn>

        {/* Coordonnées principales */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ContactInfoCard type="address" />
            <ContactInfoCard type="phone" />
            <ContactInfoCard type="email" />
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

        {/* Réseaux sociaux */}
        {/* <FadeIn delay={300}>
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-text mb-4">
              <LocalizedText>Suivez-nous</LocalizedText>
            </h2>
            <SocialLinks />
          </div>
        </FadeIn> */}
      </div>
    </div>
  );
}