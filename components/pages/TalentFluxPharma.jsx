"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  FlaskConical, Microscope, ShieldCheck, FileCheck, Beaker,
  ArrowRight, CheckCircle, ChevronDown, Star, Clock,
  Send, Phone, Mail, Upload, X, FileText,
  AlertCircle, Users, Shield, Award, MapPin, Dna, Activity
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ── Intersection observer hook ──────────────────────────────
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

// ── Design tokens ───────────────────────────────────────────
const C = {
  bg:     "#070408",
  card:   "rgba(18,6,24,0.9)",
  border: "rgba(255,255,255,0.07)",
  text:   "#FAF0FF",
  muted:  "#C49AD4",
  subtle: "#6B3A80",
  rose:   "#E879F9",
  roseD:  "#A21CAF",
  roseL:  "#F0ABFC",
  violet: "#7C3AED",
  teal:   "#2DD4BF",
  gold:   "#D4AF5A",
  grad:   "linear-gradient(135deg, #7C3AED 0%, #C026D3 50%, #E879F9 100%)",
};

const GradientText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #F0ABFC 0%, #E879F9 40%, #C084FC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>
);

// ── Champs du formulaire contact ────────────────────────────
const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
      {label} {required && <span style={{ color: C.rose }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(12,4,20,0.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}
      onFocus={e => { e.target.style.borderColor = "rgba(232,121,249,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,38,211,0.07)"; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
    <select value={value} onChange={onChange}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(12,4,20,0.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => e.target.style.borderColor = "rgba(232,121,249,0.5)"}
      onBlur={e => e.target.style.borderColor = C.border}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#070408" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── FAQ data ────────────────────────────────────────────────
const faqData = [
  { icon: Microscope, color: C.roseL, bg: "rgba(240,171,252,0.1)", border: "rgba(240,171,252,0.2)",
    hint: "La spécialisation", question: "Vous connaissez vraiment le secteur pharma & biotech suisse ?",
    answer: "Notre réseau couvre les profils QA/QC, Affaires Réglementaires, Production GMP, Validation (IQ/OQ/PQ, CSV), Pharmacovigilance et R&D. Nous connaissons Swissmedic, les exigences ICH Q9/Q10, les spécificités des CDMO et des biotech de l'Arc Lémanique.",
    highlight: "Spécialistes pharma suisse", hC: C.roseL, hBg: "rgba(240,171,252,.08)", hBo: "rgba(240,171,252,.2)" },
  { icon: Clock, color: C.rose, bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.2)",
    hint: "La réactivité", question: "Ces profils réglementaires sont rares — comment vous sourcez ?",
    answer: "Notre vivier est constitué en permanence, pas à la demande. Responsables QA, experts AR, ingénieurs validation et pharmacovigilants sont dans notre base avant votre besoin. Pour un profil Responsible Person ou Head of QA, délai moyen : 6-10 jours.",
    highlight: "6-10 jours pour profils RP / Head QA", hC: C.rose, hBg: "rgba(232,121,249,.08)", hBo: "rgba(232,121,249,.2)" },
  { icon: Shield, color: C.gold, bg: "rgba(212,175,90,0.1)", border: "rgba(212,175,90,0.2)",
    hint: "La garantie", question: "Et si le profil ne convient pas après l'embauche ?",
    answer: "Garantie de remplacement 3 mois. Si le candidat quitte le poste ou ne satisfait pas dans les 3 premiers mois, nous relançons le processus entièrement à nos frais. Sans négociation.",
    highlight: "Remplacement garanti 3 mois", hC: C.gold, hBg: "rgba(212,175,90,.08)", hBo: "rgba(212,175,90,.2)" },
  { icon: Award, color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)",
    hint: "La vérification", question: "Comment vérifiez-vous les connaissances GMP et réglementaires ?",
    answer: "Nous posons des questions techniques précises : maîtrise de l'ICH Q9 (gestion des risques qualité), expérience des inspections Swissmedic / FDA, connaissance des Annex 1, 11 et 21 CFR Part 11. Un QA qui n'a jamais piloté un CAPA d'envergure n'est pas Senior.",
    highlight: "Validation technique avant présentation", hC: "#A78BFA", hBg: "rgba(167,139,250,.08)", hBo: "rgba(167,139,250,.2)" },
];

// ── Composants extraits pour éviter hooks dans .map() ──────
const FAQItem = ({ item, idx }) => {
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{ background: "rgba(18,6,24,0.9)", border: open ? `1px solid rgba(232,121,249,.3)` : `1px solid ${C.border}`, borderRadius: 18, overflow: "hidden", boxShadow: open ? "0 0 28px rgba(192,38,211,.07)" : "none", transition: `all .3s ease ${idx * 80}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: item.bg, border: `1px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={17} style={{ color: item.color }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: ".93rem", fontFamily: "'Sora',sans-serif" }}>{item.question}</div>
            <div style={{ color: C.subtle, fontSize: ".74rem", marginTop: 2 }}>{item.hint}</div>
          </div>
        </div>
        <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: open ? "rgba(232,121,249,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "all .3s" }}>
          <ChevronDown size={13} style={{ color: open ? C.roseL : C.muted }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? 280 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ padding: isMobile ? "0 16px 18px" : "0 22px 20px 73px" }}>
          <p style={{ color: C.muted, lineHeight: 1.8, fontSize: ".87rem" }}>{item.answer}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 11, padding: "7px 13px", borderRadius: 9, fontWeight: 700, fontSize: ".8rem", background: item.hBg, border: `1px solid ${item.hBo}`, color: item.hC }}>
            <CheckCircle size={12} style={{ color: item.hC }} /> {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

const PharmaProblemCard = ({ icon: Icon, color, title, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${color}`, borderRadius: 20, padding: 28, transition: `all .6s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px ${color}22`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ color, marginBottom: 18 }}><Icon size={30} strokeWidth={1.5} /></div>
      <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.02rem", marginBottom: 10 }}>{title}</h3>
      <p style={{ color: C.muted, lineHeight: 1.7, fontSize: ".88rem" }}>{desc}</p>
    </div>
  );
};

const PharmaFeatureCard = ({ icon: Icon, accent, sub, title, desc, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? `rgba(192,38,211,.06)` : C.card, border: hov ? `1px solid rgba(232,121,249,.3)` : `1px solid ${C.border}`, borderRadius: 20, padding: 28, transition: `all .5s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)", position: "relative", overflow: "hidden" }}>
      <div style={{ marginBottom: 16, display: "inline-flex", padding: 11, borderRadius: 12, background: `${accent}18` }}>
        <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
      </div>
      <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 7, color: accent }}>{sub}</div>
      <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.02rem", marginBottom: 9 }}>{title}</h3>
      <p style={{ color: C.muted, lineHeight: 1.7, fontSize: ".87rem" }}>{desc}</p>
    </div>
  );
};

