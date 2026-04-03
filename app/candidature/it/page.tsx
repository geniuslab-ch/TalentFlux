import type { Metadata } from "next";
import CandidatureITClient from "@/components/pages/CandidatureIT";

export const metadata: Metadata = {
  title: "Candidature Développeur & IT en Suisse | TalentFlux",
  description: "Déposez votre candidature IT en Suisse. Développeurs, DevOps, Data Engineers. TalentFlux vous met en relation avec les meilleurs employeurs tech de Suisse romande.",
  alternates: { canonical: "https://talentflux.ch/candidature/it" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidatureITPage() {
  return <CandidatureITClient />;
}
