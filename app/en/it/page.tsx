// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxITClient = dynamic(
  () => import("@/components/pages/TalentFluxIT"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "IT Recruitment in Switzerland | Yverdon",
  description: "Specialized IT recruitment agency in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects, Tech Leads. 50+ tech clients network. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/it",
    languages: {
      "fr": "https://talentflux.ch/it",
      "en": "https://talentflux.ch/en/it",
    },
  },
  openGraph: {
    title: "IT Recruitment in Switzerland | Yverdon | TalentFlux",
    description: "Specialized IT recruitment agency in Switzerland. Developers, DevOps, Data Engineers, Cloud Architects, Tech Leads. 50+ tech clients network. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/it",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxITEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="IT and software development recruitment"
        sectorSlug="en/it"
        areaServed={["French-speaking Switzerland", "Lausanne", "Geneva", "Zurich", "Switzerland"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#080D1A",
          borderBottom: `1px solid ${"#38BDF8"}20`,
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
            background: "linear-gradient(135deg,#2563EB,#0EA5E9,#38BDF8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          IT & Digital Recruitment in Switzerland
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
          Developers, DevOps, Data Engineers, Tech Leads — rare tech profiles placed within 48h.
        </p>
        <a
          href="/candidature/it"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#2563EB,#0EA5E9,#38BDF8)",
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
            href="https://talentflux.ch/it"
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
        <a href="/en/telecom" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Telecom Recruitment</a>
        <a href="/en/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Engineering Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxITClient />
    </>
  );
}
