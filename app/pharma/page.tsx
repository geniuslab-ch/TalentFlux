// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPharma from "@/components/pages/TalentFluxPharma";

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

// Next.js rend ce Server Component côté serveur.
// TalentFluxPharma a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxPharmaPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement pharmaceutique, biotechnologie et Life Sciences"
        sectorSlug="pharma"
        areaServed={["Arc Lémanique","Mittelland","Suisse romande","Suisse"]}
      />
      <TalentFluxPharma />
    </>
  );
}
