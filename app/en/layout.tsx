import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://talentflux.ch"),
  title: {
    default: "TalentFlux — Specialized Recruitment in Switzerland",
    template: "%s | TalentFlux",
  },
  description:
    "Specialized recruitment agency in Switzerland: IT, Finance, Engineering, Landscaping, Telecommunications, Pharma & Life Sciences. Yverdon-les-Bains.",
  openGraph: { siteName: "TalentFlux", locale: "en_CH", type: "website" },
  robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
