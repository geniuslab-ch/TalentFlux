// Server Component — PAS de "use client" ici
// metadata + H1 visible + JSON-LD sont rendus dans le HTML initial par Next.js
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

// Composant interactif chargé côté client uniquement (hooks, animations, formulaires)
const TalentFluxTelecomClient = dynamic(
  () => import("@/components/pages/TalentFluxTelecom"),
  { ssr: false }
);

// ── Metadata ────────────────────────────────────────────────
// "TalentFlux" est ajouté automatiquement par le template du layout
// Résultat : "Recrutement Télécom & Réseaux Suisse | TalentFlux"
export const metadata: Metadata = {
  title: "Recrutement Télécom & Réseaux Suisse",
  description: "Recrutement Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. Yverdon.",
  alternates: { canonical: "https://talentflux.ch/telecom" },
  openGraph: {
    title: "Recrutement Télécom & Réseaux Suisse | TalentFlux",
    description: "Recrutement Télécommunications en Suisse. Spécialistes RNI/ORNI, RF Planners 5G, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre. Yverdon.",
    url: "https://talentflux.ch/telecom",
    type: "website",
    locale: "fr_CH",
  },
};

// ── Page (Server Component) ──────────────────────────────────
export default function TalentFluxTelecomPage() {
  return (
    <>
      {/* Schema.org JSON-LD — dans le HTML initial */}
      <JsonLd
        serviceType="Recrutement télécommunications, réseaux IP et infrastructure 5G"
        sectorSlug="telecom"
        areaServed={["Suisse romande", "Suisse alémanique", "Suisse entière"]}
      />

      {/*
        H1 VISIBLE — rendu serveur, présent dans le HTML avant tout JS.
        Google voit ce titre dès le premier octet.
        Le composant interactif se charge dessous et prend le relais visuellement.
      */}
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
          Recrutement Télécommunications & Infrastructure réseau en Suisse
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
          Spécialistes RNI, RF Planners 5G, ingénieurs réseau IP — des profils invisibles sur les portails classiques.
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
          Déposer ma candidature →
        </a>
      </div>

      {/* Maillage interne SEO — visible dans le DOM, discret visuellement */}
      <nav
        aria-label="Secteurs complémentaires"
        style={{ maxWidth: 800, margin: "0 auto", padding: "12px 2rem", display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <a href="/" style={{ color: "#475569", fontSize: ".78rem" }}>← Accueil</a>
        <a href="/it" style={{ color: "#0EA5E9", fontSize: ".82rem" }}>Recrutement IT</a>
        <a href="/ingenierie" style={{ color: "#0EA5E9", fontSize: ".82rem" }}>Recrutement Ingénierie</a>
      </nav>

      {/* Composant interactif React — animations, formulaire, FAQ */}
      <TalentFluxTelecomClient />
    </>
  );
}
