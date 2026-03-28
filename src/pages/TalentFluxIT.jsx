import { useState, useEffect, useRef } from "react";
import {
  Clock, Users, ShieldAlert, Code2, Cpu, Network,
  ArrowRight, CheckCircle, Zap, ChevronDown, Star,
  Terminal, GitBranch, Layers, Send, Phone, Mail,
  MapPin, Upload, X, FileText, AlertCircle, Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

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
    background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 45%, #06B6D4 75%, #14B8A6 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const GlowButton = ({ children, primary = true, onClick }) => (
  <button onClick={onClick}
    style={primary ? {
      background: "linear-gradient(135deg, #2563EB, #0EA5E9, #14B8A6)",
      boxShadow: "0 0 30px rgba(14,165,233,0.45), 0 0 60px rgba(20,184,166,0.2)",
      border: "none", transition: "all 0.3s ease", color: "#fff",
      padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: ".95rem",
      cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
      fontFamily: "'DM Sans', sans-serif",
    } : {
      background: "transparent", border: "1.5px solid rgba(14,165,233,0.5)",
      color: "#0EA5E9", transition: "all 0.3s ease",
      padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: ".95rem",
      cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
      fontFamily: "'DM Sans', sans-serif",
    }}
    onMouseEnter={e => {
      if (primary) { e.currentTarget.style.boxShadow = "0 0 50px rgba(14,165,233,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }
      else { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }
    }}
    onMouseLeave={e => {
      if (primary) { e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }
      else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }
    }}
  >{children}</button>
);

const ProblemCard = ({ icon: Icon, title, desc, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)",
      borderTop: `2px solid ${color}`, borderRadius: 20,
      transition: `all 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      padding: 28,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px ${color}22`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ color, marginBottom: 20 }}><Icon size={32} strokeWidth={1.5} /></div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: 12 }}>{title}</h3>
      <p style={{ color: "#94A3B8", lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
    </div>
  );
};

const BentoCard = ({ icon: Icon, title, subtitle, desc, large, delay, accent }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(20,184,166,0.08))" : "rgba(15,23,42,0.9)",
        border: hovered ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 0 40px rgba(14,165,233,0.15)" : "none",
        transition: `all 0.5s ease ${delay}ms`,
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)",
        gridColumn: large ? "span 2" : "span 1",
        borderRadius: 20, padding: 32, position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${accent}20, transparent 70%)`, opacity: hovered ? 1 : 0.4 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 20, display: "inline-flex", padding: 12, borderRadius: 12, background: `${accent}18` }}>
          <Icon size={26} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 8, color: accent }}>{subtitle}</div>
        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: 10 }}>{title}</h3>
        <p style={{ color: "#94A3B8", lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
      </div>
    </div>
  );
};

const StatItem = ({ value, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ transition: `all 0.6s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", textAlign: "center" }}>
      <div style={{ fontSize: "2.4rem", fontWeight: 900, fontFamily: "'Sora', sans-serif", marginBottom: 4 }}><GradientText>{value}</GradientText></div>
      <div style={{ color: "#64748B", fontSize: ".8rem" }}>{label}</div>
    </div>
  );
};

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: "#64748B", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
      {label} {required && <span style={{ color: "#0EA5E9" }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: "#fff", fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans', sans-serif" }}
      onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: "block", color: "#64748B", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
    <select value={value} onChange={onChange}
      style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: value ? "#fff" : "#475569", fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#0F172A" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── FAQ Accordion ──────────────────────────────────────────
const faqData = [
  {
    icon: Terminal, color: "#2563EB", bg: "rgba(37,99,235,0.12)", border: "rgba(37,99,235,0.25)",
    hint: "La preuve technique",
    question: "Comment savez-vous qu'il est bon ?",
    answer: "Chaque candidat que nous vous présentons a été évalué en live par ses pairs — des ingénieurs seniors qui l'ont vu coder en temps réel, pas lire un CV. Pas de QCM automatisé, pas de test asynchrone qu'on peut Google. Une session de pair-programming de 90 minutes sur un vrai problème métier.",
    highlight: "On le fait tester par ses pairs",
    highlightColor: "#60A5FA", highlightBg: "rgba(37,99,235,0.08)", highlightBorder: "rgba(37,99,235,0.2)",
  },
  {
    icon: Clock, color: "#0EA5E9", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.25)",
    hint: "La vitesse",
    question: "Quand est-ce que j'ai mon dev ?",
    answer: "Après votre brief de 30 minutes, notre réseau est activé dans la journée. Nous puisons dans notre vivier de 500+ profils pré-validés — pas besoin de recommencer le sourcing de zéro. La majorité de nos clients reçoivent leur première sélection de 2 à 3 profils qualifiés sous 48 à 72 heures.",
    highlight: "48h–72h après votre brief",
    highlightColor: "#38BDF8", highlightBg: "rgba(14,165,233,0.08)", highlightBorder: "rgba(14,165,233,0.2)",
  },
  {
    icon: Zap, color: "#14B8A6", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.25)",
    hint: "Le risque financier",
    question: "Combien ça coûte ?",
    answer: "Rien. Pas un franc jusqu'à la signature du contrat de travail de votre futur collaborateur. Zéro frais de dossier, zéro abonnement, zéro engagement de votre côté. Notre honoraire est un pourcentage du salaire annuel brut, facturé uniquement après l'embauche définitive.",
    highlight: "Au succès uniquement",
    highlightColor: "#2DD4BF", highlightBg: "rgba(20,184,166,0.08)", highlightBorder: "rgba(20,184,166,0.2)",
  },
  {
    icon: Shield, color: "#818CF8", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.25)",
    hint: "La garantie",
    question: "Et s'il part après un mois ?",
    answer: "Ça n'est jamais arrivé. Mais si c'est le cas dans les 3 mois suivant l'embauche, pour quelque raison que ce soit — départ volontaire, licenciement, incompatibilité — nous relançons le processus entièrement à nos frais. Pas de négociation, pas de conditions cachées.",
    highlight: "Remplacement gratuit sous 3 mois",
    highlightColor: "#A5B4FC", highlightBg: "rgba(99,102,241,0.08)", highlightBorder: "rgba(99,102,241,0.2)",
  },
];

