"use client";

import { useState } from "react";
import Image from "next/image";
import { FALLBACK_IMAGE } from "@/lib/data";

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Suivi des images qui ont échoué (on stocke leur index)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const getImageSrc = (img: string, index: number): string => {
    return failedImages.has(index) ? FALLBACK_IMAGE : img;
  };

  // Si aucune image fournie
  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 w-full bg-surface border border-border rounded-lg overflow-hidden">
        <Image
          src={FALLBACK_IMAGE}
          alt="Produit sans image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative h-96 w-full bg-surface border border-border rounded-lg overflow-hidden">
        <Image
          src={getImageSrc(images[activeIndex], activeIndex)}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onError={() => handleImageError(activeIndex)}
        />
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              aria-label={`Image ${index + 1}`}
            >
              <Image
                src={getImageSrc(img, index)}
                alt={`${alt} - vue ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}