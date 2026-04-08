"use client";
import { useLang } from "@/contexts/LangContext";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  HardHat, Building2, Ruler, Wrench, Layers,
  ArrowRight, ChevronDown, Star, Clock,
  Send, Phone, Mail, Upload, X, FileText,
  AlertCircle, Users, Award, MapPin, Shield, Zap
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ── useInView défini HORS du composant ────────────────────────
const useInView = (t = 0.12) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
};

// ── Design tokens ─────────────────────────────────────────────
const C = {
  bg:      "#07090C",
  card:    "rgba(12,16,22,0.92)",
  border:  "rgba(255,255,255,0.07)",
  text:    "#F1F5F9",
  muted:   "#8899B4",
  subtle:  "#1E2D42",
  orange:  "#F97316",
  orangeL: "#FB923C",
  steel:   "#3B82F6",
  steelL:  "#60A5FA",
  amber:   "#F59E0B",
  grad:    "linear-gradient(135deg, #1C2B3A 0%, #1E3A5F 50%, #1D4ED8 100%)",
  gradO:   "linear-gradient(135deg, #92400E 0%, #C2410C 50%, #F97316 100%)",
};

const OrangeText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg,#FB923C,#F97316,#EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);
const SteelText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg,#60A5FA,#3B82F6,#1D4ED8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

