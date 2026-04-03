import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxPharmaClient = dynamic(
  () => import("@/components/pages/TalentFluxPharma"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
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

export default function TalentFluxPharmaPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement pharmaceutique, biotechnologie et Life Sciences"
        sectorSlug="pharma"
        areaServed={["Arc Lémanique", "Mittelland", "Suisse romande", "Suisse"]}
      />

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Chasseur de têtes Pharma & Life Sciences Suisse
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/finance">Recrutement Finance</a>
        <a href="/ingenierie">Recrutement Ingénierie</a>
      </nav>

      <TalentFluxPharmaClient />
    </>
  );
}
