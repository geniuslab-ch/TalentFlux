import { useState, useEffect, useRef } from "react";
import {
  Send, Phone, Mail, MapPin, Upload, CheckCircle,
  ArrowLeft, Zap, X, FileText, Clock, Users, Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const GradientText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 45%, #06B6D4 75%, #14B8A6 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const InputField = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div>
    <label style={{
      display: "block", color: "#64748B", fontSize: "0.75rem",
      fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8,
    }}>
      {label} {required && <span style={{ color: "#0EA5E9" }}>*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: "100%", padding: "14px 18px", borderRadius: 14,
        background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)",
        color: "#fff", fontSize: "0.92rem", outline: "none",
        transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
      }}
      onFocus={e => {
        e.target.style.borderColor = "rgba(14,165,233,0.6)";
        e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)";
      }}
      onBlur={e => {
        e.target.style.borderColor = "rgba(255,255,255,0.09)";
        e.target.style.boxShadow = "none";
      }}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div>
    <label style={{
      display: "block", color: "#64748B", fontSize: "0.75rem",
      fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8,
    }}>
      {label} {required && <span style={{ color: "#0EA5E9" }}>*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: "100%", padding: "14px 18px", borderRadius: 14,
        background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)",
        color: value ? "#fff" : "#475569", fontSize: "0.92rem", outline: "none",
        transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
        appearance: "none",
      }}
      onFocus={e => {
        e.target.style.borderColor = "rgba(14,165,233,0.6)";
        e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)";
      }}
      onBlur={e => {
        e.target.style.borderColor = "rgba(255,255,255,0.09)";
        e.target.style.boxShadow = "none";
      }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#0F172A" }}>{o.label}</option>)}
    </select>
  </div>
);

