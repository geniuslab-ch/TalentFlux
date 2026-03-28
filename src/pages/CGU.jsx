import { useState, useEffect } from "react";
import { FileText, AlertCircle, Scale, Briefcase, Globe, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const GradientText = ({ children }) => (
  <span style={{
    background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 45%, #06B6D4 75%, #14B8A6 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  }}>{children}</span>
);

const Section = ({ icon: Icon, title, children, accent = "#0EA5E9" }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{
      background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20, marginBottom: 16, overflow: "hidden", transition: "border-color 0.3s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "24px 32px", background: "none", border: "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer", color: "#fff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
            border: `1px solid ${accent}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
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

const Article = ({ num, title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <h4 style={{ color: "#CBD5E1", fontWeight: 700, marginBottom: 8, fontSize: "0.95rem" }}>
      <span style={{ color: "#0EA5E9" }}>Art. {num} —</span> {title}
    </h4>
    <div style={{ paddingLeft: 16, borderLeft: "2px solid rgba(14,165,233,0.2)" }}>{children}</div>
  </div>
);

export default function CGU() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0B0F1A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

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
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>
          TALENT<GradientText>FLUX</GradientText>
        </span>
      </nav>

      <div style={{
        padding: "120px 2rem 60px", textAlign: "center",
        background: "radial-gradient(ellipse at top, rgba(37,99,235,0.08) 0%, transparent 60%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
          background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
          borderRadius: 100, padding: "6px 18px",
        }}>
          <Scale size={14} style={{ color: "#0EA5E9" }} />
          <span style={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 500 }}>Version en vigueur au 1er janvier 2025</span>
        </div>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: 16 }}>
          Conditions Générales <GradientText>d'Utilisation</GradientText>
        </h1>
        <p style={{ color: "#94A3B8", maxWidth: 660, margin: "0 auto", lineHeight: 1.7 }}>
          Les présentes Conditions Générales d'Utilisation régissent l'accès et l'utilisation du site <strong style={{ color: "#CBD5E1" }}>talentflux.ch</strong> et des services proposés par <strong style={{ color: "#CBD5E1" }}>TalentFlux Sàrl</strong>, agence de placement stratégique en Suisse.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem 80px" }}>

        <Section icon={FileText} title="I. Présentation & Acceptation">
          <Article num="1" title="Éditeur du site">
            <p><strong style={{ color: "#CBD5E1" }}>TalentFlux Sàrl</strong> — Agence de placement stratégique<br />
            Siège social : Suisse<br />
            Site : talentflux.ch | Email : <a href="mailto:info@talentflux.ch" style={{ color: "#0EA5E9" }}>info@talentflux.ch</a></p>
          </Article>
          <Article num="2" title="Acceptation des CGU">
            <p>L'accès et l'utilisation du site talentflux.ch impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement d'utiliser le site. TalentFlux se réserve le droit de modifier les présentes CGU à tout moment, les modifications prenant effet dès leur publication en ligne.</p>
          </Article>
          <Article num="3" title="Capacité juridique">
            <p>L'utilisation des services TalentFlux est réservée aux personnes physiques majeures (18 ans révolus) ayant la pleine capacité juridique, ainsi qu'aux personnes morales représentées par un mandataire habilité.</p>
          </Article>
        </Section>

        <Section icon={Briefcase} title="II. Services proposés" accent="#14B8A6">
          <Article num="4" title="Nature des services">
            <p style={{ marginBottom: 12 }}>TalentFlux propose les services suivants :</p>
            {["Placement et recrutement de profils IT, Finance, Santé, Ingénierie et RH en Suisse", "Mise en relation entre candidats et entreprises clientes", "Évaluation technique de candidats (live-coding, entretiens compétences)", "Conseil en stratégie de recrutement"].map(s => (
              <div key={s} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#14B8A6", marginTop: 2 }}>›</span>
                <span>{s}</span>
              </div>
            ))}
          </Article>
          <Article num="5" title="Gratuité pour les candidats">
            <p>Les services de placement sont <strong style={{ color: "#CBD5E1" }}>entièrement gratuits pour les candidats</strong>. La rémunération de TalentFlux est exclusivement à la charge des entreprises clientes, selon une convention de placement signée séparément.</p>
          </Article>
          <Article num="6" title="Honoraires entreprises">
            <p>Les honoraires applicables aux entreprises clientes sont définis dans le contrat de prestation de services signé entre TalentFlux et l'entreprise. Aucun honoraire n'est dû avant la signature du contrat de travail définitif du candidat placé.</p>
          </Article>
        </Section>

        <Section icon={AlertCircle} title="III. Obligations des utilisateurs" accent="#F97316">
          <Article num="7" title="Obligations générales">
            <p style={{ marginBottom: 12 }}>En utilisant talentflux.ch, vous vous engagez à :</p>
            {[
              "Fournir des informations exactes, complètes et à jour",
              "Ne pas usurper l'identité d'un tiers",
              "Ne pas transmettre de données illicites, diffamatoires ou portant atteinte aux droits de tiers",
              "Ne pas tenter de perturber ou compromettre la sécurité du site",
              "Respecter les droits de propriété intellectuelle de TalentFlux",
            ].map(o => (
              <div key={o} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#F97316", marginTop: 2 }}>›</span><span>{o}</span>
              </div>
            ))}
          </Article>
          <Article num="8" title="Exactitude des informations professionnelles">
            <p>Les candidats s'engagent à ne transmettre que des documents authentiques (CV, diplômes, certifications). Toute falsification constitue une faute grave pouvant engager la responsabilité civile et pénale de l'auteur conformément au Code pénal suisse (CP art. 251).</p>
          </Article>
        </Section>

        <Section icon={Scale} title="IV. Responsabilité & Garanties" accent="#2563EB">
          <Article num="9" title="Limitation de responsabilité">
            <p>TalentFlux agit en qualité d'intermédiaire et ne peut garantir l'adéquation parfaite entre un candidat et un poste. La décision finale d'embauche appartient exclusivement à l'entreprise cliente. TalentFlux ne saurait être tenu responsable des décisions prises par ses clients sur la base des profils présentés.</p>
          </Article>
          <Article num="10" title="Disponibilité du site">
            <p>TalentFlux s'efforce d'assurer la disponibilité du site 24h/24 et 7j/7 mais ne peut garantir une disponibilité sans interruption. Des opérations de maintenance ou des événements extérieurs peuvent temporairement rendre le site inaccessible, sans ouvrir droit à indemnisation.</p>
          </Article>
          <Article num="11" title="Propriété intellectuelle">
            <p>L'ensemble des éléments du site talentflux.ch (logo, textes, visuels, code source, architecture) est protégé par les droits de propriété intellectuelle et appartient à TalentFlux Sàrl. Toute reproduction totale ou partielle sans autorisation écrite préalable est interdite.</p>
          </Article>
        </Section>

        <Section icon={Globe} title="V. Droit applicable & Juridiction">
          <Article num="12" title="Droit applicable">
            <p>Les présentes CGU sont régies exclusivement par le <strong style={{ color: "#CBD5E1" }}>droit suisse</strong>, notamment le Code des obligations (CO) et la Loi fédérale sur la protection des données (LPD). Les dispositions du RGPD européen s'appliquent subsidiairement aux utilisateurs résidant dans l'Union Européenne.</p>
          </Article>
          <Article num="13" title="Juridiction compétente">
            <p>En cas de litige relatif à l'interprétation ou l'exécution des présentes CGU, les parties s'efforceront de trouver une solution amiable. À défaut, les <strong style={{ color: "#CBD5E1" }}>tribunaux ordinaires du canton de Genève</strong> seront seuls compétents, sous réserve de l'application de dispositions légales impératives contraires.</p>
          </Article>
          <Article num="14" title="Médiation">
            <p>Préalablement à toute action judiciaire, les parties s'engagent à recourir à une procédure de médiation auprès d'un médiateur agréé en Suisse, conformément à la loi sur la médiation civile.</p>
          </Article>
        </Section>

        <div style={{
          marginTop: 40, padding: 28, borderRadius: 20, textAlign: "center",
          background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(20,184,166,0.08))",
          border: "1px solid rgba(14,165,233,0.2)",
        }}>
          <p style={{ color: "#94A3B8", fontSize: "0.88rem" }}>
            Questions juridiques : <a href="mailto:info@talentflux.ch" style={{ color: "#0EA5E9", fontWeight: 600 }}>info@talentflux.ch</a><br />
            <span style={{ color: "#475569", fontSize: "0.8rem" }}>TalentFlux Sàrl — Placement Stratégique — Suisse — Yverdon-les-Bains, Suisse</span>
          </p>
        </div>
      </div>
    </div>
  );
}
