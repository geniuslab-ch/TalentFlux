import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxPaysagismeClient from "@/components/pages/TalentFluxPaysagisme";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
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

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPaysagismePage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement paysagistes, arboristes et chefs de chantier"
        sectorSlug="paysagisme"
        areaServed={["Suisse romande", "Vaud", "Genève", "Fribourg", "Valais"]}
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
        Recrutement Paysagisme & Espaces verts en Suisse romande
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
        <a href="/it" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement IT</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxPaysagismeClient />
    </>
  );
}
