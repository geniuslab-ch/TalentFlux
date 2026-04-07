"use client";
import { LangProvider } from "@/contexts/LangContext";

export default function EnWrapper({ children }: { children: React.ReactNode }) {
  return <LangProvider lang="en">{children}</LangProvider>;
}
