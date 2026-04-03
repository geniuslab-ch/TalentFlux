import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxFinanceClient = dynamic(
  () => import("@/components/pages/TalentFluxFinance"),
  { ssr: false }
);

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

export default function TalentFluxFinancePage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement Finance, comptabilité et contrôle de gestion"
        sectorSlug="finance"
        areaServed={["Suisse romande", "Genève", "Zurich", "Vaud", "Suisse"]}
      />
      <TalentFluxFinanceClient />
    </>
  );
}
