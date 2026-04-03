"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  Leaf, TreePine, Sun, Droplets, Hammer, MapPin,
  ArrowRight, CheckCircle, ChevronDown, Star,
  Send, Phone, Mail, Upload, X, FileText,
  AlertCircle, Clock, Users, Sprout, Mountain,
  Building2, Award, Shield
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

// ── Design tokens Paysagisme ──────────────────────────
const C = {
  bg:        "#080F0A",
  bgCard:    "rgba(10,20,12,0.85)",
  border:    "rgba(255,255,255,0.07)",
  text:      "#F0F7F2",
  muted:     "#94A89A",
  subtle:    "#4A6352",
  // Verts naturels
  green:     "#16A34A",
  greenL:    "#22C55E",
  greenD:    "#15803D",
  mint:      "#4ADE80",
  sage:      "#86EFAC",
  // Terre
  earth:     "#A16207",
  earthL:    "#CA8A04",
  stone:     "#78716C",
  // Ciel
  sky:       "#0EA5E9",
  // Gradient principal
  grad:      "linear-gradient(135deg, #15803D 0%, #16A34A 40%, #4ADE80 100%)",
  gradMuted: "linear-gradient(135deg, rgba(22,163,74,.15), rgba(74,222,128,.08))",
};

const GradientText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #4ADE80 0%, #22C55E 50%, #86EFAC 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const EarthText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #CA8A04 0%, #A16207 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

