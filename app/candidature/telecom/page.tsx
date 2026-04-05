import type { Metadata } from "next";
import CandidatureTelecom from "@/components/pages/CandidatureTelecom";

export const metadata: Metadata = {
  title: "Candidature Télécom & Réseaux Suisse",
  description: "Déposez votre candidature télécom en Suisse. Spécialiste RNI, RF Planner, ingénieur réseau IP.",
  alternates: { canonical: "https://talentflux.ch/candidature/telecom" },
  robots: { index: false, follow: true },
};

export default function CandidatureTelecomPage() {
  return <CandidatureTelecom />;
}
