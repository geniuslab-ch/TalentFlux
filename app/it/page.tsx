// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxITClient = dynamic(
  () => import("@/components/pages/TalentFluxIT"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Recrutement IT en Suisse romande | Yverdon | TalentFlux"
export const metadata: Metadata = {
  title: "Recrutement IT en Suisse romande | Yverdon",
  description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau 50+ clients tech. Yverdon-les-Bains, Vaud.",
  alternates: { canonical: "https://talentflux.ch/it" },
  openGraph: {
    title: "Recrutement IT en Suisse romande | Yverdon | TalentFlux",
    description: "Agence de recrutement IT spécialisée en Suisse romande. Développeurs, DevOps, Data Engineers, Cloud Architects, Tech Leads. Réseau 50+ clients tech. Yverdon-les-Bains, Vaud.",
    url: "https://talentflux.ch/it",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxITPage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement IT, développement logiciel et digital"
        sectorSlug="it"
        areaServed={["Suisse romande", "Lausanne", "Genève", "Zurich", "Suisse"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement IT & Digital en Suisse romande
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
          Développeurs, DevOps, Data Engineers, Tech Leads — des profils tech rares placés en 48h.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/telecom" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Télécom</a>
        <a href="/ingenierie" style={{ color: "#38BDF8", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxITClient />
    </>
  );
}
