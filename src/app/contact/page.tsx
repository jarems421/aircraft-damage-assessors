import { AssessmentRequestForm } from "@/components/contact/AssessmentRequestForm";
import { PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
import { isMailConfigured } from "@/lib/mail";
export const metadata = pageMetadata("Contact", "Prepare an enquiry about aircraft damage assessment or another aviation technical service from Aircraft Damage Assessors Ltd.");
// Mirrors the enquiry form's fields; keep the two in step.
const READY_ITEMS = ["Aircraft type", "Registration", "Where the aircraft is located", "Which areas are damaged", "Photos of the damage", "A brief description of your enquiry"];
// Messages for visitors without JavaScript, who arrive back here after the form posts.
const ERRORS: Record<string, string> = {
  "400": "Some details were missing or too long. Please check the form and try again.",
  "413": "Your attachments were too large to upload. Please send fewer or smaller photos.",
  "429": "Too many enquiries from this connection. Please try again shortly.",
  "502": "We could not send your enquiry. Please email us directly.",
  "503": "Enquiries cannot be sent from the website yet. Please email us directly.",
};
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[]; area?: string | string[]; sent?: string; confirmation?: string; error?: string }> }) {
  const { service, area, sent, confirmation, error } = await searchParams;
  // The heading follows the service the visitor clicked, so arriving from "Aircraft recovery" does not
  // greet them with "Request an assessment." Unrecognised or absent values fall back to the default.
  const requestedService = SERVICES_DATA.find(item => item.id === service);
  const initialService = requestedService?.id ?? "damage-assessment";
  const requestedAreas = [area ?? []].flat();
  const initialAreas = ASSESSMENT_ZONES.filter(zone => requestedAreas.includes(zone.id)).map(zone => zone.id);
  const sendingEnabled = isMailConfigured();
  return <><PageIntro label="Contact" title="Let’s discuss your aircraft."><p>Start with the aircraft, its location and the service you would like to discuss.</p></PageIntro>
    <section className="site-width section-space contact-layout">
      <aside>
        <h2>{requestedService?.enquiryHeading ?? "Request an assessment."}</h2>
        <p>Only your name, email and a brief description are required. Anything else you can share is a useful starting point.</p>
        <h3 className="ready-heading">What to have ready</h3>
        <ol className="ready-list">{READY_ITEMS.map((item, index) => <li key={item}><span className="row-number">0{index + 1}</span>{item}</li>)}</ol>
        <div className="contact-details">
          {COMPANY_CONFIG.email && <a href={`mailto:${COMPANY_CONFIG.email}`}>{COMPANY_CONFIG.email}</a>}
          {COMPANY_CONFIG.telephone && <a href={`tel:${COMPANY_CONFIG.telephone}`}>{COMPANY_CONFIG.telephoneDisplay ?? COMPANY_CONFIG.telephone}</a>}
          {COMPANY_CONFIG.serviceRegion && <p>{COMPANY_CONFIG.serviceRegion}. We travel to the aircraft’s location.</p>}
        </div>
      </aside>
      <div className="enquiry-column">
        {sent && <p className="form-status" role="status">Thank you. Your enquiry has been sent{confirmation === "0" ? "." : " and a confirmation is on its way to your inbox."}</p>}
        {error && <p className="form-error" role="alert">{ERRORS[error] ?? "We could not send your enquiry. Please email us directly."}</p>}
        <AssessmentRequestForm key={`${initialService}-${initialAreas.join()}`} initialService={initialService} initialAreas={initialAreas} sendingEnabled={sendingEnabled} />
      </div>
    </section></>;
}
