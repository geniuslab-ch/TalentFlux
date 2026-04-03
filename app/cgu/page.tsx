import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CGUClient = dynamic(
  () => import("@/components/pages/CGU"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation de TalentFlux.",
  robots: { index: true, follow: true },
};

export default function CGUPage() {
  return <CGUClient />;
}
