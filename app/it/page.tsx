// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxIT from "@/components/pages/TalentFluxIT";

export const metadata: Metadata = {
  title: "Recrutement IT en Suisse romande | Yverdon",
  description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau 50+ clients tech. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/it" },
  openGraph: {
    title: "Recrutement IT en Suisse romande | Yverdon",
    description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau 50+ clients tech. Yverdon-les-Bains, Vaud.",
    url: "https://talentflux.ch/it",
    type: "website",
    locale: "fr_CH",
  },
};

// Next.js rend ce Server Component côté serveur.
// TalentFluxIT a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxITPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement IT, développement logiciel et digital"
        sectorSlug="it"
        areaServed={["Suisse romande","Lausanne","Genève","Zurich","Suisse"]}
      />
      <TalentFluxIT />
    </>
  );
}
