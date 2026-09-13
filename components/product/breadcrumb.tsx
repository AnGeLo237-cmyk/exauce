"use client";

import Link from "next/link";
import { LocalizedText } from "@/lib/translation";

type BreadcrumbItem = {
  label: string;
  href?: string; // si absent, c'est la page courante
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-text-muted mb-6" aria-label="Fil d'ariane">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-text-muted">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                <LocalizedText>{item.label}</LocalizedText>
              </Link>
            ) : (
              <span className="text-text font-medium">
                <LocalizedText>{item.label}</LocalizedText>
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}