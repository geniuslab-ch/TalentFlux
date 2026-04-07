import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxEngineering from "@/components/pages/TalentFluxEngineering";

export const metadata: Metadata = {
  title: "Engineering Recruitment Switzerland",
  description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/ingenierie",
    languages: { "fr": "https://talentflux.ch/ingenierie", "en": "https://talentflux.ch/en/ingenierie", "x-default": "https://talentflux.ch/ingenierie" },
  },
  openGraph: {
    title: "Engineering Recruitment Switzerland | TalentFlux",
    description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/ingenierie",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxEngineeringEnPage() {
  return (
    <>
      <JsonLd serviceType="Specialized engineering, MedTech and automation recruitment" sectorSlug="en/ingenierie" areaServed={["French-speaking Switzerland","Lake Geneva Region","Mittelland","Switzerland"]} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxEngineering />
      </EnWrapper>
    </>
  );
}
