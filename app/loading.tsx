// app/loading.tsx
import { Car, Sofa, Refrigerator } from "lucide-react";
import { LanguageProvider, LocalizedText } from "@/lib/translation";

export default function Loading() {
  // Les trois catégories tournent en boucle
  const icons = [Car, Sofa, Refrigerator];

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        {/* Halo lumineux en arrière-plan */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative flex flex-col items-center space-y-8">
          {/* Anneau tournant avec les 3 icônes */}
          <div className="relative w-40 h-40">
            {/* Cercle externe en rotation */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30 animate-spin-slow" />

            {/* Cercle interne pulsant */}
            <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping-slow" />

            {/* Les 3 icônes réparties sur l'anneau */}
            {icons.map((Icon, index) => {
              const angle = (index / icons.length) * 360;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 flex items-center justify-center rounded-full bg-surface border border-border shadow-md"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-70px) rotate(-${angle}deg)`,
                    animation: `float 2.4s ease-in-out infinite`,
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              );
            })}

            {/* Icône centrale pulsante */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 animate-bounce-soft">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-text">
              <LocalizedText>Chargement de la boutique...</LocalizedText>
            </p>
            <p className="text-sm text-text-muted">
              <LocalizedText>Vos produits arrivent dans un instant</LocalizedText>
            </p>
          </div>

          {/* Barres squelettes simulant le chargement des produits */}
          <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md px-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-surface border border-border overflow-hidden"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="h-16 bg-gradient-to-r from-border via-border/60 to-border bg-[length:200%_100%] animate-shimmer-skeleton" />
                <div className="p-2 space-y-1">
                  <div className="h-2 bg-border rounded w-3/4 animate-shimmer-skeleton" />
                  <div className="h-2 bg-border rounded w-1/2 animate-shimmer-skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations CSS personnalisées */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(-70px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-78px) rotate(var(--rot, 0deg)); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 1.6s ease-in-out infinite;
        }
        @keyframes shimmer-skeleton {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer-skeleton {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer-skeleton 1.8s ease-in-out infinite;
        }
      `}</style>
    </LanguageProvider>
  );
}