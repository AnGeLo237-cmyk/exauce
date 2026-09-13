"use client";

import { useState } from "react";
import { LocalizedText, useClientTranslation } from "@/lib/translation";
import FormFeedback from "@/components/shared/ui/form/form-feedback";

type ContactFormProps = {
  onSubmit?: (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
};

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Question sur un produit");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);

  // Traductions pour les placeholders
  const { translated: namePlaceholder } = useClientTranslation("Votre nom complet");
  const { translated: emailPlaceholder } = useClientTranslation("votre.email@exemple.com");
  const { translated: messagePlaceholder } = useClientTranslation("Écrivez votre message ici...");

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-text mb-4">
        <LocalizedText>Envoyez-nous un message</LocalizedText>
      </h3>
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
            <option value="Question sur un produit"><LocalizedText>Question sur un produit</LocalizedText></option>
            <option value="Demande de devis"><LocalizedText>Demande de devis</LocalizedText></option>
            <option value="Service après-vente"><LocalizedText>Service après-vente</LocalizedText></option>
            <option value="Autre"><LocalizedText>Autre</LocalizedText></option>
          </select>
        </div>

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