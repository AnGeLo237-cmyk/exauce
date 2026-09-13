"use client";

import { LocalizedText } from "@/lib/translation";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-text">
        <LocalizedText>{title}</LocalizedText>
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-text-muted max-w-2xl mx-auto">
          <LocalizedText>{subtitle}</LocalizedText>
        </p>
      )}
    </div>
  );
}