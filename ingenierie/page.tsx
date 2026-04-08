// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxEngineering from "@/components/pages/TalentFluxEngineering";

export const metadata: Metadata = {
  title: "Recrutement Ingénieurs Suisse romande",
  description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/ingenierie" },
  openGraph: {
    title: "Recrutement Ingénieurs Suisse romande",
    description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
    url: "https://talentflux.ch/ingenierie",
    type: "website",
    locale: "fr_CH",
  },
};

// Next.js rend ce Server Component côté serveur.
// TalentFluxEngineering a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxEngineeringPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement ingénieurs spécialisés, MedTech et automation"
        sectorSlug="ingenierie"
        areaServed={["Suisse romande","Arc Lémanique","Mittelland","Suisse"]}
      />
      <TalentFluxEngineering />
    </>
  );
}
