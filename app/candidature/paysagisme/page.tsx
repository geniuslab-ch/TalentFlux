import type { Metadata } from "next";
import { Suspense } from "react";
import CandidaturePaysagisme from "@/components/pages/CandidaturePaysagisme";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Paysagiste Suisse romande",
  description: "Postulez pour un poste paysagisme en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/paysagisme" },
  robots: { index: false, follow: true },
};

export default function CandidaturePaysagismePage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidaturePaysagisme />
    </Suspense>
  );
}
