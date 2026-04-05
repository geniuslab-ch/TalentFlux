import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureTelecom from "@/components/pages/CandidatureTelecom";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Télécom & Réseaux Suisse",
  description: "Déposez votre candidature télécom en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/telecom" },
  robots: { index: false, follow: true },
};

export default function CandidatureTelecomPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidatureTelecom />
    </Suspense>
  );
}
