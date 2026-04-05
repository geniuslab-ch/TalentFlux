import type { Metadata } from "next";
import CandidatureIngenierie from "@/components/pages/CandidatureIngenierie";

export const metadata: Metadata = {
  title: "Candidature Ingénieur Suisse romande",
  description: "Déposez votre candidature ingénieur en Suisse. Mécanique, automation, MedTech, R&D.",
  alternates: { canonical: "https://talentflux.ch/candidature/ingenierie" },
  robots: { index: false, follow: true },
};

export default function CandidatureIngenieriePage() {
  return <CandidatureIngenierie />;
}
