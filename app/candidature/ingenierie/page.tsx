import type { Metadata } from "next";
import CandidatureIngenierieClient from "@/components/pages/CandidatureIngenierie";

export const metadata: Metadata = {
  title: "Candidature Ingénieur Suisse romande | TalentFlux",
  description: "Déposez votre candidature ingénieur en Suisse. Mécanique, automation, MedTech, R&D. TalentFlux vous connecte aux meilleurs employeurs industriels suisses.",
  alternates: { canonical: "https://talentflux.ch/candidature/ingenierie" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidatureIngenieriePage() {
  return <CandidatureIngenierieClient />;
}
