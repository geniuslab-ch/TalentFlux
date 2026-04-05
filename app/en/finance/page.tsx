import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TalentFluxFinance from "@/components/pages/TalentFluxFinance";

export const metadata: Metadata = {
  title: "Finance & Accounting Recruitment Switzerland",
  alternates: {
    canonical: "https://talentflux.ch/en/finance",
    languages: { "fr": "https://talentflux.ch/finance", "en": "https://talentflux.ch/en/finance" },
  },
  openGraph: {
    title: "Finance & Accounting Recruitment Switzerland | TalentFlux",
    url: "https://talentflux.ch/en/finance",
    type: "website",
    locale: "en_CH",
  },
};

export default function TalentFluxFinanceEnPage() {
  return (
    <>
      <JsonLd serviceType="Finance, accounting and management control recruitment" sectorSlug="en/finance" areaServed={["French-speaking Switzerland","Geneva","Zurich","Vaud","Switzerland"]} />
      <TalentFluxFinance />
    </>
  );
}
