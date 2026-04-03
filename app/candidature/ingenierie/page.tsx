"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidatureIngenierieClient = dynamic(
  () => import("@/components/pages/CandidatureIngenierie"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Ingénieur Suisse romande | TalentFlux",
  description: "Déposez votre candidature ingénieur en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/ingenierie" },
  robots: { index: false, follow: true },
};

export default function CandidatureIngenieriePage() {
  return <CandidatureIngenierieClient />;
}
