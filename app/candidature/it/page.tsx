import type { Metadata } from "next";
import CandidatureIT from "@/components/pages/CandidatureIT";

export const metadata: Metadata = {
  title: "Candidature Développeur & IT en Suisse",
  description: "Déposez votre candidature IT en Suisse romande. TalentFlux vous connecte aux meilleurs employeurs tech.",
  alternates: { canonical: "https://talentflux.ch/candidature/it" },
  robots: { index: false, follow: true },
};

export default function CandidatureITPage() {
  return <CandidatureIT />;
}
