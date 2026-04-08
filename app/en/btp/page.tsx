import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxBTP from "@/components/pages/TalentFluxBTP";

export const metadata: Metadata = {
  title: "Construction & Architecture Recruitment Switzerland",
  description: "Specialized BTP recruitment in Switzerland. Site managers, SIA architects, civil engineers, HSE managers, Minergie specialists. Yverdon-les-Bains, Vaud.",
  alternates: {
    canonical: "https://talentflux.ch/en/btp",
    languages: {
      "fr": "https://talentflux.ch/btp",
      "en": "https://talentflux.ch/en/btp",
      "x-default": "https://talentflux.ch/btp",
    },
  },
  openGraph: {
    title: "Construction & Architecture Recruitment Switzerland | TalentFlux",
    description: "Specialized BTP recruitment in Switzerland. Site managers, SIA architects, civil engineers, HSE OTConst, Minergie specialists. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/btp",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxBTPEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Construction, architecture and civil engineering recruitment"
        sectorSlug="en/btp"
        areaServed={["French-speaking Switzerland", "Vaud", "Geneva", "Fribourg", "Valais", "Switzerland"]}
      />
      <EnWrapper>
        <TalentFluxBTP />
      </EnWrapper>
    </>
  );
}
