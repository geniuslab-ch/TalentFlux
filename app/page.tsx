import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "TalentFlux — Recrutement Spécialisé en Suisse",
  description: "Agence de recrutement spécialisée en Suisse : IT, Finance, Ingénierie, Paysagisme, Télécommunications, Pharma & Life Sciences. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch" },
  openGraph: {
    title: "TalentFlux — Recrutement Spécialisé en Suisse",
    description: "Agence de recrutement spécialisée en Suisse : IT, Finance, Ingénierie, Paysagisme, Télécommunications, Pharma & Life Sciences.",
    url: "https://talentflux.ch",
    type: "website",
    locale: "fr_CH",
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return <Home />;
}
