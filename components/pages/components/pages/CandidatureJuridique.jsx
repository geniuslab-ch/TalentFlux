"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useRef } from "react";
import { Scale, Send, Upload, X, FileText, AlertCircle, CheckCircle, Gavel, Shield, BookOpen } from "lucide-react";
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
    specialite: "", brevet: "", langues: "", message: "", file: null
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

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
        const san = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fn = `${Date.now()}_${san(form.firstName)}_${san(form.lastName)}.pdf`;
        const { error: ue } = await supabase.storage.from("contact-pdfs").upload(`submissions/${fn}`, form.file, { contentType: "application/pdf" });
        if (!ue) { pdfFileName = fn; pdfFileUrl = `submissions/${fn}`; }
      }
      const { error: ie } = await supabase.from("contact_submissions").insert([{
        type: "candidate", first_name: form.firstName.trim(), last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
        sector: "juridique", role: form.specialite.trim() || null,
        message: `Brevet: ${form.brevet} | Langues: ${form.langues} | ${form.message}`.trim(),
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (ie) throw new Error(ie.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const C = { bg: "#06080F", text: "#F0F4FF", muted: "#8B9FCC", subtle: "#2D3A5A", border: "rgba(255,255,255,0.07)", blueL: "#748FFC", grad: "linear-gradient(135deg,#1B2A52,#3B5BDB)" };

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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {[["Prénom *", "firstName", "Sophie"], ["Nom *", "lastName", "Dupont"],
              ["Email *", "email", "s.dupont@cabinet.ch"], ["Téléphone", "phone", "+41 79 000 00 00"]
            ].map(([label, key, ph]) => (
              <div key={key}>
                <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} placeholder={ph}
                  value={form[key]} onChange={set(key)}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Spécialité</label>
              <select value={form.specialite} onChange={set("specialite")}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(6,8,15,.9)", border: "1px solid rgba(255,255,255,.07)", color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                <option value="">Sélectionner...</option>
                {["Avocat d'affaires breveté", "General Counsel / DJP", "Compliance Officer", "DPO / Data Privacy", "Contract Manager", "Juriste in-house", "Droit du travail", "Propriété intellectuelle", "Droit fiscal", "Arbitrage / Médiation"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Brevet d'avocat</label>
              <select value={form.brevet} onChange={set("brevet")}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(6,8,15,.9)", border: "1px solid rgba(255,255,255,.07)", color: form.brevet ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                <option value="">Statut...</option>
                {["Brevet d'avocat suisse", "Brevet + LL.M.", "Juriste sans brevet", "En cours d'obtention", "Barreau étranger (préciser dans message)"].map(o => (
                  <option key={o} value={o} style={{ background: "#06080F" }}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Langues de travail</label>
            <input placeholder="Ex: FR (nat.), DE (C1), EN (C1)" value={form.langues} onChange={set("langues")}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
              onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Parcours & disponibilité</label>
            <textarea placeholder="Ex: Avocate brevetée GE, 8 ans M&A et corporate, bilingue FR/DE, LL.M. King's College London, disponible sous préavis 3 mois, CTC actuel CHF 220k..."
              value={form.message} onChange={set("message")} rows={4}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
              onFocus={e => { e.target.style.borderColor = "rgba(116,143,252,.5)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>CV <span style={{ fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB</span></label>
            {!form.file ? (
              <div onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                style={{ border: dragOver ? "2px dashed #748FFC" : "2px dashed rgba(255,255,255,.07)", borderRadius: 11, padding: 18, textAlign: "center", cursor: "pointer", transition: "all .25s" }}>
                <Upload size={20} style={{ color: C.subtle, margin: "0 auto 8px" }} />
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
          <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Traitement confidentiel · LPD suisse & RGPD conformes</p>
        </div>
      </div>
    </div>
  );
}
