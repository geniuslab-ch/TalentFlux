import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPaysagisme from "@/components/pages/TalentFluxPaysagisme";

export const metadata: Metadata = {
  title: "Landscaping & Horticulture Recruitment Switzerland",
  alternates: {
    canonical: "https://talentflux.ch/en/paysagisme",
    languages: { "fr": "https://talentflux.ch/paysagisme", "en": "https://talentflux.ch/en/paysagisme" },
  },
  openGraph: {
    title: "Landscaping & Horticulture Recruitment Switzerland | TalentFlux",
    url: "https://talentflux.ch/en/paysagisme",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPaysagismeEnPage() {
  return (
    <>
      <JsonLd serviceType="Landscaping, arborists and site manager recruitment" sectorSlug="en/paysagisme" areaServed={["French-speaking Switzerland","Vaud","Geneva","Fribourg","Valais"]} />
      <TalentFluxPaysagisme />
    </>
  );
}
