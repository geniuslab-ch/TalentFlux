import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxTelecom from "@/components/pages/TalentFluxTelecom";

export const metadata: Metadata = {
  title: "Telecom & Network Recruitment Switzerland",
  alternates: {
    canonical: "https://talentflux.ch/en/telecom",
    languages: { "fr": "https://talentflux.ch/telecom", "en": "https://talentflux.ch/en/telecom" },
  },
  openGraph: {
    title: "Telecom & Network Recruitment Switzerland | TalentFlux",
    url: "https://talentflux.ch/en/telecom",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxTelecomEnPage() {
  return (
    <>
      <JsonLd serviceType="Telecommunications, IP networks and 5G infrastructure recruitment" sectorSlug="en/telecom" areaServed={["French-speaking Switzerland","German-speaking Switzerland","Switzerland"]} />
      <TalentFluxTelecom />
    </>
  );
}
