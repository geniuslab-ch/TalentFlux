import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TalentFluxIT from './pages/TalentFluxIT';
import TalentFluxFinance from './pages/TalentFluxFinance';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import CGU from './pages/CGU';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/it" replace />} />
        <Route path="/it" element={<TalentFluxIT />} />
        <Route path="/finance" element={<TalentFluxFinance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cgu" element={<CGU />} />
      </Routes>
    </BrowserRouter>
  );
}
