import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxTelecomClient = dynamic(
  () => import("@/components/pages/TalentFluxTelecom"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
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

export default function TalentFluxTelecomPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement télécommunications, réseaux IP et infrastructure 5G"
        sectorSlug="telecom"
        areaServed={["Suisse romande", "Suisse alémanique", "Suisse entière"]}
      />

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Recrutement Télécom & Réseaux Suisse
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/it">Recrutement IT</a>
        <a href="/ingenierie">Recrutement Ingénierie</a>
      </nav>

      <TalentFluxTelecomClient />
    </>
  );
}
