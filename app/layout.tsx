// app/layout.tsx
'use client';

import { ThemeProvider } from "@/components/shared/ui/theme/theme-provider";
import { LanguageProvider } from "@/lib/translation";
import GlobalFormHandler from "@/components/shared/ui/form/global-form-handler";
import "./globals.css";

// Composants partagés (statiques)
import Header from '@/components/shared/ui/header';
import Footer from '@/components/shared/ui/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
              <Header />
              <GlobalFormHandler />
              {children}
              <Footer />              
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}