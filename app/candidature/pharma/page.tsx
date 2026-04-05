import type { Metadata } from "next";
import CandidaturePharma from "@/components/pages/CandidaturePharma";

export const metadata: Metadata = {
  title: "Candidature Pharma & Life Sciences Suisse",
  description: "Postulez pour un poste pharma en Suisse. QA Manager, Responsible Person, Validation GMP.",
  alternates: { canonical: "https://talentflux.ch/candidature/pharma" },
  robots: { index: false, follow: true },
};

export default function CandidaturePharmaPage() {
  return <CandidaturePharma />;
}
