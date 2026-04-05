import type { Metadata } from "next";
import { Suspense } from "react";
import CGU from "@/components/pages/CGU";

// Force le rendu dynamique — ce composant a des hooks React
// qui nécessitent un environnement client pour fonctionner correctement
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation de TalentFlux.",
  robots: { index: true, follow: true },
};

export default function CGUPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <CGU />
    </Suspense>
  );
}
