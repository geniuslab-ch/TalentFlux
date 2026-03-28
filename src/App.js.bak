import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TalentFluxIT from './pages/TalentFluxIT';

function Home() {
  return (
    <div style={{
      background: '#0B0F1A', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora', sans-serif", color: '#fff', gap: 24,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&display=swap');`}</style>
      <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>
        TALENT<span style={{
          background: 'linear-gradient(135deg, #2563EB, #0EA5E9, #14B8A6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>FLUX</span>
      </h1>
      <p style={{ color: '#94A3B8' }}>Placement Stratégique — Suisse</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {[
          { label: '💻 IT', path: '/it' },
          { label: '💰 Finance', path: '/finance', disabled: true },
          { label: '🏥 Santé', path: '/sante', disabled: true },
          { label: '⚙️ Ingénierie', path: '/ingenierie', disabled: true },
          { label: '👥 RH', path: '/rh', disabled: true },
        ].map(({ label, path, disabled }) => (
          disabled
            ? <span key={path} style={{
                padding: '12px 28px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 600,
                background: 'rgba(255,255,255,0.04)', color: '#334155',
                border: '1px solid rgba(255,255,255,0.06)', cursor: 'not-allowed',
              }}>{label} — Bientôt</span>
            : <Link key={path} to={path} style={{
                padding: '12px 28px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 600,
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9, #14B8A6)',
                color: '#fff', textDecoration: 'none',
                boxShadow: '0 0 20px rgba(14,165,233,0.4)',
              }}>{label}</Link>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/it" element={<TalentFluxIT />} />
      </Routes>
    </BrowserRouter>
  );
}
