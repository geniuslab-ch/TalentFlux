import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CandidatureTelecomClient = dynamic(
  () => import("@/components/pages/CandidatureTelecom"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Candidature Télécom & Réseaux Suisse",
  description: "Déposez votre candidature télécom en Suisse.",
  alternates: { canonical: "https://talentflux.ch/candidature/telecom" },
  robots: { index: false, follow: true },
};

export default function CandidatureTelecomPage() {
  return <CandidatureTelecomClient />;
}
