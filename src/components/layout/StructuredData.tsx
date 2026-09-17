import { COMPANY_CONFIG, COMPANY_PEOPLE, SITE_URL } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";

/**
 * Machine-readable business details for search engines. Every value restates a confirmed fact from
 * companyConfig; nothing here may assert anything the site does not already say.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY_CONFIG.name,
    description: COMPANY_CONFIG.descriptor,
    ...(SITE_URL ? { url: SITE_URL, image: `${SITE_URL}/opengraph-image` } : {}),
    ...(COMPANY_CONFIG.email ? { email: COMPANY_CONFIG.email } : {}),
    ...(COMPANY_CONFIG.telephone ? { telephone: COMPANY_CONFIG.telephone } : {}),
    ...(COMPANY_CONFIG.founded ? { foundingDate: String(COMPANY_CONFIG.founded) } : {}),
    ...(COMPANY_CONFIG.serviceRegion ? { areaServed: { "@type": "Place", name: COMPANY_CONFIG.serviceRegion } } : {}),
    founder: COMPANY_PEOPLE.map(person => ({ "@type": "Person", name: person.name, jobTitle: person.role })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aviation technical services",
      itemListElement: SERVICES_DATA.map(service => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.description },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
