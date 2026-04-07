import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxJuridique from "@/components/pages/TalentFluxJuridique";

export const metadata: Metadata = {
  title: "Legal Recruitment Switzerland | Lawyers & In-House Counsel",
  description: "Specialized legal recruitment in Switzerland. General Counsel, corporate lawyers, FINMA Compliance Officers, DPO (nLPD/GDPR), Contract Managers. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/juridique",
    languages: {
      "fr": "https://talentflux.ch/juridique",
      "en": "https://talentflux.ch/en/juridique",
      "x-default": "https://talentflux.ch/juridique",
    },
  },
  openGraph: {
    title: "Legal Recruitment Switzerland | TalentFlux",
    description: "Specialized legal recruitment in Switzerland. General Counsel, corporate lawyers, FINMA compliance, DPO nLPD/GDPR. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/juridique",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxJuridiqueEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Legal recruitment, business law and compliance"
        sectorSlug="en/juridique"
        areaServed={["French-speaking Switzerland", "Geneva", "Lausanne", "Zurich", "Switzerland"]}
      />
      <EnWrapper>
        <TalentFluxJuridique />
      </EnWrapper>
    </>
  );
}
