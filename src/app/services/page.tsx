import { EnquiryCTA, PageIntro, TextLink, pageMetadata } from "@/components/ui/Editorial";
import { SERVICES_DATA } from "@/data/servicesData";
export const metadata = pageMetadata("Services", "Aircraft damage assessment, pre-purchase inspections, aircraft recovery, third-party repair coordination and modification applications and approvals.");
export default function ServicesPage() {
  return <><PageIntro label="Our services" title="Aviation technical services."><p>Aircraft damage assessment, pre-purchase inspections, recovery, third-party repair coordination and modification applications and approvals.</p></PageIntro>
    <section className="site-width section-space service-details">{SERVICES_DATA.map((service, index) => <article id={service.id} key={service.id}><span className="row-number">0{index + 1}</span><h2>{service.title}</h2><div><p>{service.description}</p><TextLink href={service.id === "damage-assessment" ? "/damage-assessment" : `/contact?service=${service.id}`}>{service.id === "damage-assessment" ? "View assessment scope" : "Enquire about this service"}</TextLink></div></article>)}</section><EnquiryCTA /></>;
}
