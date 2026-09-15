"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { SERVICES_DATA } from "@/data/servicesData";

// FRONTEND PREVIEW ONLY. No request, email, file upload or storage integration.
// Keep transmission disabled until a real, server-validated endpoint is configured.
const subscribe = () => () => {};
export function AssessmentRequestForm({ initialService = "damage-assessment", initialAreas = [] }: { initialService?: string; initialAreas?: string[] }) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [review, setReview] = useState<{ label: string; value: string }[] | null>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  return <form className="enquiry-form" onChange={() => setReview(null)} onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const service = SERVICES_DATA.find(item => item.id === data.get("serviceRequired"));
    setReview([
      { label: "Name", value: String(data.get("fullName") ?? "") },
      { label: "Email", value: String(data.get("email") ?? "") },
      { label: "Service", value: service?.title ?? "" },
      { label: "Damage areas", value: ASSESSMENT_ZONES.filter(zone => data.getAll("damageArea").includes(zone.id)).map(zone => zone.label).join(", ") },
      { label: "Aircraft", value: String(data.get("aircraftType") ?? "") },
      { label: "Registration", value: String(data.get("aircraftRegistration") ?? "") },
      { label: "Location", value: String(data.get("aircraftLocation") ?? "") },
      { label: "Enquiry", value: String(data.get("incidentDescription") ?? "") },
    ]);
    requestAnimationFrame(() => reviewHeading.current?.focus());
  }}>
    <p className="form-notice"><strong>Preview form.</strong> You can prepare and review an enquiry here. Nothing is sent to the company.</p>
    <noscript><p className="form-notice">JavaScript is required to preview an enquiry.</p></noscript>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="fullName">Your name *</label><input id="fullName" name="fullName" autoComplete="name" required maxLength={120} /></div>
      <div className="form-field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      <div className="form-field form-wide"><label htmlFor="serviceRequired">Service</label><select key={initialService} id="serviceRequired" name="serviceRequired" defaultValue={initialService}>{SERVICES_DATA.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
      <fieldset className="form-checks form-wide"><legend>Areas of aircraft damage (optional, select all that apply)</legend><div className="check-options">{ASSESSMENT_ZONES.map(zone => <label key={zone.id} htmlFor={`damageArea-${zone.id}`}><input id={`damageArea-${zone.id}`} type="checkbox" name="damageArea" value={zone.id} defaultChecked={initialAreas.includes(zone.id)} />{zone.label}</label>)}</div></fieldset>
      <div className="form-field"><label htmlFor="aircraftType">Aircraft type (optional)</label><input id="aircraftType" name="aircraftType" maxLength={120} /></div>
      <div className="form-field"><label htmlFor="aircraftRegistration">Registration (optional)</label><input id="aircraftRegistration" name="aircraftRegistration" maxLength={40} /></div>
      <div className="form-field form-wide"><label htmlFor="aircraftLocation">Aircraft location (optional)</label><input id="aircraftLocation" name="aircraftLocation" maxLength={200} /></div>
      <div className="form-field form-wide"><label htmlFor="incidentDescription">What would you like to discuss? *</label><textarea id="incidentDescription" name="incidentDescription" required maxLength={5000} rows={5} /></div>
    </div>
    <div className="form-actions"><p>* Required to preview your enquiry</p><button className="button button-dark" type="submit" disabled={!hydrated}>Preview enquiry <span aria-hidden="true">↗</span></button></div>
    {review && <section className="form-review" aria-label="Enquiry preview"><h3 tabIndex={-1} ref={reviewHeading}>Your enquiry preview</h3><p>Nothing has been sent. This preview stays on this page and is cleared when you leave or reload.</p><dl>{review.filter(item => item.value).map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>}
  </form>;
}
