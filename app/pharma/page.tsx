import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";
import ErrorBoundary from "@/components/ErrorBoundary";

const TalentFluxPharmaClient = dynamic(
  () => import("@/components/pages/TalentFluxPharma"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Chasseur de têtes Pharma & Life Sciences Suisse",
  description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. Yverdon.",
  alternates: { canonical: "https://talentflux.ch/pharma" },
  openGraph: {
    title: "Chasseur de têtes Pharma & Life Sciences Suisse",
    description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. Yverdon.",
    url: "https://talentflux.ch/pharma",
    type: "website",
    locale: "fr_CH",
  },
};

export default function TalentFluxPharmaPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement pharmaceutique, biotechnologie et Life Sciences"
        sectorSlug="pharma"
        areaServed={["Arc Lémanique", "Mittelland", "Suisse romande", "Suisse"]}
      />
      <ErrorBoundary pageName="pharma">
        <TalentFluxPharmaClient />
      </ErrorBoundary>
    </>
  );
}
