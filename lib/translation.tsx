// lib/clientTranslation.ts
"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { textOverrides } from './text-overrides';

const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

const memoryCache = new Map<string, string>();
const STORAGE_PREFIX = "mytrans_";

type TranslateOptions = {
  text: string;
  from?: string;
  to?: string;
  email?: string;
};

export async function translateText({
  text,
  from = "fr",
  to = "en",
  email,
}: TranslateOptions): Promise<string> {
  // Appliquer le remplacement avant toute chose
  const effectiveText = textOverrides[text] || text;
  if (!effectiveText?.trim()) return effectiveText;
  const cacheKey = `${from}|${to}|${effectiveText}`;

  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey)!;

  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + cacheKey);
    if (stored) {
      memoryCache.set(cacheKey, stored);
      return stored;
    }
  } catch (e) {}

  const params = new URLSearchParams({ q: effectiveText, langpair: `${from}|${to}` });
  if (email) params.append("de", email);

  try {
    const res = await fetch(`${MYMEMORY_URL}?${params.toString()}`);
    if (!res.ok) return effectiveText;
    const data = await res.json();
    const translated = data?.responseData?.translatedText ?? effectiveText;

    memoryCache.set(cacheKey, translated);
    try {
      localStorage.setItem(STORAGE_PREFIX + cacheKey, translated);
    } catch (e) {}

    return translated;
  } catch (error) {
    console.error("Translation failed:", error);
    return effectiveText;
  }
}

// Contexte de langue
type LanguageContextType = {
  locale: "fr" | "en";
  setLocale: (l: "fr" | "en") => void;
};
const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

export function useClientTranslation(text: string, targetLocale?: "fr" | "en") {
  const { locale } = useLanguage();
  const finalTarget = targetLocale ?? locale;
  const [translated, setTranslated] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  // Appliquer le remplacement pour l'affichage en français
  const effectiveText = textOverrides[text] || text;
  const sourceLocale = finalTarget === "fr" ? "en" : "fr";
  const effectiveSource = "fr"; // Les textes originaux sont en français

  const fetchTranslation = useCallback(async () => {
    if (!text.trim() || finalTarget === effectiveSource) {
      // Afficher le texte (éventuellement remplacé)
      setTranslated(effectiveText);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const result = await translateText({
      text: effectiveText, // On traduit le texte remplacé
      from: effectiveSource,
      to: finalTarget,
    });
    setTranslated(result);
    setIsLoading(false);
  }, [text, finalTarget, effectiveSource, effectiveText]);

  useEffect(() => {
    fetchTranslation();
  }, [fetchTranslation]);

  return { translated, isLoading };
}

export function LocalizedText({ children }: { children: string }) {
  const { translated } = useClientTranslation(children);
  return <>{translated}</>;
}