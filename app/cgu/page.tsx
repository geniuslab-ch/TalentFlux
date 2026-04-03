import type { Metadata } from "next";
import CGUClient from "@/components/pages/CGU";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation | TalentFlux",
  description: "Conditions générales d'utilisation du site TalentFlux, agence de recrutement à Yverdon-les-Bains, Suisse.",
  robots: { index: True, follow: True },
};

export default function CGUPage() {
  return <CGUClient />;
}
