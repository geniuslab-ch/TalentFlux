import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";
import {
  Users, Briefcase, Star, Trophy, LogOut, Plus, X,
  ChevronDown, ChevronUp, Search, RefreshCw, AlertTriangle,
  CheckCircle, Clock, Link2, Eye, Save, Shield, Zap, Sparkles, Bot
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────
const C = {
  bg:      "#0B0F1A",
  sidebar: "#080D18",
  card:    "rgba(15,23,42,0.9)",
  border:  "rgba(255,255,255,0.07)",
  text:    "#F1F5F9",
  muted:   "#94A3B8",
  subtle:  "#475569",
  blue:    "#3B82F6",
  blueL:   "#60A5FA",
  teal:    "#14B8A6",
  tealL:   "#2DD4BF",
  gold:    "#D4AF5A",
  purple:  "#818CF8",
  red:     "#EF4444",
};

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "TalentFlux2025!";

// ── Helpers ───────────────────────────────────────────────
const Badge = ({ label, color }) => (
  <span style={{
    padding: "2px 10px", borderRadius: 100, fontSize: ".7rem", fontWeight: 700,
    background: `${color}15`, border: `1px solid ${color}40`, color,
  }}>{label}</span>
);

const ScoreBadge = ({ score }) => {
  const color = score >= 80 ? C.teal : score >= 60 ? C.gold : score >= 40 ? "#F97316" : C.red;
  return (
    <span style={{
      padding: "3px 12px", borderRadius: 100, fontSize: ".78rem", fontWeight: 800,
      background: `${color}15`, border: `1px solid ${color}50`, color,
      fontFamily: "'DM Mono', monospace",
    }}>{score}%</span>
  );
};

const Btn = ({ onClick, children, variant = "primary", small, disabled }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg, #2563EB, #0EA5E9)`, color: "#fff", border: "none", boxShadow: "0 0 16px rgba(14,165,233,.3)" },
    ghost:   { background: "rgba(255,255,255,.05)", color: C.muted, border: `1px solid ${C.border}` },
    danger:  { background: "rgba(239,68,68,.1)", color: C.red, border: "1px solid rgba(239,68,68,.25)" },
    teal:    { background: `linear-gradient(135deg, #0F766E, #14B8A6)`, color: "#fff", border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        ...styles[variant],
        padding: small ? "6px 14px" : "9px 18px",
        borderRadius: 10, fontWeight: 700, fontSize: small ? ".75rem" : ".84rem",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .5 : 1,
        display: "inline-flex", alignItems: "center", gap: 6, transition: "all .2s",
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >{children}</button>
  );
};

// ── Tag selector (multi-select chips) ───────────────────
const TagSelector = ({ label, options, values = [], onChange, color = C.blue }) => {
  const toggle = (v) => {
    const next = values.includes(v) ? values.filter(x => x !== v) : [...values, v];
    onChange(next);
  };
  return (
    <div>
      {label && <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map(opt => {
          const sel = values.includes(opt);
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              style={{ padding: "5px 12px", borderRadius: 100, fontSize: ".78rem", fontWeight: 600, cursor: "pointer", transition: "all .15s", fontFamily: "'DM Sans',sans-serif",
                background: sel ? `${color}18` : "rgba(255,255,255,.04)",
                border: `1px solid ${sel ? color + "60" : C.border}`,
                color: sel ? color : C.subtle,
              }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text", placeholder, required }) => (
  <div>
    {label && <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}{required && <span style={{ color: C.blue }}> *</span>}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
      style={{ width: "100%", padding: "10px 13px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
      onFocus={e => { e.target.style.borderColor = C.blue + "80"; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
    />
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div>
    {label && <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{label}{required && <span style={{ color: C.blue }}> *</span>}</label>}
    <select value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "10px 13px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: value ? C.text : C.subtle, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none" }}
      onFocus={e => { e.target.style.borderColor = C.blue + "80"; }}
      onBlur={e => { e.target.style.borderColor = C.border; }}
    >
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#080D1A" }}>{o.label}</option>)}
    </select>
  </div>
);

const Modal = ({ title, onClose, children, width = 600 }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div style={{ background: "#0F172A", border: `1px solid ${C.border}`, borderRadius: 20, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${C.border}` }}>
        <h3 style={{ color: C.text, fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.subtle, padding: 4 }}><X size={18} /></button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

// ── LOGIN ─────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("tf_admin", "1");
      onLogin();
    } else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0B0F1A; } ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
      `}</style>
      <div style={{ width: 380, animation: shake ? "shake .5s ease" : "none" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 44, objectFit: "contain", marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Shield size={14} style={{ color: C.red }} />
            <span style={{ color: C.subtle, fontSize: ".82rem", fontFamily: "'DM Mono',monospace" }}>Accès restreint · Équipe TalentFlux</span>
          </div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32 }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: C.text, marginBottom: 24, textAlign: "center" }}>
            Interface Admin
          </h2>
          <div style={{ marginBottom: 16 }}>
            <Input label="Mot de passe" type="password" value={pwd} onChange={e => { setPwd(e.target.value); setError(false); }} placeholder="••••••••••••••" />
            {error && <p style={{ color: C.red, fontSize: ".78rem", marginTop: 6 }}>Mot de passe incorrect.</p>}
          </div>
          <button onClick={handleLogin}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#2563EB,#0EA5E9)", color: "#fff", fontWeight: 700, fontSize: ".92rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
            Accéder au tableau de bord
          </button>
        </div>
        <p style={{ textAlign: "center", color: C.subtle, fontSize: ".72rem", marginTop: 16, fontFamily: "'DM Mono',monospace" }}>
          talentflux.ch/admin · Confidentiel
        </p>
      </div>
    </div>
  );
}

// ── TAB CANDIDATS ─────────────────────────────────────────
function TabCandidats() {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSecteur, setFilterSecteur] = useState("");
  const [selected, setSelected] = useState(null);
  const [mandats, setMandats] = useState([]);
  const [linkMandat, setLinkMandat] = useState("");
  const [linking, setLinking] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("candidats").select("*").order("created_at", { ascending: false });
    setCandidats(data || []);
    const { data: m } = await supabase.from("mandats").select("id, titre_poste, secteur, statut").eq("statut", "Ouvert").order("created_at", { ascending: false });
    setMandats(m || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = candidats.filter(c => {
    const matchSearch = !search || `${c.prenom} ${c.nom} ${c.email}`.toLowerCase().includes(search.toLowerCase());
    const matchSecteur = !filterSecteur || c.secteur === filterSecteur;
    return matchSearch && matchSecteur;
  });

  const handleLink = async () => {
    if (!linkMandat || !selected) return;
    setLinking(true);
    const { error } = await supabase.from("evaluations").insert({
      candidat_id: selected.id,
      mandat_id: linkMandat,
      statut: "En analyse",
    });
    setLinking(false);
    if (!error) { setLinkSuccess(true); setTimeout(() => { setLinkSuccess(false); setLinkMandat(""); }, 2000); }
  };

  const secteurColor = { IT: C.blue, Finance: C.gold, "Ingénierie": "#818CF8", "Paysagisme": "#22C55E", "Télécommunications": "#0EA5E9" };

  return (
    <div>
      {/* Filtres */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.subtle }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par nom, email..."
            style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
        </div>
        <select value={filterSecteur} onChange={e => setFilterSecteur(e.target.value)}
          style={{ padding: "9px 14px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer" }}>
          <option value="">Tous secteurs</option>
          {["IT","Finance","Ingénierie","Paysagisme","Télécommunications"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <Btn onClick={load} variant="ghost" small><RefreshCw size={13} /> Actualiser</Btn>
      </div>

      {/* Compteur */}
      <p style={{ color: C.subtle, fontSize: ".78rem", marginBottom: 12, fontFamily: "'DM Mono',monospace" }}>
        {filtered.length} candidat{filtered.length > 1 ? "s" : ""} · {candidats.length} total
      </p>

      {/* Liste */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Chargement...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
              style={{ background: selected?.id === c.id ? "rgba(37,99,235,.08)" : C.card, border: `1px solid ${selected?.id === c.id ? C.blue + "50" : C.border}`, borderRadius: 14, padding: "14px 18px", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { if (selected?.id !== c.id) e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}
              onMouseLeave={e => { if (selected?.id !== c.id) e.currentTarget.style.borderColor = C.border; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${secteurColor[c.secteur] || C.blue}20`, border: `1px solid ${secteurColor[c.secteur] || C.blue}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: ".8rem", color: secteurColor[c.secteur] || C.blue }}>
                    {c.prenom?.[0]}{c.nom?.[0]}
                  </div>
                  <div>
                    <div style={{ color: C.text, fontWeight: 700, fontSize: ".92rem" }}>{c.prenom} {c.nom}</div>
                    <div style={{ color: C.subtle, fontSize: ".76rem", fontFamily: "'DM Mono',monospace" }}>{c.email}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge label={c.secteur} color={secteurColor[c.secteur] || C.blue} />
                  <Badge label={`${c.salaire_souhaite_chf?.toLocaleString() || "—"} CHF`} color={C.subtle} />
                  <Badge label={`${c.disponibilite_semaines || "?"} sem.`} color={C.teal} />
                  {selected?.id === c.id ? <ChevronUp size={15} style={{ color: C.subtle }} /> : <ChevronDown size={15} style={{ color: C.subtle }} />}
                </div>
              </div>

              {/* Détail expandé */}
              {selected?.id === c.id && (
                <div onClick={e => e.stopPropagation()} style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
                    {[
                      ["Expérience", `${c.annees_experience_total || 0} ans`],
                      ["Formation", c.niveau_formation || "—"],
                      ["Remote", `${c.remote_jours_souhaites || 0}j/sem`],
                      ["Dispo", `${c.disponibilite_semaines || 4} semaines`],
                      ["Langues", (c.langues_parlees || []).join(", ") || "—"],
                      ["Source", c.source || "—"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "8px 12px" }}>
                        <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>{k}</div>
                        <div style={{ color: C.text, fontSize: ".84rem", fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Hard skills selon secteur */}
                  {c.secteur === "IT" && c.it_stack_principal && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Stack IT</div>
                      <div style={{ color: C.blueL, fontSize: ".84rem", fontFamily: "'DM Mono',monospace" }}>{c.it_stack_principal}</div>
                    </div>
                  )}
                  {c.secteur === "Finance" && c.fin_specialite && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Spécialité Finance</div>
                      <div style={{ color: C.gold, fontSize: ".84rem" }}>{c.fin_specialite} {c.fin_normes_maitrisees?.length ? `· ${c.fin_normes_maitrisees.join(", ")}` : ""}</div>
                    </div>
                  )}
                  {c.secteur === "Ingénierie" && c.ing_specialite && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: C.subtle, fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Spécialité Ingénierie</div>
                      <div style={{ color: C.purple, fontSize: ".84rem" }}>{c.ing_specialite} {c.ing_cao_logiciels?.length ? `· ${c.ing_cao_logiciels.join(", ")}` : ""}</div>
                    </div>
                  )}
                  {c.secteur === "Paysagisme" && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: "#22C55E", fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Spécialité Paysage</div>
                      <div style={{ color: C.text, fontSize: ".84rem" }}>{c.pay_specialite || "—"}</div>
                    </div>
                  )}

                  {/* Lier à un mandat */}
                  <div onClick={e => e.stopPropagation()} style={{ background: "rgba(37,99,235,.06)", border: `1px solid rgba(37,99,235,.15)`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>
                      <Link2 size={12} style={{ display: "inline", marginRight: 5 }} />
                      Lier à un mandat
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <select value={linkMandat} onChange={e => setLinkMandat(e.target.value)}
                        style={{ flex: 1, padding: "8px 12px", borderRadius: 9, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: linkMandat ? C.text : C.subtle, fontSize: ".84rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer" }}>
                        <option value="">Sélectionnez un mandat ouvert...</option>
                        {mandats.filter(m => m.secteur === c.secteur).map(m => (
                          <option key={m.id} value={m.id} style={{ background: "#080D1A" }}>{m.titre_poste}</option>
                        ))}
                      </select>
                      <Btn onClick={handleLink} disabled={!linkMandat || linking} small>
                        {linking ? "..." : linkSuccess ? <><CheckCircle size={12} /> Lié !</> : <><Link2 size={12} /> Lier</>}
                      </Btn>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Aucun candidat trouvé.</div>}
        </div>
      )}
    </div>
  );
}

// ── TAB MANDATS ───────────────────────────────────────────
// Matrice de priorités dynamique par skill

const PRIO_OPTIONS = [
  { value: "Non-négociable", label: "🔴 Non-négociable" },
  { value: "Souhaité",       label: "🟡 Souhaité" },
  { value: "Atout",          label: "🟢 Atout" },
  { value: "Non-évalué",     label: "⚪ Non-évalué" },
];

// Critères fixes (toujours présents quelle que soit la spécialité)
const FIXED_CRITERIA = [
  { key: "_formation",     label: "Formation / diplôme" },
  { key: "_langues",       label: "Langues parlées" },
  { key: "_exp_secteur",   label: "Expérience secteur" },
  { key: "_management",    label: "Management d'équipe" },
  { key: "_remote_fit",    label: "Compatibilité remote" },
  { key: "_disponibilite", label: "Disponibilité / préavis" },
  { key: "_salaire_fit",   label: "Salaire fit / budget" },
];

// Defaults selon le critère
const FIXED_DEFAULTS = {
  "_formation":     "Souhaité",
  "_langues":       "Souhaité",
  "_exp_secteur":   "Souhaité",
  "_management":    "Atout",
  "_remote_fit":    "Souhaité",
  "_disponibilite": "Souhaité",
  "_salaire_fit":   "Non-négociable",
};

const PAYSAGISME_SKILL_DEFAULTS = {
  "_formation":     "Souhaité",
  "_langues":       "Atout",
  "_exp_secteur":   "Non-négociable",
  "_management":    "Souhaité",
  "_remote_fit":    "Non-évalué",
  "_disponibilite": "Non-négociable",
  "_salaire_fit":   "Non-négociable",
};

// Composant : sélecteur de priorité pour un skill
const PrioSelect = ({ skillKey, label, value, onChange, accentColor }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "9px 14px", borderRadius: 10,
    background: value === "Non-négociable" ? "rgba(239,68,68,.06)"
               : value === "Souhaité"      ? "rgba(234,179,8,.06)"
               : value === "Atout"         ? "rgba(34,197,94,.06)"
               : "rgba(255,255,255,.02)",
    border: `1px solid ${
      value === "Non-négociable" ? "rgba(239,68,68,.25)"
    : value === "Souhaité"       ? "rgba(234,179,8,.25)"
    : value === "Atout"          ? "rgba(34,197,94,.25)"
    : C.border}`,
    transition: "all .2s",
  }}>
    <span style={{ color: C.text, fontSize: ".86rem", fontWeight: 500 }}>{label}</span>
    <select value={value} onChange={e => onChange(skillKey, e.target.value)}
      style={{ background: "rgba(8,13,26,.9)", border: `1px solid ${C.border}`, color: C.text,
        fontSize: ".8rem", borderRadius: 8, padding: "5px 10px", outline: "none",
        fontFamily: "'DM Sans',sans-serif", cursor: "pointer", minWidth: 155 }}>
      {PRIO_OPTIONS.map(o => (
        <option key={o.value} value={o.value} style={{ background: "#080D1A" }}>{o.label}</option>
      ))}
    </select>
  </div>
);

function TabMandats() {
  const [mandats, setMandats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = () => ({
    titre_poste: "", secteur: "", statut: "Ouvert",
    budget_min_chf: "", budget_max_chf: "",
    remote_policy: "Hybride", remote_jours_max: "2",
    exp_min_annees: "3", exp_ideal_annees: "6",
    localisation: "Lausanne", langue_1: "FR",
    score_seuil_min: "70", test_score_min: "12", test_requis: true,
    // Skills secteur
    it_stack_requis: [], it_stack_bonus: [], it_cloud_requis: "", it_contrat_accepte: [],
    fin_specialite_requise: "", fin_normes_requises: [], fin_erp_requis: [],
    ing_specialite_requise: "", ing_cao_requis: [], ing_normes_requises: [], ing_secteur_cible: "",
    // Paysagisme
    pay_specialite_requise: "", pay_competences_requises: [], pay_certifications: [],
    pay_contrat: "", pay_permis: "", pay_equipe_taille: "", pay_zone: "",
    // IT supplémentaire
    it_type_poste_requis: "", it_certif_cloud_requis: [],
    // Ingénierie supplémentaire
    ing_automates_requis: [], ing_habilitations_elec_requises: [], ing_certif_projet_requis: [],
    // Finance supplémentaire
    fin_industries_cibles: [], fin_certifications_requises: [],
    // Télécommunications — tronc commun
    tel_sous_domaine: [], tel_specialite: "", tel_operateurs: [],
    tel_drone_certif: false, tel_habilitations: "", tel_cantons_requis: [],
    // Télécom — Réseau IP
    tel_stack_reseau_requis: [], tel_protocols_requis: [],
    tel_certif_reseau_requises: [], tel_supervision_requis: [],
    // Télécom — Radio / RAN
    tel_tech_radio_requises: [], tel_outils_rf_requis: [], tel_constructeurs_ran_requis: [],
    // Télécom — RNI / ORNI
    tel_normes: [], tel_outils_mesure: [], tel_logiciels: [],
    tel_dossiers_permis_requis: false,
    // Télécom — Fibre
    tel_competences_fibre_requises: [],
    // Télécom — VoIP
    tel_voip_stack_requis: [], tel_protocols_uc_requis: [],
    // Télécom — Transmission
    tel_tech_transmission_requises: [],
    // Matrice dynamique JSONB
    prio_skills: { ...FIXED_DEFAULTS },
  });

  const [form, setForm] = useState(emptyForm());

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("mandats").select("*").order("created_at", { ascending: false });
    setMandats(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const setF = k => e => {
    const val = e.target.value;
    if (k === "secteur" && val === "Paysagisme") {
      setForm(f => ({ ...f, [k]: val, prio_skills: { ...f.prio_skills, ...PAYSAGISME_SKILL_DEFAULTS } }));
    } else if (k === "secteur" && val !== "Paysagisme") {
      setForm(f => ({ ...f, [k]: val }));
    } else {
      setForm(f => ({ ...f, [k]: val }));
    }
  };
  const setArr = k => v => setForm(f => ({ ...f, [k]: v }));

  // Met à jour une priorité dans prio_skills
  const setPrio = (skillKey, value) => {
    setForm(f => ({ ...f, prio_skills: { ...f.prio_skills, [skillKey]: value } }));
  };

  // Quand un skill est ajouté/retiré des chips, on sync prio_skills
  const syncSkills = (newSkills, prevSkills, defaultPrio = "Souhaité") => {
    setForm(f => {
      const current = { ...(typeof f.prio_skills === "object" ? f.prio_skills : FIXED_DEFAULTS) };
      // Ajouter les nouveaux skills
      newSkills.forEach(s => { if (!(s in current)) current[s] = defaultPrio; });
      // Supprimer les skills désélectionnés (pas les critères fixes _xxx)
      prevSkills.forEach(s => { if (!newSkills.includes(s) && !s.startsWith("_")) delete current[s]; });
      return { ...f, prio_skills: current };
    });
  };

  const handleSkillChange = (key, newArr) => {
    const prevArr = form[key] || [];
    setArr(key)(newArr);
    syncSkills(newArr, prevArr);
  };

  const openNew = () => { setEditing(null); setForm(emptyForm()); setShowForm(true); };

  const openEdit = (m) => {
    setEditing(m);
    const prio = (m.prio_skills && typeof m.prio_skills === "object") ? m.prio_skills : { ...FIXED_DEFAULTS };
    setForm({
      titre_poste:          m.titre_poste || "",
      secteur:              m.secteur || "",
      statut:               m.statut || "Ouvert",
      budget_min_chf:       m.budget_min_chf || "",
      budget_max_chf:       m.budget_max_chf || "",
      remote_policy:        m.remote_policy || "Hybride",
      remote_jours_max:     m.remote_jours_max ?? "2",
      exp_min_annees:       m.exp_min_annees ?? "3",
      exp_ideal_annees:     m.exp_ideal_annees ?? "6",
      localisation:         m.localisation || "Lausanne",
      langue_1:             m.langue_1 || "FR",
      score_seuil_min:      m.score_seuil_min ?? "70",
      test_score_min:       m.test_score_min ?? "12",
      test_requis:          m.test_score_min !== null && m.test_score_min !== undefined,
      it_stack_requis:      m.it_stack_requis || [],
      it_stack_bonus:       m.it_stack_bonus || [],
      it_cloud_requis:      m.it_cloud_requis || "",
      it_contrat_accepte:   m.it_contrat_accepte || [],
      fin_specialite_requise: m.fin_specialite_requise || "",
      fin_normes_requises:  m.fin_normes_requises || [],
      fin_erp_requis:       m.fin_erp_requis || [],
      ing_specialite_requise: m.ing_specialite_requise || "",
      ing_cao_requis:       m.ing_cao_requis || [],
      ing_normes_requises:  m.ing_normes_requises || [],
      ing_secteur_cible:    m.ing_secteur_cible || "",
      pay_specialite_requise: m.pay_specialite_requise || "",
      pay_competences_requises: m.pay_competences_requises || [],
      pay_certifications:     m.pay_certifications || [],
      pay_contrat:            m.pay_contrat || "",
      pay_permis:             m.pay_permis || "",
      pay_equipe_taille:      m.pay_equipe_taille || "",
      pay_zone:               m.pay_zone || "",
      it_type_poste_requis:         m.it_type_poste_requis || "",
      it_certif_cloud_requis:       m.it_certif_cloud_requis || [],
      ing_automates_requis:         m.ing_automates_requis || [],
      ing_habilitations_elec_requises: m.ing_habilitations_elec_requises || [],
      ing_certif_projet_requis:     m.ing_certif_projet_requis || [],
      fin_industries_cibles:        m.fin_industries_cibles || [],
      fin_certifications_requises:  m.fin_certifications_requises || [],
      tel_sous_domaine:             m.tel_sous_domaine || [],
      tel_specialite:               m.tel_specialite || "",
      tel_operateurs:               m.tel_operateurs || [],
      tel_drone_certif:             m.tel_drone_certif || false,
      tel_habilitations:            m.tel_habilitations || "",
      tel_cantons_requis:           m.tel_cantons_requis || [],
      tel_stack_reseau_requis:      m.tel_stack_reseau_requis || [],
      tel_protocols_requis:         m.tel_protocols_requis || [],
      tel_certif_reseau_requises:   m.tel_certif_reseau_requises || [],
      tel_supervision_requis:       m.tel_supervision_requis || [],
      tel_tech_radio_requises:      m.tel_tech_radio_requises || [],
      tel_outils_rf_requis:         m.tel_outils_rf_requis || [],
      tel_constructeurs_ran_requis: m.tel_constructeurs_ran_requis || [],
      tel_normes:                   m.tel_normes || [],
      tel_outils_mesure:            m.tel_outils_mesure || [],
      tel_logiciels:                m.tel_logiciels || [],
      tel_dossiers_permis_requis:   m.tel_dossiers_permis_requis || false,
      tel_competences_fibre_requises: m.tel_competences_fibre_requises || [],
      tel_voip_stack_requis:        m.tel_voip_stack_requis || [],
      tel_protocols_uc_requis:      m.tel_protocols_uc_requis || [],
      tel_tech_transmission_requises: m.tel_tech_transmission_requises || [],
      prio_skills:          prio,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.titre_poste || !form.secteur) return;
    setSaving(true);
    const payload = {
      titre_poste:          form.titre_poste,
      secteur:              form.secteur,
      statut:               form.statut,
      budget_min_chf:       parseInt(form.budget_min_chf) || null,
      budget_max_chf:       parseInt(form.budget_max_chf) || null,
      remote_policy:        form.remote_policy,
      remote_jours_max:     parseInt(form.remote_jours_max) || 0,
      exp_min_annees:       parseInt(form.exp_min_annees) || 0,
      exp_ideal_annees:     parseInt(form.exp_ideal_annees) || 3,
      localisation:         form.localisation,
      langue_1:             form.langue_1,
      score_seuil_min:      parseInt(form.score_seuil_min) || 70,
      test_score_min:       form.test_requis ? (parseInt(form.test_score_min) || 12) : null,
      prio_skills:          form.prio_skills,
      it_stack_requis:      form.it_stack_requis,
      it_stack_bonus:       form.it_stack_bonus,
      it_cloud_requis:      form.it_cloud_requis || null,
      it_contrat_accepte:   form.it_contrat_accepte,
      fin_specialite_requise: form.fin_specialite_requise || null,
      fin_normes_requises:  form.fin_normes_requises,
      fin_erp_requis:       form.fin_erp_requis,
      ing_specialite_requise: form.ing_specialite_requise || null,
      ing_cao_requis:       form.ing_cao_requis,
      ing_normes_requises:  form.ing_normes_requises,
      ing_secteur_cible:    form.ing_secteur_cible || null,
      pay_specialite_requise: form.pay_specialite_requise || null,
      pay_competences_requises: form.pay_competences_requises,
      pay_certifications:     form.pay_certifications,
      pay_contrat:            form.pay_contrat || null,
      pay_permis:             form.pay_permis || null,
      pay_equipe_taille:      parseInt(form.pay_equipe_taille) || null,
      pay_zone:               form.pay_zone || null,
      it_type_poste_requis:         form.it_type_poste_requis || null,
      it_certif_cloud_requis:       form.it_certif_cloud_requis,
      ing_automates_requis:         form.ing_automates_requis,
      ing_habilitations_elec_requises: form.ing_habilitations_elec_requises,
      ing_certif_projet_requis:     form.ing_certif_projet_requis,
      fin_industries_cibles:        form.fin_industries_cibles,
      fin_certifications_requises:  form.fin_certifications_requises,
      tel_sous_domaine:             form.tel_sous_domaine,
      tel_specialite:               form.tel_specialite || null,
      tel_operateurs:               form.tel_operateurs,
      tel_drone_certif:             form.tel_drone_certif || false,
      tel_habilitations:            form.tel_habilitations || null,
      tel_cantons_requis:           form.tel_cantons_requis,
      tel_stack_reseau_requis:      form.tel_stack_reseau_requis,
      tel_protocols_requis:         form.tel_protocols_requis,
      tel_certif_reseau_requises:   form.tel_certif_reseau_requises,
      tel_supervision_requis:       form.tel_supervision_requis,
      tel_tech_radio_requises:      form.tel_tech_radio_requises,
      tel_outils_rf_requis:         form.tel_outils_rf_requis,
      tel_constructeurs_ran_requis: form.tel_constructeurs_ran_requis,
      tel_normes:                   form.tel_normes,
      tel_outils_mesure:            form.tel_outils_mesure,
      tel_logiciels:                form.tel_logiciels,
      tel_dossiers_permis_requis:   form.tel_dossiers_permis_requis,
      tel_competences_fibre_requises: form.tel_competences_fibre_requises,
      tel_voip_stack_requis:        form.tel_voip_stack_requis,
      tel_protocols_uc_requis:      form.tel_protocols_uc_requis,
      tel_tech_transmission_requises: form.tel_tech_transmission_requises,
    };
    if (editing) {
      await supabase.from("mandats").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("mandats").insert(payload);
    }
    setSaving(false); setShowForm(false); load();
  };

  const statut_color = { "Ouvert": C.teal, "En cours": C.gold, "Pourvu": C.blue, "Suspendu": C.subtle };

  // Skills actuellement dans la matrice (dynamiques uniquement)
  const dynamicSkills = Object.keys(form.prio_skills || {}).filter(k => !k.startsWith("_"));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p style={{ color: C.subtle, fontSize: ".78rem", fontFamily: "'DM Mono',monospace" }}>{mandats.length} mandat{mandats.length > 1 ? "s" : ""}</p>
        <Btn onClick={openNew}><Plus size={14} /> Nouveau mandat</Btn>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Chargement...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {mandats.map(m => (
            <div key={m.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: ".92rem", marginBottom: 4 }}>{m.titre_poste}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <Badge label={m.secteur} color={m.secteur === "IT" ? C.blue : m.secteur === "Finance" ? C.gold : m.secteur === "Paysagisme" ? "#22C55E" : m.secteur === "Télécommunications" ? "#0EA5E9" : C.purple} />
                  <Badge label={m.statut} color={statut_color[m.statut] || C.subtle} />
                  {m.budget_max_chf && <Badge label={`≤ ${m.budget_max_chf.toLocaleString()} CHF`} color={C.subtle} />}
                  {m.localisation && <Badge label={m.localisation} color={C.subtle} />}
                  {/* Aperçu matrice */}
                  {m.prio_skills && typeof m.prio_skills === "object" && Object.keys(m.prio_skills || {}).filter(k => !k.startsWith("_")).length > 0 && (
                    <Badge
                      label={`${Object.keys(m.prio_skills || {}).filter(k => !k.startsWith("_")).length} skills évalués`}
                      color={C.teal}
                    />
                  )}
                </div>
              </div>
              <Btn onClick={() => openEdit(m)} variant="ghost" small><Eye size={12} /> Éditer</Btn>
            </div>
          ))}
          {mandats.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Aucun mandat. Créez-en un !</div>}
        </div>
      )}

      {showForm && (
        <Modal title={editing ? "Éditer le mandat" : "Nouveau mandat"} onClose={() => setShowForm(false)} width={740}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Infos de base */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Titre du poste" value={form.titre_poste} onChange={setF("titre_poste")} placeholder="Lead Developer React" required />
              <Select label="Secteur" value={form.secteur} onChange={setF("secteur")} required
                options={[{value:"",label:"Sélectionnez..."},{value:"IT",label:"💻 IT"},{value:"Finance",label:"💰 Finance"},{value:"Ingénierie",label:"⚙️ Ingénierie"},{value:"Paysagisme",label:"🌿 Paysagisme"},{value:"Télécommunications",label:"📡 Télécommunications"}]} />
              <Input label="Budget min (CHF)" type="number" value={form.budget_min_chf} onChange={setF("budget_min_chf")} placeholder="100000" />
              <Input label="Budget max (CHF)" type="number" value={form.budget_max_chf} onChange={setF("budget_max_chf")} placeholder="140000" />
              <Select label="Remote policy" value={form.remote_policy} onChange={setF("remote_policy")}
                options={["Full Remote","Hybride","Présentiel"].map(v=>({value:v,label:v}))} />
              <Input label="Jours remote/sem max" type="number" value={form.remote_jours_max} onChange={setF("remote_jours_max")} placeholder="2" />
              <Input label="Exp. min (années)" type="number" value={form.exp_min_annees} onChange={setF("exp_min_annees")} placeholder="3" />
              <Input label="Exp. idéale (années)" type="number" value={form.exp_ideal_annees} onChange={setF("exp_ideal_annees")} placeholder="6" />
              <Input label="Localisation" value={form.localisation} onChange={setF("localisation")} placeholder="Lausanne" />
              <Select label="Statut" value={form.statut} onChange={setF("statut")}
                options={["Ouvert","En cours","Pourvu","Suspendu"].map(v=>({value:v,label:v}))} />
              <Input label="Score seuil shortlist (%)" type="number" value={form.score_seuil_min} onChange={setF("score_seuil_min")} placeholder="70" />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>Test technique</label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  padding: "10px 14px", borderRadius: 12,
                  background: form.test_requis ? "rgba(59,130,246,.08)" : "rgba(255,255,255,.03)",
                  border: `1px solid ${form.test_requis ? C.blue + "50" : C.border}`,
                  transition: "all .2s" }}>
                  <input type="checkbox" checked={form.test_requis}
                    onChange={e => setForm(f => ({ ...f, test_requis: e.target.checked }))}
                    style={{ width: 16, height: 16, accentColor: C.blue, flexShrink: 0 }} />
                  <div>
                    <div style={{ color: C.text, fontWeight: 600, fontSize: ".86rem" }}>
                      {form.test_requis ? "Test requis" : "Test optionnel"}
                    </div>
                    <div style={{ color: C.subtle, fontSize: ".72rem" }}>
                      {form.test_requis ? "Les 15% du test entrent dans le score" : "Les 15% sont redistribués aux autres critères"}
                    </div>
                  </div>
                </label>
                {form.test_requis && (
                  <Input label="Score minimum (/20)" type="number" value={form.test_score_min} onChange={setF("test_score_min")} placeholder="12" />
                )}
              </div>
            </div>

            {/* Skills IT */}
            {form.secteur === "IT" && (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  Compétences IT requises
                  <span style={{ color: C.subtle, fontWeight: 400, marginLeft: 8 }}>— chaque skill sélectionné alimente la matrice</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Select label="Type de poste visé" value={form.it_type_poste_requis} onChange={setF("it_type_poste_requis")}
                    options={[{value:"",label:"Indifférent"},{value:"Développeur full-stack",label:"Full-stack"},{value:"Développeur front-end",label:"Front-end"},{value:"Développeur back-end",label:"Back-end"},{value:"DevOps / SRE / Platform",label:"DevOps / SRE"},{value:"Data Engineer",label:"Data Engineer"},{value:"ML / IA",label:"ML / IA"},{value:"Cloud Architect",label:"Cloud Architect"},{value:"Tech Lead / Engineering Manager",label:"Tech Lead / EM"},{value:"RSSI / Sécurité",label:"RSSI / Sécurité"},{value:"QA / Test",label:"QA / Test"}]} />
                  <Select label="Cloud requis" value={form.it_cloud_requis} onChange={setF("it_cloud_requis")}
                    options={[{value:"",label:"Indifférent"},{value:"AWS",label:"AWS"},{value:"GCP",label:"Google Cloud"},{value:"Azure",label:"Azure"},{value:"Multi-cloud",label:"Multi-cloud"}]} />
                </div>
                <TagSelector label="Stack requise" color={C.blueL}
                  options={["React / Next.js","Vue.js","Angular","Node.js / Express","Python","Java / Spring","Go","PHP / Laravel",".NET / C#","TypeScript","DevOps / Kubernetes","Terraform","Data Engineering","ML / AI / LLM","Cybersécurité / Pentest"]}
                  values={form.it_stack_requis}
                  onChange={v => handleSkillChange("it_stack_requis", v)} />
                <TagSelector label="Stack bonus (atout)" color={C.tealL}
                  options={["GraphQL","Docker","Redis","PostgreSQL","MongoDB","Elasticsearch","Kafka","Spark","dbt","AWS CDK","Ansible"]}
                  values={form.it_stack_bonus}
                  onChange={v => handleSkillChange("it_stack_bonus", v)} />
                <TagSelector label="Certifications cloud / DevOps" color={C.purple}
                  options={["AWS SAA","AWS DevOps Pro","GCP Professional","Azure Architect","CKA","CKAD","Terraform Associate","CISSP","OSCP","CEH"]}
                  values={form.it_certif_cloud_requis}
                  onChange={v => handleSkillChange("it_certif_cloud_requis", v)} />
                <TagSelector label="Contrat accepté" color={C.gold}
                  options={["CDI","Mission","Indépendant"]}
                  values={form.it_contrat_accepte}
                  onChange={v => handleSkillChange("it_contrat_accepte", v)} />
              </div>
            )}

            {/* Skills Finance */}
            {form.secteur === "Finance" && (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: C.gold, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  Compétences Finance requises
                </div>
                <Select label="Spécialité recherchée" value={form.fin_specialite_requise} onChange={setF("fin_specialite_requise")}
                  options={[{value:"",label:"Toutes"},{value:"CFO / Direction financière",label:"CFO / Direction financière"},{value:"Contrôle de gestion",label:"Contrôle de gestion / FP&A"},{value:"Comptabilité / Clôture",label:"Chef comptable / Reporting"},{value:"Audit interne",label:"Audit interne / Risk"},{value:"Audit externe",label:"Audit externe (Big4)"},{value:"Trésorerie",label:"Trésorerie / Cash management"},{value:"M&A / Corporate Finance",label:"M&A / Corporate Finance"},{value:"Fiscalité",label:"Fiscalité / Tax"},{value:"Compliance / Conformité",label:"Compliance FINMA / AML"},{value:"Risk Management",label:"Risk Management"}]} />
                <TagSelector label="Normes requises" color={C.gold}
                  options={["Swiss GAAP RPC","IFRS","Code des Obligations (CO/OR)","US GAAP","Lux GAAP"]}
                  values={form.fin_normes_requises}
                  onChange={v => handleSkillChange("fin_normes_requises", v)} />
                <TagSelector label="ERP & outils requis" color={C.blueL}
                  options={["SAP FI/CO","SAP S/4HANA","Oracle Financials","Microsoft Dynamics 365","Abacus","Sage","Power BI","Cognos / TM1","Hyperion / EPBCS","Anaplan","Lucanet","Excel VBA / Power Query"]}
                  values={form.fin_erp_requis}
                  onChange={v => handleSkillChange("fin_erp_requis", v)} />
                <TagSelector label="Industries cibles" color={C.tealL}
                  options={["Banque / Finance de marché","Asset Management","Assurance","MedTech / Pharma","Industrie / Manufacturing","Horlogerie / Luxe","Immobilier","Start-up / Scale-up","Secteur public"]}
                  values={form.fin_industries_cibles}
                  onChange={v => handleSkillChange("fin_industries_cibles", v)} />
                <TagSelector label="Certifications requises" color={C.purple}
                  options={["Expert-comptable CH","ACCA","CFA Level 1","CFA Level 2/3","CMA","CIA","AMF / FINMA","Aucune exigée"]}
                  values={form.fin_certifications_requises}
                  onChange={v => handleSkillChange("fin_certifications_requises", v)} />
              </div>
            )}

            {/* Skills Ingénierie */}
            {form.secteur === "Ingénierie" && (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "#818CF8", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  Compétences Ingénierie requises
                </div>
                <Select label="Spécialité" value={form.ing_specialite_requise} onChange={setF("ing_specialite_requise")}
                  options={[{value:"",label:"Toutes"},{value:"Mécanique / Conception",label:"Mécanique / Conception / Horlogerie"},{value:"Électronique / Embarqué",label:"Électronique / Embarqué / Hardware"},{value:"Automation / Robotique",label:"Automation / Robotique / PLC"},{value:"Qualité / Réglementaire",label:"Qualité / Réglementaire (ISO / MDR)"},{value:"R&D / Innovation",label:"Direction R&D / Innovation"},{value:"Électrotechnique",label:"Électrotechnique / Énergies / HVAC"},{value:"Génie civil / Structure",label:"Génie civil / Structure"},{value:"Supply Chain / Industrialisation",label:"Supply Chain / Industrialisation"}]} />
                <TagSelector label="CAO / Simulation requis" color="#818CF8"
                  options={["SolidWorks","CATIA V5/V6","AutoCAD / Civil 3D","Inventor","CREO / Pro-E","NX Siemens","ANSYS","MATLAB / Simulink","LabVIEW","Altium Designer"]}
                  values={form.ing_cao_requis}
                  onChange={v => handleSkillChange("ing_cao_requis", v)} />
                <TagSelector label="Normes requises" color={C.tealL}
                  options={["ISO 9001","ISO 13485","MDR 2017/745 (DM)","IVDR 2017/746","IEC 62304","IEC 62061 / ISO 13849","CE Machines 2006/42","ISO 14001","ATEX","ISO 14971","AS9100"]}
                  values={form.ing_normes_requises}
                  onChange={v => handleSkillChange("ing_normes_requises", v)} />
                {form.ing_specialite_requise === "Automation / Robotique" && (
                  <TagSelector label="Automates / PLCs requis" color={C.blue}
                    options={["Siemens S7 / TIA Portal","Siemens WinCC","ABB","Rockwell / Allen-Bradley","Beckhoff TwinCAT","Schneider / Unity Pro","Fanuc","KUKA","Universal Robots"]}
                    values={form.ing_automates_requis}
                    onChange={v => handleSkillChange("ing_automates_requis", v)} />
                )}
                {(form.ing_specialite_requise === "Électrotechnique" || form.ing_specialite_requise === "Automation / Robotique") && (
                  <TagSelector label="Habilitations électriques requises (OIBT/NIBT)" color={C.gold}
                    options={["B0","BR","BC","B2V","B2T","H0","HC","Aucune exigée"]}
                    values={form.ing_habilitations_elec_requises}
                    onChange={v => handleSkillChange("ing_habilitations_elec_requises", v)} />
                )}
                <TagSelector label="Certifications gestion de projet" color={C.teal}
                  options={["PMP","IPMA Level C","IPMA Level B","Prince2","Scrum Master","SAFe Agilist","Aucune exigée"]}
                  values={form.ing_certif_projet_requis}
                  onChange={v => handleSkillChange("ing_certif_projet_requis", v)} />
              </div>
            )}

            {/* Skills Paysagisme */}
            {form.secteur === "Paysagisme" && (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "#22C55E", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  Compétences Paysagisme requises
                </div>
                <Select label="Spécialité recherchée" value={form.pay_specialite_requise || ""} onChange={setF("pay_specialite_requise")}
                  options={[{value:"",label:"Toutes spécialités"},{value:"Jardinier-paysagiste",label:"🌱 Jardinier-paysagiste (CFC)"},{value:"AFP Paysagiste",label:"🌾 Aide-paysagiste (AFP)"},{value:"Maçon paysagiste",label:"🧱 Maçon paysagiste"},{value:"Arboriste-grimpeur",label:"🌳 Arboriste-grimpeur (ISA/ECC)"},{value:"Technicien irrigation",label:"💧 Technicien irrigation"},{value:"Chef de chantier",label:"👷 Chef de chantier"},{value:"Conducteur de travaux",label:"📋 Conducteur de travaux"},{value:"Dessinateur-projeteur",label:"📐 Dessinateur-projeteur"},{value:"Directeur technique",label:"🏗️ Directeur technique"}]} />
                <TagSelector label="Compétences techniques requises" color="#22C55E"
                  options={["Maçonnerie paysagère","Dallage / Pavage","Murs de soutènement","Pose gazon naturel","Gazon synthétique","Arrosage automatique","Toitures végétalisées","Bassins / Étangs","Terrains de sport (SN 566)","Espaces publics (SN 640)","Taille / Élagage arbres","SketchUp","AutoCAD / Land F·X","Conduite mini-pelle / chargeur"]}
                  values={form.pay_competences_requises || []}
                  onChange={v => handleSkillChange("pay_competences_requises", v)} />
                <TagSelector label="Certifications requises" color="#4ADE80"
                  options={["CFC Paysagiste","AFP Paysagiste","Arboriste ISA","Arboriste ECC","Certificat phyto OFAG","SUVA Travaux en hauteur","IPAF (nacelle)","SN 566 (terrains de sport)","Chef de chantier OACOT"]}
                  values={form.pay_certifications || []}
                  onChange={v => handleSkillChange("pay_certifications", v)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Select label="Type de contrat" value={form.pay_contrat || ""} onChange={setF("pay_contrat")}
                    options={[{value:"",label:"Indifférent"},{value:"CDI",label:"CDI"},{value:"CDD saison",label:"CDD saison (mars–oct.)"},{value:"Temporaire",label:"Temporaire"},{value:"Apprentissage",label:"Apprentissage"}]} />
                  <Select label="Permis de conduire" value={form.pay_permis || ""} onChange={setF("pay_permis")}
                    options={[{value:"",label:"Indifférent"},{value:"B",label:"Permis B"},{value:"BE",label:"Permis B+E"},{value:"C",label:"Permis C (camion)"},{value:"CE",label:"Permis C+E"},{value:"Engins",label:"Permis engins requis"}]} />
                  <Input label="Taille équipe à gérer" type="number" value={form.pay_equipe_taille || ""} onChange={setF("pay_equipe_taille")} placeholder="0 si pas de management" />
                  <Select label="Zone d'intervention" value={form.pay_zone || ""} onChange={setF("pay_zone")}
                    options={[{value:"",label:"Indifférent"},{value:"Vaud",label:"Canton de Vaud"},{value:"Genève",label:"Canton de Genève"},{value:"Fribourg",label:"Canton de Fribourg"},{value:"Valais",label:"Canton du Valais"},{value:"Neuchâtel",label:"Canton de Neuchâtel"},{value:"Berne",label:"Canton de Berne"},{value:"Suisse romande",label:"Suisse romande"},{value:"Suisse entière",label:"Suisse entière"}]} />
                </div>
              </div>
            )}

            {/* Skills Télécommunications */}
            {form.secteur === "Télécommunications" && (() => {
              const hasTelDom = (...d) => d.some(x => (form.tel_sous_domaine || []).includes(x));
              return (
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "#0EA5E9", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>
                  Compétences Télécommunications requises
                  <span style={{ color: C.subtle, fontWeight: 400, marginLeft: 8 }}>— sélectionnez le(s) sous-domaine(s) pour afficher les champs</span>
                </div>

                <TagSelector label="Sous-domaine(s) du poste" color="#0EA5E9"
                  options={["Réseau IP / Infrastructure réseau","Radio mobile / RAN / 5G","RNI / Conformité ORNI","Fibre optique / FTTH / FTTB","VoIP / Unified Communications","Transmission / Microwave"]}
                  values={form.tel_sous_domaine || []}
                  onChange={v => handleSkillChange("tel_sous_domaine", v)} />

                <Select label="Rôle / poste visé" value={form.tel_specialite || ""} onChange={setF("tel_specialite")}
                  options={[{value:"",label:"Indifférent"},{value:"Ingénieur réseau IP",label:"🌐 Ingénieur réseau IP / Infrastructure"},{value:"Architecte réseau",label:"🏗️ Architecte réseau"},{value:"Tech Lead / NOC Lead",label:"👨‍💼 Tech Lead / Responsable NOC"},{value:"RF Planner",label:"📶 RF Planner / Planificateur radio"},{value:"Ingénieur RAN",label:"📡 Ingénieur RAN (4G/5G)"},{value:"Spécialiste RNI / ORNI",label:"📏 Spécialiste RNI / Expert ORNI"},{value:"Géomaticien télécom",label:"🗺️ Géomaticien télécom"},{value:"Technicien fibre",label:"🔌 Technicien fibre optique"},{value:"Ingénieur VoIP / UC",label:"📞 Ingénieur VoIP / UC"},{value:"Ingénieur transmission",label:"⚡ Ingénieur transmission / Microwave"},{value:"Chef de projet télécom",label:"📋 Chef de projet télécom"}]} />

                {/* ── RÉSEAU IP ── */}
                {hasTelDom("Réseau IP / Infrastructure réseau") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #0EA5E9" }}>
                    <span style={{ color: "#0EA5E9", fontSize: ".7rem", fontWeight: 700 }}>RÉSEAU IP</span>
                  </div>
                  <TagSelector label="Équipements requis" color={C.blueL}
                    options={["Cisco IOS / IOS-XE","Cisco IOS-XR (ASR/NCS)","Cisco NX-OS (Nexus)","Nokia SR-OS (7750/7210)","Juniper JunOS (MX/EX/SRX)","Arista EOS","Huawei VRP","Fortinet FortiGate","Palo Alto PAN-OS","F5 BIG-IP","HPE / Aruba CX"]}
                    values={form.tel_stack_reseau_requis}
                    onChange={v => handleSkillChange("tel_stack_reseau_requis", v)} />
                  <TagSelector label="Protocoles requis" color="#38BDF8"
                    options={["BGP (iBGP / eBGP)","MPLS / SR-MPLS","OSPF / OSPFv3","IS-IS","VLAN / 802.1Q","VxLAN / EVPN","SD-WAN","QoS (DSCP)","IPv6","DMVPN","IPSec / SSL VPN","DWDM / OTN","WiFi 6"]}
                    values={form.tel_protocols_requis}
                    onChange={v => handleSkillChange("tel_protocols_requis", v)} />
                  <TagSelector label="Certifications réseau requises" color={C.purple}
                    options={["CCNA","CCNP Enterprise","CCNP Service Provider","CCIE Enterprise","CCIE SP","JNCIA-Junos","JNCIP-SP","Nokia NRS I","Nokia NRS II","Fortinet NSE 4","Fortinet NSE 7","Palo Alto PCNSE","Aucune exigée"]}
                    values={form.tel_certif_reseau_requises}
                    onChange={v => handleSkillChange("tel_certif_reseau_requises", v)} />
                  <TagSelector label="Supervision / Automation requis" color={C.teal}
                    options={["Zabbix","PRTG","SolarWinds","Netbox (DCIM/IPAM)","Ansible","Python / Netmiko / NAPALM","Terraform / YANG","Grafana / Prometheus","LibreNMS","ELK Stack"]}
                    values={form.tel_supervision_requis}
                    onChange={v => handleSkillChange("tel_supervision_requis", v)} />
                </>)}

                {/* ── RADIO / RAN ── */}
                {hasTelDom("Radio mobile / RAN / 5G") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #38BDF8" }}>
                    <span style={{ color: "#38BDF8", fontSize: ".7rem", fontWeight: 700 }}>RADIO MOBILE / RAN / 5G</span>
                  </div>
                  <TagSelector label="Technologies radio requises" color="#38BDF8"
                    options={["2G / GSM","3G / UMTS","4G / LTE","5G NR NSA","5G NR SA (Standalone)","GSM-R (ferroviaire)","Private LTE / 5G","LoRaWAN / NB-IoT","TETRA / PMR"]}
                    values={form.tel_tech_radio_requises}
                    onChange={v => handleSkillChange("tel_tech_radio_requises", v)} />
                  <TagSelector label="Outils RF planning & drive test" color="#7DD3FC"
                    options={["Atoll (Forsk)","RPS (Radio Planning Suite)","iBWave (indoor)","TEMS Investigation","NEMO Outdoor / NEMO Handy","MapInfo","Infovista","Google Earth Pro"]}
                    values={form.tel_outils_rf_requis}
                    onChange={v => handleSkillChange("tel_outils_rf_requis", v)} />
                  <TagSelector label="Constructeurs RAN" color="#0369A1"
                    options={["Ericsson (ENM / Radio System)","Nokia (NetAct / AirScale)","Huawei (U2020 / SingleRAN)","ZTE","Samsung","Open RAN"]}
                    values={form.tel_constructeurs_ran_requis}
                    onChange={v => handleSkillChange("tel_constructeurs_ran_requis", v)} />
                </>)}

                {/* ── RNI / ORNI ── */}
                {hasTelDom("RNI / Conformité ORNI") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #7DD3FC" }}>
                    <span style={{ color: "#7DD3FC", fontSize: ".7rem", fontWeight: 700 }}>RNI / CONFORMITÉ ORNI</span>
                  </div>
                  <TagSelector label="Normes et réglementations" color="#7DD3FC"
                    options={["ORNI (Suisse)","OFCOM / LTC","Procédures cantonales dépôt permis","EN 50492","EN 50383 / EN 62232","ICNIRP 2020","UIT-R","RED (EU)"]}
                    values={form.tel_normes}
                    onChange={v => handleSkillChange("tel_normes", v)} />
                  <TagSelector label="Appareils de mesure" color="#0EA5E9"
                    options={["Narda SRM-3006","Narda SRM-3000","Narda ELT-400","R&S FSH","Anritsu SITEMASTER","GPS différentiel (RTK)","Station totale Leica/Trimble"]}
                    values={form.tel_outils_mesure}
                    onChange={v => handleSkillChange("tel_outils_mesure", v)} />
                  <TagSelector label="Logiciels EMF & SIG" color="#38BDF8"
                    options={["ArcGIS Pro","QGIS","AutoCAD / Civil 3D","Google Earth Pro","WRAP","Python / scripts EMF","Excel avancé"]}
                    values={form.tel_logiciels}
                    onChange={v => handleSkillChange("tel_logiciels", v)} />
                  <div style={{ padding: "12px 14px", borderRadius: 12, background: form.tel_dossiers_permis_requis ? "rgba(14,165,233,.08)" : "rgba(255,255,255,.03)", border: `1px solid ${form.tel_dossiers_permis_requis ? "rgba(14,165,233,.3)" : C.border}` }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.tel_dossiers_permis_requis || false}
                        onChange={e => setForm(f => ({ ...f, tel_dossiers_permis_requis: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: "#0EA5E9" }} />
                      <div>
                        <div style={{ color: C.text, fontWeight: 600, fontSize: ".86rem" }}>Expérience dossiers permis antennes (ORNI) obligatoire</div>
                        <div style={{ color: C.subtle, fontSize: ".72rem" }}>Constitution et dépôt de dossiers ORNI auprès des autorités cantonales</div>
                      </div>
                    </label>
                  </div>
                </>)}

                {/* ── FIBRE OPTIQUE ── */}
                {hasTelDom("Fibre optique / FTTH / FTTB") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #2DD4BF" }}>
                    <span style={{ color: "#2DD4BF", fontSize: ".7rem", fontWeight: 700 }}>FIBRE OPTIQUE</span>
                  </div>
                  <TagSelector label="Compétences fibre requises" color="#2DD4BF"
                    options={["Soudure fibre — monomode","Soudure fibre — multimode","Mesure OTDR","Câblage souterrain FTTH","Câblage aérien (façade / poteau)","Installation armoires FDI / FDP","Distribution indoor","Pose micro-tubages","Raccordement clients GPON / XGS-PON"]}
                    values={form.tel_competences_fibre_requises}
                    onChange={v => handleSkillChange("tel_competences_fibre_requises", v)} />
                </>)}

                {/* ── VOIP / UC ── */}
                {hasTelDom("VoIP / Unified Communications") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #818CF8" }}>
                    <span style={{ color: "#818CF8", fontSize: ".7rem", fontWeight: 700 }}>VOIP / UNIFIED COMMUNICATIONS</span>
                  </div>
                  <TagSelector label="Plateformes VoIP / UC requises" color="#818CF8"
                    options={["Cisco CUCM / Unity","Cisco Webex Calling","Microsoft Teams Phone","Avaya Aura","Mitel MiVoice","3CX","Asterisk / FreePBX","Zoom Phone","RingCentral"]}
                    values={form.tel_voip_stack_requis}
                    onChange={v => handleSkillChange("tel_voip_stack_requis", v)} />
                  <TagSelector label="Protocoles VoIP requis" color="#A78BFA"
                    options={["SIP","H.323","MGCP","RTP / SRTP","WebRTC","SCCP","ISDN / PRI","SIP Trunking"]}
                    values={form.tel_protocols_uc_requis}
                    onChange={v => handleSkillChange("tel_protocols_uc_requis", v)} />
                </>)}

                {/* ── TRANSMISSION ── */}
                {hasTelDom("Transmission / Microwave") && (<>
                  <div style={{ padding: "6px 10px", background: "rgba(14,165,233,.07)", borderRadius: 7, borderLeft: "3px solid #F59E0B" }}>
                    <span style={{ color: "#F59E0B", fontSize: ".7rem", fontWeight: 700 }}>TRANSMISSION / MICROWAVE</span>
                  </div>
                  <TagSelector label="Technologies de transmission" color="#F59E0B"
                    options={["SDH / STM-1/4/16/64","OTN / OTU-1/2/3/4","DWDM","CWDM","Microwave PTN (Ericsson / Nokia / Ceragon)","IP/MPLS backbone","ROADM","Packet Optical Transport"]}
                    values={form.tel_tech_transmission_requises}
                    onChange={v => handleSkillChange("tel_tech_transmission_requises", v)} />
                </>)}

                {/* Commun à tous les sous-domaines télécom */}
                <TagSelector label="Opérateurs / clients cibles" color="#0369A1"
                  options={["Swisscom","Sunrise / UPC","Salt","SBB / CFF Telecom","Ericsson Suisse","Nokia Suisse","Huawei Suisse","Axians","Cablex / Elca","Administration cantonale / OFCOM","MVNO / Opérateur privé"]}
                  values={form.tel_operateurs}
                  onChange={v => handleSkillChange("tel_operateurs", v)} />
                <TagSelector label="Cantons d'intervention" color="#0EA5E9"
                  options={["Vaud (VD)","Genève (GE)","Fribourg (FR)","Valais (VS)","Neuchâtel (NE)","Berne (BE)","Zürich (ZH)","Suisse romande entière","Suisse entière"]}
                  values={form.tel_cantons_requis}
                  onChange={v => handleSkillChange("tel_cantons_requis", v)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ padding: "12px 14px", borderRadius: 12, background: form.tel_drone_certif ? "rgba(14,165,233,.08)" : "rgba(255,255,255,.03)", border: `1px solid ${form.tel_drone_certif ? "rgba(14,165,233,.3)" : C.border}` }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.tel_drone_certif || false}
                        onChange={e => setForm(f => ({ ...f, tel_drone_certif: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: "#0EA5E9" }} />
                      <div>
                        <div style={{ color: C.text, fontWeight: 600, fontSize: ".86rem" }}>Certification drone OFAC requise</div>
                        <div style={{ color: C.subtle, fontSize: ".72rem" }}>A1/A2/A3 — prendre en compte dans sélection</div>
                      </div>
                    </label>
                  </div>
                  <Input label="Habilitations / accréditations requises" value={form.tel_habilitations || ""} onChange={setF("tel_habilitations")} placeholder="Ex: accès sites CFF, badge Swisscom…" />
                </div>
              </div>
              );
            })()}
            {/* ══ MATRICE DE PRIORITÉS DYNAMIQUE ══ */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>
                  Matrice de priorités
                </div>
                <p style={{ color: C.subtle, fontSize: ".78rem" }}>
                  Définissez l'importance de chaque compétence pour ce mandat. Les skills techniques sont ajoutés automatiquement depuis vos sélections ci-dessus.
                </p>
              </div>

              {/* Skills dynamiques (depuis les chips) */}
              {dynamicSkills.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: C.subtle, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue }} />
                    Compétences techniques sélectionnées
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {dynamicSkills.map(skill => (
                      <PrioSelect
                        key={skill}
                        skillKey={skill}
                        label={skill}
                        value={form.prio_skills[skill] || "Souhaité"}
                        onChange={setPrio}
                        accentColor={C.blue}
                      />
                    ))}
                  </div>
                </div>
              )}

              {dynamicSkills.length === 0 && form.secteur && (
                <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: `1px dashed ${C.border}`, color: C.subtle, fontSize: ".82rem", marginBottom: 16 }}>
                  Sélectionnez des compétences ci-dessus — elles apparaîtront ici pour être pondérées.
                </div>
              )}

              {/* Critères fixes */}
              <div>
                <div style={{ color: C.subtle, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.subtle }} />
                  Critères transversaux
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {FIXED_CRITERIA.map(({ key, label }) => (
                    <PrioSelect
                      key={key}
                      skillKey={key}
                      label={label}
                      value={form.prio_skills[key] || FIXED_DEFAULTS[key]}
                      onChange={setPrio}
                      accentColor={C.subtle}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8 }}>
              <Btn onClick={() => setShowForm(false)} variant="ghost">Annuler</Btn>
              <Btn onClick={handleSave} disabled={saving || !form.titre_poste || !form.secteur}>
                <Save size={14} />{saving ? "Sauvegarde..." : "Sauvegarder"}
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TAB ÉVALUATIONS ───────────────────────────────────────
function TabEvaluations() {
  const [evals, setEvals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("v_evaluations_scores").select("*").order("updated_at", { ascending: false });
    setEvals(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const [transcription, setTranscription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const openEdit = (ev) => {
    setEditing(ev);
    setTranscription(ev.transcription_entretien || "");
    setAiResult(null);
    setAiError(null);
    setScores({
      statut: ev.statut || "En analyse",
      test_score: ev.test_score ?? "",
      ss_leadership: ev.ss_leadership ?? 0,
      ss_communication: ev.ss_communication ?? 0,
      ss_adaptabilite: ev.ss_adaptabilite ?? 0,
      ss_rigueur: ev.ss_rigueur ?? 0,
      ss_autonomie: ev.ss_autonomie ?? 0,
      sc_formation: ev.sc_formation ?? 0,
      sc_technique: ev.sc_technique ?? 0,
      sc_langues: ev.sc_langues ?? 0,
      sc_exp_secteur: ev.sc_exp_secteur ?? 0,
      sc_management: ev.sc_management ?? 0,
      red_flag: ev.red_flag ?? false,
      red_flag_motif: ev.red_flag_motif || "",
      notes_consultant: ev.notes_consultant || "",
    });
  };

  const analyzeWithAI = async () => {
    if (!transcription.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const supabaseUrl = "https://aaknzniigmmrdjlakiry.supabase.co";
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/analyze-interview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            transcription,
            secteur: editing.mandat_secteur,
            titre_poste: editing.titre_poste,
          }),
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const parsed = data;

      // Auto-remplir les scores
      setScores(s => ({
        ...s,
        ss_leadership:    parsed.SS_leadership    ?? s.ss_leadership,
        ss_communication: parsed.SS_communication ?? s.ss_communication,
        ss_adaptabilite:  parsed.SS_adaptabilite  ?? s.ss_adaptabilite,
        ss_rigueur:       parsed.SS_rigueur        ?? s.ss_rigueur,
        ss_autonomie:     parsed.SS_autonomie      ?? s.ss_autonomie,
        sc_formation:     parsed.SC_formation      ?? s.sc_formation,
        sc_technique:     parsed.SC_technique      ?? s.sc_technique,
        sc_langues:       parsed.SC_langues        ?? s.sc_langues,
        sc_exp_secteur:   parsed.SC_exp_secteur    ?? s.sc_exp_secteur,
        sc_management:    parsed.SC_management     ?? s.sc_management,
        red_flag:         parsed.red_flag          ?? s.red_flag,
        red_flag_motif:   parsed.red_flag_motif    || s.red_flag_motif,
        notes_consultant: parsed.analyse           || s.notes_consultant,
      }));

      setAiResult(parsed);
    } catch (err) {
      setAiError("Erreur IA : " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...scores,
      test_score: scores.test_score === "" ? null : parseInt(scores.test_score),
      transcription_entretien: transcription || null,
      analyse_ia: aiResult?.analyse || scores.notes_consultant || null,
      points_forts: aiResult?.points_forts || null,
      points_vigilance: aiResult?.points_vigilance || null,
      recommandation_ia: aiResult?.recommandation || null,
    };
    await supabase.from("evaluations").update(payload).eq("id", editing.evaluation_id);
    setSaving(false); setEditing(null); load();
  };

  const setS = k => v => setScores(s => ({ ...s, [k]: v }));

  const STATUTS = ["En analyse","Test envoyé","Test reçu","Entretien planifié","Entretien fait","Shortlist","Présenté client","Offre","Embauché","Refusé"];
  const statut_color = { "Shortlist": C.teal, "Présenté client": C.blue, "Offre": C.gold, "Embauché": "#22C55E", "Refusé": C.red, "En analyse": C.subtle };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <p style={{ color: C.subtle, fontSize: ".78rem", fontFamily: "'DM Mono',monospace" }}>{evals.length} évaluation{evals.length > 1 ? "s" : ""}</p>
        <Btn onClick={load} variant="ghost" small><RefreshCw size={13} /> Actualiser</Btn>
      </div>

      {loading ? <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Chargement...</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {evals.map(ev => (
            <div key={ev.evaluation_id} style={{ background: C.card, border: `1px solid ${ev.red_flag ? C.red + "40" : C.border}`, borderRadius: 14, padding: "14px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: C.text, fontWeight: 700, fontSize: ".92rem" }}>{ev.candidat_nom}</span>
                    {ev.red_flag && <Badge label="🚨 Red Flag" color={C.red} />}
                  </div>
                  <div style={{ color: C.subtle, fontSize: ".76rem", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>
                    {ev.titre_poste} · {ev.mandat_secteur}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge label={ev.statut} color={statut_color[ev.statut] || C.subtle} />
                    {ev.score_matching_pct != null && <ScoreBadge score={ev.score_matching_pct} />}
                    {ev.test_score != null && <Badge label={`Test: ${ev.test_score}/20`} color={ev.test_score >= 12 ? C.teal : C.red} />}
                  </div>
                </div>
                <Btn onClick={() => openEdit(ev)} variant="ghost" small><Eye size={12} /> Saisir scores</Btn>
              </div>
            </div>
          ))}
          {evals.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Aucune évaluation. Liez des candidats à des mandats d'abord.</div>}
        </div>
      )}

      {editing && (
        <Modal title={`Évaluation — ${editing.candidat_nom}`} onClose={() => setEditing(null)} width={680}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ── ANALYSE IA ── */}
            <div style={{ background: "rgba(99,102,241,.06)", border: `1px solid rgba(99,102,241,.25)`, borderRadius: 14, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Sparkles size={15} style={{ color: "#A5B4FC" }} />
                <span style={{ color: "#A5B4FC", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>Analyse IA — Entretien</span>
                {aiResult && <Badge label="✓ Scores remplis" color={C.teal} />}
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>
                  Transcription ou notes d'entretien
                </label>
                <textarea value={transcription} onChange={e => setTranscription(e.target.value)} rows={5}
                  placeholder="Collez ici la transcription ou vos notes d'entretien... Ex: 7 ans React/TypeScript, maîtrise Node.js et AWS, autonome, bon communicant, disponible 3 semaines."
                  style={{ width: "100%", padding: "10px 13px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid rgba(99,102,241,.3)`, color: C.text, fontSize: ".86rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}
                  onFocus={e => { e.target.style.borderColor = "rgba(99,102,241,.6)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(99,102,241,.3)"; }}
                />
              </div>
              {aiError && (
                <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#FCA5A5", fontSize: ".8rem", marginBottom: 10 }}>
                  {aiError}
                </div>
              )}
              {aiResult && (
                <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(20,184,166,.06)", border: `1px solid ${C.teal}30`, marginBottom: 10 }}>
                  <div style={{ color: C.tealL, fontSize: ".7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
                    Résultat — Recommandation : <span style={{ color: aiResult.recommandation === "SHORTLIST" ? C.teal : aiResult.recommandation === "REFUS" ? C.red : C.gold }}>{aiResult.recommandation}</span>
                  </div>
                  {aiResult.points_forts?.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ color: C.subtle, fontSize: ".72rem" }}>Points forts : </span>
                      <span style={{ color: C.muted, fontSize: ".78rem" }}>{aiResult.points_forts.join(" · ")}</span>
                    </div>
                  )}
                  {aiResult.points_vigilance?.length > 0 && (
                    <div>
                      <span style={{ color: C.subtle, fontSize: ".72rem" }}>Vigilance : </span>
                      <span style={{ color: "#FCD34D", fontSize: ".78rem" }}>{aiResult.points_vigilance.join(" · ")}</span>
                    </div>
                  )}
                </div>
              )}
              <button onClick={analyzeWithAI} disabled={aiLoading || !transcription.trim()}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: "none", background: aiLoading ? "rgba(99,102,241,.3)" : "linear-gradient(135deg, #4F46E5, #7C3AED)", color: "#fff", fontWeight: 700, fontSize: ".84rem", cursor: aiLoading || !transcription.trim() ? "not-allowed" : "pointer", opacity: !transcription.trim() ? .5 : 1, fontFamily: "'DM Sans',sans-serif", transition: "all .2s" }}>
                {aiLoading
                  ? <><div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .8s linear infinite" }} />Analyse en cours...</>
                  : <><Bot size={15} />Analyser et remplir les scores</>
                }
              </button>
              <p style={{ color: C.subtle, fontSize: ".68rem", marginTop: 8 }}>Les scores SS_ et SC_ seront remplis automatiquement · Vous pouvez les ajuster manuellement avant de sauvegarder.</p>
            </div>

            {/* Statut */}
            <Select label="Statut du dossier" value={scores.statut} onChange={e => setS("statut")(e.target.value)}
              options={STATUTS.map(v => ({ value: v, label: v }))} />

            {/* Test technique */}
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16 }}>
              <div style={{ color: C.blueL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Test technique (/20)</div>
              <Input label="Score" type="number" value={scores.test_score} onChange={e => setS("test_score")(e.target.value)} placeholder="Ex: 15" />
            </div>

            {/* Soft Skills */}
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16 }}>
              <div style={{ color: C.tealL, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Soft Skills (0 à 5)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Leadership","ss_leadership"],["Communication","ss_communication"],["Adaptabilité","ss_adaptabilite"],["Rigueur","ss_rigueur"],["Autonomie","ss_autonomie"]].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>{label}</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0,1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => setS(key)(n)}
                          style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${scores[key] === n ? C.teal : C.border}`, background: scores[key] === n ? `${C.teal}20` : "transparent", color: scores[key] === n ? C.tealL : C.subtle, fontWeight: 700, fontSize: ".8rem", cursor: "pointer" }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critères matrice */}
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16 }}>
              <div style={{ color: C.gold, fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Critères matrice (0 = non validé · 1 = validé)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[["Formation","sc_formation"],["Technique","sc_technique"],["Langues","sc_langues"],["Exp. secteur","sc_exp_secteur"],["Management","sc_management"]].map(([label, key]) => (
                  <button key={key} onClick={() => setS(key)(scores[key] === 1 ? 0 : 1)}
                    style={{ padding: "6px 14px", borderRadius: 100, border: `1px solid ${scores[key] === 1 ? C.teal + "60" : C.border}`, background: scores[key] === 1 ? `${C.teal}15` : "transparent", color: scores[key] === 1 ? C.tealL : C.subtle, fontSize: ".8rem", fontWeight: 600, cursor: "pointer" }}>
                    {scores[key] === 1 ? "✓" : "○"} {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Red Flag */}
            <div style={{ background: scores.red_flag ? "rgba(239,68,68,.08)" : "rgba(255,255,255,.03)", border: `1px solid ${scores.red_flag ? C.red + "40" : C.border}`, borderRadius: 12, padding: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: scores.red_flag ? 10 : 0 }}>
                <input type="checkbox" checked={scores.red_flag} onChange={e => setS("red_flag")(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: C.red }} />
                <span style={{ color: scores.red_flag ? C.red : C.muted, fontWeight: 700, fontSize: ".88rem" }}>🚨 Red Flag — Score forcé à 0%</span>
              </label>
              {scores.red_flag && (
                <Input label="Motif" value={scores.red_flag_motif} onChange={e => setS("red_flag_motif")(e.target.value)} placeholder="Ex: Mensonge sur le CV, vérification référence négative..." />
              )}
            </div>

            {/* Notes */}
            <div>
              <label style={{ display: "block", color: C.subtle, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Notes consultant</label>
              <textarea value={scores.notes_consultant} onChange={e => setS("notes_consultant")(e.target.value)} rows={3} placeholder="Observations post-entretien..."
                style={{ width: "100%", padding: "10px 13px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", resize: "vertical", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }} />
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn onClick={() => setEditing(null)} variant="ghost">Annuler</Btn>
              <Btn onClick={handleSave} disabled={saving} variant="teal">
                <Save size={14} />{saving ? "Sauvegarde..." : "Sauvegarder"}
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TAB SHORTLIST ─────────────────────────────────────────
function TabShortlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMandat, setFilterMandat] = useState("");
  const [mandats, setMandats] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: sl } = await supabase.from("v_shortlist").select("*");
    setData(sl || []);
    const ids = [...new Set((sl || []).map(s => s.mandat_id))];
    if (ids.length) {
      const { data: m } = await supabase.from("mandats").select("id, titre_poste").in("id", ids);
      setMandats(m || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filterMandat ? data.filter(d => d.mandat_id === filterMandat) : data;
  const grouped = filtered.reduce((acc, row) => {
    const key = row.mandat_id;
    if (!acc[key]) acc[key] = { titre: row.titre_poste, secteur: row.mandat_secteur, rows: [] };
    acc[key].rows.push(row);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <Trophy size={16} style={{ color: C.gold }} />
        <select value={filterMandat} onChange={e => setFilterMandat(e.target.value)}
          style={{ padding: "9px 14px", borderRadius: 10, background: "rgba(8,13,26,.8)", border: `1px solid ${C.border}`, color: C.text, fontSize: ".88rem", outline: "none", fontFamily: "'DM Sans',sans-serif", cursor: "pointer" }}>
          <option value="">Tous les mandats</option>
          {mandats.map(m => <option key={m.id} value={m.id}>{m.titre_poste}</option>)}
        </select>
        <Btn onClick={load} variant="ghost" small><RefreshCw size={13} /> Actualiser</Btn>
      </div>

      {loading ? <div style={{ textAlign: "center", padding: 40, color: C.subtle }}>Chargement...</div> : (
        Object.keys(grouped).length === 0
          ? <div style={{ textAlign: "center", padding: 60, color: C.subtle }}>
              <Trophy size={32} style={{ color: C.subtle, margin: "0 auto 12px" }} />
              <p>Aucun candidat en shortlist pour l'instant.</p>
              <p style={{ fontSize: ".8rem", marginTop: 6 }}>Les candidats apparaissent ici quand leur score ≥ seuil du mandat.</p>
            </div>
          : Object.entries(grouped).map(([mandatId, group]) => (
            <div key={mandatId} style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Briefcase size={14} style={{ color: C.gold }} />
                <span style={{ color: C.text, fontWeight: 700, fontSize: ".95rem" }}>{group.titre}</span>
                <Badge label={group.secteur} color={group.secteur === "IT" ? C.blue : group.secteur === "Finance" ? C.gold : C.purple} />
                <span style={{ color: C.subtle, fontSize: ".76rem" }}>{group.rows.length} candidat{group.rows.length > 1 ? "s" : ""}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.rows.map((row, i) => (
                  <div key={row.candidat_id} style={{ background: C.card, border: `1px solid ${i === 0 ? C.gold + "40" : C.border}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? `${C.gold}20` : "rgba(255,255,255,.05)", border: `1px solid ${i === 0 ? C.gold + "60" : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: ".72rem", color: i === 0 ? C.gold : C.subtle }}>
                        #{i + 1}
                      </div>
                      <div>
                        <div style={{ color: C.text, fontWeight: 700, fontSize: ".9rem" }}>{row.candidat_nom}</div>
                        <div style={{ color: C.subtle, fontSize: ".72rem", fontFamily: "'DM Mono',monospace" }}>{row.candidat_email}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <ScoreBadge score={row.score_matching_pct} />
                      {row.test_score != null && <Badge label={`Test: ${row.test_score}/20`} color={row.test_score >= 12 ? C.teal : C.red} />}
                      <Badge label={row.statut} color={C.subtle} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

// ── ADMIN MAIN ────────────────────────────────────────────
const TABS = [
  { id: "candidats",   label: "Candidats",   icon: Users,     color: C.blue },
  { id: "mandats",     label: "Mandats",     icon: Briefcase, color: C.gold },
  { id: "evaluations", label: "Évaluations", icon: Star,      color: C.teal },
  { id: "shortlist",   label: "Shortlist",   icon: Trophy,    color: C.purple },
];

export default function Admin() {
  const [auth, setAuth] = useState(!!sessionStorage.getItem("tf_admin"));
  const [tab, setTab] = useState("candidats");

  const logout = () => { sessionStorage.removeItem("tf_admin"); setAuth(false); };

  if (!auth) return <LoginScreen onLogin={() => setAuth(true)} />;

  const activeTab = TABS.find(t => t.id === tab);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: C.text, display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #080D18; } ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
        @keyframes spin { to{transform:rotate(360deg)} }
        input::placeholder, textarea::placeholder { color: #334155; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: 220, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        {/* Logo */}
        <div style={{ padding: "20px 18px 18px", borderBottom: `1px solid ${C.border}` }}>
          <img src="/logo.png" alt="TalentFlux" style={{ height: 32, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Shield size={11} style={{ color: C.red }} />
            <span style={{ color: C.subtle, fontSize: ".65rem", fontFamily: "'DM Mono',monospace" }}>Interface Admin</span>
          </div>
        </div>

        {/* Nav tabs */}
        <nav style={{ flex: 1, padding: "14px 10px" }}>
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginBottom: 4, background: active ? `${t.color}15` : "transparent", transition: "all .2s", fontFamily: "'DM Sans',sans-serif" }}>
                <Icon size={16} style={{ color: active ? t.color : C.subtle }} />
                <span style={{ color: active ? C.text : C.subtle, fontWeight: active ? 700 : 400, fontSize: ".88rem" }}>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.border}` }}>
          <button onClick={logout}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: "transparent", fontFamily: "'DM Sans',sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            <LogOut size={15} style={{ color: C.subtle }} />
            <span style={{ color: C.subtle, fontSize: ".84rem" }}>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, background: C.bg, zIndex: 10 }}>
          {activeTab && <activeTab.icon size={18} style={{ color: activeTab.color }} />}
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: C.text }}>{activeTab?.label}</h1>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={12} style={{ color: C.teal }} />
            <span style={{ color: C.subtle, fontSize: ".72rem", fontFamily: "'DM Mono',monospace" }}>TalentFlux Admin v1</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 28 }}>
          {tab === "candidats"   && <TabCandidats />}
          {tab === "mandats"     && <TabMandats />}
          {tab === "evaluations" && <TabEvaluations />}
          {tab === "shortlist"   && <TabShortlist />}
        </div>
      </div>
    </div>
  );
}
