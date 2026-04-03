import type { Metadata } from "next";
import CandidaturePharmaClient from "@/components/pages/CandidaturePharma";

export const metadata: Metadata = {
  title: "Candidature Pharma & Life Sciences Suisse | TalentFlux",
  description: "Postulez pour un poste pharma en Suisse. QA Manager, Responsible Person, affaires réglementaires, validation GMP. TalentFlux, expert du recrutement pharmaceutique suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/pharma" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidaturePharmaPage() {
  return <CandidaturePharmaClient />;
}
