"use client";

import { useState, useMemo } from "react";
import { LocalizedText } from "@/lib/translation";
import SectionTitle from "@/components/faq/section-title";
import CategoryTabs from "@/components/faq/category-tabs";
import Link from "next/link";
import { SlideLeft, ZoomIn, SlideUp, SlideRight, BounceIn, FadeIn, CardReveal } from "@/components/shared/ux/animations";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
  links?: { href: string; label: string }[];
};

const categories = ["Toutes", "Général", "Paiement", "Livraison & Retrait", "Produits & Après-vente"];

const faqData: FaqItem[] = [
  {
    category: "Général",
    question: "Qu'est-ce que Exaucé ?",
    answer: "Nous sommes une boutique en ligne camerounaise spécialisée dans la vente de voitures, meubles et appareils électroménagers. Nous combinons un catalogue en ligne avec un accompagnement personnalisé.",
    links: [{ href: "/catalogue", label: "Voir le catalogue" }],
  },
  {
    category: "Général",
    question: "Vos produits sont-ils neufs ou d'occasion ?",
    answer: "Nous proposons les deux : des véhicules d'occasion importés et contrôlés, ainsi que des meubles et électroménagers neufs. Chaque fiche produit précise l'état exact.",
  },
  {
    category: "Général",
    question: "Comment être sûr de la qualité des produits ?",
    answer: "Tous nos produits sont inspectés avant publication. Pour les voitures, un rapport de contrôle est disponible sur demande. Nous offrons une garantie minimale de 12 mois sur les électroménagers.",
  },
  {
    category: "Paiement",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Vous pouvez payer en espèces lors d'un rendez-vous physique, ou par Mobile Money (MTN Mobile Money, Orange Money). Le virement bancaire est également possible pour les grosses sommes.",
  },
  {
    category: "Paiement",
    question: "Puis-je payer en plusieurs tranches ?",
    answer: "Oui, pour les produits dépassant un certain montant (ex : 500 000 FCFA), un paiement échelonné peut être convenu avec le vendeur. Une avance est généralement demandée avant la livraison.",
  },
  {
    category: "Paiement",
    question: "Une avance est-elle obligatoire avant la livraison ?",
    answer: "Pour les commandes avec livraison, une avance de 30% à 50% peut être demandée. Pour un retrait en showroom, le paiement intégral se fait sur place.",
  },
  {
    category: "Paiement",
    question: "Le paiement par Mobile Money est-il sécurisé ?",
    answer: "Oui, nous utilisons les numéros officiels de l'entreprise. Un reçu vous est envoyé après chaque transaction.",
  },
  {
    category: "Livraison & Retrait",
    question: "Livrez-vous partout au Cameroun ?",
    answer: "Oui, nous livrons dans toutes les grandes villes (Douala, Yaoundé, Bafoussam, Garoua, etc.). Les frais varient selon la localisation et le type de produit.",
  },
  {
    category: "Livraison & Retrait",
    question: "Quels sont les délais de livraison ?",
    answer: "Pour les meubles et électroménagers : 2 à 5 jours ouvrés. Pour les voitures : 7 à 14 jours après validation et paiement de l'avance.",
  },
  {
    category: "Livraison & Retrait",
    question: "Puis-je venir voir le produit avant d'acheter ?",
    answer: "Absolument. Nous vous encourageons à prendre rendez-vous dans notre showroom à Douala. Pour les clients éloignés, nous pouvons faire une visioconférence.",
    links: [{ href: "/contact", label: "Prendre rendez-vous" }],
  },
  {
    category: "Produits & Après-vente",
    question: "Proposez-vous une garantie sur les véhicules d'occasion ?",
    answer: "Oui, une garantie de 3 à 6 mois est incluse sur le moteur et la boîte de vitesses pour la plupart des véhicules.",
  },
  {
    category: "Produits & Après-vente",
    question: "Que faire si le produit reçu est défectueux ?",
    answer: "Contactez notre service après-vente sous 48h. Pour les électroménagers, un échange ou une réparation est proposé. Pour les meubles, un remplacement des pièces endommagées est possible.",
    links: [{ href: "/contact", label: "Contacter le SAV" }],
  },
  {
    category: "Produits & Après-vente",
    question: "Puis-je retourner un article qui ne me convient pas ?",
    answer: "Pour les produits neufs non déballés, vous disposez de 7 jours après réception. Les frais de retour restent à la charge du client, sauf erreur de notre part.",
  },
  {
    category: "Produits & Après-vente",
    question: "Comment se passe le suivi après la livraison ?",
    answer: "Nous vous contactons sous 72h pour vérifier que tout s'est bien passé. Vous pouvez également laisser un avis sur la fiche produit.",
    links: [{ href: "/avis-clients", label: "Laisser un avis" }],
  },
  {
    category: "Produits & Après-vente",
    question: "Comment contacter le service client ?",
    answer: "Par téléphone, WhatsApp, formulaire de contact ou en visitant notre showroom. Nos coordonnées sont sur la page Contact.",
    links: [{ href: "/contact", label: "Page Contact" }],
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <span className="font-medium text-text">
                    <LocalizedText>{item.question}</LocalizedText>
                  </span>
                  <svg
                    className={`w-5 h-5 text-text-muted transition-transform ${
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
        <ZoomIn>
        <div className="mt-12 text-center bg-surface border border-border rounded-lg p-6 ">
          <h3 className="text-lg font-semibold text-text mb-2">
            <LocalizedText>Vous ne trouvez pas votre réponse ?</LocalizedText>
          </h3>
          <p className="text-sm text-text-muted mb-4">
            <LocalizedText>Notre équipe est là pour vous aider.</LocalizedText>
          </p>
          <Link
            href="/contact"
            className=" star-pulse inline-block px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
          >
            <LocalizedText>Nous contacter</LocalizedText>
          </Link>
        </div>
        </ZoomIn>
      </div>
    </div>
  );
}