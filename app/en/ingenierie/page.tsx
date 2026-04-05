import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxEngineering from "@/components/pages/TalentFluxEngineering";

export const metadata: Metadata = {
  title: "Engineering Recruitment Switzerland",
  alternates: {
    canonical: "https://talentflux.ch/en/ingenierie",
    languages: { "fr": "https://talentflux.ch/ingenierie", "en": "https://talentflux.ch/en/ingenierie" },
  },
  openGraph: {
    title: "Engineering Recruitment Switzerland | TalentFlux",
    url: "https://talentflux.ch/en/ingenierie",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxEngineeringEnPage() {
  return (
    <>
      <JsonLd serviceType="Specialized engineering, MedTech and automation recruitment" sectorSlug="en/ingenierie" areaServed={["French-speaking Switzerland","Lake Geneva Region","Mittelland","Switzerland"]} />
      <TalentFluxEngineering />
    </>
  );
}
