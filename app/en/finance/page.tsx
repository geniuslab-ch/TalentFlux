import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import EnWrapper from "@/components/EnWrapper";
import TalentFluxFinance from "@/components/pages/TalentFluxFinance";

export const metadata: Metadata = {
  title: "Finance & Accounting Recruitment Switzerland",
  description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Yverdon.",
  alternates: {
    canonical: "https://talentflux.ch/en/finance",
    languages: { "fr": "https://talentflux.ch/finance", "en": "https://talentflux.ch/en/finance", "x-default": "https://talentflux.ch/finance" },
  },
  openGraph: {
    title: "Finance & Accounting Recruitment Switzerland | TalentFlux",
    description: "Specialized Finance recruitment in Switzerland. CFO, Management Control, Audit, Treasury, FINMA Compliance. Yverdon.",
    url: "https://talentflux.ch/en/finance",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxFinanceEnPage() {
  return (
    <>
      <JsonLd serviceType="Finance, accounting and management control recruitment" sectorSlug="en/finance" areaServed={["French-speaking Switzerland","Geneva","Zurich","Vaud","Switzerland"]} />
      {/* EnWrapper fournit lang="en" via React Context aux composants enfants */}
      <EnWrapper>
        <TalentFluxFinance />
      </EnWrapper>
    </>
  );
}
