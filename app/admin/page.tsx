import type { Metadata } from "next";
import { Suspense } from "react";
import Admin from "@/components/pages/Admin";

// Force le rendu dynamique — ce composant a des hooks React
// qui nécessitent un environnement client pour fonctionner correctement
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  description: "Administration TalentFlux.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080D1A", minHeight: "100vh" }} />}>
      <Admin />
    </Suspense>
  );
}
