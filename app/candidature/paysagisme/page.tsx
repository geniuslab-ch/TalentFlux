import type { Metadata } from "next";
import CandidaturePaysagisme from "@/components/pages/CandidaturePaysagisme";

export const metadata: Metadata = {
  title: "Candidature Paysagiste Suisse romande",
  description: "Postulez pour un poste paysagisme en Suisse romande. CFC paysagiste, arboriste ISA/ECC.",
  alternates: { canonical: "https://talentflux.ch/candidature/paysagisme" },
  robots: { index: false, follow: true },
};

export default function CandidaturePaysagismePage() {
  return <CandidaturePaysagisme />;
}
