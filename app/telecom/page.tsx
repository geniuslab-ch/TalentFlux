import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxTelecomClient from "@/components/pages/TalentFluxTelecom";

// ── SEO Metadata (rendu côté serveur) ────────────────────────
export const metadata: Metadata = {
  title: "Recrutement Télécom & Réseaux Suisse | TalentFlux",
  description: "Recrutement spécialisé Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. TalentFlux Yverdon.",
  alternates: { canonical: "https://talentflux.ch/telecom" },
  openGraph: {
    title: "Recrutement Télécom & Réseaux Suisse | TalentFlux",
    description: "Recrutement spécialisé Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. TalentFlux Yverdon.",
    url: "https://talentflux.ch/telecom",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxTelecomPage() {
  return (
    <>
      {/* JSON-LD schema.org — dans le <head> via dangerouslySetInnerHTML */}
      <JsonLd
        serviceType="Recrutement télécommunications, réseaux IP et infrastructure 5G"
        sectorSlug="telecom"
        areaServed={["Suisse romande", "Suisse alémanique", "Suisse entière"]}
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
        Recrutement Télécommunications & Infrastructure réseau en Suisse
      </h1>

      {/* Maillage interne — liens de silotage SEO */}
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Accueil TalentFlux</a>
        <a href="/it" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement IT</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React (Client Component) */}
      <TalentFluxTelecomClient />
    </>
  );
}
