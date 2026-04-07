"use client";
import { createContext, useContext } from "react";

export type Lang = "fr" | "en";

export const LangContext = createContext<Lang>("fr");

export function useLang(): Lang {
  return useContext(LangContext);
}

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
