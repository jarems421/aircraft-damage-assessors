"use client";
import { useState, type ReactNode } from "react";
import { AssessmentRequestForm } from "@/components/contact/AssessmentRequestForm";
import { ENQUIRY_FORMS, enquiryForm } from "@/data/enquiryForms";
import { SERVICES_DATA } from "@/data/servicesData";

type Props = { initialService: string; initialAreas: string[]; sendingEnabled: boolean; contactDetails: ReactNode; status: ReactNode };

/** The contact layout: the heading, preparation list and form all follow the service being enquired about. */
export function ContactEnquiry({ initialService, initialAreas, sendingEnabled, contactDetails, status }: Props) {
  const [service, setService] = useState(initialService);
  const form = enquiryForm(service) ?? ENQUIRY_FORMS[0];
  const heading = SERVICES_DATA.find(item => item.id === form.service)?.enquiryHeading;
  function changeService(next: string) {
    setService(next);
    // Keeps the address shareable and a reload on the same form.
    window.history.replaceState(null, "", `?service=${next}`);
  }
  return <section className="site-width section-space contact-layout">
    <aside>
      <h2>{heading}</h2>
      <p>{form.intro} Only your name, email and a brief description are required.</p>
      <h3 className="ready-heading">What to have ready</h3>
      <ol className="ready-list">{form.readyItems.map((item, index) => <li key={item}><span className="row-number">0{index + 1}</span>{item}</li>)}</ol>
      {contactDetails}
    </aside>
    <div className="enquiry-column">
      {status}
      <AssessmentRequestForm form={form} onServiceChange={changeService} initialAreas={initialAreas} sendingEnabled={sendingEnabled} />
    </div>
  </section>;
}
