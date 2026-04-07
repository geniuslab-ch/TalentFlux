// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxJuridique from "@/components/pages/TalentFluxJuridique";

export const metadata: Metadata = {
  title: "Recrutement Juridique Suisse romande | Avocats & Juristes",
  description: "Cabinet de recrutement spécialisé droit des affaires en Suisse. General Counsel, avocats d'affaires brevetés, Compliance Officers FINMA, DPO nLPD/RGPD, Contract Managers. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/juridique" },
  openGraph: {
    title: "Recrutement Juridique Suisse romande | Avocats & Juristes",
    description: "Cabinet de recrutement spécialisé droit des affaires en Suisse. General Counsel, avocats brevetés, Compliance FINMA, DPO nLPD. Yverdon-les-Bains.",
    url: "https://talentflux.ch/juridique",
    type: "website",
    locale: "fr_CH",
  },
  keywords: [
    "recrutement juridique Suisse", "recrutement avocat Suisse romande",
    "General Counsel Suisse", "compliance officer FINMA", "DPO nLPD RGPD",
    "juriste in-house Genève", "avocat d'affaires Lausanne",
  ],
};

export default function TalentFluxJuridiquePage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement juridique, droit des affaires et compliance"
        sectorSlug="juridique"
        areaServed={["Suisse romande", "Genève", "Lausanne", "Zurich", "Suisse"]}
      />
      <TalentFluxJuridique />
    </>
  );
}