// ── Composants ──────────────────────────────────────────
const ProblemCard = ({ icon: Icon, title, desc, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderTop: `2px solid ${color}`, borderRadius: 20, padding: 28,
      transition: `all 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px ${color}22`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ color, marginBottom: 18 }}><Icon size={30} strokeWidth={1.5} /></div>
      <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.02rem", marginBottom: 10 }}>{title}</h3>
      <p style={{ color: C.muted, lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, subtitle, desc, delay, accent, large }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const { isMobile } = useMobile();
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `linear-gradient(135deg, rgba(22,163,74,.1), rgba(74,222,128,.05))` : C.bgCard,
        border: hovered ? `1px solid rgba(74,222,128,.35)` : `1px solid ${C.border}`,
        boxShadow: hovered ? "0 0 40px rgba(34,197,94,.1)" : "none",
        transition: `all 0.5s ease ${delay}ms`,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)",
        gridColumn: (!isMobile && large) ? "span 2" : "span 1",
        borderRadius: 20, padding: 30, position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle,${accent}25,transparent 70%)`, opacity: hovered ? 1 : 0.4, transition: "opacity .4s" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 16, display: "inline-flex", padding: 11, borderRadius: 12, background: `${accent}18` }}>
          <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 7, color: accent }}>{subtitle}</div>
        <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.02rem", marginBottom: 9 }}>{title}</h3>
        <p style={{ color: C.muted, lineHeight: 1.7, fontSize: ".87rem" }}>{desc}</p>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
      {label} {required && <span style={{ color: C.greenL }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(5,12,7,0.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}
      onFocus={e => { e.target.style.borderColor = "rgba(74,222,128,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.07)"; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
    <select value={value} onChange={onChange}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(5,12,7,0.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = "rgba(74,222,128,0.5)"; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#080F0A" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── FAQ ──────────────────────────────────────────────────
const faqData = [
  {
    icon: Sprout, color: C.greenL, bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)",
    hint: "La qualification", question: "Comment validez-vous les compétences techniques ?",
    answer: "Chaque candidat est évalué sur ses réalisations concrètes : plans de plantation, gestion de chantier, conduite d'engins, maîtrise des normes SN (routes, terrains de sport). On ne se contente pas d'un certificat AFP ou CFC — on vérifie ce qu'il a réellement construit.",
    highlight: "Vérification sur réalisations réelles", highlightColor: C.mint, highlightBg: "rgba(74,222,128,.08)", highlightBorder: "rgba(74,222,128,.2)",
  },
  {
    icon: Clock, color: C.sky, bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.2)",
    hint: "La réactivité", question: "Vous trouvez en combien de temps ?",
    answer: "Notre vivier de paysagistes, conducteurs de travaux et chefs d'équipe est constitué en permanence. Pour un profil opérationnel (jardinier, maçon paysagiste), première sélection sous 72h. Pour un chef de projet ou directeur technique, comptez 5-7 jours ouvrables.",
    highlight: "72h pour profils opérationnels", highlightColor: C.sky, highlightBg: "rgba(14,165,233,.08)", highlightBorder: "rgba(14,165,233,.2)",
  },
  {
    icon: Shield, color: C.earthL, bg: "rgba(202,138,4,0.1)", border: "rgba(202,138,4,0.2)",
    hint: "La garantie", question: "Et si le collaborateur ne convient pas ?",
    answer: "Garantie de remplacement 3 mois. Si le candidat quitte le poste ou ne satisfait pas aux attentes dans les 3 premiers mois, nous relançons le processus entièrement à nos frais. Sans négociation, sans conditions cachées.",
    highlight: "Remplacement garanti 3 mois", highlightColor: C.earthL, highlightBg: "rgba(202,138,4,.08)", highlightBorder: "rgba(202,138,4,.2)",
  },
  {
    icon: Award, color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)",
    hint: "La spécialisation", question: "Vous connaissez vraiment le secteur paysage ?",
    answer: "TalentFlux s'est construit avec des professionnels du terrain. On distingue un jardinier d'entretien d'un maçon paysagiste, un dessinateur d'un chargé de projet, un poseur de gazon synthétique d'un spécialiste en revêtements drainants. Pas de recruteurs généralistes ici.",
    highlight: "Spécialistes du secteur paysage", highlightColor: "#A78BFA", highlightBg: "rgba(167,139,250,.08)", highlightBorder: "rgba(167,139,250,.2)",
  },
];

const FAQItem = ({ item, index }) => {
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{
      background: "rgba(10,20,12,0.85)",
      border: open ? `1px solid rgba(74,222,128,.3)` : `1px solid ${C.border}`,
      borderRadius: 18, overflow: "hidden",
      boxShadow: open ? "0 0 28px rgba(34,197,94,.06)" : "none",
      transition: `all .3s ease ${index * 80}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "18px 22px", background: "none", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: item.bg, border: `1px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={17} style={{ color: item.color }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: ".93rem", fontFamily: "'Sora',sans-serif" }}>{item.question}</div>
            <div style={{ color: C.subtle, fontSize: ".74rem", marginTop: 2 }}>{item.hint}</div>
          </div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: open ? "rgba(74,222,128,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "all .3s" }}>
          <ChevronDown size={13} style={{ color: open ? C.mint : C.muted }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? 280 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ padding: isMobile ? "0 16px 18px 16px" : "0 22px 20px 73px" }}>
          <p style={{ color: C.muted, lineHeight: 1.8, fontSize: ".87rem" }}>{item.answer}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 11, padding: "7px 13px", borderRadius: 9, fontWeight: 700, fontSize: ".8rem", background: item.highlightBg, border: `1px solid ${item.highlightBorder}`, color: item.highlightColor }}>
            <CheckCircle size={12} style={{ color: item.highlightColor }} />
            {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ──────────────────────────────────────
export default function TalentFluxPaysagisme() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", role: "", message: "", sector: "paysagisme",
    contrat: "", zone: "", permis: "", dispo: "", file: null,
  });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleFile = file => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Fichier trop lourd (max 10 MB)."); return; }
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
        const sanitize = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fileName = `${Date.now()}_${sanitize(form.firstName)}_${sanitize(form.lastName)}.pdf`;
        const { error: uploadError } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fileName}`, form.file, { contentType: "application/pdf" });
        if (uploadError) throw new Error("Erreur upload : " + uploadError.message);
        pdfFileName = fileName; pdfFileUrl = `submissions/${fileName}`;
      }
      const { error: insertError } = await supabase.from("contact_submissions").insert([{
        type: activeTab, first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: form.sector || "paysagisme",
        role: form.role.trim() || null,
        role: form.role.trim() || null, message: form.message.trim() || null,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (insertError) throw new Error("Erreur : " + insertError.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false); setError(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", role: "", message: "", sector: "paysagisme", contrat: "", zone: "", permis: "", dispo: "", file: null });
  };

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(74,222,128,0.25); color: #fff; }
        input::placeholder, textarea::placeholder { color: #2D4A37; }
        @keyframes float    { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes pulseGlow{ 0%,100%{opacity:.35}50%{opacity:.75} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes growUp   { from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)} }
        @keyframes sway     { 0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)} }
        .nature-grid {
          background-image:
            linear-gradient(rgba(22,163,74,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,163,74,.03) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .leaf-sway { animation: sway 4s ease-in-out infinite; transform-origin: bottom center; }
        @media (max-width: 768px) {
          .tf-nav-desktop { display: none !important; }
          .tf-badge-float { display: none !important; }
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 66,
        background: scrolled ? "rgba(8,15,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: C.greenL, background: "rgba(34,197,94,.1)", border: `1px solid rgba(34,197,94,.3)`, borderRadius: 4, padding: "2px 7px" }}>PAYSAGE</span>
        </div>

        {isMobile && (
          <button onClick={() => scrollTo("contact")} style={{
            background: C.grad, border: "none", color: "#fff",
            padding: "8px 16px", borderRadius: 10, fontWeight: 700, fontSize: ".82rem",
            cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
          }}>Recruter →</button>
        )}

        <div style={{ display: isMobile ? "none" : "flex", gap: "1.6rem", alignItems: "center" }}>
          {["Solution", "Métiers", "FAQ", "Contact"].map(item => (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())}
              style={{ color: C.muted, fontSize: ".85rem", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.muted}
            >{item}</span>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: C.grad, border: "none", color: "#fff",
            padding: "10px 22px", borderRadius: 12, fontWeight: 700, fontSize: ".85rem", cursor: "pointer",
            boxShadow: "0 0 20px rgba(34,197,94,.3)", display: "flex", alignItems: "center", gap: 7,
            transition: "all .3s", fontFamily: "'DM Sans',sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 36px rgba(34,197,94,.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,.3)"; }}
          >
            Recruter <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="nature-grid" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.2rem 60px" : "120px 2rem 80px" }}>

        {/* Orbs naturels */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(22,163,74,.1),transparent 70%)", animation: "pulseGlow 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(162,138,4,.07),transparent 70%)", animation: "pulseGlow 7s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {/* Badge gauche */}
        <div style={{ position: "absolute", left: "3%", top: "40%", display: isMobile ? "none" : "block", background: "rgba(10,20,12,.95)", border: `1px solid rgba(74,222,128,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite", pointerEvents: "none", zIndex: 1, minWidth: 160 }}>
          <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Pénurie Suisse romande</div>
          <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.greenL, boxShadow: `0 0 6px ${C.greenL}`, flexShrink: 0, display: "inline-block" }} />
            +3 400 postes ouverts
          </div>
        </div>

        {/* Badge droit */}
        <div style={{ position: "absolute", right: "3%", top: "44%", display: isMobile ? "none" : "block", background: "rgba(10,20,12,.95)", border: `1px solid rgba(202,138,4,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite 1.8s", pointerEvents: "none", zIndex: 1, minWidth: 160 }}>
          <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Secteur</div>
          <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.earthL, boxShadow: `0 0 6px ${C.earthL}`, flexShrink: 0, display: "inline-block" }} />
            Paysage · Construction
          </div>
        </div>

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* Icône végétale animée */}
          <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12 }}>
            <div className="leaf-sway" style={{ color: C.green }}><Leaf size={28} strokeWidth={1.5} /></div>
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, transparent, ${C.greenL}60, transparent)` }} />
            <div className="leaf-sway" style={{ color: C.earthL, animationDelay: ".5s" }}><Sprout size={24} strokeWidth={1.5} /></div>
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, transparent, ${C.greenL}60, transparent)` }} />
            <div className="leaf-sway" style={{ color: C.green, animationDelay: "1s" }}><TreePine size={26} strokeWidth={1.5} /></div>
          </div>

          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: C.greenL, marginBottom: 16 }}>
            Recrutement · Paysagisme & Aménagements extérieurs
          </p>

          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-.02em", color: C.text, marginBottom: 22 }}>
            Le bon profil ne pousse pas<br />
            <GradientText>tout seul dans votre jardin.</GradientText>
          </h1>

          <p style={{ color: C.muted, fontSize: ".97rem", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 36px" }}>
            Jardiniers, maçons paysagistes, chefs de chantier, conducteurs de travaux — TalentFlux constitue votre équipe terrain avec le même soin que vous apportez à vos réalisations.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{
              background: C.grad, border: "none", color: "#fff",
              padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
              boxShadow: "0 0 28px rgba(34,197,94,.35)", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(34,197,94,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(34,197,94,.35)"; }}
            >
              <Users size={17} /> Trouver mon profil <ArrowRight size={16} />
            </button>
            <Link href="/candidature/paysagisme" style={{
              background: "rgba(202,138,4,.08)", border: "1.5px solid rgba(202,138,4,.4)", color: C.earthL,
              padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem",
              display: "flex", alignItems: "center", gap: 9, textDecoration: "none", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(202,138,4,.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(202,138,4,.08)"; }}
            >
              <Sprout size={17} /> Déposer ma candidature <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 18 : 32, justifyContent: "center", flexWrap: "wrap", marginTop: 52, paddingTop: 34, borderTop: `1px solid ${C.border}` }}>
            {[
              { v: "72h",  l: "Délai premier profil" },
              { v: "100%", l: "Au succès" },
              { v: "3 mois", l: "Garantie remplacement" },
              { v: "Suisse", l: "Romande & Alémanique" },
            ].map(({ v, l }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 3 }}><GradientText>{v}</GradientText></div>
                <div style={{ color: C.subtle, fontSize: ".75rem" }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 44, opacity: .3, cursor: "pointer" }} onClick={() => scrollTo("solution")}>
            <ChevronDown size={22} color={C.greenL} />
          </div>
        </div>
      </section>

      {/* ═══ PROBLÈME ═══ */}
      <section style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: "#EF4444", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le défi du secteur</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            La pénurie de paysagistes qualifiés<br />
            <EarthText>coûte des chantiers entiers.</EarthText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          <ProblemCard icon={Clock} title="Recrutement chronophage" desc="Publier une annonce, trier 200 CV dont 80% hors profil, organiser les entretiens — pendant ce temps votre chantier attend et votre chef d'équipe jongle seul." color="#F97316" delay={0} />
          <ProblemCard icon={Hammer} title="Profils non qualifiés" desc="CFC paysagiste sur le papier mais jamais tenu un taille-haie électrique. AFP annoncée sans connaissance des normes SN. La vérification des compétences pratiques vous appartient — jusqu'ici." color="#EF4444" delay={100} />
          <ProblemCard icon={Users} title="Turn-over saisonnier" desc="Vous formez en mars, ils partent en octobre. Chaque saison recommence de zéro. Sans un matching précis sur la culture d'entreprise et les perspectives, le cycle continue." color="#DC2626" delay={200} />
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section id="solution" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", background: "rgba(10,20,12,.4)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ color: C.mint, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Notre approche</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Du sourcing à l'intégration —<br /><GradientText>on cultive votre équipe.</GradientText>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 18 }}>
            <FeatureCard icon={Leaf} subtitle="Méthode #1" title="Validation terrain" desc="On vérifie ce que le candidat a réellement réalisé. Plans de plantation, chantiers gérés, engins conduits, normes appliquées. Pas de matching sur du papier." large={false} delay={0} accent={C.greenL} />
            <FeatureCard icon={MapPin} subtitle="Méthode #2" title="Réseau local Suisse" desc="Notre réseau couvre Vaud, Genève, Fribourg, Valais et Neuchâtel. Profils locaux, pas de candidats qui refuseront le poste pour des raisons de mobilité." large={false} delay={100} accent={C.sky} />
            <FeatureCard icon={Sun} subtitle="Méthode #3" title="Matching culture & saison" desc="On aligne les attentes : contrat annuel ou saisonnier, full-time ou partiel, intégration long-terme ou renfort de chantier. Le bon profil au bon moment." large={true} delay={200} accent={C.earthL} />
          </div>

          {/* Étapes */}
          <div style={{ marginTop: 48, padding: isMobile ? 24 : 38, background: "rgba(8,15,10,.8)", borderRadius: 22, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 26, textAlign: "center" }}>Le processus en 4 étapes</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 20 : 14 }}>
              {[
                { n: "01", t: "Brief",     d: "30 min pour cerner vos besoins terrain",   icon: Leaf },
                { n: "02", t: "Sourcing",  d: "Activation réseau sous 24h en Suisse",      icon: TreePine },
                { n: "03", t: "Validation",d: "Évaluation compétences pratiques + fit",    icon: CheckCircle },
                { n: "04", t: "Suivi",     d: "Accompagnement 3 mois post-embauche",       icon: Sprout },
              ].map(({ n, t, d, icon: Icon }, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", margin: "0 auto 11px", background: "linear-gradient(135deg,rgba(22,163,74,.2),rgba(74,222,128,.1))", border: `1px solid rgba(74,222,128,.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} style={{ color: C.greenL }} strokeWidth={1.5} />
                  </div>
                  <div style={{ color: C.subtle, fontSize: ".66rem", fontWeight: 700, marginBottom: 3 }}>{n}</div>
                  <div style={{ color: C.text, fontWeight: 700, marginBottom: 4, fontSize: ".9rem" }}>{t}</div>
                  <div style={{ color: C.subtle, fontSize: ".75rem", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISE KICK-OFF ═══ */}
      <section style={{ padding: isMobile ? "48px 1.2rem" : "72px 2rem", background: "rgba(8,15,10,.5)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: C.earthL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Notre kick-off</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.5rem,3.2vw,2.4rem)", fontWeight: 800, color: C.text }}>
              Les 8 questions que nous posons<br /><EarthText>au premier appel</EarthText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".9rem", marginTop: 12, lineHeight: 1.7, maxWidth: 560, margin: "12px auto 0" }}>
              Ces questions nous permettent de ne pas perdre votre temps — ni le nôtre. Elles définissent le profil exact avant de commencer le sourcing.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(2,1fr)", gap: 14 }}>
            {[
              { n:"01", q: "CFC Paysagiste, AFP, ou expérience équivalente ?", d: "On ne recrute pas uniquement sur le diplôme — mais on vérifie toujours la formation pratique réelle." },
              { n:"02", q: "Quelle spécialité principale : plantation, maçonnerie, arboriculture, terrain de sport ?", d: "Un maçon paysagiste et un jardinier d'entretien n'ont pas le même profil. On ne mélange pas." },
              { n:"03", q: "Permis B, BE, C ou engins ? (mini-pelle, chargeur...)", d: "En Suisse, les permis conditionnent directement l'employabilité sur chantier." },
              { n:"04", q: "CDI, CDD saison, ou renfort temporaire ?", d: "Un saisonnier mars–octobre a un profil différent d'un conducteur de travaux en CDI." },
              { n:"05", q: "Zone d'intervention : quel(s) canton(s) ?", d: "On évite les candidats qui refuseront le poste pour 30 minutes de trajet supplémentaires." },
              { n:"06", q: "Taille de l'équipe à gérer ? Apprentis inclus ?", d: "Manager 2 ouvriers vs 8 + 3 apprentis = compétences et expériences très différentes." },
              { n:"07", q: "Types de chantiers : privé, collectivités, grands comptes ?", d: "La relation client, les délais et les exigences ne sont pas les mêmes selon le donneur d'ordre." },
              { n:"08", q: "Disponibilité et préavis réel ?", d: "En paysagisme, un départ en cours de saison peut bloquer un chantier entier. On le vérifie." },
            ].map(({ n, q, d }, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, padding: "16px 18px",
                background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14,
                transition: "all .25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(74,222,128,.25)"; e.currentTarget.style.background = "rgba(22,163,74,.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; }}
              >
                <div style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 9, background: "rgba(22,163,74,.12)", border: "1px solid rgba(74,222,128,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: C.greenL, fontWeight: 800, fontSize: ".78rem", fontFamily: "'Sora',sans-serif" }}>{n}</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 700, fontSize: ".88rem", marginBottom: 5 }}>{q}</div>
                  <div style={{ color: C.muted, fontSize: ".78rem", lineHeight: 1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MÉTIERS ═══ */}
      <section id="métiers" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: C.earthL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Nos spécialités</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, color: C.text }}>
            Tous les métiers du <EarthText>paysage et de l'aménagement</EarthText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: 14 }}>
          {[
            { icon: Leaf,      label: "Jardinier-paysagiste",   lvl: "CFC / AFP" },
            { icon: Hammer,    label: "Maçon paysagiste",        lvl: "CFC / expérience" },
            { icon: TreePine,  label: "Arboriste-grimpeur",      lvl: "Certifié ISA/ECC" },
            { icon: Droplets,  label: "Technicien irrigation",   lvl: "Spécialiste" },
            { icon: Mountain,  label: "Chef de chantier",        lvl: "3-5 ans expérience" },
            { icon: Building2, label: "Conducteur de travaux",   lvl: "Senior" },
            { icon: Sun,       label: "Dessinateur-projeteur",   lvl: "AutoCAD / Land F/X" },
            { icon: Award,     label: "Directeur technique",     lvl: "C-level / Direction" },
          ].map(({ icon: Icon, label, lvl }, i) => (
            <div key={i} style={{
              background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14,
              padding: "18px 16px", textAlign: "center", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(74,222,128,.3)"; e.currentTarget.style.background = "rgba(22,163,74,.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Icon size={22} style={{ color: C.greenL, marginBottom: 10 }} strokeWidth={1.5} />
              <div style={{ color: C.text, fontWeight: 700, fontSize: ".84rem", marginBottom: 5 }}>{label}</div>
              <div style={{ color: C.subtle, fontSize: ".7rem", background: "rgba(74,222,128,.06)", padding: "3px 8px", borderRadius: 5, display: "inline-block" }}>{lvl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES ═══ */}
      <section style={{ padding: isMobile ? "48px 1.2rem" : "72px 2rem", background: "rgba(10,20,12,.3)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { q: "On cherchait un chef de chantier depuis 4 mois. TalentFlux nous a envoyé trois profils en 5 jours. Celui qu'on a engagé est encore avec nous deux saisons plus tard.", a: "Directeur, entreprise paysagiste Vaud" },
            { q: "Pour la première fois, j'ai reçu des CVs de gens qui avaient vraiment tenu un taille-haie et géré une équipe. Pas des candidats reconvertis qui découvrent le secteur.", a: "Gérant, jardinerie & aménagements Genève" },
            { q: "Leur connaissance du secteur nous a surpris. Ils savent ce que c'est qu'un arboriste certifié ISA vs un grimpeur généraliste. On ne perd plus de temps à réexpliquer.", a: "DRH, groupe paysage Suisse romande" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 18, padding: 24 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 13 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill="#CA8A04" color="#CA8A04" />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", marginBottom: 13, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: C.subtle, fontSize: ".75rem", fontWeight: 600 }}>— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.mint, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Vos questions</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Tout ce que vous voulez savoir<br /><GradientText>avant de nous appeler</GradientText>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqData.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", background: "rgba(10,20,12,.4)", borderTop: `1px solid ${C.border}`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(22,163,74,.06),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.mint, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text, marginBottom: 10 }}>
              Prêt à constituer<br /><GradientText>votre équipe terrain ?</GradientText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".92rem", lineHeight: 1.7 }}>Aucun frais avant l'embauche. Satisfaction garantie. Premier profil sous 72h.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 22 }}>
            {/* FORMULAIRE */}
            <div style={{ background: "rgba(8,15,10,.95)", border: `1px solid ${C.border}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {[
                  { key: "recruiter", label: "🏢 Je recrute" },
                  { key: "candidate", label: "🌿 Je suis candidat" },
                ].map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{
                    flex: 1, padding: "15px", border: "none", cursor: "pointer",
                    background: activeTab === key ? "linear-gradient(135deg,rgba(22,163,74,.15),rgba(74,222,128,.08))" : "transparent",
                    borderBottom: `2px solid ${activeTab === key ? C.greenL : "transparent"}`,
                    color: activeTab === key ? C.text : C.subtle,
                    fontWeight: 700, fontSize: ".84rem", transition: "all .25s", fontFamily: "'DM Sans',sans-serif",
                  }}>{label}</button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                    <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                    <InputField label="Email" type="email" placeholder="sophie@paysage.ch" value={form.email} onChange={set("email")} required />
                    <InputField label="Téléphone" type="tel" placeholder="+41 76 592 88 06" value={form.phone} onChange={set("phone")} />
                    {activeTab === "recruiter"
                      ? <>
                          <InputField label="Entreprise" placeholder="Paysage Vaud SA" value={form.company} onChange={set("company")} required />
                          <InputField label="Profil recherché" placeholder="Chef de chantier paysagiste CFC" value={form.role} onChange={set("role")} />
                          <SelectField label="Type de contrat" value={form.contrat || ""} onChange={set("contrat")} options={[
                            {value:"", label:"Indifférent"},
                            {value:"CDI", label:"CDI — poste fixe"},
                            {value:"CDD saison", label:"CDD saisonnier (mars–oct.)"},
                            {value:"Temporaire", label:"Renfort temporaire"},
                          ]} />
                          <SelectField label="Zone d'intervention" value={form.zone || ""} onChange={set("zone")} options={[
                            {value:"", label:"Indifférent"},
                            {value:"Vaud", label:"Canton de Vaud"},
                            {value:"Genève", label:"Canton de Genève"},
                            {value:"Fribourg", label:"Canton de Fribourg"},
                            {value:"Valais", label:"Canton du Valais"},
                            {value:"Suisse romande", label:"Suisse romande"},
                          ]} />
                        </>
                      : <>
                          <InputField label="Poste actuel" placeholder="Maçon paysagiste CFC" value={form.role} onChange={set("role")} />
                          <SelectField label="Spécialité" value={form.sector} onChange={set("sector")} options={[
                            { value: "paysagisme", label: "🌱 Paysagisme / Jardins" },
                            { value: "amenagement", label: "🏗️ Aménagements extérieurs" },
                            { value: "arboriculture", label: "🌳 Arboriculture / Élagage" },
                            { value: "terrain-sport", label: "⚽ Terrains de sport" },
                            { value: "espaces-publics", label: "🏛️ Espaces publics" },
                            { value: "irrigation", label: "💧 Irrigation / Arrosage" },
                          ]} />
                          <SelectField label="Permis de conduire" value={form.permis || ""} onChange={set("permis")} options={[
                            {value:"", label:"Sélectionner"},
                            {value:"B", label:"Permis B"},
                            {value:"BE", label:"Permis B+E (remorque)"},
                            {value:"C", label:"Permis C (camion)"},
                            {value:"Engins", label:"Permis engins (mini-pelle...)"},
                          ]} />
                          <SelectField label="Disponibilité" value={form.dispo || ""} onChange={set("dispo")} options={[
                            {value:"", label:"Sélectionner"},
                            {value:"Immédiate", label:"Immédiate"},
                            {value:"1 mois", label:"Sous 1 mois"},
                            {value:"2-3 mois", label:"2 à 3 mois"},
                            {value:"Saison prochaine", label:"Saison prochaine"},
                          ]} />
                        </>
                    }
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab === "recruiter" ? "Description du besoin" : "Parlez-nous de vous"}
                    </label>
                    <textarea
                      placeholder={activeTab === "recruiter" ? "Ex: Chef de chantier CFC pour chantiers privés + collectivités, équipe de 4, permis B+E requis, disponible mai, Vaud/Genève..." : "Ex: Maçon paysagiste CFC, 8 ans exp., permis B+E, conduite mini-pelle, dispo immédiate, canton Vaud..."}
                      value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(5,12,7,0.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = "rgba(74,222,128,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(74,222,128,.06)"; }}
                      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Upload CV / JD */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab === "recruiter" ? "Fiche de poste" : "CV"} <span style={{ color: C.subtle, fontWeight: 400, marginLeft: 6, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        style={{ border: dragOver ? `2px dashed ${C.greenL}` : `2px dashed ${C.border}`, borderRadius: 11, padding: 16, textAlign: "center", cursor: "pointer", transition: "all .25s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(74,222,128,.4)"}
                        onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = C.border; }}
                      >
                        <Upload size={19} style={{ color: C.subtle, margin: "0 auto 7px" }} />
                        <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.greenL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(34,197,94,.06)", border: `1px solid rgba(74,222,128,.2)` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <FileText size={16} style={{ color: C.greenL }} />
                          <div>
                            <p style={{ color: C.text, fontWeight: 600, fontSize: ".84rem" }}>{form.file.name}</p>
                            <p style={{ color: C.subtle, fontSize: ".7rem" }}>{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => setForm(f => ({ ...f, file: null }))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "4px 6px", cursor: "pointer", color: "#EF4444" }}><X size={13} /></button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12, padding: "10px 13px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)" }}>
                      <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
                      <span style={{ color: "#FCA5A5", fontSize: ".83rem" }}>{error}</span>
                    </div>
                  )}

                  <button onClick={handleSubmit} disabled={loading} style={{
                    width: "100%", padding: "14px 22px", borderRadius: 13, border: "none",
                    background: loading ? "rgba(22,163,74,.4)" : C.grad,
                    color: "#fff", fontWeight: 700, fontSize: ".92rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    boxShadow: loading ? "none" : "0 4px 22px rgba(34,197,94,.3)",
                    transition: "all .3s", fontFamily: "'DM Sans',sans-serif",
                  }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = "0 8px 36px rgba(34,197,94,.55)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(34,197,94,.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {loading
                      ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</>
                      : <><Send size={16} />{activeTab === "recruiter" ? "Trouver mon profil paysagiste" : "Envoyer ma candidature"}</>
                    }
                  </button>
                  <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Données sécurisées · RGPD conforme</p>
                </div>
              ) : (
                <div style={{ padding: "52px 26px", textAlign: "center" }}>
                  <div style={{ fontSize: 44, marginBottom: 16 }}>🌿</div>
                  <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.2rem", marginBottom: 10 }}>Demande reçue <GradientText>✓</GradientText></h3>
                  <p style={{ color: C.muted, marginBottom: 20, lineHeight: 1.7, fontSize: ".9rem" }}>
                    Merci <strong style={{ color: C.text }}>{form.firstName}</strong> !<br />
                    Un consultant TalentFlux vous répond sous <strong style={{ color: C.greenL }}>24h</strong>.
                  </p>
                  <button onClick={resetForm} style={{ padding: "10px 24px", borderRadius: 11, border: `1px solid rgba(74,222,128,.3)`, background: "rgba(74,222,128,.07)", color: C.greenL, fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>
                    Nouvelle demande
                  </button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ background: "rgba(8,15,10,.95)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".88rem", marginBottom: 15, color: C.text }}>Nous contacter</h3>
                {[
                  { icon: Mail,  label: "Email",    value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
                  { icon: Phone, label: "Tél.",     value: "+41 76 592 88 06",   href: "tel:+41765928806" },
                  { icon: MapPin,label: "Adresse",  value: "Yverdon-les-Bains, VD", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "rgba(22,163,74,.1)", border: `1px solid rgba(74,222,128,.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={12} style={{ color: C.greenL }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      {href ? <a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none" }}>{value}</a> : <span style={{ color: "#CBD5E1", fontSize: ".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg,rgba(22,163,74,.1),rgba(74,222,128,.05))", border: `1px solid rgba(74,222,128,.2)`, borderRadius: 20, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                  <Clock size={13} style={{ color: C.mint }} />
                  <span style={{ color: C.text, fontWeight: 700, fontSize: ".85rem" }}>Délais</span>
                </div>
                {[["Accusé de réception", "< 2h"], ["Premier brief", "< 24h"], ["Premiers profils", "< 72h"]].map(([l, d]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,.04)` }}>
                    <span style={{ color: C.muted, fontSize: ".78rem" }}>{l}</span>
                    <span style={{ color: C.mint, fontSize: ".73rem", fontWeight: 700, background: "rgba(74,222,128,.1)", padding: "2px 8px", borderRadius: 5 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(8,15,10,.9)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 18 }}>
                {[["✓", "Aucun frais avant embauche"], ["✓", "Garantie remplacement 3 mois"], ["✓", "Profils vérifiés terrain"], ["✓", "Spécialistes secteur paysage"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 9, padding: "6px 0", alignItems: "center" }}>
                    <span style={{ color: C.mint, fontWeight: 700, fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ color: C.muted, fontSize: ".8rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src="/logo.png" alt="TalentFlux" style={{ height: 30, objectFit: "contain" }} />
            <span style={{ color: C.subtle, fontSize: ".7rem" }}>· Paysagisme · Yverdon-les-Bains, VD</span>
          </div>
          <p style={{ color: C.subtle, fontSize: ".72rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display: isMobile ? "none" : "flex", gap: 16 }}>
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
