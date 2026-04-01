import { useMobile } from "../utils/responsive";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Clock, Users, CheckCircle } from "lucide-react";
import CandidatureForm from "../components/CandidatureForm";

const GradientText = ({ children }) => (
  <span style={{ background:"linear-gradient(135deg,#4ADE80,#22C55E,#86EFAC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{children}</span>
);

const THEME = {
  accent:"#22C55E",
  btnGradient:"linear-gradient(135deg,#15803D,#16A34A,#22C55E)",
  btnShadow:"0 4px 24px rgba(34,197,94,0.35)",
  btnTextColor:"#fff",
};

const LABELS = { submitBtn:"Soumettre ma candidature Paysagisme" };

export default function CandidaturePaysagisme() {
  const { isMobile } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);

  return (
    <div style={{ background:"#080F0A", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#F0F7F2" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} html{scroll-behavior:smooth;}
        ::selection{background:rgba(34,197,94,0.25);color:#fff;}
        input::placeholder,textarea::placeholder{color:#2D4A37;}
        .pay-grid{background-image:linear-gradient(rgba(22,163,74,.03)1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,.03)1px,transparent 1px);background-size:52px 52px;}
      `}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 2rem", height:68, background:scrolled?"rgba(8,15,10,0.95)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"none", transition:"all .3s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link to="/paysagisme" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:"#94A89A", transition:"color .2s" }} onMouseEnter={e=>e.currentTarget.style.color="#F0F7F2"} onMouseLeave={e=>e.currentTarget.style.color="#94A89A"}>
          <ArrowLeft size={17}/><span style={{ fontSize:".88rem" }}>Retour</span>
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height:36, objectFit:"contain" }} />
          <span style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"#22C55E", background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)", borderRadius:4, padding:"2px 7px" }}>PAYSAGE</span>
        </div>
      </nav>

      <div className="pay-grid" style={{ padding:"100px 2rem 48px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:"10%", left:"10%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(22,163,74,.1),transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(34,197,94,.08)", border:"1px solid rgba(34,197,94,.25)", borderRadius:100, padding:"6px 18px", marginBottom:24 }}>
            <Leaf size={13} style={{ color:"#4ADE80" }} />
            <span style={{ color:"#94A89A", fontSize:".78rem", fontWeight:500 }}>Candidature Paysagisme · TalentFlux Suisse</span>
          </div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, lineHeight:1.12, marginBottom:16 }}>
            Votre expertise terrain,<br/><GradientText>au bon endroit.</GradientText>
          </h1>
          <p style={{ color:"#94A89A", fontSize:".97rem", lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>
            Remplissez ce formulaire une seule fois. Nous matchons votre profil avec les mandats paysagisme de nos clients en Suisse romande.
          </p>
          <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
            {[[CheckCircle,"Réponse sous 24h"],[Clock,"5 min à remplir"],[Users,"Réseau d'entreprises paysage CH"]].map(([Icon,text],i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Icon size={14} style={{ color:"#22C55E" }} /><span style={{ color:"#64748B", fontSize:".82rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"0 2rem 80px" }}>
        <div style={{ background:"rgba(10,20,12,0.9)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:24, overflow:"hidden", boxShadow:"0 0 60px rgba(22,163,74,0.06)" }}>
          <div style={{ padding:"16px 24px", background:"rgba(34,197,94,.05)", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:8 }}>
            <Leaf size={14} style={{ color:"#22C55E" }} />
            <span style={{ color:"#475569", fontSize:".75rem", fontWeight:600 }}>CANDIDATURE CONFIDENTIELLE · TRAITEMENT SOUS 24H</span>
          </div>
          <div style={{ padding:28 }}>
            <CandidatureForm secteur="Paysagisme" theme={THEME} labels={LABELS} />
          </div>
        </div>
      </div>
    </div>
  );
}
