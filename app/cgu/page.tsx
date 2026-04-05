import type { Metadata } from "next";
import CGU from "@/components/pages/CGU";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation de TalentFlux.",
  robots: { index: true, follow: true },
};

export default function CGUPage() {
  return <CGU />;
}
