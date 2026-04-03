"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, CheckCircle, Clock, Microscope } from "lucide-react";
import CandidatureForm from "@/components/CandidatureForm";

const PharmaText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #F0ABFC, #E879F9, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const THEME = {
  accent: "#C026D3",
  btnGradient: "linear-gradient(135deg, #7C3AED, #C026D3, #E879F9)",
  btnShadow: "0 4px 24px rgba(192,38,211,0.4)",
  btnTextColor: "#fff",
};

const LABELS = { submitBtn: "Soumettre ma candidature Pharma & Life Sciences" };

export default function CandidaturePharma() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#070408", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#FAF0FF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: #3B1A4A; }
        .pharma-bg { background-image: linear-gradient(rgba(192,38,211,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(192,38,211,.025) 1px, transparent 1px); background-size: 52px 52px; }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 68, background: scrolled ? "rgba(7,4,8,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/pharma" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#6B3A80" }} onMouseEnter={e => e.currentTarget.style.color = "#FAF0FF"} onMouseLeave={e => e.currentTarget.style.color = "#6B3A80"}>
          <ArrowLeft size={17} /><span style={{ fontSize: ".88rem" }}>Retour</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: "#F0ABFC", background: "rgba(192,38,211,.1)", border: "1px solid rgba(232,121,249,.3)", borderRadius: 4, padding: "2px 7px" }}>PHARMA</span>
        </div>
      </nav>

      <div className="pharma-bg" style={{ padding: "100px 2rem 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(192,38,211,.08)", border: "1px solid rgba(232,121,249,.25)", borderRadius: 100, padding: "6px 18px", marginBottom: 24 }}>
            <FlaskConical size={13} style={{ color: "#E879F9" }} />
            <span style={{ color: "#6B3A80", fontSize: ".78rem", fontWeight: 500 }}>Candidature Pharma & Life Sciences · TalentFlux Suisse</span>
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 16, color: "#FAF0FF" }}>
            Votre expertise GMP & réglementaire<br /><PharmaText>mérite un employeur qui la comprend.</PharmaText>
          </h1>
          <p style={{ color: "#C49AD4", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 36px" }}>
            QA, Affaires Réglementaires, Validation, Production GMP — remplissez ce formulaire une seule fois. Nous matchons votre profil avec les mandats pharma & biotech de nos clients en Suisse.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[[CheckCircle, "Réponse sous 24h"], [Clock, "5 min à remplir"], [Microscope, "Réseau pharma suisse"]].map(([Icon, text], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={14} style={{ color: "#E879F9" }} /><span style={{ color: "#6B3A80", fontSize: ".82rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem 80px" }}>
        <div style={{ background: "rgba(12,4,20,0.9)", border: "1px solid rgba(232,121,249,0.1)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(192,38,211,0.07)" }}>
          <div style={{ padding: "16px 24px", background: "rgba(192,38,211,.05)", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 8 }}>
            <FlaskConical size={14} style={{ color: "#E879F9" }} />
            <span style={{ color: "#6B3A80", fontSize: ".75rem", fontWeight: 600 }}>CANDIDATURE CONFIDENTIELLE · EXPERTISE GMP & RÉGLEMENTAIRE VÉRIFIÉE</span>
          </div>
          <div style={{ padding: 28 }}>
            <CandidatureForm secteur="Pharma & Life Sciences" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
