"use client";

import { LocalizedText } from "@/lib/translation";

export default function MapEmbed() {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="flex flex-col items-center justify-center h-64 bg-[var(--color-secondary)]/5 relative">
        {/* Icône de localisation */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <p className="text-text font-medium text-center px-4">
          <LocalizedText>Notre localisation</LocalizedText>
        </p>
        <p className="text-sm text-text-muted text-center px-4 mt-1">
          <LocalizedText>
            Dubaï (émirat arabe unis)
          </LocalizedText>
        </p>
        <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-primary/20 rounded-lg" />
      </div>
    </div>
  );
}