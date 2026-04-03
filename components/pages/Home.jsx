"use client";
import { useState, useEffect, useRef } from "react";
import { useMobile } from "@/utils/responsive";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, ChevronDown, Star,
  Phone, Mail, MapPin, Users, Shield, Clock,
  Terminal, FlaskConical, Cpu, Leaf, Signal, Landmark
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── Intersection observer ────────────────────────────────────
const useInView = (t = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};

// ── 6 verticales ────────────────────────────────────────────
const VERTICALS = [
  {
    key: "it",
    icon: Terminal,
    label: "IT & Digital",
    tag: "Tech",
    accent: "#38BDF8",
    accentD: "#2563EB",
    grad: "linear-gradient(135deg,#2563EB,#0EA5E9,#38BDF8)",
    bg: "rgba(14,165,233,.06)",
    border: "rgba(56,189,248,.25)",
    path: "/it",
    candidature: "/candidature/it",
    pitch: "Dev, DevOps, Data, Cloud, Sécurité",
    detail: "Full-stack, architectes cloud, ingénieurs ML, RSSI — profils tech pris d'assaut par les scale-ups et grands groupes suisses.",
    stats: [["200+","profils IT placés"],["48h","délai moyen"],["CDI & Freelance","tous contrats"]],
    metiers: ["Développeur Full-Stack","DevOps / SRE","Data Engineer","Cloud Architect","Tech Lead","RSSI / Cybersécurité"],
  },
  {
    key: "finance",
    icon: Landmark,
    label: "Finance & Contrôle",
    tag: "Finance",
    accent: "#D4AF5A",
    accentD: "#B4913C",
    grad: "linear-gradient(135deg,#B4913C,#D4AF5A,#E8C97A)",
    bg: "rgba(212,175,90,.06)",
    border: "rgba(212,175,90,.25)",
    path: "/finance",
    candidature: "/candidature/finance",
    pitch: "CFO, Contrôle de gestion, Audit, AR, Trésorerie",
    detail: "Experts financiers bilingues maîtrisant Swiss GAAP, IFRS et les exigences FINMA. Du CFO au chef comptable en consolidation.",
    stats: [["Swiss GAAP","& IFRS"],["Geneva, Zurich","& Vaud"],["Big4 & PME","tous contextes"]],
    metiers: ["CFO / Direction financière","Contrôle de gestion","Audit interne / externe","Trésorerie","M&A","Compliance FINMA"],
  },
  {
    key: "ingenierie",
    icon: Cpu,
    label: "Ingénierie & Technique",
    tag: "Ingénierie",
    accent: "#818CF8",
    accentD: "#4F46E5",
    grad: "linear-gradient(135deg,#4F46E5,#818CF8,#A5B4FC)",
    bg: "rgba(129,140,248,.06)",
    border: "rgba(129,140,248,.25)",
    path: "/ingenierie",
    candidature: "/candidature/ingenierie",
    pitch: "Mécanique, Automation, MedTech, Électronique, R&D",
    detail: "Ingénieurs spécialisés dans les normes suisses ISO 13485, MDR, IEC 62304. Horlogerie, MedTech, automation industrielle.",
    stats: [["ISO 13485","& MDR"],["Horlogerie","& MedTech"],["R&D & Production","tous niveaux"]],
    metiers: ["Ingénieur mécanique","Automation / PLC","Qualité / Réglementaire","R&D / Innovation","Électronique embarqué","Validation"],
  },
  {
    key: "paysagisme",
    icon: Leaf,
    label: "Paysagisme",
    tag: "Paysage",
    accent: "#22C55E",
    accentD: "#15803D",
    grad: "linear-gradient(135deg,#15803D,#22C55E,#4ADE80)",
    bg: "rgba(34,197,94,.06)",
    border: "rgba(34,197,94,.25)",
    path: "/paysagisme",
    candidature: "/candidature/paysagisme",
    pitch: "CFC, Arboristes ISA/ECC, Chefs de chantier, Conducteurs",
    detail: "Paysagistes CFC, arboristes certifiés ISA/ECC, maçons paysagistes, chefs de chantier — profils terrain introuvables via les portails classiques.",
    stats: [["CFC & ISA","certifications"],["Suisse romande","& alémanique"],["CDI & Saison","tous contrats"]],
    metiers: ["Jardinier-paysagiste CFC","Arboriste-grimpeur ISA/ECC","Maçon paysagiste","Chef de chantier","Conducteur de travaux","Technicien irrigation"],
  },
  {
    key: "telecom",
    icon: Signal,
    label: "Télécommunications",
    tag: "Télécom",
    accent: "#0EA5E9",
    accentD: "#0369A1",
    grad: "linear-gradient(135deg,#0369A1,#0EA5E9,#38BDF8)",
    bg: "rgba(14,165,233,.06)",
    border: "rgba(14,165,233,.25)",
    path: "/telecom",
    candidature: "/candidature/telecom",
    pitch: "RNI/ORNI, RF Planning, Réseau IP, 5G, Fibre, VoIP",
    detail: "Spécialistes RNI, RF planners, ingénieurs réseau IP (CCNP/CCIE), techniciens fibre, pilotes drone OFAC — des profils introuvables via une annonce générique.",
    stats: [["ORNI & 5G","expertise",""],["5-8 jours","délai spécialisé"],["Swisscom, Sunrise","Salt & CDMO"]],
    metiers: ["Spécialiste RNI / ORNI","RF Planner / 5G","Ingénieur réseau IP","Technicien fibre","Ingénieur VoIP","Pilote drone OFAC"],
  },
  {
    key: "pharma",
    icon: FlaskConical,
    label: "Pharma & Life Sciences",
    tag: "Pharma",
    accent: "#C026D3",
    accentD: "#7C3AED",
    grad: "linear-gradient(135deg,#7C3AED,#C026D3,#E879F9)",
    bg: "rgba(192,38,211,.06)",
    border: "rgba(232,121,249,.25)",
    path: "/pharma",
    candidature: "/candidature/pharma",
    pitch: "QA/QC, Affaires Réglementaires, GMP, Validation, PV",
    detail: "QA Managers, Responsible Person, experts AR, ingénieurs validation IQ/OQ/PQ — profils maîtrisant Swissmedic, ICH Q9 et les Annex GMP.",
    stats: [["Swissmedic","& EMA"],["6-10 jours","délai RP / Head QA"],["CDMO & Biotech","tous contextes"]],
    metiers: ["QA Manager / Director","Responsible Person","Affaires Réglementaires","Ingénieur Validation","Pharmacovigilance","R&D / Formulation"],
  },
];

