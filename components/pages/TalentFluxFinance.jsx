"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  TrendingDown, ShieldCheck, Cpu, ArrowRight, CheckCircle,
  ChevronDown, Star, Send, Phone, Mail, MapPin,
  Upload, X, FileText, AlertCircle, Lock, Award,
  BarChart2, Users, Clock, Briefcase, ChevronRight
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

// ── Design tokens Finance ──────────────────────────────
const C = {
  bg:        "#0B1120",
  bgCard:    "rgba(15,22,40,0.7)",
  border:    "rgba(255,255,255,0.07)",
  borderGold:"rgba(180,145,60,0.35)",
  borderBlue:"rgba(59,130,246,0.3)",
  sapphire:  "#1E40AF",
  blue:      "#3B82F6",
  blueLight: "#60A5FA",
  gold:      "#B4913C",
  goldLight: "#D4AF5A",
  emerald:   "#059669",
  emeraldL:  "#34D399",
  text:      "#F1F5F9",
  muted:     "#94A3B8",
  subtle:    "#475569",
};

const GoldText = ({ children }) => (
  <span style={{
    background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #E8C97A 100%)`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const BlueText = ({ children }) => (
  <span style={{
    background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueLight} 60%, #93C5FD 100%)`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const GlassCard = ({ children, style = {}, gold = false, onMouseEnter, onMouseLeave }) => (
  <div style={{
    background: C.bgCard,
    border: `1px solid ${gold ? C.borderGold : C.border}`,
    borderRadius: 20,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    transition: "all 0.35s ease",
    ...style,
  }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </div>
);

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
      {label} {required && <span style={{ color: C.gold }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 12,
        background: "rgba(11,17,32,0.8)", border: `1px solid ${C.border}`,
        color: C.text, fontSize: ".9rem", outline: "none",
        transition: "all .3s", fontFamily: "'DM Sans', sans-serif",
      }}
      onFocus={e => { e.target.style.borderColor = `rgba(180,145,60,0.6)`; e.target.style.boxShadow = `0 0 0 3px rgba(180,145,60,0.08)`; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
      {label} {required && <span style={{ color: C.gold }}>*</span>}
    </label>
    <select value={value} onChange={onChange} required={required}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 12,
        background: "rgba(11,17,32,0.8)", border: `1px solid ${C.border}`,
        color: value ? C.text : C.subtle, fontSize: ".9rem", outline: "none",
        transition: "all .3s", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none",
      }}
      onFocus={e => { e.target.style.borderColor = `rgba(180,145,60,0.6)`; e.target.style.boxShadow = `0 0 0 3px rgba(180,145,60,0.08)`; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#0B1120" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── Problem Card avec glassmorphism ───────────────────
const ProblemCard = ({ icon: Icon, label, title, desc, accent, delay }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      transition: `all 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      <GlassCard
        gold={accent === C.gold}
        style={{ padding: 32, height: "100%", cursor: "default",
          boxShadow: hovered ? `0 0 40px ${accent}18` : "none",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          borderTop: `2px solid ${accent}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          width: 52, height: 52, borderRadius: 14, marginBottom: 22,
          background: `${accent}14`, border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={24} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>{label}</div>
        <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.05rem", marginBottom: 12, fontFamily: "'Sora', sans-serif" }}>{title}</h3>
        <p style={{ color: C.muted, lineHeight: 1.75, fontSize: ".88rem" }}>{desc}</p>
      </GlassCard>
    </div>
  );
};

// ── Timeline Step ─────────────────────────────────────
const TimelineStep = ({ num, title, subtitle, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", gap: 24, alignItems: "flex-start",
      transition: `all 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
    }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${C.sapphire}, ${C.blue})`,
          border: `1px solid ${C.borderBlue}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 20px rgba(59,130,246,0.25)`,
          fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: ".85rem", color: "#fff",
        }}>{num}</div>
        {num < 3 && <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.blue}40, transparent)`, marginTop: 8 }} />}
      </div>
      <div style={{ paddingBottom: 36 }}>
        <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.blue, marginBottom: 6 }}>{subtitle}</div>
        <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.05rem", marginBottom: 8, fontFamily: "'Sora', sans-serif" }}>{title}</h3>
        <p style={{ color: C.muted, lineHeight: 1.75, fontSize: ".88rem" }}>{desc}</p>
      </div>
    </div>
  );
};

// ── Stat Bar ──────────────────────────────────────────
const StatBar = ({ label, value, pct, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transition: `all 0.5s ease ${delay}ms`, opacity: inView ? 1 : 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: C.muted, fontSize: ".8rem" }}>{label}</span>
        <span style={{ color, fontWeight: 700, fontSize: ".8rem" }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${color}80, ${color})`,
          width: inView ? `${pct}%` : "0%", transition: `width 1.2s ease ${delay + 200}ms`,
        }} />
      </div>
    </div>
  );
};

