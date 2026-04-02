import { useState, useRef } from "react";
import { supabase } from "../supabase";
import { Send, Upload, X, FileText, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

// ─────────────────────────────────────────────────────────
// PRIMITIVES UI
// ─────────────────────────────────────────────────────────
const L = ({ label, required, accentColor, hint }) => (
  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:7, color:"#64748B" }}>
    {label} {required && <span style={{ color:accentColor }}>*</span>}
    {hint && <span style={{ fontWeight:400, textTransform:"none", marginLeft:6, color:"#475569" }}>— {hint}</span>}
  </label>
);

const inputStyle = { width:"100%", padding:"12px 15px", borderRadius:12, background:"rgba(11,15,26,0.8)", border:"1px solid rgba(255,255,255,0.09)", color:"#F1F5F9", fontSize:".9rem", outline:"none", transition:"all .25s", fontFamily:"'DM Sans',sans-serif" };
const focusIn  = (e, ac) => { e.target.style.borderColor=ac+"99"; e.target.style.boxShadow=`0 0 0 3px ${ac}15`; };
const focusOut = (e)     => { e.target.style.borderColor="rgba(255,255,255,0.09)"; e.target.style.boxShadow="none"; };

export const Field = ({ label, type="text", placeholder, value, onChange, required, accentColor, hint }) => (
  <div>
    <L label={label} required={required} accentColor={accentColor} hint={hint} />
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      style={inputStyle} onFocus={e=>focusIn(e,accentColor)} onBlur={focusOut} />
  </div>
);

export const SelectField = ({ label, value, onChange, options, required, accentColor, hint }) => (
  <div>
    <L label={label} required={required} accentColor={accentColor} hint={hint} />
    <select value={value} onChange={onChange} required={required}
      style={{ ...inputStyle, color:value?"#F1F5F9":"#475569", cursor:"pointer", appearance:"none" }}
      onFocus={e=>focusIn(e,accentColor)} onBlur={focusOut}>
      {options.map(o=><option key={o.value} value={o.value} style={{ background:"#080D1A" }}>{o.label}</option>)}
    </select>
  </div>
);

export const TextareaField = ({ label, placeholder, value, onChange, required, accentColor, hint, rows=3 }) => (
  <div>
    <L label={label} required={required} accentColor={accentColor} hint={hint} />
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
      style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
      onFocus={e=>focusIn(e,accentColor)} onBlur={focusOut} />
  </div>
);