// ── Composant carte verticale (hooks au niveau module) ───────
const VerticalCard = ({ v, active, onClick, isMobile }) => {
  const Icon = v.icon;
  const isActive = active === v.key;
  return (
    <button onClick={() => onClick(v.key)}
      style={{
        display: "flex", flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "flex-start",
        gap: isMobile ? 12 : 10,
        padding: isMobile ? "14px 16px" : "20px 18px",
        borderRadius: 16, border: isActive ? `1.5px solid ${v.border.replace(".25",",.6")}` : "1.5px solid rgba(255,255,255,.07)",
        background: isActive ? v.bg : "rgba(255,255,255,.02)",
        cursor: "pointer", textAlign: "left", transition: "all .25s",
        fontFamily: "'DM Sans',sans-serif",
        boxShadow: isActive ? `0 0 24px ${v.accent}18` : "none",
      }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; } }}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; } }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: isActive ? `${v.accent}20` : "rgba(255,255,255,.06)", border: `1px solid ${isActive ? v.accent + "40" : "rgba(255,255,255,.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s" }}>
        <Icon size={17} style={{ color: isActive ? v.accent : "#64748B" }} strokeWidth={1.5} />
      </div>
      <div>
        <div style={{ color: isActive ? v.accent : "#94A3B8", fontWeight: 700, fontSize: ".84rem", marginBottom: 2, transition: "color .25s" }}>{v.label}</div>
        {!isMobile && <div style={{ color: "#334155", fontSize: ".7rem", lineHeight: 1.4 }}>{v.pitch}</div>}
      </div>
    </button>
  );
};

// ── Panneau détail (sans hooks) ──────────────────────────────
const VerticalPanel = ({ v, isMobile }) => {
  const Icon = v.icon;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: v.bg, border: `1px solid ${v.border}`, borderRadius: 100, padding: "5px 14px", marginBottom: 14 }}>
            <Icon size={13} style={{ color: v.accent }} strokeWidth={1.5} />
            <span style={{ color: v.accent, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{v.tag}</span>
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: 800, color: "#F1F5F9", lineHeight: 1.2, marginBottom: 10 }}>
            {v.label}
          </h2>
          <p style={{ color: "#94A3B8", fontSize: ".95rem", lineHeight: 1.75, maxWidth: 480 }}>{v.detail}</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <Link href={v.candidature} style={{ padding: "10px 18px", borderRadius: 11, background: v.bg, border: `1px solid ${v.border}`, color: v.accent, fontWeight: 700, fontSize: ".82rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "all .2s", fontFamily: "'DM Sans',sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.background = v.bg.replace(".06", ".12")}
            onMouseLeave={e => e.currentTarget.style.background = v.bg}>
            Postuler
          </Link>
          <Link href={v.path} style={{ padding: "10px 20px", borderRadius: 11, background: v.grad, border: "none", color: "#fff", fontWeight: 700, fontSize: ".82rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, boxShadow: `0 4px 18px ${v.accent}35`, transition: "all .2s", fontFamily: "'DM Sans',sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "none"; }}>
            Découvrir <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {v.stats.map(([val, lbl], i) => (
          <div key={i} style={{ padding: "16px 14px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: v.accent, marginBottom: 4 }}>{val}</div>
            <div style={{ color: "#475569", fontSize: ".72rem", lineHeight: 1.4 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Métiers */}
      <div>
        <div style={{ color: "#475569", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Métiers clés</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {v.metiers.map(m => (
            <span key={m} style={{ padding: "6px 13px", borderRadius: 100, fontSize: ".78rem", fontWeight: 600, background: v.bg, border: `1px solid ${v.border}`, color: v.accent }}>{m}</span>
          ))}
        </div>
      </div>

      {/* CTA bas */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <CheckCircle size={14} style={{ color: v.accent, flexShrink: 0 }} />
        <span style={{ color: "#64748B", fontSize: ".82rem" }}>Aucun frais avant embauche · Garantie remplacement 3 mois · 100% au succès</span>
      </div>
    </div>
  );
};

// ── Composant stat animé ─────────────────────────────────────
const StatCard = ({ value, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: "center", transition: `all .6s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, background: "linear-gradient(135deg,#60A5FA,#38BDF8,#2DD4BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 6 }}>{value}</div>
      <div style={{ color: "#475569", fontSize: ".82rem" }}>{label}</div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ════════════════════════════════════════════════════════════
