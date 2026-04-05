import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureIngenierie from "@/components/pages/CandidatureIngenierie";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Ingénieur Suisse romande",
  description: "Déposez votre candidature ingénieur en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/ingenierie" },
  robots: { index: false, follow: true },
};

export default function CandidatureIngenieriePage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidatureIngenierie />
    </Suspense>
  );
}
