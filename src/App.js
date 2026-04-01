import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TalentFluxIT from './pages/TalentFluxIT';
import TalentFluxFinance from './pages/TalentFluxFinance';
import TalentFluxEngineering from './pages/TalentFluxEngineering';
import TalentFluxPaysagisme from './pages/TalentFluxPaysagisme';
import TalentFluxTelecom from './pages/TalentFluxTelecom';
import CandidaturePaysagisme from './pages/CandidaturePaysagisme';
import CandidatureIT from './pages/CandidatureIT';
import CandidatureFinance from './pages/CandidatureFinance';
import CandidatureIngenierie from './pages/CandidatureIngenierie';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import CGU from './pages/CGU';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/it" replace />} />
        {/* Landing pages */}
        <Route path="/it"         element={<TalentFluxIT />} />
        <Route path="/finance"    element={<TalentFluxFinance />} />
        <Route path="/ingenierie" element={<TalentFluxEngineering />} />
        <Route path="/paysagisme" element={<TalentFluxPaysagisme />} />
        <Route path="/telecom" element={<TalentFluxTelecom />} />
        {/* Formulaires candidats */}
        <Route path="/candidature/it"         element={<CandidatureIT />} />
        <Route path="/candidature/finance"    element={<CandidatureFinance />} />
        <Route path="/candidature/ingenierie" element={<CandidatureIngenierie />} />
        <Route path="/candidature/paysagisme" element={<CandidaturePaysagisme />} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        {/* Pages légales */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cgu"     element={<CGU />} />
      </Routes>
    </BrowserRouter>
  );
}
