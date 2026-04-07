import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureJuridique from "@/components/pages/CandidatureJuridique";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Avocat & Juriste Suisse | Droit des affaires",
  description: "Déposez votre dossier de candidature juridique en Suisse. Avocats brevetés, General Counsel, Compliance Officers, DPO. TalentFlux — spécialiste du recrutement juridique suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/juridique" },
  robots: { index: false, follow: true },
};

export default function CandidatureJuridiquePage() {
  return (
    <Suspense fallback={<div style={{ background: "#06080F", minHeight: "100vh" }} />}>
      <CandidatureJuridique />
    </Suspense>
  );
}
