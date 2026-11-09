"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, HardHat, Clock, Users, CheckCircle } from "lucide-react";
import CandidatureForm from "@/components/CandidatureForm";

const GradientText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #FB923C, #F97316, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const THEME = {
  accent: "#FB923C",
  btnGradient: "linear-gradient(135deg, #92400E, #C2410C, #F97316)",
  btnShadow: "0 4px 24px rgba(249,115,22,0.4)",
  btnTextColor: "#fff",
};

const LABELS = {
  submitBtn: "Soumettre ma candidature BTP",
};

export default function CandidatureBTP() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#0B0F1A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#F1F5F9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(249,115,22,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        .dot-grid-btp {
          background-image: linear-gradient(rgba(146,64,14,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(146,64,14,.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 68,
        background: scrolled ? "rgba(11,15,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/btp" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#94A3B8", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#F1F5F9"}
          onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>
          <ArrowLeft size={17} /><span style={{ fontSize: ".88rem" }}>Retour</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: "#FB923C", background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.3)", borderRadius: 4, padding: "2px 7px" }}>BTP</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="dot-grid-btp" style={{ padding: "100px 2rem 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(146,64,14,.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "8%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <HardHat size={13} style={{ color: "#FB923C" }} />
            <span style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 500 }}>Candidature BTP & Architecture · TalentFlux Suisse</span>
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 16 }}>
            Construisez votre prochaine étape.<br /><GradientText>Rejoignez le Flux BTP.</GradientText>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px" }}>
            Remplissez ce formulaire une seule fois. Nous matchons votre profil avec les mandats BTP & Architecture de nos clients en Suisse.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              [CheckCircle, "Réponse sous 48h"],
              [Clock, "5 min à remplir"],
              [Users, "Réseau de 30+ clients BTP"],
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={14} style={{ color: "#FB923C" }} />
                <span style={{ color: "#64748B", fontSize: ".82rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem 80px" }}>
        <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(146,64,14,0.07)" }}>
          <div style={{ padding: "16px 24px", background: "rgba(249,115,22,.05)", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 8 }}>
            <HardHat size={14} style={{ color: "#FB923C" }} />
            <span style={{ color: "#475569", fontSize: ".75rem", fontWeight: 600 }}>CANDIDATURE CONFIDENTIELLE · TRAITEMENT SOUS 48H</span>
          </div>
          <div style={{ padding: 28 }}>
            <CandidatureForm secteur="BTP" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
