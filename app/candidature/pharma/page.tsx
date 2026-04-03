"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidaturePharmaClient = dynamic(
  () => import("@/components/pages/CandidaturePharma"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Pharma & Life Sciences Suisse | TalentFlux",
  description: "Postulez pour un poste pharma en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/pharma" },
  robots: { index: false, follow: true },
};

export default function CandidaturePharmaPage() {
  return <CandidaturePharmaClient />;
}
