import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactClient = dynamic(
  () => import("@/components/pages/Contact"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Contact TalentFlux — Recrutement Spécialisé Suisse",
  description: "Contactez TalentFlux, agence de recrutement à Yverdon-les-Bains.",
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
