// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxEngineeringClient = dynamic(
  () => import("@/components/pages/TalentFluxEngineering"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "Engineering Recruitment Switzerland",
  description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. ISO 13485, MDR and IEC 62304 certified experts. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/ingenierie",
    languages: {
      "fr": "https://talentflux.ch/ingenierie",
      "en": "https://talentflux.ch/en/ingenierie",
    },
  },
  openGraph: {
    title: "Engineering Recruitment Switzerland | TalentFlux",
    description: "Specialized engineering recruitment in Switzerland. Mechanical, Automation, MedTech, Electronics, R&D. ISO 13485, MDR and IEC 62304 certified experts. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/ingenierie",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxEngineeringEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="Specialized engineering, MedTech and automation recruitment"
        sectorSlug="en/ingenierie"
        areaServed={["French-speaking Switzerland", "Lake Geneva Region", "Mittelland", "Switzerland"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#080D1A",
          borderBottom: `1px solid ${"#818CF8"}20`,
          padding: "80px 2rem 40px",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#F1F5F9",
            marginBottom: 14,
            background: "linear-gradient(135deg,#4F46E5,#818CF8,#A5B4FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Engineering & Technical Recruitment in Switzerland
        </h1>
        <p
          style={{
            color: "#94A3B8",
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 24px",
          }}
        >
          Mechanical, Automation, MedTech, R&D — ISO 13485 and MDR certified engineers.
        </p>
        <a
          href="/candidature/ingenierie"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#4F46E5,#818CF8,#A5B4FC)",
            color: "#fff",
            fontWeight: 700,
            fontSize: ".9rem",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Apply now →
        </a>
        <div style={{ marginTop: 12 }}>
          <a
            href="https://talentflux.ch/ingenierie"
            style={{ color: "#475569", fontSize: ".78rem", textDecoration: "none" }}
          >
            🇫🇷 Voir la version française
          </a>
        </div>
      </div>

      {/* Internal linking — English SEO silos */}
      <nav
        aria-label="Related sectors"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/en" style={{ color: "#475569", fontSize: ".78rem" }}>← Home</a>
        <a href="/en/it" style={{ color: "#818CF8", fontSize: ".82rem" }}>IT Recruitment</a>
        <a href="/en/telecom" style={{ color: "#818CF8", fontSize: ".82rem" }}>Telecom Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxEngineeringClient />
    </>
  );
}
