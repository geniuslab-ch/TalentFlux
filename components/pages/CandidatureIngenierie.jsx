"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CircuitBoard, CheckCircle, Clock, Factory } from "lucide-react";
import CandidatureForm from "@/components/CandidatureForm";

const ElectricText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #3B82F6, #38BDF8, #67E8F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const THEME = {
  accent: "#3B82F6",
  btnGradient: "linear-gradient(135deg, #1E40AF, #3B82F6, #38BDF8)",
  btnShadow: "0 4px 24px rgba(59,130,246,0.4)",
  btnTextColor: "#fff",
};

const LABELS = {
  submitBtn: "Soumettre ma candidature Ingénierie",
};

export default function CandidatureIngenierie() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#080D1A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#F1F5F9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,130,246,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        .dot-grid-ing {
          background-image: radial-gradient(rgba(59,130,246,0.18) 1px, transparent 1px);
          background-size: 26px 26px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 68,
        background: scrolled ? "rgba(8,13,26,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59,130,246,0.12)" : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/ingenierie" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#94A3B8", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#F1F5F9"}
          onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>
          <ArrowLeft size={17} /><span style={{ fontSize: ".88rem" }}>Retour</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: "#60A5FA", background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.3)", borderRadius: 4, padding: "2px 7px", fontFamily: "'DM Mono',monospace" }}>INGÉNIERIE</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="dot-grid-ing" style={{ padding: "100px 2rem 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "8%", left: "6%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,.07)", border: "1px solid rgba(59,130,246,.35)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <CircuitBoard size={13} style={{ color: "#60A5FA" }} />
            <span style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 500, fontFamily: "'DM Mono',monospace" }}>
              Candidature Ingénierie · Arc jurassien & Bassin lémanique
            </span>
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 16 }}>
            Votre expertise technique<br /><ElectricText>au bon endroit.</ElectricText>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px" }}>
            MedTech, horlogerie, automation — nous connaissons l'écosystème industriel suisse. Votre dossier est analysé par des consultants qui comprennent vos spécialités.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              [CheckCircle, "65 critères de matching"],
              [Clock, "Shortlist sous 72h"],
              [Factory, "MedTech · Horlogerie · Automation"],
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={14} style={{ color: "#3B82F6" }} />
                <span style={{ color: "#64748B", fontSize: ".82rem", fontFamily: i === 2 ? "'DM Mono',monospace" : undefined }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem 80px" }}>
        <div style={{ background: "rgba(12,20,38,0.9)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(59,130,246,0.07)" }}>
          <div style={{ padding: "16px 24px", background: "rgba(59,130,246,.05)", borderBottom: "1px solid rgba(59,130,246,.12)", display: "flex", alignItems: "center", gap: 8 }}>
            <CircuitBoard size={14} style={{ color: "#60A5FA" }} />
            <span style={{ color: "#475569", fontSize: ".72rem", fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>
              // DOSSIER TECHNIQUE CONFIDENTIEL · TRAITEMENT SOUS 24H
            </span>
          </div>
          <div style={{ padding: 28 }}>
            <CandidatureForm secteur="Ingénierie" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
