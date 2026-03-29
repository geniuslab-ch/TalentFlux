import { useState, useRef } from "react";
import { supabase } from "../supabase";
import {
  Send, Upload, X, FileText, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp
} from "lucide-react";

// ── Champ texte générique ─────────────────────────────────
export const Field = ({ label, type = "text", placeholder, value, onChange, required, accentColor, hint }) => (
  <div>
    <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7, color: "#64748B" }}>
      {label} {required && <span style={{ color: accentColor }}>*</span>}
      {hint && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 6, color: "#475569" }}>— {hint}</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: "#F1F5F9", fontSize: ".9rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans', sans-serif" }}
      onFocus={e => { e.target.style.borderColor = accentColor + "99"; e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

// ── Sélecteur déroulant ───────────────────────────────────
export const SelectField = ({ label, value, onChange, options, required, accentColor, hint }) => (
  <div>
    <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7, color: "#64748B" }}>
      {label} {required && <span style={{ color: accentColor }}>*</span>}
      {hint && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 6, color: "#475569" }}>— {hint}</span>}
    </label>
    <select value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: value ? "#F1F5F9" : "#475569", fontSize: ".9rem", outline: "none", transition: "all .25s", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = accentColor + "99"; e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#080D1A" }}>{o.label}</option>)}
    </select>
  </div>
);

