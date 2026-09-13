"use client";

import { LocalizedText } from "@/lib/translation";
import { Icons } from "@/components/shared/ui/icons"; // réutilisation des icônes existantes
import { CardReveal } from "../shared/ux/animations";

export default function PaymentInfo() {
  const paymentMethods = [
    {
      icon: "cash",
      title: "Paiement en plusieurs tranches",
      description: "Échelonnez selon accord avec le vendeur.",
    },
    {
      icon: "card",
      title: "Avance avant livraison",
      description: "Une avance peut être demandée pour réserver le produit.",
    },
    {
      icon: "mobile",
      title: "Mobile Money",
      description: "MTN Mobile Money, Orange Money.",
    },
    {
      icon: "bank",
      title: "Virement bancaire",
      description: "Virement sur nos comptes partenaires.",
    },
  ];

  return (
    <div className="bg-surface border border-border p-8 shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-text text-center mb-2">
        <LocalizedText>Modalités de paiement flexibles</LocalizedText>
      </h2>
      <p className="text-center text-text-muted mb-8">
        <LocalizedText>Plusieurs options adaptées à vos besoins.</LocalizedText>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method, index) => (
          <CardReveal key={method.icon} index={index} delay={400}>
          <div
            key={method.title}
            className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-sm transition-all"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              {Icons[method.icon as keyof typeof Icons]("w-7 h-7")}
            </div>
            <div>
              <p className="font-semibold text-text text-lg">
                <LocalizedText>{method.title}</LocalizedText>
              </p>
              <p className="text-sm text-text-muted mt-1">
                <LocalizedText>{method.description}</LocalizedText>
              </p>
            </div>
          </div>
          </CardReveal>
        ))}
      </div>
    </div>
  );
}