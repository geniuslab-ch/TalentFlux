// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxFinanceClient = dynamic(
  () => import("@/components/pages/TalentFluxFinance"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Recrutement Finance & Comptabilité Suisse | TalentFlux"
export const metadata: Metadata = {
  title: "Recrutement Finance & Comptabilité Suisse",
  description: "Recrutement Finance spécialisé en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS bilingues. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/finance" },
  openGraph: {
    title: "Recrutement Finance & Comptabilité Suisse | TalentFlux",
    description: "Recrutement Finance spécialisé en Suisse. CFO, Contrôle de gestion, Audit, Trésorerie, Compliance FINMA. Profils Swiss GAAP & IFRS bilingues. Yverdon-les-Bains.",
    url: "https://talentflux.ch/finance",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxFinancePage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement Finance, comptabilité et contrôle de gestion"
        sectorSlug="finance"
        areaServed={["Suisse romande", "Genève", "Zurich", "Vaud", "Suisse"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement Finance & Contrôle de gestion en Suisse
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
          CFO, Contrôle de gestion, Audit, Compliance FINMA — profils Swiss GAAP & IFRS.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/pharma" style={{ color: "#D4AF5A", fontSize: ".82rem" }}>Recrutement Pharma & Life Sciences</a>
        <a href="/ingenierie" style={{ color: "#D4AF5A", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxFinanceClient />
    </>
  );
}
