// Server Component — no "use client" here
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Interactive component loaded client-side only (hooks, animations, forms)
const TalentFluxTelecomClient = dynamic(
  () => import("@/components/pages/TalentFluxTelecom"),
  { ssr: false }
);

// ── SEO Metadata ─────────────────────────────────────────────
// "TalentFlux" is appended automatically by the layout template
export const metadata: Metadata = {
  title: "Telecom & Network Recruitment Switzerland",
  description: "Specialized Telecommunications recruitment in Switzerland. NRI/ONIR specialists, 5G RF Planners, IP network engineers (CCNP/CCIE), fibre technicians. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/telecom",
    languages: {
      "fr": "https://talentflux.ch/telecom",
      "en": "https://talentflux.ch/en/telecom",
    },
  },
  openGraph: {
    title: "Telecom & Network Recruitment Switzerland | TalentFlux",
    description: "Specialized Telecommunications recruitment in Switzerland. NRI/ONIR specialists, 5G RF Planners, IP network engineers (CCNP/CCIE), fibre technicians. Yverdon.",
    url: "https://talentflux.ch/en/telecom",
    type: "website",
    locale: "en_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxTelecomEnPage() {
  return (
    <>
      {/* schema.org JSON-LD — rendered in initial HTML */}
      <JsonLd
        serviceType="Telecommunications, IP networks and 5G infrastructure recruitment"
        sectorSlug="en/telecom"
        areaServed={["French-speaking Switzerland", "German-speaking Switzerland", "Switzerland"]}
      />

      {/* H1 — visible, server-rendered, above the fold */}
      <div
        style={{
          background: "#080D1A",
          borderBottom: `1px solid ${"#0EA5E9"}20`,
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
            background: "linear-gradient(135deg,#0369A1,#0EA5E9,#38BDF8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Telecommunications & Network Infrastructure Recruitment in Switzerland
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
          NRI specialists, 5G RF Planners, IP network engineers — profiles invisible on standard job boards.
        </p>
        <a
          href="/candidature/telecom"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#0369A1,#0EA5E9,#38BDF8)",
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
            href="https://talentflux.ch/telecom"
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
        <a href="/en/it" style={{ color: "#0EA5E9", fontSize: ".82rem" }}>IT Recruitment</a>
        <a href="/en/ingenierie" style={{ color: "#0EA5E9", fontSize: ".82rem" }}>Engineering Recruitment</a>
      </nav>

      {/* Interactive React component — animations, form, FAQ */}
      <TalentFluxTelecomClient />
    </>
  );
}
