// ReasonCard.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { LocalizedText } from "@/lib/translation";
import { Icons } from "./icons";

type ReasonCardProps = {
  iconKey: keyof typeof Icons;
  title: string;
  description: string;
  index: number;
};

export function ReasonCard({ iconKey, title, description, index }: ReasonCardProps) {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -40 : 40,
      scale: 0.85,
      rotate: index % 3 === 0 ? -4 : index % 3 === 1 ? 4 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center text-center p-6 rounded-lg bg-surface border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {Icons[iconKey]("w-7 h-7")}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-text">
        <LocalizedText>{title}</LocalizedText>
      </h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        <LocalizedText>{description}</LocalizedText>
      </p>
    </motion.div>
  );
}