// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxFinanceClient = dynamic(
  () => import("@/components/pages/TalentFluxFinance"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "Finance & Accounting Recruitment Switzerland",
  description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Swiss GAAP & IFRS bilingual profiles. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/finance",
    languages: {
      "fr": "https://talentflux.ch/finance",
      "en": "https://talentflux.ch/en/finance",
    },
  },
  openGraph: {
    title: "Finance & Accounting Recruitment Switzerland | TalentFlux",
    description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Swiss GAAP & IFRS bilingual profiles. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/finance",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxFinanceEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="Finance, accounting and management control recruitment"
        sectorSlug="en/finance"
        areaServed={["French-speaking Switzerland", "Geneva", "Zurich", "Vaud", "Switzerland"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#080D1A",
          borderBottom: `1px solid ${"#D4AF5A"}20`,
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
            background: "linear-gradient(135deg,#B4913C,#D4AF5A,#E8C97A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Finance & Accounting Recruitment in Switzerland
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
          CFO, Management Control, Audit, FINMA Compliance — Swiss GAAP & IFRS bilingual profiles.
        </p>
        <a
          href="/candidature/finance"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#B4913C,#D4AF5A,#E8C97A)",
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
            href="https://talentflux.ch/finance"
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
        <a href="/en/pharma" style={{ color: "#D4AF5A", fontSize: ".82rem" }}>Pharma & Life Sciences Recruitment</a>
        <a href="/en/ingenierie" style={{ color: "#D4AF5A", fontSize: ".82rem" }}>Engineering Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxFinanceClient />
    </>
  );
}
