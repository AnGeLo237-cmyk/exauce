"use client";

import { useState, useMemo } from "react";
import { LocalizedText } from "@/lib/translation";
import SectionTitle from "@/components/faq/section-title";
import CategoryTabs from "@/components/faq/category-tabs";
import Link from "next/link";
import {
  ZoomIn,
  FadeIn,
} from "@/components/shared/ux/animations";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
  links?: { href: string; label: string }[];
};

// Catégories mises à jour : ajout de "Importation & International"
const categories = [
  "Toutes",
  "Général",
  "Importation & International",
  "Paiement",
  "Livraison & Retrait",
  "Produits & Après-vente",
];

const faqData: FaqItem[] = [
  // ======================================================
  // GÉNÉRAL (3)
  // ======================================================
  {
    category: "Général",
    question: "Qu'est-ce que Exaucé ?",
    answer:
      "Exaucé est une entreprise camerounaise spécialisée dans la vente de voitures, meubles et appareils électroménagers importés de Chine et de Turquie. Nous servons nos clients au Cameroun, en RDC, en Guinée Conakry, au Congo Brazzaville, au Gabon, en Haïti, au Sénégal, au Burkina Faso, en Côte d'Ivoire, au Tchad, au Togo et au Mali.",
    links: [{ href: "/catalogue", label: "Voir le catalogue" }],
  },
  {
    category: "Général",
    question: "Vos produits sont-ils neufs ou d'occasion ?",
    answer:
      "Nous proposons les deux. Nos véhicules sont majoritairement d'occasion mais rigoureusement contrôlés avant importation depuis la Chine ou la Turquie. Nos meubles et électroménagers sont neufs. Chaque fiche produit précise l'état exact.",
  },
  {
    category: "Général",
    question: "Comment être sûr de la qualité des produits ?",
    answer:
      "Tous nos produits sont inspectés par nos partenaires en Chine et en Turquie avant expédition, puis revérifiés à réception. Pour les voitures, un rapport de contrôle est disponible sur demande. Nous offrons une garantie minimale de 12 mois sur les électroménagers.",
  },

  // ======================================================
  // IMPORTATION & INTERNATIONAL (8 nouvelles)
  // ======================================================
  {
    category: "Importation & International",
    question: "D'où viennent vos produits ?",
    answer:
      "Nos produits sont importés directement de Chine et de Turquie, où nous avons des partenaires de confiance qui garantissent leur authenticité et leur qualité. Cette double source nous permet de proposer un large choix à des prix compétitifs.",
  },
  {
    category: "Importation & International",
    question: "Comment se passe l'importation depuis la Chine et la Turquie ?",
    answer:
      "Nous gérons l'intégralité du processus : sélection des fournisseurs, contrôle qualité, fret maritime ou aérien, dédouanement et livraison dans votre pays. Vous n'avez rien à faire, nous nous occupons de tout.",
  },
  {
    category: "Importation & International",
    question: "Dans quels pays vendez-vous vos produits ?",
    answer:
      "Nous vendons et livrons dans 12 pays : Cameroun, RDC, Guinée Conakry, Congo Brazzaville, Gabon, Haïti, Sénégal, Burkina Faso, Côte d'Ivoire, Tchad, Togo et Mali. Si vous êtes dans un autre pays, contactez-nous pour étudier la faisabilité.",
    links: [{ href: "/contact", label: "Nous contacter" }],
  },
  {
    category: "Importation & International",
    question: "Puis-je commander depuis un autre pays que ceux listés ?",
    answer:
      "Oui, sur demande. Contactez notre équipe pour étudier les modalités de livraison dans votre pays. Des frais supplémentaires peuvent s'appliquer selon la destination.",
    links: [{ href: "/contact", label: "Faire une demande" }],
  },
  {
    category: "Importation & International",
    question: "Y a-t-il des frais de douane à prévoir ?",
    answer:
      "Les frais de douane varient selon le pays de destination et le type de produit. Ils sont généralement inclus dans le prix affiché pour les pays de vente habituels. Pour les autres destinations, contactez-nous pour un devis détaillé.",
  },
  {
    category: "Importation & International",
    question: "Avez-vous des partenaires locaux dans mon pays ?",
    answer:
      "Oui, nous travaillons avec des partenaires locaux dans chacun de nos pays de vente pour assurer la livraison, l'installation et le service après-vente. Vous êtes donc toujours accompagné, même à distance.",
  },
  {
    category: "Importation & International",
    question: "Les produits sont-ils adaptés aux normes de mon pays ?",
    answer:
      "Oui. Nous vérifions les normes techniques, électriques et de sécurité de chaque pays avant expédition. Si un produit nécessite une adaptation spécifique, nous le signalons dans la fiche produit.",
  },
  {
    category: "Importation & International",
    question: "Comment suivre l'acheminement de ma commande internationale ?",
    answer:
      "Dès l'expédition, vous recevez un numéro de suivi. Notre équipe vous informe à chaque étape clé : départ du fournisseur, arrivée au port, dédouanement et livraison finale.",
  },

  // ======================================================
  // PAIEMENT (5)
  // ======================================================
  {
    category: "Paiement",
    question: "Quels modes de paiement acceptez-vous ?",
    answer:
      "Selon votre pays, nous acceptons les espèces (en présentiel), Mobile Money (MTN MoMo, Orange Money, Wave, Moov Money selon la disponibilité locale) et le virement bancaire pour les grosses sommes.",
  },
  {
    category: "Paiement",
    question: "Puis-je payer en plusieurs tranches ?",
    answer:
      "Oui, pour les produits dépassant un certain montant (à partir de 500 000 FCFA ou équivalent), un paiement échelonné peut être convenu. Une avance est généralement demandée avant l'expédition.",
  },
  {
    category: "Paiement",
    question: "Une avance est-elle obligatoire avant la livraison ?",
    answer:
      "Pour les livraisons internationales, une avance de 30% à 50% est requise pour lancer l'importation. Pour un retrait en showroom à Douala, le paiement intégral se fait sur place.",
  },
  {
    category: "Paiement",
    question: "Le paiement par Mobile Money est-il sécurisé ?",
    answer:
      "Oui. Nous utilisons des numéros officiels enregistrés au nom de l'entreprise. Un reçu vous est systématiquement envoyé après chaque transaction, et notre service client est joignable pour toute vérification.",
  },
  {
    category: "Paiement",
    question: "Acceptez-vous les cartes bancaires ?",
    answer:
      "Pour le moment, nous acceptons principalement les espèces et le Mobile Money. Le virement bancaire reste possible pour les grosses transactions. Le paiement par carte en ligne sera bientôt disponible.",
  },

  // ======================================================
  // LIVRAISON & RETRAIT (3)
  // ======================================================
  {
    category: "Livraison & Retrait",
    question: "Livrez-vous partout en Afrique et dans la Caraïbe ?",
    answer:
      "Oui, nous livrons dans les 12 pays où nous sommes présents : Cameroun, RDC, Guinée Conakry, Congo Brazzaville, Gabon, Haïti, Sénégal, Burkina Faso, Côte d'Ivoire, Tchad, Togo et Mali. Les frais et délais varient selon la destination et le type de produit.",
  },
  {
    category: "Livraison & Retrait",
    question: "Quels sont les délais de livraison ?",
    answer:
      "Au Cameroun : 2 à 5 jours ouvrés pour les meubles et électroménagers, 7 à 14 jours pour les voitures. Pour les autres pays : 2 à 4 semaines selon la destination et le mode de transport (maritime ou aérien).",
  },
  {
    category: "Livraison & Retrait",
    question: "Puis-je venir voir le produit avant d'acheter ?",
    answer:
      "Oui. Notre showroom est à Douala, au Cameroun. Pour les clients éloignés, nous proposons une visite virtuelle en visioconférence avec photos et vidéos détaillées du produit.",
    links: [{ href: "/contact", label: "Prendre rendez-vous" }],
  },

  // ======================================================
  // PRODUITS & APRÈS-VENTE (4)
  // ======================================================
  {
    category: "Produits & Après-vente",
    question: "Proposez-vous une garantie sur les véhicules d'occasion ?",
    answer:
      "Oui, une garantie de 3 à 6 mois est incluse sur le moteur et la boîte de vitesses pour la plupart des véhicules, dans tous nos pays de vente.",
  },
  {
    category: "Produits & Après-vente",
    question: "Que faire si le produit reçu est défectueux ?",
    answer:
      "Contactez notre service après-vente sous 48h. Grâce à nos partenaires locaux, nous organisons un échange, une réparation ou le remplacement des pièces endommagées selon le cas.",
    links: [{ href: "/contact", label: "Contacter le SAV" }],
  },
  {
    category: "Produits & Après-vente",
    question: "Puis-je retourner un article qui ne me convient pas ?",
    answer:
      "Pour les produits neufs non déballés, vous disposez de 7 jours après réception. Les frais de retour restent à votre charge, sauf en cas d'erreur de notre part. Les véhicules ne sont pas éligibles au retour.",
  },
  {
    category: "Produits & Après-vente",
    question: "Comment se passe le suivi après la livraison ?",
    answer:
      "Nous vous contactons sous 72h pour vérifier votre satisfaction. Vous pouvez également laisser un avis sur la fiche produit pour aider les futurs clients.",
    links: [{ href: "/avis-clients", label: "Laisser un avis" }],
  },
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    let result = [...faqData];

    if (activeCategory !== "Toutes") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term)
      );
    }

    return result;
  }, [searchTerm, activeCategory]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ZoomIn delay={200}>
          <SectionTitle
            title="Foire Aux Questions"
            subtitle="Tout ce que vous devez savoir avant d'acheter chez nous."
          />
        </ZoomIn>

        {/* Barre de recherche */}
        <ZoomIn delay={400}>
          <div className="relative mb-8">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-border bg-background pl-10 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </ZoomIn>

        {/* Onglets de catégories */}
        <ZoomIn delay={600}>
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
          />
        </ZoomIn>

        {/* Compteur de résultats */}
        <ZoomIn delay={800}>
          <p className="text-sm text-text-muted mb-6 text-center">
            {filteredFaqs.length}{" "}
            <LocalizedText>
              {filteredFaqs.length > 1 ? "questions trouvées" : "question trouvée"}
            </LocalizedText>
          </p>
        </ZoomIn>

        {/* Liste des questions */}
        <ZoomIn delay={1000}>
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium text-text pr-2">
                      <LocalizedText>{item.question}</LocalizedText>
                    </span>
                    <svg
                      className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-sm text-text-muted leading-relaxed">
                      <LocalizedText>{item.answer}</LocalizedText>
                      {item.links && item.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-4">
                          {item.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              href={link.href}
                              className="text-primary hover:text-primary-hover underline"
                            >
                              <LocalizedText>{link.label}</LocalizedText>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted">
              <LocalizedText>Aucune question ne correspond à votre recherche.</LocalizedText>
            </p>
          )}
        </ZoomIn>

        {/* Bloc d'aide supplémentaire */}
        <FadeIn delay={1200}>
          <div className="mt-12 text-center bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-2">
              <LocalizedText>Vous ne trouvez pas votre réponse ?</LocalizedText>
            </h3>
            <p className="text-sm text-text-muted mb-4">
              <LocalizedText>Notre équipe est là pour vous aider.</LocalizedText>
            </p>
            <Link
              href="/contact"
              className="star-pulse inline-block px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              <LocalizedText>Nous contacter</LocalizedText>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}