export default function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("recruiter"); // recruiter | candidate
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", sector: "", role: "", message: "", file: null,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleFile = (file) => {
    if (file && file.type === "application/pdf" && file.size < 10 * 1024 * 1024) {
      setForm(f => ({ ...f, file }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = () => {
    if (form.email && form.firstName && form.lastName) setSubmitted(true);
  };

  const sectors = [
    { value: "", label: "Sélectionnez un secteur..." },
    { value: "it", label: "💻 IT & Technologie" },
    { value: "finance", label: "💰 Finance & Comptabilité" },
    { value: "sante", label: "🏥 Santé & Médical" },
    { value: "ingenierie", label: "⚙️ Ingénierie & Industrie" },
    { value: "rh", label: "👥 RH & Management" },
    { value: "autre", label: "Autre" },
  ];

  return (
    <div style={{ background: "#0B0F1A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        input::placeholder, textarea::placeholder { color: #334155; }
        select option { background: #0F172A; color: #fff; }
        @keyframes slide-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 70,
        background: scrolled ? "rgba(11,15,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#94A3B8" }}>
          <ArrowLeft size={18} /> <span style={{ fontSize: "0.9rem" }}>Retour</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #2563EB, #06B6D4, #14B8A6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>
            TALENT<GradientText>FLUX</GradientText>
          </span>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        padding: "110px 2rem 50px", textAlign: "center",
        background: "radial-gradient(ellipse at top, rgba(37,99,235,0.1) 0%, transparent 55%)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)",
          animation: "pulse 5s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
          background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 100, padding: "6px 18px",
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#14B8A6", boxShadow: "0 0 8px #14B8A6" }} />
          <span style={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 500 }}>Réponse sous 24h · Suisse</span>
        </div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: 14 }}>
          Parlons de votre <GradientText>prochain recrutement</GradientText>
        </h1>
        <p style={{ color: "#94A3B8", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
          Que vous soyez une entreprise à la recherche d'un expert ou un talent en quête d'opportunités — nous sommes là.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 80px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>

        {/* FORM CARD */}
        <div style={{
          background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28, overflow: "hidden",
          boxShadow: "0 0 80px rgba(37,99,235,0.07)",
        }}>
          {/* TABS */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { key: "recruiter", label: "🏢 Je recrute", icon: Building2 },
              { key: "candidate", label: "👤 Je cherche un poste", icon: Users },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex: 1, padding: "18px 20px", border: "none", cursor: "pointer",
                  background: activeTab === key
                    ? "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(20,184,166,0.1))"
                    : "transparent",
                  color: activeTab === key ? "#fff" : "#475569",
                  fontWeight: 700, fontSize: "0.9rem",
                  borderBottom: activeTab === key ? "2px solid #0EA5E9" : "2px solid transparent",
                  transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {!submitted ? (
            <div style={{ padding: 36 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <InputField label="Prénom" placeholder="Sophie" value={form.firstName} onChange={set("firstName")} required />
                <InputField label="Nom" placeholder="Martin" value={form.lastName} onChange={set("lastName")} required />
                <InputField label="Email professionnel" type="email" placeholder="sophie@acme.com" value={form.email} onChange={set("email")} required />
                <InputField label="Téléphone" type="tel" placeholder="+41 79 592 88 06" value={form.phone} onChange={set("phone")} />
                {activeTab === "recruiter" && (
                  <>
                    <InputField label="Entreprise" placeholder="Acme Corp SA" value={form.company} onChange={set("company")} required />
                    <SelectField label="Secteur" value={form.sector} onChange={set("sector")} options={sectors} required />
                  </>
                )}
                {activeTab === "candidate" && (
                  <>
                    <InputField label="Poste actuel" placeholder="Lead Developer" value={form.role} onChange={set("role")} />
                    <SelectField label="Secteur visé" value={form.sector} onChange={set("sector")} options={sectors} />
                  </>
                )}
              </div>

              {/* MESSAGE */}
              <div style={{ marginBottom: 18 }}>
                <label style={{
                  display: "block", color: "#64748B", fontSize: "0.75rem",
                  fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8,
                }}>
                  {activeTab === "recruiter" ? "Décrivez le poste à pourvoir" : "Parlez-nous de vous"}
                </label>
                <textarea
                  placeholder={activeTab === "recruiter"
                    ? "Stack technique, niveau d'expérience, contexte de l'équipe, urgence..."
                    : "Votre profil, vos attentes, votre disponibilité..."}
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  style={{
                    width: "100%", padding: "14px 18px", borderRadius: 14,
                    background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)",
                    color: "#fff", fontSize: "0.92rem", outline: "none", resize: "vertical",
                    transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
                  }}
                  onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* PDF UPLOAD */}
              <div style={{ marginBottom: 28 }}>
                <label style={{
                  display: "block", color: "#64748B", fontSize: "0.75rem",
                  fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8,
                }}>
                  {activeTab === "recruiter" ? "Job Description (PDF)" : "CV (PDF)"}
                  <span style={{ color: "#334155", fontWeight: 400, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>— Optionnel · Max 10 MB</span>
                </label>

                {!form.file ? (
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: dragOver ? "2px dashed #0EA5E9" : "2px dashed rgba(255,255,255,0.1)",
                      borderRadius: 14, padding: "28px 20px", textAlign: "center",
                      cursor: "pointer", transition: "all 0.25s",
                      background: dragOver ? "rgba(14,165,233,0.05)" : "rgba(11,15,26,0.4)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.4)"; e.currentTarget.style.background = "rgba(14,165,233,0.03)"; }}
                    onMouseLeave={e => { if (!dragOver) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(11,15,26,0.4)"; } }}
                  >
                    <Upload size={28} style={{ color: "#334155", margin: "0 auto 10px" }} />
                    <p style={{ color: "#475569", fontSize: "0.88rem" }}>
                      <span style={{ color: "#0EA5E9", fontWeight: 600 }}>Cliquez pour uploader</span> ou glissez-déposez
                    </p>
                    <p style={{ color: "#334155", fontSize: "0.78rem", marginTop: 4 }}>PDF uniquement · 10 MB max</p>
                    <input
                      ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }}
                      onChange={e => handleFile(e.target.files[0])}
                    />
                  </div>
                ) : (
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", borderRadius: 14,
                    background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.25)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <FileText size={20} style={{ color: "#0EA5E9" }} />
                      <div>
                        <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: "0.88rem" }}>{form.file.name}</p>
                        <p style={{ color: "#64748B", fontSize: "0.75rem" }}>{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => setForm(f => ({ ...f, file: null }))} style={{
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#EF4444",
                    }}>
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON — redesigned */}
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%", padding: "17px 24px", borderRadius: 16, border: "none",
                  background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 50%, #14B8A6 100%)",
                  backgroundSize: "200% 200%",
                  color: "#fff", fontWeight: 700, fontSize: "1rem",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  boxShadow: "0 4px 24px rgba(14,165,233,0.4), 0 0 0 0 rgba(14,165,233,0)",
                  transition: "all 0.3s ease", fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(14,165,233,0.6), 0 0 0 4px rgba(14,165,233,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(14,165,233,0.4)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Send size={18} />
                {activeTab === "recruiter" ? "Envoyer ma demande de recrutement" : "Envoyer mon profil"}
              </button>

              <p style={{ color: "#334155", fontSize: "0.75rem", textAlign: "center", marginTop: 14 }}>
                🔒 Données confidentielles · Aucun spam · RGPD conforme
              </p>
            </div>
          ) : (
            <div style={{ padding: "60px 36px", textAlign: "center", animation: "slide-up 0.5s ease" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", margin: "0 auto 24px",
                background: "linear-gradient(135deg, rgba(20,184,166,0.2), rgba(37,99,235,0.2))",
                border: "1px solid rgba(20,184,166,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CheckCircle size={36} style={{ color: "#14B8A6" }} />
              </div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.6rem", marginBottom: 12 }}>
                Message envoyé <GradientText>✓</GradientText>
              </h3>
              <p style={{ color: "#94A3B8", lineHeight: 1.7, marginBottom: 28 }}>
                Merci <strong style={{ color: "#CBD5E1" }}>{form.firstName}</strong> !<br />
                Un expert TalentFlux vous contacte sous <strong style={{ color: "#0EA5E9" }}>24 heures</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ firstName:"",lastName:"",email:"",phone:"",company:"",sector:"",role:"",message:"",file:null }); }}
                style={{
                  padding: "12px 28px", borderRadius: 12, border: "1px solid rgba(14,165,233,0.3)",
                  background: "rgba(14,165,233,0.08)", color: "#0EA5E9", fontWeight: 600,
                  cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s",
                }}
              >
                Nouvelle demande
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Contact info */}
          <div style={{
            background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24, padding: 28,
          }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 20 }}>
              Nous contacter
            </h3>
            {[
              { icon: Mail, label: "Email", value: "hello@talentflux.ch", href: "mailto:hello@talentflux.ch" },
              { icon: Phone, label: "Téléphone", value: "+41 22 000 00 00", href: "tel:+41220000000" },
              { icon: MapPin, label: "Adresse", value: "Genève, Suisse", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(20,184,166,0.15))",
                  border: "1px solid rgba(14,165,233,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ color: "#475569", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                  {href
                    ? <a href={href} style={{ color: "#CBD5E1", fontSize: "0.88rem", textDecoration: "none", fontWeight: 500 }}>{value}</a>
                    : <span style={{ color: "#CBD5E1", fontSize: "0.88rem", fontWeight: 500 }}>{value}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Response time */}
          <div style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(20,184,166,0.08))",
            border: "1px solid rgba(14,165,233,0.2)", borderRadius: 24, padding: 24,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Clock size={18} style={{ color: "#14B8A6" }} />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>Délais de réponse</span>
            </div>
            {[
              ["Accusé de réception", "< 2h"],
              ["Premier brief", "< 24h"],
              ["Premiers profils", "< 48h"],
            ].map(([label, delay]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={{ color: "#94A3B8", fontSize: "0.82rem" }}>{label}</span>
                <span style={{
                  color: "#14B8A6", fontSize: "0.8rem", fontWeight: 700,
                  background: "rgba(20,184,166,0.1)", padding: "3px 10px", borderRadius: 6,
                }}>{delay}</span>
              </div>
            ))}
          </div>

          {/* Reassurance */}
          <div style={{
            background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 24, padding: 24,
          }}>
            {[
              ["✓", "Aucun frais avant embauche"],
              ["✓", "Satisfaction garantie 3 mois"],
              ["✓", "Confidentialité totale"],
              ["✓", "Réseau de 500+ experts validés"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", gap: 10, padding: "8px 0", alignItems: "center" }}>
                <span style={{ color: "#14B8A6", fontWeight: 700 }}>{icon}</span>
                <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
