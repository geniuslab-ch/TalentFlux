import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";
import ErrorBoundary from "@/components/ErrorBoundary";

const TalentFluxITClient = dynamic(
  () => import("@/components/pages/TalentFluxIT"),
  { ssr: false }
);

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

export default function TalentFluxITPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement IT, développement logiciel et digital"
        sectorSlug="it"
        areaServed={["Suisse romande", "Lausanne", "Genève", "Zurich", "Suisse"]}
      />
      <ErrorBoundary pageName="it">
        <TalentFluxITClient />
      </ErrorBoundary>
    </>
  );
}