// ── Sous-composants définis HORS du composant principal ───────
const ProblemCard = ({ icon: Icon, color, title, desc, delay }) => {
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

const FeatureCard = ({ icon: Icon, accent, sub, title, desc, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? `rgba(249,115,22,.06)` : C.card, border: hov ? `1px solid rgba(249,115,22,.3)` : `1px solid ${C.border}`, borderRadius: 20, padding: 28, transition: `all .5s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)" }}>
      <div style={{ marginBottom: 16, display: "inline-flex", padding: 11, borderRadius: 12, background: `${accent}18` }}>
        <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
      </div>
      <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 7, color: accent }}>{sub}</div>
      <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.02rem", marginBottom: 9 }}>{title}</h3>
      <p style={{ color: C.muted, lineHeight: 1.7, fontSize: ".87rem" }}>{desc}</p>
    </div>
  );
};

const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background: open ? "rgba(249,115,22,.04)" : C.card, border: open ? `1px solid rgba(249,115,22,.25)` : `1px solid ${C.border}`, borderRadius: 18, overflow: "hidden", transition: `all .3s ease ${idx * 60}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, textAlign: "left" }}>
        <span style={{ color: C.text, fontWeight: 700, fontSize: ".93rem", fontFamily: "'Sora',sans-serif" }}>{q}</span>
        <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: open ? "rgba(249,115,22,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "all .3s" }}>
          <ChevronDown size={13} style={{ color: open ? C.orangeL : C.muted }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ padding: "0 22px 20px" }}>
          <p style={{ color: C.muted, lineHeight: 1.8, fontSize: ".87rem" }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

// ── Composant principal ───────────────────────────────────────
export default function TalentFluxBTP() {
  // useLang() et useMobile() DANS le composant — jamais hors fonction
  const lang = useLang();
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
    company: "", specialite: "", message: "", file: null
  });

  // window/document uniquement dans useEffect
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleFile = file => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Fichier trop lourd (max 10 MB)."); return; }
    setError(null);
    setForm(f => ({ ...f, file }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.email) {
      setError("Veuillez remplir les champs obligatoires (*).");
      return;
    }
    setLoading(true);
    try {
      let pdfFileName = null, pdfFileUrl = null;
      if (form.file) {
        const san = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fn = `${Date.now()}_${san(form.firstName)}_${san(form.lastName)}.pdf`;
        const { error: ue } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fn}`, form.file, { contentType: "application/pdf" });
        if (!ue) { pdfFileName = fn; pdfFileUrl = `submissions/${fn}`; }
      }
      const { error: ie } = await supabase.from("contact_submissions").insert([{
        type: activeTab, first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        company: form.company.trim() || null, sector: "btp",
        role: form.specialite.trim() || null, message: form.message.trim() || null,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (ie) throw new Error("Erreur : " + ie.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setSubmitted(false); setError(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", specialite: "", message: "", file: null });
  };

  // Données statiques — PAS de lang === ici, uniquement dans le JSX
  const metiers = [
    { icon: HardHat,   label: "Chef de chantier",       lvl: "CCTP · OPC · Planning" },
    { icon: Building2, label: "Directeur de travaux",    lvl: "TCE · Marché public" },
    { icon: Ruler,     label: "Architecte",              label2: "SIA · HEIA · EPFL/EPFZ" },
    { icon: Layers,    label: "Ingénieur structure",     lvl: "Béton armé · Bois · Acier" },
    { icon: Wrench,    label: "Conducteur de travaux",   lvl: "GC · CFC · Brevet fédéral" },
    { icon: Shield,    label: "Responsable HSE",         lvl: "OTConst · SUVA · OPA" },
    { icon: Zap,       label: "Ingénieur CVSE",          lvl: "SIA 382 · Minergie · CECB" },
    { icon: MapPin,    label: "Géomètre-expert",         lvl: "MO · RDPPF · SWISSTOPO" },
  ];

  const faqData = [
    {
      q: "Connaissez-vous la différence entre un marché à forfait et un marché sur devis en droit suisse des marchés publics ?",
      a: "Oui — et nous la testons en entretien. Un chef de chantier ou conducteur de travaux qui ne maîtrise pas les bases du CO Art. 363 ss, de la norme SIA 118 ou des procédures LMP/IMP n'est pas opérationnel sur un chantier public en Suisse. Nous vérifions systématiquement la connaissance des règles de soumission, du décompte final et de la gestion des avenants.",
    },
    {
      q: "Recrutez-vous uniquement en gros œuvre, ou aussi en second œuvre et CVSE ?",
      a: "L'ensemble du cycle de construction : gros œuvre (béton, maçonnerie, charpente), second œuvre (menuiserie, plâtrerie, peinture, carrelage), CVSE (chauffage, ventilation, sanitaire, électricité), ainsi que les bureaux d'études (structure, géotechnique, environnement) et la maîtrise d'œuvre (architectes SIA, ingénieurs civils). Chaque mandat est traité par un consultant qui connaît le corps de métier concerné.",
    },
    {
      q: "Comment évaluez-vous qu'un chef de chantier peut gérer des sous-traitants en contexte suisse ?",
      a: "Nous vérifions la maîtrise de la CCT construction (ou CCT électricité/sanitaire selon le corps de métier), la connaissance des obligations de l'entrepreneur général vis-à-vis de ses sous-traitants (art. 16 LTN), et l'expérience des contrôles de chantier SUVA/MSST. Un chef de chantier qui n'a jamais rédigé un PGCS ou suivi une inspection ISS n'est pas senior.",
    },
    {
      q: "Travaillez-vous sur des projets Minergie, CECB ou à haute performance énergétique ?",
      a: "Oui. Nous recrutons des spécialistes Minergie (P, A, ECO), des experts CECB+, des conseillers en énergie SIA 380/1 et des responsables développement durable pour des maîtres d'ouvrage publics et privés. La connaissance des exigences cantonales (MCEB, directives cantonales énergie) fait partie de notre grille d'évaluation.",
    },
    {
      q: "Quelle est votre garantie si le candidat quitte le poste pendant la période d'essai ?",
      a: "Garantie de remplacement 3 mois sans frais supplémentaires. En cas de départ volontaire ou de rupture de période d'essai dans les 90 jours suivant la prise de fonction, nous relançons le sourcing à nos frais. Rémunération au succès uniquement — aucune facturation avant embauche confirmée.",
    },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(249,115,22,0.25); color:#fff; }
        input::placeholder, textarea::placeholder { color:#1E2D42; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.25}50%{opacity:.65} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .btp-grid {
          background-image:
            linear-gradient(rgba(249,115,22,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29,78,216,.02) 1px, transparent 1px);
          background-size:52px 52px;
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 66, background: scrolled ? "rgba(7,9,12,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: C.orangeL, background: "rgba(249,115,22,.1)", border: `1px solid rgba(251,146,60,.3)`, borderRadius: 4, padding: "2px 7px" }}>BTP</span>
        </div>
        {isMobile ? (
          <a href="tel:+41765928806" style={{ background: "rgba(249,115,22,.15)", border: "1px solid rgba(251,146,60,.3)", color: C.orangeL, padding: "7px 14px", borderRadius: 10, fontWeight: 700, fontSize: ".8rem", textDecoration: "none" }}>
            📞 Appeler
          </a>
        ) : (
          <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
            {["Solution", "Métiers", "FAQ"].map(item => (
              <span key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color: C.muted, fontSize: ".85rem", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.text} onMouseLeave={e => e.target.style.color = C.muted}>{item}</span>
            ))}
            <a href="tel:+41765928806" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: C.orangeL, textDecoration: "none", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}>
              📞 +41 76 592 88 06
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
              <Link href="/btp" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
              <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
              <Link href="/en/btp" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = "#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>EN</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="btp-grid" id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.4rem 60px" : "120px 2rem 80px" }}>
        <div style={{ position: "absolute", top: "12%", left: "6%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.09),transparent 70%)", animation: "pulseGlow 7s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "6%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,78,216,.08),transparent 70%)", animation: "pulseGlow 8s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {!isMobile && (<>
          <div style={{ position: "absolute", left: "3%", top: "38%", background: "rgba(12,16,22,.95)", border: `1px solid rgba(249,115,22,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite", pointerEvents: "none", zIndex: 1, minWidth: 178 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Pénurie CH</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.orangeL, boxShadow: `0 0 6px ${C.orangeL}`, flexShrink: 0, display: "inline-block" }} /> Chefs chantier seniors rares
            </div>
          </div>
          <div style={{ position: "absolute", right: "3%", top: "43%", background: "rgba(12,16,22,.95)", border: `1px solid rgba(59,130,246,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite 1.8s", pointerEvents: "none", zIndex: 1, minWidth: 178 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Secteur</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.steelL, boxShadow: `0 0 6px ${C.steelL}`, flexShrink: 0, display: "inline-block" }} /> BTP · GC · Minergie
            </div>
          </div>
        </>)}

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            {[HardHat, Building2, Ruler, Wrench].map((Icon, i) => (
              <div key={i} style={{ color: i % 2 === 0 ? C.orangeL : C.steelL, opacity: 0.5 + i * 0.12 }}><Icon size={22 + i * 2} strokeWidth={1.5} /></div>
            ))}
          </div>

          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: C.orangeL, marginBottom: 16 }}>
            Recrutement · Architecture, BTP & Génie civil · Suisse
          </p>

          {/* H1 visible — mot-clé SEO + localité */}
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-.02em", color: C.text, marginBottom: 22 }}>
            Recrutement BTP & Génie civil en Suisse romande :<br />
            <OrangeText>votre chef de chantier senior n'est pas sur Indeed.</OrangeText>
          </h1>

          <p style={{ color: C.muted, fontSize: ".97rem", lineHeight: 1.8, maxWidth: 590, margin: "0 auto 36px" }}>
            Architectes SIA, chefs de chantier, directeurs de travaux, ingénieurs structure, spécialistes CVSE & Minergie — des profils retenus avant même d'être disponibles. TalentFlux les connaît par leur chantier de référence, pas par leur CV.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ background: C.gradO, border: "none", color: "#fff", padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 0 28px rgba(249,115,22,.35)", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(249,115,22,.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(249,115,22,.35)"; }}>
              <Users size={17} /> {lang === "en" ? "Hire a BTP Expert" : "Mandater TalentFlux"} <ArrowRight size={16} />
            </button>
            <Link href="/candidature/btp" style={{ background: "rgba(249,115,22,.08)", border: "1.5px solid rgba(251,146,60,.4)", color: C.orangeL, padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", display: "flex", alignItems: "center", gap: 9, textDecoration: "none", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(249,115,22,.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(249,115,22,.08)"; }}>
              <HardHat size={17} /> {lang === "en" ? "Submit my application" : "Déposer ma candidature"} <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 18 : 36, marginTop: 52, paddingTop: 34, borderTop: `1px solid ${C.border}` }}>
            {[["48h", "Premiers profils"], ["100%", "Au succès"], ["3 mois", "Garantie remplacement"], ["CH+F", "Romande & Frontaliers"]].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 3, background: "linear-gradient(135deg,#FB923C,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</div>
                <div style={{ color: C.subtle, fontSize: ".75rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, opacity: .3, cursor: "pointer" }} onClick={() => scrollTo("solution")}><ChevronDown size={22} color={C.orangeL} /></div>
        </div>
      </section>

      {/* ══ PROBLÈME ══ */}
      <section style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: "#EF4444", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le paradoxe du recrutement BTP</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            Les bons cadres du bâtiment n'attendent pas<br /><OrangeText>votre annonce sur un portail d'emploi.</OrangeText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          <ProblemCard icon={HardHat} color="#F97316" title="Pénurie structurelle de cadres terrain" desc="La Suisse forme insuffisamment de chefs de chantier et conducteurs de travaux pour répondre à la demande des EG et entreprises spécialisées. Les profils expérimentés sont approchés directement par les entreprises concurrentes — pas via des offres d'emploi." delay={0} />
          <ProblemCard icon={Building2} color="#EF4444" title="Méconnaissance des normes SIA par les généralistes" desc="La norme SIA 118 sur les contrats de construction, les règles de décompte SIA 402, les exigences OTConst sur la sécurité des chantiers et les procédures LMP pour les marchés publics sont inconnues des recruteurs généralistes. Résultat : des shortlists hors-sujet." delay={100} />
          <ProblemCard icon={Ruler} color="#DC2626" title="Mobilité géographique et frontaliers" desc="Le bassin de recrutement BTP en Suisse romande inclut le canton de Vaud, Genève, Fribourg, Valais — et les zones frontalières de Haute-Savoie et de l'Ain. Ignorer ce bassin, c'est se priver de 30% des candidats qualifiés disponibles." delay={200} />
        </div>
      </section>

      {/* ══ MÉTIERS ══ */}
      <section id="métiers" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", background: "rgba(12,16,22,.4)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.orangeL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Nos spécialités</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, color: C.text }}>
              Tous les métiers du <OrangeText>bâtiment suisse</OrangeText>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: 14 }}>
            {metiers.map(({ icon: Icon, label, lvl }, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,.3)"; e.currentTarget.style.background = "rgba(249,115,22,.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; e.currentTarget.style.transform = "translateY(0)"; }}>
                <Icon size={22} style={{ color: C.orangeL, marginBottom: 10 }} strokeWidth={1.5} />
                <div style={{ color: C.text, fontWeight: 700, fontSize: ".84rem", marginBottom: 5 }}>{label}</div>
                <div style={{ color: C.subtle, fontSize: ".7rem", background: "rgba(249,115,22,.06)", padding: "3px 8px", borderRadius: 5, display: "inline-block" }}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOLUTION ══ */}
      <section id="solution" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: C.orangeL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Notre approche</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            On connaît la SIA 118, l'OTConst et la CCT.<br /><SteelText>On vérifie les chantiers de référence, pas les diplômes.</SteelText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
          <FeatureCard icon={HardHat} accent={C.orangeL} sub="Vérification #1" title="Chantiers de référence" desc="Nous contactons systématiquement les maîtres d'ouvrage et directeurs de travaux des chantiers déclarés par le candidat. Un chef de chantier qui a livré un immeuble en structure bois à 12M CHF dans les délais, ça se vérifie." delay={0} />
          <FeatureCard icon={Shield} accent={C.amber} sub="Vérification #2" title="Certifications & agréments" desc="CAS Construction, brevet fédéral, diplôme ASTP, agrément Minergie, accréditation CECB selon le poste. Pour les postes HSE : formation OTConst, certificat SUVA, MSST niveau 2 ou 3 selon l'effectif du chantier." delay={100} />
          <FeatureCard icon={Layers} accent={C.steelL} sub="Vérification #3" title="Maîtrise des outils & normes" desc="Autocad, Revit (BIM), MS Project, Allplan selon le profil. Connaissance des normes SIA 260 à 267 (structures), SIA 380/1 (énergie), SIA 416 (surfaces), et de la procédure LMP pour les marchés publics cantonaux et fédéraux." delay={200} />
        </div>

        <div style={{ padding: isMobile ? 24 : 38, background: "rgba(12,16,22,.8)", borderRadius: 22, border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 26, textAlign: "center" }}>Le processus en 4 étapes</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 20 : 14 }}>
            {[
              { n: "01", t: "Brief technique", d: "Corps de métier, envergure du chantier, outils requis, contexte MO public ou privé", icon: FileText },
              { n: "02", t: "Sourcing réseau", d: "Approche directe des profils en poste — pas d'annonce publique sans accord client", icon: Users },
              { n: "03", t: "Vérification terrain", d: "Appels de référence sur les chantiers déclarés, vérification des certifications et agréments", icon: HardHat },
              { n: "04", t: "Suivi post-intégration", d: "Accompagnement 3 mois avec garantie de remplacement sans frais supplémentaires", icon: Shield },
            ].map(({ n, t, d, icon: Icon }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", margin: "0 auto 11px", background: "linear-gradient(135deg,rgba(249,115,22,.2),rgba(251,146,60,.1))", border: `1px solid rgba(249,115,22,.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} style={{ color: C.orangeL }} strokeWidth={1.5} />
                </div>
                <div style={{ color: C.subtle, fontSize: ".66rem", fontWeight: 700, marginBottom: 3 }}>{n}</div>
                <div style={{ color: C.text, fontWeight: 700, marginBottom: 4, fontSize: ".9rem" }}>{t}</div>
                <div style={{ color: C.subtle, fontSize: ".75rem", lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TÉMOIGNAGES ══ */}
      <section style={{ padding: isMobile ? "48px 1.4rem" : "72px 2rem", background: "rgba(12,16,22,.3)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { q: "TalentFlux a compris immédiatement que nous cherchions un chef de chantier béton avec expérience Minergie P, pas simplement un 'cadre BTP'. Le profil présenté en 8 jours était en poste depuis 6 ans — il n'aurait jamais répondu à une annonce.", a: "Directeur travaux, EG Suisse romande — Vaud" },
            { q: "Ce qui nous a convaincus : ils ont su poser les bonnes questions sur le contexte MO. Chantier public ou privé, structure bois ou béton, MCT ou EG — ils ne mélangent pas tout comme les autres agences.", a: "Directeur général, Bureau d'ingénieurs civils — Genève" },
            { q: "Nous avions besoin d'un ingénieur CVSE avec expertise Minergie ECO et connaissance SIA 382. TalentFlux nous a présenté deux candidats qualifiés en moins de 10 jours. Le second a été engagé.", a: "Associé, Bureau technique spécialisé CVSE — Lausanne" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.orangeL}`, borderRadius: 18, padding: 24 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 13 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill={C.amber} color={C.amber} />)}
              </div>
              <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: ".86rem", marginBottom: 13, fontStyle: "italic" }}>"{q}"</p>
              <p style={{ color: C.subtle, fontSize: ".75rem", fontWeight: 600 }}>— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.orangeL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Questions fréquentes</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Ce que tout MO devrait<br /><OrangeText>demander à son recruteur BTP</OrangeText>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqData.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", background: "rgba(12,16,22,.4)", borderTop: `1px solid ${C.border}`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(249,115,22,.05),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.orangeL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Votre mandat</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text, marginBottom: 10 }}>
              Confiez-nous votre recherche.<br /><OrangeText>Aucun frais avant embauche.</OrangeText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".92rem", lineHeight: 1.7 }}>Réponse sous 2h · Sourcing en 48h · Garantie 3 mois</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 22 }}>
            <div style={{ background: "rgba(7,9,12,.95)", border: `1px solid ${C.border}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {[
                  { key: "recruiter", label: lang === "en" ? "🏗️ I'm hiring" : "🏗️ Je recrute" },
                  { key: "candidate", label: lang === "en" ? "🪖 I'm a candidate" : "🪖 Je suis candidat" }
                ].map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ flex: 1, padding: "15px", border: "none", cursor: "pointer", background: activeTab === key ? "linear-gradient(135deg,rgba(249,115,22,.15),rgba(251,146,60,.08))" : "transparent", borderBottom: `2px solid ${activeTab === key ? C.orangeL : "transparent"}`, color: activeTab === key ? C.text : C.subtle, fontWeight: 700, fontSize: ".84rem", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    {[["Prénom *", "firstName", "Jean"], ["Nom *", "lastName", "Dupont"]].map(([label, key, ph]) => (
                      <div key={key}>
                        <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                        <input placeholder={ph} value={form[key]} onChange={set(key)}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                          onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                          onBlur={e => { e.target.style.borderColor = C.border; }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Email *</label>
                      <input type="email" placeholder="j.dupont@btpsuisse.ch" value={form.email} onChange={set("email")}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                        onBlur={e => { e.target.style.borderColor = C.border; }} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Téléphone</label>
                      <input type="tel" placeholder="+41 79 000 00 00" value={form.phone} onChange={set("phone")}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                        onBlur={e => { e.target.style.borderColor = C.border; }} />
                    </div>
                    {activeTab === "recruiter" ? (
                      <>
                        <div>
                          <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Entreprise *</label>
                          <input placeholder="BTP Construct SA" value={form.company} onChange={set("company")}
                            style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                            onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                            onBlur={e => { e.target.style.borderColor = C.border; }} />
                        </div>
                        <div>
                          <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Profil recherché</label>
                          <select value={form.specialite} onChange={set("specialite")}
                            style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(7,9,12,.9)", border: `1px solid ${C.border}`, color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                            <option value="">Sélectionner...</option>
                            {["Chef de chantier (GC / Spécialisé)", "Directeur de travaux / Conducteur de travaux", "Architecte (SIA / HEIA)", "Ingénieur civil / structure", "Ingénieur CVSE", "Responsable HSE / Sécurité chantier", "Géomètre-expert / Géomaticien", "BIM Manager / Coordinateur BIM", "Responsable développement durable / Minergie", "Autre profil BTP"].map(o => (
                              <option key={o} value={o} style={{ background: "#07090C" }}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Ma spécialité</label>
                        <select value={form.specialite} onChange={set("specialite")}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(7,9,12,.9)", border: `1px solid ${C.border}`, color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                          <option value="">Sélectionner...</option>
                          {["Chef de chantier", "Directeur / Conducteur de travaux", "Architecte", "Ingénieur civil / structure", "Ingénieur CVSE", "Responsable HSE", "Géomètre", "BIM Manager", "Technicien / Dessinateur", "Autre"].map(o => (
                            <option key={o} value={o} style={{ background: "#07090C" }}>{o}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      {activeTab === "recruiter" ? "Description du poste & contexte chantier" : "Expériences clés & disponibilité"}
                    </label>
                    <textarea
                      placeholder={activeTab === "recruiter"
                        ? "Ex: Chef de chantier béton armé, chantier logements collectifs 8M CHF, Vaud, maîtrise SIA 118, expérience Minergie souhaitée, disponible dans 2 mois..."
                        : "Ex: Chef de chantier 12 ans, structure béton et bois, chantiers jusqu'à 15M CHF, bilingue FR/DE, brevet fédéral, Minergie P, disponible sous 3 mois..."}
                      value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                      onBlur={e => { e.target.style.borderColor = C.border; }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      {activeTab === "recruiter" ? "Cahier des charges (optionnel)" : "CV (optionnel)"} <span style={{ fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        style={{ border: dragOver ? `2px dashed ${C.orangeL}` : `2px dashed ${C.border}`, borderRadius: 11, padding: 16, textAlign: "center", cursor: "pointer", transition: "all .25s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,.4)"}
                        onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = C.border; }}>
                        <Upload size={19} style={{ color: C.subtle, margin: "0 auto 7px" }} />
                        <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.orangeL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(249,115,22,.06)", border: `1px solid rgba(249,115,22,.2)` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <FileText size={16} style={{ color: C.orangeL }} />
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

                  <button onClick={handleSubmit} disabled={loading}
                    style={{ width: "100%", padding: "14px 22px", borderRadius: 13, border: "none", background: loading ? "rgba(249,115,22,.4)" : C.gradO, color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, boxShadow: loading ? "none" : "0 4px 22px rgba(249,115,22,.3)", transition: "all .3s", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = "0 8px 36px rgba(249,115,22,.55)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(249,115,22,.3)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    {loading
                      ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</>
                      : <><Send size={16} />{activeTab === "recruiter" ? (lang === "en" ? "Send my brief" : "Envoyer mon brief") : (lang === "en" ? "Send my application" : "Envoyer ma candidature")}</>}
                  </button>
                  <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Données protégées · LPD suisse & RGPD conformes</p>
                </div>
              ) : (
                <div style={{ padding: "52px 26px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🏗️</div>
                  <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.2rem", marginBottom: 10 }}>Demande reçue <OrangeText>✓</OrangeText></h3>
                  <p style={{ color: C.muted, marginBottom: 20, lineHeight: 1.7, fontSize: ".9rem" }}>Merci <strong style={{ color: C.text }}>{form.firstName}</strong> !<br />Un consultant TalentFlux BTP vous répond sous <strong style={{ color: C.orangeL }}>2h ouvrées</strong>.</p>
                  <button onClick={resetForm} style={{ padding: "10px 24px", borderRadius: 11, border: `1px solid rgba(249,115,22,.3)`, background: "rgba(249,115,22,.07)", color: C.orangeL, fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ background: "rgba(7,9,12,.95)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".88rem", marginBottom: 15, color: C.text }}>Contact direct</h3>
                {[
                  { icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" },
                  { icon: Phone, label: "Tél.", value: "+41 76 592 88 06", href: "tel:+41765928806" },
                  { icon: MapPin, label: "Siège", value: "Yverdon-les-Bains, VD", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "rgba(249,115,22,.1)", border: `1px solid rgba(249,115,22,.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={12} style={{ color: C.orangeL }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: C.subtle, fontSize: ".63rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      {href ? <a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none" }}>{value}</a> : <span style={{ color: "#CBD5E1", fontSize: ".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,.1),rgba(251,146,60,.05))", border: `1px solid rgba(249,115,22,.2)`, borderRadius: 20, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                  <Clock size={13} style={{ color: C.orangeL }} />
                  <span style={{ color: C.text, fontWeight: 700, fontSize: ".85rem" }}>Délais</span>
                </div>
                {[["Accusé de réception", "< 2h"], ["Premiers profils", "48h"], ["Processus complet", "2-3 semaines"]].map(([l, d]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,.04)` }}>
                    <span style={{ color: C.muted, fontSize: ".78rem" }}>{l}</span>
                    <span style={{ color: C.orangeL, fontSize: ".73rem", fontWeight: 700, background: "rgba(249,115,22,.1)", padding: "2px 8px", borderRadius: 5 }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(7,9,12,.9)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 18 }}>
                {[["✓", "Aucun frais avant embauche"], ["✓", "Sourcing réseau — pas d'annonce"], ["✓", "Vérification chantiers de référence"], ["✓", "Garantie remplacement 3 mois"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 9, padding: "6px 0", alignItems: "center" }}>
                    <span style={{ color: C.orangeL, fontWeight: 700, fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ color: C.muted, fontSize: ".8rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SILO SEO — Vous recrutez aussi dans... ══ */}
      <section style={{ padding: "48px 2rem", background: "rgba(249,115,22,.04)", borderTop: `1px solid rgba(249,115,22,.15)`, borderBottom: `1px solid rgba(249,115,22,.15)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: C.orangeL, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>✦ Nos autres expertises</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,3vw,1.9rem)", color: C.text, marginBottom: 6 }}>Vous recrutez aussi dans...</h2>
            <p style={{ color: "#64748B", fontSize: ".88rem" }}>TalentFlux opère sur 7 secteurs spécialisés en Suisse.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { href: "/ingenierie", label: "⚙️ Ingénierie & Technique",    color: "#818CF8", sub: "MedTech · Automation · R&D" },
              { href: "/juridique",  label: "⚖️ Droit & Compliance",         color: "#748FFC", sub: "GC · FINMA · nLPD" },
            ].map(({ href, label, color, sub }) => (
              <a key={href} href={href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", borderRadius: 14, background: `${color}10`, border: `1px solid ${color}30`, textDecoration: "none", transition: "all .25s", flex: 1, minWidth: 200 }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div>
                  <div style={{ color, fontWeight: 700, fontSize: ".88rem" }}>{label}</div>
                  <div style={{ color: "#475569", fontSize: ".74rem", marginTop: 2 }}>{sub} · Voir la verticale →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 2rem" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src="/logo.png" alt="TalentFlux" style={{ height: 30, objectFit: "contain" }} />
            <span style={{ color: C.subtle, fontSize: ".7rem" }}>· BTP & Génie civil · Yverdon-les-Bains, VD</span>
          </div>
          <p style={{ color: C.subtle, fontSize: ".72rem" }}>© {new Date().getFullYear()} TalentFlux. Tous droits réservés.</p>
          <div style={{ display: isMobile ? "none" : "flex", gap: 16 }}>
            {[["Confidentialité", "/privacy"], ["CGU", "/cgu"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} href={to} style={{ color: C.subtle, fontSize: ".72rem", textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.muted} onMouseLeave={e => e.target.style.color = C.subtle}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
