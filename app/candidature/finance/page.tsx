import type { Metadata } from "next";
import CandidatureFinance from "@/components/pages/CandidatureFinance";

export const metadata: Metadata = {
  title: "Candidature Finance & Contrôle Suisse",
  description: "Postulez pour un poste finance en Suisse. CFO, contrôle de gestion, audit, trésorerie.",
  alternates: { canonical: "https://talentflux.ch/candidature/finance" },
  robots: { index: false, follow: true },
};

export default function CandidatureFinancePage() {
  return <CandidatureFinance />;
}
