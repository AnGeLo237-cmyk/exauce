// app/page.tsx
// ✅ Server Component — meilleur SEO et bundle JS réduit
import dynamic from "next/dynamic";
import { AnimatedSection } from "@/components/shared/ux/animations";

// ----------------------------------------------------------------
// Lazy loading des sections
// ----------------------------------------------------------------
const HeroSection = dynamic(() => import("@/components/home/hero"));
const Categories = dynamic(() => import("@/components/home/categories"));
const CountriesServed = dynamic(
  () => import("@/components/home/countries-served")
);
const BestProducts = dynamic(() => import("@/components/home/best-products"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const WhyUs = dynamic(() => import("@/components/home/why-us"));
const Review = dynamic(() => import("@/components/home/reviews"));

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/*
        Hero — volontairement non animé.
        Il contient le LCP (Largest Contentful Paint).
        L'animer retarderait son affichage et dégraderait PageSpeed.
      */}
      <HeroSection />

      <AnimatedSection delay={50}>
        <Categories />
      </AnimatedSection>

      <AnimatedSection delay={150}>
        <BestProducts />
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection delay={250}>
        <WhyUs />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <CountriesServed />
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <Review />
      </AnimatedSection>
    </main>
  );
}