export const CheckboxGroup = ({ label, options, values, onChange, accentColor, hint }) => {
  const toggle = val => onChange(values.includes(val)?values.filter(v=>v!==val):[...values,val]);
  return (
    <div>
      <L label={label} accentColor={accentColor} hint={hint} />
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {options.map(opt => {
          const sel = values.includes(opt);
          return (
            <button key={opt} type="button" onClick={()=>toggle(opt)}
              style={{ padding:"7px 14px", borderRadius:100, fontSize:".8rem", fontWeight:600, cursor:"pointer", transition:"all .2s", fontFamily:"'DM Sans',sans-serif",
                background:sel?`${accentColor}18`:"rgba(255,255,255,.04)",
                border:sel?`1px solid ${accentColor}60`:"1px solid rgba(255,255,255,.09)",
                color:sel?accentColor:"#64748B" }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const Toggle = ({ label, sublabel, checked, onChange, accentColor }) => (
  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"12px 14px", borderRadius:10,
    background:checked?`${accentColor}10`:"rgba(255,255,255,.02)",
    border:`1px solid ${checked?accentColor+"40":"rgba(255,255,255,.07)"}` }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor, width:16, height:16, flexShrink:0 }} />
    <div>
      <div style={{ color:"#F1F5F9", fontWeight:600, fontSize:".88rem" }}>{label}</div>
      {sublabel && <div style={{ color:"#64748B", fontSize:".76rem", marginTop:2 }}>{sublabel}</div>}
    </div>
  </label>
);

export const PdfUpload = ({ label, hint, file, onFile, onRemove, accentColor, dragOver, setDragOver, fileRef }) => (
  <div>
    <L label={label} required accentColor={accentColor} hint={hint} />
    {!file ? (
      <div onClick={()=>fileRef.current?.click()}
        onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)}
        onDrop={e=>{e.preventDefault();setDragOver(false);onFile(e.dataTransfer.files[0]);}}
        style={{ border:`2px dashed ${dragOver?accentColor:"rgba(255,255,255,0.12)"}`, borderRadius:12, padding:"22px 20px", textAlign:"center", cursor:"pointer", transition:"all .25s", background:dragOver?`${accentColor}08`:"rgba(11,15,26,0.4)" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=accentColor+"60";}}
        onMouseLeave={e=>{if(!dragOver)e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}>
        <Upload size={22} style={{ color:"#334155", margin:"0 auto 10px" }} />
        <p style={{ color:"#475569", fontSize:".86rem" }}><span style={{ color:accentColor, fontWeight:600 }}>Cliquez</span> ou glissez votre CV</p>
        <p style={{ color:"#334155", fontSize:".75rem", marginTop:4 }}>PDF uniquement · Max 10 MB</p>
        <input ref={fileRef} type="file" accept=".pdf" style={{ display:"none" }} onChange={e=>onFile(e.target.files[0])} />
      </div>
    ) : (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", borderRadius:12, background:`${accentColor}0F`, border:`1px solid ${accentColor}40` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <FileText size={18} style={{ color:accentColor }} />
          <div>
            <p style={{ color:"#CBD5E1", fontWeight:600, fontSize:".86rem" }}>{file.name}</p>
            <p style={{ color:"#64748B", fontSize:".72rem" }}>{(file.size/1024/1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button type="button" onClick={onRemove} style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", borderRadius:8, padding:"5px 7px", cursor:"pointer", color:"#EF4444" }}><X size={14}/></button>
      </div>
    )}
  </div>
);

// G2 défini au niveau module — jamais recréé entre renders (évite perte de focus)
const G2 = ({ children }) => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>{children}</div>
);

export const Section = ({ title, icon, children, accentColor, defaultOpen=true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius:14, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden", marginBottom:12 }}>
      <button type="button" onClick={()=>setOpen(!open)}
        style={{ width:"100%", padding:"14px 18px", background:"rgba(255,255,255,.02)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:accentColor, fontSize:"1rem" }}>{icon}</span>
          <span style={{ color:"#F1F5F9", fontWeight:700, fontSize:".9rem" }}>{title}</span>
        </div>
        {open?<ChevronUp size={15} style={{ color:"#475569" }}/>:<ChevronDown size={15} style={{ color:"#475569" }}/>}
      </button>
      {open && <div style={{ padding:"18px 18px 22px", display:"flex", flexDirection:"column", gap:14 }}>{children}</div>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────
export default function CandidatureForm({ secteur, theme, labels }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [dragOver,  setDragOver]  = useState(false);
  const fileRef = useRef(null);
  const ac = theme.accent;

  const [form, setForm] = useState({
    // Identité
    prenom:"", nom:"", email:"", telephone:"",
    // Situation
    salaire_souhaite_chf:"", salaire_minimum_chf:"",
    disponibilite_semaines:"", remote_jours_souhaites:"",
    remote_souhaite:"", mobilite:"",
    // Formation
    niveau_formation:"", ecole_principale:"",
    annees_experience_total:"", annees_experience_secteur:"", langues_parlees:[],

    // ── IT ──────────────────────────────────────────────
    it_seniority:"", it_type_poste:"", it_stack:[], it_bases_donnees:[],
    it_annees_stack:"", it_cloud:"", it_contrat:"",
    it_methodologie:[], it_env:"", it_certif_cloud:[], it_url_github:"",

    // ── FINANCE ─────────────────────────────────────────
    fin_specialite:"", fin_normes:[], fin_erp:[], fin_industries:[],
    fin_perimetre_mchf:"", fin_equipe_max:"", fin_consolidation_entites:"",
    fin_reporting_langues:[], fin_certifications:[],

    // ── INGÉNIERIE ──────────────────────────────────────
    ing_specialite:"", ing_cao:[], ing_normes:[], ing_secteurs:[], ing_automates:[],
    ing_budget_projet_mchf:"", ing_equipe_max:"", ing_certif_projet:[],
    ing_habilitations_elec:[],

    // ── PAYSAGISME ──────────────────────────────────────
    pay_specialite:"", pay_competences:[], pay_certifications:[],
    pay_permis:"", pay_contrat:"", pay_engins:false,
    pay_zone_intervention:[], pay_types_clients:[],

    // ── TÉLÉCOMMUNICATIONS ──────────────────────────────
    // Général
    tel_sous_domaine:[], tel_specialite:"",
    tel_exp_operateurs:[], tel_permis:"",
    tel_ofac_niveau:"", tel_drone_certif:false, tel_cantons:[],
    // Réseau IP
    tel_stack_reseau:[], tel_protocols:[], tel_certif_reseau:[], tel_supervision:[],
    // Radio / RAN
    tel_tech_radio:[], tel_outils_rf:[], tel_constructeurs_ran:[],
    // RNI / Conformité ORNI
    tel_normes:[], tel_outils_mesure:[], tel_logiciels_rnl:[],
    tel_dossiers_permis:false,
    // Fibre optique
    tel_competences_fibre:[],
    // VoIP / UC
    tel_voip_stack:[], tel_protocols_uc:[],
    // Transmission
    tel_tech_transmission:[],

    // Motivations
    motif_changement:"", succes:"",
    // CV + RGPD
    cv_file:null, consentement:false, consentement_opportunites:false,
  });

  const set    = k => e  => setForm(f=>({...f,[k]:e.target.value}));
  const setArr = k => val => setForm(f=>({...f,[k]:val}));
  const setCheck = k => e => setForm(f=>({...f,[k]:e.target.checked}));

  const handleFile = file => {
    if (!file) return;
    if (file.type!=="application/pdf") { setError("Seuls les fichiers PDF sont acceptés."); return; }
    if (file.size>10*1024*1024) { setError("Le fichier ne doit pas dépasser 10 MB."); return; }
    setError(null); setForm(f=>({...f,cv_file:file}));
  };

  const handleSubmit = async e => {
    e.preventDefault(); setError(null);
    if (!form.prenom||!form.nom||!form.email) { setError("Veuillez remplir les champs obligatoires (*)."); return; }
    if (!form.consentement) { setError("Veuillez accepter le traitement de vos données."); return; }
    setLoading(true);
    try {
      let cvFileName=null, cvUrl=null;
      if (form.cv_file) {
        const san=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]/g,"_");
        const fn=`${Date.now()}_${san(form.prenom)}_${san(form.nom)}.pdf`;
        const {error:upErr}=await supabase.storage.from("contact-pdfs").upload(`cv/${fn}`,form.cv_file,{contentType:"application/pdf"});
        if (!upErr){cvFileName=fn;cvUrl=`cv/${fn}`;}
      }

      const isIT  = secteur==="IT";
      const isFin = secteur==="Finance";
      const isIng = secteur==="Ingénierie";
      const isPay = secteur==="Paysagisme";
      const isTel = secteur==="Télécommunications";

      const payload = {
        prenom:form.prenom.trim(), nom:form.nom.trim(),
        email:form.email.trim().toLowerCase(), telephone:form.telephone.trim()||null,
        secteur, source:"Manuel",
        salaire_souhaite_chf:parseInt(form.salaire_souhaite_chf)||0,
        salaire_minimum_chf:parseInt(form.salaire_minimum_chf)||null,
        disponibilite_semaines:parseInt(form.disponibilite_semaines)||4,
        remote_jours_souhaites:parseInt(form.remote_jours_souhaites)||0,
        remote_souhaite:form.remote_souhaite||null, mobilite:form.mobilite==="Oui",
        niveau_formation:form.niveau_formation||null, ecole_principale:form.ecole_principale||null,
        annees_experience_total:parseInt(form.annees_experience_total)||0,
        annees_experience_secteur:parseInt(form.annees_experience_secteur)||0,
        langues_parlees:form.langues_parlees,
        motif_changement:form.motif_changement||null,
        succes_professionnel:form.succes||null,
        cv_nom_fichier:cvFileName, cv_url:cvUrl,
        consentement_rgpd:form.consentement, consentement_opportunites:form.consentement_opportunites,
        // ── IT ──────────────────────────────────────────────
        // Colonnes existantes
        it_stack_principal:         isIT?form.it_stack.join(", ")||null:null,
        it_annees_stack_principal:  isIT?parseInt(form.it_annees_stack)||null:null,
        it_cloud:                   isIT?form.it_cloud||null:null,
        it_type_contrat_prefere:    isIT?form.it_contrat||null:null,
        it_env_prefere:             isIT?form.it_env||null:null,
        // Nouvelles colonnes (migration_candidats_v2.sql requis)
        ...(isIT && {
          it_seniority:             form.it_seniority||null,
          it_type_poste:            form.it_type_poste||null,
          it_methodologie:          form.it_methodologie,
          it_bases_donnees:         form.it_bases_donnees,
          it_certif_cloud:          form.it_certif_cloud,
          it_url_github:            form.it_url_github||null,
        }),
        // ── FINANCE ──────────────────────────────────────────
        // Colonnes existantes
        fin_specialite:             isFin?form.fin_specialite||null:null,
        fin_normes_maitrisees:      isFin?form.fin_normes:null,
        fin_erp_maitrise:           isFin?form.fin_erp:null,
        fin_perimetre_max_mchf:     isFin?parseFloat(form.fin_perimetre_mchf)||null:null,
        fin_equipe_managee_max:     isFin?parseInt(form.fin_equipe_max)||null:null,
        // Nouvelles colonnes (migration_candidats_v2.sql requis)
        ...(isFin && {
          fin_certifications:       form.fin_certifications,
          fin_industries:           form.fin_industries,
          fin_consolidation_entites: parseInt(form.fin_consolidation_entites)||null,
          fin_reporting_langues:    form.fin_reporting_langues,
        }),
        // ── INGÉNIERIE ───────────────────────────────────────
        // Colonnes existantes
        ing_specialite:             isIng?form.ing_specialite||null:null,
        ing_cao_logiciels:          isIng?form.ing_cao:null,
        ing_normes_maitrisees:      isIng?form.ing_normes:null,
        ing_secteurs_experience:    isIng?form.ing_secteurs:null,
        ing_langages_automate:      isIng?form.ing_automates:null,
        // Nouvelles colonnes (migration_candidats_v2.sql requis)
        ...(isIng && {
          ing_budget_projet_mchf:   parseFloat(form.ing_budget_projet_mchf)||null,
          ing_equipe_managee_max:   parseInt(form.ing_equipe_max)||null,
          ing_certif_projet:        form.ing_certif_projet,
          ing_habilitations_elec:   form.ing_habilitations_elec,
        }),
        // ── PAYSAGISME ───────────────────────────────────────
        // Colonnes existantes
        pay_specialite:             isPay?form.pay_specialite||null:null,
        pay_competences:            isPay?form.pay_competences:null,
        pay_certifications:         isPay?form.pay_certifications:null,
        pay_permis:                 isPay?(form.pay_permis?[form.pay_permis]:null):null,
        pay_engins:                 isPay?form.pay_engins:null,
        // Nouvelles colonnes (migration_candidats_v2.sql requis)
        ...(isPay && {
          pay_zone_intervention:    form.pay_zone_intervention,
          pay_types_clients:        form.pay_types_clients,
        }),
        // ── TÉLÉCOMMUNICATIONS ───────────────────────────────
        // Colonnes existantes
        tel_specialite:             isTel?form.tel_specialite||null:null,
        tel_normes:                 isTel?form.tel_normes:null,
        tel_outils_mesure:          isTel?form.tel_outils_mesure:null,
        tel_logiciels:              isTel?form.tel_logiciels_rnl:null,
        tel_ofac_niveau:            isTel?form.tel_ofac_niveau||null:null,
        tel_drone_certif:           isTel?form.tel_drone_certif:null,
        // Nouvelles colonnes (migration_candidats_v2.sql requis)
        ...(isTel && {
          tel_sous_domaine:         form.tel_sous_domaine,
          tel_exp_operateurs:       form.tel_exp_operateurs,
          tel_permis:               form.tel_permis||null,
          tel_cantons:              form.tel_cantons,
          tel_stack_reseau:         form.tel_stack_reseau,
          tel_protocols:            form.tel_protocols,
          tel_certif_reseau:        form.tel_certif_reseau,
          tel_supervision:          form.tel_supervision,
          tel_tech_radio:           form.tel_tech_radio,
          tel_outils_rf:            form.tel_outils_rf,
          tel_constructeurs_ran:    form.tel_constructeurs_ran,
          tel_dossiers_permis:      form.tel_dossiers_permis,
          tel_competences_fibre:    form.tel_competences_fibre,
          tel_voip_stack:           form.tel_voip_stack,
          tel_protocols_uc:         form.tel_protocols_uc,
          tel_tech_transmission:    form.tel_tech_transmission,
        }),
      };

      const {error:insErr}=await supabase.from("candidats").insert(payload);
      if (insErr) {
        if (insErr.code==="23505") throw new Error("Votre candidature est déjà enregistrée. Contactez-nous à info@talentflux.ch pour la mettre à jour.");
        throw new Error(`Erreur : ${insErr.message}`);
      }
      setSubmitted(true);
    } catch(err) { setError(err.message||"Une erreur est survenue."); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"52px 24px" }}>
      <div style={{ width:64, height:64, borderRadius:"50%", margin:"0 auto 20px", background:`${ac}15`, border:`1px solid ${ac}50`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <CheckCircle size={30} style={{ color:ac }} />
      </div>
      <h3 style={{ color:"#F1F5F9", fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"1.4rem", marginBottom:12 }}>Candidature reçue ✓</h3>
      <p style={{ color:"#94A3B8", lineHeight:1.75, fontSize:".92rem" }}>
        Merci <strong style={{ color:"#CBD5E1" }}>{form.prenom}</strong> !<br/>
        Un consultant TalentFlux vous contacte sous <strong style={{ color:ac }}>24 heures</strong>.
      </p>
    </div>
  );

  const hasTelDom = (...d) => d.some(x => form.tel_sous_domaine.includes(x));

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:0 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* ══════════════════════════════════════════════════
          1. IDENTITÉ
      ══════════════════════════════════════════════════ */}
      <Section title="Informations personnelles" icon="👤" accentColor={ac}>
        <G2>
          <Field label="Prénom" placeholder="Sophie" value={form.prenom} onChange={set("prenom")} required accentColor={ac} />
          <Field label="Nom" placeholder="Martin" value={form.nom} onChange={set("nom")} required accentColor={ac} />
          <Field label="Email professionnel" type="email" placeholder="sophie@acme.ch" value={form.email} onChange={set("email")} required accentColor={ac} />
          <Field label="Téléphone" type="tel" placeholder="+41 79 000 00 00" value={form.telephone} onChange={set("telephone")} accentColor={ac} />
        </G2>
      </Section>

      {/* ══════════════════════════════════════════════════
          2. SITUATION & DISPONIBILITÉ
      ══════════════════════════════════════════════════ */}
      <Section title="Situation & disponibilité" icon="💼" accentColor={ac}>
        <G2>
          <Field label="Salaire souhaité (CHF/an)" type="number" placeholder="115 000" value={form.salaire_souhaite_chf} onChange={set("salaire_souhaite_chf")} required accentColor={ac} />
          <Field label="Salaire minimum absolu (CHF)" type="number" placeholder="100 000" value={form.salaire_minimum_chf} onChange={set("salaire_minimum_chf")} accentColor={ac} hint="En dessous = non négociable" />
          <Field label="Préavis (semaines)" type="number" placeholder="4" value={form.disponibilite_semaines} onChange={set("disponibilite_semaines")} required accentColor={ac} />
          <Field label="Jours télétravail souhaités / sem." type="number" placeholder="2" value={form.remote_jours_souhaites} onChange={set("remote_jours_souhaites")} accentColor={ac} />
          <SelectField label="Mode de travail préféré" value={form.remote_souhaite} onChange={set("remote_souhaite")} accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},{value:"Full Remote",label:"Full Remote"},{value:"Hybride",label:"Hybride"},{value:"Présentiel",label:"Présentiel"}]} />
          <SelectField label="Mobilité / déplacements" value={form.mobilite} onChange={set("mobilite")} accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},{value:"Oui",label:"Oui — je suis mobile"},{value:"Non",label:"Non"}]} />
        </G2>
      </Section>

      {/* ══════════════════════════════════════════════════
          3. FORMATION & EXPÉRIENCE
      ══════════════════════════════════════════════════ */}
      <Section title="Formation & expérience" icon="🎓" accentColor={ac}>
        <G2>
          <SelectField label="Niveau de formation" value={form.niveau_formation} onChange={set("niveau_formation")} required accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},...["CFC","AFP","Maturité pro.","HES-Bachelor","HES-Master","Uni-Bachelor","Uni-Master","PhD","Autre"].map(v=>({value:v,label:v}))]} />
          <Field label="École / Université" placeholder="EPFL, HEIG-VD, UNIFR..." value={form.ecole_principale} onChange={set("ecole_principale")} accentColor={ac} />
          <Field label="Années d'expérience totales" type="number" placeholder="7" value={form.annees_experience_total} onChange={set("annees_experience_total")} required accentColor={ac} />
          <Field label={`Années dans le secteur ${secteur}`} type="number" placeholder="5" value={form.annees_experience_secteur} onChange={set("annees_experience_secteur")} accentColor={ac} />
        </G2>
        <CheckboxGroup label="Langues professionnelles" accentColor={ac}
          options={["Français (FR)","Allemand (DE)","Anglais (EN)","Italien (IT)","Romanche"]}
          values={form.langues_parlees} onChange={setArr("langues_parlees")} />
      </Section>

      {/* ══════════════════════════════════════════════════
          4-A. COMPÉTENCES IT
      ══════════════════════════════════════════════════ */}
      {secteur==="IT" && (
        <Section title="Compétences IT & Développement" icon="💻" accentColor={ac}>
          <G2>
            <SelectField label="Niveau de séniorité" value={form.it_seniority} onChange={set("it_seniority")} required accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"Junior (0-2 ans)",label:"Junior (0–2 ans)"},{value:"Mid (3-5 ans)",label:"Mid (3–5 ans)"},{value:"Senior (6-10 ans)",label:"Senior (6–10 ans)"},{value:"Staff / Lead (10+ ans)",label:"Staff / Lead (10+ ans)"},{value:"Principal / Architecte",label:"Principal / Architecte"}]} />
            <SelectField label="Type de poste visé" value={form.it_type_poste} onChange={set("it_type_poste")} required accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"Développeur full-stack",label:"Développeur full-stack"},{value:"Développeur front-end",label:"Développeur front-end"},{value:"Développeur back-end",label:"Développeur back-end"},{value:"DevOps / SRE / Platform",label:"DevOps / SRE / Platform Engineer"},{value:"Data Engineer",label:"Data Engineer / Ingénieur données"},{value:"ML / IA",label:"ML Engineer / Data Scientist / IA"},{value:"Cloud Architect",label:"Cloud Architect / Solutions Architect"},{value:"Tech Lead / Engineering Manager",label:"Tech Lead / Engineering Manager"},{value:"Product Manager / PO",label:"Product Manager / Product Owner"},{value:"RSSI / Sécurité",label:"RSSI / Ingénieur Sécurité"},{value:"QA / Test",label:"QA Engineer / Testeur"}]} />
            <Field label="Années sur votre stack principale" type="number" placeholder="5" value={form.it_annees_stack} onChange={set("it_annees_stack")} required accentColor={ac} />
            <SelectField label="Cloud principal" value={form.it_cloud} onChange={set("it_cloud")} accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"AWS",label:"AWS"},{value:"GCP",label:"Google Cloud (GCP)"},{value:"Azure",label:"Microsoft Azure"},{value:"Multi-cloud",label:"Multi-cloud"},{value:"Aucun",label:"Aucun / On-premise"}]} />
          </G2>
          <CheckboxGroup label="Stack technique principale" accentColor={ac} hint="Tout ce que vous maîtrisez en production"
            options={["React / Next.js","Vue.js","Angular","Svelte","Node.js / Express","Python (Django/FastAPI)","Java / Spring","Go","PHP / Laravel",".NET / C#","TypeScript","Rust","Swift / iOS","Kotlin / Android","Flutter","DevOps / Kubernetes / Terraform","Data Engineering (Spark/Kafka/dbt)","ML / AI / LLM","Cybersécurité / Pentest","Autre"]}
            values={form.it_stack} onChange={setArr("it_stack")} />
          <CheckboxGroup label="Bases de données" accentColor={ac}
            options={["PostgreSQL","MySQL / MariaDB","MongoDB","Redis","Elasticsearch","DynamoDB","Snowflake","BigQuery","Cassandra","Oracle DB","SQL Server"]}
            values={form.it_bases_donnees} onChange={setArr("it_bases_donnees")} />
          <CheckboxGroup label="Certifications cloud / DevOps" accentColor={ac}
            options={["AWS Solutions Architect (SAA/SAP)","AWS DevOps Professional","GCP Professional Cloud Architect","Azure Solutions Architect","CKA / CKAD / CKS (Kubernetes)","Terraform Associate (HashiCorp)","GitHub Actions","CISSP / OSCP / CEH","Aucune"]}
            values={form.it_certif_cloud} onChange={setArr("it_certif_cloud")} />
          <CheckboxGroup label="Méthodologie de travail" accentColor={ac}
            options={["Agile / Scrum","Kanban","Shape Up","SAFe","Extreme Programming (XP)","Waterfall / Classique"]}
            values={form.it_methodologie} onChange={setArr("it_methodologie")} />
          <G2>
            <SelectField label="Contrat préféré" value={form.it_contrat} onChange={set("it_contrat")} required accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"CDI",label:"CDI"},{value:"Mission",label:"Mission / Freelance"},{value:"Indépendant",label:"Indépendant"}]} />
            <SelectField label="Environnement préféré" value={form.it_env} onChange={set("it_env")} accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"Startup / Scale-up",label:"Startup / Scale-up"},{value:"ESN / Conseil",label:"ESN / Conseil"},{value:"Grand groupe",label:"Grand groupe / Corporate"},{value:"Indifférent",label:"Indifférent"}]} />
          </G2>
          <Field label="GitHub / Portfolio / LinkedIn (optionnel)" placeholder="https://github.com/votre-profil" value={form.it_url_github} onChange={set("it_url_github")} accentColor={ac} />
        </Section>
      )}

      {/* ══════════════════════════════════════════════════
          4-B. COMPÉTENCES FINANCE
      ══════════════════════════════════════════════════ */}
      {secteur==="Finance" && (
        <Section title="Compétences Finance & Contrôle" icon="💰" accentColor={ac}>
          <SelectField label="Spécialité principale" value={form.fin_specialite} onChange={set("fin_specialite")} required accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},{value:"CFO / Direction financière",label:"CFO / Direction financière"},{value:"Contrôle de gestion",label:"Contrôle de gestion / FP&A / Business Partner"},{value:"Comptabilité / Clôture",label:"Chef comptable / Reporting / Clôture"},{value:"Audit interne",label:"Audit interne / Risk"},{value:"Audit externe",label:"Audit externe (Big4 / cabinet d'audit)"},{value:"Trésorerie",label:"Trésorerie / Cash management / ALM"},{value:"M&A / Corporate Finance",label:"M&A / Corporate Finance / Deals"},{value:"Fiscalité",label:"Fiscalité / Tax / Transfer Pricing"},{value:"Compliance / Conformité",label:"Compliance / Conformité (FINMA, AML)"},{value:"Private Banking / Wealth",label:"Banque privée / Wealth Management"},{value:"Risk Management",label:"Risk Management / Crédit / Marché"}]} />
          <CheckboxGroup label="Normes comptables maîtrisées" accentColor={ac}
            options={["Swiss GAAP RPC","IFRS","Code des Obligations (CO/OR)","US GAAP","Lux GAAP","French GAAP (PCG)"]}
            values={form.fin_normes} onChange={setArr("fin_normes")} />
          <CheckboxGroup label="ERP & outils de reporting" accentColor={ac}
            options={["SAP FI/CO","SAP S/4HANA","Oracle Financials","Microsoft Dynamics 365","Abacus","Sage","Banana","Power BI","Cognos / TM1","Hyperion / EPBCS","Anaplan","Lucanet","Excel VBA / Power Query"]}
            values={form.fin_erp} onChange={setArr("fin_erp")} />
          <CheckboxGroup label="Industries d'expérience" accentColor={ac}
            options={["Banque / Finance de marché","Asset Management","Assurance","MedTech / Pharma / Biotech","Industrie / Manufacturing","Horlogerie / Luxe","Immobilier","Services / Conseil","Start-up / Scale-up","Secteur public / Para-étatique"]}
            values={form.fin_industries} onChange={setArr("fin_industries")} />
          <G2>
            <Field label="Budget / périmètre géré max (MCHF)" type="number" placeholder="50" value={form.fin_perimetre_mchf} onChange={set("fin_perimetre_mchf")} accentColor={ac} />
            <Field label="Taille max équipe managée" type="number" placeholder="0" value={form.fin_equipe_max} onChange={set("fin_equipe_max")} accentColor={ac} hint="0 si pas de management" />
            <Field label="Nb entités en consolidation (max)" type="number" placeholder="0" value={form.fin_consolidation_entites} onChange={set("fin_consolidation_entites")} accentColor={ac} />
          </G2>
          <CheckboxGroup label="Langues de reporting" accentColor={ac} hint="Dans quelles langues produisez-vous des rapports ?"
            options={["Français","Allemand","Anglais","Italien"]}
            values={form.fin_reporting_langues} onChange={setArr("fin_reporting_langues")} />
          <CheckboxGroup label="Certifications professionnelles" accentColor={ac}
            options={["Expert-comptable diplômé CH","ACCA (ACA/ACCA)","CPA","CFA Level 1","CFA Level 2 / 3","CMA (ICMA)","CIA","Certified IFRS (IASB)","AMF / FINMA","Aucune"]}
            values={form.fin_certifications} onChange={setArr("fin_certifications")} />
        </Section>
      )}

      {/* ══════════════════════════════════════════════════
          4-C. COMPÉTENCES INGÉNIERIE
      ══════════════════════════════════════════════════ */}
      {secteur==="Ingénierie" && (
        <Section title="Compétences Ingénierie & Technique" icon="⚙️" accentColor={ac}>
          <SelectField label="Spécialité principale" value={form.ing_specialite} onChange={set("ing_specialite")} required accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},{value:"Mécanique / Conception",label:"Mécanique / Conception / Horlogerie"},{value:"Électronique / Embarqué",label:"Électronique / Embarqué / Hardware"},{value:"Automation / Robotique",label:"Automation / Robotique / PLC"},{value:"Qualité / Réglementaire",label:"Qualité / Réglementaire (ISO / MDR)"},{value:"R&D / Innovation",label:"Direction R&D / Innovation"},{value:"Électrotechnique",label:"Électrotechnique / Énergies / HVAC"},{value:"Génie civil / Structure",label:"Génie civil / Structure / Bâtiment"},{value:"Supply Chain / Industrialisation",label:"Supply Chain / Industrialisation / ME"},{value:"Autre",label:"Autre spécialité"}]} />
          <CheckboxGroup label="Logiciels CAO / Simulation" accentColor={ac}
            options={["SolidWorks","CATIA V5/V6","AutoCAD / Civil 3D","Inventor","CREO / Pro-E","NX Siemens","ANSYS (FEA/CFD)","MATLAB / Simulink","LabVIEW","Altium Designer (PCB)","KiCad","OrCAD / PADS"]}
            values={form.ing_cao} onChange={setArr("ing_cao")} />
          <CheckboxGroup label="Normes & réglementations maîtrisées" accentColor={ac}
            options={["ISO 9001","ISO 13485","MDR 2017/745 (DM)","IVDR 2017/746","IEC 62304","IEC 62061 / EN ISO 13849","CE Machines 2006/42","ISO 14001","ATEX / IECEX","ISO 14971 (gestion des risques)","AS9100 (aérospatiale)","GMP / FDA 21 CFR Part 11"]}
            values={form.ing_normes} onChange={setArr("ing_normes")} />
          <CheckboxGroup label="Secteurs d'expérience" accentColor={ac}
            options={["MedTech / Dispositifs médicaux","Horlogerie / Microtechnique","Automation / Industrie 4.0 / IoT","Aérospatiale / Défense","Pharma / Biotech","Alimentaire / Packaging","Énergie / Cleantech / Solaire","Ferroviaire"]}
            values={form.ing_secteurs} onChange={setArr("ing_secteurs")} />
          {form.ing_specialite==="Automation / Robotique" && (
            <CheckboxGroup label="Automates / PLCs programmés" accentColor={ac}
              options={["Siemens S7-300/400 / S7-1200/1500","Siemens TIA Portal / WinCC","ABB (AC500 / IRC5)","Rockwell / Allen-Bradley (Studio 5000)","Beckhoff TwinCAT","Schneider / EcoStruxure (Unity Pro)","Fanuc (ROBOGUIDE)","KUKA (KRL)","Universal Robots (UR Script)","Omron (Sysmac)"]}
              values={form.ing_automates} onChange={setArr("ing_automates")} />
          )}
          {(form.ing_specialite==="Électrotechnique" || form.ing_specialite==="Automation / Robotique") && (
            <CheckboxGroup label="Habilitations électriques (NIBT / OIBT)" accentColor={ac} hint="Selon normes suisses SN EN 50110 / OIBT"
              options={["Habilitation B0 (non électricien, basse tension)","Habilitation BR (chargé d'interventions élementaires)","Habilitation BC (chargé de consignation BT)","Habilitation B2V (exécutant BT, travaux au voisinage)","Habilitation B2T (chargé de travaux BT)","Habilitation H0 (haute tension, non électricien)","Habilitation HC (consignation HT)","Aucune habilitation formelle"]}
              values={form.ing_habilitations_elec} onChange={setArr("ing_habilitations_elec")} />
          )}
          <G2>
            <Field label="Budget projet géré max (MCHF)" type="number" placeholder="2.5" value={form.ing_budget_projet_mchf} onChange={set("ing_budget_projet_mchf")} accentColor={ac} hint="0 si pas de gestion budget" />
            <Field label="Taille max équipe technique" type="number" placeholder="0" value={form.ing_equipe_max} onChange={set("ing_equipe_max")} accentColor={ac} hint="0 si pas de management" />
          </G2>
          <CheckboxGroup label="Certifications gestion de projet" accentColor={ac}
            options={["PMP (PMI)","IPMA Level C","IPMA Level B","Prince2 Foundation","Prince2 Practitioner","Scrum Master (CSM / PSM)","SAFe Agilist","Aucune"]}
            values={form.ing_certif_projet} onChange={setArr("ing_certif_projet")} />
        </Section>
      )}

      {/* ══════════════════════════════════════════════════
          4-D. COMPÉTENCES PAYSAGISME
      ══════════════════════════════════════════════════ */}
      {secteur==="Paysagisme" && (
        <Section title="Compétences Paysagisme & Aménagements extérieurs" icon="🌿" accentColor={ac}>
          <SelectField label="Spécialité principale" value={form.pay_specialite} onChange={set("pay_specialite")} required accentColor={ac}
            options={[{value:"",label:"Sélectionnez..."},{value:"Jardinier-paysagiste",label:"🌱 Jardinier-paysagiste (CFC)"},{value:"AFP Paysagiste",label:"🌾 Aide-paysagiste (AFP)"},{value:"Maçon paysagiste",label:"🧱 Maçon paysagiste / maçonnerie paysagère"},{value:"Arboriste-grimpeur",label:"🌳 Arboriste-grimpeur (ISA / ECC)"},{value:"Technicien irrigation",label:"💧 Technicien irrigation / arrosage automatique"},{value:"Chef de chantier",label:"👷 Chef de chantier paysagiste"},{value:"Conducteur de travaux",label:"📋 Conducteur de travaux"},{value:"Dessinateur-projeteur",label:"📐 Dessinateur-projeteur (AutoCAD / SketchUp)"},{value:"Entretien espaces verts",label:"🌾 Technicien entretien espaces verts / parcs"},{value:"Directeur technique",label:"🏗️ Directeur technique / Responsable production"}]} />
          <CheckboxGroup label="Compétences techniques opérationnelles" accentColor={ac} hint="Tout ce que vous maîtrisez seul sur chantier"
            options={["Maçonnerie paysagère (murs, escaliers)","Dallage / Pavage / Terrassement","Murs de soutènement (béton, pierres naturelles)","Pose gazon naturel en rouleaux","Gazon synthétique (pose & colles)","Arrosage automatique (programmation, réparation)","Toitures végétalisées (extensif / intensif)","Bassins / Étangs ornementaux / Fontaines","Terrains de sport (SN 566)","Espaces publics et abords routiers (SN 640)","Taille formation / entretien arbres et arbustes","Élagage / Abattage en sécurité (travaux en hauteur)","Plantations massifs, haies, vivaces","SketchUp (modélisation 3D)","AutoCAD / Land F·X (plans techniques)","Conduite mini-pelle / chargeur frontal","Conduite tracteur / porte-outil"]}
            values={form.pay_competences} onChange={setArr("pay_competences")} />
          <CheckboxGroup label="Diplômes, certifications & formations" accentColor={ac}
            options={["CFC Paysagiste (AFP inclus)","AFP Paysagiste","Arboriste certifié ISA (International)","Arboriste certifié ECC (Suisse)","Certificat phytosanitaires OFAG (obligatoire CH)","SUVA : travaux en hauteur","Permis nacelle (IPAF / IACSS)","Qualification SN 566 terrains de sport","Formation Chef de chantier (OACOT / branche)","Formation béton / maçonnerie","Formation irrigation (ASRI / Hunter / Rain Bird)"]}
            values={form.pay_certifications} onChange={setArr("pay_certifications")} />
          <G2>
            <SelectField label="Permis de conduire" value={form.pay_permis} onChange={set("pay_permis")} accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"B",label:"Permis B"},{value:"BE",label:"Permis B+E (remorque ≤ 3,5t)"},{value:"C",label:"Permis C (camion)"},{value:"CE",label:"Permis C+E (camion + remorque)"}]} />
            <SelectField label="Type de contrat recherché" value={form.pay_contrat} onChange={set("pay_contrat")} accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"CDI",label:"CDI — poste fixe"},{value:"CDD saison",label:"CDD saisonnier (mars–oct.)"},{value:"Temporaire",label:"Renfort temporaire"},{value:"Indifférent",label:"Indifférent"}]} />
          </G2>
          <Toggle label="Permis engins de chantier (mini-pelle, chargeur, tracteur...)" sublabel="Je suis habilité·e à conduire des engins sur chantier sans supervision" checked={form.pay_engins} onChange={e=>setForm(f=>({...f,pay_engins:e.target.checked}))} accentColor={ac} />
          <CheckboxGroup label="Zone(s) d'intervention souhaitée(s)" accentColor={ac}
            options={["Canton de Vaud (VD)","Canton de Genève (GE)","Canton de Fribourg (FR)","Canton du Valais (VS)","Canton de Neuchâtel (NE)","Canton de Berne (BE)","Suisse romande entière","Suisse alémanique","Suisse entière"]}
            values={form.pay_zone_intervention} onChange={setArr("pay_zone_intervention")} />
          <CheckboxGroup label="Types de clients / chantiers" accentColor={ac} hint="Avec qui avez-vous principalement travaillé ?"
            options={["Clientèle privée (particuliers, villas)","Collectivités / communes / canton","Grands comptes / entreprises","Régies immobilières / PPE","Hôtels / hospitality / resorts","Terrains de sport / clubs","Domaines viticoles / agricoles","Promoteurs immobiliers"]}
            values={form.pay_types_clients} onChange={setArr("pay_types_clients")} />
        </Section>
      )}

      {/* ══════════════════════════════════════════════════
          4-E. COMPÉTENCES TÉLÉCOMMUNICATIONS & INFRASTRUCTURE
      ══════════════════════════════════════════════════ */}
      {secteur==="Télécommunications" && (
        <Section title="Compétences Télécommunications & Infrastructure" icon="📡" accentColor={ac}>

          {/* — Sous-domaine — sélecteur principal qui déverrouille les sections expertes — */}
          <CheckboxGroup label="Sous-domaine(s) de spécialité" accentColor={ac}
            hint="Cochez tous vos domaines — les champs correspondants s'afficheront"
            options={[
              "Réseau IP / Infrastructure réseau",
              "Radio mobile / RAN / 5G",
              "RNI / Conformité ORNI",
              "Fibre optique / FTTH / FTTB",
              "VoIP / Unified Communications",
              "Transmission / Microwave"
            ]}
            values={form.tel_sous_domaine} onChange={setArr("tel_sous_domaine")} />

          {/* — Rôle actuel — */}
          <SelectField label="Poste / rôle visé" value={form.tel_specialite} onChange={set("tel_specialite")} required accentColor={ac}
            options={[
              {value:"",label:"Sélectionnez..."},
              {value:"Ingénieur réseau IP",label:"🌐 Ingénieur·e réseau IP / Infrastructure"},
              {value:"Architecte réseau",label:"🏗️ Architecte réseau / Network Designer"},
              {value:"Tech Lead / NOC Lead",label:"👨‍💼 Tech Lead réseau / Responsable NOC"},
              {value:"RF Planner",label:"📶 RF Planner / Planificateur radio"},
              {value:"Ingénieur RAN",label:"📡 Ingénieur RAN (déploiement 4G/5G)"},
              {value:"Spécialiste RNI / ORNI",label:"📏 Spécialiste RNI / Expert ORNI"},
              {value:"Géomaticien télécom",label:"🗺️ Géomaticien·ne télécom"},
              {value:"Technicien fibre",label:"🔌 Technicien·ne fibre optique"},
              {value:"Ingénieur VoIP / UC",label:"📞 Ingénieur·e VoIP / Unified Comm."},
              {value:"Ingénieur transmission",label:"⚡ Ingénieur·e transmission / Microwave"},
              {value:"Chef de projet télécom",label:"📋 Chef de projet télécom"},
              {value:"Pilote drone certifié",label:"🚁 Pilote drone certifié OFAC"},
            ]} />

          {/* ────────── RÉSEAU IP ────────── */}
          {hasTelDom("Réseau IP / Infrastructure réseau") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>RÉSEAU IP / INFRASTRUCTURE</span>
              </div>
              <CheckboxGroup label="Équipements réseau maîtrisés" accentColor={ac} hint="En configuration et troubleshooting autonome"
                options={["Cisco IOS / IOS-XE (switches, routers)","Cisco IOS-XR (ASR, NCS, CRS)","Cisco NX-OS (Nexus DC)","Nokia SR-OS (7750 SR, 7210 SAS)","Juniper JunOS (MX, EX, SRX)","Arista EOS (7000 series)","Huawei VRP (CE, NE)","Fortinet FortiOS (FortiGate)","Palo Alto PAN-OS","F5 BIG-IP (LTM/GTM)","HPE / Aruba CX","Extreme / Brocade"]}
                values={form.tel_stack_reseau} onChange={setArr("tel_stack_reseau")} />
              <CheckboxGroup label="Protocoles et technologies" accentColor={ac}
                options={["BGP (iBGP / eBGP)","MPLS / SR-MPLS","OSPF / OSPFv3","IS-IS","VLAN / 802.1Q","VxLAN / EVPN","SD-WAN (Meraki, Viptela, Velocloud)","QoS (DSCP, policing, shaping)","IPv6 (dual-stack, migration)","DMVPN / GETVPN","IPSec / SSL VPN","DWDM / OTN (backbone)","Wireless (802.11ax / WiFi 6)"]}
                values={form.tel_protocols} onChange={setArr("tel_protocols")} />
              <CheckboxGroup label="Certifications réseau" accentColor={ac}
                options={["CCNA (Cisco)","CCNP Enterprise","CCNP Service Provider","CCIE Enterprise","CCIE Service Provider","JNCIA-Junos","JNCIP-SP / JNCIE-SP","Nokia SRC (NRS I / NRS II)","Arista ACE-L2","Fortinet NSE 4","Fortinet NSE 7","Palo Alto PCNSA / PCNSE","Huawei HCNA / HCNP","Aucune certification réseau"]}
                values={form.tel_certif_reseau} onChange={setArr("tel_certif_reseau")} />
              <CheckboxGroup label="Supervision / Monitoring / Automatisation" accentColor={ac}
                options={["Zabbix","PRTG Network Monitor","SolarWinds (NPM / NTA)","Netbox (DCIM / IPAM)","Ansible (automatisation réseau)","Python / Netmiko / NAPALM","Terraform / YANG (NetConf)","Grafana / Prometheus","Nagios / Icinga","LibreNMS","ELK Stack (logs réseau)"]}
                values={form.tel_supervision} onChange={setArr("tel_supervision")} />
            </>
          )}

          {/* ────────── RADIO / RAN / 5G ────────── */}
          {hasTelDom("Radio mobile / RAN / 5G") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>RADIO MOBILE / RAN / 5G</span>
              </div>
              <CheckboxGroup label="Technologies radio maîtrisées" accentColor={ac}
                options={["2G / GSM / GPRS / EDGE","3G / UMTS / HSPA+","4G / LTE / LTE-A Pro","5G NR (NSA — Standalone préparation)","5G NR (SA — Standalone)","GSM-R (ferroviaire)","Private LTE / Private 5G","Wi-Fi 6 / 6E (campus radio)","TETRA / PMR","LoRaWAN / NB-IoT / LTE-M"]}
                values={form.tel_tech_radio} onChange={setArr("tel_tech_radio")} />
              <CheckboxGroup label="Outils RF planning & drive test" accentColor={ac}
                options={["Atoll (Forsk)","RPS (Radio Planning Suite)","iBWave Design (indoor)","TEMS Investigation (Ericsson)","NEMO Outdoor / NEMO Handy (Nokia)","MapInfo Professional","Planet EV / Mentum Planet","CW (Continuous Wave) measurement","Accuver XCAL / XCAP","Infovista","Google Earth Pro"]}
                values={form.tel_outils_rf} onChange={setArr("tel_outils_rf")} />
              <CheckboxGroup label="Constructeurs RAN" accentColor={ac} hint="Sur lesquels vous avez travaillé en production"
                options={["Ericsson (ENM / OSS-RC / Radio System)","Nokia (NetAct / MantaRay / AirScale)","Huawei (U2020 / SingleRAN)","ZTE","Samsung","Mavenir / Altiostar (Open RAN)"]}
                values={form.tel_constructeurs_ran} onChange={setArr("tel_constructeurs_ran")} />
            </>
          )}

          {/* ────────── RNI / CONFORMITÉ ORNI ────────── */}
          {hasTelDom("RNI / Conformité ORNI") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>RNI / CONFORMITÉ ORNI</span>
              </div>
              <CheckboxGroup label="Normes & réglementations maîtrisées" accentColor={ac} hint="Celles que vous appliquez opérationnellement"
                options={["ORNI (Ordonnance sur la Protection contre le Rayonnement Non Ionisant, CH)","OFCOM / LTC (Loi sur les télécommunications CH)","Procédures cantonales de dépôt permis antennes","EN 50492 (méthodes in-situ EMF)","EN 50383 / EN 62232 (calcul EMF antennes)","EN 50413 (exposition travailleurs)","ICNIRP 2020 (lignes directrices internationales)","UIT-R K.52 / K.61 / K.70","RED 2014/53/UE (directive équipements radio)"]}
                values={form.tel_normes} onChange={setArr("tel_normes")} />
              <CheckboxGroup label="Appareils de mesure RNI utilisés en autonomie" accentColor={ac}
                options={["Narda SRM-3006 (spectre 100 kHz–6 GHz)","Narda SRM-3000","Narda ELT-400 (champ électrique basse fréq.)","Rohde & Schwarz FSH (analyseur portable)","Rohde & Schwarz SMR / FSUP","Anritsu SITEMASTER S331L/S332E","Spectromètre portable (autre marque)","Antenne isotrope calibrée (Narda, Aaronia)","Sonde de champ magnétique","GPS différentiel (RTK)","Station totale (Leica, Trimble)"]}
                values={form.tel_outils_mesure} onChange={setArr("tel_outils_mesure")} />
              <CheckboxGroup label="Logiciels EMF & SIG" accentColor={ac}
                options={["ArcGIS Pro / ArcGIS Online (Esri)","QGIS","AutoCAD / Civil 3D","Google Earth Pro","Python / scripts calcul EMF (NumPy, pandas)","WRAP (logiciel calcul RNI)","Suite Office / Excel avancé (modèles EMF)"]}
                values={form.tel_logiciels_rnl} onChange={setArr("tel_logiciels_rnl")} />
              <Toggle label="Expérience dossiers de permis de construire antennes ORNI"
                sublabel="Constitution et dépôt de dossiers ORNI complets auprès d'autorités cantonales"
                checked={form.tel_dossiers_permis} onChange={setCheck("tel_dossiers_permis")} accentColor={ac} />
            </>
          )}

          {/* ────────── FIBRE OPTIQUE ────────── */}
          {hasTelDom("Fibre optique / FTTH / FTTB") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>FIBRE OPTIQUE / FTTH / FTTB</span>
              </div>
              <CheckboxGroup label="Compétences fibre optique" accentColor={ac}
                options={["Soudure fibre (épissure à fusion) — monomode","Soudure fibre — multimode","Mesure OTDR (Viavi, JDSU, Anritsu)","Mesure de puissance optique","Câblage souterrain FTTH (tirage tube, chambre)","Câblage aérien (façade, poteau)","Installation armoires FDI / FDP / OTO","Distribution indoor (immeuble / entreprise)","Pose micro-tubages (micro-tranchée)","Plans câblage GIS / SIG (ArcGIS, QGIS)","Gestion coloration fibres G.652 / G.657","Raccordement clients GPON / XGS-PON"]}
                values={form.tel_competences_fibre} onChange={setArr("tel_competences_fibre")} />
            </>
          )}

          {/* ────────── VOIP / UC ────────── */}
          {hasTelDom("VoIP / Unified Communications") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>VOIP / UNIFIED COMMUNICATIONS</span>
              </div>
              <CheckboxGroup label="Plateformes VoIP / UC maîtrisées" accentColor={ac}
                options={["Cisco CUCM / Cisco Unity","Cisco Webex Calling / Webex Meetings","Microsoft Teams Phone / Direct Routing","Microsoft Teams Rooms","Avaya Aura / IP Office","Mitel MiVoice","3CX","Asterisk / FreePBX","Zoom Phone","RingCentral","Alcatel-Lucent OXO / OXE"]}
                values={form.tel_voip_stack} onChange={setArr("tel_voip_stack")} />
              <CheckboxGroup label="Protocoles VoIP" accentColor={ac}
                options={["SIP (Session Initiation Protocol)","H.323","MGCP","RTP / SRTP","WebRTC","SCCP (Skinny)","ISDN / PRI / BRI","SIP Trunking","E1 / T1"]}
                values={form.tel_protocols_uc} onChange={setArr("tel_protocols_uc")} />
            </>
          )}

          {/* ────────── TRANSMISSION / MICROWAVE ────────── */}
          {hasTelDom("Transmission / Microwave") && (
            <>
              <div style={{ padding:"8px 12px", background:`${ac}08`, borderRadius:8, borderLeft:`3px solid ${ac}` }}>
                <span style={{ color:ac, fontSize:".78rem", fontWeight:700 }}>TRANSMISSION / MICROWAVE / BACKBONE</span>
              </div>
              <CheckboxGroup label="Technologies de transmission" accentColor={ac}
                options={["SDH / STM-1/4/16/64 (PDH legacy)","OTN / OTU-1/2/3/4","DWDM (Dense WDM)","CWDM","Microwave PTN (Ericsson MINI-LINK, Nokia, Ceragon)","IP/MPLS backbone","ROADM (Reconfigurable Optical Add-Drop)","Packet Optical Transport (T-MPLS / MPLS-TP)","Sub-marine / Long-haul"]}
                values={form.tel_tech_transmission} onChange={setArr("tel_tech_transmission")} />
            </>
          )}

          {/* — Champs communs à TOUS les sous-domaines télécom — */}
          <CheckboxGroup label="Opérateurs / clients / employeurs précédents" accentColor={ac}
            options={["Swisscom","Sunrise / UPC","Salt Mobile","SBB / CFF Telecom (GSM-R)","Ericsson Suisse","Nokia Suisse","Huawei Suisse","Axians Suisse","Elca / Cablex","Bureau d'études RNI / Conformité","Administration cantonale / OFCOM","Opérateur MVNO / entreprise privée"]}
            values={form.tel_exp_operateurs} onChange={setArr("tel_exp_operateurs")} />
          <G2>
            <SelectField label="Permis de conduire" value={form.tel_permis} onChange={set("tel_permis")} accentColor={ac}
              options={[{value:"",label:"Sélectionnez..."},{value:"B",label:"Permis B"},{value:"BE",label:"Permis B+E"},{value:"C",label:"Permis C"},{value:"aucun",label:"Pas de permis"}]} />
            <SelectField label="Certification drone OFAC" value={form.tel_ofac_niveau} onChange={set("tel_ofac_niveau")} accentColor={ac}
              options={[{value:"",label:"Pas de certification drone"},{value:"A1/A3",label:"OFAC A1 / A3"},{value:"A2",label:"OFAC A2 (jusqu'à 4 kg)"},{value:"STS",label:"STS (opérations spécifiques)"},{value:"En cours",label:"En cours d'obtention"}]} />
          </G2>
          {form.tel_ofac_niveau && form.tel_ofac_niveau!=="En cours" && (
            <Toggle label="Certification drone OFAC en cours de validité"
              sublabel="Je confirme que mon attestation n'est pas expirée"
              checked={form.tel_drone_certif} onChange={setCheck("tel_drone_certif")} accentColor={ac} />
          )}
          <CheckboxGroup label="Cantons d'intervention habituels" accentColor={ac}
            options={["Vaud (VD)","Genève (GE)","Fribourg (FR)","Valais (VS)","Neuchâtel (NE)","Berne (BE)","Zürich (ZH)","Argovie (AG)","Suisse romande entière","Suisse entière"]}
            values={form.tel_cantons} onChange={setArr("tel_cantons")} />
        </Section>
      )}

      {/* ══════════════════════════════════════════════════
          5. MOTIVATIONS
      ══════════════════════════════════════════════════ */}
      <Section title="Votre profil en quelques mots" icon="💬" accentColor={ac}>
        <TextareaField label="Pourquoi envisagez-vous un changement ?" placeholder="Contexte actuel, ce que vous recherchez, vos critères prioritaires..." value={form.motif_changement} onChange={set("motif_changement")} required accentColor={ac} rows={3} />
        <TextareaField label="Votre plus grand succès professionnel" placeholder="Situation, actions menées, résultat mesurable (STAR)..." value={form.succes} onChange={set("succes")} accentColor={ac} hint="Optionnel" rows={3} />
      </Section>

      {/* ══════════════════════════════════════════════════
          6. CV
      ══════════════════════════════════════════════════ */}
      <Section title="Votre CV" icon="📄" accentColor={ac}>
        <PdfUpload label="CV" hint="PDF · Max 10 MB — seuls nos consultants y ont accès"
          file={form.cv_file} onFile={handleFile} onRemove={()=>setForm(f=>({...f,cv_file:null}))}
          accentColor={ac} dragOver={dragOver} setDragOver={setDragOver} fileRef={fileRef} />
      </Section>

      {/* ══════════════════════════════════════════════════
          7. RGPD
      ══════════════════════════════════════════════════ */}
      <div style={{ padding:"14px 0", display:"flex", flexDirection:"column", gap:12 }}>
        {[
          {key:"consentement",text:"J'accepte que TalentFlux traite mes données personnelles pour ma recherche d'emploi, conformément à la LPD suisse et au RGPD.",required:true},
          {key:"consentement_opportunites",text:"Je souhaite être recontacté·e pour de futures opportunités correspondant à mon profil.",required:false},
        ].map(({key,text,required})=>(
          <label key={key} style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
            <input type="checkbox" checked={form[key]} onChange={setCheck(key)} style={{ marginTop:3, accentColor:ac, width:16, height:16, flexShrink:0 }} />
            <span style={{ color:"#94A3B8", fontSize:".82rem", lineHeight:1.6 }}>{text} {required&&<span style={{ color:ac }}>*</span>}</span>
          </label>
        ))}
      </div>

      {error&&(
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"11px 14px", borderRadius:10, background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.25)", marginBottom:8 }}>
          <AlertCircle size={14} style={{ color:"#EF4444", flexShrink:0 }} />
          <span style={{ color:"#FCA5A5", fontSize:".83rem" }}>{error}</span>
        </div>
      )}

      <button type="submit" disabled={loading}
        style={{ width:"100%", padding:"15px 24px", borderRadius:14, border:"none",
          background:loading?`${ac}40`:theme.btnGradient,
          color:theme.btnTextColor||"#fff", fontWeight:700, fontSize:".95rem",
          cursor:loading?"not-allowed":"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow:loading?"none":theme.btnShadow, transition:"all .3s", fontFamily:"'DM Sans',sans-serif" }}
        onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.filter="brightness(1.1)";}}}
        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.filter="none";}}>
        {loading
          ?<><div style={{ width:17,height:17,border:"2px solid rgba(255,255,255,.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin .8s linear infinite" }}/>Envoi en cours...</>
          :<><Send size={17}/>{labels.submitBtn}</>}
      </button>
      <p style={{ color:"#334155", fontSize:".68rem", textAlign:"center", marginTop:8 }}>🔒 Données chiffrées · Supabase · LPD & RGPD conformes</p>
    </form>
  );
}
