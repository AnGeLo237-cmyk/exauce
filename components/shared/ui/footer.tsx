"use client";

import Link from "next/link";
import Image from "next/image";
import { LocalizedText } from "@/lib/translation";
import FormFeedback from "@/components/shared/ui/form/form-feedback";

// Icônes SVG internes (inchangées)
const SVGIcons = {
  facebook: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  instagram: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  send: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  mail: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  arrowUp: (className?: string) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
};

// Données de navigation et catégories
const navigationLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "Avis clients", href: "/avis-clients" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Voitures", href: "/categorie/voitures" },
  { label: "Meubles", href: "/categorie/meubles" },
  { label: "Appareils électroménagers", href: "/categorie/electromenagers" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "X", href: "https://x.com", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];

export default function Footer({ className = "" }: { className?: string }) {

  return (
    <footer className={`bg-[var(--color-secondary)] text-white py-6 ${className}`}>
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] lg:gap-8">
          {/* Section Logo & Marque */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Image
                src="/images/logo.ico"
                alt="Logo"
                width={32}
                height={32}
                className="h-16 w-16 object-cover"
              />
              <div>
                <h2 className="text-lg font-black uppercase italic tracking-tighter text-white">
                  Exaucé
                </h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                  <LocalizedText>L&apos;excellence à portée de clic</LocalizedText>
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              <LocalizedText>
                Découvrez une sélection exclusive de produits tendance.
              </LocalizedText>
            </p>
            {/* <div className="mt-3 flex gap-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 transition-all hover:bg-white hover:text-[var(--color-secondary)]"
                  aria-label={item.label}
                >
                  {SVGIcons[item.icon as keyof typeof SVGIcons]?.("w-3.5 h-3.5")}
                </Link>
              ))}
            </div> */}
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">
              <LocalizedText>Navigation</LocalizedText>
            </h3>
            <ul className="mt-2 space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-white/70 transition-colors hover:text-white"
                  >
                    <LocalizedText>{link.label}</LocalizedText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div className="text-center sm:text-left">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">
              <LocalizedText>Catégories</LocalizedText>
            </h3>
            <ul className="mt-2 space-y-1">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-white/70 transition-colors hover:text-white"
                  >
                    <LocalizedText>{link.label}</LocalizedText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">
              <LocalizedText>Restez informé</LocalizedText>
            </h3>
            <p className="mt-2 text-xs text-white/70">
              <LocalizedText>Recevez nos offres exclusives.</LocalizedText>
            </p>
            <form className="mt-2 flex flex-col gap-2">
              <div className="relative">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40">
                  {SVGIcons.mail("w-3.5 h-3.5")}
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="votre.email@exemple.com"
                  required
                  className="w-full rounded-md border border-white/10 bg-white/5 py-1.5 pl-8 pr-2 text-xs outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                />
              </div>
              <button
                type="submit"
                className="star-pulse cursor-pointer flex items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-secondary)] transition-all hover:bg-blue-50 active:scale-95"
              >
                {SVGIcons.send("w-3.5 h-3.5")}
                <LocalizedText>S&apos;abonner</LocalizedText>
              </button>
            </form>
            <FormFeedback />
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-3 sm:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            <LocalizedText>
              {`© ${new Date().getFullYear()} EXAUCE. Tous droits réservés.`}
            </LocalizedText>
          </p>
          <Link
            href="#top"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white hover:text-[var(--color-secondary)]"
            aria-label="Retour en haut"
          >
            {SVGIcons.arrowUp("w-3.5 h-3.5")}
          </Link>
        </div>
      </div>
    </footer>
  );
}