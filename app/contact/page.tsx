import type { Metadata } from "next";
import ContactClient from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact TalentFlux — Recrutement Spécialisé Suisse",
  description: "Contactez TalentFlux, agence de recrutement spécialisée à Yverdon-les-Bains. IT, Finance, Ingénierie, Paysagisme, Télécom, Pharma. Réponse sous 2h.",
  robots: { index: True, follow: True },
};

export default function ContactPage() {
  return <ContactClient />;
}
