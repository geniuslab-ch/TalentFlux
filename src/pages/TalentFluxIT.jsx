import { useState, useEffect, useRef } from "react";
import {
  Clock, Users, ShieldAlert, Code2, Cpu, Network,
  ArrowRight, CheckCircle, Zap, ChevronDown, Star,
  Terminal, GitBranch, Layers, Send
} from "lucide-react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const GradientText = ({ children, className = "" }) => (
  <span
    className={className}
    style={{
      background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 45%, #06B6D4 75%, #14B8A6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </span>
);

const GlowButton = ({ children, primary = true, onClick }) => (
  <button
    onClick={onClick}
    style={primary ? {
      background: "linear-gradient(135deg, #2563EB, #0EA5E9, #14B8A6)",
      boxShadow: "0 0 30px rgba(14,165,233,0.45), 0 0 60px rgba(20,184,166,0.2)",
      border: "none",
      transition: "all 0.3s ease",
    } : {
      background: "transparent",
      border: "1.5px solid rgba(14,165,233,0.5)",
      color: "#0EA5E9",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={e => {
      if (primary) {
        e.currentTarget.style.boxShadow = "0 0 50px rgba(14,165,233,0.7), 0 0 100px rgba(20,184,166,0.35)";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
      } else {
        e.currentTarget.style.background = "rgba(14,165,233,0.1)";
        e.currentTarget.style.borderColor = "#0EA5E9";
        e.currentTarget.style.transform = "translateY(-2px)";
      }
    }}
    onMouseLeave={e => {
      if (primary) {
        e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.45), 0 0 60px rgba(20,184,166,0.2)";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      } else {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "rgba(14,165,233,0.5)";
        e.currentTarget.style.transform = "translateY(0)";
      }
    }}
    className={`px-7 py-3.5 rounded-xl font-semibold text-base cursor-pointer flex items-center gap-2 ${primary ? "text-white" : ""}`}
  >
    {children}
  </button>
);

const ProblemCard = ({ icon: Icon, title, desc, color, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: `2px solid ${color}`,
        transition: `all 0.6s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 0 30px ${color}22`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderTopColor = color;
        e.currentTarget.style.borderLeftColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.borderRightColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      className="rounded-2xl p-7"
    >
      <div className="mb-5" style={{ color }}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
      <p style={{ color: "#94A3B8", lineHeight: 1.7 }} className="text-sm">{desc}</p>
    </div>
  );
};

const BentoCard = ({ icon: Icon, title, subtitle, desc, large, delay, accent }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(20,184,166,0.08))"
          : "rgba(15,23,42,0.9)",
        border: hovered
          ? "1px solid rgba(14,165,233,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 0 40px rgba(14,165,233,0.15), inset 0 0 40px rgba(20,184,166,0.05)" : "none",
        transition: `all 0.5s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(25px)",
        gridColumn: large ? "span 2" : "span 1",
      }}
      className="rounded-2xl p-8 relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
        transition: "opacity 0.3s",
        opacity: hovered ? 1 : 0.4,
      }} />
      <div className="relative z-10">
        <div className="mb-5 inline-flex p-3 rounded-xl" style={{ background: `${accent}18` }}>
          <Icon size={26} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>{subtitle}</div>
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <p style={{ color: "#94A3B8", lineHeight: 1.7 }} className="text-sm">{desc}</p>
      </div>
    </div>
  );
};

const StatItem = ({ value, label, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        transition: `all 0.6s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
      }}
      className="text-center"
    >
      <div className="text-4xl font-black mb-1">
        <GradientText>{value}</GradientText>
      </div>
      <div style={{ color: "#94A3B8" }} className="text-sm">{label}</div>
    </div>
  );
};

