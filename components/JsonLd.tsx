// Composant JSON-LD réutilisable pour schema.org EmploymentAgency
// Rendu côté serveur — visible dans le HTML initial (SEO ✓)

interface JsonLdProps {
  serviceType: string;   // ex: "Recrutement IT et Digital"
  sectorSlug: string;    // ex: "it"
  areaServed?: string[]; // ex: ["Suisse romande", "Suisse alémanique"]
}

export default function JsonLd({
  serviceType,
  sectorSlug,
  areaServed = ["Suisse romande", "Suisse alémanique", "Suisse"],
}: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "TalentFlux",
    url: `https://talentflux.ch/${sectorSlug}`,
    logo: "https://talentflux.ch/logo.png",
    description: `Agence de recrutement spécialisée en ${serviceType} en Suisse.`,
    telephone: "+41765928806",
    email: "info@talentflux.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yverdon-les-Bains",
      addressLocality: "Yverdon-les-Bains",
      postalCode: "1400",
      addressCountry: "CH",
      addressRegion: "Vaud",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    serviceType,
    priceRange: "Au succès",
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: ["https://www.linkedin.com/company/talentflux"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
