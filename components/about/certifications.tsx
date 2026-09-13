"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizedText } from "@/lib/translation";
import {
  FileCheck,
  Building,
  Star,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const trustItems = [
  {
    id: "ao",
    title: "Autorisation officielle",
    icon: FileCheck,
    description: "Autorisation d'import-export et de vente de marchandises à l'échelle internationale",
    validUntil: "02/07/2020",
    image: "/images/certifications/AutorisationOfficielle.jpg",
    category: "certification",
  },
  {
    id: "rccm",
    title: "RCCM",
    icon: Building,
    description: "Immatriculation au Registre du Commerce",
    image: "/images/certifications/RegistreCommerce.jpg",
    category: "certification",
  },
  {
    id: "bl",
    title: "Business Licence",
    icon: Star,
    description: "Licence de business",
    image: "/images/certifications/BusinessLicence.jpg",
    category: "certification",
  },
];

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedImage(index);
  const closeImage = () => setSelectedImage(null);
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % trustItems.length);
    }
  };
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + trustItems.length) % trustItems.length);
    }
  };

  return (
    <section className="my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-8 text-center md:text-left">
        <LocalizedText>Notre mur de confiance</LocalizedText>
      </h2>

      {/* Grille des certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openImage(index)}
            >
              {/* Aperçu image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-text text-sm">
                    <LocalizedText>{item.title}</LocalizedText>
                  </h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  <LocalizedText>{item.description}</LocalizedText>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeImage}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-surface rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barre supérieure */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text">
                  <LocalizedText>{trustItems[selectedImage].title}</LocalizedText>
                </h3>
                <button
                  onClick={closeImage}
                  className="p-2 rounded-md text-text-muted hover:text-text hover:bg-surface transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className="relative h-[70vh] w-full bg-gray-100">
                <Image
                  src={trustItems[selectedImage].image}
                  alt={trustItems[selectedImage].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-4 border-t border-border">
                <button
                  onClick={prevImage}
                  className="p-2 rounded-md bg-surface border border-border text-text hover:bg-primary/10 transition-colors"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <p className="text-sm text-text-muted">
                  {selectedImage + 1} / {trustItems.length}
                </p>

                <button
                  onClick={nextImage}
                  className="p-2 rounded-md bg-surface border border-border text-text hover:bg-primary/10 transition-colors"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texte d'aide */}
      <p className="text-xs text-text-muted/60 mt-6 text-center">
        <LocalizedText>Cliquez sur une certification pour l'agrandir.</LocalizedText>
      </p>
    </section>
  );
}