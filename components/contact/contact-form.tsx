"use client";

import { useState } from "react";
import { LocalizedText, useClientTranslation } from "@/lib/translation";
import FormFeedback from "@/components/shared/ui/form/form-feedback";

// Les 12 pays de vente + Autre
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
  "Autre",
];

// Sujets enrichis pour le contexte international
const SUBJECTS = [
  "Question sur un produit",
  "Demande de devis",
  "Suivi de commande internationale",
  "Service après-vente",
  "Devenir partenaire / revendeur",
  "Autre",
];

type ContactFormProps = {
  onSubmit?: (formData: {
    name: string;
    email: string;
    country: string;
    subject: string;
    message: string;
  }) => void;
};

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(SALE_COUNTRIES[0]);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  const { translated: namePlaceholder } = useClientTranslation("Votre nom complet");
  const { translated: emailPlaceholder } = useClientTranslation("votre.email@exemple.com");
  const { translated: messagePlaceholder } = useClientTranslation("Écrivez votre message ici...");

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-text mb-2">
        <LocalizedText>Envoyez-nous un message</LocalizedText>
      </h3>
      <p className="text-sm text-text-muted mb-4">
        <LocalizedText>
          Notre équipe internationale vous répond sous 24-48h.
        </LocalizedText>
      </p>
      <FormFeedback />

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Nom complet</LocalizedText>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={namePlaceholder}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1">
              <LocalizedText>Email</LocalizedText>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailPlaceholder}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Pays */}
        <div>
          <label htmlFor="contact-country" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Pays</LocalizedText>
          </label>
          <select
            id="contact-country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {SALE_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c === "Autre" ? (
                  <LocalizedText>Autre pays</LocalizedText>
                ) : (
                  c
                )}
              </option>
            ))}
          </select>
        </div>

        {/* Sujet */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Sujet</LocalizedText>
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                <LocalizedText>{s}</LocalizedText>
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1">
            <LocalizedText>Message</LocalizedText>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={messagePlaceholder}
            rows={5}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Acceptation */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="contact-accept"
            name="accept"
            checked={accepted}
            required
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary/50 rounded"
          />
          <label htmlFor="contact-accept" className="text-sm text-text-muted">
            <LocalizedText>J'accepte que mes données soient utilisées pour me répondre.</LocalizedText>
          </label>
        </div>

        <button
          type="submit"
          className="cursor-pointer star-pulse w-full md:w-auto px-6 py-2.5 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          <LocalizedText>Envoyer le message</LocalizedText>
        </button>
      </form>
    </div>
  );
}