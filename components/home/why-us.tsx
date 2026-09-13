// WhyUs.tsx
"use client";

import { LocalizedText } from "@/lib/translation";
import { motion } from "framer-motion";
import { ReasonCard } from "@/components/shared/ui/reason-card";
import { Icons } from "@/components/shared/ui/icons"

// Données des raisons
const reasons = [
  {
    icon: "quality",
    title: "Qualité Premium",
    description:
      "Chaque produit est rigoureusement sélectionné et testé pour offrir des performances durables et un design soigné.",
  },
  {
    icon: "trust",
    title: "Confiance & Transparence",
    description:
      "Descriptions claires et service après-vente réactif : votre tranquillité est notre priorité.",
  },
  {
    icon: "delivery",
    title: "Livraison Rapide",
    description:
      "Recevez vos achats en un temps record grâce à notre réseau logistique optimisé, partout où vous êtes.",
  },
  {
    icon: "support",
    title: "Support Dédié",
    description:
      "Une équipe d'experts à votre écoute 7j/7 pour vous conseiller avant et après votre achat, en toute simplicité.",
  },
];

export default function WhyUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Pourquoi nous choisir ?</LocalizedText>
          </h2>
          <p className="mt-3 text-lg text-text-muted max-w-3xl mx-auto">
            <LocalizedText>
              Nous nous engageons à vous offrir une expérience d&apos;achat exceptionnelle, de la découverte à la livraison.
            </LocalizedText>
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {reasons.map((reason, index) => (
            <ReasonCard
              key={reason.title}
              iconKey={reason.icon as keyof typeof Icons}
              title={reason.title}
              description={reason.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}