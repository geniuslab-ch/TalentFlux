// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxPharmaClient = dynamic(
  () => import("@/components/pages/TalentFluxPharma"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "Pharma & Life Sciences Headhunter Switzerland",
  description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, Regulatory Affairs, GMP Validation. Swissmedic & ICH Q9 experts. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/pharma",
    languages: {
      "fr": "https://talentflux.ch/pharma",
      "en": "https://talentflux.ch/en/pharma",
    },
  },
  openGraph: {
    title: "Pharma & Life Sciences Headhunter Switzerland | TalentFlux",
    description: "Pharma & Life Sciences recruitment in Switzerland. QA Manager, Responsible Person, Regulatory Affairs, GMP Validation. Swissmedic & ICH Q9 experts. Yverdon.",
    url: "https://talentflux.ch/en/pharma",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPharmaEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="Pharmaceutical, biotechnology and Life Sciences recruitment"
        sectorSlug="en/pharma"
        areaServed={["Lake Geneva Region", "Mittelland", "French-speaking Switzerland", "Switzerland"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#070408",
          borderBottom: `1px solid ${"#C026D3"}20`,
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
            background: "linear-gradient(135deg,#7C3AED,#C026D3,#E879F9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Pharma, Biotech & Life Sciences Recruitment in Switzerland
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
          QA Manager, Responsible Person, RA, GMP Validation — Swissmedic experts placed in 6 to 10 days.
        </p>
        <a
          href="/candidature/pharma"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#7C3AED,#C026D3,#E879F9)",
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
            href="https://talentflux.ch/pharma"
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
        <a href="/en/finance" style={{ color: "#C026D3", fontSize: ".82rem" }}>Finance Recruitment</a>
        <a href="/en/ingenierie" style={{ color: "#C026D3", fontSize: ".82rem" }}>Engineering Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxPharmaClient />
    </>
  );
}
