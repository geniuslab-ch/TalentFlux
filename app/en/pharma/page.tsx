import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxPharma from "@/components/pages/TalentFluxPharma";

export const metadata: Metadata = {
  title: "Pharma & Life Sciences Headhunter Switzerland",
  description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, RA, GMP Validation. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/pharma",
    languages: { "fr": "https://talentflux.ch/pharma", "en": "https://talentflux.ch/en/pharma", "x-default": "https://talentflux.ch/pharma" },
  },
  openGraph: {
    title: "Pharma & Life Sciences Headhunter Switzerland | TalentFlux",
    description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, RA, GMP Validation. Yverdon.",
    url: "https://talentflux.ch/en/pharma",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPharmaEnPage() {
  return (
    <>
      <JsonLd serviceType="Pharmaceutical, biotechnology and Life Sciences recruitment" sectorSlug="en/pharma" areaServed={["Lake Geneva Region","Mittelland","French-speaking Switzerland","Switzerland"]} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxPharma />
      </EnWrapper>
    </>
  );
}
