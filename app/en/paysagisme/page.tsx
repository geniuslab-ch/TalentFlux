// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxPaysagismeClient = dynamic(
  () => import("@/components/pages/TalentFluxPaysagisme"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "Landscaping & Horticulture Recruitment Switzerland",
  description: "Recruitment of landscape gardeners, ISA/ECC certified arborists and site managers in Switzerland. Landscaping CFC, paving specialists. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/paysagisme",
    languages: {
      "fr": "https://talentflux.ch/paysagisme",
      "en": "https://talentflux.ch/en/paysagisme",
    },
  },
  openGraph: {
    title: "Landscaping & Horticulture Recruitment Switzerland | TalentFlux",
    description: "Recruitment of landscape gardeners, ISA/ECC certified arborists and site managers in Switzerland. Landscaping CFC, paving specialists. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/paysagisme",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPaysagismeEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="Landscaping, arborists and site manager recruitment"
        sectorSlug="en/paysagisme"
        areaServed={["French-speaking Switzerland", "Vaud", "Geneva", "Fribourg", "Valais"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#080F0A",
          borderBottom: `1px solid ${"#22C55E"}20`,
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
            background: "linear-gradient(135deg,#15803D,#22C55E,#4ADE80)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Landscaping & Green Spaces Recruitment in Switzerland
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
          CFC landscaper, ISA/ECC arborist, site manager — field profiles unavailable on standard job boards.
        </p>
        <a
          href="/candidature/paysagisme"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#15803D,#22C55E,#4ADE80)",
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
            href="https://talentflux.ch/paysagisme"
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
        <a href="/en/ingenierie" style={{ color: "#22C55E", fontSize: ".82rem" }}>Engineering Recruitment</a>
        <a href="/en/it" style={{ color: "#22C55E", fontSize: ".82rem" }}>IT Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxPaysagismeClient />
    </>
  );
}
