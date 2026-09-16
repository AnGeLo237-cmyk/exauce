"use client";

import { LocalizedText } from "@/lib/translation";
import { motion } from "framer-motion";
import { ReasonCard } from "@/components/shared/ui/reason-card";
import { Icons } from "@/components/shared/ui/icons";

// 5 raisons — ajout d'un argument « Importation directe »
const reasons = [
  {
    icon: "quality",
    title: "Qualité Premium",
    description:
      "Chaque produit est rigoureusement sélectionné en Chine et en Turquie et contrôlé avant expédition pour vous garantir fiabilité et design soigné.",
  },
  {
    icon: "trust",
    title: "Confiance & Transparence",
    description:
      "Deux boutiques internationaux (Shanghai et Dubaï) et des descriptions claires pour une tranquillité totale du devis à la livraison.",
  },
  {
    icon: "delivery",
    title: "Livraison Internationale",
    description:
      "Nous livrons dans 12 pays d'Afrique et de la Caraïbe grâce à notre réseau logistique optimisé depuis Shanghai et Dubaï.",
  },
  {
    icon: "support",
    title: "Support Dédié 7j/7",
    description:
      "Une équipe internationale à votre écoute avant, pendant et après votre achat, avec des partenaires locaux dans chaque pays.",
  },
  {
    icon: "handshake",
    title: "Importation Directe",
    description:
      "Pas d'intermédiaire : nos partenariats directs avec les fournisseurs chinois et turcs vous garantissent les meilleurs prix.",
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
              Nous importons directement de Chine et de Turquie et livrons dans
              12 pays d&apos;Afrique et de la Caraïbe, avec un engagement constant
              envers la qualité et la satisfaction client.
            </LocalizedText>
          </p>
        </div>

        {/* Grille adaptée pour 5 éléments : lg:grid-cols-5 ou centrage */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
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