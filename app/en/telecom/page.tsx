import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxTelecomClient = dynamic(
  () => import("@/components/pages/TalentFluxTelecom"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Telecom & Network Recruitment Switzerland",
  description: "Specialized Telecommunications recruitment in Switzerland. NRI specialists, 5G RF Planners, IP network engineers (CCNP/CCIE), fibre technicians. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/telecom",
    languages: { "fr": "https://talentflux.ch/telecom", "en": "https://talentflux.ch/en/telecom" },
  },
  openGraph: {
    title: "Telecom & Network Recruitment Switzerland | TalentFlux",
    description: "Specialized Telecommunications recruitment in Switzerland. NRI specialists, 5G RF Planners, IP network engineers (CCNP/CCIE), fibre technicians. Yverdon.",
    url: "https://talentflux.ch/en/telecom",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxTelecomEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Telecommunications, IP networks and 5G infrastructure recruitment"
        sectorSlug="en/telecom"
        areaServed={["French-speaking Switzerland", "German-speaking Switzerland", "Switzerland"]}
      />
      <TalentFluxTelecomClient />
    </>
  );
}
