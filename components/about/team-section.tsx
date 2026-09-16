"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { LocalizedText } from "@/lib/translation";

// ================================================================
// 10 MEMBRES — répartition internationale (Shanghai, Dubaï, Afrique)
// ================================================================
const teamMembers = [
  // Direction
  {
    name: "M. Emmanuel Ngo Bassong",
    role: "Directeur Général",
    department: "Direction",
    location: "Shanghai",
    flag: "🇨🇳",
    photo: "/images/staff/emmanuel-ngo-bassong.jpg",
    quote: "Notre mission est de rendre l'excellence accessible à tous.",
  },
  // Opérations Chine
  {
    name: "Mme Li Wei",
    role: "Responsable Bureau Shanghai",
    department: "Opérations Chine",
    location: "Shanghai",
    flag: "🇨🇳",
    photo: "/images/staff/li-wei.jpg",
    quote: "Nous sélectionnons chaque fournisseur avec la plus grande rigueur.",
  },
  {
    name: "M. Chen Hao",
    role: "Responsable Qualité Chine",
    department: "Qualité",
    location: "Shanghai",
    flag: "🇨🇳",
    photo: "/images/staff/chen-hao.jpg",
    quote: "Aucun produit ne quitte Shanghai sans un contrôle minutieux.",
  },
  // Opérations Dubaï
  {
    name: "M. Ahmed Al-Mansouri",
    role: "Responsable Bureau Dubaï",
    department: "Opérations Dubaï",
    location: "Dubaï",
    flag: "🇦🇪",
    photo: "/images/staff/ahmed-al-mansouri.jpg",
    quote: "Notre hub de Dubaï est la plaque tournante vers l'Afrique et la Caraïbe.",
  },
  {
    name: "Mme Fatima Al-Zahra",
    role: "Responsable Logistique Internationale",
    department: "Logistique",
    location: "Dubaï",
    flag: "🇦🇪",
    photo: "/images/staff/fatima-al-zahra.jpg",
    quote: "Chaque expédition est suivie de bout en bout jusqu'à votre porte.",
  },
  // Achats Turquie
  {
    name: "M. Mehmet Yilmaz",
    role: "Responsable Achats Turquie",
    department: "Achats Internationaux",
    location: "Istanbul",
    flag: "🇹🇷",
    photo: "/images/staff/mehmet-yilmaz.jpg",
    quote: "Nos partenariats turcs garantissent des produits authentiques et durables.",
  },
  // Commercial Afrique
  {
    name: "Mme Clarisse Abena",
    role: "Directrice Commerciale Afrique",
    department: "Commercial",
    location: "Douala",
    flag: "🇨🇲",
    photo: "/images/staff/clarisse-abena.jpg",
    quote: "Chaque client mérite une écoute attentive et une offre sur mesure.",
  },
  {
    name: "M. Serge Owona",
    role: "Responsable Relations Clients",
    department: "Service Client",
    location: "Douala",
    flag: "🇨🇲",
    photo: "/images/staff/serge-owona.jpg",
    quote: "Nous accompagnons nos clients dans toute l'Afrique et la Caraïbe.",
  },
  // SAV
  {
    name: "Mme Patricia Mbarga",
    role: "Responsable Service Après-Vente",
    department: "SAV",
    location: "Douala",
    flag: "🇨🇲",
    photo: "/images/staff/patricia-mbarga.jpg",
    quote: "Nous restons à vos côtés bien après l'achat, dans chaque pays.",
  },
  // Finance
  {
    name: "M. Thomas Ndzana",
    role: "Responsable Financier",
    department: "Finance",
    location: "Dubaï",
    flag: "🇦🇪",
    photo: "/images/staff/thomas-ndzana.jpg",
    quote: "Des transactions transparentes et sécurisées, du devis à la livraison.",
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Rotation automatique
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Effet tilt magnétique
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: x * 12, y: -y * 12 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);
  const next = () => setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = teamMembers.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let blur = "0px";
    let zIndex = 0;
    let rotateY = 0;

    if (diff === 0) {
      translateX = 0;
      scale = 1;
      opacity = 1;
      blur = "0px";
      zIndex = 20;
      rotateY = 0;
    } else if (diff === -1) {
      translateX = -240;
      scale = 0.78;
      opacity = 0.55;
      blur = "4px";
      zIndex = 10;
      rotateY = 28;
    } else if (diff === 1) {
      translateX = 240;
      scale = 0.78;
      opacity = 0.55;
      blur = "4px";
      zIndex = 10;
      rotateY = -28;
    } else {
      translateX = diff < 0 ? -450 : 450;
      scale = 0.5;
      opacity = 0;
      blur = "8px";
      zIndex = 0;
      rotateY = diff < 0 ? 40 : -40;
    }

    if (Math.abs(diff) > 1) {
      opacity = 0;
      scale = 0.5;
      translateX = diff < 0 ? -500 : 500;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      filter: `blur(${blur})`,
      zIndex,
      transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      pointerEvents: "auto",
      cursor: diff === 0 ? "default" : "pointer",
    };
  };

  return (
    <section className="mb-16 py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-text">
          <LocalizedText>Notre équipe</LocalizedText>
        </h2>
        <p className="mt-2 text-sm md:text-base text-text-muted max-w-2xl">
          <LocalizedText>
            Une équipe internationale basée à Shanghai, Dubaï et Douala, engagée
            pour vous offrir des produits authentiques importés de Chine et de
            Turquie et un service irréprochable dans 12 pays.
          </LocalizedText>
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto h-[540px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center perspective-1000 overflow-hidden">
          {teamMembers.map((member, index) => {
            const isCenter = index === currentIndex;
            const style = getCardStyle(index);
            const hasError = imageErrors.has(index);

            return (
              <div
                key={member.name}
                className="absolute w-[280px] md:w-[320px] h-[420px] rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden transition-all duration-700 will-change-transform"
                style={style}
                onClick={() => goTo(index)}
              >
                <div
                  className="w-full h-full flex flex-col items-center p-6 transition-all duration-200 ease-out"
                  style={
                    isCenter
                      ? {
                          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                          transformStyle: "preserve-3d",
                        }
                      : undefined
                  }
                >
                  {/* Badge "À l'honneur" */}
                  {isCenter && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20">
                      <LocalizedText>À l'honneur</LocalizedText>
                    </div>
                  )}

                  {/* Badge département + localisation */}
                  <div
                    className={`absolute top-4 left-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-all duration-500 z-20 ${
                      isCenter
                        ? "bg-primary/10 text-primary"
                        : "bg-border/40 text-text-muted"
                    }`}
                  >
                    <span aria-hidden="true">{member.flag}</span>
                    <LocalizedText>{member.location}</LocalizedText>
                  </div>

                  {/* Photo / Avatar */}
                  <div
                    className={`relative flex-shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 transition-all duration-700 mt-6 ${
                      isCenter
                        ? "border-primary shadow-lg shadow-primary/30 scale-105"
                        : "border-border"
                    }`}
                  >
                    {hasError ? (
                      <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center">
                        <svg
                          className="w-16 h-16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="144px"
                        className="object-cover"
                        onError={() => handleImageError(index)}
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center mt-4 w-full">
                    <h3
                      className={`text-lg md:text-xl font-semibold text-text transition-all duration-700 ${
                        isCenter ? "scale-105" : ""
                      }`}
                    >
                      <LocalizedText>{member.name}</LocalizedText>
                    </h3>
                    <p className="text-sm text-primary font-medium mt-1">
                      <LocalizedText>{member.role}</LocalizedText>
                    </p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">
                      <LocalizedText>{member.department}</LocalizedText>
                    </p>
                    <div
                      className={`mt-3 px-4 py-2 rounded-lg transition-all duration-700 w-full ${
                        isCenter
                          ? "bg-primary/5 border-l-2 border-primary"
                          : "bg-transparent"
                      }`}
                    >
                      <p className="text-text-muted italic text-xs md:text-sm leading-relaxed">
                        « <LocalizedText>{member.quote}</LocalizedText> »
                      </p>
                    </div>
                  </div>

                  {/* Effet de lumière glissante */}
                  {isCenter && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      <div className="absolute -inset-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Flèches */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-surface/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary/10 hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Précédent"
        >
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-surface/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-primary/10 hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Suivant"
        >
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Compteur + points */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pb-4">
          <div className="text-xs font-semibold text-text-muted bg-surface/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
            {currentIndex + 1} / {teamMembers.length}
          </div>
          <div className="flex items-center gap-1.5 max-w-[90vw] overflow-x-auto px-2 scrollbar-hide">
            {teamMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 flex-shrink-0 ${
                  idx === currentIndex
                    ? "w-6 bg-primary shadow-md shadow-primary/30"
                    : "w-1.5 bg-border hover:bg-primary/50"
                }`}
                aria-label={`Aller au membre ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}