"use client";

import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Package,
  Calendar,
  Handshake,
  Globe,
  Building2,
} from "lucide-react";
import { LocalizedText } from "@/lib/translation";

// ================================================================
// 6 statistiques reflétant le contexte international
// ================================================================
const stats = [
  {
    end: 2500,
    suffix: "+",
    label: "Clients satisfaits",
    description: "À travers l'Afrique et la Caraïbe",
    icon: UserCheck,
  },
  {
    end: 1200,
    suffix: "+",
    label: "Produits livrés",
    description: "Voitures, meubles et électroménagers",
    icon: Package,
  },
  {
    end: 12,
    suffix: "",
    label: "Pays desservis",
    description: "Afrique de l'Ouest, Centrale et Caraïbe",
    icon: Globe,
  },
  {
    end: 2,
    suffix: "",
    label: "Boutiques principales",
    description: "Shanghai (Chine) & Dubaï (EAU)",
    icon: Building2,
  },
  {
    end: 25,
    suffix: "+",
    label: "Partenaires internationaux",
    description: "Fournisseurs en Chine, Turquie et EAU",
    icon: Handshake,
  },
  {
    end: 3,
    suffix: " ans",
    label: "D'expérience",
    description: "Depuis notre création en 2022",
    icon: Calendar,
  },
];

export default function StatsCounter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stats.length);
      }, 4000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 6000);
  };

  const currentStat = stats[currentIndex];
  const Icon = currentStat.icon;

  return (
    <section className="mb-16">
      {/* Titre + sous-titre international */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-text">
          <LocalizedText>Nos chiffres clés</LocalizedText>
        </h2>
        <p className="mt-2 text-sm md:text-base text-text-muted max-w-2xl">
          <LocalizedText>
            Une activité internationale depuis Shanghai et Dubaï, au service de
            12 pays d'Afrique et de la Caraïbe.
          </LocalizedText>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {/* Écran principal */}
        <motion.div
          className="flex-1 bg-surface border border-border rounded-2xl shadow-xl p-8 min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex flex-col items-center text-center w-full"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Icône décorative */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <Icon className="w-7 h-7" strokeWidth={1.5} />
              </div>

              {/* Nombre */}
              <p className="text-5xl md:text-6xl font-bold text-primary">
                <CountUp
                  end={currentStat.end}
                  duration={2}
                  suffix={currentStat.suffix}
                  start={0}
                />
              </p>

              {/* Libellé */}
              <p className="mt-3 text-lg text-text font-semibold">
                <LocalizedText>{currentStat.label}</LocalizedText>
              </p>

              {/* Description contextuelle */}
              <p className="mt-1 text-sm text-text-muted max-w-xs">
                <LocalizedText>{currentStat.description}</LocalizedText>
              </p>

              {/* Barre de progression */}
              <div className="mt-4 w-24 h-1 bg-primary/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Brillance décorative */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 rounded-2xl" />
        </motion.div>

        {/* Boutons de sélection */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:max-w-xs w-full md:w-auto">
          {stats.map((stat, index) => {
            const isActive = index === currentIndex;
            const IconComp = stat.icon;
            return (
              <motion.button
                key={stat.label}
                onClick={() => handleSelect(index)}
                className={`
                  flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all duration-300 text-left
                  ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-[1.03]"
                      : "bg-surface border-border hover:border-primary/40 hover:scale-[1.03]"
                  }
                `}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 20,
                }}
                transition={{ delay: index * 0.08 }}
              >
                <IconComp
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-white" : "text-primary"
                  }`}
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm font-medium leading-tight">
                  <LocalizedText>{stat.label}</LocalizedText>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}