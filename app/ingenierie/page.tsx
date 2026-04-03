"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxEngineeringClient = dynamic(
  () => import("@/components/pages/TalentFluxEngineering"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
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

export default function TalentFluxEngineeringPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement ingénieurs spécialisés, MedTech et automation"
        sectorSlug="ingenierie"
        areaServed={["Suisse romande", "Arc Lémanique", "Mittelland", "Suisse"]}
      />

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Recrutement Ingénieurs Suisse romande
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/it">Recrutement IT</a>
        <a href="/paysagisme">Recrutement Paysagisme</a>
      </nav>

      <TalentFluxEngineeringClient />
    </>
  );
}
