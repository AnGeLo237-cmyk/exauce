"use client";

import { useEffect } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaeyalnd"; // Votre endpoint

export default function GlobalFormHandler() {
  useEffect(() => {
    const handleSubmit = async (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.hasAttribute("data-no-formspree")) return;

      event.preventDefault(); // Empêche la soumission native

      const formData = new FormData(form);
      const data: Record<string, any> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Formulaire envoyé avec succès");
          window.dispatchEvent(new CustomEvent("formspree:success", { detail: { form } }));
          form.reset();
        } else {
          console.error("Erreur lors de l'envoi");
          window.dispatchEvent(new CustomEvent("formspree:error", { detail: { form, error: response.statusText } }));
        }
      } catch (error) {
        console.error("Erreur réseau", error);
        window.dispatchEvent(new CustomEvent("formspree:error", { detail: { form, error } }));
      }
    };

    // Écoute en phase de capture pour intercepter avant les handlers des formulaires
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}