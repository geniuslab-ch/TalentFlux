"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  Settings2, Target, Zap, ArrowRight, CheckCircle,
  ChevronDown, Star, Send, Phone, Mail, MapPin,
  Upload, X, FileText, AlertCircle, Shield, Factory,
  Cpu, Gauge, CircuitBoard, ChevronRight, BarChart3
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

// ── Design tokens Engineering ──────────────────────────
const E = {
  bg:         "#080D1A",
  bgDeep:     "#060B16",
  bgCard:     "rgba(12,20,38,0.75)",
  border:     "rgba(59,130,246,0.12)",
  borderGlow: "rgba(59,130,246,0.35)",
  borderSteel:"rgba(148,163,184,0.15)",
  blue:       "#3B82F6",
  blueLight:  "#60A5FA",
  blueDim:    "#1D4ED8",
  electric:   "#38BDF8",
  steel:      "#94A3B8",
  steelLight: "#CBD5E1",
  orange:     "#F97316",
  text:       "#F1F5F9",
  muted:      "#94A3B8",
  subtle:     "#475569",
};

const ElectricText = ({ children }) => (
  <span style={{
    background: `linear-gradient(135deg, ${E.blue} 0%, ${E.electric} 55%, #67E8F9 100%)`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const SteelText = ({ children }) => (
  <span style={{
    background: `linear-gradient(135deg, ${E.steel} 0%, ${E.steelLight} 60%, #E2E8F0 100%)`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

// Circuit board card avec glow
const TechCard = ({ children, style = {}, glow = false, onMouseEnter, onMouseLeave }) => (
  <div style={{
    background: E.bgCard,
    border: `1px solid ${glow ? E.borderGlow : E.border}`,
    borderRadius: 16,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "all .35s ease",
    position: "relative",
    overflow: "hidden",
    ...style,
  }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {/* Circuit corner decorations */}
    <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: `1.5px solid ${E.blue}40`, borderLeft: `1.5px solid ${E.blue}40`, borderRadius: "16px 0 0 0", pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderBottom: `1.5px solid ${E.blue}40`, borderRight: `1.5px solid ${E.blue}40`, borderRadius: "0 0 16px 0", pointerEvents: "none" }} />
    {children}
  </div>
);

// ── Method Card ───────────────────────────────────────
const MethodCard = ({ icon: Icon, label, title, desc, accent, delay }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      transition: `all .6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      <TechCard glow={hovered} style={{
        padding: 28, height: "100%",
        boxShadow: hovered ? `0 0 40px ${accent}18, inset 0 0 30px ${accent}06` : "none",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        borderTopColor: hovered ? `${accent}60` : E.border,
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <div style={{
          width: 50, height: 50, borderRadius: 12, marginBottom: 20,
          background: `${accent}10`, border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: hovered ? `0 0 16px ${accent}30` : "none",
          transition: "box-shadow .3s",
        }}>
          <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>{label}</div>
        <h3 style={{ color: E.text, fontWeight: 700, fontSize: "1rem", marginBottom: 10, fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>{title}</h3>
        <p style={{ color: E.muted, lineHeight: 1.75, fontSize: ".86rem" }}>{desc}</p>
      </TechCard>
    </div>
  );
};

// ── Matching Score Bar ────────────────────────────────
const ScoreBar = ({ label, value, pct, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transition: `opacity .5s ease ${delay}ms`, opacity: inView ? 1 : 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ color: E.muted, fontSize: ".78rem", fontFamily: "'DM Mono', monospace" }}>{label}</span>
        <span style={{ color, fontWeight: 700, fontSize: ".75rem", fontFamily: "'DM Mono', monospace" }}>{value}</span>
      </div>
      <div style={{ height: 3, background: "rgba(59,130,246,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3,
          background: `linear-gradient(90deg, ${color}60, ${color})`,
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${delay + 200}ms`,
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  );
};

// ── Radar-like Score Hexagon (CSS) ───────────────────
const MatchScore = ({ score = 94 }) => {
  const [ref, inView] = useInView(0.2);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="8" />
        {/* Progress */}
        <circle cx="70" cy="70" r="54" fill="none"
          stroke="url(#scoreGrad)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .3s", filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))" }}
        />
        {/* Inner rings */}
        <circle cx="70" cy="70" r="42" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="70" cy="70" r="30" fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth="1" />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, #3B82F6, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{score}%</div>
        <div style={{ color: E.subtle, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>Match</div>
      </div>
    </div>
  );
};

// ── Input & Select ────────────────────────────────────
const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: E.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 7 }}>
      {label} {required && <span style={{ color: E.blue }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 10, background: "rgba(8,13,26,0.8)", border: `1px solid ${E.border}`, color: E.text, fontSize: ".88rem", outline: "none", transition: "all .3s", fontFamily: "'DM Sans', sans-serif" }}
      onFocus={e => { e.target.style.borderColor = E.borderGlow; e.target.style.boxShadow = `0 0 0 3px rgba(59,130,246,0.1), 0 0 12px rgba(59,130,246,0.15)`; }}
      onBlur={e => { e.target.style.borderColor = E.border; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div>
    <label style={{ display: "block", color: E.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 7 }}>
      {label} {required && <span style={{ color: E.blue }}>*</span>}
    </label>
    <select value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 10, background: "rgba(8,13,26,0.8)", border: `1px solid ${E.border}`, color: value ? E.text : E.subtle, fontSize: ".88rem", outline: "none", transition: "all .3s", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = E.borderGlow; e.target.style.boxShadow = `0 0 0 3px rgba(59,130,246,0.1)`; }}
      onBlur={e => { e.target.style.borderColor = E.border; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#080D1A" }}>{o.label}</option>)}
    </select>
  </div>
);

export default function TalentFluxEngineering() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", specialty: "", urgency: "", message: "", file: null,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Le fichier ne doit pas dépasser 10 MB."); return; }
    setError(null);
    setForm(f => ({ ...f, file }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    setLoading(true);
    try {
      let pdfFileName = null, pdfFileUrl = null;
      if (form.file) {
        const sanitize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fileName = `${Date.now()}_${sanitize(form.firstName)}_${sanitize(form.lastName)}.pdf`;
        const { error: uploadError } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fileName}`, form.file, { contentType: "application/pdf" });
        if (uploadError) throw new Error("Erreur upload : " + uploadError.message);
        pdfFileName = fileName; pdfFileUrl = `submissions/${fileName}`;
      }
      const { error: insertError } = await supabase.from("contact_submissions").insert([{
        type: "recruiter",
        first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: "ingenierie",
        role: form.specialty || null,
        message: `[Urgence: ${form.urgency || "Non précisée"}] ${form.message.trim()}`,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (insertError) throw new Error(insertError.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    { value: "", label: "Sélectionnez une spécialité..." },
    { value: "meca", label: "Ingénieur Mécanique / Conception" },
    { value: "elec", label: "Ingénieur Électronique / Embedded" },
    { value: "auto", label: "Ingénieur Automation / Robotique" },
    { value: "qualite", label: "Ingénieur Qualité / Réglementaire" },
    { value: "direction", label: "Directeur Technique / R&D" },
    { value: "medtech", label: "MedTech / Dispositifs médicaux" },
    { value: "horlogerie", label: "Horlogerie / Microtechnique" },
    { value: "other", label: "Autre profil ingénierie" },
  ];

  const urgencies = [
    { value: "", label: "Délai souhaité..." },
    { value: "immediate", label: "⚡ Immédiate (ASAP)" },
    { value: "3months", label: "📅 Moins de 3 mois" },
    { value: "strategic", label: "🔭 Veille stratégique" },
  ];

  return (
    <div style={{ background: E.bg, color: E.text, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59,130,246,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
        @keyframes pulseBlue { 0%,100%{opacity:.3}50%{opacity:.7} }
        @keyframes pulseElec { 0%,100%{opacity:.2}50%{opacity:.5} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(400%)} }
        @keyframes glowPulse {
          0%,100%{box-shadow:0 0 16px rgba(59,130,246,0.3),0 0 32px rgba(59,130,246,0.1)}
          50%{box-shadow:0 0 28px rgba(59,130,246,0.6),0 0 56px rgba(59,130,246,0.25)}
        }
        @keyframes borderFlow {
          0%{background-position:0% 50%}100%{background-position:200% 50%}
        }

        .dot-grid {
          background-image: radial-gradient(rgba(59,130,246,0.2) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .line-grid {
          background-image:
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .pulse-btn {
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        .pulse-btn:hover {
          animation: none;
          box-shadow: 0 0 40px rgba(59,130,246,0.7), 0 0 80px rgba(59,130,246,0.3) !important;
          transform: translateY(-2px) !important;
        }
        .scan-effect { position: relative; overflow: hidden; }
        .scan-effect::after {
          content: '';
          position: absolute; left: 0; right: 0; top: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }
        .nav-link { color: ${E.muted}; font-size: .86rem; cursor: pointer; transition: color .2s; }
        .nav-link:hover { color: ${E.text}; }
                input, select, textarea { font-size: 16px !important; }
        @media (min-width: 768px) { input, select, textarea { font-size: .88rem !important; } }
        @media (max-width: 768px) {
          .tf-nav-desktop { display: none !important; }
          .tf-badge-float { display: none !important; }
          .dot-grid { background-size: 20px 20px; }
          .line-grid { background-size: 32px 32px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "0 1rem" : "0 2rem", height: 68,
        background: scrolled ? "rgba(8,13,26,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${E.border}` : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 38, width: "auto", objectFit: "contain" }} />
          <span style={{
            fontSize: ".58rem", fontWeight: 700, letterSpacing: ".14em",
            color: E.blueLight, background: "rgba(59,130,246,.1)",
            border: `1px solid ${E.borderGlow}`, borderRadius: 4, padding: "2px 8px",
          }}>INGÉNIERIE</span>
        </div>
        
                <div style={{ display: isMobile ? "none" : "flex", gap: "1.6rem", alignItems: "center" }}>
          {["Méthode","Matching"].map(item => (
            <span key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</span>
          ))}
                  
          
          <a href="tel:+41765928806" style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 10,
            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
            color: "#A5B4FC", textDecoration: "none",
            fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em",
            transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
          >
            📞 +41 76 592 88 06
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
            <Link href="/ingenierie" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
            <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
            <Link href="/en/ingenierie" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color="#64748B"}>EN</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="dot-grid" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.2rem 60px" : "120px 2rem 80px" }}>

        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,0.14), transparent 70%)", animation: "pulseBlue 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)", animation: "pulseElec 7s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {/* Floating badge left */}
        <div className="animate-float" style={{ position: "absolute", display: isMobile ? "none" : "block", left: "2%", top: "35%", zIndex: 1, animation: "float 5s ease-in-out infinite" }}>
          <TechCard glow style={{ padding: "11px 16px", minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(59,130,246,.12)", border: `1px solid ${E.borderGlow}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={14} style={{ color: E.blueLight }} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ color: E.subtle, fontSize: ".6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Spécialité</div>
                <div style={{ color: E.steelLight, fontSize: ".78rem", fontWeight: 600 }}>MedTech & Horlogerie</div>
              </div>
            </div>
          </TechCard>
        </div>

        {/* Floating badge right */}
        <div style={{ position: "absolute", display: isMobile ? "none" : "block", right: "2%", top: "42%", zIndex: 1, animation: "float 5s ease-in-out infinite 2.2s" }}>
          <TechCard style={{ padding: "11px 16px", minWidth: 190, border: `1px solid rgba(249,115,22,0.3)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Gauge size={14} style={{ color: E.orange }} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ color: E.subtle, fontSize: ".6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Matching</div>
                <div style={{ color: E.steelLight, fontSize: ".78rem", fontWeight: 600 }}>65 points de contrôle</div>
              </div>
            </div>
          </TechCard>
        </div>

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* Pill badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36,
            background: "rgba(59,130,246,.07)", border: `1px solid ${E.borderGlow}`,
            borderRadius: 100, padding: "6px 18px",
            animation: "fadeUp .6s ease both",
          }}>
            <CircuitBoard size={13} style={{ color: E.blueLight }} />
            <span style={{ color: E.muted, fontSize: ".78rem", fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>
              Placement Ingénierie · Arc Jurassien & Bassin Lémanique
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.025em",
            color: E.text, marginBottom: 24,
            animation: "fadeUp .7s ease .1s both",
          }}>
            Recrutement Ingénierie en Suisse romande :<br />
            <ElectricText>vos specs méritent mieux qu'un CV générique.</ElectricText>
          </h1>

          <p style={{
            color: E.muted, fontSize: "clamp(.92rem,1.8vw,1.05rem)", lineHeight: 1.8,
            maxWidth: 580, margin: "0 auto 44px",
            animation: "fadeUp .7s ease .2s both",
          }}>
            Ne laissez plus le hasard décider de vos innovations.<br />
            Talent Flux identifie vos futurs ingénieurs via un <strong style={{ color: E.steelLight }}>audit algorithmique sur 65 points de contrôle.</strong>
          </p>

          {/* CTAs */}
          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52, animation: "fadeUp .7s ease .3s both" }}>
                        <button onClick={() => scrollTo("méthode")} style={{
              background: "rgba(59,130,246,.06)", border: `1.5px solid ${E.borderGlow}`,
              color: E.blueLight, padding: "15px 26px", borderRadius: 12,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: ".95rem",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Notre méthode <ChevronRight size={16} />
            </button>
          </div>

          {/* Stats strip */}
          <div style={{
            display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: 28, justifyContent: "center", flexWrap: "wrap",
            paddingTop: 36, borderTop: `1px solid ${E.border}`,
            animation: "fadeUp .7s ease .4s both",
          }}>
            {[
              { val: "65", unit: "critères", lbl: "Points de contrôle" },
              { val: "72h", unit: "", lbl: "Délai shortlist" },
              { val: "95%", unit: "", lbl: "Taux de satisfaction" },
              { val: "100%", unit: "", lbl: "Au succès" },
            ].map(({ val, unit, lbl }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.9rem", fontWeight: 900, marginBottom: 3, background: "linear-gradient(135deg, #3B82F6, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {val}<span style={{ fontSize: "1rem" }}>{unit}</span>
                </div>
                <div style={{ color: E.subtle, fontSize: ".72rem", fontFamily: "'DM Mono', monospace" }}>{lbl}</div>
              </div>
            ))}
          </div>
          {/* Lien candidat Ingénierie */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link href="/candidature/ingenierie" style={{
              color: "#475569", fontSize: ".8rem", textDecoration: "none",
              borderBottom: "1px solid rgba(71,85,105,.3)", paddingBottom: 2, transition: "color .2s",
              fontFamily: "'DM Mono', monospace",
            }}
              onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
              onMouseLeave={e => e.currentTarget.style.color="#475569"}
            >
              Vous êtes ingénieur ? → Déposez votre candidature
            </Link>
          </div>
        </div>
      </header>

      {/* ── INTÉRÊT — 3 Method Cards ── */}
      <section id="méthode" className="line-grid" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", borderTop: `1px solid ${E.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: E.blueLight, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>// Pourquoi TalentFlux Ingénierie</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, color: E.text }}>
              La rigueur de l'ingénieur<br /><SteelText>appliquée au recrutement.</SteelText>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 20 }}>
            <MethodCard
              icon={Settings2} label="01 — Audit Technique"
              title="Validation des certifications & Hard Skills"
              desc="Vérification rigoureuse des diplômes HES/EPFL/HEIG-VD, maîtrise CAO (SolidWorks, CATIA), ERP industriels, et certifications métiers (ISO, CE, MDR)."
              accent={E.blue} delay={0}
            />
            <MethodCard
              icon={Target} label="02 — Culture de l'Excellence"
              title="Analyse du Savoir-être Industriel"
              desc="Évaluation comportementale en environnement de production, R&D ou qualité : gestion des délais, rigueur documentaire, leadership technique et adaptabilité culturelle."
              accent={E.electric} delay={120}
            />
            <MethodCard
              icon={Zap} label="03 — Time-to-Hire Optimisé"
              title="Vivier d'ingénieurs qualifiés en Suisse"
              desc="Accès immédiat à notre réseau d'ingénieurs en Suisse Romande. Arc Jurassien, bassin lémanique, Valais industriel. 72h pour une shortlist qualifiée."
              accent={E.orange} delay={240}
            />
          </div>

          {/* Sector badges */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {["MedTech & Dispositifs médicaux", "Horlogerie & Microtechnique", "Automation & Robotique", "Électronique embarquée", "Industrie 4.0", "Qualité / MDR / ISO 13485"].map((tag, i) => (
              <span key={i} style={{
                padding: "6px 14px", borderRadius: 100, fontSize: ".75rem", fontWeight: 600,
                background: "rgba(59,130,246,.07)", border: `1px solid ${E.border}`,
                color: E.muted, fontFamily: "'DM Mono', monospace",
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = E.borderGlow; e.currentTarget.style.color = E.blueLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = E.border; e.currentTarget.style.color = E.muted; }}
              >{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DÉSIR — Matching ── */}
      <section id="matching" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", background: `${E.bgDeep}`, borderTop: `1px solid ${E.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: E.electric, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>// Algorithme de matching</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, color: E.text }}>
              65 points de contrôle.<br /><ElectricText>Un match à 94%.</ElectricText>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "center" }}>
            {/* Score visual */}
            <div>
              <TechCard glow className="scan-effect" style={{ padding: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 32 }}>
                  <MatchScore score={94} />
                  <div>
                    <div style={{ color: E.subtle, fontSize: ".65rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>Candidat analysé</div>
                    <div style={{ color: E.text, fontWeight: 700, fontSize: "1rem", marginBottom: 3 }}>Marc A. · Ingénieur R&D</div>
                    <div style={{ color: E.subtle, fontSize: ".78rem" }}>Microtechnique · EPFL · Lausanne</div>
                    <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: "rgba(59,130,246,.1)", border: `1px solid ${E.borderGlow}` }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: E.electric, boxShadow: `0 0 6px ${E.electric}` }} />
                      <span style={{ color: E.blueLight, fontSize: ".7rem", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>MATCH VALIDÉ</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <ScoreBar label="Maîtrise CAO (SolidWorks/CATIA)" value="97%" pct={97} color={E.blue} delay={0} />
                  <ScoreBar label="Certifications ISO / MDR" value="91%" pct={91} color={E.electric} delay={100} />
                  <ScoreBar label="Soft Skills / Leadership" value="88%" pct={88} color={E.blueLight} delay={200} />
                  <ScoreBar label="Fit culture entreprise" value="94%" pct={94} color={E.orange} delay={300} />
                  <ScoreBar label="Disponibilité & mobilité" value="100%" pct={100} color={E.electric} delay={400} />
                </div>
              </TechCard>
            </div>

            {/* 65 criteria list */}
            <div>
              <div style={{ color: E.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'DM Mono', monospace" }}>Les 65 critères couvrent :</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  [Cpu, "Hard Skills Techniques", "CAO, ERP industriel, certifications métiers, langages de programmation industrielle", E.blue],
                  [BarChart3, "Logistique & Organisation", "Gestion de projet, agilité, délais, budget, documentation technique", E.electric],
                  [Target, "Soft Skills & Leadership", "Autonomie, prise de décision, communication transversale, gestion d'équipe", E.blueLight],
                  [Factory, "Contexte Industriel", "Type d'industrie, taille d'entreprise, culture qualité, certification ISO/MDR", E.orange],
                  [Settings2, "Budget & Conditions", "Prétentions salariales, remote policy, disponibilité, mobilité géographique", E.steel],
                ].map(([Icon, title, desc, color], i) => {
                  const [ref, inView] = useInView();
                  return (
                    <div key={i} ref={ref} style={{
                      display: "flex", gap: 14, padding: "14px 16px",
                      background: "rgba(59,130,246,.03)", border: `1px solid ${E.border}`,
                      borderLeft: `2px solid ${color}50`, borderRadius: "0 10px 10px 0",
                      transition: `all .5s ease ${i * 80}ms`,
                      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-16px)",
                    }}>
                      <Icon size={16} style={{ color, flexShrink: 0, marginTop: 2 }} strokeWidth={1.5} />
                      <div>
                        <div style={{ color: E.text, fontWeight: 600, fontSize: ".86rem", marginBottom: 2 }}>{title}</div>
                        <div style={{ color: E.subtle, fontSize: ".78rem", lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "48px 1.2rem" : "64px 2rem", borderTop: `1px solid ${E.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 18 }}>
          {[
            { q: "TalentFlux a trouvé notre directeur R&D en 5 jours. Un profil MedTech très spécifique que nous cherchions depuis 4 mois en interne.", a: "CEO, Startup MedTech, Neuchâtel" },
            { q: "La validation technique avant présentation est un gain de temps énorme. Tous les profils présentés maîtrisaient réellement SolidWorks et nos processus ISO.", a: "DRH, Groupe horloger, Le Locle" },
            { q: "Leur réseau dans l'arc jurassien est impressionnant. Profils discrets, jamais actifs sur LinkedIn, exactement ce qu'on cherchait.", a: "CTO, PME Automation, Yverdon" },
          ].map(({ q, a }, i) => (
            <TechCard key={i} style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={11} fill={E.blue} color={E.blue} />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".84rem", marginBottom: 14, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: E.subtle, fontSize: ".74rem", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>— {a}</p>
            </TechCard>
          ))}
        </div>
      </section>

      {/* ── ACTION — Micro-Brief Form ── */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", position: "relative", borderTop: `1px solid ${E.border}`, background: `${E.bgDeep}` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(29,78,216,.07), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: E.blueLight, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>// Initialiser une recherche</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.3vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, color: E.text, marginBottom: 12 }}>
              Prêt à recruter votre<br /><ElectricText>prochain ingénieur ?</ElectricText>
            </h2>
            <p style={{ color: E.muted, fontSize: ".9rem", lineHeight: 1.7 }}>
              Décrivez votre besoin en 60 secondes.<br />Un consultant expert vous rappelle sous 24h.
            </p>
          </div>

          <TechCard glow className="scan-effect" style={{ overflow: "hidden" }}>
            {/* Form header */}
            <div style={{ padding: "16px 26px", background: "rgba(59,130,246,.05)", borderBottom: `1px solid ${E.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              <CircuitBoard size={13} style={{ color: E.blueLight }} />
              <span style={{ color: E.subtle, fontSize: ".75rem", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>MICRO-BRIEF CONFIDENTIEL · CHIFFRÉ · RGPD CONFORME</span>
            </div>

            {!submitted ? (
              <div style={{ padding: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <InputField label="Prénom" placeholder="Laurent" value={form.firstName} onChange={set("firstName")} required />
                  <InputField label="Nom" placeholder="Favre" value={form.lastName} onChange={set("lastName")} required />
                  <InputField label="Email professionnel" type="email" placeholder="l.favre@entreprise.ch" value={form.email} onChange={set("email")} required />
                  <InputField label="Téléphone" type="tel" placeholder="+41 79 000 00 00" value={form.phone} onChange={set("phone")} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <InputField label="Entreprise / Site de production" placeholder="Nom de votre société" value={form.company} onChange={set("company")} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <SelectField label="Spécialité recherchée" value={form.specialty} onChange={set("specialty")} options={specialties} required />
                  <SelectField label="Urgence" value={form.urgency} onChange={set("urgency")} options={urgencies} />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", color: E.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 7, fontFamily: "'DM Mono', monospace" }}>
                    Contexte technique <span style={{ color: E.subtle, fontWeight: 400, textTransform: "none" }}>— Optionnel</span>
                  </label>
                  <textarea placeholder="Technologies clés, certifications requises, environnement de travail, contexte projet..." value={form.message} onChange={set("message")} rows={3}
                    style={{ width: "100%", padding: "12px 15px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${E.border}`, color: E.text, fontSize: ".86rem", outline: "none", resize: "vertical", transition: "all .3s", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
                    onFocus={e => { e.target.style.borderColor = E.borderGlow; e.target.style.boxShadow = `0 0 0 3px rgba(59,130,246,.1)`; }}
                    onBlur={e => { e.target.style.borderColor = E.border; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* PDF Upload */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", color: E.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 7, fontFamily: "'DM Mono', monospace" }}>
                    Cahier des charges / Annonce <span style={{ color: E.subtle, fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                  </label>
                  {!form.file ? (
                    <div onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                      style={{
                        border: dragOver ? `2px dashed ${E.blueLight}` : `2px dashed rgba(59,130,246,0.2)`,
                        borderRadius: 10, padding: "18px 20px", textAlign: "center",
                        cursor: "pointer", transition: "all .25s",
                        background: dragOver ? "rgba(59,130,246,.05)" : "rgba(8,13,26,.4)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(59,130,246,.45)`; }}
                      onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = `rgba(59,130,246,.2)`; }}
                    >
                      <Upload size={20} style={{ color: E.subtle, margin: "0 auto 8px" }} />
                      <p style={{ color: E.muted, fontSize: ".83rem" }}>
                        <span style={{ color: E.blueLight, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF
                      </p>
                      <p style={{ color: E.subtle, fontSize: ".73rem", marginTop: 3 }}>Cahier des charges, fiche de poste, job description...</p>
                      <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 10, background: "rgba(59,130,246,.07)", border: `1px solid ${E.borderGlow}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <FileText size={16} style={{ color: E.blueLight }} />
                        <div>
                          <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: ".84rem" }}>{form.file.name}</p>
                          <p style={{ color: E.subtle, fontSize: ".7rem" }}>{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => setForm(f => ({ ...f, file: null }))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 7, padding: "4px 6px", cursor: "pointer", color: "#EF4444" }}><X size={13} /></button>
                    </div>
                  )}
                </div>

                {error && (
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, padding: "10px 13px", borderRadius: 9, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)" }}>
                    <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
                    <span style={{ color: "#FCA5A5", fontSize: ".82rem" }}>{error}</span>
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading}
                  className={loading ? "" : "pulse-btn"}
                  style={{
                    width: "100%", padding: "15px 22px", borderRadius: 12, border: "none",
                    background: loading ? "rgba(59,130,246,.3)" : "linear-gradient(135deg, #1E40AF, #3B82F6, #38BDF8)",
                    color: "#fff", fontWeight: 700, fontSize: ".95rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    transition: "all .3s", fontFamily: "'DM Sans', sans-serif",
                  }}>
                  {loading
                    ? <><div style={{ width: 17, height: 17, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Analyse en cours...</>
                    : <><Send size={17} />Recevoir un plan de recrutement</>
                  }
                </button>
                <p style={{ color: E.subtle, fontSize: ".68rem", textAlign: "center", marginTop: 10, fontFamily: "'DM Mono', monospace" }}>
                  // DONNÉES CHIFFRÉES · SUPABASE · RGPD & LPD
                </p>
                <div style={{ textAlign: "center", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${E.border}` }}>
                  <Link href="/candidature/ingenierie" style={{
                    color: E.subtle, fontSize: ".78rem", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    borderBottom: `1px solid rgba(59,130,246,.2)`, paddingBottom: 2,
                    transition: "color .2s", fontFamily: "'DM Mono', monospace",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = E.blueLight}
                    onMouseLeave={e => e.currentTarget.style.color = E.subtle}
                  >
                    Vous êtes ingénieur ? → Déposez votre candidature
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ padding: "52px 28px", textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", margin: "0 auto 18px", background: "rgba(59,130,246,.1)", border: `1px solid ${E.borderGlow}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px rgba(59,130,246,.3)` }}>
                  <CheckCircle size={28} style={{ color: E.blueLight }} />
                </div>
                <h3 style={{ color: E.text, fontWeight: 700, fontSize: "1.2rem", marginBottom: 10, fontFamily: "'Sora', sans-serif" }}>
                  Brief reçu · <ElectricText>Analyse initialisée ✓</ElectricText>
                </h3>
                <p style={{ color: E.muted, marginBottom: 20, lineHeight: 1.7, fontSize: ".88rem" }}>
                  Merci <strong style={{ color: "#CBD5E1" }}>{form.firstName}</strong>.<br />
                  Un consultant TalentFlux Ingénierie vous contacte sous <strong style={{ color: E.blueLight }}>24h</strong>.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ firstName:"",lastName:"",email:"",phone:"",company:"",specialty:"",urgency:"",message:"",file:null }); }}
                  style={{ padding: "9px 22px", borderRadius: 9, border: `1px solid ${E.borderGlow}`, background: "rgba(59,130,246,.07)", color: E.blueLight, fontWeight: 600, cursor: "pointer", fontSize: ".84rem", fontFamily: "'DM Mono', monospace" }}>
                  Nouveau brief
                </button>
              </div>
            )}
          </TechCard>

          {/* Contact info */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { icon: Mail, value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
              { icon: Phone, value: "+41 76 592 88 06", href: "tel:+41765928806" },
              { icon: MapPin, value: "Yverdon-les-Bains, Suisse", href: null },
            ].map(({ icon: Icon, value, href }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon size={13} style={{ color: E.subtle }} strokeWidth={1.5} />
                {href ? <a href={href} style={{ color: E.muted, fontSize: ".8rem", textDecoration: "none", fontFamily: "'DM Mono', monospace" }}>{value}</a>
                       : <span style={{ color: E.muted, fontSize: ".8rem", fontFamily: "'DM Mono', monospace" }}>{value}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* ══ SILO SEO — Vous recrutez aussi dans... ══ */}
      <section style={{
        padding: "48px 2rem",
        background: "rgba(129,140,248,.06)",
        borderTop: "1px solid rgba(129,140,248,.2)",
        borderBottom: "1px solid rgba(129,140,248,.2)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#818CF8", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
              ✦ Nos autres expertises
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,3vw,1.9rem)", color: "#F1F5F9", marginBottom: 6 }}>
              Vous recrutez aussi dans...
            </h2>
            <p style={{ color: "#64748B", fontSize: ".88rem" }}>
              TalentFlux opère sur 6 secteurs spécialisés en Suisse.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            
          <a href="/it" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#38BDF810", border: "1px solid #38BDF830",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#38BDF818"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#38BDF810"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>💻</span>
            <div>
              <div style={{ color: "#38BDF8", fontWeight: 700, fontSize: ".88rem" }}>IT & Digital</div>
              <div style={{ color: "#475569", fontSize: ".74rem", marginTop: 2 }}>Voir la verticale →</div>
            </div>
          </a>
          <a href="/paysagisme" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#22C55E10", border: "1px solid #22C55E30",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#22C55E18"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#22C55E10"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>🌿</span>
            <div>
              <div style={{ color: "#22C55E", fontWeight: 700, fontSize: ".88rem" }}>Paysagisme</div>
              <div style={{ color: "#475569", fontSize: ".74rem", marginTop: 2 }}>Voir la verticale →</div>
            </div>
          </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${E.border}`, padding: "24px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 30, width: "auto", objectFit: "contain" }} />
            <span style={{ color: E.subtle, fontSize: ".68rem", fontFamily: "'DM Mono', monospace" }}>· INGÉNIERIE · Yverdon-les-Bains</span>
          </div>
          <p style={{ color: E.subtle, fontSize: ".7rem", fontFamily: "'DM Mono', monospace" }}>© 2025 TalentFlux</p>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Confidentialité", "/privacy"], ["CGU", "/cgu"], ["/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: E.subtle, fontSize: ".7rem", textDecoration: "none", fontFamily: "'DM Mono', monospace", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = E.muted}
                onMouseLeave={e => e.target.style.color = E.subtle}
              >{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
