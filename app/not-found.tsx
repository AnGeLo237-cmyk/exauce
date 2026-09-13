// app/not-found.tsx
import Link from "next/link";
import { Car, Sofa, Refrigerator, Home, Search } from "lucide-react";
import { LanguageProvider, LocalizedText } from "@/lib/translation";

export default function NotFound() {
  // Produits flottants autour du panier
  const floatingItems = [
    { Icon: Car, delay: 0, left: "10%", top: "20%" },
    { Icon: Sofa, delay: 0.6, left: "80%", top: "15%" },
    { Icon: Refrigerator, delay: 1.2, left: "85%", top: "65%" },
    { Icon: Car, delay: 1.8, left: "15%", top: "70%" },
  ];

  return (
    <LanguageProvider>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 overflow-hidden">
        {/* Grand 404 en filigrane */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20rem] md:text-[28rem] font-black text-primary/5 leading-none">
            404
          </span>
        </div>

        {/* Particules / produits flottants */}
        {floatingItems.map(({ Icon, delay, left, top }, index) => (
          <div
            key={index}
            className="absolute text-primary/20 animate-float-slow"
            style={{
              left,
              top,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon className="w-10 h-10 md:w-16 md:h-16" />
          </div>
        ))}

        {/* Contenu principal */}
        <div className="relative z-10 text-center space-y-6 max-w-lg">
          {/* Panier renversé animé */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center animate-tilt-shake">
              <svg
                className="w-12 h-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            {/* Petit point d'interrogation flottant */}
            <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg animate-bounce-soft">
              ?
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-text">
            <LocalizedText>Oups, cette page s&apos;est perdue en chemin</LocalizedText>
          </h1>

          {/* Description */}
          <p className="text-text-muted">
            <LocalizedText>
              Il semblerait que le produit ou la page que vous recherchez n&apos;existe plus
              ou ait été déplacé. Pas d&apos;inquiétude, tout est encore disponible dans notre
              boutique.
            </LocalizedText>
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
              <LocalizedText>Retour à l&apos;accueil</LocalizedText>
            </Link>
            <Link
              href="/catalogue"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-surface border border-border text-text font-medium hover:bg-primary/10 hover:border-primary/40 transition-all hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <LocalizedText>Explorer le catalogue</LocalizedText>
            </Link>
          </div>

          {/* Aide supplémentaire */}
          <p className="text-xs text-text-muted/70 pt-2">
            <LocalizedText>Besoin d&apos;aide ?</LocalizedText>{" "}
            <Link href="/contact" className="text-primary underline hover:text-primary-hover">
              <LocalizedText>Contactez-nous</LocalizedText>
            </Link>
          </p>
        </div>
      </div>

      {/* Animations CSS personnalisées */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(8deg); opacity: 0.35; }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes tilt-shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        .animate-tilt-shake {
          animation: tilt-shake 3s ease-in-out infinite;
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.08); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 1.6s ease-in-out infinite;
        }
      `}</style>
    </LanguageProvider>
  );
}