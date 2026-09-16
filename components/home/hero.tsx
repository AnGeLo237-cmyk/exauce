"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { LocalizedText } from "@/lib/translation";

// Importer les images locales
import carImage from "@/public/images/hero/Car.jpeg";
import furnitureImage from "@/public/images/hero/Furniture.jpeg";
import DeviceImage from "@/public/images/hero/Device.jpeg";

// Types pour les slides
interface Slide {
  id: number;
  image: StaticImageData;
  alt: string;
  title: string;
  description: string;
  badge: string;
}

// Données avec les images locales et textes en français
const slides: Slide[] = [
  {
    id: 1,
    image: carImage,
    alt: "Car Collection",
    title: "Élégance et Performance",
    description:
      "Découvrez notre sélection de véhicules premium. Conduite assistée, matériaux nobles et technologies de pointe vous attendent.",
    badge: "Essaie gratuit",
  },
  {
    id: 2,
    image: DeviceImage,
    alt: "Modern living room furniture",
    title: "Design & Confort Intemporel",
    description:
      "Transformez votre intérieur avec nos collections de meubles design. Qualité artisanale, livraison express et montage inclus.",
    badge: "-10% sur la collection",
  },
  {
    id: 3,
    image: furnitureImage,
    alt: "High-end kitchen appliances",
    title: "Innovation au Quotidien",
    description:
      "Équipez vos locaux avec nos appareils intelligents. Économie d'énergie, connectivité et durabilité pour un confort absolu.",
    badge: "Garantie assurée",
  },
];

// Badges internationaux affichés en permanence
const globalBadges = [
  { label: "Chine" },
  { label: "Turquie" },
  { label: "12 pays desservis" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentSlide = slides[currentIndex];
  const badgeText = currentSlide.badge;
  const titleText = currentSlide.title;
  const descriptionText = currentSlide.description;

  return (
    <section
      className="relative w-full h-[80vh] min-h-[500px] overflow-hidden bg-secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      {/* Images slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/65 to-transparent" />
          </div>
        ))}
      </div>

      {/* Contenu texte et CTA */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          {/* Badge promotionnel */}
          <div className="inline-block bg-accent/90 text-secondary font-semibold text-sm px-4 py-2 rounded-full mb-4 shadow">
            <LocalizedText>{badgeText}</LocalizedText>
          </div>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            <LocalizedText>{titleText}</LocalizedText>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/85 mb-6 max-w-xl">
            <LocalizedText>{descriptionText}</LocalizedText>
          </p>

          {/* Badges internationaux */}
          <div className="flex flex-wrap gap-2 mb-8">
            {globalBadges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-medium text-white"
              >
                <LocalizedText>{badge.label}</LocalizedText>
              </span>
            ))}
          </div>

          {/* Boutons d'appel à l'action */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/catalogue"
              className="cursor-pointer star-pulse bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <LocalizedText>Consulter nos produits</LocalizedText>
            </Link>
            <Link
              href="/a-propos"
              className="cursor-pointer bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <LocalizedText>Découvrir notre activité</LocalizedText>
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateurs (points) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;