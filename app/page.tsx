'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Composants de la page avec lazy loading
const HeroSection = dynamic(() => import('@/components/home/hero'));
const BestProducts = dynamic(() => import('@/components/home/best-products'));
const Categories = dynamic(() => import('@/components/home/categories'));
const WhyUs = dynamic(() => import('@/components/home/why-us'));
const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'));
const Review = dynamic(() => import('@/components/home/reviews'));

// Composant d'animation générique
function AnimatedSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Chaque section est encapsulée dans AnimatedSection avec un délai croissant */}
        <AnimatedSection delay={0}>
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <BestProducts />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Categories />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <WhyUs />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <HowItWorks />
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <Review />
        </AnimatedSection>
      </main>
    </>
  );
}