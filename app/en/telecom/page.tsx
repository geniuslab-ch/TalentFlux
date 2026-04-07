import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxTelecom from "@/components/pages/TalentFluxTelecom";

export const metadata: Metadata = {
  title: "Telecom & Network Recruitment Switzerland",
  description: "Specialized Telecommunications recruitment in Switzerland. NRI specialists, 5G RF Planners, IP network engineers. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/telecom",
    languages: { "fr": "https://talentflux.ch/telecom", "en": "https://talentflux.ch/en/telecom", "x-default": "https://talentflux.ch/telecom" },
  },
  openGraph: {
    title: "Telecom & Network Recruitment Switzerland | TalentFlux",
    description: "Specialized Telecommunications recruitment in Switzerland. NRI specialists, 5G RF Planners, IP network engineers. Yverdon.",
    url: "https://talentflux.ch/en/telecom",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxTelecomEnPage() {
  return (
    <>
      <JsonLd serviceType="Telecommunications, IP networks and 5G infrastructure recruitment" sectorSlug="en/telecom" areaServed={['French-speaking Switzerland','German-speaking Switzerland','Switzerland']} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxTelecom />
      </EnWrapper>
    </>
  );
}
