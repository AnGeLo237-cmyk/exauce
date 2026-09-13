"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

// ==================================================================
// TYPES PARTAGÉS
// ==================================================================
// Toutes les animations réutilisent la même structure de props :
//
// - children : le contenu à animer (texte, image, carte, section entière).
// - delay    : délai en millisecondes AVANT le début de l'animation.
//              Utile pour créer un effet "cascade" entre plusieurs éléments.
// - threshold: pourcentage de l'élément qui doit être visible à l'écran
//              pour déclencher l'animation (0 = à peine visible, 1 = totalement visible).
// - className: classes supplémentaires pour ajuster les marges, tailles, etc.
// ==================================================================
type AnimationProps = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
};

// ==================================================================
// HOOK useInView — détecte quand un élément entre dans le viewport
// ==================================================================
/**
 * Ce hook personnalisé utilise l'API IntersectionObserver du navigateur
 * pour savoir si un élément est visible à l'écran.
 *
 * FONCTIONNEMENT :
 *  1. On attache une "ref" à l'élément qu'on veut surveiller.
 *  2. L'observateur surveille cet élément.
 *  3. Dès que l'élément devient visible (entry.isIntersecting === true),
 *     on met `isVisible` à true et on arrête d'observer (pour éviter
 *     que l'animation ne se rejoue à chaque scroll).
 *
 * EXEMPLE D'UTILISATION DIRECTE (si vous voulez créer votre propre animation) :
 *
 *   const { ref, isVisible } = useInView({ threshold: 0.3 });
 *   return (
 *     <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>
 *       Mon contenu
 *     </div>
 *   );
 */
function useInView(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // ← animation jouée une seule fois
        }
      },
      { threshold: 0.1, ...options }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}

// ==================================================================
// 1. FadeIn — Apparition simple en fondu avec léger mouvement vertical
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour des blocs de texte (paragraphes, titres).
 *  - Pour des sections entières au scroll.
 *  - Effet discret, idéal pour ne pas distraire l'utilisateur.
 *
 * EXEMPLES :
 *   // Simple
 *   <FadeIn><h1>Bienvenue</h1></FadeIn>
 *
 *   // Avec délai (démarre 300ms après l'entrée dans le viewport)
 *   <FadeIn delay={300}><p>Contenu secondaire</p></FadeIn>
 *
 *   // Déclenché seulement quand 50% de l'élément est visible
 *   <FadeIn threshold={0.5}><div>Carte importante</div></FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 2. ZoomIn — Entrée avec mise à l'échelle (grossit depuis 85%)
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour des images produit qui doivent attirer l'œil.
 *  - Pour des icônes ou badges de certification.
 *  - Pour des call-to-action mis en avant.
 *
 * EXEMPLES :
 *   // Image produit
 *   <ZoomIn>
 *     <Image src="/images/produit.jpg" alt="Produit" />
 *   </ZoomIn>
 *
 *   // Badge qui grossit après 200ms
 *   <ZoomIn delay={200} threshold={0.3}>
 *     <Badge>Nouveau</Badge>
 *   </ZoomIn>
 */
