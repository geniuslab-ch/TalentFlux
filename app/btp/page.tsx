// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxBTP from "@/components/pages/TalentFluxBTP";

export const metadata: Metadata = {
  title: "Recrutement BTP & Architecture Suisse romande | Chefs de chantier",
  description: "Agence de recrutement spécialisée BTP en Suisse. Chefs de chantier, architectes SIA, ingénieurs civils, responsables HSE OTConst, spécialistes Minergie. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/btp" },
  openGraph: {
    title: "Recrutement BTP & Architecture Suisse romande | Chefs de chantier",
    description: "Recrutement BTP spécialisé en Suisse. Chefs de chantier, architectes SIA, ingénieurs civils, CVSE, Minergie. Yverdon-les-Bains.",
    url: "https://talentflux.ch/btp",
    type: "website",
    locale: "fr_CH",
  },
  keywords: [
    "recrutement BTP Suisse", "recrutement chef de chantier Suisse romande",
    "recrutement architecte SIA", "ingénieur civil Suisse", "conducteur de travaux Genève",
    "recrutement Minergie Suisse", "responsable HSE OTConst", "recrutement génie civil Vaud",
  ],
};

export default function TalentFluxBTPPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement BTP, architecture et génie civil"
        sectorSlug="btp"
        areaServed={["Suisse romande", "Vaud", "Genève", "Fribourg", "Valais", "Suisse"]}
      />
      <TalentFluxBTP />
    </>
  );
}
