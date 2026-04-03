import type { Metadata } from "next";
import PrivacyClient from "@/components/pages/Privacy";

export const metadata: Metadata = {
  title: "Politique de confidentialité | TalentFlux",
  description: "Politique de confidentialité de TalentFlux. Traitement des données personnelles selon la LPD suisse et le RGPD.",
  robots: { index: True, follow: True },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
