import { ContactEnquiry } from "@/components/contact/ContactEnquiry";
import { PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { COMPANY_CONFIG, COMPANY_EMAILS } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
import { isMailConfigured } from "@/lib/mail";
export const metadata = pageMetadata("Contact", "Prepare an enquiry about aircraft damage assessment or another aviation technical service from Aircraft Damage Assessors Ltd.");
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
  // The form follows the service the visitor clicked, so arriving from "Aircraft recovery" opens the
  // recovery questions. Unrecognised or absent values fall back to damage assessment.
  const initialService = SERVICES_DATA.find(item => item.id === service)?.id ?? "damage-assessment";
  const requestedAreas = [area ?? []].flat();
  const initialAreas = ASSESSMENT_ZONES.filter(zone => requestedAreas.includes(zone.id)).map(zone => zone.id);
  const sendingEnabled = isMailConfigured();
  return <><PageIntro label="Contact" title="Let’s discuss your aircraft."><p>Start with the aircraft, its location and the service you would like to discuss.</p></PageIntro>
    <ContactEnquiry
      key={`${initialService}-${initialAreas.join()}`}
      initialService={initialService}
      initialAreas={initialAreas}
      sendingEnabled={sendingEnabled}
      contactDetails={<div className="contact-details">
        <dl className="contact-emails">{COMPANY_EMAILS.map(({ label, address }) => <div key={address}><dt>{label}</dt><dd><a href={`mailto:${address}`}>{address}</a></dd></div>)}</dl>
        {COMPANY_CONFIG.telephone && <a href={`tel:${COMPANY_CONFIG.telephone}`}>{COMPANY_CONFIG.telephoneDisplay ?? COMPANY_CONFIG.telephone}</a>}
        {COMPANY_CONFIG.whatsapp && <a href={`https://wa.me/${COMPANY_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a>}
        {COMPANY_CONFIG.serviceRegion && <p>{COMPANY_CONFIG.serviceRegion}. We travel to the aircraft’s location.</p>}
      </div>}
      status={<>
        {sent && <p className="form-status" role="status">Thank you. Your enquiry has been sent{confirmation === "0" ? "." : " and a confirmation is on its way to your inbox."}</p>}
        {error && <p className="form-error" role="alert">{ERRORS[error] ?? "We could not send your enquiry. Please email us directly."}</p>}
      </>}
    />
  </>;
}
