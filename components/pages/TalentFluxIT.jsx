"use client";
import { useLang } from "@/contexts/LangContext";
import { useState, useEffect, useRef } from "react";
import { useMobile } from "@/utils/responsive";
import {
  Clock, Users, ShieldAlert, Code2, Cpu, Network,
  ArrowRight, CheckCircle, Zap, ChevronDown, Star,
  Terminal, GitBranch, Send, Phone, Mail,
  MapPin, Upload, X, FileText, AlertCircle, Shield, Building2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const useInView = (threshold = 0.15) => {
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

const GradientText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #2DD4BF 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const ProblemCard = ({ icon: Icon, title, desc, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)",
      borderTop: `2px solid ${color}`, borderRadius: 20, padding: 28,
      transition: `all 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px ${color}22`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ color, marginBottom: 20 }}><Icon size={32} strokeWidth={1.5} /></div>
      <h3 style={{ color: "#F1F5F9", fontWeight: 700, fontSize: "1.05rem", marginBottom: 12 }}>{title}</h3>
      <p style={{ color: "#94A3B8", lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
    </div>
  );
};

const BentoCard = ({ icon: Icon, title, subtitle, desc, large, delay, accent }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useMobile();
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.08))" : "rgba(15,23,42,0.9)",
        border: hovered ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 0 40px rgba(14,165,233,0.12)" : "none",
        transition: `all 0.5s ease ${delay}ms`,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)",
        gridColumn: (!isMobile && large) ? "span 2" : "span 1",
        borderRadius: 20, padding: 32, position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${accent}20,transparent 70%)`, opacity: hovered ? 1 : 0.4 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 18, display: "inline-flex", padding: 12, borderRadius: 12, background: `${accent}18` }}>
          <Icon size={24} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 8, color: accent }}>{subtitle}</div>
        <h3 style={{ color: "#F1F5F9", fontWeight: 700, fontSize: "1.05rem", marginBottom: 10 }}>{title}</h3>
        <p style={{ color: "#94A3B8", lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
      </div>
    </div>
  );
};

const StatItem = ({ value, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transition: `all 0.6s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", textAlign: "center" }}>
      <div style={{ fontSize: "2.2rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 4 }}><GradientText>{value}</GradientText></div>
      <div style={{ color: "#64748B", fontSize: ".78rem" }}>{label}</div>
    </div>
  );
};

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: "#64748B", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
      {label} {required && <span style={{ color: "#0EA5E9" }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}
      onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: "block", color: "#64748B", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
    <select value={value} onChange={onChange}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#0F172A" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── FAQ ──────────────────────────────────
const faqData = [
  {
    icon: Terminal, color: "#2563EB", bg: "rgba(37,99,235,0.12)", border: "rgba(37,99,235,0.25)",
    hint: "La preuve technique", question: "Comment savez-vous qu'il est bon ?",
    answer: "Chaque candidat que nous vous présentons a été évalué en live par ses pairs — des ingénieurs seniors qui l'ont vu coder en temps réel. Pas de QCM automatisé, pas de test asynchrone. Une session de pair-programming sur un vrai problème métier.",
    highlight: "On le fait tester par ses pairs", highlightColor: "#60A5FA", highlightBg: "rgba(37,99,235,0.08)", highlightBorder: "rgba(37,99,235,0.2)",
  },
  {
    icon: Clock, color: "#0EA5E9", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.25)",
    hint: "La vitesse", question: "Quand est-ce que j'ai mon dev ?",
    answer: "Après votre brief de 30 minutes, notre réseau est activé dans la journée. Nous puisons dans notre vivier de profils pré-validés — pas besoin de recommencer le sourcing de zéro. Vous recevez une première sélection qualifiée sous 72 heures.",
    highlight: "72h après votre brief", highlightColor: "#38BDF8", highlightBg: "rgba(14,165,233,0.08)", highlightBorder: "rgba(14,165,233,0.2)",
  },
  {
    icon: Zap, color: "#14B8A6", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.25)",
    hint: "Le risque financier", question: "Combien ça coûte ?",
    answer: "Rien jusqu'à la signature du contrat de travail. Zéro frais de dossier, zéro abonnement, zéro engagement de votre côté. Notre honoraire est un pourcentage du salaire annuel brut, facturé uniquement après l'embauche définitive.",
    highlight: "Au succès uniquement", highlightColor: "#2DD4BF", highlightBg: "rgba(20,184,166,0.08)", highlightBorder: "rgba(20,184,166,0.2)",
  },
  {
    icon: Shield, color: "#818CF8", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.25)",
    hint: "La garantie", question: "Et s'il part après un mois ?",
    answer: "Si le candidat quitte le poste dans les 3 mois suivant l'embauche — pour quelque raison que ce soit — nous relançons le processus entièrement à nos frais. Pas de négociation, pas de conditions cachées. C'est écrit dans notre contrat.",
    highlight: "Remplacement gratuit sous 3 mois", highlightColor: "#A5B4FC", highlightBg: "rgba(99,102,241,0.08)", highlightBorder: "rgba(99,102,241,0.2)",
  },
];