// ── Page principale ─────────────────────────────────────────
export default function TalentFluxPharma() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", specialite: "", message: "", file: null });

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
    setError(null); setForm(f => ({ ...f, file }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    setLoading(true);
    try {
      let pdfFileName = null, pdfFileUrl = null;
      if (form.file) {
        const san = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fn = `${Date.now()}_${san(form.firstName)}_${san(form.lastName)}.pdf`;
        const { error: ue } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fn}`, form.file, { contentType: "application/pdf" });
        if (ue) throw new Error("Upload : " + ue.message);
        pdfFileName = fn; pdfFileUrl = `submissions/${fn}`;
      }
      const { error: ie } = await supabase.from("contact_submissions").insert([{
        type: activeTab, first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: "pharma",
        role: form.specialite.trim() || null, message: form.message.trim() || null,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (ie) throw new Error("Erreur : " + ie.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const resetForm = () => { setSubmitted(false); setError(null); setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", specialite: "", message: "", file: null }); };
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(232,121,249,0.25); color:#fff; }
        input::placeholder, textarea::placeholder { color:#3B1A4A; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.3}50%{opacity:.75} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .pharma-grid {
          background-image:
            linear-gradient(rgba(192,38,211,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,38,211,.025) 1px, transparent 1px);
          background-size:52px 52px;
        }
        @media(max-width:768px){ .tf-nav-desktop{display:none!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 66, background: scrolled ? "rgba(7,4,8,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: C.roseL, background: "rgba(192,38,211,.1)", border: `1px solid rgba(232,121,249,.3)`, borderRadius: 4, padding: "2px 7px" }}>PHARMA</span>
        </div>
        {isMobile ? (
          <a href="tel:+41765928806" style={{ background: "rgba(192,38,211,.15)", border: "1px solid rgba(232,121,249,.3)", color: "#E879F9", padding: "7px 14px", borderRadius: 10, fontWeight: 700, fontSize: ".8rem", textDecoration: "none" }}>
            📞 Appeler
          </a>
        ) : (
          <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
            {["Solution", "Métiers", "FAQ"].map(item => (
              <span key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color: C.muted, fontSize: ".85rem", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.text} onMouseLeave={e => e.target.style.color = C.muted}>{item}</span>
            ))}
            <a href="tel:+41765928806" style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 10,
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
              color: "#E879F9", textDecoration: "none",
              fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em",
              transition: "all .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
            >
              📞 +41 76 592 88 06
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
              <Link href="/pharma" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
              <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
              <Link href="/en/pharma" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color="#64748B"}>EN</Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pharma-grid" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.2rem 60px" : "120px 2rem 80px" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.12),transparent 70%)", animation: "pulseGlow 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,38,211,.09),transparent 70%)", animation: "pulseGlow 7s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {!isMobile && (<>
          <div style={{ position: "absolute", left: "3%", top: "40%", background: "rgba(18,6,24,.95)", border: `1px solid rgba(232,121,249,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite", pointerEvents: "none", zIndex: 1, minWidth: 172 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Pénurie CH</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.roseL, boxShadow: `0 0 6px ${C.roseL}`, flexShrink: 0, display: "inline-block" }} /> Profils QA / AR rares
            </div>
          </div>
          <div style={{ position: "absolute", right: "3%", top: "44%", background: "rgba(18,6,24,.95)", border: `1px solid rgba(212,175,90,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite 1.8s", pointerEvents: "none", zIndex: 1, minWidth: 172 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Secteur</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold, boxShadow: `0 0 6px ${C.gold}`, flexShrink: 0, display: "inline-block" }} /> GMP · Swissmedic · Biotech
            </div>
          </div>
        </>)}

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
            {[FlaskConical, Microscope, Dna, Activity].map((Icon, i) => (
              <div key={i} style={{ color: C.rose, opacity: 0.5 + i * 0.12 }}><Icon size={22 + i * 2} strokeWidth={1.5} /></div>
            ))}
          </div>

          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: C.roseL, marginBottom: 16 }}>
            Recrutement · Pharma, Biotech & Life Sciences · Suisse
          </p>

          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-.02em", color: C.text, marginBottom: 22 }}>
            Recrutement Pharma & Life Sciences en Suisse :<br />
            <GradientText>votre Responsible Person répond aux experts, pas aux généralistes.</GradientText>
          </h1>

          <p style={{ color: C.muted, fontSize: ".97rem", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 36px" }}>
            QA Manager, Affaires Réglementaires, Responsable Production GMP, Ingénieur Validation — des profils pris d'assaut par Roche, Novartis et Lonza. TalentFlux les connaît avant qu'ils ne soient sur le marché.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ background: C.grad, border: "none", color: "#fff", padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 0 28px rgba(192,38,211,.35)", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(232,121,249,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(192,38,211,.35)"; }}>
              <Users size={17} /> Trouver mon expert <ArrowRight size={16} />
            </button>
            <Link href="/candidature/pharma" style={{ background: "rgba(192,38,211,.08)", border: "1.5px solid rgba(232,121,249,.4)", color: C.roseL, padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", display: "flex", alignItems: "center", gap: 9, textDecoration: "none", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(192,38,211,.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(192,38,211,.08)"; }}>
              <FlaskConical size={17} /> Déposer ma candidature <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 18 : 32, justifyContent: "center", flexWrap: "wrap", marginTop: 52, paddingTop: 34, borderTop: `1px solid ${C.border}` }}>
            {[{ v: "6-10j", l: "Délai profil RP / Head QA" }, { v: "100%", l: "Au succès" }, { v: "3 mois", l: "Garantie remplacement" }, { v: "CH", l: "Romande & Alémanique" }].map(({ v, l }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 3 }}><GradientText>{v}</GradientText></div>
                <div style={{ color: C.subtle, fontSize: ".75rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, opacity: .3, cursor: "pointer" }} onClick={() => scrollTo("solution")}><ChevronDown size={22} color={C.roseL} /></div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: "#EF4444", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le vrai problème</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            Un QA Manager GMP ou un expert AR<br /><GradientText>ne se recrute pas comme un comptable.</GradientText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { icon: ShieldCheck, color: "#F97316", title: "Expertise réglementaire rare", desc: "Maîtriser l'ICH Q9, l'Annex 1 GMP ou les exigences 21 CFR Part 11 prend des années. Ces profils sont absorbés dès qu'ils sont disponibles — souvent avant de postuler publiquement." },
            { icon: Dna, color: "#EF4444", title: "Compétition avec les Big Pharma", desc: "Roche, Novartis, Lonza, Idorsia. Vos candidats idéaux sont ciblés en permanence par des équipes RH internes avec des packages difficiles à concurrencer sans les bons arguments." },
            { icon: FileCheck, color: "#DC2626", title: "Incompréhension des agences classiques", desc: "La différence entre un Responsible Person, un QP et un Quality Director, ou entre validation IQ/OQ/PQ et CSV, échappe aux recruteurs généralistes. Résultat : des CVs inadaptés et une perte de temps." },
          ].map(({ icon, color, title, desc }, i) => (
            <PharmaProblemCard key={i} icon={icon} color={color} title={title} desc={desc} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* MÉTIERS */}
      <section id="métiers" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", background: "rgba(18,6,24,.3)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.gold, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Nos spécialités</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, color: C.text }}>
              Tous les métiers de <GradientText>l'industrie pharma & biotech suisse</GradientText>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: 14 }}>
            {[
              { icon: ShieldCheck, label: "QA Manager / Director", lvl: "GMP · CAPA · Audits" },
              { icon: FileCheck,   label: "Affaires Réglementaires", lvl: "EMA · Swissmedic · CTD" },
              { icon: Beaker,      label: "QC / Contrôle qualité", lvl: "HPLC · LIMS · OOS" },
              { icon: FlaskConical,label: "Responsable Production", lvl: "Solide · Injectable · Biotech" },
              { icon: Microscope,  label: "Ingénieur Validation", lvl: "IQ/OQ/PQ · CSV · Cleaning" },
              { icon: Activity,    label: "Pharmacovigilance", lvl: "ICSR · RMP · QPPV" },
              { icon: Dna,         label: "R&D / Formulation", lvl: "Préclinique → Phase III" },
              { icon: Shield,      label: "HSE / EHS", lvl: "REACH · CLP · SUVA" },
            ].map(({ icon: Icon, label, lvl }, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,121,249,.3)"; e.currentTarget.style.background = "rgba(192,38,211,.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; e.currentTarget.style.transform = "translateY(0)"; }}>
                <Icon size={22} style={{ color: C.roseL, marginBottom: 10 }} strokeWidth={1.5} />
                <div style={{ color: C.text, fontWeight: 700, fontSize: ".84rem", marginBottom: 5 }}>{label}</div>
                <div style={{ color: C.subtle, fontSize: ".7rem", background: "rgba(192,38,211,.06)", padding: "3px 8px", borderRadius: 5, display: "inline-block" }}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: C.roseL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Notre approche</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            On distingue un QP d'un RP.<br /><GradientText>On valide l'Annex 1 avant vous.</GradientText>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
          <PharmaFeatureCard icon={ShieldCheck} accent={C.rose} sub="Vérification #1" title="Compétences GMP testées" desc="Maîtrise réelle des BPF, connaissance de l'ICH Q9/Q10, expérience des inspections Swissmedic et FDA, gestion des CAPA. On distingue ceux qui le vivent de ceux qui l'ont lu." delay={0} />
          <PharmaFeatureCard icon={FileCheck} accent={C.teal} sub="Vérification #2" title="Dossiers réglementaires vérifiés" desc="CTD, dossiers Swissmedic, soumissions EMA. Nos candidats AR ont des dossiers approuvés à leur actif — pas seulement une ligne sur un CV." delay={100} />
          <PharmaFeatureCard icon={Dna} accent={C.gold} sub="Vérification #3" title="Réseau Arc Lémanique & Mittelland" desc="Roche, Novartis, Lonza, Bachem, Idorsia, Galderma. Notre réseau couvre le bassin pharma suisse. Profils locaux avec culture Swissmedic." delay={200} />
        </div>

        <div style={{ padding: isMobile ? 24 : 38, background: "rgba(12,4,20,.8)", borderRadius: 22, border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 26, textAlign: "center" }}>Le processus en 4 étapes</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 20 : 14 }}>
            {[
              { n: "01", t: "Brief", d: "30 min pour cerner le profil, le niveau GMP requis et le contexte réglementaire", icon: FlaskConical },
              { n: "02", t: "Sourcing", d: "Activation réseau sous 24h — vivier pharma suisse déjà constitué", icon: Microscope },
              { n: "03", t: "Validation", d: "Compétences GMP / AR vérifiées + entretien technique avant présentation", icon: CheckCircle },
              { n: "04", t: "Suivi", d: "Accompagnement 3 mois post-embauche avec garantie de remplacement", icon: Shield },
            ].map(({ n, t, d, icon: Icon }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", margin: "0 auto 11px", background: "linear-gradient(135deg,rgba(124,58,237,.2),rgba(192,38,211,.1))", border: `1px solid rgba(232,121,249,.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} style={{ color: C.roseL }} strokeWidth={1.5} />
                </div>
                <div style={{ color: C.subtle, fontSize: ".66rem", fontWeight: 700, marginBottom: 3 }}>{n}</div>
                <div style={{ color: C.text, fontWeight: 700, marginBottom: 4, fontSize: ".9rem" }}>{t}</div>
                <div style={{ color: C.subtle, fontSize: ".75rem", lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ padding: isMobile ? "48px 1.2rem" : "72px 2rem", background: "rgba(18,6,24,.3)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { q: "Nous cherchions une Responsible Person depuis 5 mois. TalentFlux a présenté 2 profils qualifiés en 8 jours. La candidate retenue avait déjà géré une inspection Swissmedic.", a: "Head of HR, laboratoire pharma VD" },
            { q: "Ce qui nous a marqué : ils savaient exactement ce qu'est un CAPA et la différence entre un QP et une RP. Aucune agence généraliste n'avait posé les bonnes questions.", a: "Quality Director, CDMO Suisse romande" },
            { q: "Profil AR avec expérience CTD et soumissions EMA trouvé en moins de 2 semaines. Le candidat était déjà connu dans le réseau TalentFlux. Impressionnant.", a: "VP Regulatory Affairs, biotech Genève" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 24 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 13 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill={C.gold} color={C.gold} />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", marginBottom: 13, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: C.subtle, fontSize: ".75rem", fontWeight: 600 }}>— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.roseL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Vos questions</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Tout ce que vous voulez savoir<br /><GradientText>avant de nous appeler</GradientText>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqData.map((item, i) => <FAQItem key={i} item={item} idx={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.2rem" : "88px 2rem", background: "rgba(18,6,24,.4)", borderTop: `1px solid ${C.border}`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(192,38,211,.06),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.roseL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text, marginBottom: 10 }}>
              Trouvez votre expert pharma<br /><GradientText>en 6-10 jours.</GradientText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".92rem", lineHeight: 1.7 }}>Aucun frais avant l'embauche. Compétences GMP vérifiées. Satisfaction garantie 3 mois.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 22 }}>
            {/* FORM */}
            <div style={{ background: "rgba(10,4,18,.95)", border: `1px solid ${C.border}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {[{ key: "recruiter", label: "🏢 Je recrute" }, { key: "candidate", label: "🔬 Je suis candidat" }].map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ flex: 1, padding: "15px", border: "none", cursor: "pointer", background: activeTab === key ? "linear-gradient(135deg,rgba(124,58,237,.15),rgba(192,38,211,.08))" : "transparent", borderBottom: `2px solid ${activeTab === key ? C.roseL : "transparent"}`, color: activeTab === key ? C.text : C.subtle, fontWeight: 700, fontSize: ".84rem", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                    <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                    <InputField label="Email" type="email" placeholder="s.martin@pharma.ch" value={form.email} onChange={set("email")} required />
                    <InputField label="Téléphone" type="tel" placeholder="+41 76 592 88 06" value={form.phone} onChange={set("phone")} />
                    {activeTab === "recruiter" ? <>
                      <InputField label="Entreprise" placeholder="Roche / Lonza / biotech..." value={form.company} onChange={set("company")} required />
                      <SelectField label="Profil recherché" value={form.specialite} onChange={set("specialite")} options={[
                        { value: "", label: "Sélectionner" },
                        { value: "QA Manager", label: "QA Manager / Director" },
                        { value: "Affaires Réglementaires", label: "Affaires Réglementaires (AR)" },
                        { value: "QC", label: "QC / Contrôle qualité" },
                        { value: "Production GMP", label: "Responsable Production GMP" },
                        { value: "Validation", label: "Ingénieur Validation (IQ/OQ/PQ / CSV)" },
                        { value: "Pharmacovigilance", label: "Pharmacovigilance / QPPV" },
                        { value: "R&D", label: "R&D / Formulation" },
                        { value: "HSE", label: "HSE / EHS" },
                        { value: "Responsible Person", label: "Responsible Person (RP)" },
                      ]} />
                    </> : <>
                      <SelectField label="Ma spécialité" value={form.specialite} onChange={set("specialite")} options={[
                        { value: "", label: "Sélectionner" },
                        { value: "QA Manager", label: "QA / Assurance qualité" },
                        { value: "Affaires Réglementaires", label: "Affaires Réglementaires" },
                        { value: "QC", label: "QC / Contrôle qualité" },
                        { value: "Production GMP", label: "Production GMP" },
                        { value: "Validation", label: "Validation / CSV" },
                        { value: "Pharmacovigilance", label: "Pharmacovigilance" },
                        { value: "R&D", label: "R&D / Formulation" },
                        { value: "HSE", label: "HSE / EHS" },
                        { value: "Autre", label: "Autre profil pharma / biotech" },
                      ]} />
                    </>}
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab === "recruiter" ? "Description du besoin" : "Parcours et certifications"}
                    </label>
                    <textarea placeholder={activeTab === "recruiter" ? "Ex: QA Manager avec expérience audits Swissmedic, maîtrise ICH Q9/Q10, contexte CDMO, canton VD, anglais C1..." : "Ex: 8 ans QA industrie pharma solide orale, expertise CAPA et change control, bilingue FR/DE, maîtrise TrackWise, disponible dans 3 mois..."}
                      value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(8,2,16,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", transition: "all .25s", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = "rgba(232,121,249,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,38,211,.06)"; }}
                      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 7 }}>
                      {activeTab === "recruiter" ? "Cahier des charges" : "CV"} <span style={{ color: C.subtle, fontWeight: 400, marginLeft: 6, textTransform: "none" }}>— PDF · Max 10 MB · Optionnel</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        style={{ border: dragOver ? `2px dashed ${C.roseL}` : `2px dashed ${C.border}`, borderRadius: 11, padding: 16, textAlign: "center", cursor: "pointer", transition: "all .25s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(232,121,249,.4)"}
                        onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = C.border; }}>
                        <Upload size={19} style={{ color: C.subtle, margin: "0 auto 7px" }} />
                        <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.roseL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(192,38,211,.06)", border: `1px solid rgba(232,121,249,.2)` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <FileText size={16} style={{ color: C.roseL }} />
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

                  <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px 22px", borderRadius: 13, border: "none", background: loading ? "rgba(192,38,211,.4)" : C.grad, color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, boxShadow: loading ? "none" : "0 4px 22px rgba(192,38,211,.3)", transition: "all .3s", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = "0 8px 36px rgba(232,121,249,.55)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(192,38,211,.3)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    {loading ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</> : <><Send size={16} />{activeTab === "recruiter" ? "Trouver mon expert pharma" : "Envoyer ma candidature"}</>}
                  </button>
                  <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Données sécurisées · RGPD conforme</p>
                </div>
              ) : (
                <div style={{ padding: "52px 26px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🔬</div>
                  <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.2rem", marginBottom: 10 }}>Demande reçue <GradientText>✓</GradientText></h3>
                  <p style={{ color: C.muted, marginBottom: 20, lineHeight: 1.7, fontSize: ".9rem" }}>Merci <strong style={{ color: C.text }}>{form.firstName}</strong> !<br />Un consultant TalentFlux vous répond sous <strong style={{ color: C.roseL }}>24h</strong>.</p>
                  <button onClick={resetForm} style={{ padding: "10px 24px", borderRadius: 11, border: `1px solid rgba(232,121,249,.3)`, background: "rgba(192,38,211,.07)", color: C.roseL, fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ background: "rgba(10,4,18,.95)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".88rem", marginBottom: 15, color: C.text }}>Nous contacter</h3>
                {[{ icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" }, { icon: Phone, label: "Tél.", value: "+41 76 592 88 06", href: "tel:+41765928806" }, { icon: MapPin, label: "Adresse", value: "Yverdon-les-Bains, VD", href: null }].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "rgba(192,38,211,.1)", border: `1px solid rgba(232,121,249,.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={12} style={{ color: C.roseL }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      {href ? <a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none" }}>{value}</a> : <span style={{ color: "#CBD5E1", fontSize: ".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.1),rgba(192,38,211,.05))", border: `1px solid rgba(232,121,249,.2)`, borderRadius: 20, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                  <Clock size={13} style={{ color: C.roseL }} />
                  <span style={{ color: C.text, fontWeight: 700, fontSize: ".85rem" }}>Délais</span>
                </div>
                {[["Accusé de réception", "< 2h"], ["Premier brief", "< 24h"], ["Premiers profils", "6-10 jours"]].map(([l, d]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,.04)` }}>
                    <span style={{ color: C.muted, fontSize: ".78rem" }}>{l}</span>
                    <span style={{ color: C.roseL, fontSize: ".73rem", fontWeight: 700, background: "rgba(192,38,211,.1)", padding: "2px 8px", borderRadius: 5 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(10,4,18,.9)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 18 }}>
                {[["✓", "Aucun frais avant embauche"], ["✓", "Compétences GMP vérifiées"], ["✓", "Expérience Swissmedic testée"], ["✓", "Garantie remplacement 3 mois"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 9, padding: "6px 0", alignItems: "center" }}>
                    <span style={{ color: C.roseL, fontWeight: 700, fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ color: C.muted, fontSize: ".8rem" }}>{text}</span>
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
        background: "rgba(192,38,211,.06)",
        borderTop: "1px solid rgba(232,121,249,.2)",
        borderBottom: "1px solid rgba(232,121,249,.2)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#C026D3", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
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
            
          <a href="/finance" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 14,
            background: "#D4AF5A10", border: "1px solid #D4AF5A30",
            textDecoration: "none", transition: "all .25s",
            flex: 1, minWidth: 180,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4AF5A18"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#D4AF5A10"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: "1.1rem" }}>💰</span>
            <div>
              <div style={{ color: "#D4AF5A", fontWeight: 700, fontSize: ".88rem" }}>Finance & Contrôle</div>
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
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src="/logo.png" alt="TalentFlux" style={{ height: 30, objectFit: "contain" }} />
            <span style={{ color: C.subtle, fontSize: ".7rem" }}>· Pharma & Life Sciences · Yverdon-les-Bains, VD</span>
          </div>
          <p style={{ color: C.subtle, fontSize: ".72rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display: isMobile ? "none" : "flex", gap: 16 }}>
            {[["Confidentialité", "/privacy"], ["CGU", "/cgu"], ["/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: C.subtle, fontSize: ".72rem", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.muted} onMouseLeave={e => e.target.style.color = C.subtle}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
