import { useState, useEffect } from "react";
import { Shield, Lock, Eye, Database, Mail, Phone, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const GradientText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 45%, #06B6D4 75%, #14B8A6 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const Section = ({ icon: Icon, title, children, delay = 0 }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{
      background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20, marginBottom: 16, overflow: "hidden",
      transition: "border-color 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "24px 32px", background: "none", border: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(20,184,166,0.2))",
            border: "1px solid rgba(14,165,233,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={20} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{title}</span>
        </div>
        {open ? <ChevronUp size={18} style={{ color: "#475569" }} /> : <ChevronDown size={18} style={{ color: "#475569" }} />}
      </button>
      {open && (
        <div style={{ padding: "0 32px 28px", color: "#94A3B8", lineHeight: 1.85, fontSize: "0.92rem" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function Privacy() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0B0F1A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 2rem", height: 70,
        background: scrolled ? "rgba(11,15,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
          <ArrowLeft size={18} /> <span style={{ fontSize: "0.9rem" }}>Retour</span>
        </button>
        <img src="/logo.png" alt="TalentFlux" style={{ height: 36, width: "auto", objectFit: "contain" }} />
      </nav>

      {/* HERO */}
      <div style={{
        padding: "120px 2rem 60px", textAlign: "center",
        background: "radial-gradient(ellipse at top, rgba(37,99,235,0.08) 0%, transparent 60%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
          background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 100, padding: "6px 18px",
        }}>
          <Shield size={14} style={{ color: "#0EA5E9" }} />
          <span style={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 500 }}>Dernière mise à jour : 1er janvier 2025</span>
        </div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: 16 }}>
          Politique de <GradientText>Confidentialité</GradientText>
        </h1>
        <p style={{ color: "#94A3B8", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          TalentFlux s'engage à protéger vos données personnelles conformément à la
          <strong style={{ color: "#CBD5E1" }}> Loi fédérale suisse sur la protection des données (LPD)</strong> et au <strong style={{ color: "#CBD5E1" }}>RGPD européen</strong>.
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem 80px" }}>

        <Section icon={Database} title="1. Responsable du traitement">
          <p><strong style={{ color: "#CBD5E1" }}>TalentFlux Sàrl</strong><br />
          Placement Stratégique — Suisse<br />
          Site web : talentflux.ch<br />
          Email : <a href="mailto:info@talentflux.ch" style={{ color: "#0EA5E9" }}>info@talentflux.ch</a><br /><br />
          En tant que responsable du traitement, TalentFlux détermine les finalités et les moyens du traitement de vos données personnelles collectées via ce site.</p>
        </Section>

        <Section icon={Eye} title="2. Données collectées">
          <p style={{ marginBottom: 16 }}>Nous collectons les catégories de données suivantes :</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Données d'identification", "Nom, prénom, adresse e-mail, numéro de téléphone"],
              ["Données professionnelles", "Entreprise, fonction, descriptif de poste, CV ou job description en PDF"],
              ["Données de navigation", "Adresse IP, cookies de session, pages visitées, durée de visite"],
              ["Données de communication", "Contenu des messages envoyés via le formulaire de contact"],
            ].map(([titre, desc]) => (
              <li key={titre} style={{
                padding: "12px 16px", borderRadius: 10,
                background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)",
              }}>
                <strong style={{ color: "#CBD5E1" }}>{titre} :</strong> {desc}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Lock} title="3. Finalités du traitement">
          <p style={{ marginBottom: 16 }}>Vos données sont traitées aux fins suivantes :</p>
          {[
            ["Traitement de votre demande de recrutement", "Art. 6 al. 1 let. b RGPD — Exécution d'un contrat"],
            ["Mise en relation candidat-employeur", "Art. 6 al. 1 let. b RGPD — Intérêt légitime"],
            ["Amélioration de nos services", "Art. 6 al. 1 let. f RGPD — Intérêt légitime"],
            ["Respect de nos obligations légales", "Art. 6 al. 1 let. c RGPD — Obligation légale"],
          ].map(([fin, base]) => (
            <div key={fin} style={{ marginBottom: 12, paddingLeft: 16, borderLeft: "2px solid rgba(14,165,233,0.3)" }}>
              <div style={{ color: "#CBD5E1", fontWeight: 600, marginBottom: 2 }}>• {fin}</div>
              <div style={{ color: "#64748B", fontSize: "0.82rem" }}>{base}</div>
            </div>
          ))}
        </Section>

        <Section icon={Shield} title="4. Durée de conservation">
          <p style={{ marginBottom: 14 }}>Nous conservons vos données personnelles selon les durées suivantes :</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["Données de contact", "3 ans après le dernier contact"],
              ["CV et job descriptions", "12 mois maximum"],
              ["Données de facturation", "10 ans (obligation légale CH)"],
              ["Cookies de session", "Session active uniquement"],
            ].map(([type, duree]) => (
              <div key={type} style={{
                padding: "14px 16px", borderRadius: 10,
                background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.15)",
              }}>
                <div style={{ color: "#14B8A6", fontWeight: 600, fontSize: "0.85rem", marginBottom: 4 }}>{type}</div>
                <div style={{ fontSize: "0.82rem" }}>{duree}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Mail} title="5. Vos droits">
          <p style={{ marginBottom: 16 }}>Conformément à la LPD suisse et au RGPD, vous disposez des droits suivants :</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Droit d'accès", "Obtenir une copie de vos données"],
              ["Droit de rectification", "Corriger des données inexactes"],
              ["Droit à l'effacement", "Supprimer vos données"],
              ["Droit à la portabilité", "Recevoir vos données en format structuré"],
              ["Droit d'opposition", "S'opposer au traitement"],
              ["Droit de retrait", "Retirer votre consentement à tout moment"],
            ].map(([droit, desc]) => (
              <div key={droit} style={{
                padding: "12px 14px", borderRadius: 10,
                background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)",
              }}>
                <div style={{ color: "#0EA5E9", fontWeight: 600, fontSize: "0.82rem", marginBottom: 3 }}>{droit}</div>
                <div style={{ fontSize: "0.8rem" }}>{desc}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            Pour exercer ces droits : <a href="mailto:info@talentflux.ch" style={{ color: "#0EA5E9" }}>info@talentflux.ch</a><br />
            En cas de désaccord, vous pouvez adresser une réclamation au <strong style={{ color: "#CBD5E1" }}>Préposé fédéral à la protection des données (PFPDT)</strong> à Berne.
          </p>
        </Section>

        <Section icon={Database} title="6. Transferts de données et sous-traitants">
          <p style={{ marginBottom: 14 }}>Vos données peuvent être transmises aux sous-traitants suivants, dans le respect strict de la LPD :</p>
          {[
            ["Supabase Inc.", "Hébergement de base de données", "États-Unis (clauses contractuelles types)"],
            ["Vercel Inc.", "Hébergement du site web", "États-Unis (clauses contractuelles types)"],
            ["Google Analytics", "Analyse d'audience anonymisée", "États-Unis (anonymisation activée)"],
          ].map(([nom, role, pays]) => (
            <div key={nom} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 16px", borderRadius: 10, marginBottom: 8,
              background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div>
                <div style={{ color: "#CBD5E1", fontWeight: 600, fontSize: "0.88rem" }}>{nom}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{role}</div>
              </div>
              <div style={{
                fontSize: "0.75rem", padding: "4px 10px", borderRadius: 6,
                background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)",
              }}>{pays}</div>
            </div>
          ))}
        </Section>

        <Section icon={Lock} title="7. Cookies">
          <p>Nous utilisons des cookies strictement nécessaires au fonctionnement du site. Aucun cookie publicitaire n'est déposé sans votre consentement explicite. Vous pouvez configurer votre navigateur pour refuser tous les cookies, étant entendu que cela peut affecter certaines fonctionnalités du site.</p>
        </Section>

        <div style={{
          marginTop: 40, padding: 28, borderRadius: 20, textAlign: "center",
          background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(20,184,166,0.08))",
          border: "1px solid rgba(14,165,233,0.2)",
        }}>
          <p style={{ color: "#94A3B8", fontSize: "0.88rem" }}>
            Des questions sur vos données ? Contactez notre délégué à la protection des données :<br />
            <a href="mailto:info@talentflux.ch" style={{ color: "#0EA5E9", fontWeight: 600 }}>info@talentflux.ch</a>
          </p>
        </div>
      </div>
    </div>
  );
}