const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  const { isMobile } = useMobile();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.85)",
      border: open ? "1px solid rgba(14,165,233,0.35)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 18, overflow: "hidden",
      boxShadow: open ? "0 0 28px rgba(14,165,233,0.07)" : "none",
      transition: `all .3s ease ${index * 80}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "20px 24px", background: "none", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: item.bg, border: `1px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={18} style={{ color: item.color }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ color: "#F1F5F9", fontWeight: 700, fontSize: ".95rem", fontFamily: "'Sora',sans-serif" }}>{item.question}</div>
            <div style={{ color: "#475569", fontSize: ".75rem", marginTop: 2, fontWeight: 500 }}>{item.hint}</div>
          </div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: open ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "all .3s" }}>
          <ChevronDown size={13} style={{ color: open ? "#0EA5E9" : "#94A3B8" }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? 260 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ padding: isMobile ? "0 16px 18px 16px" : "0 24px 22px 78px" }}>
          <p style={{ color: "#94A3B8", lineHeight: 1.8, fontSize: ".88rem" }}>{item.answer}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 12, padding: "8px 14px", borderRadius: 9, fontWeight: 700, fontSize: ".82rem", background: item.highlightBg, border: `1px solid ${item.highlightBorder}`, color: item.highlightColor }}>
            <CheckCircle size={13} style={{ color: item.highlightColor }} />
            {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── HERO TOGGLE ──────────────────────────
const heroContent = {
  company: {
    supertitle: lang === "en" ? "For CTOs and HRDs" : "Pour les CTO et DRH",
    supColor: "#38BDF8",
    h1: <>Recrutement IT en Suisse romande :<br /><GradientText>votre filtre est obsolète, pas le talent.</GradientText></>,
    para: <>Accédez à un flux continu d'experts <strong style={{ color: "#CBD5E1" }}>validés par leurs pairs</strong>. Réduisez votre time-to-hire avec notre matching algorithmique.</>,
    ctaLabel: lang === "en" ? "Hire an Expert" : "Recruter un Expert",
    ctaStyle: "primary",
  },
  candidate: {
    supertitle: lang === "en" ? "For Developers and Tech Leads" : "Pour les Développeurs et Tech Leads",
    supColor: "#2DD4BF",
    h1: <>Développeur IT en Suisse romande :<br /><span style={{ background: "linear-gradient(135deg,#2DD4BF,#38BDF8,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>prouvez votre valeur en condition réelle.</span></>,
    para: <>Passez un test <strong style={{ color: "#CBD5E1" }}>pensé par des devs, pour des devs</strong>. Pair-programming, accès à Google autorisé, et vraie Code Review garantie.</>,
    ctaLabel: lang === "en" ? "Join the Flow" : "Rejoindre le Flux",
    ctaStyle: "outline",
  },
};

export default function TalentFluxIT() {
  const lang = useLang();
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const pillRef = useRef(null);
  const btnCoRef = useRef(null);
  const btnCaRef = useRef(null);
  const wrapRef = useRef(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", sector: "it", role: "", message: "", file: null });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Init pill position
  useEffect(() => {
    const updatePill = () => {
      if (!pillRef.current || !btnCoRef.current || !wrapRef.current) return;
      const btn = isCandidate ? btnCaRef.current : btnCoRef.current;
      if (!btn) return;
      const wR = wrapRef.current.getBoundingClientRect();
      const bR = btn.getBoundingClientRect();
      pillRef.current.style.width = bR.width + "px";
      pillRef.current.style.transform = `translateX(${bR.left - wR.left - 5}px)`;
    };
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [isCandidate]);

  const switchMode = (candidate) => {
    if (candidate === isCandidate) return;
    setHeroVisible(false);
    setTimeout(() => {
      setIsCandidate(candidate);
      setHeroVisible(true);
    }, 220);
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

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
        if (uploadError) throw new Error("Erreur upload PDF : " + uploadError.message);
        pdfFileName = fileName; pdfFileUrl = `submissions/${fileName}`;
      }
      const { error: insertError } = await supabase.from("contact_submissions").insert([{
        type: activeTab, first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: form.sector || "it",
        role: form.role.trim() || null, message: form.message.trim() || null,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (insertError) throw new Error("Erreur base de données : " + insertError.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => { setSubmitted(false); setError(null); setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", sector: "it", role: "", message: "", file: null }); };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const hero = heroContent[isCandidate ? "candidate" : "company"];
  return (
    <div style={{ background: "#0B0F1A", color: "#F1F5F9", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(14,165,233,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.4}50%{opacity:.85} }
        @keyframes slideUp { from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glowTeal { 0%,100%{box-shadow:0 0 18px rgba(20,184,166,.2)}50%{box-shadow:0 0 40px rgba(20,184,166,.5)} }
                input, select, textarea { font-size: 16px !important; }
        @media (min-width: 768px) { input, select, textarea { font-size: .88rem !important; } }
        @media (max-width: 768px) {
          .tf-nav-desktop { display: none !important; }
          .tf-badge-float { display: none !important; }
        }
        .grid-bg {
          background-image: linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);
          background-size: 60px 60px;
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .pill-transition { transition: transform .45s cubic-bezier(.34,1.56,.64,1), width .25s ease; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? "0 1rem" : "0 2rem", height: 68,
        background: scrolled ? "rgba(11,15,26,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 38, width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".12em", color: "#0EA5E9", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.3)", borderRadius: 4, padding: "2px 7px" }}>IT</span>
        </div>
        
        <div style={{ display: isMobile ? "none" : "flex", gap: "1.6rem", alignItems: "center" }}>
          {["Solution","FAQ"].map(item => (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())}
              style={{ color: "#94A3B8", fontSize: ".86rem", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color="#F1F5F9"} onMouseLeave={e => e.target.style.color="#94A3B8"}
            >{item}</span>
          ))}
        
          
          <a href="tel:+41765928806" style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 10,
            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
            color: "#38BDF8", textDecoration: "none",
            fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em",
            transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
          >
            📞 +41 76 592 88 06
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
            <Link href="/it" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
            <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
            <Link href="/en/it" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color="#64748B"}>EN</Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.2rem 60px" : "120px 2rem 80px" }}>
        {/* Orbs */}
        <div style={{ position: "absolute", top: "12%", left: "6%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.12),transparent 70%)", animation: "pulseGlow 5s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(20,184,166,.09),transparent 70%)", animation: "pulseGlow 6s ease-in-out infinite 1.5s", pointerEvents: "none" }} />

        {/* Floating cards */}
        <div style={{ position: "absolute", left: "2%", top: "38%", display: isMobile ? "none" : "block", background: "rgba(15,23,42,.95)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "12px 16px", animation: "float 4s ease-in-out infinite", pointerEvents: "none", zIndex: 1, minWidth: 155 }}>
          <div style={{ color: "#475569", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Time-to-hire</div>
          <div style={{ color: "#E2E8F0", fontSize: ".83rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#14B8A6", boxShadow: "0 0 6px #14B8A6", flexShrink: 0, display: "inline-block" }} />
            72h en moyenne
          </div>
        </div>
        <div style={{ position: "absolute", right: "2%", top: "42%", display: isMobile ? "none" : "block", background: "rgba(15,23,42,.95)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "12px 16px", animation: "float 4s ease-in-out infinite 1.8s", pointerEvents: "none", zIndex: 1, minWidth: 155 }}>
          <div style={{ color: "#475569", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Satisfaction</div>
          <div style={{ color: "#E2E8F0", fontSize: ".83rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0EA5E9", boxShadow: "0 0 6px #0EA5E9", flexShrink: 0, display: "inline-block" }} />
            95% clients satisfaits
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* TOGGLE PILL */}
          <div ref={wrapRef} style={{
            display: "inline-flex", alignItems: "center",
            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 100, padding: 5, marginBottom: 44, position: "relative",
          }}>
            <div ref={pillRef} className="pill-transition" style={{
              position: "absolute", top: 5, left: 5,
              height: "calc(100% - 10px)", borderRadius: 100,
              background: "linear-gradient(135deg,#1D4ED8,#0EA5E9,#14B8A6)",
              zIndex: 0, boxShadow: isCandidate ? "0 0 20px rgba(20,184,166,.4)" : "0 0 20px rgba(14,165,233,.4)",
            }} />
            {[
              { key: false, label: "Je recrute", icon: <Building2 size={14} /> },
              { key: true,  label: "Je code",    icon: <Terminal size={14} /> },
            ].map(({ key, label, icon }) => (
              <button key={String(key)} ref={key === false ? btnCoRef : btnCaRef}
                onClick={() => switchMode(key)}
                style={{
                  position: "relative", zIndex: 1, padding: "10px 22px", border: "none", background: "none",
                  cursor: "pointer", borderRadius: 100, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".86rem",
                  color: isCandidate === key ? "#fff" : "#64748B", transition: "color .3s",
                  display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                }}>
                {icon} {label}
              </button>
            ))}
          </div>

          {/* HERO TEXT */}
          <div style={{ transition: "opacity .25s ease, transform .25s ease", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(10px)" }}>
            <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: hero.supColor, marginBottom: 16 }}>{hero.supertitle}</p>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.9rem,4.5vw,3.4rem)", fontWeight: 800, lineHeight: 1.13, letterSpacing: "-.02em", color: "#F1F5F9", marginBottom: 22 }}>
              {hero.h1}
            </h1>
            <p style={{ color: "#94A3B8", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 36px" }}>
              {hero.para}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              {hero.ctaStyle === "primary" ? (
                <button onClick={() => scrollTo("contact")} style={{
                  background: "linear-gradient(135deg,#2563EB,#0EA5E9,#14B8A6)", border: "none", color: "#fff",
                  padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                  boxShadow: "0 0 28px rgba(14,165,233,.4)", transition: "all .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 0 50px rgba(14,165,233,.65)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 0 28px rgba(14,165,233,.4)"; }}
                >
                  <Users size={17} /> {hero.ctaLabel} <ArrowRight size={16} />
                </button>
              ) : (
                <Link href="/candidature/it" style={{
                  background: "rgba(20,184,166,.07)", border: "1.5px solid rgba(45,212,191,.5)", color: "#2DD4BF",
                  padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                  animation: "glowTeal 3s ease-in-out infinite", transition: "all .3s", textDecoration: "none",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.background="rgba(20,184,166,.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="rgba(20,184,166,.07)"; }}
                >
                  <Terminal size={17} /> {hero.ctaLabel} <ArrowRight size={16} />
                </Link>
              )}
            </div>
            {/* Lien candidat */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Link href="/candidature/it" style={{
                color: "#475569", fontSize: ".8rem", textDecoration: "none",
                borderBottom: "1px solid rgba(71,85,105,.3)", paddingBottom: 2,
                transition: "color .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
                onMouseLeave={e => e.currentTarget.style.color="#475569"}
              >
                Vous êtes développeur ? → Déposez votre candidature
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 20 : 28, justifyContent: "center", flexWrap: "wrap", marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {[
              { v: "50+",  l: "Profils validés" },
              { v: "72h",  l: "Délai moyen" },
              { v: "95%",  l: "Clients satisfaits" },
              { v: "100%", l: "Au succès" },
            ].map(({ v, l }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.9rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 3 }}><GradientText>{v}</GradientText></div>
                <div style={{ color: "#475569", fontSize: ".75rem" }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="animate-float" style={{ marginTop: 48, opacity: .35, cursor: "pointer" }} onClick={() => scrollTo("solution")}>
            <ChevronDown size={22} color="#94A3B8" />
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", maxWidth: 1060, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ color: "#EF4444", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le coût de l'erreur</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,3.8vw,2.8rem)", fontWeight: 800, lineHeight: 1.2, color: "#F1F5F9" }}>
            Chaque mauvais recrutement vous coûte<br /><GradientText>en moyenne 30 000 CHF.</GradientText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 22 }}>
          <ProblemCard icon={Clock} title="Time-to-hire trop long" desc="Vos équipes attendent 3 à 6 mois pour un profil senior. Pendant ce temps, vos sprints dérivent et vos concurrents recrutent." color="#F97316" delay={0} />
          <ProblemCard icon={Users} title="Culture-fit raté" desc="Le CV est parfait. L'intégration est catastrophique. Sans évaluation comportementale, vous recrutez une compétence, pas un collaborateur." color="#EF4444" delay={100} />
          <ProblemCard icon={ShieldAlert} title="Fake-experts démasqués trop tard" desc="Ils connaissent le jargon, pas le code. Sans test technique live, vous découvrez la vérité après 3 mois de mission." color="#DC2626" delay={200} />
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", background: "rgba(15,23,42,.4)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#38BDF8", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ La Solution TalentFlux</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,3.8vw,2.8rem)", fontWeight: 800, lineHeight: 1.2, color: "#F1F5F9" }}>
              La <GradientText>Stack TalentFlux</GradientText><br />appliquée au recrutement IT
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 18 }}>
            <BentoCard icon={Terminal} subtitle="Méthode #1" title="Évaluation Live-Coding" desc="On ne croit que ce qu'on voit. Chaque candidat passe un entretien technique live avec nos ingénieurs seniors. Du vrai pair-programming, zéro triche." large={false} delay={0} accent="#2563EB" />
            <BentoCard icon={Cpu} subtitle="Méthode #2" title="Matching Algorithmique" desc="La précision du code appliquée aux RH. Notre système analyse les critères clés — stack, culture, timezone — pour un fit optimal dès le premier jour." large={false} delay={100} accent="#0EA5E9" />
            <BentoCard icon={Network} subtitle="Méthode #3" title="Réseau Invisible" desc="Accès aux talents qui ne cherchent pas activement. Ils ne sont pas sur LinkedIn. Ils sont dans notre réseau cultivé depuis le lancement de TalentFlux." large={true} delay={200} accent="#14B8A6" />
          </div>
          <div style={{ marginTop: 48, padding: 40, background: "rgba(11,15,26,.8)", borderRadius: 22, border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ color: "#94A3B8", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 28, textAlign: "center" }}>Le processus en 4 étapes</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 20 : 14 }}>
              {[
                { n:"01", t:"Brief", d:"30 min pour cerner vos besoins", icon: GitBranch },
                { n:"02", t:"Sourcing", d:"Activation du réseau sous 24h", icon: Network },
                { n:"03", t:"Validation", d:"Live-coding + culture-fit", icon: Code2 },
                { n:"04", t:"Intégration", d:"Suivi 3 mois post-embauche", icon: CheckCircle },
              ].map(({ n, t, d, icon: Icon }, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", margin: "0 auto 12px", background: "linear-gradient(135deg,rgba(37,99,235,.2),rgba(20,184,166,.2))", border: "1px solid rgba(14,165,233,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={19} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                  </div>
                  <div style={{ color: "#475569", fontSize: ".68rem", fontWeight: 700, marginBottom: 3 }}>{n}</div>
                  <div style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 5, fontSize: ".92rem" }}>{t}</div>
                  <div style={{ color: "#64748B", fontSize: ".76rem", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "48px 1.2rem" : "72px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { q: "On avait cherché 4 mois sans résultat. TalentFlux nous a envoyé 3 profils qualifiés en quelques jours. L'un d'eux est encore chez nous.", a: "CTO, Startup Lausanne" },
            { q: "Le live-coding m'a bluffé. On voyait enfin la réalité du niveau technique, pas la mise en scène des entretiens classiques.", a: "Head of Engineering, Scale-up Genève" },
            { q: "Leur approche est directe et honnête. Pas de promesses folles, juste des profils solides présentés rapidement.", a: "Fondateur, SaaS Yverdon" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background: "rgba(15,23,42,.8)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 18, padding: 26 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {Array(5).fill(0).map((_,j) => <Star key={j} size={12} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", marginBottom: 14, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: "#475569", fontSize: ".76rem", fontWeight: 600 }}>— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", background: "rgba(15,23,42,.3)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#38BDF8", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Vos questions, nos réponses</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,3.8vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: "#F1F5F9", marginBottom: 12 }}>
              Tout ce que vous voulez savoir<br /><GradientText>avant de nous appeler</GradientText>
            </h2>
            <p style={{ color: "#94A3B8", fontSize: ".9rem", lineHeight: 1.7 }}>Les 4 objections qu'on entend chaque semaine — répondues sans détour.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqData.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.2rem" : "90px 2rem", position: "relative", background: "rgba(15,23,42,.4)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(37,99,235,.07),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#2DD4BF", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.7rem,3.8vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: "#F1F5F9", marginBottom: 12 }}>
              Prêt à construire votre<br /><GradientText>équipe technique ?</GradientText>
            </h2>
            <p style={{ color: "#94A3B8", fontSize: ".92rem", lineHeight: 1.7 }}>Aucun frais avant l'embauche. Satisfaction garantie. Premier brief sous 24h.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 310px", gap: 22 }}>
            {/* FORM */}
            <div style={{ background: "rgba(11,15,26,.9)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                <button
                  style={{ flex: 1, padding: "16px", border: "none", cursor: "pointer", background: "linear-gradient(135deg,rgba(37,99,235,.15),rgba(20,184,166,.1))", color: "#F1F5F9", fontWeight: 700, fontSize: ".86rem", borderBottom: "2px solid #0EA5E9", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>
                  🏢 Je recrute
                </button>
                <Link href="/candidature/it" style={{
                  flex: 1, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  background: "transparent", borderBottom: "2px solid transparent",
                  color: "#475569", fontWeight: 700, fontSize: ".86rem",
                  textDecoration: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color="#F1F5F9"; e.currentTarget.style.background="rgba(20,184,166,.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="#475569"; e.currentTarget.style.background="transparent"; }}
                >
                  👤 Je suis candidat →
                </Link>
              </div>
              {!submitted ? (
                <div style={{ padding: 26 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 13, marginBottom: 13 }}>
                    <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                    <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                    <InputField label="Email" type="email" placeholder="sophie@acme.com" value={form.email} onChange={set("email")} required />
                    <InputField label="Téléphone" type="tel" placeholder="+41 76 592 88 06" value={form.phone} onChange={set("phone")} />
                    {activeTab==="recruiter"
                      ? <><InputField label="Entreprise" placeholder="Acme Corp SA" value={form.company} onChange={set("company")} required /><InputField label="Rôle recherché" placeholder="Lead Developer React" value={form.role} onChange={set("role")} /></>
                      : <><InputField label="Poste actuel" placeholder="Lead Developer" value={form.role} onChange={set("role")} /><InputField label="Stack principale" placeholder="React, Node.js, Python..." value={form.company} onChange={set("company")} /></>
                    }
                  </div>
                  <div style={{ marginBottom: 13 }}>
                    <label style={{ display: "block", color: "#64748B", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab==="recruiter"?"Décrivez le poste":"Parlez-nous de vous"}
                    </label>
                    <textarea placeholder={activeTab==="recruiter"?"Stack, niveau, urgence...":"Profil, attentes, disponibilité..."} value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,.8)", border: "1px solid rgba(255,255,255,.09)", color: "#F1F5F9", fontSize: ".88rem", outline: "none", resize: "vertical", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e=>{e.target.style.borderColor="rgba(14,165,233,.6)";e.target.style.boxShadow="0 0 0 3px rgba(14,165,233,.08)"}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,.09)";e.target.style.boxShadow="none"}}
                    />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", color: "#64748B", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab==="recruiter"?"Job Description":"CV"}
                      <span style={{ color: "#334155", fontWeight: 400, marginLeft: 8, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)}
                        onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
                        style={{ border: dragOver?"2px dashed #0EA5E9":"2px dashed rgba(255,255,255,.09)", borderRadius: 11, padding: "17px", textAlign: "center", cursor: "pointer", transition: "all .25s", background: "rgba(11,15,26,.4)" }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(14,165,233,.4)"}
                        onMouseLeave={e=>{if(!dragOver)e.currentTarget.style.borderColor="rgba(255,255,255,.09)"}}
                      >
                        <Upload size={20} style={{ color: "#334155", margin: "0 auto 7px" }} />
                        <p style={{ color: "#475569", fontSize: ".82rem" }}><span style={{ color: "#0EA5E9", fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e=>handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(14,165,233,.07)", border: "1px solid rgba(14,165,233,.25)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <FileText size={17} style={{ color: "#0EA5E9" }} />
                          <div>
                            <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: ".84rem" }}>{form.file.name}</p>
                            <p style={{ color: "#64748B", fontSize: ".7rem" }}>{(form.file.size/1024/1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={()=>setForm(f=>({...f,file:null}))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "4px 6px", cursor: "pointer", color: "#EF4444" }}><X size={13}/></button>
                      </div>
                    )}
                  </div>
                  {error && (
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13, padding: "10px 13px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)" }}>
                      <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
                      <span style={{ color: "#FCA5A5", fontSize: ".83rem" }}>{error}</span>
                    </div>
                  )}
                  <button onClick={handleSubmit} disabled={loading}
                    style={{ width: "100%", padding: "14px 22px", borderRadius: 13, border: "none", background: loading?"rgba(37,99,235,.4)":"linear-gradient(135deg,#2563EB,#0EA5E9,#14B8A6)", color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading?"not-allowed":"pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, boxShadow: loading?"none":"0 4px 22px rgba(14,165,233,.38)", transition: "all .3s", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e=>{if(!loading){e.currentTarget.style.boxShadow="0 8px 36px rgba(14,165,233,.58)";e.currentTarget.style.transform="translateY(-2px)"}}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 22px rgba(14,165,233,.38)";e.currentTarget.style.transform="translateY(0)"}}
                  >
                    {loading?<><div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Envoi...</>:<><Send size={16}/>{lang === "en" ? (activeTab==="recruiter" ? "Start IT Recruitment" : "Send my profile") : (activeTab==="recruiter" ? "Lancer mon Recrutement IT" : "Envoyer mon profil")}</>}
                  </button>
                  <p style={{ color: "#334155", fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Données stockées sur Supabase · RGPD conforme</p>
                </div>
              ) : (
                <div style={{ padding: "52px 26px", textAlign: "center" }}>
                  <CheckCircle size={44} style={{ color: "#14B8A6", margin: "0 auto 16px" }} />
                  <h3 style={{ color: "#F1F5F9", fontWeight: 700, fontSize: "1.25rem", marginBottom: 10 }}>Demande enregistrée <GradientText>✓</GradientText></h3>
                  <p style={{ color: "#94A3B8", marginBottom: 20, lineHeight: 1.7, fontSize: ".9rem" }}>Merci <strong style={{ color: "#CBD5E1" }}>{form.firstName}</strong> !<br/>Un expert vous contacte sous <strong style={{ color: "#0EA5E9" }}>24h</strong>.</p>
                  <button onClick={resetForm} style={{ padding: "10px 24px", borderRadius: 11, border: "1px solid rgba(14,165,233,.3)", background: "rgba(14,165,233,.08)", color: "#0EA5E9", fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ background: "rgba(11,15,26,.9)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".9rem", marginBottom: 15, color: "#F1F5F9" }}>Nous contacter</h3>
                {[
                  { icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
                  { icon: Phone, label: "Téléphone", value: "+41 76 592 88 06", href: "tel:+41765928806" },
                  { icon: MapPin, label: "Adresse", value: "Yverdon-les-Bains, Suisse", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: "linear-gradient(135deg,rgba(37,99,235,.15),rgba(20,184,166,.15))", border: "1px solid rgba(14,165,233,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={13} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: "#475569", fontSize: ".66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>{label}</div>
                      {href?<a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none", fontWeight: 500 }}>{value}</a>:<span style={{ color: "#CBD5E1", fontSize: ".82rem", fontWeight: 500 }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "linear-gradient(135deg,rgba(37,99,235,.1),rgba(20,184,166,.08))", border: "1px solid rgba(14,165,233,.2)", borderRadius: 20, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                  <Clock size={14} style={{ color: "#2DD4BF" }} />
                  <span style={{ color: "#F1F5F9", fontWeight: 700, fontSize: ".86rem" }}>Délais de réponse</span>
                </div>
                {[["Accusé de réception","< 2h"],["Premier brief","< 24h"],["Premiers profils","< 72h"]].map(([l,d])=>(
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ color: "#94A3B8", fontSize: ".78rem" }}>{l}</span>
                    <span style={{ color: "#2DD4BF", fontSize: ".74rem", fontWeight: 700, background: "rgba(20,184,166,.1)", padding: "2px 8px", borderRadius: 5 }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(11,15,26,.8)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 20, padding: 18 }}>
                {[["✓","Aucun frais avant embauche"],["✓","Satisfaction garantie 3 mois"],["✓","Confidentialité totale"],["✓","50+ profils validés"]].map(([icon,text])=>(
                  <div key={text} style={{ display: "flex", gap: 9, padding: "6px 0", alignItems: "center" }}>
                    <span style={{ color: "#2DD4BF", fontWeight: 700, fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ color: "#94A3B8", fontSize: ".8rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ══ SILO SEO — Vous recrutez aussi dans... ══ */}
      <section style={{
        padding: "48px 2rem",
        background: "rgba(14,165,233,.06)",
        borderTop: "1px solid rgba(56,189,248,.2)",
        borderBottom: "1px solid rgba(56,189,248,.2)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#38BDF8", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
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
            
          <a href="/telecom" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#0EA5E910", border: "1px solid #0EA5E930",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0EA5E918"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#0EA5E910"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>📡</span>
            <div>
              <div style={{ color: "#0EA5E9", fontWeight: 700, fontSize: ".88rem" }}>Télécommunications</div>
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

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "26px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 13 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.png" alt="TalentFlux" style={{ height: 32, width: "auto", objectFit: "contain" }} />
            <span style={{ color: "#334155", fontSize: ".7rem" }}>· IT · Yverdon-les-Bains, Suisse</span>
          </div>
          <p style={{ color: "#334155", fontSize: ".73rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display: isMobile ? "none" : "flex", gap: 16 }}>
            {[["Confidentialité","/privacy"],["CGU","/cgu"],["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: "#475569", fontSize: ".73rem", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e=>e.target.style.color="#94A3B8"} onMouseLeave={e=>e.target.style.color="#475569"}
              >{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
