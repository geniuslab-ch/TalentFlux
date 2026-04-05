import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureIT from "@/components/pages/CandidatureIT";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Développeur & IT en Suisse",
  description: "Déposez votre candidature IT en Suisse romande.",
  alternates: { canonical: "https://talentflux.ch/candidature/it" },
  robots: { index: false, follow: true },
};

export default function CandidatureITPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidatureIT />
    </Suspense>
  );
}
