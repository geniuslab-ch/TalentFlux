import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxTelecomClient = dynamic(
  () => import("@/components/pages/TalentFluxTelecom"),
  { ssr: false }
);

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

export default function TalentFluxTelecomPage() {
  return (
    <>
      <JsonLd
        serviceType="Recrutement télécommunications, réseaux IP et infrastructure 5G"
        sectorSlug="telecom"
        areaServed={["Suisse romande", "Suisse alémanique", "Suisse entière"]}
      />
      <TalentFluxTelecomClient />
    </>
  );
}