export default function TalentFluxIT() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", role: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = () => {
    if (formData.email && formData.company) setSubmitted(true);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "#0B0F1A", color: "#fff", fontFamily: "'DM Sans', 'Sora', sans-serif", overflowX: "hidden" }}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(14,165,233,0.3); color: #fff; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes slide-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-title { font-family: 'Sora', sans-serif; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .nav-link { color: #94A3B8; font-size: 0.9rem; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .grid-pattern {
          background-image: linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem",
        background: scrolled ? "rgba(11,15,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #2563EB, #06B6D4, #14B8A6)",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
            TALENT<GradientText>FLUX</GradientText>
          </span>
          <span style={{
            marginLeft: 8, fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.12em", color: "#0EA5E9",
            background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)",
            borderRadius: 4, padding: "2px 8px",
          }}>IT</span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Problème","Solution","Contact"].map(item => (
            <span key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</span>
          ))}
          <GlowButton onClick={() => scrollTo("contact")}>
            Recruter <ArrowRight size={16} />
          </GlowButton>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════ HERO */}
      <section
        id="hero"
        className="grid-pattern"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 2rem 80px" }}
      >
        {/* Ambient orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "8%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "5%", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
          animation: "pulse-glow 5s ease-in-out infinite 1s", pointerEvents: "none",
        }} />

        <div
          ref={heroRef}
          style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}
        >
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)",
            borderRadius: 100, padding: "6px 18px", marginBottom: 40,
            animation: "slide-in-up 0.6s ease both",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#14B8A6", boxShadow: "0 0 8px #14B8A6" }} />
            <span style={{ color: "#94A3B8", fontSize: "0.82rem", fontWeight: 500 }}>Placement IT · Suisse · &lt; 48h</span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.12,
              marginBottom: 28, letterSpacing: "-0.02em",
              animation: "slide-in-up 0.7s ease 0.1s both",
            }}
          >
            Le talent IT n'est pas rare.<br />
            <GradientText>C'est votre filtre qui est obsolète.</GradientText>
          </h1>

          <p style={{
            color: "#94A3B8", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8,
            maxWidth: 650, margin: "0 auto 48px",
            animation: "slide-in-up 0.7s ease 0.2s both",
          }}>
            Arrêtez de trier des CV. Accédez à un flux continu de développeurs et d'experts tech <strong style={{ color: "#CBD5E1" }}>validés techniquement en moins de 48h.</strong>
          </p>

          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            animation: "slide-in-up 0.7s ease 0.3s both",
          }}>
            <GlowButton onClick={() => scrollTo("contact")}>
              Recruter un Expert <ArrowRight size={16} />
            </GlowButton>
            <GlowButton primary={false} onClick={() => scrollTo("solution")}>
              Rejoindre le Flux
            </GlowButton>
          </div>

          {/* Social proof strip */}
          <div style={{
            marginTop: 72, display: "flex", alignItems: "center", justifyContent: "center",
            gap: 24, flexWrap: "wrap",
            animation: "slide-in-up 0.7s ease 0.45s both",
          }}>
            {["Google", "Swisscom", "EPFL", "Nestlé Digital", "UBS Tech"].map((c, i) => (
              <span key={i} style={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{c}</span>
            ))}
          </div>
          <p style={{ color: "#334155", fontSize: "0.75rem", marginTop: 10 }}>Font confiance à TalentFlux IT</p>

          {/* Scroll cue */}
          <div
            className="animate-float"
            style={{ marginTop: 60, cursor: "pointer", opacity: 0.4 }}
            onClick={() => scrollTo("problème")}
          >
            <ChevronDown size={24} color="#94A3B8" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ STATS BAR */}
      <div style={{
        background: "rgba(15,23,42,0.6)", borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "40px 2rem",
      }}>
        <div ref={statsRef} style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          <StatItem value="48h" label="Délai moyen de placement" delay={0} />
          <StatItem value="93%" label="Taux de satisfaction client" delay={100} />
          <StatItem value="70%" label="Talents hors LinkedIn" delay={200} />
          <StatItem value="500+" label="Experts validés en réseau" delay={300} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ PROBLÈME */}
      <section id="problème" style={{ padding: "100px 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#EF4444", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            ⚠ Le coût de l'erreur
          </div>
          <h2 className="hero-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2 }}>
            Chaque mauvais recrutement vous coûte<br /><GradientText>en moyenne 30 000 CHF.</GradientText>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <ProblemCard
            icon={Clock}
            title="Time-to-hire trop long"
            desc="Vos équipes attendent 3 à 6 mois pour un profil senior. Pendant ce temps, vos sprints dérivent et vos concurrents recrutent."
            color="#F97316"
            delay={0}
          />
          <ProblemCard
            icon={Users}
            title="Culture-fit raté"
            desc="Le CV est parfait. L'intégration est catastrophique. Sans évaluation comportementale, vous recrutez une compétence, pas un collaborateur."
            color="#EF4444"
            delay={100}
          />
          <ProblemCard
            icon={ShieldAlert}
            title="Fake-experts démasqués trop tard"
            desc="Ils connaissent le jargon, pas le code. Sans test technique live, vous découvrez la vérité après 3 mois de mission."
            color="#DC2626"
            delay={200}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ SOLUTION */}
      <section id="solution" style={{ padding: "100px 2rem", background: "rgba(15,23,42,0.4)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", color: "#0EA5E9", fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16,
            }}>✦ La Solution TalentFlux</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2 }}>
              La <GradientText>Stack Talent Flux</GradientText><br />appliquée au recrutement IT
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <BentoCard
              icon={Terminal}
              subtitle="Méthode #1"
              title="Évaluation Live-Coding"
              desc="On ne croit que ce qu'on voit. Chaque candidat passe un entretien technique live avec nos ingénieurs seniors. Pas de test asynchrone trichable — une vraie session de pair-programming."
              large={false}
              delay={0}
              accent="#2563EB"
            />
            <BentoCard
              icon={Cpu}
              subtitle="Méthode #2"
              title="Matching Algorithmique"
              desc="La précision du code appliquée aux RH. Notre système analyse 40+ critères — stack technique, style de travail, timezone, culture — pour un fit à 94%."
              large={false}
              delay={100}
              accent="#0EA5E9"
            />
            <BentoCard
              icon={Network}
              subtitle="Méthode #3"
              title="Réseau Invisible"
              desc="Accès aux 70% de talents qui ne cherchent pas activement. Ils ne sont pas sur LinkedIn. Ils sont dans notre réseau exclusif, cultivé depuis 5 ans. Vous accédez au marché caché du talent IT suisse."
              large={true}
              delay={200}
              accent="#14B8A6"
            />
          </div>

          {/* Process timeline */}
          <div style={{ marginTop: 60, padding: "48px", background: "rgba(11,15,26,0.8)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>
              Le processus en 4 étapes
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { n: "01", t: "Brief", d: "30 min pour comprendre vos besoins réels", icon: GitBranch },
                { n: "02", t: "Sourcing", d: "Activation du réseau invisible sous 24h", icon: Network },
                { n: "03", t: "Validation", d: "Live-coding + culture-fit assessment", icon: Code2 },
                { n: "04", t: "Intégration", d: "Suivi 3 mois post-embauche garanti", icon: CheckCircle },
              ].map(({ n, t, d, icon: Icon }, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%", margin: "0 auto 16px",
                    background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(20,184,166,0.2))",
                    border: "1px solid rgba(14,165,233,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={20} style={{ color: "#0EA5E9" }} strokeWidth={1.5} />
                  </div>
                  <div style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 700, marginBottom: 4 }}>{n}</div>
                  <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>{t}</div>
                  <div style={{ color: "#64748B", fontSize: "0.8rem", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ TESTIMONIALS */}
      <section style={{ padding: "80px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { q: "On avait cherché 4 mois sans résultat. TalentFlux nous a envoyé 3 profils qualifiés en 36h. L'un d'eux est encore chez nous, 2 ans plus tard.", a: "CTO, Fintech Genève", stars: 5 },
              { q: "Le live-coding m'a bluffé. On voyait enfin la réalité du niveau technique, pas la mise en scène habituelle des entretiens classiques.", a: "Head of Engineering, Scale-up Lausanne", stars: 5 },
              { q: "Leur réseau invisible, c'est réel. Le profil qu'on a embauché ne cherchait pas. TalentFlux l'a approché et convaincu. Impossible à faire seul.", a: "VP Tech, SaaS Zurich", stars: 5 },
            ].map(({ q, a, stars }, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20, padding: 32,
                }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array(stars).fill(0).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ color: "#CBD5E1", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 20, fontStyle: "italic" }}>"{q}"</p>
                <p style={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600 }}>— {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ CTA / CONTACT */}
      <section id="contact" style={{ padding: "100px 2rem", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", color: "#14B8A6", fontSize: "0.8rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20,
          }}>✦ Passez à l'action</div>
          <h2 className="hero-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Prêt à scaler votre<br /><GradientText>équipe technique ?</GradientText>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "1rem", marginBottom: 48, lineHeight: 1.7 }}>
            Aucun frais avant l'embauche. Satisfaction garantie.<br />Premier brief sous 24h.
          </p>

          {!submitted ? (
            <div style={{
              background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: 40,
              boxShadow: "0 0 60px rgba(37,99,235,0.1)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { key: "name", label: "Votre nom", ph: "Sophie Martin" },
                  { key: "company", label: "Entreprise", ph: "Acme Corp" },
                  { key: "role", label: "Rôle recherché", ph: "Lead Developer React" },
                  { key: "email", label: "Email professionnel", ph: "sophie@acme.com" },
                ].map(({ key, label, ph }) => (
                  <div key={key} style={{ textAlign: "left" }}>
                    <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 8, letterSpacing: "0.05em" }}>
                      {label}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      placeholder={ph}
                      value={formData[key]}
                      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                      style={{
                        width: "100%", padding: "12px 16px", borderRadius: 12,
                        background: "rgba(11,15,26,0.8)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontSize: "0.9rem", outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}
              </div>
              <GlowButton onClick={handleSubmit}>
                <Send size={16} /> Lancer mon Recrutement IT
              </GlowButton>
              <p style={{ color: "#334155", fontSize: "0.75rem", marginTop: 16 }}>
                🔒 Vos données sont confidentielles. Aucun spam, promis.
              </p>
            </div>
          ) : (
            <div style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(20,184,166,0.1))",
              border: "1px solid rgba(20,184,166,0.3)", borderRadius: 24, padding: "60px 40px",
            }}>
              <CheckCircle size={48} style={{ color: "#14B8A6", margin: "0 auto 20px" }} />
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: 12 }}>Demande reçue ✓</h3>
              <p style={{ color: "#94A3B8" }}>Un expert TalentFlux IT vous contacte sous 24h pour votre brief.</p>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
            {[
              { icon: CheckCircle, text: "Aucun frais avant embauche" },
              { icon: Zap, text: "Premier profil en 48h" },
              { icon: Layers, text: "Garantie satisfaction 3 mois" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon size={15} style={{ color: "#14B8A6" }} />
                <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700 }}>
            TALENT<GradientText>FLUX</GradientText>
          </span>
          <span style={{ color: "#334155", fontSize: "0.75rem" }}>· Placement Stratégique IT · Suisse</span>
        </div>
        <p style={{ color: "#334155", fontSize: "0.78rem" }}>© 2025 TalentFlux. Tous droits réservés.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "CGU", "Contact"].map(l => (
            <span key={l} style={{ color: "#475569", fontSize: "0.78rem", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
