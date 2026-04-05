import type { Metadata } from "next";
import { Suspense } from "react";
import CandidaturePharma from "@/components/pages/CandidaturePharma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Pharma & Life Sciences Suisse",
  description: "Postulez pour un poste pharma en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/pharma" },
  robots: { index: false, follow: true },
};

export default function CandidaturePharmaPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidaturePharma />
    </Suspense>
  );
}
