// Server Component — English homepage
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HomeClient = dynamic(
  () => import("@/components/pages/Home"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Specialized Recruitment Agency in Switzerland",
  description:
    "TalentFlux: specialized recruitment agency in Switzerland across 6 sectors — IT, Finance, Engineering, Landscaping, Telecom, Pharma & Life Sciences. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en",
    languages: { fr: "https://talentflux.ch", en: "https://talentflux.ch/en" },
  },
  openGraph: {
    title: "TalentFlux — Specialized Recruitment Agency in Switzerland",
    description: "6 specialized recruitment sectors in Switzerland. IT, Finance, Engineering, Landscaping, Telecom, Pharma. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en",
    locale: "en_CH",
    type: "website",
  },
};

export default function HomeEnPage() {
  return <HomeClient />;
}
