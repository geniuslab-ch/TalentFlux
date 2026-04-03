"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle, Clock, Users } from "lucide-react";
import CandidatureForm from "@/components/CandidatureForm";

const GoldText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #B4913C, #D4AF5A, #E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const THEME = {
  accent: "#D4AF5A",
  btnGradient: "linear-gradient(90deg, #B4913C, #D4AF5A, #E8C97A, #B4913C)",
  btnShadow: "0 4px 24px rgba(180,145,60,0.4)",
  btnTextColor: "#0B1120",
};

const LABELS = {
  submitBtn: "Soumettre ma candidature Finance",
};

export default function CandidatureFinance() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#0B1120", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#F1F5F9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(180,145,60,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        .fine-grid {
          background-image: linear-gradient(rgba(180,145,60,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,145,60,.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 68,
        background: scrolled ? "rgba(11,17,32,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/finance" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#94A3B8", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#F1F5F9"}
          onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>
          <ArrowLeft size={17} /><span style={{ fontSize: ".88rem" }}>Retour</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: "#D4AF5A", background: "rgba(180,145,60,.1)", border: "1px solid rgba(180,145,60,.3)", borderRadius: 4, padding: "2px 7px" }}>FINANCE</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="fine-grid" style={{ padding: "100px 2rem 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", left: "8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,64,175,.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,145,60,.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(180,145,60,.07)", border: "1px solid rgba(180,145,60,.3)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <Lock size={13} style={{ color: "#D4AF5A" }} />
            <span style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 500 }}>Candidature Finance · Confidentielle · TalentFlux Suisse</span>
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 16 }}>
            Votre expertise financière<br /><GoldText>mérite le bon mandat.</GoldText>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px" }}>
            Un consultant TalentFlux analyse votre profil et vous présente des opportunités sélectionnées — pas des offres génériques.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              [CheckCircle, "Discrétion absolue"],
              [Clock, "Réponse sous 24h"],
              [Users, "Réseau Finance Suisse"],
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={14} style={{ color: "#D4AF5A" }} />
                <span style={{ color: "#64748B", fontSize: ".82rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem 80px" }}>
        <div style={{ background: "rgba(15,22,40,0.9)", border: "1px solid rgba(180,145,60,0.2)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(180,145,60,0.05)" }}>
          <div style={{ padding: "16px 24px", background: "rgba(180,145,60,.04)", borderBottom: "1px solid rgba(180,145,60,.15)", display: "flex", alignItems: "center", gap: 8 }}>
            <Lock size={14} style={{ color: "#D4AF5A" }} />
            <span style={{ color: "#475569", fontSize: ".75rem", fontWeight: 600 }}>DOSSIER CONFIDENTIEL · ACCÈS LIMITÉ ÉQUIPE TALENTFLUX</span>
          </div>
          <div style={{ padding: 28 }}>
            <CandidatureForm secteur="Finance" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
