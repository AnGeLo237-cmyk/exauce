"use client";

import { LocalizedText } from "@/lib/translation";

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
  clock: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  whatsapp: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

// Les 2 hubs principaux
const HUBS = [
  {
    city: "Shanghai",
    country: "Chine",
    role: "Siège & centre d'approvisionnement",
    address: "Pudong New Area, Shanghai",
    phone: "+86 21 6888 8888",
    hours: "Lun - Sam · 9h - 18h (CST)",
    accentColor: "from-red-500/20 to-red-500/0",
  },
  {
    city: "Dubaï",
    country: "Émirats Arabes Unis",
    role: "Hub logistique & commercial",
    address: "Business Bay, Dubaï",
    phone: "+971 4 555 5555",
    hours: "Dim - Ven · 9h - 18h (GST)",
    accentColor: "from-amber-500/20 to-amber-500/0",
  },
];

// Contacts globaux
const GLOBAL_CONTACTS = {
  email: "exaucechristy@gmail.com",
  whatsapp: "+1 (867) 467-6843",
  tollFree: "0897 413 997",
};

export default function ContactInfoCard() {
  return (
    <div className="space-y-5">
      {/* Bandeau contacts globaux */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary text-white p-6 shadow-lg">
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-6 bg-white/60 rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">
              <LocalizedText>Contact direct</LocalizedText>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email */}
            <a
              href={`mailto:${GLOBAL_CONTACTS.email}`}
              className="group flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                {Icons.email("w-4 h-4")}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                  <LocalizedText>Email</LocalizedText>
                </p>
                <p className="text-xs text-white font-medium truncate group-hover:text-white">
                  {GLOBAL_CONTACTS.email}
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${GLOBAL_CONTACTS.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                {Icons.whatsapp("w-4 h-4")}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                  <LocalizedText>WhatsApp</LocalizedText>
                </p>
                <p className="text-xs text-white font-medium truncate">
                  {GLOBAL_CONTACTS.whatsapp}
                </p>
              </div>
            </a>

            {/* Numéro gratuit */}
            <div className="group flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                {Icons.phone("w-4 h-4")}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                  <LocalizedText>Numéro gratuit</LocalizedText>
                </p>
                <p className="text-xs text-white font-medium truncate">
                  {GLOBAL_CONTACTS.tollFree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Titre hubs */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          {Icons.address("w-4 h-4")}
        </div>
        <div>
          <h3 className="text-sm font-bold text-text uppercase tracking-wider">
            <LocalizedText>Nos bureaux</LocalizedText>
          </h3>
          <p className="text-xs text-text-muted">
            <LocalizedText>02 bureaux internationaux</LocalizedText>
          </p>
        </div>
      </div>

      {/* Hubs en cartes verticales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HUBS.map((hub) => (
          <div
            key={hub.city}
            className="group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Bandeau supérieur avec drapeau */}
            <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${hub.accentColor} pointer-events-none`} />

            <div className="relative p-5">
              {/* En-tête : drapeau + ville */}
              <div className="flex items-center gap-3 mb-4">
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-text truncate">
                    <LocalizedText>{hub.city}</LocalizedText>
                  </h4>
                  <p className="text-xs text-text-muted truncate">
                    <LocalizedText>{hub.country}</LocalizedText>
                  </p>
                </div>
              </div>

              {/* Rôle en badge */}
              <div className="inline-block mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  <LocalizedText>{hub.role}</LocalizedText>
                </span>
              </div>

              {/* Détails */}
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border text-text-muted shrink-0 mt-0.5">
                    {Icons.address("w-3.5 h-3.5")}
                  </span>
                  <span className="text-text-muted leading-tight">
                    <LocalizedText>{hub.address}</LocalizedText>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border text-text-muted shrink-0 mt-0.5">
                    {Icons.phone("w-3.5 h-3.5")}
                  </span>
                  <a
                    href={`tel:${hub.phone.replace(/\s/g, "")}`}
                    className="text-primary hover:text-primary-hover font-medium leading-tight transition-colors"
                  >
                    {hub.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border text-text-muted shrink-0 mt-0.5">
                    {Icons.clock("w-3.5 h-3.5")}
                  </span>
                  <span className="text-text-muted leading-tight">
                    <LocalizedText>{hub.hours}</LocalizedText>
                  </span>
                </li>
              </ul>
            </div>

            {/* Barre inférieure décorative */}
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </div>
  );
}