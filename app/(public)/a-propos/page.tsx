"use client";

import PageHeader from "@/components/about/page-header";
import HistorySection from "@/components/about/history-section";
import ValuesGrid from "@/components/about/values-grid";
import TeamSection from "@/components/about/team-section";
import QualityCommitments from "@/components/about/quality-commitments";
import StatsCounter from "@/components/about/stats-counter";
import CertificationsBadges from "@/components/about/certifications";
import { BounceIn, FadeIn } from "@/components/shared/ux/animations";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn delay={400}><PageHeader /></FadeIn>

        {/* Notre histoire */}
        <HistorySection />

        {/* Nos valeurs */}
        <ValuesGrid />

        {/* Notre équipe */}
        <BounceIn><TeamSection /></BounceIn>

        {/* Engagements qualité */}
        <QualityCommitments />

        {/* Chiffres clés */}
        <BounceIn><StatsCounter /></BounceIn>

        {/* Certifications et liens légaux */}
        <BounceIn><CertificationsBadges /></BounceIn>
      </div>
    </div>
  );
}