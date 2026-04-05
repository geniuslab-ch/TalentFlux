import type { Metadata } from "next";
import Admin from "@/components/pages/Admin";

export const metadata: Metadata = {
  title: "Administration",
  description: "Administration TalentFlux.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <Admin />;
}