export function ZoomIn({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 3. SlideLeft — Glissement depuis la gauche vers sa position
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour une colonne de gauche dans une mise en page 2 colonnes.
 *  - Pour un menu latéral qui doit apparaître.
 *  - Pour un bloc de texte à côté d'une image à droite.
 *
 * EXEMPLES :
 *   // Deux colonnes : gauche animée, droite statique
 *   <div className="grid grid-cols-2 gap-8">
 *     <SlideLeft><div>Texte gauche</div></SlideLeft>
 *     <div>Image droite</div>
 *   </div>
 *
 *   // Combiné avec SlideRight pour un effet "rencontre"
 *   <SlideLeft delay={0}><Texte /></SlideLeft>
 *   <SlideRight delay={200}><Image /></SlideRight>
 */
export function SlideLeft({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 4. SlideRight — Glissement depuis la droite vers sa position
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Symétrique de SlideLeft, pour la colonne de droite.
 *  - Pour un panneau qui apparaît depuis le bord droit de l'écran.
 *  - Pour une image à côté d'un texte à gauche.
 *
 * EXEMPLES :
 *   // Image à droite qui glisse vers sa place
 *   <SlideRight>
 *     <Image src="/images/hero.jpg" alt="Hero" />
 *   </SlideRight>
 *
 *   // Effet miroir avec SlideLeft
 *   <SlideLeft><Texte /></SlideLeft>
 *   <SlideRight delay={150}><Image /></SlideRight>
 */
export function SlideRight({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 5. SlideUp — Remontée plus prononcée depuis le bas
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour des sections qui arrivent par le bas au scroll.
 *  - Pour des titres ou des blocs de statistiques.
 *  - Effet plus dynamique que FadeIn car le déplacement est plus marqué.
 *
 * EXEMPLES :
 *   // Section qui remonte au scroll
 *   <SlideUp>
 *     <section>Nos chiffres clés</section>
 *   </SlideUp>
 *
 *   // Cascade de plusieurs éléments (stagger manuel)
 *   <SlideUp delay={0}>Élément 1</SlideUp>
 *   <SlideUp delay={100}>Élément 2</SlideUp>
 *   <SlideUp delay={200}>Élément 3</SlideUp>
 */
export function SlideUp({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 6. BounceIn — Entrée rebondissante avec effet élastique
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour des éléments ludiques ou festifs (badges "Promo", "Nouveau").
 *  - Pour des icônes de récompense ou de confirmation.
 *  - À utiliser avec parcimonie pour ne pas surcharger l'interface.
 *
 * FONCTIONNEMENT :
 *  - Utilise une courbe de timing "cubic-bezier" qui simule un rebond.
 *  - La durée (500ms) est plus courte que les autres animations.
 *  - Le scale part de 0 (invisible) pour atteindre 1 (taille normale).
 *
 * EXEMPLES :
 *   // Badge promo
 *   <BounceIn>
 *     <span className="bg-primary text-white px-3 py-1 rounded-full">
 *       -30%
 *     </span>
 *   </BounceIn>
 *
 *   // Icône de validation qui "pop" à l'écran
 *   <BounceIn delay={300} threshold={0.5}>
 *     <CheckCircle className="text-success w-12 h-12" />
 *   </BounceIn>
 */
export function BounceIn({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationProps) {
  const { ref, isVisible } = useInView({ threshold });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      {children}
    </div>
  );
}

// ==================================================================
// 7. CardReveal — Animation en cascade pour des listes de cartes
// ==================================================================
/**
 * QUAND L'UTILISER :
 *  - Pour des grilles de cartes produit, avis, catégories.
 *  - Crée un effet de "vague" grâce au décalage progressif (index * 60ms).
 *  - Chaque carte apparaît l'une après l'autre pour un effet visuel riche.
 *
 * PROPS SPÉCIFIQUES :
 *  - index : position de la carte dans la liste (0, 1, 2, ...).
 *            Le délai est calculé automatiquement : delay + index * 60ms.
 *  - delay : délai de base appliqué à TOUTES les cartes (par défaut 0).
 *
 * FONCTIONNEMENT :
 *  - Le scale part de 0.95 (légèrement plus petit) pour atteindre 1.
 *  - Le translateY part de 30px pour remonter à 0.
 *  - La courbe de timing "cubic-bezier(0.34, 1.56, 0.64, 1)" donne
 *    un léger rebond à la fin de l'animation.
 *
 * EXEMPLES :
 *   // Grille de 3 cartes avec effet cascade
 *   {products.map((product, index) => (
 *     <CardReveal key={product.id} index={index}>
 *       <ProductCard product={product} />
 *     </CardReveal>
 *   ))}
 *
 *   // Avec un délai de base de 200ms + stagger automatique
 *   {reviews.map((review, index) => (
 *     <CardReveal key={review.id} index={index} delay={200}>
 *       <ReviewCard review={review} />
 *     </CardReveal>
 *   ))}
 *
 *   // Pour 4 catégories affichées au scroll
 *   {categories.map((cat, index) => (
 *     <CardReveal key={cat.id} index={index} threshold={0.2}>
 *       <CategoryCard category={cat} />
 *     </CardReveal>
 *   ))}
 */
type CardRevealProps = {
  children: ReactNode;
  delay?: number;
  index?: number;
  threshold?: number;
  className?: string;
};

export function CardReveal({
  children,
  delay = 0,
  index = 0,
  threshold = 0.1,
  className = "",
}: CardRevealProps) {
  const { ref, isVisible } = useInView({ threshold });
  const computedDelay = delay + index * 60; // 60ms d'écart entre chaque carte

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.95)",
        transitionDelay: `${computedDelay}ms`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </div>
  );
}