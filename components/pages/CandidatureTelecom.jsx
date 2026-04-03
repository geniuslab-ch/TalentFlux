"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Signal, Clock, Users, CheckCircle } from "lucide-react";
import CandidatureForm from "@/components/CandidatureForm";

const GradientText = ({ children }) => (
  <span style={{ background:"linear-gradient(135deg,#38BDF8,#0EA5E9,#7DD3FC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{children}</span>
);

const THEME = {
  accent:"#0EA5E9",
  btnGradient:"linear-gradient(135deg,#0369A1,#0EA5E9,#38BDF8)",
  btnShadow:"0 4px 24px rgba(14,165,233,0.4)",
  btnTextColor:"#fff",
};

const LABELS = { submitBtn:"Soumettre ma candidature Télécom" };

export default function CandidatureTelecom() {
  const { isMobile } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);

  return (
    <div style={{ background:"#080D1A", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#F0F6FF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} html{scroll-behavior:smooth;}
        ::selection{background:rgba(14,165,233,0.25);color:#fff;}
        input::placeholder,textarea::placeholder{color:#1E3A5F;}
        .signal-grid{background-image:linear-gradient(rgba(14,165,233,.03)1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.03)1px,transparent 1px);background-size:52px 52px;}
      `}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 2rem", height:68, background:scrolled?"rgba(8,13,26,0.95)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"none", transition:"all .3s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/telecom" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:"#7EA8D0", transition:"color .2s" }} onMouseEnter={e=>e.currentTarget.style.color="#F0F6FF"} onMouseLeave={e=>e.currentTarget.style.color="#7EA8D0"}>
          <ArrowLeft size={17}/><span style={{ fontSize:".88rem" }}>Retour</span>
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height:36, objectFit:"contain" }} />
          <span style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"#38BDF8", background:"rgba(14,165,233,.1)", border:"1px solid rgba(14,165,233,.3)", borderRadius:4, padding:"2px 7px" }}>TÉLÉCOM</span>
        </div>
      </nav>

      <div className="signal-grid" style={{ padding:"100px 2rem 48px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:"10%", left:"10%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.1),transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(14,165,233,.08)", border:"1px solid rgba(14,165,233,.25)", borderRadius:100, padding:"6px 18px", marginBottom:24 }}>
            <Signal size={13} style={{ color:"#38BDF8" }} />
            <span style={{ color:"#7EA8D0", fontSize:".78rem", fontWeight:500 }}>Candidature Télécom · TalentFlux Suisse</span>
          </div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, lineHeight:1.12, marginBottom:16 }}>
            Votre expertise RNI / RF mérite<br/><GradientText>le bon interlocuteur.</GradientText>
          </h1>
          <p style={{ color:"#7EA8D0", fontSize:".97rem", lineHeight:1.8, maxWidth:540, margin:"0 auto 36px" }}>
            Spécialiste RNI, RF planner, géomaticien télécom ou pilote drone certifié OFAC — déposez votre profil. Nous le matchons avec les mandats de nos clients opérateurs en Suisse.
          </p>
          <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
            {[[CheckCircle,"Réponse sous 24h"],[Clock,"5-8 jours délai moyen"],[Users,"Réseau Swisscom · Sunrise · Salt"]].map(([Icon,text],i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Icon size={14} style={{ color:"#0EA5E9" }} /><span style={{ color:"#64748B", fontSize:".82rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"0 2rem 80px" }}>
        <div style={{ background:"rgba(6,12,26,0.9)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:24, overflow:"hidden", boxShadow:"0 0 60px rgba(14,165,233,0.07)" }}>
          <div style={{ padding:"16px 24px", background:"rgba(14,165,233,.05)", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:8 }}>
            <Signal size={14} style={{ color:"#0EA5E9" }} />
            <span style={{ color:"#475569", fontSize:".75rem", fontWeight:600 }}>CANDIDATURE CONFIDENTIELLE · CERTIFICATIONS VÉRIFIÉES AVANT PRÉSENTATION</span>
          </div>
          <div style={{ padding:28 }}>
            <CandidatureForm secteur="Télécommunications" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
