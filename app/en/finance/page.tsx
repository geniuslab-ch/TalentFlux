import type { Metadata } from "next";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";

const TalentFluxFinanceClient = dynamic(
  () => import("@/components/pages/TalentFluxFinance"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Finance & Accounting Recruitment Switzerland",
  description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Swiss GAAP & IFRS profiles. Yverdon-les-Bains.",
  alternates: {
    canonical: "https://talentflux.ch/en/finance",
    languages: { "fr": "https://talentflux.ch/finance", "en": "https://talentflux.ch/en/finance" },
  },
  openGraph: {
    title: "Finance & Accounting Recruitment Switzerland",
    description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Swiss GAAP & IFRS profiles. Yverdon-les-Bains.",
    url: "https://talentflux.ch/en/finance",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxFinanceEnPage() {
  return (
    <>
      <JsonLd
        serviceType="Finance, accounting and management control recruitment"
        sectorSlug="en/finance"
        areaServed={["French-speaking Switzerland", "Geneva", "Zurich", "Vaud", "Switzerland"]}
      />
      <TalentFluxFinanceClient />
    </>
  );
}
