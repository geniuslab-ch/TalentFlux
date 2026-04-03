import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxFinanceClient = dynamic(
  () => import("@/components/pages/TalentFluxFinance"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
export const metadata: Metadata = {
  title: "Recrutement Finance & Comptabilité Suisse | TalentFlux",
  description: "Recrutement spécialisé Finance en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS. TalentFlux, Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/finance" },
  openGraph: {
    title: "Recrutement Finance & Comptabilité Suisse | TalentFlux",
    description: "Recrutement spécialisé Finance en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS. TalentFlux, Yverdon-les-Bains.",
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

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Recrutement Finance & Comptabilité Suisse
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/pharma">Recrutement Pharma & Life Sciences</a>
        <a href="/ingenierie">Recrutement Ingénierie</a>
      </nav>

      <TalentFluxFinanceClient />
    </>
  );
}
