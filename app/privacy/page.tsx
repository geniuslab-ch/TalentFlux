import type { Metadata } from "next";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité TalentFlux — LPD suisse et RGPD.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <Privacy />;
}
