import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxPaysagisme from "@/components/pages/TalentFluxPaysagisme";

export const metadata: Metadata = {
  title: "Landscaping & Horticulture Recruitment Switzerland",
  description: "Recruitment of landscapers, ISA/ECC arborists and site managers in Switzerland. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/paysagisme",
    languages: { "fr": "https://talentflux.ch/paysagisme", "en": "https://talentflux.ch/en/paysagisme", "x-default": "https://talentflux.ch/paysagisme" },
  },
  openGraph: {
    title: "Landscaping & Horticulture Recruitment Switzerland | TalentFlux",
    description: "Recruitment of landscapers, ISA/ECC arborists and site managers in Switzerland. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/paysagisme",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxPaysagismeEnPage() {
  return (
    <>
      <JsonLd serviceType="Landscaping, arborists and site manager recruitment" sectorSlug="en/paysagisme" areaServed={["French-speaking Switzerland","Vaud","Geneva","Fribourg","Valais"]} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxPaysagisme />
      </EnWrapper>
    </>
  );
}
