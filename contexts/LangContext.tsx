"use client";
import { createContext, useContext } from "react";

export type Lang = "fr" | "en";

// Valeur par défaut "fr" — utilisée côté serveur et pour les pages FR
export const LangContext = createContext<Lang>("fr");

export function useLang(): Lang {
  // useContext retourne "fr" (default) si pas de Provider parent
  // C'est safe côté serveur et côté client pour les pages FR
  return useContext(LangContext);
}

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
