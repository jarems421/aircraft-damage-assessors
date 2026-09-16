import { AssessmentRequestForm } from "@/components/contact/AssessmentRequestForm";
import { PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
export const metadata = pageMetadata("Contact", "Prepare an enquiry about aircraft damage assessment or another aviation technical service from Aircraft Damage Assessors Ltd.");
// Mirrors the enquiry form's fields; keep the two in step.
const READY_ITEMS = ["Aircraft type", "Registration", "Where the aircraft is located", "Which areas are damaged", "A brief description of your enquiry"];
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[]; area?: string | string[] }> }) {
  const { service, area } = await searchParams;
  const initialService = SERVICES_DATA.find(item => item.id === service)?.id ?? "damage-assessment";
  const requestedAreas = [area ?? []].flat();
  const initialAreas = ASSESSMENT_ZONES.filter(zone => requestedAreas.includes(zone.id)).map(zone => zone.id);
  return <><PageIntro label="Contact" title="Let’s discuss your aircraft."><p>Start with the aircraft, its location and the service you would like to discuss.</p></PageIntro>
    <section className="site-width section-space contact-layout">
      <aside>
        <h2>Request an assessment.</h2>
        <p>Only your name, email and a brief description are required. Anything else you can share is a useful starting point.</p>
        <h3 className="ready-heading">What to have ready</h3>
        <ol className="ready-list">{READY_ITEMS.map((item, index) => <li key={item}><span className="row-number">0{index + 1}</span>{item}</li>)}</ol>
        <div className="contact-details">
          {COMPANY_CONFIG.email && <a href={`mailto:${COMPANY_CONFIG.email}`}>{COMPANY_CONFIG.email}</a>}
          {COMPANY_CONFIG.telephone && <a href={`tel:${COMPANY_CONFIG.telephone}`}>{COMPANY_CONFIG.telephoneDisplay ?? COMPANY_CONFIG.telephone}</a>}
          {COMPANY_CONFIG.serviceRegion && <p>{COMPANY_CONFIG.serviceRegion}. We travel to the aircraft’s location.</p>}
        </div>
      </aside>
      <AssessmentRequestForm key={`${initialService}-${initialAreas.join()}`} initialService={initialService} initialAreas={initialAreas} />
    </section></>;
}
