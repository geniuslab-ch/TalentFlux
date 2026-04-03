import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPharmaClient from "@/components/pages/TalentFluxPharma";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
export const metadata: Metadata = {
  title: "Chasseur de têtes Pharma & Life Sciences Suisse | TalentFlux",
  description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. TalentFlux Yverdon.",
  alternates: { canonical: "https://talentflux.ch/pharma" },
  openGraph: {
    title: "Chasseur de têtes Pharma & Life Sciences Suisse | TalentFlux",
    description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. TalentFlux Yverdon.",
    url: "https://talentflux.ch/pharma",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPharmaPage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement pharmaceutique, biotechnologie et Life Sciences"
        sectorSlug="pharma"
        areaServed={["Arc Lémanique", "Mittelland", "Suisse romande", "Suisse"]}
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
        Recrutement Pharma, Biotech & Life Sciences en Suisse
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/finance" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Finance</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxPharmaClient />
    </>
  );
}
