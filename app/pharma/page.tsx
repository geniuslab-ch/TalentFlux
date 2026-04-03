// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxPharmaClient = dynamic(
  () => import("@/components/pages/TalentFluxPharma"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Chasseur de têtes Pharma & Life Sciences Suisse | TalentFlux"
export const metadata: Metadata = {
  title: "Chasseur de têtes Pharma & Life Sciences Suisse",
  description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. Yverdon.",
  alternates: { canonical: "https://talentflux.ch/pharma" },
  openGraph: {
    title: "Chasseur de têtes Pharma & Life Sciences Suisse | TalentFlux",
    description: "Recrutement Pharma & Life Sciences en Suisse. QA Manager, Responsible Person, Affaires Réglementaires, Validation GMP. Experts Swissmedic & ICH Q9. Yverdon.",
    url: "https://talentflux.ch/pharma",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPharmaPage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement pharmaceutique, biotechnologie et Life Sciences"
        sectorSlug="pharma"
        areaServed={["Arc Lémanique", "Mittelland", "Suisse romande", "Suisse"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement Pharma, Biotech & Life Sciences en Suisse
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
          QA Manager, Responsible Person, AR, Validation GMP — experts Swissmedic placés en 6 à 10 jours.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/finance" style={{ color: "#C026D3", fontSize: ".82rem" }}>Recrutement Finance</a>
        <a href="/ingenierie" style={{ color: "#C026D3", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxPharmaClient />
    </>
  );
}
