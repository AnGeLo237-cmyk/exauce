"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/ui/theme/theme-toggle";
import LanguageSwitcher from "@/components/shared/ui/language/language-switcher";
import { useClientTranslation } from "@/lib/translation";

// Éléments de navigation (libellés en français, seront traduits)
const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/faq", label: "FAQ" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Composant NavItem avec traduction automatique
function NavItem({
  href,
  label,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const { translated } = useClientTranslation(label);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium text-text hover:text-primary hover:bg-surface transition-colors ${
        mobile ? "text-center" : ""
      }`}
    >
      {translated}
    </Link>
  );
}

// Bouton Connexion avec le style des switchs
function LoginButton({ onClick }: { onClick?: () => void }) {
  const { translated } = useClientTranslation("Espace Vendeur");
  return (
    <Link
      href="/connexion"
      onClick={onClick}
      className="px-4 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
    >
      {translated}
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <Image
              src="/images/logo.ico"
              alt="Logo"
              width={40}
              height={40}
              className="h-19 w-auto"
            />
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Boutons à droite (desktop) : switchs + connexion */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <LoginButton />
          </div>

          {/* Bouton burger mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-text hover:bg-surface focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panneau coulissant mobile */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-64 bg-surface border-l border-border z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-2 pt-4 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setIsOpen(false)}
              mobile
            />
          ))}
          {/* Boutons switch + connexion dans le panneau mobile */}
          <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <div className="mt-2 flex justify-center">
            <LoginButton onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}