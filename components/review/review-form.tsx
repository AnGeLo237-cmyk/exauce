"use client";

import { useState } from "react";
import { LocalizedText } from "@/lib/translation";
import InteractiveStarSelector from "@/components/review/interactive-star-selector";
import { products } from "@/lib/data"; // ← Import des produits réels depuis le catalogue
import FormFeedback from "@/components/shared/ui/form/form-feedback";

// Liste de villes/régions du Cameroun (suggestions)
const CAMEROON_CITIES = [
  "Yaoundé", "Douala", "Garoua", "Bamenda", "Maroua",
  "Bafoussam", "Ngaoundéré", "Bertoua", "Loum", "Kumba",
  "Buea", "Ebolowa", "Foumban", "Mbalmayo", "Bafia",
];

type ReviewFormProps = {
  defaultProduct?: string; // optionnel : nom du produit pré-sélectionné
  onSubmit?: (review: {
    name: string;
    email: string;
    location: string;
    rating: number;
    product: string;
    comment: string;
  }) => void;
};

export default function ReviewForm({
  defaultProduct
}: ReviewFormProps) {
  // Récupérer la liste des noms de produits depuis le catalogue
  const productOptions = products.map((p) => p.name);

  // Définir le produit par défaut (soit la prop, soit le premier produit)
  const initialProduct =
    defaultProduct && productOptions.includes(defaultProduct)
      ? defaultProduct
      : productOptions[0] || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(initialProduct);
  const [comment, setComment] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-text mb-4">
        <LocalizedText>Laisser un avis</LocalizedText>
      </h3>
      <FormFeedback />

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Nom</LocalizedText>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Email (non publié)</LocalizedText>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Champ Localisation */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Ville / Région (Cameroun)</LocalizedText>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            list="cameroon-cities"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="ex: Yaoundé, Douala, Bamenda..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <datalist id="cameroon-cities">
            {CAMEROON_CITIES.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        {/* Sélecteur d'étoiles */}
        <div>
          <span className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Votre note</LocalizedText>
          </span>
          <InteractiveStarSelector value={rating} onChange={setRating} size="md" />
          {/* Champ caché pour transmettre la note */}
          <input type="hidden" name="rating" value={rating} />          
        </div>

        {/* Liste déroulante des produits réels */}
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Produit concerné</LocalizedText>
          </label>
          <select
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {productOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Votre commentaire</LocalizedText>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accept"
            name="accept"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
          />
          <label htmlFor="accept" className="text-sm text-text-muted">
            <LocalizedText>J'accepte les conditions d'utilisation</LocalizedText>
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer star-pulse w-full md:w-auto px-6 py-2.5 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          <LocalizedText>Soumettre mon avis</LocalizedText>
        </button>
      </form>
    </div>
  );
}