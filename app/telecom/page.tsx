// Server Component — PAS de "use client", PAS de dynamic(ssr:false)
// Next.js SSR-rend automatiquement les Client Components importés ici
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxTelecom from "@/components/pages/TalentFluxTelecom";

export const metadata: Metadata = {
  title: "Recrutement Télécom & Réseaux Suisse",
  description: "Recrutement Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. Yverdon.",
  alternates: { canonical: "https://talentflux.ch/telecom" },
  openGraph: {
    title: "Recrutement Télécom & Réseaux Suisse",
    description: "Recrutement Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. Yverdon.",
    url: "https://talentflux.ch/telecom",
    type: "website",
    locale: "fr_CH",
  },
};

// Next.js rend ce Server Component côté serveur.
// TalentFluxTelecom a "use client" → il est SSR-rendu ET hydraté côté client.
// window/document sont dans useEffect → safe côté serveur.
export default function TalentFluxTelecomPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement télécommunications, réseaux IP et infrastructure 5G"
        sectorSlug="telecom"
        areaServed={["Suisse romande","Suisse alémanique","Suisse entière"]}
      />
      <TalentFluxTelecom />
    </>
  );
}
