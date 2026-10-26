"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useRef } from "react";
import { Scale, Send, Upload, X, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CandidatureJuridique() {
  const { isMobile } = useMobile();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    specialite: "", brevet: "", canton: "", typeEmployeur: "",
    domainesDroit: [], langues: "", disponibilite: "", pretentions: "", message: "", file: null
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const toggleDomaine = v => setForm(f => ({
    ...f, domainesDroit: f.domainesDroit.includes(v) ? f.domainesDroit.filter(d => d !== v) : [...f.domainesDroit, v]
  }));

  const handleFile = file => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les PDF sont acceptés."); return; }
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
        const san = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fn = `${Date.now()}_${san(form.firstName)}_${san(form.lastName)}.pdf`;
        const { error: ue } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fn}`, form.file, { contentType: "application/pdf" });
        if (ue) throw new Error("Erreur lors de l'envoi du CV : " + ue.message);
        pdfFileName = fn; pdfFileUrl = `submissions/${fn}`;
      }
      const competences = [
        form.domainesDroit.length && `Domaines: ${form.domainesDroit.join(", ")}`,
        form.brevet && `Brevet: ${form.brevet}`,
        form.canton && `Canton barreau: ${form.canton}`,
        form.typeEmployeur && `Type employeur: ${form.typeEmployeur}`,
        form.langues && `Langues: ${form.langues}`,
        form.disponibilite && `Dispo: ${form.disponibilite}`,
        form.pretentions && `Prétentions: ${form.pretentions}`,
        form.message,
      ].filter(Boolean).join(" | ");

      const { error: ie } = await supabase.from("contact_submissions").insert([{
        type: "candidate", first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        sector: "juridique", role: form.specialite.trim() || null,
        message: competences,
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (ie) throw new Error(ie.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const C = { bg: "#06080F", text: "#F0F4FF", muted: "#8B9FCC", subtle: "#2D3A5A", border: "rgba(255,255,255,0.07)", blueL: "#748FFC", grad: "linear-gradient(135deg,#1B2A52,#3B5BDB)" };

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" };
  const selectStyle = { ...inputStyle, background: "rgba(6,8,15,.9)", cursor: "pointer", appearance: "none" };
  const labelStyle = { display: "block", color: C.muted, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 };
  const focusB = e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; };
  const blurB = e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; };

  const SectionHeader = ({ children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0 14px" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
      <span style={{ color: C.blueL, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
    </div>
  );

  if (submitted) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>⚖️</div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", color: C.text, fontWeight: 800, fontSize: "1.8rem", marginBottom: 12 }}>Dossier transmis</h1>
        <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>Merci <strong style={{ color: C.text }}>{form.firstName}</strong>. Un consultant TalentFlux examine votre profil et vous répond sous <strong style={{ color: C.blueL }}>2h ouvrées</strong>.</p>
        <Link href="/juridique" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 13, background: C.grad, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: ".9rem" }}>← Retour</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", padding: isMobile ? "80px 1.4rem 40px" : "100px 2rem 60px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link href="/juridique" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.muted, fontSize: ".84rem", textDecoration: "none", marginBottom: 32 }}>← Retour à la verticale juridique</Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(59,91,219,.15)", border: "1px solid rgba(116,143,252,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Scale size={20} style={{ color: C.blueL }} strokeWidth={1.5} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", color: C.text, fontWeight: 800, fontSize: "1.4rem", margin: 0 }}>Déposer mon dossier juridique</h1>
            <p style={{ color: C.muted, fontSize: ".82rem", margin: 0 }}>Confidentiel · Sans diffusion publique · LPD suisse conforme</p>
          </div>
        </div>

        <div style={{ background: "rgba(10,14,30,.92)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: isMobile ? 20 : 32 }}>

          {/* — Informations personnelles — */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {[["Prénom *", "firstName", "Sophie"], ["Nom *", "lastName", "Dupont"],
              ["Email *", "email", "s.dupont@cabinet.ch"], ["Téléphone", "phone", "+41 79 000 00 00"]
            ].map(([label, key, ph]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} placeholder={ph}
                  value={form[key]} onChange={set(key)}
                  style={inputStyle} onFocus={focusB} onBlur={blurB} />
              </div>
            ))}
          </div>

          {/* — Profil juridique — */}
          <SectionHeader>Profil & qualification</SectionHeader>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Fonction visée</label>
              <select value={form.specialite} onChange={set("specialite")} style={{ ...selectStyle, color: form.specialite ? C.text : C.muted }}>
                <option value="">Sélectionner...</option>
                {["Avocat d'affaires breveté", "Avocat associé / Of Counsel", "General Counsel / DJP",
                  "Compliance Officer / Chief Compliance", "DPO / Data Privacy Officer",
                  "Contract Manager / Legal Ops", "Juriste in-house sénior", "Juriste in-house junior",
                  "Droit du travail (côté employeur)", "Propriété intellectuelle & nouvelles technologies",
                  "Droit fiscal & structuration", "Arbitrage & médiation", "Autre"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Brevet d'avocat</label>
              <select value={form.brevet} onChange={set("brevet")} style={{ ...selectStyle, color: form.brevet ? C.text : C.muted }}>
                <option value="">Statut...</option>
                {["Brevet d'avocat suisse", "Brevet + LL.M.", "Brevet + doctorat",
                  "Juriste sans brevet (lic. iur. / MLaw)", "En cours d'obtention",
                  "Barreau UE / étranger (préciser)"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Canton du barreau (si avocat breveté)</label>
              <select value={form.canton} onChange={set("canton")} style={{ ...selectStyle, color: form.canton ? C.text : C.muted }}>
                <option value="">Canton...</option>
                {["GE", "VD", "ZH", "BE", "FR", "NE", "VS", "TI", "ZG", "BS / BL", "Autre / Non applicable"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Type d'employeur visé</label>
              <select value={form.typeEmployeur} onChange={set("typeEmployeur")} style={{ ...selectStyle, color: form.typeEmployeur ? C.text : C.muted }}>
                <option value="">Sélectionner...</option>
                {["Cabinet d'avocats (law firm)", "In-house — PME / scale-up",
                  "In-house — grande entreprise / groupe", "Secteur public / parapublic",
                  "Organisation internationale", "Banque / Private Equity / Asset management",
                  "Indifférent"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* — Domaines de droit — */}
          <SectionHeader>Domaines de droit</SectionHeader>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Domaines principaux (plusieurs choix possibles)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {["M&A / Fusions-acquisitions", "Corporate / Droit des sociétés", "Droit du travail",
                "Droit fiscal", "Contrats commerciaux", "Propriété intellectuelle",
                "Droit bancaire & financier", "Droit immobilier", "Pénal des affaires",
                "Arbitrage & contentieux", "Droit de la concurrence", "Droit public / Réglementaire",
                "Data & RGPD", "Droit de la famille / successions"].map(v => (
                <button key={v} type="button" onClick={() => toggleDomaine(v)}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: ".78rem", fontWeight: 600, cursor: "pointer", transition: "all .2s", fontFamily: "'DM Sans',sans-serif", border: form.domainesDroit.includes(v) ? "1px solid rgba(116,143,252,.6)" : "1px solid rgba(255,255,255,.1)", background: form.domainesDroit.includes(v) ? "rgba(116,143,252,.15)" : "rgba(255,255,255,.03)", color: form.domainesDroit.includes(v) ? C.blueL : C.muted }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* — Langues & disponibilité — */}
          <SectionHeader>Langues & disponibilité</SectionHeader>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Langues de travail</label>
              <input placeholder="Ex: FR (nat.), DE (C1), EN (C1)" value={form.langues} onChange={set("langues")} style={inputStyle} onFocus={focusB} onBlur={blurB} />
            </div>
            <div>
              <label style={labelStyle}>Disponibilité</label>
              <select value={form.disponibilite} onChange={set("disponibilite")} style={{ ...selectStyle, color: form.disponibilite ? C.text : C.muted }}>
                <option value="">Délai...</option>
                {["Immédiatement", "1 mois (préavis)", "2 mois", "3 mois", "Plus de 3 mois"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Prétentions salariales <span style={{ fontWeight: 400, textTransform: "none", color: C.muted }}>(optionnel)</span></label>
            <input placeholder="Ex: CHF 200–240k brut / an (fixe + variable)" value={form.pretentions} onChange={set("pretentions")} style={inputStyle} onFocus={focusB} onBlur={blurB} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Parcours & projets marquants</label>
            <textarea placeholder="Ex: Avocate brevetée GE, 8 ans M&A et corporate, bilingue FR/DE, LL.M. King's College London, préavis 3 mois. Transactions récentes : acquisition CHF 120M, fusion transfrontalière CH–DE..."
              value={form.message} onChange={set("message")} rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={focusB} onBlur={blurB} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>CV / Dossier <span style={{ fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB</span></label>
            {!form.file ? (
              <div onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                style={{ border: dragOver ? "2px dashed #748FFC" : "2px dashed rgba(255,255,255,.07)", borderRadius: 11, padding: 18, textAlign: "center", cursor: "pointer", transition: "all .25s" }}>
                <Upload size={20} style={{ color: C.muted, margin: "0 auto 8px" }} />
                <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.blueL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(59,91,219,.06)", border: "1px solid rgba(116,143,252,.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <FileText size={15} style={{ color: C.blueL }} />
                  <span style={{ color: C.text, fontSize: ".84rem", fontWeight: 600 }}>{form.file.name}</span>
                </div>
                <button onClick={() => setForm(f => ({ ...f, file: null }))} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "4px 6px", cursor: "pointer", color: "#EF4444" }}><X size={13} /></button>
              </div>
            )}
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, padding: "10px 13px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)" }}>
              <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
              <span style={{ color: "#FCA5A5", fontSize: ".83rem" }}>{error}</span>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: loading ? "rgba(59,91,219,.4)" : "linear-gradient(135deg,#1B2A52,#3B5BDB)", color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "'DM Sans',sans-serif" }}>
            {loading
              ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</>
              : <><Send size={16} />Transmettre mon dossier</>}
          </button>
          <p style={{ color: C.muted, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Traitement confidentiel · LPD suisse & RGPD conformes</p>
        </div>
      </div>
    </div>
  );
}
