// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxPaysagismeClient = dynamic(
  () => import("@/components/pages/TalentFluxPaysagisme"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Recrutement Paysagisme Suisse romande | TalentFlux"
export const metadata: Metadata = {
  title: "Recrutement Paysagisme Suisse romande",
  description: "Recrutement paysagistes, arboristes ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/paysagisme" },
  openGraph: {
    title: "Recrutement Paysagisme Suisse romande | TalentFlux",
    description: "Recrutement paysagistes, arboristes ISA/ECC et chefs de chantier en Suisse romande. CFC paysagiste, maçons paysagistes. Yverdon-les-Bains, Vaud.",
    url: "https://talentflux.ch/paysagisme",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxPaysagismePage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement paysagistes, arboristes et chefs de chantier"
        sectorSlug="paysagisme"
        areaServed={["Suisse romande", "Vaud", "Genève", "Fribourg", "Valais"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement Paysagisme & Espaces verts en Suisse romande
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
          CFC paysagiste, arboriste ISA/ECC, chef de chantier — profils terrain introuvables sur les portails classiques.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/ingenierie" style={{ color: "#22C55E", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
        <a href="/it" style={{ color: "#22C55E", fontSize: ".82rem" }}>Recrutement IT</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxPaysagismeClient />
    </>
  );
}
