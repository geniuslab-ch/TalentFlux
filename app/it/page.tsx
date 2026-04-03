import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxITClient from "@/components/pages/TalentFluxIT";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
export const metadata: Metadata = {
  title: "Recrutement IT en Suisse romande | TalentFlux Yverdon",
  description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau de 50+ clients tech. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/it" },
  openGraph: {
    title: "Recrutement IT en Suisse romande | TalentFlux Yverdon",
    description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau de 50+ clients tech. Yverdon-les-Bains, Vaud.",
    url: "https://talentflux.ch/it",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxITPage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement IT, développement logiciel et digital"
        sectorSlug="it"
        areaServed={["Suisse romande", "Lausanne", "Genève", "Zurich", "Suisse"]}
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
        Recrutement IT & Digital en Suisse romande
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/telecom" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Télécom</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxITClient />
    </>
  );
}
