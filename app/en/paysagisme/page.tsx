import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxPaysagismeClient = dynamic(
  () => import("@/components/pages/TalentFluxPaysagisme"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Landscaping & Horticulture Recruitment Switzerland",
  description: "Recruitment of landscape gardeners, ISA/ECC arborists and site managers in Switzerland. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/paysagisme",
    languages: { "fr": "https://talentflux.ch/paysagisme", "en": "https://talentflux.ch/en/paysagisme" },
  },
  openGraph: {
    title: "Landscaping & Horticulture Recruitment Switzerland | TalentFlux",
    description: "Recruitment of landscape gardeners, ISA/ECC arborists and site managers in Switzerland. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/paysagisme",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPaysagismeEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Landscaping, arborists and site manager recruitment"
        sectorSlug="en/paysagisme"
        areaServed={["French-speaking Switzerland", "Vaud", "Geneva", "Fribourg", "Valais"]}
      />
      <TalentFluxPaysagismeClient />
    </>
  );
}
