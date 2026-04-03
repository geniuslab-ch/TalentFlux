import type { Metadata } from "next";
import AdminClient from "@/components/pages/Admin";

export const metadata: Metadata = {
  title: "Admin TalentFlux",
  description: "Administration TalentFlux.",
  robots: { index: False, follow: False },
};

export default function AdminPage() {
  return <AdminClient />;
}
