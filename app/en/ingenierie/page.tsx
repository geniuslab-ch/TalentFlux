import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxEngineeringClient = dynamic(
  () => import("@/components/pages/TalentFluxEngineering"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Engineering Recruitment Switzerland",
  description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. ISO 13485, MDR certified experts. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/ingenierie",
    languages: { "fr": "https://talentflux.ch/ingenierie", "en": "https://talentflux.ch/en/ingenierie" },
  },
  openGraph: {
    title: "Engineering Recruitment Switzerland | TalentFlux",
    description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. ISO 13485, MDR certified experts. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/ingenierie",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxEngineeringEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Specialized engineering, MedTech and automation recruitment"
        sectorSlug="en/ingenierie"
        areaServed={["French-speaking Switzerland", "Lake Geneva Region", "Mittelland", "Switzerland"]}
      />
      <TalentFluxEngineeringClient />
    </>
  );
}
