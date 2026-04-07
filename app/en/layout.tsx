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

// Note: In Next.js App Router, nested layouts cannot override <html>.
// The lang attribute is set via the hreflang alternates in metadata above.
// For full lang="en" support, we inject it via a script on mount.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Switch html lang to "en" for this subtree */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "en";`,
        }}
      />
      {children}
    </>
  );
}
