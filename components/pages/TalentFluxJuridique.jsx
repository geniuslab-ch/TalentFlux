"use client";
import { useLang } from "@/contexts/LangContext";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  Scale, FileText, Shield, Gavel, BookOpen,
  ArrowRight, CheckCircle, ChevronDown, Star, Clock,
  Send, Phone, Mail, Upload, X, AlertCircle,
  Users, Award, MapPin, Building2, Lock
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ── Intersection observer — hooks définis HORS du render ──────
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
  bg:     "#06080F",
  card:   "rgba(10,14,30,0.92)",
  border: "rgba(255,255,255,0.07)",
  text:   "#F0F4FF",
  muted:  "#8B9FCC",
  subtle: "#2D3A5A",
  navy:   "#1B2A52",
  gold:   "#C8A96E",
  goldL:  "#E2C98A",
  goldD:  "#8B6914",
  blue:   "#3B5BDB",
  blueL:  "#748FFC",
  grad:   "linear-gradient(135deg, #1B2A52 0%, #2C3E80 50%, #3B5BDB 100%)",
};

const GoldText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #E2C98A, #C8A96E, #A07840)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

// ── Composants extraits hors render (évite loss de focus et hooks dans map) ──
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
      style={{ background: hov ? `rgba(59,91,219,.06)` : C.card, border: hov ? `1px solid rgba(116,143,252,.3)` : `1px solid ${C.border}`, borderRadius: 20, padding: 28, transition: `all .5s ease ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(25px)" }}>
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
    <div ref={ref} style={{ background: open ? "rgba(59,91,219,.04)" : C.card, border: open ? `1px solid rgba(116,143,252,.3)` : `1px solid ${C.border}`, borderRadius: 18, overflow: "hidden", transition: `all .3s ease ${idx * 60}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, textAlign: "left" }}>
        <span style={{ color: C.text, fontWeight: 700, fontSize: ".93rem", fontFamily: "'Sora',sans-serif" }}>{q}</span>
        <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: open ? "rgba(116,143,252,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "all .3s" }}>
          <ChevronDown size={13} style={{ color: open ? C.blueL : C.muted }} />
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
export default function TalentFluxJuridique() {
  const lang = useLang();
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", specialite: "", message: "", file: null });

  // Tous les useEffect groupés — window/document uniquement ici
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
    if (!form.firstName || !form.lastName || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
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
        company: form.company.trim() || null, sector: "juridique",
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

  const faqData = [
    {
      q: "Connaissez-vous réellement les différences entre un juriste d'entreprise, un counsel et un General Counsel ?",
      a: "Oui — et ce n'est pas qu'une question de titre. Un General Counsel assume la responsabilité pénale et civile de la conformité d'un groupe. Un counsel senior en cabinet est soumis à une obligation de résultat différente. Nos consultants ont exercé dans des cabinets et des in-house : ils posent les bonnes questions sur l'autonomie décisionnelle, le périmètre de signature et l'exposition réglementaire avant de présenter un profil.",
    },
    {
      q: "Comment évaluez-vous la maîtrise du droit suisse des affaires vs. le droit européen ?",
      a: "Nous testons la maîtrise du CO (Code des obligations), de la LPD/nLPD, des exigences FINMA pour les profils compliance, et de la réglementation sectorielle (LSPro, LMeF, LPCC selon le secteur client). Pour les profils EU, nous vérifions la connaissance opérationnelle du RGPD, de DORA, de la directive NIS2 et de la directive sur les lanceurs d'alerte.",
    },
    {
      q: "Vos candidats sont-ils inscrits au barreau et en exercice actif ?",
      a: "Pour les postes requérant le brevet d'avocat, nous vérifions l'inscription auprès du barreau cantonal concerné et nous contrôlons l'absence de suspension ou radiation. Pour les juristes non brevetés, nous vérifions le titre académique (master en droit ou équivalent reconnu) et les accréditations complémentaires (LL.M., diplôme de mediateur accrédité, CIPP/E pour les DPO).",
    },
    {
      q: "Travaillez-vous aussi pour des cabinets d'avocats, ou uniquement pour des in-house ?",
      a: "Les deux. Pour les cabinets, nous recrutons des collaborateurs de tous niveaux (junior à senior), des associés latéraux, et des profils de management non juridique (COO, business development). Pour les in-house, nous plaçons des General Counsel, des Head of Legal, des compliance officers, des DPO et des contract managers. Chaque mandat est traité avec la confidentialité qu'il requiert.",
    },
    {
      q: "Quelle est votre garantie et que se passe-t-il en cas de départ du candidat ?",
      a: "Garantie de remplacement 3 mois sans frais supplémentaires. En cas de départ volontaire ou de rupture de période d'essai dans les 90 jours suivant la prise de fonction, nous relançons le processus de sourcing à nos frais, sans refacturation. Aucune clause de dédit.",
    },
  ];

  const metiers = [
    { icon: Scale,     label: "General Counsel",          lvl: "Group · Autonomie totale" },
    { icon: Gavel,     label: "Avocat d'affaires",         lvl: "Cabinet · M&A · Corporate" },
    { icon: Shield,    label: "Compliance Officer",        lvl: "FINMA · AML · Intégrité" },
    { icon: Lock,      label: "DPO / Data Privacy",        lvl: "nLPD · RGPD · DORA" },
    { icon: FileText,  label: "Contract Manager",          lvl: "NDA · SLA · B2B" },
    { icon: BookOpen,  label: "Juriste in-house",          lvl: "CO · Droit social · IP" },
    { icon: Building2, label: "Head of Legal",             lvl: "PME · Scale-up · PE" },
    { icon: Award,     label: "Mediateur accrédité",       lvl: "FSMA · CPC · Arbitrage" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(59,91,219,0.25); color:#fff; }
        input::placeholder, textarea::placeholder { color:#1B2A52; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.25}50%{opacity:.65} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .juridique-grid {
          background-image:
            linear-gradient(rgba(59,91,219,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,91,219,.025) 1px, transparent 1px);
          background-size:52px 52px;
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 66, background: scrolled ? "rgba(6,8,15,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 36, objectFit: "contain" }} />
          <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", color: C.goldL, background: "rgba(200,169,110,.1)", border: `1px solid rgba(200,169,110,.3)`, borderRadius: 4, padding: "2px 7px" }}>JURIDIQUE</span>
        </div>
        {isMobile ? (
          <a href="tel:+41765928806" style={{ background: "rgba(59,91,219,.15)", border: "1px solid rgba(116,143,252,.3)", color: C.blueL, padding: "7px 14px", borderRadius: 10, fontWeight: 700, fontSize: ".8rem", textDecoration: "none" }}>
            📞 Appeler
          </a>
        ) : (
          <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
            {["Solution", "Métiers", "FAQ"].map(item => (
              <span key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color: C.muted, fontSize: ".85rem", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.text} onMouseLeave={e => e.target.style.color = C.muted}>{item}</span>
            ))}
            <a href="tel:+41765928806" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: C.goldL, textDecoration: "none", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".03em", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}>
              📞 +41 76 592 88 06
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)" }}>
              <Link href="/juridique" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
              <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
              <Link href="/en/juridique" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = "#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>EN</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="juridique-grid" id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? "90px 1.4rem 60px" : "120px 2rem 80px" }}>
        <div style={{ position: "absolute", top: "12%", left: "6%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,91,219,.1),transparent 70%)", animation: "pulseGlow 7s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "6%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,169,110,.07),transparent 70%)", animation: "pulseGlow 8s ease-in-out infinite 2s", pointerEvents: "none" }} />

        {!isMobile && (<>
          <div style={{ position: "absolute", left: "3%", top: "38%", background: "rgba(10,14,30,.95)", border: `1px solid rgba(116,143,252,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite", pointerEvents: "none", zIndex: 1, minWidth: 178 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Pénurie CH</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.blueL, boxShadow: `0 0 6px ${C.blueL}`, flexShrink: 0, display: "inline-block" }} /> GC & Compliance rares
            </div>
          </div>
          <div style={{ position: "absolute", right: "3%", top: "43%", background: "rgba(10,14,30,.95)", border: `1px solid rgba(200,169,110,.2)`, borderRadius: 14, padding: "12px 16px", animation: "float 5s ease-in-out infinite 1.8s", pointerEvents: "none", zIndex: 1, minWidth: 178 }}>
            <div style={{ color: C.subtle, fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>Secteur</div>
            <div style={{ color: C.text, fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold, boxShadow: `0 0 6px ${C.gold}`, flexShrink: 0, display: "inline-block" }} /> Droit · FINMA · nLPD
            </div>
          </div>
        </>)}

        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            {[Scale, Gavel, Shield, BookOpen].map((Icon, i) => (
              <div key={i} style={{ color: C.blueL, opacity: 0.5 + i * 0.12 }}><Icon size={22 + i * 2} strokeWidth={1.5} /></div>
            ))}
          </div>

          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: C.goldL, marginBottom: 16 }}>
            Recrutement · Droit des affaires & Compliance · Suisse
          </p>

          {/* H1 visible — mot-clé SEO + localité */}
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-.02em", color: C.text, marginBottom: 22 }}>
            Recrutement juridique en Suisse romande :<br />
            <GoldText>votre General Counsel n'est pas sur LinkedIn.</GoldText>
          </h1>

          <p style={{ color: C.muted, fontSize: ".97rem", lineHeight: 1.8, maxWidth: 590, margin: "0 auto 36px" }}>
            Avocats d'affaires, General Counsel, Compliance Officers, DPO, Contract Managers — des profils soumis au secret professionnel qui ne diffusent pas publiquement. TalentFlux les atteint par le réseau, pas par l'annonce.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ background: C.grad, border: "none", color: "#fff", padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 0 28px rgba(59,91,219,.35)", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(116,143,252,.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(59,91,219,.35)"; }}>
              <Users size={17} /> Mandater TalentFlux <ArrowRight size={16} />
            </button>
            <Link href="/candidature/juridique" style={{ background: "rgba(59,91,219,.08)", border: "1.5px solid rgba(116,143,252,.4)", color: C.blueL, padding: "15px 32px", borderRadius: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".95rem", display: "flex", alignItems: "center", gap: 9, textDecoration: "none", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(59,91,219,.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(59,91,219,.08)"; }}>
              <Scale size={17} /> Déposer mon dossier <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 18 : 36, marginTop: 52, paddingTop: 34, borderTop: `1px solid ${C.border}` }}>
            {[["6-10j", "Délai GC / Head of Legal"], ["100%", "Au succès"], ["3 mois", "Garantie remplacement"], ["CH", "Romande & Alémanique"]].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "'Sora',sans-serif", marginBottom: 3, background: "linear-gradient(135deg,#E2C98A,#748FFC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</div>
                <div style={{ color: C.subtle, fontSize: ".75rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 44, opacity: .3, cursor: "pointer" }} onClick={() => scrollTo("solution")}><ChevronDown size={22} color={C.blueL} /></div>
        </div>
      </section>

      {/* ══ PROBLÈME ══ */}
      <section style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: "#EF4444", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>⚠ Le paradoxe du recrutement juridique</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            Les meilleurs juristes n'ont pas besoin<br /><GoldText>de diffuser leur disponibilité.</GoldText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { icon: Lock, color: "#F97316", title: "Secret professionnel & discrétion", desc: "Un General Counsel en poste ne répond pas à une annonce LinkedIn. La diffusion publique de sa recherche exposerait sa relation avec son employeur actuel. Il mandate — ou est approché par un tiers de confiance." },
            { icon: Scale, color: "#EF4444", title: "Déficit structurel de profils qualifiés", desc: "La Suisse forme moins de 300 avocats brevetés par an. Les profils combinant droit suisse, allemand courant et expérience FINMA ou M&A sont retenus avant même d'être formellement disponibles sur le marché." },
            { icon: Gavel, color: "#DC2626", title: "Incompréhension des cabinets généralistes", desc: "La différence entre un avocat d'affaires senior et un juriste in-house, ou entre une obligation de moyen et une obligation de résultat en matière de compliance, échappe à la plupart des recruteurs. Résultat : des shortlists inadaptées et une perte de temps pour tous." },
          ].map(({ icon, color, title, desc }, i) => (
            <ProblemCard key={i} icon={icon} color={color} title={title} desc={desc} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ══ MÉTIERS ══ */}
      <section id="métiers" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", background: "rgba(10,14,30,.4)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.gold, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Nos spécialités</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, color: C.text }}>
              Tous les profils du <GoldText>droit suisse des affaires</GoldText>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: 14 }}>
            {metiers.map(({ icon: Icon, label, lvl }, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 16px", textAlign: "center", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(116,143,252,.3)"; e.currentTarget.style.background = "rgba(59,91,219,.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; e.currentTarget.style.transform = "translateY(0)"; }}>
                <Icon size={22} style={{ color: C.blueL, marginBottom: 10 }} strokeWidth={1.5} />
                <div style={{ color: C.text, fontWeight: 700, fontSize: ".84rem", marginBottom: 5 }}>{label}</div>
                <div style={{ color: C.subtle, fontSize: ".7rem", background: "rgba(59,91,219,.06)", padding: "3px 8px", borderRadius: 5, display: "inline-block" }}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOLUTION ══ */}
      <section id="solution" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: C.goldL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Notre approche</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
            On distingue un counsel d'un GC.<br /><GoldText>On vérifie le brevet et l'inscription au barreau.</GoldText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
          <FeatureCard icon={Scale} accent={C.blueL} sub="Vérification #1" title="Brevet & inscription barreau" desc="Nous contrôlons l'inscription au registre cantonal des avocats, l'absence de suspension ou de radiation, et la validité de l'assurance responsabilité professionnelle. Pour les DPO, nous vérifions la certification CIPP/E ou équivalente." delay={0} />
          <FeatureCard icon={Shield} accent={C.gold} sub="Vérification #2" title="Maîtrise du droit positif suisse" desc="CO, LPD/nLPD, FINMA, LSPro, LMeF selon le secteur. Nous testons la connaissance opérationnelle, pas déclarative : un compliance officer qui n'a pas géré une inspection FINMA n'est pas senior." delay={100} />
          <FeatureCard icon={Lock} accent={C.goldL} sub="Vérification #3" title="Confidentialité absolue du mandat" desc="Tout candidat signataire d'un NDA ou soumis à un devoir de réserve est approché par un canal discret. Nos processus respectent les règles déontologiques de la profession et les obligations de confidentialité de votre entreprise." delay={200} />
        </div>

        {/* Étapes */}
        <div style={{ padding: isMobile ? 24 : 38, background: "rgba(10,14,30,.8)", borderRadius: 22, border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 26, textAlign: "center" }}>Le processus en 4 étapes</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 20 : 14 }}>
            {[
              { n: "01", t: "Brief confidentiel", d: "30 min pour cerner le périmètre du poste, l'exposition réglementaire et le niveau d'autonomie requis", icon: FileText },
              { n: "02", t: "Sourcing réseau", d: "Activation de notre réseau de juristes et d'avocats — pas d'annonce publique sauf accord explicite du client", icon: Users },
              { n: "03", t: "Vérification juridique", d: "Brevet, barreau, certifications, conflits d'intérêts potentiels et références vérifiées", icon: Scale },
              { n: "04", t: "Suivi post-intégration", d: "Accompagnement 3 mois avec garantie de remplacement sans frais supplémentaires", icon: Shield },
            ].map(({ n, t, d, icon: Icon }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", margin: "0 auto 11px", background: "linear-gradient(135deg,rgba(59,91,219,.2),rgba(116,143,252,.1))", border: `1px solid rgba(116,143,252,.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} style={{ color: C.blueL }} strokeWidth={1.5} />
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
      <section style={{ padding: isMobile ? "48px 1.4rem" : "72px 2rem", background: "rgba(10,14,30,.3)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { q: "Nous cherchions un General Counsel bilingue DE/FR avec expérience FINMA depuis 6 mois. TalentFlux a présenté 2 candidats qualifiés en 9 jours. L'un était en poste et n'avait pas diffusé sa disponibilité.", a: "Managing Partner, Cabinet d'avocats d'affaires — Zurich" },
            { q: "Ce qui nous a convaincu : ils ont su différencier d'emblée le périmètre d'une fonction GC d'un groupe coté de celui d'une PME familiale. Aucune autre agence n'avait posé cette question.", a: "DRH, groupe industriel coté — Vaud" },
            { q: "Le profil DPO qu'ils nous ont présenté avait sa certification CIPP/E, connaissait la nLPD dans le détail et avait déjà géré une mise en conformité RGPD from scratch. Opérationnel dès le premier jour.", a: "Directeur Juridique, Fintech — Genève" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.blueL}`, borderRadius: 18, padding: 24 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 13 }}>
                {Array(5).fill(0).map((_, j) => <Star key={j} size={12} fill={C.gold} color={C.gold} />)}
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
            <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Questions fréquentes</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text }}>
              Ce que tout juriste<br /><GoldText>devrait demander à son recruteur</GoldText>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqData.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: isMobile ? "56px 1.4rem" : "88px 2rem", background: "rgba(10,14,30,.4)", borderTop: `1px solid ${C.border}`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(59,91,219,.06),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14 }}>✦ Mandat confidentiel</div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, lineHeight: 1.2, color: C.text, marginBottom: 10 }}>
              Confiez-nous votre mandat<br /><GoldText>sous NDA si nécessaire.</GoldText>
            </h2>
            <p style={{ color: C.muted, fontSize: ".92rem", lineHeight: 1.7 }}>Aucun frais avant embauche · Confidentialité garantie · Réponse sous 2h</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 300px", gap: 22 }}>
            <div style={{ background: "rgba(6,8,15,.95)", border: `1px solid ${C.border}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
                {[{ key: "recruiter", label: "⚖️ Je mandate" }, { key: "candidate", label: "📋 Je dépose mon dossier" }].map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ flex: 1, padding: "15px", border: "none", cursor: "pointer", background: activeTab === key ? "linear-gradient(135deg,rgba(59,91,219,.15),rgba(116,143,252,.08))" : "transparent", borderBottom: `2px solid ${activeTab === key ? C.blueL : "transparent"}`, color: activeTab === key ? C.text : C.subtle, fontWeight: 700, fontSize: ".84rem", transition: "all .25s", fontFamily: "'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    {[["Prénom *", "firstName", "Sophie"], ["Nom *", "lastName", "Dupont"]].map(([label, key, ph]) => (
                      <div key={key}>
                        <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                        <input placeholder={ph} value={form[key]} onChange={set(key)}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                          onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,91,219,.06)"; }}
                          onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Email *</label>
                      <input type="email" placeholder="s.dupont@cabinet.ch" value={form.email} onChange={set("email")}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,91,219,.06)"; }}
                        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Téléphone</label>
                      <input type="tel" placeholder="+41 79 000 00 00" value={form.phone} onChange={set("phone")}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,91,219,.06)"; }}
                        onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                    </div>
                    {activeTab === "recruiter" ? (
                      <>
                        <div>
                          <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Cabinet / Entreprise *</label>
                          <input placeholder="Cabinet Martin & Associés" value={form.company} onChange={set("company")}
                            style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                            onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,91,219,.06)"; }}
                            onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                        </div>
                        <div>
                          <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Profil recherché</label>
                          <select value={form.specialite} onChange={set("specialite")}
                            style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(6,8,15,.9)", border: `1px solid ${C.border}`, color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                            <option value="">Sélectionner...</option>
                            {["General Counsel / Directeur Juridique", "Avocat d'affaires (corporate / M&A)", "Compliance Officer (FINMA / AML)", "DPO / Data Privacy Officer", "Contract Manager", "Juriste in-house", "Associé latéral (cabinet)", "Médiateur accrédité", "Autre profil juridique"].map(o => <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>)}
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Ma spécialité</label>
                          <select value={form.specialite} onChange={set("specialite")}
                            style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(6,8,15,.9)", border: `1px solid ${C.border}`, color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                            <option value="">Sélectionner...</option>
                            {["Avocat d'affaires breveté", "General Counsel / Directeur Juridique", "Compliance Officer", "DPO / Data Privacy", "Contract Manager", "Juriste in-house", "Droit du travail", "Propriété intellectuelle / IP", "Droit fiscal", "Arbitrage / Médiation"].map(o => <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>)}
                          </select>
                        </div>
                        <div />
                      </>
                    )}
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      {activeTab === "recruiter" ? "Description du mandat" : "Parcours et disponibilité"}
                    </label>
                    <textarea
                      placeholder={activeTab === "recruiter"
                        ? "Ex: GC bilingue FR/DE, expérience FINMA, autonomie totale sur litiges, brevet d'avocat souhaité, groupe 500 pers., Genève..."
                        : "Ex: Avocat breveté GE, 8 ans M&A et corporate, bilingue FR/DE, LL.M. London, disponible sous 3 mois, CTC actuel 220k..."}
                      value={form.message} onChange={set("message")} rows={3}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,91,219,.06)"; }}
                      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                  </div>

                  {/* Upload CV / CDC */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
                      {activeTab === "recruiter" ? "Cahier des charges (optionnel)" : "CV (optionnel)"} <span style={{ color: C.subtle, fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        style={{ border: dragOver ? `2px dashed ${C.blueL}` : `2px dashed ${C.border}`, borderRadius: 11, padding: 16, textAlign: "center", cursor: "pointer", transition: "all .25s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(116,143,252,.4)"}
                        onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = C.border; }}>
                        <Upload size={19} style={{ color: C.subtle, margin: "0 auto 7px" }} />
                        <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.blueL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(59,91,219,.06)", border: `1px solid rgba(116,143,252,.2)` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <FileText size={16} style={{ color: C.blueL }} />
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
                    style={{ width: "100%", padding: "14px 22px", borderRadius: 13, border: "none", background: loading ? "rgba(59,91,219,.4)" : C.grad, color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, boxShadow: loading ? "none" : "0 4px 22px rgba(59,91,219,.3)", transition: "all .3s", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = "0 8px 36px rgba(116,143,252,.55)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(59,91,219,.3)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    {loading
                      ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</>
                      : <><Send size={16} />{activeTab === "recruiter" ? "Transmettre le mandat" : "Envoyer mon dossier"}</>}
                  </button>
                  <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Traitement confidentiel · LPD suisse & RGPD conformes</p>
                </div>
              ) : (
                <div style={{ padding: "52px 26px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>⚖️</div>
                  <h3 style={{ color: C.text, fontWeight: 700, fontSize: "1.2rem", marginBottom: 10 }}>Dossier reçu <GoldText>✓</GoldText></h3>
                  <p style={{ color: C.muted, marginBottom: 20, lineHeight: 1.7, fontSize: ".9rem" }}>Merci <strong style={{ color: C.text }}>{form.firstName}</strong> !<br />Un consultant TalentFlux vous répond sous <strong style={{ color: C.blueL }}>2h ouvrées</strong>.</p>
                  <button onClick={resetForm} style={{ padding: "10px 24px", borderRadius: 11, border: `1px solid rgba(116,143,252,.3)`, background: "rgba(59,91,219,.07)", color: C.blueL, fontWeight: 600, cursor: "pointer", fontSize: ".86rem", fontFamily: "'DM Sans',sans-serif" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ background: "rgba(6,8,15,.95)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 22 }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: ".88rem", marginBottom: 15, color: C.text }}>Contact direct</h3>
                {[{ icon: Mail, label: "Email", value: "info@talentflux.ch", href: "mailto:info@talentflux.ch" }, { icon: Phone, label: "Tél.", value: "+41 76 592 88 06", href: "tel:+41765928806" }, { icon: MapPin, label: "Siège", value: "Yverdon-les-Bains, VD", href: null }].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "rgba(59,91,219,.1)", border: `1px solid rgba(116,143,252,.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={12} style={{ color: C.blueL }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color: C.subtle, fontSize: ".63rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      {href ? <a href={href} style={{ color: "#CBD5E1", fontSize: ".82rem", textDecoration: "none" }}>{value}</a> : <span style={{ color: "#CBD5E1", fontSize: ".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg,rgba(59,91,219,.1),rgba(116,143,252,.05))", border: `1px solid rgba(116,143,252,.2)`, borderRadius: 20, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 11 }}>
                  <Clock size={13} style={{ color: C.blueL }} />
                  <span style={{ color: C.text, fontWeight: 700, fontSize: ".85rem" }}>Délais</span>
                </div>
                {[["Accusé de réception", "< 2h"], ["Premier brief confidentiel", "< 24h"], ["Premiers profils présentés", "6-10 jours"]].map(([l, d]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(255,255,255,.04)` }}>
                    <span style={{ color: C.muted, fontSize: ".78rem" }}>{l}</span>
                    <span style={{ color: C.blueL, fontSize: ".73rem", fontWeight: 700, background: "rgba(59,91,219,.1)", padding: "2px 8px", borderRadius: 5 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(6,8,15,.9)", border: `1px solid ${C.border}`, borderRadius: 20, padding: 18 }}>
                {[["✓", "Aucun frais avant embauche"], ["✓", "Confidentialité & NDA si requis"], ["✓", "Vérification brevet & barreau"], ["✓", "Garantie remplacement 3 mois"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 9, padding: "6px 0", alignItems: "center" }}>
                    <span style={{ color: C.blueL, fontWeight: 700, fontSize: ".9rem" }}>{icon}</span>
                    <span style={{ color: C.muted, fontSize: ".8rem" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SILO SEO — Vous recrutez aussi dans... ══ */}
      <section style={{ padding: "48px 2rem", background: "rgba(59,91,219,.04)", borderTop: `1px solid rgba(59,91,219,.15)`, borderBottom: `1px solid rgba(59,91,219,.15)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: C.blueL, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>✦ Nos autres expertises</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,3vw,1.9rem)", color: C.text, marginBottom: 6 }}>Vous recrutez aussi dans...</h2>
            <p style={{ color: "#64748B", fontSize: ".88rem" }}>TalentFlux opère sur 6 secteurs spécialisés en Suisse.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { href: "/finance", label: "💰 Finance & Contrôle", color: "#D4AF5A", sub: "Compliance · FINMA · CFO" },
              { href: "/pharma",  label: "🔬 Pharma & Life Sciences", color: "#C026D3", sub: "GMP · Swissmedic · AR" },
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
            <span style={{ color: C.subtle, fontSize: ".7rem" }}>· Juridique · Yverdon-les-Bains, VD</span>
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
