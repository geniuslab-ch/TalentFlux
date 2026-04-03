"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// ── Client component chargé sans SSR ────────────────────────
// Évite les erreurs window/document pendant le build statique.
// Le SEO critique (metadata, H1, JSON-LD) est rendu côté serveur ci-dessous.
const TalentFluxITClient = dynamic(
  () => import("@/components/pages/TalentFluxIT"),
  { ssr: false }
);

// ── Metadata (Server Component — dans le HTML initial) ───────
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

export default function TalentFluxITPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement IT, développement logiciel et digital"
        sectorSlug="it"
        areaServed={["Suisse romande", "Lausanne", "Genève", "Zurich", "Suisse"]}
      />

      <h1 style={{
        position: "absolute", width: 1, height: 1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap",
      }}>
        Recrutement IT en Suisse romande
      </h1>
      <nav aria-label="Secteurs complémentaires" style={{ display: "none" }}>
        <a href="/">Accueil TalentFlux</a>
        <a href="/telecom">Recrutement Télécom</a>
        <a href="/ingenierie">Recrutement Ingénierie</a>
      </nav>

      <TalentFluxITClient />
    </>
  );
}
