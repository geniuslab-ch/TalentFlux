import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://talentflux.ch"),
  title: {
    default: "TalentFlux — Recrutement Spécialisé en Suisse",
    template: "%s | TalentFlux",
  },
  description:
    "Agence de recrutement spécialisée en Suisse : IT, Finance, Ingénierie, " +
    "Paysagisme, Télécommunications, Pharma & Life Sciences. Yverdon-les-Bains.",
  openGraph: { siteName: "TalentFlux", locale: "fr_CH", type: "website" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://talentflux.ch" },
};

// lang="fr" sur les pages FR (root)
// lang="en" sur les pages EN via app/en/layout.tsx qui override <html>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#080D1A" }}>{children}</body>
    </html>
  );
}
