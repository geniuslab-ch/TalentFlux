"use client";
import { useMobile } from "@/utils/responsive";
import { useState, useRef } from "react";
import { HardHat, Send, Upload, X, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CandidatureBTP() {
  const { isMobile } = useMobile();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    specialite: "", certifications: "", disponibilite: "", message: "", file: null
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
        sector: "btp", role: form.specialite.trim() || null,
        message: `Certifications: ${form.certifications} | Dispo: ${form.disponibilite} | ${form.message}`.trim(),
        pdf_file_name: pdfFileName, pdf_file_url: pdfFileUrl, status: "new",
      }]);
      if (ie) throw new Error(ie.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const C = { bg: "#07090C", text: "#F1F5F9", muted: "#8899B4", subtle: "#1E2D42", border: "rgba(255,255,255,0.07)", orangeL: "#FB923C", gradO: "linear-gradient(135deg,#92400E,#C2410C,#F97316)" };

  if (submitted) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🏗️</div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", color: C.text, fontWeight: 800, fontSize: "1.8rem", marginBottom: 12 }}>Candidature reçue</h1>
        <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>Merci <strong style={{ color: C.text }}>{form.firstName}</strong>. Un consultant TalentFlux BTP examine votre profil et vous répond sous <strong style={{ color: C.orangeL }}>2h ouvrées</strong>.</p>
        <Link href="/btp" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 13, background: C.gradO, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: ".9rem" }}>← Retour</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", padding: isMobile ? "80px 1.4rem 40px" : "100px 2rem 60px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link href="/btp" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.muted, fontSize: ".84rem", textDecoration: "none", marginBottom: 32 }}>← Retour à la verticale BTP</Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(249,115,22,.15)", border: "1px solid rgba(251,146,60,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HardHat size={20} style={{ color: C.orangeL }} strokeWidth={1.5} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", color: C.text, fontWeight: 800, fontSize: "1.4rem", margin: 0 }}>Déposer ma candidature BTP</h1>
            <p style={{ color: C.muted, fontSize: ".82rem", margin: 0 }}>Confidentiel · Sans diffusion publique · LPD suisse conforme</p>
          </div>
        </div>

        <div style={{ background: "rgba(12,16,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 22, padding: isMobile ? 20 : 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {[["Prénom *", "firstName", "Jean"], ["Nom *", "lastName", "Dupont"],
              ["Email *", "email", "j.dupont@mail.ch"], ["Téléphone", "phone", "+41 79 000 00 00"]
            ].map(([label, key, ph]) => (
              <div key={key}>
                <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  placeholder={ph} value={form[key]} onChange={set(key)}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Spécialité</label>
              <select value={form.specialite} onChange={set("specialite")}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(7,9,12,.9)", border: "1px solid rgba(255,255,255,.07)", color: form.specialite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                <option value="">Sélectionner...</option>
                {["Chef de chantier", "Directeur / Conducteur de travaux", "Architecte", "Ingénieur civil / structure", "Ingénieur CVSE", "Responsable HSE", "Géomètre", "BIM Manager", "Technicien / Dessinateur", "Autre"].map(o => (
                  <option key={o} value={o} style={{ background: "#07090C" }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Disponibilité</label>
              <select value={form.disponibilite} onChange={set("disponibilite")}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(7,9,12,.9)", border: "1px solid rgba(255,255,255,.07)", color: form.disponibilite ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", appearance: "none" }}>
                <option value="">Délai...</option>
                {["Immédiatement", "1 mois", "2 mois", "3 mois", "Plus de 3 mois"].map(o => (
                  <option key={o} value={o} style={{ background: "#07090C" }}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Certifications & agréments</label>
            <input placeholder="Ex: Brevet fédéral chef de chantier, Minergie P, CAS Construction, MSST niveau 2..." value={form.certifications} onChange={set("certifications")}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }}
              onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Chantiers de référence & expérience</label>
            <textarea placeholder="Ex: Chef de chantier 12 ans, structure béton et bois, chantiers jusqu'à 15M CHF, bilingue FR/DE, Minergie P, maîtrise SIA 118, référence MO disponible..."
              value={form.message} onChange={set("message")} rows={4}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
              onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,.5)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.07)"; }} />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>CV <span style={{ fontWeight: 400, textTransform: "none" }}>— PDF · Max 10 MB</span></label>
            {!form.file ? (
              <div onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                style={{ border: dragOver ? "2px dashed #FB923C" : "2px dashed rgba(255,255,255,.07)", borderRadius: 11, padding: 18, textAlign: "center", cursor: "pointer", transition: "all .25s" }}>
                <Upload size={20} style={{ color: C.subtle, margin: "0 auto 8px" }} />
                <p style={{ color: C.muted, fontSize: ".82rem" }}><span style={{ color: C.orangeL, fontWeight: 600 }}>Cliquez</span> ou glissez votre PDF</p>
                <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, background: "rgba(249,115,22,.06)", border: "1px solid rgba(249,115,22,.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <FileText size={15} style={{ color: C.orangeL }} />
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
            style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: loading ? "rgba(249,115,22,.4)" : C.gradO, color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "'DM Sans',sans-serif" }}>
            {loading
              ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi...</>
              : <><Send size={16} />Envoyer ma candidature</>}
          </button>
          <p style={{ color: C.subtle, fontSize: ".7rem", textAlign: "center", marginTop: 9 }}>🔒 Traitement confidentiel · LPD suisse & RGPD conformes</p>
        </div>
      </div>
    </div>
  );
}
