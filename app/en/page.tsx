import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "Specialized Recruitment Agency in Switzerland",
  description: "TalentFlux: specialized recruitment agency in Switzerland — IT, Finance, Engineering, Landscaping, Telecom, Pharma & Life Sciences. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en",
    languages: { fr: "https://talentflux.ch", en: "https://talentflux.ch/en" },
  },
};

export default function HomeEnPage() {
  return <Home />;
}