const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.85)",
      border: open ? "1px solid rgba(14,165,233,0.35)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 18, overflow: "hidden",
      boxShadow: open ? "0 0 32px rgba(14,165,233,0.08)" : "none",
      transition: `all .3s ease ${index * 80}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "22px 26px", background: "none", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: item.bg, border: `1px solid ${item.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={20} style={{ color: item.color }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Sora', sans-serif" }}>{item.question}</div>
            <div style={{ color: "#475569", fontSize: ".78rem", marginTop: 3, fontWeight: 500 }}>{item.hint}</div>
          </div>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: open ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all .3s",
        }}>
          <ChevronDown size={14} style={{ color: open ? "#0EA5E9" : "#94A3B8" }} />
        </div>
      </button>

      <div style={{
        maxHeight: open ? 300 : 0, overflow: "hidden",
        transition: "max-height .4s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ padding: "0 26px 24px 84px" }}>
          <p style={{ color: "#94A3B8", lineHeight: 1.8, fontSize: ".9rem" }}>{item.answer}</p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14,
            padding: "10px 16px", borderRadius: 10, fontWeight: 700, fontSize: ".85rem",
            background: item.highlightBg, border: `1px solid ${item.highlightBorder}`,
            color: item.highlightColor,
          }}>
            <CheckCircle size={14} style={{ color: item.highlightColor }} />
            {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TalentFluxIT() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", sector: "it", role: "", message: "", file: null });
  const [, statsInView] = useInView(0.2);

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

  const handleSubmit = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    setLoading(true);
    try {
      let pdfFileName = null, pdfFileUrl = null;
      if (form.file) {
        const fileName = `${Date.now()}_${form.firstName}_${form.lastName}.pdf`;
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

  const sectors = [
    { value: "it", label: "💻 IT & Technologie" }, { value: "finance", label: "💰 Finance" },
    { value: "sante", label: "🏥 Santé" }, { value: "ingenierie", label: "⚙️ Ingénierie" },
    { value: "rh", label: "👥 RH & Management" },
  ];

  return (
    <div style={{ background: "#0B0F1A", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(14,165,233,0.3); color: #fff; }
        input::placeholder, textarea::placeholder { color: #334155; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:.5}50%{opacity:1} }
        @keyframes slide-in-up { from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .grid-pattern {
          background-image: linear-gradient(rgba(37,99,235,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 70,
        background: scrolled ? "rgba(11,15,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#2563EB,#06B6D4,#14B8A6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>TALENT<GradientText>FLUX</GradientText></span>
          <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".12em", color: "#0EA5E9", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.3)", borderRadius: 4, padding: "2px 7px", marginLeft: 4 }}>IT</span>
        </div>
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {["Solution","FAQ","Contact"].map(item => (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color: "#94A3B8", fontSize: ".88rem", cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#94A3B8"}
            >{item}</span>
          ))}
          <GlowButton onClick={() => scrollTo("contact")}>Recruter <ArrowRight size={16} /></GlowButton>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-pattern" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 2rem 80px" }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.12),transparent 70%)", animation: "pulse-glow 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(20,184,166,.1),transparent 70%)", animation: "pulse-glow 5s ease-in-out infinite 1s", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.25)", borderRadius: 100, padding: "6px 18px", marginBottom: 40, animation: "slide-in-up .6s ease both" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#14B8A6", boxShadow: "0 0 8px #14B8A6" }} />
            <span style={{ color: "#94A3B8", fontSize: ".82rem", fontWeight: 500 }}>Placement IT · Suisse · &lt; 48h</span>
          </div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 28, letterSpacing: "-.02em", animation: "slide-in-up .7s ease .1s both" }}>
            Le talent IT n'est pas rare.<br /><GradientText>C'est votre filtre qui est obsolète.</GradientText>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "clamp(1rem,2vw,1.15rem)", lineHeight: 1.8, maxWidth: 650, margin: "0 auto 48px", animation: "slide-in-up .7s ease .2s both" }}>
            Arrêtez de trier des CV. Accédez à un flux continu de développeurs et d'experts tech <strong style={{ color: "#CBD5E1" }}>validés techniquement en moins de 48h.</strong>
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "slide-in-up .7s ease .3s both" }}>
            <GlowButton onClick={() => scrollTo("contact")}>Recruter un Expert <ArrowRight size={16} /></GlowButton>
            <GlowButton primary={false} onClick={() => scrollTo("contact")}>Rejoindre le Flux</GlowButton>
          </div>
          <div style={{ marginTop: 64, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap", animation: "slide-in-up .7s ease .45s both" }}>
            {["Google","Swisscom","EPFL","Nestlé Digital","UBS Tech"].map((c,i) => (
              <span key={i} style={{ color: "#475569", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>{c}</span>
            ))}
          </div>
          <div className="animate-float" style={{ marginTop: 56, cursor: "pointer", opacity: .4 }} onClick={() => scrollTo("solution")}>
            <ChevronDown size={24} color="#94A3B8" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: "rgba(15,23,42,.6)", borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "40px 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          <StatItem value="48h" label="Délai moyen de placement" delay={0} />
          <StatItem value="93%" label="Taux de satisfaction" delay={100} />
          <StatItem value="70%" label="Talents hors LinkedIn" delay={200} />
          <StatItem value="500+" label="Experts validés" delay={300} />
        </div>
      </div>

      {/* PROBLÈME */}
      <section style={{ padding: "100px 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: "#EF4444", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le coût de l'erreur</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.2 }}>
            Chaque mauvais recrutement vous coûte<br /><GradientText>en moyenne 30 000 CHF.</GradientText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          <ProblemCard icon={Clock} title="Time-to-hire trop long" desc="Vos équipes attendent 3 à 6 mois pour un profil senior. Pendant ce temps, vos sprints dérivent et vos concurrents recrutent." color="#F97316" delay={0} />
          <ProblemCard icon={Users} title="Culture-fit raté" desc="Le CV est parfait. L'intégration est catastrophique. Sans évaluation comportementale, vous recrutez une compétence, pas un collaborateur." color="#EF4444" delay={100} />
          <ProblemCard icon={ShieldAlert} title="Fake-experts démasqués trop tard" desc="Ils connaissent le jargon, pas le code. Sans test technique live, vous découvrez la vérité après 3 mois de mission." color="#DC2626" delay={200} />
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding: "100px 2rem", background: "rgba(15,23,42,.4)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: "#0EA5E9", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ La Solution TalentFlux</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.2 }}>
              La <GradientText>Stack Talent Flux</GradientText><br />appliquée au recrutement IT
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            <BentoCard icon={Terminal} subtitle="Méthode #1" title="Évaluation Live-Coding" desc="On ne croit que ce qu'on voit. Chaque candidat passe un entretien technique live avec nos ingénieurs seniors. Du vrai pair-programming, zéro triche." large={false} delay={0} accent="#2563EB" />
            <BentoCard icon={Cpu} subtitle="Méthode #2" title="Matching Algorithmique" desc="La précision du code appliquée aux RH. Notre système analyse 40+ critères — stack technique, culture, timezone — pour un fit à 94%." large={false} delay={100} accent="#0EA5E9" />
            <BentoCard icon={Network} subtitle="Méthode #3" title="Réseau Invisible" desc="Accès aux 70% de talents qui ne cherchent pas activement. Ils ne sont pas sur LinkedIn. Ils sont dans notre réseau exclusif cultivé depuis 5 ans." large={true} delay={200} accent="#14B8A6" />
          </div>
          {/* Process timeline */}
          <div style={{ marginTop: 56, padding: 44, background: "rgba(11,15,26,.8)", borderRadius: 24, border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ color: "#94A3B8", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>Le processus en 4 étapes</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { n:"01", t:"Brief", d:"30 min pour comprendre vos besoins", icon: GitBranch },
                { n:"02", t:"Sourcing", d:"Activation du réseau sous 24h", icon: Network },
                { n:"03", t:"Validation", d:"Live-coding + culture-fit", icon: Code2 },
                { n:"04", t:"Intégration", d:"Suivi 3 mois post-embauche", icon: CheckCircle },
              ].map(({ n, t, d, icon: Icon }, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", margin: "0 auto 14px", background: "linear-gradient(135deg,rgba(37,99,235,.2),rgba(20,184,166,.2))", border: "1px solid rgba(14,165,233,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                  </div>
                  <div style={{ color: "#475569", fontSize: ".7rem", fontWeight: 700, marginBottom: 4 }}>{n}</div>
                  <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6, fontSize: ".95rem" }}>{t}</div>
                  <div style={{ color: "#64748B", fontSize: ".78rem", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { q: "On avait cherché 4 mois sans résultat. TalentFlux nous a envoyé 3 profils qualifiés en 36h. L'un d'eux est encore chez nous, 2 ans plus tard.", a: "CTO, Fintech Genève" },
              { q: "Le live-coding m'a bluffé. On voyait enfin la réalité du niveau technique, pas la mise en scène des entretiens classiques.", a: "Head of Engineering, Scale-up Lausanne" },
              { q: "Leur réseau invisible, c'est réel. Le profil qu'on a embauché ne cherchait pas. TalentFlux l'a approché et convaincu. Impossible à faire seul.", a: "VP Tech, SaaS Zurich" },
            ].map(({ q, a }, i) => (
              <div key={i} style={{ background: "rgba(15,23,42,.8)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: 28 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array(5).fill(0).map((_,j) => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".88rem", marginBottom: 16, fontStyle: "italic" }}>"{q}"</p>
                <p style={{ color: "#475569", fontSize: ".78rem", fontWeight: 600 }}>— {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ padding: "100px 2rem", background: "rgba(15,23,42,.3)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#0EA5E9", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Vos questions, nos réponses</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 14 }}>
              Tout ce que vous voulez savoir<br /><GradientText>avant de nous appeler</GradientText>
            </h2>
            <p style={{ color: "#94A3B8", fontSize: ".92rem", lineHeight: 1.7 }}>Les 4 objections qu'on entend chaque semaine — répondues sans détour.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqData.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding: "100px 2rem", position: "relative", background: "rgba(15,23,42,.4)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(37,99,235,.08),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#14B8A6", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 16 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 14 }}>
              Prêt à scaler votre<br /><GradientText>équipe technique ?</GradientText>
            </h2>
            <p style={{ color: "#94A3B8", fontSize: ".95rem", lineHeight: 1.7 }}>Aucun frais avant l'embauche. Satisfaction garantie. Premier brief sous 24h.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
            {/* FORM */}
            <div style={{ background: "rgba(11,15,26,.9)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(37,99,235,.07)" }}>
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                {[{ key:"recruiter", label:"🏢 Je recrute" },{ key:"candidate", label:"👤 Je cherche un poste" }].map(({ key, label }) => (
                  <button key={key} onClick={() => { setActiveTab(key); setError(null); }}
                    style={{ flex: 1, padding: "17px", border: "none", cursor: "pointer", background: activeTab===key?"linear-gradient(135deg,rgba(37,99,235,.15),rgba(20,184,166,.1))":"transparent", color: activeTab===key?"#fff":"#475569", fontWeight: 700, fontSize: ".88rem", borderBottom: activeTab===key?"2px solid #0EA5E9":"2px solid transparent", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>
                    {label}
                  </button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding: 28 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                    <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                    <InputField label="Email" type="email" placeholder="sophie@acme.com" value={form.email} onChange={set("email")} required />
                    <InputField label="Téléphone" type="tel" placeholder="+41 79 000 00 00" value={form.phone} onChange={set("phone")} />
                    {activeTab==="recruiter" ? (
                      <><InputField label="Entreprise" placeholder="Acme Corp SA" value={form.company} onChange={set("company")} required /><SelectField label="Secteur" value={form.sector} onChange={set("sector")} options={sectors} /></>
                    ) : (
                      <><InputField label="Poste actuel" placeholder="Lead Developer" value={form.role} onChange={set("role")} /><SelectField label="Secteur visé" value={form.sector} onChange={set("sector")} options={sectors} /></>
                    )}
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", color: "#64748B", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
                      {activeTab==="recruiter"?"Décrivez le poste":"Parlez-nous de vous"}
                    </label>
                    <textarea placeholder={activeTab==="recruiter"?"Stack, niveau, urgence...":"Profil, attentes, disponibilité..."} value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: "rgba(11,15,26,.8)", border: "1px solid rgba(255,255,255,.09)", color: "#fff", fontSize: ".88rem", outline: "none", resize: "vertical", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e=>{e.target.style.borderColor="rgba(14,165,233,.6)";e.target.style.boxShadow="0 0 0 3px rgba(14,165,233,.08)"}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,.09)";e.target.style.boxShadow="none"}}
                    />
                  </div>
                  {/* PDF Upload */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", color: "#64748B", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
                      {activeTab==="recruiter"?"Job Description":"CV"}
                      <span style={{ color: "#334155", fontWeight: 400, marginLeft: 8, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)}
                        onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
                        style={{ border: dragOver?"2px dashed #0EA5E9":"2px dashed rgba(255,255,255,.1)", borderRadius: 12, padding: "18px", textAlign: "center", cursor: "pointer", transition: "all .25s", background: dragOver?"rgba(14,165,233,.05)":"rgba(11,15,26,.4)" }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(14,165,233,.4)"}
                        onMouseLeave={e=>{if(!dragOver)e.currentTarget.style.borderColor="rgba(255,255,255,.1)"}}
                      >
                        <Upload size={22} style={{ color: "#334155", margin: "0 auto 8px" }} />
                        <p style={{ color: "#475569", fontSize: ".84rem" }}><span style={{ color: "#0EA5E9", fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e=>handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: "rgba(14,165,233,.07)", border: "1px solid rgba(14,165,233,.25)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <FileText size={18} style={{ color: "#0EA5E9" }} />
                          <div>
                            <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: ".85rem" }}>{form.file.name}</p>
                            <p style={{ color: "#64748B", fontSize: ".72rem" }}>{(form.file.size/1024/1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={()=>setForm(f=>({...f,file:null}))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#EF4444" }}><X size={14}/></button>
                      </div>
                    )}
                  </div>
                  {error && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)" }}>
                      <AlertCircle size={15} style={{ color: "#EF4444", flexShrink: 0 }} />
                      <span style={{ color: "#FCA5A5", fontSize: ".84rem" }}>{error}</span>
                    </div>
                  )}
                  <button onClick={handleSubmit} disabled={loading}
                    style={{ width: "100%", padding: "15px 24px", borderRadius: 14, border: "none", background: loading?"rgba(37,99,235,.4)":"linear-gradient(135deg,#2563EB,#0EA5E9,#14B8A6)", color: "#fff", fontWeight: 700, fontSize: ".95rem", cursor: loading?"not-allowed":"pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: loading?"none":"0 4px 24px rgba(14,165,233,.4)", transition: "all .3s", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e=>{if(!loading){e.currentTarget.style.boxShadow="0 8px 40px rgba(14,165,233,.6)";e.currentTarget.style.transform="translateY(-2px)"}}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 24px rgba(14,165,233,.4)";e.currentTarget.style.transform="translateY(0)"}}
                  >
                    {loading?<><div style={{width:17,height:17,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Envoi...</>:<><Send size={17}/>{activeTab==="recruiter"?"Lancer mon Recrutement IT":"Envoyer mon profil"}</>}
                  </button>
                  <p style={{ color: "#334155", fontSize: ".73rem", textAlign: "center", marginTop: 10 }}>🔒 Données stockées sur Supabase · RGPD conforme</p>
                </div>
              ) : (
                <div style={{ padding: "60px 28px", textAlign: "center" }}>
                  <CheckCircle size={48} style={{ color: "#14B8A6", margin: "0 auto 18px" }} />
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", marginBottom: 10 }}>Demande enregistrée <GradientText>✓</GradientText></h3>
                  <p style={{ color: "#94A3B8", marginBottom: 22, lineHeight: 1.7 }}>Merci <strong style={{ color: "#CBD5E1" }}>{form.firstName}</strong> !<br/>Un expert vous contacte sous <strong style={{ color: "#0EA5E9" }}>24h</strong>.</p>
                  <button onClick={resetForm} style={{ padding: "11px 26px", borderRadius: 12, border: "1px solid rgba(14,165,233,.3)", background: "rgba(14,165,233,.08)", color: "#0EA5E9", fontWeight: 600, cursor: "pointer", fontSize: ".88rem" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(11,15,26,.9)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: 24 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".92rem", marginBottom: 16 }}>Nous contacter</h3>
                {[
                  { icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
                  { icon: Phone, label: "Téléphone", value: "+41 76 592 88 06", href: "tel:+41765928806" },
                  { icon: MapPin, label: "Adresse", value: "Yverdon-les-Bains, Suisse", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: "linear-gradient(135deg,rgba(37,99,235,.15),rgba(20,184,166,.15))", border: "1px solid rgba(14,165,233,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={14} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: "#475569", fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>{label}</div>
                      {href?<a href={href} style={{ color: "#CBD5E1", fontSize: ".83rem", textDecoration: "none", fontWeight: 500 }}>{value}</a>:<span style={{ color: "#CBD5E1", fontSize: ".83rem", fontWeight: 500 }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "linear-gradient(135deg,rgba(37,99,235,.1),rgba(20,184,166,.08))", border: "1px solid rgba(14,165,233,.2)", borderRadius: 22, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Clock size={15} style={{ color: "#14B8A6" }} />
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: ".88rem" }}>Délais de réponse</span>
                </div>
                {[["Accusé de réception","< 2h"],["Premier brief","< 24h"],["Premiers profils","< 48h"]].map(([l,d])=>(
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ color: "#94A3B8", fontSize: ".8rem" }}>{l}</span>
                    <span style={{ color: "#14B8A6", fontSize: ".76rem", fontWeight: 700, background: "rgba(20,184,166,.1)", padding: "2px 8px", borderRadius: 6 }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(11,15,26,.8)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 22, padding: 20 }}>
                {[["✓","Aucun frais avant embauche"],["✓","Satisfaction garantie 3 mois"],["✓","Confidentialité totale"],["✓","500+ experts validés"]].map(([icon,text])=>(
                  <div key={text} style={{ display: "flex", gap: 10, padding: "7px 0", alignItems: "center" }}>
                    <span style={{ color: "#14B8A6", fontWeight: 700 }}>{icon}</span>
                    <span style={{ color: "#94A3B8", fontSize: ".82rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "28px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700 }}>TALENT<GradientText>FLUX</GradientText></span>
            <span style={{ color: "#334155", fontSize: ".72rem" }}>· IT · Yverdon-les-Bains, Suisse</span>
          </div>
          <p style={{ color: "#334155", fontSize: ".75rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display: "flex", gap: 18 }}>
            <Link to="/privacy" style={{ color: "#475569", fontSize: ".75rem", textDecoration: "none" }} onMouseEnter={e=>e.target.style.color="#94A3B8"} onMouseLeave={e=>e.target.style.color="#475569"}>Confidentialité</Link>
            <Link to="/cgu" style={{ color: "#475569", fontSize: ".75rem", textDecoration: "none" }} onMouseEnter={e=>e.target.style.color="#94A3B8"} onMouseLeave={e=>e.target.style.color="#475569"}>CGU</Link>
            <Link to="/contact" style={{ color: "#475569", fontSize: ".75rem", textDecoration: "none" }} onMouseEnter={e=>e.target.style.color="#94A3B8"} onMouseLeave={e=>e.target.style.color="#475569"}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
