import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxITClient = dynamic(
  () => import("@/components/pages/TalentFluxIT"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "IT Recruitment in Switzerland | Yverdon",
  description: "Specialized IT recruitment agency in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects, Tech Leads. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/it",
    languages: { "fr": "https://talentflux.ch/it", "en": "https://talentflux.ch/en/it" },
  },
  openGraph: {
    title: "IT Recruitment in Switzerland | Yverdon",
    description: "Specialized IT recruitment agency in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects, Tech Leads. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/it",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxITEnPage() {
  return (
    <>
      <JsonLd
        serviceType="IT and software development recruitment"
        sectorSlug="en/it"
        areaServed={["French-speaking Switzerland", "Lausanne", "Geneva", "Zurich", "Switzerland"]}
      />
      <TalentFluxITClient />
    </>
  );
}
