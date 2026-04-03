import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxPharmaClient = dynamic(
  () => import("@/components/pages/TalentFluxPharma"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Pharma & Life Sciences Headhunter Switzerland",
  description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, Regulatory Affairs, GMP Validation. Swissmedic & ICH Q9 experts. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/pharma",
    languages: { "fr": "https://talentflux.ch/pharma", "en": "https://talentflux.ch/en/pharma" },
  },
  openGraph: {
    title: "Pharma & Life Sciences Headhunter Switzerland | TalentFlux",
    description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, Regulatory Affairs, GMP Validation. Swissmedic & ICH Q9 experts. Yverdon.",
    url: "https://talentflux.ch/en/pharma",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPharmaEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Pharmaceutical, biotechnology and Life Sciences recruitment"
        sectorSlug="en/pharma"
        areaServed={["Lake Geneva Region", "Mittelland", "French-speaking Switzerland", "Switzerland"]}
      />
      <TalentFluxPharmaClient />
    </>
  );
}
