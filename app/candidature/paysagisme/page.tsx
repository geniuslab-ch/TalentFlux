import type { Metadata } from "next";
import CandidaturePaysagismeClient from "@/components/pages/CandidaturePaysagisme";

export const metadata: Metadata = {
  title: "Candidature Paysagiste Suisse romande | TalentFlux",
  description: "Postulez pour un poste en paysagisme en Suisse romande. CFC paysagiste, arboriste ISA/ECC, chef de chantier. TalentFlux, spécialiste du recrutement paysage.",
  alternates: { canonical: "https://talentflux.ch/candidature/paysagisme" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidaturePaysagismePage() {
  return <CandidaturePaysagismeClient />;
}
