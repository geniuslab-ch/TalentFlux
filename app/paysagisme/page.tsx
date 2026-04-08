// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPaysagisme from "@/components/pages/TalentFluxPaysagisme";

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

// Next.js rend ce Server Component côté serveur.
// TalentFluxPaysagisme a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxPaysagismePage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement paysagistes, arboristes et chefs de chantier"
        sectorSlug="paysagisme"
        areaServed={["Suisse romande","Vaud","Genève","Fribourg","Valais"]}
      />
      <TalentFluxPaysagisme />
    </>
  );
}
