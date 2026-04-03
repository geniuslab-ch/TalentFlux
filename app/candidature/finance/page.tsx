import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidatureFinanceClient = dynamic(
  () => import("@/components/pages/CandidatureFinance"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Finance & Contrôle Suisse",
  description: "Postulez pour un poste finance en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/finance" },
  robots: { index: false, follow: true },
};

export default function CandidatureFinancePage() {
  return <CandidatureFinanceClient />;
}
