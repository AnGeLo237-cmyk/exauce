"use client";

import { LocalizedText } from "@/lib/translation";

type ContactInfoCardProps = {
  type: "address" | "phone" | "email";
};

// Icônes SVG internes
const Icons = {
  address: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

export default function ContactInfoCard({ type }: ContactInfoCardProps) {
  const info = {
    address: {
      icon: Icons.address,
      label: "Adresse",
      value: "Dubaï (émirat arabe unis)",
    },
    phone: {
      icon: Icons.phone,
      label: "Téléphone",
      value: "0897 413 997, +1 (867) 467-6843",
    },
    email: {
      icon: Icons.email,
      label: "Email",
      value: " exaucechristy@gmail.com",
    },
  }[type];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex items-start gap-4">
      <div className="star-pulse flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
        {info.icon("w-6 h-6")}
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
          <LocalizedText>{info.label}</LocalizedText>
        </h3>
        <p className="mt-1 text-text font-medium">
          <LocalizedText>{info.value}</LocalizedText>
        </p>
      </div>
    </div>
  );
}