export default function Home() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("it");
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", message: "", type: "recruiter" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const active = VERTICALS.find(v => v.key === activeTab);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleContact = async () => {
    setFormError(null);
    if (!contactForm.firstName || !contactForm.email) { setFormError("Prénom et email requis."); return; }
    setSending(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert([{
        type: contactForm.type, first_name: contactForm.firstName.trim(),
        last_name: contactForm.lastName.trim(), email: contactForm.email.trim().toLowerCase(),
        message: contactForm.message.trim() || null, sector: "general", status: "new",
      }]);
      if (error) throw new Error(error.message);
      setSent(true);
    } catch (e) { setFormError(e.message); }
    finally { setSending(false); }
  };

  return (
    <div style={{ background: "#080D1A", color: "#F1F5F9", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(56,189,248,0.2); color:#fff; }
        input::placeholder, textarea::placeholder { color:#1E3A5F; }
        @keyframes pulseGlow { 0%,100%{opacity:.25}50%{opacity:.6} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .home-grid {
          background-image:
            linear-gradient(rgba(37,99,235,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,.028) 1px, transparent 1px);
          background-size:56px 56px;
        }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 66, background: scrolled ? "rgba(8,13,26,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux — Recrutement spécialisé Suisse" style={{ height: 36, objectFit: "contain" }} />
        </div>
        <div style={{ display: isMobile ? "none" : "flex", gap: "1.4rem", alignItems: "center" }}>
          {[["Verticales", "verticales"], ["Notre approche", "approche"]].map(([label, id]) => (
            <span key={id} onClick={() => scrollTo(id)} style={{ color: "#64748B", fontSize: ".85rem", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#F1F5F9"} onMouseLeave={e => e.target.style.color = "#64748B"}>{label}</span>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background: "linear-gradient(135deg,#2563EB,#0EA5E9)", border: "none", color: "#fff", padding: "10px 22px", borderRadius: 12, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", boxShadow: "0 0 20px rgba(14,165,233,.3)", fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 36px rgba(56,189,248,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(14,165,233,.3)"; }}>
            Nous contacter
          </button>
        </div>
        {isMobile && (
          <button onClick={() => scrollTo("contact")} style={{ background: "linear-gradient(135deg,#2563EB,#0EA5E9)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 10, fontWeight: 700, fontSize: ".82rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Contact →</button>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="home-grid" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "100px 1.4rem 60px" : "130px 2rem 90px" }}>
        {/* Glows */}
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.1),transparent 70%)", animation: "pulseGlow 7s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "6%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,38,211,.07),transparent 70%)", animation: "pulseGlow 8s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {/* Floating badges */}
        {!isMobile && (<>
          <div style={{ position: "absolute", left: "3%", top: "38%", background: "rgba(8,18,40,.95)", border: "1px solid rgba(56,189,248,.2)", borderRadius: 14, padding: "11px 16px", animation: "float 5s ease-in-out infinite", pointerEvents: "none", zIndex: 1 }}>
            <div style={{ color: "#334155", fontSize: ".6rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Réseau actif</div>
            <div style={{ color: "#F1F5F9", fontSize: ".8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E", display: "inline-block" }} /> 6 secteurs · Suisse
            </div>
          </div>
          <div style={{ position: "absolute", right: "3%", top: "42%", background: "rgba(8,18,40,.95)", border: "1px solid rgba(212,175,90,.2)", borderRadius: 14, padding: "11px 16px", animation: "float 5s ease-in-out infinite 1.6s", pointerEvents: "none", zIndex: 1 }}>
            <div style={{ color: "#334155", fontSize: ".6rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Modèle</div>
            <div style={{ color: "#F1F5F9", fontSize: ".8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#D4AF5A", boxShadow: "0 0 6px #D4AF5A", display: "inline-block" }} /> 100% au succès
            </div>
          </div>
        </>)}

        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(37,99,235,.08)", border: "1px solid rgba(56,189,248,.2)", borderRadius: 100, padding: "7px 18px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#38BDF8", boxShadow: "0 0 8px #38BDF8", display: "inline-block" }} />
            <span style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 600 }}>Agence de recrutement spécialisée · Yverdon-les-Bains, Suisse</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2rem,5.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em", color: "#F1F5F9", marginBottom: 24 }}>
            La précision du data scientist<br />
            <span style={{ background: "linear-gradient(135deg,#60A5FA,#38BDF8,#2DD4BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              appliquée au flair du recruteur senior.
            </span>
          </h1>

          {/* Description SEO */}
          <p style={{ color: "#94A3B8", fontSize: "clamp(.92rem,2vw,1.05rem)", lineHeight: 1.85, maxWidth: 620, margin: "0 auto 40px" }}>
            TalentFlux place les profils rares en Suisse : IT & Digital, Finance, Ingénierie, Paysagisme, Télécommunications et Pharma & Life Sciences. Matching data-driven, vérification expert, garantie 3 mois.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <button onClick={() => scrollTo("verticales")} style={{ background: "linear-gradient(135deg,#2563EB,#0EA5E9,#14B8A6)", border: "none", color: "#fff", padding: isMobile ? "13px 24px" : "16px 36px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: isMobile ? ".9rem" : "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 0 30px rgba(14,165,233,.35)", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(56,189,248,.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,.35)"; }}>
              <Users size={18} /> Voir nos secteurs <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("contact")} style={{ background: "rgba(255,255,255,.05)", border: "1.5px solid rgba(255,255,255,.12)", color: "#94A3B8", padding: isMobile ? "13px 24px" : "16px 36px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: isMobile ? ".9rem" : "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#F1F5F9"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; }}>
              Nous contacter
            </button>
          </div>

          {/* Chiffres clés */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 20 : 36, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            {[["6","Secteurs spécialisés"],["100%","Au succès"],["3 mois","Garantie remplacement"],["CH","Suisse romande & alémanique"]].map(([v, l], i) => (
              <StatCard key={i} value={v} label={l} delay={i * 100} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", opacity: .3, cursor: "pointer" }} onClick={() => scrollTo("verticales")}>
          <ChevronDown size={22} color="#38BDF8" />
        </div>
      </section>

      {/* ══ VERTICALES ══════════════════════════════════════ */}
      <section id="verticales" style={{ padding: isMobile ? "64px 1.4rem" : "100px 2rem", background: "rgba(6,10,20,.6)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#38BDF8", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Nos 6 verticales</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.2, color: "#F1F5F9", marginBottom: 14 }}>
              Un recruteur expert<br />dans chaque secteur
            </h2>
            <p style={{ color: "#64748B", fontSize: ".95rem", maxWidth: 520, margin: "0 auto" }}>
              Chaque verticale a ses codes, ses certifications, ses réseaux. Nous connaissons les vôtres.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", gap: isMobile ? 20 : 24, alignItems: "start" }}>
            {/* Onglets */}
            <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: isMobile ? 8 : 6, overflowX: isMobile ? "auto" : "unset", paddingBottom: isMobile ? 4 : 0 }}>
              {VERTICALS.map(v => (
                <VerticalCard key={v.key} v={v} active={activeTab} onClick={setActiveTab} isMobile={isMobile} />
              ))}
            </div>

            {/* Panneau détail */}
            <div style={{ background: "rgba(10,16,30,.9)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, padding: isMobile ? 22 : 36, boxShadow: `0 0 60px ${active.accent}12` }}>
              <VerticalPanel key={activeTab} v={active} isMobile={isMobile} />
            </div>
          </div>

          {/* Grille rapide toutes verticales */}
          <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(3,1fr)" : "repeat(6,1fr)", gap: 12 }}>
            {VERTICALS.map(v => {
              const Icon = v.icon;
              return (
                <Link key={v.key} href={v.path} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 12px", borderRadius: 16, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = v.bg; e.currentTarget.style.borderColor = v.border; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <Icon size={20} style={{ color: v.accent }} strokeWidth={1.5} />
                  <span style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 600, textAlign: "center" }}>{v.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ APPROCHE ════════════════════════════════════════ */}
      <section id="approche" style={{ padding: isMobile ? "64px 1.4rem" : "100px 2rem" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#D4AF5A", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Pourquoi TalentFlux</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 800, color: "#F1F5F9" }}>
              Pas une agence de plus.<br />
              <span style={{ background: "linear-gradient(135deg,#D4AF5A,#E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Une approche différente.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 18 }}>
            {[
              { icon: Users, accent: "#38BDF8", title: "Experts sectoriels", desc: "Nos consultants ont travaillé dans les secteurs qu'ils recrutent. Un recruteur IT qui connaît React. Un recruteur pharma qui sait ce qu'est une inspection Swissmedic." },
              { icon: Shield, accent: "#22C55E", title: "Vérification avant présentation", desc: "Certifications contrôlées, compétences testées techniquement, références vérifiées. Vous ne rencontrez que des candidats validés par un expert du secteur." },
              { icon: Clock, accent: "#D4AF5A", title: "Garantie 3 mois", desc: "Si le candidat quitte ou ne convient pas dans les 3 premiers mois, nous relançons le processus entièrement à nos frais. Sans négociation, sans clause." },
              { icon: Star, accent: "#818CF8", title: "100% au succès", desc: "Aucun frais fixe, aucun abonnement. Vous ne payez que si vous embauchez. Notre intérêt est aligné sur le vôtre dès le premier jour." },
              { icon: CheckCircle, accent: "#C026D3", title: "Matching data-driven", desc: "40+ critères sectoriels par profil. Score de matching calculé avant chaque présentation. Fini les CVs inadaptés qui font perdre du temps à tout le monde." },
              { icon: MapPin, accent: "#0EA5E9", title: "Ancrage suisse", desc: "Basés à Yverdon-les-Bains, actifs dans toute la Suisse romande et alémanique. Réseaux locaux, connaissance des conventions collectives et du marché cantonal." },
            ].map(({ icon: Icon, accent, title, desc }, i) => (
              <div key={i} style={{ padding: 28, borderRadius: 20, background: "rgba(10,16,30,.8)", border: "1px solid rgba(255,255,255,.07)", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}30`; e.currentTarget.style.boxShadow = `0 0 28px ${accent}12`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${accent}15`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
                </div>
                <h3 style={{ color: "#F1F5F9", fontWeight: 700, fontSize: ".95rem", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "#64748B", fontSize: ".86rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TÉMOIGNAGES ═════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "56px 1.4rem" : "80px 2rem", background: "rgba(6,10,20,.5)", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: "#D4AF5A", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>✦ Ils nous font confiance</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 800, color: "#F1F5F9" }}>Ce que disent nos clients</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 18 }}>
            {[
              { q: "Profil IT rare trouvé en 48h. Notre Tech Lead avait exactement le stack qu'on cherchait et a passé tous nos entretiens techniques. Impressionnant.", a: "CTO, scale-up SaaS — Lausanne", sector: "IT", color: "#38BDF8" },
              { q: "Nous cherchions une RP depuis 6 mois. TalentFlux nous a présenté 2 candidats qualifiés en 8 jours. La candidate retenue avait déjà géré une inspection Swissmedic.", a: "Head of HR, laboratoire pharma — Vaud", sector: "Pharma", color: "#C026D3" },
              { q: "Ce qui nous a marqué : ils savaient exactement ce qu'est un spécialiste RNI et ont posé les bonnes questions ORNI dès le premier appel.", a: "Directeur Technique, bureau télécom — Genève", sector: "Télécom", color: "#0EA5E9" },
            ].map(({ q, a, sector, color }, i) => (
              <div key={i} style={{ background: "rgba(10,16,30,.9)", border: "1px solid rgba(255,255,255,.07)", borderTop: `2px solid ${color}`, borderRadius: 18, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 3 }}>{Array(5).fill(0).map((_, j) => <Star key={j} size={11} fill="#D4AF5A" color="#D4AF5A" />)}</div>
                  <span style={{ fontSize: ".68rem", fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}30`, padding: "2px 9px", borderRadius: 5 }}>{sector}</span>
                </div>
                <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", fontStyle: "italic", marginBottom: 12 }}>"{q}"</p>
                <p style={{ color: "#475569", fontSize: ".74rem", fontWeight: 600 }}>— {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════ */}
      <section id="contact" style={{ padding: isMobile ? "64px 1.4rem" : "100px 2rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(37,99,235,.06),transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#38BDF8", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 800, color: "#F1F5F9", marginBottom: 10 }}>
              Parlons de votre besoin
            </h2>
            <p style={{ color: "#64748B", fontSize: ".95rem" }}>Réponse garantie sous 2h · Aucun engagement</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 280px", gap: 22 }}>
            {/* Formulaire */}
            <div style={{ background: "rgba(8,14,28,.95)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                {[{ key: "recruiter", label: "🏢 Je recrute" }, { key: "candidate", label: "💼 Je suis candidat" }].map(({ key, label }) => (
                  <button key={key} onClick={() => setContactForm(f => ({ ...f, type: key }))} style={{ flex: 1, padding: "14px", border: "none", cursor: "pointer", background: contactForm.type === key ? "rgba(37,99,235,.1)" : "transparent", borderBottom: `2px solid ${contactForm.type === key ? "#38BDF8" : "transparent"}`, color: contactForm.type === key ? "#F1F5F9" : "#475569", fontWeight: 700, fontSize: ".84rem", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>
              {!sent ? (
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Prénom *", "firstName", "Sophie"], ["Nom", "lastName", "Martin"]].map(([label, key, ph]) => (
                      <div key={key}>
                        <label style={{ display: "block", color: "#334155", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                        <input placeholder={ph} value={contactForm[key]} onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                          onFocus={e => { e.target.style.borderColor = "rgba(56,189,248,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,.06)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.08)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#334155", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Email *</label>
                    <input type="email" placeholder="sophie@acme.ch" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(56,189,248,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,.06)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#334155", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Message</label>
                    <textarea placeholder={contactForm.type === "recruiter" ? "Décrivez votre besoin : secteur, rôle, délai, contexte..." : "Votre secteur, rôle actuel, ce que vous recherchez..."}
                      value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} rows={3}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = "rgba(56,189,248,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,.06)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  {formError && <div style={{ padding: "9px 13px", borderRadius: 9, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#FCA5A5", fontSize: ".82rem" }}>{formError}</div>}
                  <button onClick={handleContact} disabled={sending} style={{ padding: "13px", borderRadius: 12, border: "none", background: sending ? "rgba(37,99,235,.4)" : "linear-gradient(135deg,#2563EB,#0EA5E9)", color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: sending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "'DM Sans',sans-serif", transition: "all .3s" }}>
                    {sending ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</> : "Envoyer →"}
                  </button>
                  <p style={{ color: "#1E3A5F", fontSize: ".68rem", textAlign: "center" }}>🔒 LPD suisse & RGPD conformes</p>
                </div>
              ) : (
                <div style={{ padding: "48px 24px", textAlign: "center" }}>
                  <CheckCircle size={36} style={{ color: "#22C55E", margin: "0 auto 16px" }} />
                  <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 8 }}>Message reçu ✓</h3>
                  <p style={{ color: "#64748B", fontSize: ".9rem" }}>Merci {contactForm.firstName} ! Réponse sous <strong style={{ color: "#38BDF8" }}>2h</strong>.</p>
                </div>
              )}
            </div>

            {/* Coordonnées */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(8,14,28,.95)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".88rem", marginBottom: 16, color: "#F1F5F9" }}>Contact direct</h3>
                {[{ icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" }, { icon: Phone, label: "Tél.", value: "+41 76 592 88 06", href: "tel:+41765928806" }, { icon: MapPin, label: "Siège", value: "Yverdon-les-Bains, VD", href: null }].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(56,189,248,.08)", border: "1px solid rgba(56,189,248,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={12} style={{ color: "#38BDF8" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: "#334155", fontSize: ".63rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      {href ? <a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none" }}>{value}</a> : <span style={{ color: "#CBD5E1", fontSize: ".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(8,14,28,.95)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 18 }}>
                {[["< 2h", "Accusé de réception"], ["< 24h", "Premier brief"], ["3-10j", "Premiers profils présentés"]].map(([time, label]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <span style={{ color: "#475569", fontSize: ".8rem" }}>{label}</span>
                    <span style={{ color: "#38BDF8", fontSize: ".74rem", fontWeight: 700, background: "rgba(14,165,233,.1)", padding: "2px 9px", borderRadius: 5 }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "28px 2rem" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.png" alt="TalentFlux" style={{ height: 30, objectFit: "contain" }} />
            <span style={{ color: "#334155", fontSize: ".72rem" }}>Agence de recrutement spécialisée · Yverdon-les-Bains, Suisse</span>
          </div>
          <p style={{ color: "#1E3A5F", fontSize: ".72rem" }}>© {new Date().getFullYear()} TalentFlux. Tous droits réservés.</p>
          <div style={{ display: isMobile ? "none" : "flex", gap: 18, flexWrap: "wrap" }}>
            {[["IT", "/it"], ["Finance", "/finance"], ["Ingénierie", "/ingenierie"], ["Paysagisme", "/paysagisme"], ["Télécom", "/telecom"], ["Pharma", "/pharma"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: "#334155", fontSize: ".72rem", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#64748B"} onMouseLeave={e => e.target.style.color = "#334155"}>{label}</Link>
            ))}
            <span style={{ color: "#1E3A5F" }}>·</span>
            {[["Confidentialité", "/privacy"], ["CGU", "/cgu"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: "#334155", fontSize: ".72rem", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = "#64748B"} onMouseLeave={e => e.target.style.color = "#334155"}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
