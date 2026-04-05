import type { Metadata } from "next";
import { Suspense } from "react";
import Privacy from "@/components/pages/Privacy";

// Force le rendu dynamique — ce composant a des hooks React
// qui nécessitent un environnement client pour fonctionner correctement
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité TalentFlux.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <Privacy />
    </Suspense>
  );
}
