"use server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PrivacyClient = dynamic(
  () => import("@/components/pages/Privacy"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Politique de confidentialité | TalentFlux",
  description: "Politique de confidentialité TalentFlux — LPD suisse et RGPD.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
