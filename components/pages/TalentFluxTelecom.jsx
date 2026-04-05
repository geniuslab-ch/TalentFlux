"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useEffect, useRef } from "react";
import {
  Radio, Signal, Antenna, Satellite, Waves, MapPin,
  ArrowRight, CheckCircle, ChevronDown, Star,
  Send, Phone, Mail, Upload, X, FileText,
  AlertCircle, Clock, Users, Shield, Award,
  Building2, Zap, Database, Globe
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

const C = {
  bg:     "#080D1A",
  card:   "rgba(8,18,40,0.85)",
  border: "rgba(255,255,255,0.07)",
  text:   "#F0F6FF",
  muted:  "#7EA8D0",
  subtle: "#2D5A8A",
  sky:    "#0EA5E9",
  skyL:   "#38BDF8",
  skyD:   "#0369A1",
  cyan:   "#06B6D4",
  navy:   "#1E3A5F",
  gold:   "#D4AF5A",
  grad:   "linear-gradient(135deg, #0369A1 0%, #0EA5E9 50%, #38BDF8 100%)",
};

const GradientText = ({ children }) => (
  <span style={{ background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #7DD3FC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>
);

const InputField = ({ label, type="text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{ display:"block", color:C.subtle, fontSize:".7rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:7 }}>
      {label} {required && <span style={{ color:C.sky }}>*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width:"100%", padding:"12px 15px", borderRadius:12, background:"rgba(4,12,28,0.8)", border:`1px solid ${C.border}`, color:C.text, fontSize:".88rem", outline:"none", transition:"all .25s", fontFamily:"'DM Sans',sans-serif" }}
      onFocus={e => { e.target.style.borderColor="rgba(56,189,248,0.5)"; e.target.style.boxShadow="0 0 0 3px rgba(14,165,233,0.07)"; }}
      onBlur={e => { e.target.style.borderColor=C.border; e.target.style.boxShadow="none"; }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label style={{ display:"block", color:C.subtle, fontSize:".7rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:7 }}>{label}</label>
    <select value={value} onChange={onChange}
      style={{ width:"100%", padding:"12px 15px", borderRadius:12, background:"rgba(4,12,28,0.8)", border:`1px solid ${C.border}`, color:C.text, fontSize:".88rem", outline:"none", transition:"all .25s", fontFamily:"'DM Sans',sans-serif", cursor:"pointer", appearance:"none" }}
      onFocus={e => { e.target.style.borderColor="rgba(56,189,248,0.5)"; }}
      onBlur={e => { e.target.style.borderColor=C.border; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background:"#080D1A" }}>{o.label}</option>)}
    </select>
  </div>
);

const faqData = [
  { icon: Signal, color: C.skyL, bg:"rgba(56,189,248,0.1)", border:"rgba(56,189,248,0.2)",
    hint:"La spécialisation", question:"Vous connaissez vraiment le secteur télécom en Suisse ?",
    answer:"Notre réseau couvre les profils RNI, RF planning, géomatique télécom, infrastructure passive et fibre. Nous connaissons les procédures cantonales ORNI, les outils Narda et Rohde & Schwarz, et les process de dépôt chez Swisscom, Sunrise et Salt.",
    highlight:"Spécialistes télécom suisse", hC:C.skyL, hBg:"rgba(56,189,248,.08)", hBo:"rgba(56,189,248,.2)" },
  { icon: Clock, color:C.cyan, bg:"rgba(6,182,212,0.1)", border:"rgba(6,182,212,0.2)",
    hint:"La réactivité", question:"Ces profils sont extrêmement rares — comment vous trouvez ?",
    answer:"Notre vivier est constitué en permanence, pas à la demande. Spécialistes RNI, géomaticiens télécom, RF planners et pilotes de drone certifiés OFAC sont dans notre base avant même que vous n'ayez un besoin. Délai moyen : 5-8 jours pour un profil senior.",
    highlight:"5-8 jours pour profils spécialisés", hC:C.cyan, hBg:"rgba(6,182,212,.08)", hBo:"rgba(6,182,212,.2)" },
  { icon: Shield, color:C.gold, bg:"rgba(212,175,90,0.1)", border:"rgba(212,175,90,0.2)",
    hint:"La garantie", question:"Et si le profil ne convient pas après l'embauche ?",
    answer:"Garantie de remplacement 3 mois. Si le candidat quitte le poste ou ne satisfait pas dans les 3 premiers mois, nous relançons le processus entièrement à nos frais. Sans négociation.",
    highlight:"Remplacement garanti 3 mois", hC:C.gold, hBg:"rgba(212,175,90,.08)", hBo:"rgba(212,175,90,.2)" },
  { icon: Award, color:"#A78BFA", bg:"rgba(167,139,250,0.1)", border:"rgba(167,139,250,0.2)",
    hint:"La vérification", question:"Comment vérifiez-vous les certifications OFAC et les connaissances ORNI ?",
    answer:"Nous exigeons les attestations OFAC en cours de validité et vérifions les connaissances ORNI en entretien avec des questions techniques précises (valeurs limites par bande de fréquence, procédures cantonales, normes EN 50492). Un candidat qui ne connaît pas les VLI de mémoire n'est pas un expert.",
    highlight:"Vérification technique avant présentation", hC:"#A78BFA", hBg:"rgba(167,139,250,.08)", hBo:"rgba(167,139,250,.2)" },
];

const FAQItem = ({ item, idx }) => {
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  const Icon = item.icon;
  return (
    <div ref={ref} style={{ background:"rgba(8,18,40,0.85)", border:open?`1px solid rgba(56,189,248,.3)`:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden", boxShadow:open?"0 0 28px rgba(14,165,233,.06)":"none", transition:`all .3s ease ${idx*80}ms`, opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)" }}>
      <button onClick={() => setOpen(!open)} style={{ width:"100%", padding:"18px 22px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:14, textAlign:"left" }}>
        <div style={{ display:"flex", alignItems:"center", gap:13 }}>
          <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:item.bg, border:`1px solid ${item.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon size={17} style={{ color:item.color }} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ color:C.text, fontWeight:700, fontSize:".93rem", fontFamily:"'Sora',sans-serif" }}>{item.question}</div>
            <div style={{ color:C.subtle, fontSize:".74rem", marginTop:2 }}>{item.hint}</div>
          </div>
        </div>
        <div style={{ width:24, height:24, borderRadius:7, flexShrink:0, background:open?"rgba(56,189,248,.15)":"rgba(255,255,255,.05)", display:"flex", alignItems:"center", justifyContent:"center", transform:open?"rotate(180deg)":"rotate(0)", transition:"all .3s" }}>
          <ChevronDown size={13} style={{ color:open?C.skyL:C.muted }} />
        </div>
      </button>
      <div style={{ maxHeight:open?280:0, overflow:"hidden", transition:"max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ padding:isMobile?"0 16px 18px":"0 22px 20px 73px" }}>
          <p style={{ color:C.muted, lineHeight:1.8, fontSize:".87rem" }}>{item.answer}</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:11, padding:"7px 13px", borderRadius:9, fontWeight:700, fontSize:".8rem", background:item.hBg, border:`1px solid ${item.hBo}`, color:item.hC }}>
            <CheckCircle size={12} style={{ color:item.hC }} /> {item.highlight}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Composant carte problème (hooks hors map) ──────────────
const TelecomProblemCard = ({ icon: Icon, color, title, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ background:C.card, border:`1px solid ${C.border}`, borderTop:`2px solid ${color}`, borderRadius:20, padding:28, transition:`all .6s ease ${delay}ms`, opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(30px)" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 30px ${color}22`; e.currentTarget.style.transform="translateY(-4px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{ color, marginBottom:18 }}><Icon size={30} strokeWidth={1.5} /></div>
      <h3 style={{ color:C.text, fontWeight:700, fontSize:"1.02rem", marginBottom:10 }}>{title}</h3>
      <p style={{ color:C.muted, lineHeight:1.7, fontSize:".88rem" }}>{desc}</p>
    </div>
  );
};

// ── Composant carte feature (hooks hors map) ───────────────
const TelecomFeatureCard = ({ icon: Icon, accent, sub, title, desc, delay }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?`rgba(14,165,233,.06)`:C.card, border:hov?`1px solid rgba(56,189,248,.3)`:`1px solid ${C.border}`, borderRadius:20, padding:28, transition:`all .5s ease ${delay}ms`, opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(25px)", position:"relative", overflow:"hidden" }}>
      <div style={{ marginBottom:16, display:"inline-flex", padding:11, borderRadius:12, background:`${accent}18` }}>
        <Icon size={22} style={{ color:accent }} strokeWidth={1.5} />
      </div>
      <div style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:7, color:accent }}>{sub}</div>
      <h3 style={{ color:C.text, fontWeight:700, fontSize:"1.02rem", marginBottom:9 }}>{title}</h3>
      <p style={{ color:C.muted, lineHeight:1.7, fontSize:".87rem" }}>{desc}</p>
    </div>
  );
};

export default function TalentFluxTelecom() {
  const { isMobile, isTablet } = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", company:"", role:"", message:"", sector:"telecom", specialite:"", certif_drone:false, file:null });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleFile = file => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10*1024*1024) { setError("Fichier trop lourd (max 10 MB)."); return; }
    setError(null); setForm(f => ({ ...f, file }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.firstName || !form.lastName || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    setLoading(true);
    try {
      let pdfFileName=null, pdfFileUrl=null;
      if (form.file) {
        const san = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]/g,"_");
        const fn = `${Date.now()}_${san(form.firstName)}_${san(form.lastName)}.pdf`;
        const { error:ue } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fn}`, form.file, { contentType:"application/pdf" });
        if (ue) throw new Error("Upload : "+ue.message);
        pdfFileName=fn; pdfFileUrl=`submissions/${fn}`;
      }
      const { error:ie } = await supabase.from("contact_submissions").insert([{
        type:activeTab, first_name:form.firstName.trim(), last_name:form.lastName.trim(),
        email:form.email.trim().toLowerCase(), phone:form.phone.trim()||null,
        company:form.company.trim()||null, sector:"telecom",
        role:form.role.trim()||null, message:form.message.trim()||null,
        pdf_file_name:pdfFileName, pdf_file_url:pdfFileUrl, status:"new",
      }]);
      if (ie) throw new Error("Erreur : "+ie.message);
      setSubmitted(true);
    } catch(err) {
      setError(err.message||"Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const resetForm = () => { setSubmitted(false); setError(null); setForm({ firstName:"",lastName:"",email:"",phone:"",company:"",role:"",message:"",sector:"telecom",specialite:"",certif_drone:false,file:null }); };
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:rgba(56,189,248,0.25); color:#fff; }
        input::placeholder, textarea::placeholder { color:#1E3A5F; }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.3}50%{opacity:.75} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(400%)} }
        .signal-grid {
          background-image:
            linear-gradient(rgba(14,165,233,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,.03) 1px, transparent 1px);
          background-size:48px 48px;
        }
        @media(max-width:768px){ .tf-nav-desktop{display:none!important} .tf-badge{display:none!important} }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 2rem", height:66, background:scrolled?"rgba(8,13,26,0.96)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?`1px solid ${C.border}`:"none", transition:"all .3s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height:36, objectFit:"contain" }} />
          <span style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:C.skyL, background:"rgba(14,165,233,.1)", border:`1px solid rgba(14,165,233,.3)`, borderRadius:4, padding:"2px 7px" }}>TÉLÉCOM</span>
        </div>
        
        <div style={{ display:isMobile?"none":"flex", gap:"1.6rem", alignItems:"center" }}>
          {["Solution","Métiers","FAQ"].map(item => (
            <span key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color:C.muted, fontSize:".85rem", cursor:"pointer", transition:"color .2s" }} onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.muted}>{item}</span>
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
            <Link href="/telecom" style={{ color: "#F1F5F9", fontSize: ".75rem", fontWeight: 700, textDecoration: "none" }}>FR</Link>
            <span style={{ color: "#334155", fontSize: ".7rem" }}>|</span>
            <Link href="/en/telecom" style={{ color: "#64748B", fontSize: ".75rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#F1F5F9"} onMouseLeave={e => e.currentTarget.style.color="#64748B"}>EN</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="signal-grid" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", padding:isMobile?"90px 1.2rem 60px":"120px 2rem 80px" }}>
        <div style={{ position:"absolute", top:"10%", left:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,.1),transparent 70%)", animation:"pulseGlow 6s ease-in-out infinite", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", right:"5%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,.07),transparent 70%)", animation:"pulseGlow 7s ease-in-out infinite 2s", pointerEvents:"none" }} />

        <div style={{ position:"absolute", left:"3%", top:"40%", display:isMobile?"none":"block", background:"rgba(8,18,40,.95)", border:`1px solid rgba(56,189,248,.2)`, borderRadius:14, padding:"12px 16px", animation:"float 5s ease-in-out infinite", pointerEvents:"none", zIndex:1, minWidth:165 }}>
          <div style={{ color:C.subtle, fontSize:".62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>Pénurie CH</div>
          <div style={{ color:C.text, fontSize:".82rem", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.skyL, boxShadow:`0 0 6px ${C.skyL}`, flexShrink:0, display:"inline-block" }} /> Spécialistes RNI rares
          </div>
        </div>
        <div style={{ position:"absolute", right:"3%", top:"44%", display:isMobile?"none":"block", background:"rgba(8,18,40,.95)", border:`1px solid rgba(212,175,90,.2)`, borderRadius:14, padding:"12px 16px", animation:"float 5s ease-in-out infinite 1.8s", pointerEvents:"none", zIndex:1, minWidth:165 }}>
          <div style={{ color:C.subtle, fontSize:".62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>Secteur</div>
          <div style={{ color:C.text, fontSize:".82rem", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.gold, boxShadow:`0 0 6px ${C.gold}`, flexShrink:0, display:"inline-block" }} /> Télécom · 5G · ORNI
          </div>
        </div>

        <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
          <div style={{ marginBottom:22, display:"inline-flex", alignItems:"center", gap:14 }}>
            {[Signal, Waves, Satellite, Radio].map((Icon, i) => (
              <div key={i} style={{ color:C.sky, opacity:0.6+i*0.1 }}><Icon size={22+i*2} strokeWidth={1.5} /></div>
            ))}
          </div>

          <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:C.skyL, marginBottom:16 }}>
            Recrutement · Télécommunications & Infrastructure télécom
          </p>

          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.8rem,4.5vw,3.2rem)", fontWeight:800, lineHeight:1.15, letterSpacing:"-.02em", color:C.text, marginBottom:22 }}>
            Recrutement Télécom & Réseaux en Suisse :<br />
            <GradientText>les experts ORNI ne répondent pas aux offres génériques.</GradientText>
          </h1>

          <p style={{ color:C.muted, fontSize:".97rem", lineHeight:1.8, maxWidth:580, margin:"0 auto 36px" }}>
            Spécialistes RNI, RF planners, géomaticiens télécom, pilotes drone certifiés OFAC — des profils introuvables via une agence généraliste. TalentFlux les connaît par leur nom.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ background:C.grad, border:"none", color:"#fff", padding:"15px 32px", borderRadius:14, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:".95rem", cursor:"pointer", display:"flex", alignItems:"center", gap:9, boxShadow:"0 0 28px rgba(14,165,233,.35)", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 0 50px rgba(56,189,248,.6)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 0 28px rgba(14,165,233,.35)";}}>
              <Users size={17} /> Trouver mon expert <ArrowRight size={16} />
            </button>
            <Link href="/candidature/telecom" style={{ background:"rgba(14,165,233,.08)", border:"1.5px solid rgba(56,189,248,.4)", color:C.skyL, padding:"15px 32px", borderRadius:14, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:".95rem", display:"flex", alignItems:"center", gap:9, textDecoration:"none", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.background="rgba(14,165,233,.14)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="rgba(14,165,233,.08)";}}>
              <Signal size={17} /> Déposer ma candidature <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display:isMobile?"grid":"flex", gridTemplateColumns:"1fr 1fr", gap:isMobile?18:32, justifyContent:"center", flexWrap:"wrap", marginTop:52, paddingTop:34, borderTop:`1px solid ${C.border}` }}>
            {[{v:"5-8j",l:"Délai profil spécialisé"},{v:"100%",l:"Au succès"},{v:"3 mois",l:"Garantie remplacement"},{v:"CH",l:"Romande & Alémanique"}].map(({ v, l }, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"1.8rem", fontWeight:900, fontFamily:"'Sora',sans-serif", marginBottom:3 }}><GradientText>{v}</GradientText></div>
                <div style={{ color:C.subtle, fontSize:".75rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:44, opacity:.3, cursor:"pointer" }} onClick={() => scrollTo("solution")}><ChevronDown size={22} color={C.skyL} /></div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section style={{ padding:isMobile?"56px 1.2rem":"88px 2rem", maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <div style={{ color:"#EF4444", fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>⚠ Le vrai problème</div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:800, lineHeight:1.2, color:C.text }}>
            Un spécialiste RNI ou RF planner<br /><GradientText>ne se trouve pas sur un portail d'emploi.</GradientText>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:20 }}>
          {[
            { icon:Signal, color:"#F97316", title:"Profils ultra-spécialisés", desc:"Un spécialiste RNI maîtrise l'ORNI, les appareils Narda, les procédures cantonales, et la certification drone OFAC. Ce profil ne se sourcera jamais via une annonce générique." },
            { icon:Globe, color:"#EF4444", title:"Pénurie structurelle", desc:"La Suisse déploie la 5G sur 6 000+ sites. Les profils RNI et RF planning qualifiés sont 3-4× moins nombreux que les besoins. Vous n'êtes pas seul à les chercher." },
            { icon:Database, color:"#DC2626", title:"Invisible aux agences classiques", desc:"Ces experts ne répondent pas aux offres. Ils sont en poste, connus dans un réseau très fermé d'opérateurs, de sous-traitants et d'autorités cantonales." },
          ].map(({ icon:Icon, color, title, desc }, i) => (
            <TelecomProblemCard key={i} icon={Icon} color={color} title={title} desc={desc} delay={i*100} />
          ))}
        </div>
      </section>

      {/* MÉTIERS */}
      <section id="métiers" style={{ padding:isMobile?"56px 1.2rem":"88px 2rem", background:"rgba(8,18,40,.4)", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ color:C.gold, fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>✦ Nos spécialités</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", fontWeight:800, color:C.text }}>
              Tous les métiers de <GradientText>l'infrastructure télécom suisse</GradientText>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":isTablet?"repeat(3,1fr)":"repeat(4,1fr)", gap:14 }}>
            {[
              { icon:Waves,     label:"Spécialiste RNI",        lvl:"ORNI · EN 50492 · Narda" },
              { icon:Signal,    label:"RF Planner",              lvl:"Atoll · iBWave · 5G NR" },
              { icon:MapPin,    label:"Géomaticien télécom",     lvl:"ArcGIS · QGIS · CFC/HES" },
              { icon:Building2, label:"Infra. passive",          lvl:"Mâts · Shelters · Civil" },
              { icon:Globe,     label:"Ingénieur transmission",  lvl:"IP/MPLS · SDH · microwave" },
              { icon:Zap,       label:"Technicien fibre",        lvl:"FTTH · FTTB · splicing" },
              { icon:Shield,    label:"Expert conformité",       lvl:"OFCOM · LTC · permis" },
              { icon:Satellite, label:"Pilote drone certifié",   lvl:"OFAC A1/A2/A3 · DJI" },
            ].map(({ icon:Icon, label, lvl }, i) => (
              <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 16px", textAlign:"center", transition:"all .3s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(56,189,248,.3)"; e.currentTarget.style.background="rgba(14,165,233,.06)"; e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card; e.currentTarget.style.transform="translateY(0)";}}>
                <Icon size={22} style={{ color:C.skyL, marginBottom:10 }} strokeWidth={1.5} />
                <div style={{ color:C.text, fontWeight:700, fontSize:".84rem", marginBottom:5 }}>{label}</div>
                <div style={{ color:C.subtle, fontSize:".7rem", background:"rgba(14,165,233,.06)", padding:"3px 8px", borderRadius:5, display:"inline-block" }}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding:isMobile?"56px 1.2rem":"88px 2rem", maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <div style={{ color:C.skyL, fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>✦ Notre approche</div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.6rem)", fontWeight:800, lineHeight:1.2, color:C.text }}>
            On connaît la valeur des VLI ORNI.<br /><GradientText>On valide les certifications avant vous.</GradientText>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:20, marginBottom:40 }}>
          <TelecomFeatureCard icon={Shield} accent="#0EA5E9" sub="Vérification #1" title="Certifications validées" desc="Certification OFAC drone (A1/A2/A3) en cours de validité. Niveau ORNI testé avec les valeurs limites réelles par bande de fréquence. Références opérateurs vérifiées." delay={0} />
            <TelecomFeatureCard icon={MapPin} accent={C.cyan} sub="Vérification #2" title="Réseau local suisse" desc="Notre réseau couvre Vaud, Genève, Berne, Zurich et la Suisse alémanique. Profils locaux connaissant les procédures cantonales — pas de formation ORNI depuis zéro." delay={100} />
            <TelecomFeatureCard icon={Waves} accent={C.gold} sub="Vérification #3" title="Validation technique" desc="Un spécialiste RNI qui ne connaît pas 4 V/m (900 MHz) de mémoire n'est pas senior. On pose les questions que votre DRH ne pose pas." delay={200} />
        </div>

        {/* Étapes */}
        <div style={{ padding:isMobile?24:38, background:"rgba(8,13,26,.8)", borderRadius:22, border:`1px solid ${C.border}` }}>
          <div style={{ color:C.muted, fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:26, textAlign:"center" }}>Le processus en 4 étapes</div>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:isMobile?20:14 }}>
            {[
              { n:"01", t:"Brief",     d:"30 min pour cerner le profil et les normes requises", icon:Signal },
              { n:"02", t:"Sourcing",  d:"Activation réseau sous 24h — vivier existant",         icon:Globe },
              { n:"03", t:"Validation",d:"Certifications vérifiées + questions ORNI testées",    icon:CheckCircle },
              { n:"04", t:"Suivi",     d:"Accompagnement 3 mois post-embauche",                  icon:Shield },
            ].map(({ n, t, d, icon:Icon }, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:46, height:46, borderRadius:"50%", margin:"0 auto 11px", background:"linear-gradient(135deg,rgba(14,165,233,.2),rgba(56,189,248,.1))", border:`1px solid rgba(56,189,248,.25)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon size={18} style={{ color:C.skyL }} strokeWidth={1.5} />
                </div>
                <div style={{ color:C.subtle, fontSize:".66rem", fontWeight:700, marginBottom:3 }}>{n}</div>
                <div style={{ color:C.text, fontWeight:700, marginBottom:4, fontSize:".9rem" }}>{t}</div>
                <div style={{ color:C.subtle, fontSize:".75rem", lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ padding:isMobile?"48px 1.2rem":"72px 2rem", background:"rgba(8,18,40,.3)", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto", display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)", gap:20 }}>
          {[
            { q:"Nous cherchions un spécialiste RNI depuis 4 mois via des annonces. TalentFlux nous a proposé 2 profils qualifiés en une semaine. Leurs connaissances ORNI étaient réelles, vérifiées.", a:"Responsable RH, opérateur télécom VD" },
            { q:"Ce qui nous a convaincus : ils ont posé les bonnes questions sur les outils de mesure et les cantons d'intervention dès le premier appel. Aucune autre agence n'avait fait ça.", a:"Directeur Technique, bureau télécom Lausanne" },
            { q:"Le candidat qu'ils nous ont présenté connaissait déjà les procédures du canton de Vaud et avait sa certification OFAC à jour. Operational day one.", a:"Chef de projet, entreprise ICT Genève" },
          ].map(({ q, a }, i) => (
            <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, padding:24 }}>
              <div style={{ display:"flex", gap:3, marginBottom:13 }}>
                {Array(5).fill(0).map((_,j) => <Star key={j} size={12} fill={C.gold} color={C.gold} />)}
              </div>
              <p style={{ color:"#CBD5E1", lineHeight:1.75, fontSize:".86rem", marginBottom:13, fontStyle:"italic" }}>"{q}"</p>
              <p style={{ color:C.subtle, fontSize:".75rem", fontWeight:600 }}>— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding:isMobile?"56px 1.2rem":"88px 2rem" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:46 }}>
            <div style={{ color:C.skyL, fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>✦ Vos questions</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", fontWeight:800, lineHeight:1.2, color:C.text }}>
              Tout ce que vous voulez savoir<br /><GradientText>avant de nous appeler</GradientText>
            </h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {faqData.map((item, i) => <FAQItem key={i} item={item} idx={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:isMobile?"56px 1.2rem":"88px 2rem", background:"rgba(8,18,40,.4)", borderTop:`1px solid ${C.border}`, position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,rgba(14,165,233,.06),transparent 65%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1060, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:46 }}>
            <div style={{ color:C.skyL, fontSize:".72rem", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", marginBottom:14 }}>✦ Passez à l'action</div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", fontWeight:800, lineHeight:1.2, color:C.text, marginBottom:10 }}>
              Trouvez votre expert<br /><GradientText>télécom en 5-8 jours.</GradientText>
            </h2>
            <p style={{ color:C.muted, fontSize:".92rem", lineHeight:1.7 }}>Aucun frais avant l'embauche. Certifications vérifiées. Satisfaction garantie.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 300px", gap:22 }}>
            {/* FORM */}
            <div style={{ background:"rgba(6,12,26,.95)", border:`1px solid ${C.border}`, borderRadius:22, overflow:"hidden" }}>
              <div style={{ display:"flex", borderBottom:`1px solid ${C.border}` }}>
                {[{key:"recruiter",label:"🏢 Je recrute"},{key:"candidate",label:"📡 Je suis candidat"}].map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ flex:1, padding:"15px", border:"none", cursor:"pointer", background:activeTab===key?"linear-gradient(135deg,rgba(14,165,233,.15),rgba(56,189,248,.08))":"transparent", borderBottom:`2px solid ${activeTab===key?C.skyL:"transparent"}`, color:activeTab===key?C.text:C.subtle, fontWeight:700, fontSize:".84rem", transition:"all .25s", fontFamily:"'DM Sans',sans-serif" }}>{label}</button>
                ))}
              </div>

              {!submitted ? (
                <div style={{ padding:24 }}>
                  <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12, marginBottom:12 }}>
                    <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                    <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                    <InputField label="Email" type="email" placeholder="s.martin@telco.ch" value={form.email} onChange={set("email")} required />
                    <InputField label="Téléphone" type="tel" placeholder="+41 76 592 88 06" value={form.phone} onChange={set("phone")} />
                    {activeTab === "recruiter" ? <>
                      <InputField label="Entreprise" placeholder="Opérateur / Bureau télécom" value={form.company} onChange={set("company")} required />
                      <SelectField label="Profil recherché" value={form.specialite} onChange={set("specialite")} options={[
                        {value:"",label:"Sélectionner"},
                        {value:"Spécialiste RNI",label:"Spécialiste RNI"},
                        {value:"RF Planner",label:"RF Planner"},
                        {value:"Géomaticien télécom",label:"Géomaticien télécom"},
                        {value:"Technicien fibre",label:"Technicien fibre"},
                        {value:"Ingénieur transmission",label:"Ingénieur transmission"},
                        {value:"Pilote drone certifié",label:"Pilote drone certifié OFAC"},
                        {value:"Expert conformité",label:"Expert conformité OFCOM/ORNI"},
                      ]} />
                    </> : <>
                      <SelectField label="Ma spécialité" value={form.specialite} onChange={set("specialite")} options={[
                        {value:"",label:"Sélectionner"},
                        {value:"Spécialiste RNI",label:"Spécialiste RNI"},
                        {value:"RF Planner",label:"RF Planner"},
                        {value:"Géomaticien",label:"Géomaticien"},
                        {value:"Technicien fibre",label:"Technicien fibre"},
                        {value:"Pilote drone",label:"Pilote drone OFAC"},
                        {value:"Autre",label:"Autre profil télécom"},
                      ]} />
                      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, background:"rgba(14,165,233,.05)", border:`1px solid ${C.border}` }}>
                        <input type="checkbox" checked={form.certif_drone} onChange={e => setForm(f => ({...f, certif_drone:e.target.checked}))} style={{ width:16, height:16, accentColor:C.sky }} />
                        <div>
                          <div style={{ color:C.text, fontWeight:600, fontSize:".84rem" }}>Certification drone OFAC</div>
                          <div style={{ color:C.subtle, fontSize:".72rem" }}>A1/A2/A3 en cours de validité</div>
                        </div>
                      </div>
                    </>}
                  </div>

                  <div style={{ marginBottom:12 }}>
                    <label style={{ display:"block", color:C.subtle, fontSize:".7rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:7 }}>
                      {activeTab==="recruiter"?"Description du besoin":"Parcours et certifications"}
                    </label>
                    <textarea placeholder={activeTab==="recruiter"?"Ex: Spécialiste RNI autonome pour constituer les fiches ORNI et dossiers de permis, canton VD/GE, certification drone souhaitée...":"Ex: CFC géomaticien, 5 ans expérience RNI, certifié Narda SRM-3006, OFAC A2 valide, bilingue FR/DE, disponible mai..."}
                      value={form.message} onChange={set("message")} rows={3}
                      style={{ width:"100%", padding:"12px 15px", borderRadius:12, background:"rgba(4,10,24,.8)", border:`1px solid ${C.border}`, color:C.text, fontSize:".88rem", outline:"none", resize:"vertical", transition:"all .25s", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}
                      onFocus={e=>{e.target.style.borderColor="rgba(56,189,248,.5)"; e.target.style.boxShadow="0 0 0 3px rgba(14,165,233,.06)";}}
                      onBlur={e=>{e.target.style.borderColor=C.border; e.target.style.boxShadow="none";}}
                    />
                  </div>

                  {/* Upload */}
                  <div style={{ marginBottom:16 }}>
                    <label style={{ display:"block", color:C.subtle, fontSize:".7rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", marginBottom:7 }}>
                      {activeTab==="recruiter"?"Cahier des charges":"CV"} <span style={{ color:C.subtle, fontWeight:400, marginLeft:6, textTransform:"none" }}>— PDF · Max 10 MB · Optionnel</span>
                    </label>
                    {!form.file ? (
                      <div onClick={() => fileRef.current?.click()}
                        onDragOver={e=>{e.preventDefault(); setDragOver(true);}}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e=>{e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]);}}
                        style={{ border:dragOver?`2px dashed ${C.skyL}`:`2px dashed ${C.border}`, borderRadius:11, padding:16, textAlign:"center", cursor:"pointer", transition:"all .25s" }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(56,189,248,.4)"}
                        onMouseLeave={e=>{if(!dragOver)e.currentTarget.style.borderColor=C.border;}}>
                        <Upload size={19} style={{ color:C.subtle, margin:"0 auto 7px" }} />
                        <p style={{ color:C.muted, fontSize:".82rem" }}><span style={{ color:C.skyL, fontWeight:600 }}>Cliquez</span> ou glissez votre PDF</p>
                        <input ref={fileRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])} />
                      </div>
                    ) : (
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:11, background:"rgba(14,165,233,.06)", border:`1px solid rgba(56,189,248,.2)` }}>
                        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                          <FileText size={16} style={{ color:C.skyL }} />
                          <div>
                            <p style={{ color:C.text, fontWeight:600, fontSize:".84rem" }}>{form.file.name}</p>
                            <p style={{ color:C.subtle, fontSize:".7rem" }}>{(form.file.size/1024/1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => setForm(f=>({...f,file:null}))} style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", borderRadius:7, padding:"4px 6px", cursor:"pointer", color:"#EF4444" }}><X size={13}/></button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12, padding:"10px 13px", borderRadius:10, background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)" }}>
                      <AlertCircle size={14} style={{ color:"#EF4444", flexShrink:0 }} />
                      <span style={{ color:"#FCA5A5", fontSize:".83rem" }}>{error}</span>
                    </div>
                  )}

                  <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", padding:"14px 22px", borderRadius:13, border:"none", background:loading?"rgba(14,165,233,.4)":C.grad, color:"#fff", fontWeight:700, fontSize:".92rem", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:9, boxShadow:loading?"none":"0 4px 22px rgba(14,165,233,.3)", transition:"all .3s", fontFamily:"'DM Sans',sans-serif" }}
                    onMouseEnter={e=>{if(!loading){e.currentTarget.style.boxShadow="0 8px 36px rgba(56,189,248,.55)"; e.currentTarget.style.transform="translateY(-2px)";}}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 4px 22px rgba(14,165,233,.3)"; e.currentTarget.style.transform="translateY(0)";}}>
                    {loading ? <><div style={{ width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin .8s linear infinite" }}/>Envoi...</> : <><Send size={16}/>{activeTab==="recruiter"?"Trouver mon expert télécom":"Envoyer ma candidature"}</>}
                  </button>
                  <p style={{ color:C.subtle, fontSize:".7rem", textAlign:"center", marginTop:9 }}>🔒 Données sécurisées · RGPD conforme</p>
                </div>
              ) : (
                <div style={{ padding:"52px 26px", textAlign:"center" }}>
                  <div style={{ fontSize:40, marginBottom:16 }}>📡</div>
                  <h3 style={{ color:C.text, fontWeight:700, fontSize:"1.2rem", marginBottom:10 }}>Demande reçue <GradientText>✓</GradientText></h3>
                  <p style={{ color:C.muted, marginBottom:20, lineHeight:1.7, fontSize:".9rem" }}>Merci <strong style={{ color:C.text }}>{form.firstName}</strong> !<br />Un consultant TalentFlux vous répond sous <strong style={{ color:C.skyL }}>24h</strong>.</p>
                  <button onClick={resetForm} style={{ padding:"10px 24px", borderRadius:11, border:`1px solid rgba(56,189,248,.3)`, background:"rgba(14,165,233,.07)", color:C.skyL, fontWeight:600, cursor:"pointer", fontSize:".86rem", fontFamily:"'DM Sans',sans-serif" }}>Nouvelle demande</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
              <div style={{ background:"rgba(6,12,26,.95)", border:`1px solid ${C.border}`, borderRadius:20, padding:22 }}>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:15, color:C.text }}>Nous contacter</h3>
                {[{icon:Mail,label:"Email",value:"info@talentflux.ch",href:"mailto:info@talentflux.ch"},{icon:Phone,label:"Tél.",value:"+41 76 592 88 06",href:"tel:+41765928806"},{icon:MapPin,label:"Adresse",value:"Yverdon-les-Bains, VD",href:null}].map(({ icon:Icon, label, value, href }) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ width:30, height:30, borderRadius:8, flexShrink:0, background:"rgba(14,165,233,.1)", border:`1px solid rgba(56,189,248,.15)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon size={12} style={{ color:C.skyL }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ color:C.subtle, fontSize:".65rem", fontWeight:700, textTransform:"uppercase", marginBottom:2 }}>{label}</div>
                      {href?<a href={href} style={{ color:"#CBD5E1", fontSize:".82rem", textDecoration:"none" }}>{value}</a>:<span style={{ color:"#CBD5E1", fontSize:".82rem" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background:"linear-gradient(135deg,rgba(14,165,233,.1),rgba(56,189,248,.05))", border:`1px solid rgba(56,189,248,.2)`, borderRadius:20, padding:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:11 }}>
                  <Clock size={13} style={{ color:C.skyL }} />
                  <span style={{ color:C.text, fontWeight:700, fontSize:".85rem" }}>Délais</span>
                </div>
                {[["Accusé de réception","< 2h"],["Premier brief","< 24h"],["Premiers profils","5-8 jours"]].map(([l,d]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                    <span style={{ color:C.muted, fontSize:".78rem" }}>{l}</span>
                    <span style={{ color:C.skyL, fontSize:".73rem", fontWeight:700, background:"rgba(14,165,233,.1)", padding:"2px 8px", borderRadius:5 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ background:"rgba(6,12,26,.9)", border:`1px solid ${C.border}`, borderRadius:20, padding:18 }}>
                {[["✓","Aucun frais avant embauche"],["✓","Certifications vérifiées avant présentation"],["✓","Valeurs ORNI testées en entretien"],["✓","Garantie remplacement 3 mois"]].map(([icon,text]) => (
                  <div key={text} style={{ display:"flex", gap:9, padding:"6px 0", alignItems:"center" }}>
                    <span style={{ color:C.skyL, fontWeight:700, fontSize:".9rem" }}>{icon}</span>
                    <span style={{ color:C.muted, fontSize:".8rem" }}>{text}</span>
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
        borderTop: "1px solid rgba(14,165,233,.2)",
        borderBottom: "1px solid rgba(14,165,233,.2)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#0EA5E9", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>
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
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"24px 2rem" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <img src="/logo.png" onError={(e) => e.target.style.display="none"} alt="TalentFlux" style={{ height:30, objectFit:"contain" }} />
            <span style={{ color:C.subtle, fontSize:".7rem" }}>· Télécommunications · Yverdon-les-Bains, VD</span>
          </div>
          <p style={{ color:C.subtle, fontSize:".72rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
          <div style={{ display:isMobile?"none":"flex", gap:16 }}>
            {[["Confidentialité","/privacy"],["CGU","/cgu"],["Contact", "/contact"]].map(([label,to]) => (
              <Link key={to} href={to} style={{ color:C.subtle, fontSize:".72rem", textDecoration:"none", transition:"color .2s" }} onMouseEnter={e=>e.target.style.color=C.muted} onMouseLeave={e=>e.target.style.color=C.subtle}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
