// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxEngineeringClient = dynamic(
  () => import("@/components/pages/TalentFluxEngineering"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Recrutement Ingénieurs Suisse romande | TalentFlux"
export const metadata: Metadata = {
  title: "Recrutement Ingénieurs Suisse romande",
  description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
  alternates: { canonical: "https://talentflux.ch/ingenierie" },
  openGraph: {
    title: "Recrutement Ingénieurs Suisse romande | TalentFlux",
    description: "Recrutement ingénieurs spécialisés en Suisse. Mécanique, Automation, MedTech, Électronique, R&D. Experts ISO 13485, MDR et IEC 62304. Yverdon-les-Bains.",
    url: "https://talentflux.ch/ingenierie",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxEngineeringPage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement ingénieurs spécialisés, MedTech et automation"
        sectorSlug="ingenierie"
        areaServed={["Suisse romande", "Arc Lémanique", "Mittelland", "Suisse"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement Ingénierie & Technique en Suisse romande
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
          Mécanique, Automation, MedTech, R&D — ingénieurs certifiés ISO 13485 et MDR.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/it" style={{ color: "#818CF8", fontSize: ".82rem" }}>Recrutement IT</a>
        <a href="/paysagisme" style={{ color: "#818CF8", fontSize: ".82rem" }}>Recrutement Paysagisme</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxEngineeringClient />
    </>
  );
}
