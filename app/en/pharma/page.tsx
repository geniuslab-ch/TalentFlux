import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPharma from "@/components/pages/TalentFluxPharma";

export const metadata: Metadata = {
  title: "Pharma & Life Sciences Headhunter Switzerland",
  alternates: {
    canonical: "https://talentflux.ch/en/pharma",
    languages: { "fr": "https://talentflux.ch/pharma", "en": "https://talentflux.ch/en/pharma" },
  },
  openGraph: {
    title: "Pharma & Life Sciences Headhunter Switzerland | TalentFlux",
    url: "https://talentflux.ch/en/pharma",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPharmaEnPage() {
  return (
    <>
      <JsonLd serviceType="Pharmaceutical, biotechnology and Life Sciences recruitment" sectorSlug="en/pharma" areaServed={["Lake Geneva Region","Mittelland","French-speaking Switzerland","Switzerland"]} />
      <TalentFluxPharma />
    </>
  );
}
