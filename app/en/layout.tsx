import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://talentflux.ch"),
  title: {
    default: "TalentFlux — Specialized Recruitment in Switzerland",
    template: "%s | TalentFlux",
  },
  description:
    "Specialized recruitment agency in Switzerland: IT, Finance, Engineering, " +
    "Landscaping, Telecommunications, Pharma & Life Sciences. Yverdon-les-Bains.",
  openGraph: { siteName: "TalentFlux", locale: "en_CH", type: "website" },
  robots: { index: true, follow: true },
};

// Layout simple sans script inline — évite les problèmes d'hydratation
// lang="en" est signalé via les alternates hreflang dans metadata
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
