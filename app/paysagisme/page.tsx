import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxPaysagismeClient = dynamic(
  () => import("@/components/pages/TalentFluxPaysagisme"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Recrutement Paysagisme Suisse romande",
  description: "Recrutement paysagistes, arboristes ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/paysagisme" },
  openGraph: {
    title: "Recrutement Paysagisme Suisse romande",
    description: "Recrutement paysagistes, arboristes ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. Yverdon-les-Bains, Vaud.",
    url: "https://talentflux.ch/paysagisme",
    type: "website",
    locale: "fr_CH",
  },
};

export default function TalentFluxPaysagismePage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement paysagistes, arboristes et chefs de chantier"
        sectorSlug="paysagisme"
        areaServed={["Suisse romande", "Vaud", "Genève", "Fribourg", "Valais"]}
      />
      <TalentFluxPaysagismeClient />
    </>
  );
}
