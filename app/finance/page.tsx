import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxFinanceClient from "@/components/pages/TalentFluxFinance";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
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

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxFinancePage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement Finance, comptabilité et contrôle de gestion"
        sectorSlug="finance"
        areaServed={["Suisse romande", "Genève", "Zurich", "Vaud", "Suisse"]}
      />

      {/*
        H1 masqué visuellement mais présent dans le HTML pour les crawlers.
        La page client affiche son propre H1 stylé — celui-ci est le signal SEO initial.
        Technique : position absolute + clip-path (accessible aux screen readers ✓)
      */}
      <h1 style={{
        position: "absolute",
        width: 1, height: 1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
      }}>
        Recrutement Finance & Contrôle de gestion en Suisse
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/pharma" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Pharma & Life Sciences</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxFinanceClient />
    </>
  );
}