// ── Textarea ──────────────────────────────────────────────
export const TextareaField = ({ label, placeholder, value, onChange, required, accentColor, hint, rows = 3 }) => (
  <div>
    <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7, color: "#64748B" }}>
      {label} {required && <span style={{ color: accentColor }}>*</span>}
      {hint && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 6, color: "#475569" }}>— {hint}</span>}
    </label>
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
      style={{ width: "100%", padding: "12px 15px", borderRadius: 12, background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.09)", color: "#F1F5F9", fontSize: ".9rem", outline: "none", resize: "vertical", transition: "all .25s", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
      onFocus={e => { e.target.style.borderColor = accentColor + "99"; e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`; }}
      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

// ── Checkboxes multi-select ───────────────────────────────
export const CheckboxGroup = ({ label, options, values, onChange, accentColor, hint }) => {
  const toggle = (val) => {
    const next = values.includes(val) ? values.filter(v => v !== val) : [...values, val];
    onChange(next);
  };
  return (
    <div>
      <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, color: "#64748B" }}>
        {label}
        {hint && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 6, color: "#475569" }}>— {hint}</span>}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(opt => {
          const selected = values.includes(opt);
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              style={{
                padding: "7px 14px", borderRadius: 100, fontSize: ".8rem", fontWeight: 600,
                cursor: "pointer", transition: "all .2s", fontFamily: "'DM Sans', sans-serif",
                background: selected ? `${accentColor}18` : "rgba(255,255,255,.04)",
                border: selected ? `1px solid ${accentColor}60` : "1px solid rgba(255,255,255,.09)",
                color: selected ? accentColor : "#64748B",
              }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Upload PDF ────────────────────────────────────────────
export const PdfUpload = ({ label, hint, file, onFile, onRemove, accentColor, dragOver, setDragOver, fileRef }) => (
  <div>
    <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7, color: "#64748B" }}>
      {label} <span style={{ color: accentColor }}>*</span>
      {hint && <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 6, color: "#475569" }}>— {hint}</span>}
    </label>
    {!file ? (
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files[0]); }}
        style={{ border: `2px dashed ${dragOver ? accentColor : "rgba(255,255,255,0.12)"}`, borderRadius: 12, padding: "22px 20px", textAlign: "center", cursor: "pointer", transition: "all .25s", background: dragOver ? `${accentColor}08` : "rgba(11,15,26,0.4)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor + "60"; }}
        onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
      >
        <Upload size={22} style={{ color: "#334155", margin: "0 auto 10px" }} />
        <p style={{ color: "#475569", fontSize: ".86rem" }}>
          <span style={{ color: accentColor, fontWeight: 600 }}>Cliquez</span> ou glissez votre CV
        </p>
        <p style={{ color: "#334155", fontSize: ".75rem", marginTop: 4 }}>PDF uniquement · Max 10 MB</p>
        <input ref={fileRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
      </div>
    ) : (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderRadius: 12, background: `${accentColor}0F`, border: `1px solid ${accentColor}40` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText size={18} style={{ color: accentColor }} />
          <div>
            <p style={{ color: "#CBD5E1", fontWeight: 600, fontSize: ".86rem" }}>{file.name}</p>
            <p style={{ color: "#64748B", fontSize: ".72rem" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button type="button" onClick={onRemove} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 8, padding: "5px 7px", cursor: "pointer", color: "#EF4444" }}>
          <X size={14} />
        </button>
      </div>
    )}
  </div>
);

// ── Section accordéon ─────────────────────────────────────
export const Section = ({ title, icon, children, accentColor, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,.07)", overflow: "hidden", marginBottom: 12 }}>
      <button type="button" onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,.02)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: accentColor, fontSize: "1rem" }}>{icon}</span>
          <span style={{ color: "#F1F5F9", fontWeight: 700, fontSize: ".9rem" }}>{title}</span>
        </div>
        {open ? <ChevronUp size={15} style={{ color: "#475569" }} /> : <ChevronDown size={15} style={{ color: "#475569" }} />}
      </button>
      {open && <div style={{ padding: "18px 18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>}
    </div>
  );
};

// ── Composant principal ───────────────────────────────────
export default function CandidatureForm({ secteur, theme, labels }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const ac = theme.accent; // couleur accent

  const [form, setForm] = useState({
    // Identité
    prenom: "", nom: "", email: "", telephone: "",
    // Finance
    salaire_souhaite_chf: "", salaire_minimum_chf: "", disponibilite_semaines: "",
    remote_jours_souhaites: "", remote_souhaite: "", mobilite: "",
    // Formation
    niveau_formation: "", ecole_principale: "", annees_experience_total: "",
    annees_experience_secteur: "", langues_parlees: [],
    // IT
    it_stack: [], it_annees_stack: "", it_cloud: "", it_contrat: "", it_env: "",
    // Finance
    fin_specialite: "", fin_normes: [], fin_erp: [],
    fin_perimetre_mchf: "", fin_equipe_max: "", fin_certifications: [],
    // Ingénierie
    ing_specialite: "", ing_cao: [], ing_normes: [], ing_secteurs: [], ing_automates: [],
    // Motivations
    motif_changement: "", succes: "", desaccord: "",
    // CV
    cv_file: null,
    // RGPD
    consentement: false, consentement_opportunites: false,
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const setArr = k => val => setForm(f => ({ ...f, [k]: val }));
  const setCheck = k => e => setForm(f => ({ ...f, [k]: e.target.checked }));

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Le fichier ne doit pas dépasser 10 MB."); return; }
    setError(null);
    setForm(f => ({ ...f, cv_file: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.prenom || !form.nom || !form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    if (!form.consentement) { setError("Veuillez accepter les conditions de traitement des données."); return; }
    setLoading(true);

    try {
      // Upload CV (optionnel — on continue même si l'upload échoue)
      let cvFileName = null;
      let cvUrl = null;

      if (form.cv_file) {
        const sanitize = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const fileName = `${Date.now()}_${sanitize(form.prenom)}_${sanitize(form.nom)}.pdf`;
        const { error: upErr } = await supabase.storage
          .from("contact-pdfs")
          .upload(`cv/${fileName}`, form.cv_file, { contentType: "application/pdf" });
        if (upErr) {
          console.warn("Upload CV échoué (non bloquant):", upErr.message);
        } else {
          cvFileName = fileName;
          cvUrl = `cv/${fileName}`;
        }
      }

      // Insertion candidat
      const payload = {
        prenom: form.prenom.trim(),
        nom: form.nom.trim(),
        email: form.email.trim().toLowerCase(),
        telephone: form.telephone.trim() || null,
        secteur,
        source: "Formulaire web",
        salaire_souhaite_chf: parseInt(form.salaire_souhaite_chf) || 0,
        salaire_minimum_chf: parseInt(form.salaire_minimum_chf) || null,
        disponibilite_semaines: parseInt(form.disponibilite_semaines) || 4,
        remote_jours_souhaites: parseInt(form.remote_jours_souhaites) || 0,
        remote_souhaite: form.remote_souhaite || null,
        mobilite: form.mobilite === "Oui",
        niveau_formation: form.niveau_formation || null,
        ecole_principale: form.ecole_principale || null,
        annees_experience_total: parseInt(form.annees_experience_total) || 0,
        annees_experience_secteur: parseInt(form.annees_experience_secteur) || 0,
        langues_parlees: form.langues_parlees,
        motif_changement: form.motif_changement || null,
        succes_professionnel: form.succes || null,
        gestion_desaccord: form.desaccord || null,
        cv_nom_fichier: cvFileName,
        cv_url: cvUrl,
        consentement_rgpd: form.consentement,
        consentement_opportunites: form.consentement_opportunites,
        // IT
        it_stack_principal: secteur === "IT" ? form.it_stack.join(", ") || null : null,
        it_annees_stack_principal: secteur === "IT" ? parseInt(form.it_annees_stack) || null : null,
        it_cloud: secteur === "IT" ? form.it_cloud || null : null,
        it_type_contrat_prefere: secteur === "IT" ? form.it_contrat || null : null,
        it_env_prefere: secteur === "IT" ? form.it_env || null : null,
        // Finance
        fin_specialite: secteur === "Finance" ? form.fin_specialite || null : null,
        fin_normes_maitrisees: secteur === "Finance" ? form.fin_normes : null,
        fin_erp_maitrise: secteur === "Finance" ? form.fin_erp : null,
        fin_perimetre_max_mchf: secteur === "Finance" ? parseFloat(form.fin_perimetre_mchf) || null : null,
        fin_equipe_managee_max: secteur === "Finance" ? parseInt(form.fin_equipe_max) || null : null,
        fin_certifications: secteur === "Finance" ? form.fin_certifications : null,
        // Ingénierie
        ing_specialite: secteur === "Ingénierie" ? form.ing_specialite || null : null,
        ing_cao_logiciels: secteur === "Ingénierie" ? form.ing_cao : null,
        ing_normes_maitrisees: secteur === "Ingénierie" ? form.ing_normes : null,
        ing_secteurs_experience: secteur === "Ingénierie" ? form.ing_secteurs : null,
        ing_langages_automate: secteur === "Ingénierie" ? form.ing_automates : null,
      };

      const { error: insErr } = await supabase
        .from("candidats")
        .upsert(payload, { onConflict: "email" });
      if (insErr) {
        console.error("Supabase insert error:", insErr);
        throw new Error(`Erreur base de données : ${insErr.message} (code: ${insErr.code})`);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "52px 24px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px", background: `${ac}15`, border: `1px solid ${ac}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle size={30} style={{ color: ac }} />
        </div>
        <h3 style={{ color: "#F1F5F9", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: 12 }}>
          Candidature reçue ✓
        </h3>
        <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: ".92rem" }}>
          Merci <strong style={{ color: "#CBD5E1" }}>{form.prenom}</strong> !<br />
          Un consultant TalentFlux vous contacte sous <strong style={{ color: ac }}>24 heures</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── 1. IDENTITÉ ── */}
      <Section title="Informations personnelles" icon="👤" accentColor={ac}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Prénom" placeholder="Sophie" value={form.prenom} onChange={set("prenom")} required accentColor={ac} />
          <Field label="Nom" placeholder="Martin" value={form.nom} onChange={set("nom")} required accentColor={ac} />
          <Field label="Email professionnel" type="email" placeholder="sophie@acme.ch" value={form.email} onChange={set("email")} required accentColor={ac} />
          <Field label="Téléphone" type="tel" placeholder="+41 79 000 00 00" value={form.telephone} onChange={set("telephone")} accentColor={ac} />
        </div>
      </Section>

      {/* ── 2. SITUATION FINANCIÈRE ── */}
      <Section title="Situation & disponibilité" icon="💼" accentColor={ac}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Salaire souhaité (CHF/an)" type="number" placeholder="115 000" value={form.salaire_souhaite_chf} onChange={set("salaire_souhaite_chf")} required accentColor={ac} />
          <Field label="Salaire minimum absolu (CHF)" type="number" placeholder="100 000" value={form.salaire_minimum_chf} onChange={set("salaire_minimum_chf")} accentColor={ac} hint="En dessous, vous ne pouvez pas accepter" />
          <Field label="Préavis (semaines)" type="number" placeholder="4" value={form.disponibilite_semaines} onChange={set("disponibilite_semaines")} required accentColor={ac} />
          <Field label="Jours télétravail souhaités / semaine" type="number" placeholder="2" value={form.remote_jours_souhaites} onChange={set("remote_jours_souhaites")} accentColor={ac} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <SelectField label="Mode de travail préféré" value={form.remote_souhaite} onChange={set("remote_souhaite")} accentColor={ac}
            options={[{ value: "", label: "Sélectionnez..." }, { value: "Full Remote", label: "Full Remote" }, { value: "Hybride", label: "Hybride" }, { value: "Présentiel", label: "Présentiel" }]} />
          <SelectField label="Mobilité (déplacements)" value={form.mobilite} onChange={set("mobilite")} accentColor={ac}
            options={[{ value: "", label: "Sélectionnez..." }, { value: "Oui", label: "Oui, je suis mobile" }, { value: "Non", label: "Non" }]} />
        </div>
      </Section>

      {/* ── 3. FORMATION & EXPÉRIENCE ── */}
      <Section title="Formation & expérience" icon="🎓" accentColor={ac}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <SelectField label="Niveau de formation" value={form.niveau_formation} onChange={set("niveau_formation")} required accentColor={ac}
            options={[{ value: "", label: "Sélectionnez..." }, ...["CFC","CFC+","HES-Bachelor","HES-Master","Uni-Bachelor","Uni-Master","PhD","Autre"].map(v => ({ value: v, label: v }))]} />
          <Field label="École / Université" placeholder="EPFL, HEIG-VD..." value={form.ecole_principale} onChange={set("ecole_principale")} accentColor={ac} />
          <Field label="Années d'expérience totales" type="number" placeholder="7" value={form.annees_experience_total} onChange={set("annees_experience_total")} required accentColor={ac} />
          <Field label={`Années dans le secteur ${secteur}`} type="number" placeholder="5" value={form.annees_experience_secteur} onChange={set("annees_experience_secteur")} accentColor={ac} />
        </div>
        <CheckboxGroup label="Langues professionnelles" accentColor={ac}
          options={["Français (FR)", "Allemand (DE)", "Anglais (EN)", "Italien (IT)"]}
          values={form.langues_parlees} onChange={setArr("langues_parlees")} />
      </Section>

      {/* ── 4. HARD SKILLS SECTEUR ── */}
      {secteur === "IT" && (
        <Section title="Compétences IT" icon="💻" accentColor={ac}>
          <CheckboxGroup label="Stack technique principale" accentColor={ac} hint="Sélectionnez tout ce que vous maîtrisez"
            options={["React / Next.js", "Vue.js", "Angular", "Node.js", "Python", "Java", "Go", "PHP", ".NET / C#", "Swift / iOS", "Kotlin", "DevOps / K8s", "Data / ML", "Autre"]}
            values={form.it_stack} onChange={setArr("it_stack")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Années sur votre stack principale" type="number" placeholder="5" value={form.it_annees_stack} onChange={set("it_annees_stack")} required accentColor={ac} />
            <SelectField label="Cloud maîtrisé" value={form.it_cloud} onChange={set("it_cloud")} accentColor={ac}
              options={[{ value: "", label: "Sélectionnez..." }, ...["AWS", "Google Cloud (GCP)", "Microsoft Azure", "Multi-cloud", "Aucun"].map(v => ({ value: v, label: v }))]} />
            <SelectField label="Contrat préféré" value={form.it_contrat} onChange={set("it_contrat")} required accentColor={ac}
              options={[{ value: "", label: "Sélectionnez..." }, ...["CDI", "Mission / Freelance", "Indépendant"].map(v => ({ value: v, label: v }))]} />
            <SelectField label="Environnement préféré" value={form.it_env} onChange={set("it_env")} accentColor={ac}
              options={[{ value: "", label: "Sélectionnez..." }, ...["Produit / Startup", "Conseil / ESN", "Grand groupe", "PME"].map(v => ({ value: v, label: v }))]} />
          </div>
        </Section>
      )}

      {secteur === "Finance" && (
        <Section title="Compétences Finance" icon="💰" accentColor={ac}>
          <SelectField label="Spécialité principale" value={form.fin_specialite} onChange={set("fin_specialite")} required accentColor={ac}
            options={[{ value: "", label: "Sélectionnez..." }, ...["CFO / Direction financière", "Contrôle de gestion", "Audit interne / externe", "Comptabilité / Reporting", "Trésorerie / Risk", "M&A / Finance d'entreprise", "Autre"].map(v => ({ value: v, label: v }))]} />
          <CheckboxGroup label="Normes maîtrisées" accentColor={ac}
            options={["IFRS", "Swiss GAAP", "Code des Obligations (OR)", "US GAAP", "Lux GAAP"]}
            values={form.fin_normes} onChange={setArr("fin_normes")} />
          <CheckboxGroup label="ERP & Outils" accentColor={ac}
            options={["SAP FI/CO", "Oracle Financials", "Sage", "Microsoft Dynamics", "Abacus", "Banana", "Power BI", "Excel avancé (VBA/Power Query)"]}
            values={form.fin_erp} onChange={setArr("fin_erp")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Budget géré maximum (MCHF)" type="number" placeholder="50" value={form.fin_perimetre_mchf} onChange={set("fin_perimetre_mchf")} accentColor={ac} />
            <Field label="Taille équipe managée (max)" type="number" placeholder="0 si pas de management" value={form.fin_equipe_max} onChange={set("fin_equipe_max")} accentColor={ac} />
          </div>
          <CheckboxGroup label="Certifications" accentColor={ac}
            options={["Expert-comptable CH", "ACCA", "CPA", "CFA", "CMA", "CIA", "Aucune"]}
            values={form.fin_certifications} onChange={setArr("fin_certifications")} />
        </Section>
      )}

      {secteur === "Ingénierie" && (
        <Section title="Compétences Ingénierie" icon="⚙️" accentColor={ac}>
          <SelectField label="Spécialité principale" value={form.ing_specialite} onChange={set("ing_specialite")} required accentColor={ac}
            options={[{ value: "", label: "Sélectionnez..." }, ...["Mécanique / Conception", "Électronique / Embarqué", "Automation / Robotique", "Qualité / Réglementaire", "Direction technique / R&D", "Autre"].map(v => ({ value: v, label: v }))]} />
          <CheckboxGroup label="Logiciels CAO" accentColor={ac}
            options={["SolidWorks", "CATIA V5/V6", "AutoCAD", "Inventor", "CREO", "NX Siemens", "Aucun"]}
            values={form.ing_cao} onChange={setArr("ing_cao")} />
          <CheckboxGroup label="Normes maîtrisées" accentColor={ac}
            options={["ISO 9001", "ISO 13485", "MDR 2017/745", "IVDR", "IEC 62304", "CE Machines", "ISO 14001", "ATEX"]}
            values={form.ing_normes} onChange={setArr("ing_normes")} />
          <CheckboxGroup label="Secteurs d'expérience" accentColor={ac}
            options={["MedTech / Dispositifs médicaux", "Horlogerie / Microtechnique", "Automation / Robotique industrielle", "Aérospatiale / Défense", "Industrie 4.0 / IoT", "Alimentaire / Pharma"]}
            values={form.ing_secteurs} onChange={setArr("ing_secteurs")} />
          {form.ing_specialite === "Automation / Robotique" && (
            <CheckboxGroup label="Langages automate" accentColor={ac}
              options={["Siemens S7 / TIA Portal", "ABB", "Rockwell / Allen-Bradley", "Beckhoff", "Schneider Electric"]}
              values={form.ing_automates} onChange={setArr("ing_automates")} />
          )}
        </Section>
      )}

      {/* ── 5. MOTIVATIONS ── */}
      <Section title="Votre profil en quelques mots" icon="💬" accentColor={ac}>
        <TextareaField label="Pourquoi envisagez-vous un changement ?" placeholder="Contexte, motivations, ce que vous recherchez..." value={form.motif_changement} onChange={set("motif_changement")} required accentColor={ac} />
        <TextareaField label="Votre plus grand succès professionnel" placeholder="Situation, actions, résultat mesurable..." value={form.succes} onChange={set("succes")} accentColor={ac} hint="Optionnel" />
      </Section>

      {/* ── 6. CV ── */}
      <Section title="Votre CV" icon="📄" accentColor={ac}>
        <PdfUpload
          label="CV" hint="PDF · Max 10 MB"
          file={form.cv_file} onFile={handleFile} onRemove={() => setForm(f => ({ ...f, cv_file: null }))}
          accentColor={ac} dragOver={dragOver} setDragOver={setDragOver} fileRef={fileRef}
        />
      </Section>

      {/* ── 7. RGPD ── */}
      <div style={{ padding: "14px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { key: "consentement", text: "J'accepte que TalentFlux traite mes données personnelles pour ma recherche d'emploi, conformément à la LPD suisse et au RGPD.", required: true },
          { key: "consentement_opportunites", text: "Je souhaite être recontacté(e) pour de futures opportunités correspondant à mon profil.", required: false },
        ].map(({ key, text, required }) => (
          <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={form[key]} onChange={setCheck(key)}
              style={{ marginTop: 3, accentColor: ac, width: 16, height: 16, flexShrink: 0 }} />
            <span style={{ color: "#94A3B8", fontSize: ".82rem", lineHeight: 1.6 }}>
              {text} {required && <span style={{ color: ac }}>*</span>}
            </span>
          </label>
        ))}
      </div>

      {/* ── ERREUR ── */}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", marginBottom: 8 }}>
          <AlertCircle size={14} style={{ color: "#EF4444", flexShrink: 0 }} />
          <span style={{ color: "#FCA5A5", fontSize: ".83rem" }}>{error}</span>
        </div>
      )}

      {/* ── SUBMIT ── */}
      <button type="submit" disabled={loading}
        style={{
          width: "100%", padding: "15px 24px", borderRadius: 14, border: "none",
          background: loading ? `${ac}40` : theme.btnGradient,
          color: theme.btnTextColor || "#fff", fontWeight: 700, fontSize: ".95rem",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: loading ? "none" : theme.btnShadow,
          transition: "all .3s", fontFamily: "'DM Sans', sans-serif",
        }}
        onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.1)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "none"; }}
      >
        {loading
          ? <><div style={{ width: 17, height: 17, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Envoi en cours...</>
          : <><Send size={17} />{labels.submitBtn}</>
        }
      </button>
      <p style={{ color: "#334155", fontSize: ".68rem", textAlign: "center", marginTop: 8 }}>
        🔒 Données chiffrées · Supabase · LPD & RGPD conformes
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
