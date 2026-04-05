import type { Metadata } from "next";
import { Suspense } from "react";
import Contact from "@/components/pages/Contact";

// Force le rendu dynamique — ce composant a des hooks React
// qui nécessitent un environnement client pour fonctionner correctement
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Recrutement Suisse",
  description: "Contactez TalentFlux à Yverdon-les-Bains.",
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <Contact />
    </Suspense>
  );
}
