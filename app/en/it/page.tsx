import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxIT from "@/components/pages/TalentFluxIT";

export const metadata: Metadata = {
  title: "IT Recruitment in Switzerland | Yverdon",
  description: "Specialized IT recruitment in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/it",
    languages: { "fr": "https://talentflux.ch/it", "en": "https://talentflux.ch/en/it", "x-default": "https://talentflux.ch/it" },
  },
  openGraph: {
    title: "IT Recruitment in Switzerland | Yverdon | TalentFlux",
    description: "Specialized IT recruitment in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/it",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxITEnPage() {
  return (
    <>
      <JsonLd serviceType="IT and software development recruitment" sectorSlug="en/it" areaServed={["French-speaking Switzerland","Lausanne","Geneva","Zurich","Switzerland"]} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxIT />
      </EnWrapper>
    </>
  );
}
