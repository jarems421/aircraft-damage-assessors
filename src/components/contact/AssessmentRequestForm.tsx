"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { SERVICES_DATA } from "@/data/servicesData";
import { ACCEPT_ATTRIBUTE, FIELD_LIMITS, HONEYPOT_FIELD, MAX_FILES, MAX_FILE_BYTES, MAX_TOTAL_BYTES, formatBytes } from "@/lib/enquiry";

const subscribe = () => () => {};
type Props = { initialService?: string; initialAreas?: string[]; sendingEnabled?: boolean };

// Large photos are downscaled in the browser: phone cameras easily exceed the upload allowance,
// and the server (and Vercel's request limit) would otherwise reject the enquiry.
async function prepareFile(file: File) {
  if (!file.type.startsWith("image/") || file.size <= 900_000) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function AssessmentRequestForm({ initialService = "damage-assessment", initialAreas = [], sendingEnabled = false }: Props) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [review, setReview] = useState<{ label: string; value: string }[] | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const statusHeading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);

  // PREVIEW ONLY while sending is unconfigured: nothing leaves the browser.
  function preview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setReview([
      { label: "Name", value: String(data.get("fullName") ?? "") },
      { label: "Email", value: String(data.get("email") ?? "") },
      { label: "Service", value: SERVICES_DATA.find(item => item.id === data.get("serviceRequired"))?.title ?? "" },
      { label: "Damage areas", value: ASSESSMENT_ZONES.filter(zone => data.getAll("damageArea").includes(zone.id)).map(zone => zone.label).join(", ") },
      { label: "Aircraft", value: String(data.get("aircraftType") ?? "") },
      { label: "Registration", value: String(data.get("aircraftRegistration") ?? "") },
      { label: "Location", value: String(data.get("aircraftLocation") ?? "") },
      { label: "Enquiry", value: String(data.get("incidentDescription") ?? "") },
    ]);
    requestAnimationFrame(() => reviewHeading.current?.focus());
  }

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const data = new FormData(form);
    data.delete("photos");
    let total = 0;
    for (const chosen of files) {
      const file = await prepareFile(chosen);
      total += file.size;
      if (file.size > MAX_FILE_BYTES || total > MAX_TOTAL_BYTES) {
        setStatus("error");
        setMessage(`Attachments must total ${formatBytes(MAX_TOTAL_BYTES)} or less. Please remove a photo and try again.`);
        return;
      }
      data.append("photos", file, file.name);
    }
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const result: { ok?: boolean; message?: string } = await response.json().catch(() => ({}));
      setStatus(response.ok && result.ok ? "sent" : "error");
      setMessage(result.message || "We could not send your enquiry. Please email us directly.");
      if (response.ok && result.ok) { form.reset(); setFiles([]); }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection or email us directly.");
    }
    requestAnimationFrame(() => statusHeading.current?.focus());
  }

  if (status === "sent") {
    return <section className="form-sent" aria-label="Enquiry sent">
      <h3 tabIndex={-1} ref={statusHeading}>Enquiry sent</h3>
      <p>{message}</p>
      <button type="button" className="button button-dark" onClick={() => { setStatus("idle"); setMessage(""); }}>Send another enquiry <span aria-hidden="true">↗</span></button>
    </section>;
  }
  return <form
    className="enquiry-form"
    action={sendingEnabled ? "/api/enquiry" : undefined}
    method={sendingEnabled ? "post" : undefined}
    encType={sendingEnabled ? "multipart/form-data" : undefined}
    onChange={() => { setReview(null); if (status === "error") setStatus("idle"); }}
    onSubmit={sendingEnabled ? send : preview}
  >
    {sendingEnabled
      ? <p className="form-notice">Send your enquiry with photos of the damage if you have them. You will receive an email confirmation.</p>
      : <p className="form-notice"><strong>Preview form.</strong> You can prepare and review an enquiry here. Nothing is sent yet — please email us directly in the meantime.</p>}
    {!sendingEnabled && <noscript><p className="form-notice">JavaScript is required to preview an enquiry.</p></noscript>}
    <div className="form-grid">
      <div className="form-field"><label htmlFor="fullName">Your name *</label><input id="fullName" name="fullName" autoComplete="name" required maxLength={FIELD_LIMITS.fullName} /></div>
      <div className="form-field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={FIELD_LIMITS.email} /></div>
      <div className="form-field form-wide"><label htmlFor="serviceRequired">Service</label><select key={initialService} id="serviceRequired" name="serviceRequired" defaultValue={initialService}>{SERVICES_DATA.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
      <fieldset className="form-checks form-wide"><legend>Areas of aircraft damage (optional, select all that apply)</legend><div className="check-options">{ASSESSMENT_ZONES.map(zone => <label key={zone.id} htmlFor={`damageArea-${zone.id}`}><input id={`damageArea-${zone.id}`} type="checkbox" name="damageArea" value={zone.id} defaultChecked={initialAreas.includes(zone.id)} />{zone.label}</label>)}</div></fieldset>
      <div className="form-field"><label htmlFor="aircraftType">Aircraft type (optional)</label><input id="aircraftType" name="aircraftType" maxLength={FIELD_LIMITS.aircraftType} /></div>
      <div className="form-field"><label htmlFor="aircraftRegistration">Registration (optional)</label><input id="aircraftRegistration" name="aircraftRegistration" maxLength={FIELD_LIMITS.aircraftRegistration} /></div>
      <div className="form-field form-wide"><label htmlFor="aircraftLocation">Aircraft location (optional)</label><input id="aircraftLocation" name="aircraftLocation" maxLength={FIELD_LIMITS.aircraftLocation} /></div>
      <div className="form-field form-wide"><label htmlFor="incidentDescription">What would you like to discuss? *</label><textarea id="incidentDescription" name="incidentDescription" required minLength={10} maxLength={FIELD_LIMITS.incidentDescription} rows={5} /></div>
      {sendingEnabled && <div className="form-field form-wide">
        <label htmlFor="photos">Photos of the damage (optional)</label>
        <input id="photos" name="photos" type="file" multiple accept={ACCEPT_ATTRIBUTE} aria-describedby="photos-hint" onChange={event => setFiles(Array.from(event.target.files ?? []).slice(0, MAX_FILES))} />
        <p id="photos-hint" className="field-hint">Up to {MAX_FILES} photos or PDFs. Large photos are reduced automatically before sending.</p>
        {files.length > 0 && <ul className="file-list">{files.map(file => <li key={`${file.name}-${file.size}`}><span>{file.name}</span><span>{formatBytes(file.size)}</span></li>)}</ul>}
      </div>}
    </div>
    <p className="visually-hidden" aria-hidden="true"><label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label><input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" /></p>
    <div className="form-actions">
      <p>* Required{sendingEnabled ? "" : " to preview your enquiry"}</p>
      <button className="button button-dark" type="submit" disabled={(!sendingEnabled && !hydrated) || status === "sending"}>
        {sendingEnabled ? (status === "sending" ? "Sending…" : "Send enquiry") : "Preview enquiry"} <span aria-hidden="true">↗</span>
      </button>
    </div>
    {status === "error" && <p className="form-error" role="alert"><span tabIndex={-1} ref={statusHeading as React.RefObject<HTMLSpanElement>}>{message}</span></p>}
    {review && <section className="form-review" aria-label="Enquiry preview"><h3 tabIndex={-1} ref={reviewHeading}>Your enquiry preview</h3><p>Nothing has been sent. This preview stays on this page and is cleared when you leave or reload.</p><dl>{review.filter(item => item.value).map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>}
  </form>;
}
