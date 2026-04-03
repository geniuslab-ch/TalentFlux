"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxPaysagismeClient = dynamic(
  () => import("@/components/pages/TalentFluxPaysagisme"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
export const metadata: Metadata = {
  title: "Recrutement Paysagisme Suisse romande | TalentFlux",
  description: "Recrutement paysagistes, arboristes certifiés ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. TalentFlux Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/paysagisme" },
  openGraph: {
    title: "Recrutement Paysagisme Suisse romande | TalentFlux",
    description: "Recrutement paysagistes, arboristes certifiés ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. TalentFlux Yverdon-les-Bains, Vaud.",
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

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Recrutement Paysagisme Suisse romande
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/ingenierie">Recrutement Ingénierie</a>
        <a href="/it">Recrutement IT</a>
      </nav>

      <TalentFluxPaysagismeClient />
    </>
  );
}