export default function TalentFluxFinance() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", profile: "", message: "", file: null });
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Le fichier ne doit pas dépasser 10 MB."); return; }
    setError(null);
    setForm(f => ({ ...f, file }));
  };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
        if (uploadError) throw new Error("Erreur upload PDF : " + uploadError.message);
        pdfFileName = fileName; pdfFileUrl = `submissions/${fileName}`;
      }
      const { error: insertError } = await supabase.from("contact_submissions").insert([{
        type: "recruiter", first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: "finance",
        role: form.profile || null, message: form.message.trim() || null,
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

  const profiles = [
    { value: "", label: "Sélectionnez le profil recherché..." },
    { value: "cfo", label: "CFO / Directeur Financier" },
    { value: "controller", label: "Contrôleur de gestion" },
    { value: "auditor", label: "Auditeur interne / externe" },
    { value: "accountant", label: "Expert-comptable / Responsable comptable" },
    { value: "treasury", label: "Trésorier / Risk Manager" },
    { value: "analyst", label: "Analyste financier / M&A" },
    { value: "other", label: "Autre profil finance" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(180,145,60,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGold { 0%,100%{opacity:.35}50%{opacity:.7} }
        @keyframes pulseBlue { 0%,100%{opacity:.25}50%{opacity:.55} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:200% center}100%{background-position:-200% center} }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .grid-fine {
          background-image: linear-gradient(rgba(59,130,246,.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .shimmer-btn {
          background: linear-gradient(90deg, ${C.gold}, ${C.goldLight}, #E8C97A, ${C.gold});
          background-size: 300% auto;
          animation: shimmer 3s linear infinite;
        }
        .shimmer-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 0 40px rgba(180,145,60,0.5) !important; }
                input, select, textarea { font-size: 16px !important; }
        @media (min-width: 768px) { input, select, textarea { font-size: .88rem !important; } }
        @media (max-width: 768px) {
          .tf-nav-desktop { display: none !important; }
          .tf-badge-float { display: none !important; }
          .fine-grid { background-size: 32px 32px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "0 1rem" : "0 2rem", height: 68,
        background: scrolled ? "rgba(11,17,32,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 38, width: "auto", objectFit: "contain" }} />
          <span style={{
            fontSize: ".6rem", fontWeight: 700, letterSpacing: ".12em",
            color: C.goldLight, background: "rgba(180,145,60,.1)",
            border: `1px solid ${C.borderGold}`, borderRadius: 4, padding: "2px 8px",
          }}>FINANCE</span>
        </div>
        {isMobile && (
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{ background: "linear-gradient(135deg,#B45309,#D97706)", border: "none", color: "#fff",
              padding: "8px 16px", borderRadius: 10, fontWeight: 700, fontSize: ".82rem", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif" }}>
            Nous contacter →
          </button>
        )}
                <div style={{ display: isMobile ? "none" : "flex", gap: "1.6rem", alignItems: "center" }}>
          {["Approche","Méthodologie"].map(item => (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())}
              style={{ color: C.muted, fontSize: ".86rem", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.muted}
            >{item}</span>
          ))}
          <button onClick={() => scrollTo("contact")} className="shimmer-btn" style={{
            border: "none", color: "#0B1120", padding: "10px 22px", borderRadius: 12,
            fontWeight: 700, fontSize: ".86rem", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7,
            transition: "all .3s", fontFamily: "'DM Sans', sans-serif",
          }}>
            Confier un mandat <ArrowRight size={15} />
          </button>
        
          
          <a href="tel:+41765928806" style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 10,
            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
            color: "#D4AF5A", textDecoration: "none",
            fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em",
            transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
          >
            📞 +41 76 592 88 06
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
            <Link href="/finance" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
            <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
            <Link href="/en/finance" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color="#64748B"}>EN</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="grid-fine" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.2rem 60px" : "120px 2rem 80px" }}>

        {/* Orbs */}
        <div style={{ position: "absolute", top: "8%", left: "3%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(30,64,175,0.12), transparent 70%)`, animation: "pulseBlue 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,145,60,0.08), transparent 70%)`, animation: "pulseGold 7s ease-in-out infinite 1s", pointerEvents: "none" }} />

        {/* Floating trust badges */}
        <div className="animate-float" style={{ position: "absolute", display: isMobile ? "none" : "block", left: "2%", top: "36%", pointerEvents: "none", zIndex: 1 }}>
          <GlassCard gold style={{ padding: "12px 18px", minWidth: 190 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(180,145,60,.12)", border: `1px solid ${C.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Lock size={15} style={{ color: C.goldLight }} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Garantie</div>
                <div style={{ color: "#E2E8F0", fontSize: ".82rem", fontWeight: 600 }}>Discrétion absolue</div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="animate-float" style={{ position: "absolute", display: isMobile ? "none" : "block", right: "2%", top: "42%", animationDelay: "2s", pointerEvents: "none", zIndex: 1 }}>
          <GlassCard style={{ padding: "12px 18px", minWidth: 190, border: `1px solid ${C.borderBlue}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(59,130,246,.1)", border: `1px solid ${C.borderBlue}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={15} style={{ color: C.blueLight }} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Approche</div>
                <div style={{ color: "#E2E8F0", fontSize: ".82rem", fontWeight: 600 }}>Méthodologie éprouvée</div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* Pill badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36,
            background: "rgba(180,145,60,.07)", border: `1px solid ${C.borderGold}`,
            borderRadius: 100, padding: "7px 20px",
            animation: "fadeUp .6s ease both",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.goldLight, boxShadow: `0 0 8px ${C.goldLight}` }} />
            <span style={{ color: C.muted, fontSize: ".8rem", fontWeight: 500 }}>Placement Finance · Suisse · Réponse sous 24h</span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2rem, 4.8vw, 3.6rem)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.025em",
            color: C.text, marginBottom: 24,
            animation: "fadeUp .7s ease .1s both",
          }}>
            Recrutement Finance & Comptabilité en Suisse :<br />
            <GoldText>votre expert financier existe, il ne répond pas aux annonces.</GoldText>
          </h1>

          <p style={{
            color: C.muted, fontSize: "clamp(.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8,
            maxWidth: 580, margin: "0 auto 44px",
            animation: "fadeUp .7s ease .2s both",
          }}>
            Talent Flux combine l'expertise humaine et le <strong style={{ color: "#CBD5E1" }}>matching algorithmique</strong> pour chasser les meilleurs CFO, contrôleurs et experts financiers de Suisse.
          </p>

          {/* CTAs */}
          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52, animation: "fadeUp .7s ease .3s both" }}>
            <button onClick={() => scrollTo("contact")} className="shimmer-btn" style={{
              border: "none", color: "#0B1120", padding: isMobile ? "13px 20px" : "15px 32px", borderRadius: 14,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? ".85rem" : ".95rem",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
              boxShadow: `0 0 30px rgba(180,145,60,0.3)`, transition: "all .3s",
            }}>
              <Briefcase size={17} /> Confier un mandat <span style={{ opacity: .7, fontSize: ".8rem" }}>(Réponse sous 24h)</span>
            </button>
            <button onClick={() => scrollTo("approche")} style={{
              background: "rgba(59,130,246,.07)", border: `1.5px solid ${C.borderBlue}`,
              color: C.blueLight, padding: "15px 28px", borderRadius: 14,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: ".95rem",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Notre approche <ChevronRight size={16} />
            </button>
          </div>

          {/* Trust strip */}
          <div style={{
            display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: 32, justifyContent: "center", flexWrap: "wrap",
            paddingTop: 36, borderTop: `1px solid ${C.border}`,
            animation: "fadeUp .7s ease .4s both",
          }}>
            {[
              { val: "50+", lbl: "Profils qualifiés" },
              { val: "72h", lbl: "Délai de réponse" },
              { val: "95%", lbl: "Satisfaction client" },
              { val: "100%", lbl: "Au succès" },
            ].map(({ val, lbl }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "1.9rem", fontWeight: 900, marginBottom: 3,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{val}</div>
                <div style={{ color: C.subtle, fontSize: ".74rem" }}>{lbl}</div>
              </div>
            ))}
          </div>
          {/* Lien candidat Finance */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link href="/candidature/finance" style={{
              color: "#475569", fontSize: ".8rem", textDecoration: "none",
              borderBottom: "1px solid rgba(71,85,105,.3)", paddingBottom: 2, transition: "color .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
              onMouseLeave={e => e.currentTarget.style.color="#475569"}
            >
              Vous êtes candidat Finance ? → Déposez votre dossier
            </Link>
          </div>
        </div>
      </header>

      {/* ── INTÉRÊT — 3 Glass Cards ── */}
      <section id="approche" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: C.goldLight, fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Pourquoi TalentFlux Finance</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.7rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Le recrutement financier<br /><BlueText>est une science exacte.</BlueText>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 22 }}>
            <ProblemCard
              icon={TrendingDown} label="Le problème classique"
              title="Les erreurs de casting coûtent cher."
              desc="Un mauvais recrutement au niveau CFO ou contrôleur génère en moyenne 6 à 12 mois de salaire perdu, sans compter l'impact sur la gouvernance financière."
              accent="#EF4444" delay={0}
            />
            <ProblemCard
              icon={ShieldCheck} label="Notre solution"
              title="Audit des Hard & Soft Skills."
              desc="Au-delà du CV, nous auditons la rigueur analytique, la gestion du stress en période de clôture et le fit culturel avec votre direction générale."
              accent={C.goldLight} delay={100}
            />
            <ProblemCard
              icon={Cpu} label="L'approche data-driven"
              title="Matching Algorithmique."
              desc="Notre algorithme croise 65 points de données — budget, culture, technicité ERP, remote policy — pour un match précis à 94% dès la première shortlist."
              accent={C.blueLight} delay={200}
            />
          </div>

          {/* Match score bars */}
          <div style={{ marginTop: 48 }}>
            <GlassCard style={{ padding: "36px 40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px 48px" }}>
                <div>
                  <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Critères évalués</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <StatBar label="Maîtrise ERP / reporting" value="98%" pct={98} color={C.blueLight} delay={0} />
                    <StatBar label="Rigueur analytique" value="94%" pct={94} color={C.goldLight} delay={100} />
                    <StatBar label="Gestion clôture & audit" value="91%" pct={91} color={C.emeraldL} delay={200} />
                    <StatBar label="Culture fit / management" value="89%" pct={89} color={C.blueLight} delay={300} />
                  </div>
                </div>
                <div>
                  <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>Nos engagements</div>
                  {[
                    ["Shortlist en 72h", C.goldLight],
                    ["3 profils maximum, tous qualifiés", C.blueLight],
                    ["Score de matching détaillé par candidat", C.emeraldL],
                    ["Analyse IA comportementale incluse", C.goldLight],
                    ["Garantie remplacement 3 mois", C.blueLight],
                  ].map(([text, color], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                      <CheckCircle size={15} style={{ color, flexShrink: 0 }} />
                      <span style={{ color: C.muted, fontSize: ".86rem" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── DÉSIR — Timeline Méthodologie ── */}
      <section id="méthodologie" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", background: "rgba(15,22,40,0.5)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: C.blueLight, fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Comment ça marche</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.7rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Une méthodologie <GoldText>en 3 étapes précises.</GoldText>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Timeline */}
            <div>
              <TimelineStep num={1}
                subtitle="Étape 1 — Le Kick-off"
                title="Micro-brief & Matrice des priorités"
                desc="15 minutes suffisent. Nous définissons ensemble la matrice de priorités : budget, technicité ERP, style de management, culture d'entreprise."
                delay={0}
              />
              <TimelineStep num={2}
                subtitle="Étape 2 — Le Matching Algorithmique"
                title="Évaluation sur 65 critères stricts"
                desc="Notre algorithme analyse notre réseau de profils financiers sur 65 variables : hard skills comptables, soft skills décisionnels, disponibilité, prétentions salariales."
                delay={150}
              />
              <TimelineStep num={3}
                subtitle="Étape 3 — La Shortlist Premium"
                title="3 profils avec Score de Matching"
                desc="Vous recevez une présentation détaillée des 3 meilleurs candidats, incluant leur Score de Matching personnalisé et l'analyse comportementale IA."
                delay={300}
              />
            </div>

            {/* Score card */}
            <div style={{ position: "sticky", top: 100 }}>
              <GlassCard gold style={{ padding: 32 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: C.goldLight, marginBottom: 20 }}>Exemple — Score de Matching</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, rgba(30,64,175,.3), rgba(59,130,246,.2))", border: `1px solid ${C.borderBlue}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: ".8rem", color: C.blueLight }}>MC</div>
                  <div>
                    <div style={{ color: C.text, fontWeight: 700, fontSize: ".95rem" }}>Marie-Claire D.</div>
                    <div style={{ color: C.subtle, fontSize: ".78rem" }}>CFO candidate · Lausanne</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.5rem", fontWeight: 900, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>94%</div>
                    <div style={{ color: C.subtle, fontSize: ".65rem" }}>Match score</div>
                  </div>
                </div>
                {[
                  ["Maîtrise SAP FI/CO", "Expert", C.goldLight],
                  ["IFRS / Swiss GAAP", "Certifiée", C.goldLight],
                  ["Management équipe", "8 ans", C.blueLight],
                  ["Disponibilité", "45 jours", C.emeraldL],
                  ["Fit culturel PME", "Élevé", C.emeraldL],
                ].map(([label, val, color], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ color: C.muted, fontSize: ".82rem" }}>{label}</span>
                    <span style={{ color, fontWeight: 700, fontSize: ".82rem", background: `${color}12`, padding: "2px 10px", borderRadius: 6, border: `1px solid ${color}25` }}>{val}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(5,150,105,.06)", border: `1px solid rgba(52,211,153,.2)`, borderRadius: 10 }}>
                  <div style={{ color: C.emeraldL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Analyse IA</div>
                  <p style={{ color: C.muted, fontSize: ".8rem", lineHeight: 1.65 }}>Profil orienté performance et rigueur. Historique de réductions de coûts démontrées. Recommandée pour environnement PME en croissance.</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {[
            { q: "TalentFlux nous a présenté notre CFO actuel en 4 jours. Le Score de Matching était de 91% — et il l'est toujours 18 mois après.", a: "CEO, PME industrielle, Vaud" },
            { q: "La discrétion et la qualité des profils sont au-delà de nos attentes. Bien au-dessus des cabinets traditionnels que nous avions testés.", a: "DRH, Groupe financier, Zurich" },
            { q: "Ils ont trouvé notre contrôleur de gestion dans un réseau que nous n'aurions jamais atteint seuls. Profil hors LinkedIn, exactement comme annoncé.", a: "Fondateur, Fintech, Genève" },
          ].map(({ q, a }, i) => (
            <GlassCard key={i} gold style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill={C.gold} color={C.gold} />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", marginBottom: 16, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: C.subtle, fontSize: ".76rem", fontWeight: 600 }}>— {a}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── ACTION — Micro-Brief Form ── */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", position: "relative", borderTop: `1px solid ${C.border}` }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(30,64,175,.06), transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.goldLight, fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>✦ Micro-Brief confidentiel</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text, marginBottom: 14 }}>
              Prêt à sécuriser votre<br /><GoldText>département finance ?</GoldText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".92rem", lineHeight: 1.7 }}>
              Décrivez votre besoin en 30 secondes.<br />Un consultant expert vous rappelle sous 24h.
            </p>
          </div>

          <GlassCard gold style={{ overflow: "hidden", boxShadow: `0 0 60px rgba(180,145,60,0.06)` }}>
            {/* Header form */}
            <div style={{ padding: "20px 28px", background: "rgba(180,145,60,.04)", borderBottom: `1px solid ${C.borderGold}`, display: "flex", alignItems: "center", gap: 10 }}>
              <Lock size={14} style={{ color: C.goldLight }} />
              <span style={{ color: C.subtle, fontSize: ".78rem", fontWeight: 600 }}>Vos informations sont strictement confidentielles · Aucun spam</span>
            </div>

            {!submitted ? (
              <div style={{ padding: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <InputField label="Prénom" placeholder="Antoine" value={form.firstName} onChange={set("firstName")} required />
                  <InputField label="Nom" placeholder="Dupont" value={form.lastName} onChange={set("lastName")} required />
                  <InputField label="Email professionnel" type="email" placeholder="a.dupont@entreprise.ch" value={form.email} onChange={set("email")} required />
                  <InputField label="Téléphone direct" type="tel" placeholder="+41 76 000 00 00" value={form.phone} onChange={set("phone")} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <InputField label="Entreprise / Groupe" placeholder="Nom de votre société" value={form.company} onChange={set("company")} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <SelectField label="Profil recherché" value={form.profile} onChange={set("profile")} options={profiles} required />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", color: C.subtle, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Contexte & urgence <span style={{ color: C.subtle, fontWeight: 400, textTransform: "none" }}>— Optionnel</span>
                  </label>
                  <textarea
                    placeholder="Ex: Départ inattendu du CFO, croissance rapide, projet M&A, clôture annuelle imminente..."
                    value={form.message} onChange={set("message")} rows={3}
                    style={{
                      width: "100%", padding: "13px 16px", borderRadius: 12,
                      background: "rgba(11,17,32,.8)", border: `1px solid ${C.border}`,
                      color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical",
                      transition: "all .3s", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
                    }}
                    onFocus={e => { e.target.style.borderColor = "rgba(180,145,60,.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(180,145,60,.08)"; }}
                    onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* PDF Upload — Annonce de poste */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", color: C.subtle, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Annonce de poste <span style={{ color: C.subtle, fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                  </label>
                  {!form.file ? (
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                      style={{
                        border: dragOver ? `2px dashed ${C.goldLight}` : `2px dashed rgba(180,145,60,0.25)`,
                        borderRadius: 12, padding: "22px 20px", textAlign: "center",
                        cursor: "pointer", transition: "all .25s",
                        background: dragOver ? "rgba(180,145,60,0.05)" : "rgba(11,17,32,0.4)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(180,145,60,0.5)`; }}
                      onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = `rgba(180,145,60,0.25)`; }}
                    >
                      <Upload size={22} style={{ color: C.subtle, margin: "0 auto 10px" }} />
                      <p style={{ color: C.muted, fontSize: ".85rem" }}>
                        <span style={{ color: C.goldLight, fontWeight: 600 }}>Cliquez</span> ou glissez votre annonce PDF
                      </p>
                      <p style={{ color: C.subtle, fontSize: ".75rem", marginTop: 4 }}>Job description, fiche de poste, cahier des charges...</p>
                      <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                    </div>
                  ) : (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "13px 16px", borderRadius: 12,
                      background: "rgba(180,145,60,0.07)", border: `1px solid ${C.borderGold}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <FileText size={18} style={{ color: C.goldLight }} />
                        <div>
                          <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: ".86rem" }}>{form.file.name}</p>
                          <p style={{ color: C.subtle, fontSize: ".72rem" }}>{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => setForm(f => ({ ...f, file: null }))} style={{
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#EF4444",
                      }}><X size={14} /></button>
                    </div>
                  )}
                </div>

                {error && (
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16, padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)" }}>
                    <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
                    <span style={{ color: "#FCA5A5", fontSize: ".83rem" }}>{error}</span>
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading} className={loading ? "" : "shimmer-btn"} style={{
                  width: "100%", padding: "16px 24px", borderRadius: 14, border: "none",
                  background: loading ? "rgba(180,145,60,.3)" : undefined,
                  color: loading ? C.muted : "#0B1120",
                  fontWeight: 700, fontSize: ".95rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "all .3s", fontFamily: "'DM Sans', sans-serif",
                }}>
                  {loading
                    ? <><div style={{ width: 17, height: 17, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi en cours...</>
                    : <><Send size={17} />Confier mon mandat — Réponse sous 24h</>
                  }
                </button>

                <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 12 }}>🔒 Données chiffrées · Stockées sur Supabase CH · RGPD & LPD conformes</p>
                <div style={{ textAlign: "center", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                  <Link href="/candidature/finance" style={{
                    color: C.subtle, fontSize: ".8rem", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    borderBottom: `1px solid rgba(180,145,60,.2)`, paddingBottom: 2,
                    transition: "color .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = C.goldLight}
                    onMouseLeave={e => e.currentTarget.style.color = C.subtle}
                  >
                    Vous êtes candidat Finance ? → Déposez votre dossier
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ padding: "52px 32px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px", background: "rgba(180,145,60,.1)", border: `1px solid ${C.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={32} style={{ color: C.goldLight }} />
                </div>
                <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.3rem", marginBottom: 10, fontFamily: "'Sora',sans-serif" }}>
                  Mandat enregistré <GoldText>✓</GoldText>
                </h3>
                <p style={{ color: C.muted, marginBottom: 22, lineHeight: 1.7, fontSize: ".9rem" }}>
                  Merci <strong style={{ color: "#CBD5E1" }}>{form.firstName}</strong>.<br />
                  Un consultant TalentFlux Finance vous contacte sous <strong style={{ color: C.goldLight }}>24 heures</strong>.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ firstName:"",lastName:"",email:"",phone:"",company:"",profile:"",message:"" }); }}
                  style={{ padding: "10px 24px", borderRadius: 11, border: `1px solid ${C.borderGold}`, background: "rgba(180,145,60,.07)", color: C.goldLight, fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>
                  Nouveau mandat
                </button>
              </div>
            )}
          </GlassCard>

          {/* Contact info */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
            {[
              { icon: Mail, value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
              { icon: Phone, value: "+41 76 592 88 06", href: "tel:+41765928806" },
              { icon: MapPin, value: "Yverdon-les-Bains, Suisse", href: null },
            ].map(({ icon: Icon, value, href }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon size={14} style={{ color: C.subtle }} strokeWidth={1.5} />
                {href
                  ? <a href={href} style={{ color: C.muted, fontSize: ".82rem", textDecoration: "none" }}>{value}</a>
                  : <span style={{ color: C.muted, fontSize: ".82rem" }}>{value}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* ══ SILO SEO — Vous recrutez aussi dans... ══ */}
      <section style={{
        padding: "48px 2rem",
        background: "rgba(212,175,90,.06)",
        borderTop: "1px solid rgba(212,175,90,.2)",
        borderBottom: "1px solid rgba(212,175,90,.2)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#D4AF5A", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
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
            
          <a href="/pharma" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#C026D310", border: "1px solid #C026D330",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C026D318"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#C026D310"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>🔬</span>
            <div>
              <div style={{ color: "#C026D3", fontWeight: 700, fontSize: ".88rem" }}>Pharma & Life Sciences</div>
              <div style={{ color: "#475569", fontSize: ".74rem", marginTop: 2 }}>Voir la verticale →</div>
            </div>
          </a>
          <a href="/ingenierie" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#818CF810", border: "1px solid #818CF830",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#818CF818"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#818CF810"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>⚙️</span>
            <div>
              <div style={{ color: "#818CF8", fontWeight: 700, fontSize: ".88rem" }}>Ingénierie</div>
              <div style={{ color: "#475569", fontSize: ".74rem", marginTop: 2 }}>Voir la verticale →</div>
            </div>
          </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "26px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height: 30, width: "auto", objectFit: "contain" }} />
            <span style={{ color: C.subtle, fontSize: ".7rem" }}>· Finance · Yverdon-les-Bains, Suisse</span>
          </div>
          <p style={{ color: C.subtle, fontSize: ".72rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Confidentialité", "/privacy"], ["CGU", "/cgu"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: C.subtle, fontSize: ".72rem", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = C.muted}
                onMouseLeave={e => e.target.style.color = C.subtle}
              >{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
