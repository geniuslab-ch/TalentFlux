"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidaturePaysagismeClient = dynamic(
  () => import("@/components/pages/CandidaturePaysagisme"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Paysagiste Suisse romande | TalentFlux",
  description: "Postulez pour un poste paysagisme en Suisse romande.",
  alternates: { canonical: "https://talentflux.ch/candidature/paysagisme" },
  robots: { index: false, follow: true },
};

export default function CandidaturePaysagismePage() {
  return <CandidaturePaysagismeClient />;
}
