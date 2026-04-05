import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatureFinance from "@/components/pages/CandidatureFinance";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Candidature Finance & Contrôle Suisse",
  description: "Postulez pour un poste finance en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/finance" },
  robots: { index: false, follow: true },
};

export default function CandidatureFinancePage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CandidatureFinance />
    </Suspense>
  );
}
