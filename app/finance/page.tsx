// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxFinance from "@/components/pages/TalentFluxFinance";

export const metadata: Metadata = {
  title: "Recrutement Finance & Comptabilité Suisse",
  description: "Recrutement Finance spécialisé en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/finance" },
  openGraph: {
    title: "Recrutement Finance & Comptabilité Suisse",
    description: "Recrutement Finance spécialisé en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS. Yverdon-les-Bains.",
    url: "https://talentflux.ch/finance",
    type: "website",
    locale: "fr_CH",
  },
};

// Next.js rend ce Server Component côté serveur.
// TalentFluxFinance a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxFinancePage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement Finance, comptabilité et contrôle de gestion"
        sectorSlug="finance"
        areaServed={["Suisse romande","Genève","Zurich","Vaud","Suisse"]}
      />
      <TalentFluxFinance />
    </>
  );
}
