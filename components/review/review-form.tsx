"use client";

import { useState } from "react";
import { LocalizedText, useClientTranslation } from "@/lib/translation";
import InteractiveStarSelector from "@/components/review/interactive-star-selector";
import { products } from "@/lib/data";
import FormFeedback from "@/components/shared/ui/form/form-feedback";

// Liste des pays de vente
const SALE_COUNTRIES = [
  "Cameroun",
  "RDC",
  "Guinée Conakry",
  "Congo Brazzaville",
  "Gabon",
  "Haïti",
  "Sénégal",
  "Burkina Faso",
  "Côte d'Ivoire",
  "Tchad",
  "Togo",
  "Mali",
];

// Villes principales par pays (pour suggestions)
const CITIES_BY_COUNTRY: Record<string, string[]> = {
  "Cameroun": ["Yaoundé", "Douala", "Garoua", "Bamenda", "Maroua", "Bafoussam", "Ngaoundéré", "Bertoua", "Buea", "Kribi"],
  "RDC": ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kananga", "Goma", "Bukavu", "Kisangani"],
  "Guinée Conakry": ["Conakry", "Nzérékoré", "Kankan", "Kindia", "Labé"],
  "Congo Brazzaville": ["Brazzaville", "Pointe-Noire", "Dolisie", "Owando", "Ouesso"],
  "Gabon": ["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda"],
  "Haïti": ["Port-au-Prince", "Cap-Haïtien", "Gonaïves", "Les Cayes", "Jacmel"],
  "Sénégal": ["Dakar", "Thiès", "Touba", "Saint-Louis", "Kaolack", "Ziguinchor"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora", "Ouahigouya"],
  "Côte d'Ivoire": ["Abidjan", "Bouaké", "Yamoussoukro", "Daloa", "San-Pédro", "Korhogo"],
  "Tchad": ["N'Djamena", "Moundou", "Sarh", "Abéché", "Bongor"],
  "Togo": ["Lomé", "Sokodé", "Kara", "Kpalimé", "Atakpamé"],
  "Mali": ["Bamako", "Sikasso", "Mopti", "Ségou", "Kayes", "Gao"],
};

type ReviewFormProps = {
  defaultProduct?: string;
  onSubmit?: (review: {
    name: string;
    email: string;
    location: string;
    country: string;
    rating: number;
    product: string;
    comment: string;
  }) => void;
};

export default function ReviewForm({ defaultProduct }: ReviewFormProps) {
  const productOptions = products.map((p) => p.name);

  const initialProduct =
    defaultProduct && productOptions.includes(defaultProduct)
      ? defaultProduct
      : productOptions[0] || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(SALE_COUNTRIES[0]);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(initialProduct);
  const [comment, setComment] = useState("");
  const [accepted, setAccepted] = useState(false);

  const { translated: cityPlaceholder } = useClientTranslation(
    "ex: Yaoundé, Kinshasa, Dakar..."
  );

  const availableCities = CITIES_BY_COUNTRY[country] || [];

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

        {/* Pays + Ville */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Pays</LocalizedText>
            </label>
            <select
              id="country"
              name="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setLocation(""); // Réinitialiser la ville quand le pays change
              }}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {SALE_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Ville</LocalizedText>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              list={`cities-${country}`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder={cityPlaceholder}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <datalist id={`cities-${country}`}>
              {availableCities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Sélecteur d'étoiles */}
        <div>
          <span className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Votre note</LocalizedText>
          </span>
          <InteractiveStarSelector value={rating} onChange={setRating} size="md" />
          <input type="hidden" name="rating" value={rating} />
        </div>

        {/* Produit */}
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

        {/* Commentaire */}
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

        {/* Acceptation */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accept"
            name="accept"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            required
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