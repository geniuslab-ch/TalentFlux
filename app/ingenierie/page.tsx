import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxEngineeringClient from "@/components/pages/TalentFluxEngineering";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
export const metadata: Metadata = {
  title: "Recrutement Ingénieurs Suisse romande | TalentFlux",
  description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. TalentFlux Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/ingenierie" },
  openGraph: {
    title: "Recrutement Ingénieurs Suisse romande | TalentFlux",
    description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. TalentFlux Yverdon-les-Bains.",
    url: "https://talentflux.ch/ingenierie",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxEngineeringPage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement ingénieurs spécialisés, MedTech et automation"
        sectorSlug="ingenierie"
        areaServed={["Suisse romande", "Arc Lémanique", "Mittelland", "Suisse"]}
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
        Recrutement Ingénierie & Technique en Suisse romande
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/it" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement IT</a>
        <a href="/paysagisme" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Paysagisme</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxEngineeringClient />
    </>
  );
}
