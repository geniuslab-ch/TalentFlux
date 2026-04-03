import type { Metadata } from "next";
import CandidatureFinanceClient from "@/components/pages/CandidatureFinance";

export const metadata: Metadata = {
  title: "Candidature Finance & Contrôle Suisse | TalentFlux",
  description: "Postulez pour un poste en finance en Suisse. CFO, contrôle de gestion, audit, trésorerie. TalentFlux vous accompagne dans votre recherche d'emploi finance.",
  alternates: { canonical: "https://talentflux.ch/candidature/finance" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidatureFinancePage() {
  return <CandidatureFinanceClient />;
}
