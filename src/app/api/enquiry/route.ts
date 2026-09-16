import { NextResponse } from "next/server";
import { COMPANY_CONFIG } from "@/data/companyConfig";
import { areaLabels, safeFileName, serviceTitle, validateEnquiry, validateFiles, type EnquiryFields } from "@/lib/enquiry";
import { enquiryRecipient, isMailConfigured, sendMail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort flood protection. Serverless instances are short-lived, so this only slows down
// repeated posts to the same instance; a shared store would be needed for stricter limits.
const WINDOW_MS = 60_000, MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter(time => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 500) for (const [id, times] of recent) if (times.every(time => now - time > WINDOW_MS)) recent.delete(id);
  return hits.length > MAX_PER_WINDOW;
}

function companyEmail(fields: EnquiryFields, files: string[]) {
  const lines = [
    `Name: ${fields.fullName}`,
    `Email: ${fields.email}`,
    `Service: ${serviceTitle(fields.service)}`,
    `Damage areas: ${areaLabels(fields.areas).join(", ") || "Not specified"}`,
    `Aircraft type: ${fields.aircraftType || "Not given"}`,
    `Registration: ${fields.aircraftRegistration || "Not given"}`,
    `Location: ${fields.aircraftLocation || "Not given"}`,
    `Photos attached: ${files.length ? files.join(", ") : "None"}`,
    "",
    "Enquiry:",
    fields.incidentDescription,
    "",
    "Sent from the website enquiry form. Reply directly to respond to the sender.",
  ];
  return lines.join("\n");
}
function confirmationEmail(fields: EnquiryFields) {
  const contact = [COMPANY_CONFIG.email, COMPANY_CONFIG.telephoneDisplay].filter(Boolean).join(" · ");
  return [
    `Dear ${fields.fullName},`,
    "",
    `Thank you for contacting ${COMPANY_CONFIG.name}. We have received your enquiry about ${serviceTitle(fields.service).toLowerCase()} and will be in touch.`,
    "",
    "Your enquiry:",
    fields.incidentDescription,
    "",
    `Damage areas: ${areaLabels(fields.areas).join(", ") || "Not specified"}`,
    `Aircraft: ${[fields.aircraftType, fields.aircraftRegistration, fields.aircraftLocation].filter(Boolean).join(" · ") || "Not given"}`,
    "",
    "This confirmation was sent automatically. You can reply to it if you need to add anything.",
    "",
    COMPANY_CONFIG.name,
    contact,
  ].join("\n");
}

export async function POST(request: Request) {
  const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;
  const reply = (status: number, message: string, sent = false, confirmed = false) => wantsJson
    ? NextResponse.json({ ok: sent, message, confirmed }, { status })
    : NextResponse.redirect(new URL(sent ? `/contact?sent=1${confirmed ? "" : "&confirmation=0"}` : `/contact?error=${status}`, request.url), 303);

  if (!isMailConfigured() || !enquiryRecipient()) return reply(503, "Enquiries cannot be sent yet. Please email us directly.");
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(address)) return reply(429, "Too many enquiries from this connection. Please try again shortly.");

  let form: FormData;
  try { form = await request.formData(); } catch { return reply(413, "Your attachments were too large to upload."); }

  const validated = validateEnquiry(form);
  if (!validated.ok) return reply(400, validated.error);
  const checked = validateFiles(form.getAll("photos").filter((value): value is File => value instanceof File));
  if (!checked.ok) return reply(400, checked.error);

  const attachments = await Promise.all(checked.files.map(async (file, index) => ({
    filename: safeFileName(file.name, index),
    content: Buffer.from(await file.arrayBuffer()).toString("base64"),
  })));
  const fields = validated.fields;
  const enquiry = await sendMail({
    to: enquiryRecipient(),
    subject: `Website enquiry — ${serviceTitle(fields.service)} — ${fields.fullName}`,
    text: companyEmail(fields, attachments.map(attachment => attachment.filename)),
    replyTo: fields.email,
    attachments,
  });
  if (!enquiry.ok) {
    console.error("Enquiry email failed", enquiry.status, enquiry.detail);
    return reply(502, "We could not send your enquiry. Please email us directly.");
  }
  // A confirmation needs a verified sender domain; if it fails the enquiry has still arrived.
  const confirmation = await sendMail({
    to: fields.email,
    subject: `We have received your enquiry — ${COMPANY_CONFIG.name}`,
    text: confirmationEmail(fields),
    replyTo: enquiryRecipient(),
  });
  if (!confirmation.ok) console.error("Confirmation email failed", confirmation.status, confirmation.detail);
  return reply(200, confirmation.ok
    ? "Thank you. Your enquiry has been sent and a confirmation is on its way to your inbox."
    : "Thank you. Your enquiry has been sent.", true, confirmation.ok);
}
