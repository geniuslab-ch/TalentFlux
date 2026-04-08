import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureBTP from "@/components/pages/CandidatureBTP";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Chef de chantier & BTP Suisse",
  description: "Déposez votre candidature BTP en Suisse. Chefs de chantier, architectes, ingénieurs civils, CVSE, HSE. TalentFlux — spécialiste du recrutement construction suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/btp" },
  robots: { index: false, follow: true },
};

export default function CandidatureBTPPage() {
  return (
    <Suspense fallback={<div style={{ background: "#07090C", minHeight: "100vh" }} />}>
      <CandidatureBTP />
    </Suspense>
  );
}
