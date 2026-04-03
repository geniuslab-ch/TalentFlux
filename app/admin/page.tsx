import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AdminClient = dynamic(
  () => import("@/components/pages/Admin"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Administration",
  description: "Administration TalentFlux.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
