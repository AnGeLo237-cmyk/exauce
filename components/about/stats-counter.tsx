"use client";

import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Package, Calendar, Handshake } from "lucide-react";
import { LocalizedText } from "@/lib/translation";

const stats = [
  { 
    end: 2500, 
    suffix: "+", 
    label: "Clients satisfaits",
    icon: UserCheck,
  },
  { 
    end: 1200, 
    suffix: "+", 
    label: "Produits livrés",
    icon: Package,
  },
  { 
    end: 7, 
    suffix: " ans", 
    label: "D'expérience",
    icon: Calendar,
  },
  { 
    end: 25, 
    suffix: "", 
    label: "Partenaires",
    icon: Handshake,
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
      {/* Titre aligné à gauche sur desktop */}
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-8 text-center md:text-left">
        <LocalizedText>Nos chiffres clés</LocalizedText>
      </h2>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {/* Écran (à gauche sur desktop) */}
        <motion.div
          className="flex-1 bg-surface border border-border rounded-2xl shadow-xl p-8 min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden"
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
              {/* Nombre avec CountUp */}
              <p className="text-5xl md:text-6xl font-bold text-primary">
                <CountUp 
                  end={currentStat.end} 
                  duration={2} 
                  suffix={currentStat.suffix}
                  start={0}
                />
              </p>

              {/* Libellé */}
              <p className="mt-3 text-lg text-text-muted font-medium">
                <LocalizedText>{currentStat.label}</LocalizedText>
              </p>

              {/* Barre de progression sous le chiffre */}
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

          {/* Effet de brillance (fond épuré) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 rounded-2xl" />
        </motion.div>

        {/* Boutons (à droite sur desktop) */}
        <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-start flex-shrink-0 md:order-last">
          {stats.map((stat, index) => {
            const isActive = index === currentIndex;
            const IconComp = stat.icon;
            return (
              <motion.button
                key={stat.label}
                onClick={() => handleSelect(index)}
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 
                  ${isActive 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105" 
                    : "bg-surface border-border hover:border-primary/40 hover:scale-105"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  x: isVisible ? 0 : 20,
                }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Icône avec couleur unique (primary) */}
                <IconComp className={`w-5 h-5 ${isActive ? "text-white" : "text-primary"}`} />
                <span className="text-sm font-medium hidden sm:inline">
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