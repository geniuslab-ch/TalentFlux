import type { Metadata } from "next";
import CandidatureTelecomClient from "@/components/pages/CandidatureTelecom";

export const metadata: Metadata = {
  title: "Candidature Télécom & Réseaux Suisse | TalentFlux",
  description: "Déposez votre candidature télécom en Suisse. Spécialiste RNI, RF Planner, ingénieur réseau IP. TalentFlux recrute pour Swisscom, Sunrise et les opérateurs suisses.",
  alternates: { canonical: "https://talentflux.ch/candidature/telecom" },
  // Les pages de candidature ne doivent pas être indexées par Google
  // (formulaires, contenu dynamique) mais restent crawlables
  robots: { index: false, follow: true },
};

export default function CandidatureTelecomPage() {
  return <CandidatureTelecomClient />;
}
