import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidatureITClient = dynamic(
  () => import("@/components/pages/CandidatureIT"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Développeur & IT en Suisse | TalentFlux",
  description: "Déposez votre candidature IT en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/it" },
  robots: { index: false, follow: true },
};

export default function CandidatureITPage() {
  return <CandidatureITClient />;
}
