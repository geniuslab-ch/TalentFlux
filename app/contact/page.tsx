import type { Metadata } from "next";
import Contact from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact — Recrutement Suisse",
  description: "Contactez TalentFlux, agence de recrutement spécialisée à Yverdon-les-Bains.",
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <Contact />;
}
