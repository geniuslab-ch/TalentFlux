import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxEngineeringClient = dynamic(
  () => import("@/components/pages/TalentFluxEngineering"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Recrutement Ingénieurs Suisse romande",
  description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/ingenierie" },
  openGraph: {
    title: "Recrutement Ingénieurs Suisse romande | TalentFlux",
    description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
    url: "https://talentflux.ch/ingenierie",
    type: "website",
    locale: "fr_CH",
  },
};

export default function TalentFluxEngineeringPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement ingénieurs spécialisés, MedTech et automation"
        sectorSlug="ingenierie"
        areaServed={["Suisse romande", "Arc Lémanique", "Mittelland", "Suisse"]}
      />
      <TalentFluxEngineeringClient />
    </>
  );
}
