import { ASSESSMENT_ZONES } from "@/data/assessmentZones";
import { SERVICES_DATA } from "@/data/servicesData";

/**
 * Shared enquiry rules. The browser uses these to guide the visitor; the server applies them again
 * and never trusts the client. Vercel functions reject request bodies above roughly 4.5MB, so the
 * total upload allowance stays below that and photos are downscaled in the browser first.
 */
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
export const ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,image/*,application/pdf";
export const FIELD_LIMITS = { fullName: 120, email: 254, aircraftType: 120, aircraftRegistration: 40, aircraftLocation: 200, incidentDescription: 5000 };
/** Hidden field: real people leave it empty, simple bots fill it in. */
export const HONEYPOT_FIELD = "companyWebsite";

export type EnquiryFields = {
  fullName: string; email: string; service: string; areas: string[];
  aircraftType: string; aircraftRegistration: string; aircraftLocation: string; incidentDescription: string;
};
export type ValidationResult = { ok: true; fields: EnquiryFields } | { ok: false; error: string };

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
export function serviceTitle(id: string) {
  return SERVICES_DATA.find(service => service.id === id)?.title ?? "";
}
export function areaLabels(ids: string[]) {
  return ASSESSMENT_ZONES.filter(zone => ids.includes(zone.id)).map(zone => zone.label);
}
function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
/** Server-side validation. Returns a message safe to show a visitor. */
export function validateEnquiry(form: FormData): ValidationResult {
  if (text(form, HONEYPOT_FIELD)) return { ok: false, error: "Your enquiry could not be accepted." };
  const fields: EnquiryFields = {
    fullName: text(form, "fullName"),
    email: text(form, "email"),
    service: text(form, "serviceRequired"),
    areas: form.getAll("damageArea").filter((value): value is string => typeof value === "string"),
    aircraftType: text(form, "aircraftType"),
    aircraftRegistration: text(form, "aircraftRegistration"),
    aircraftLocation: text(form, "aircraftLocation"),
    incidentDescription: text(form, "incidentDescription"),
  };
  if (fields.fullName.length < 2 || fields.fullName.length > FIELD_LIMITS.fullName) return { ok: false, error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email) || fields.email.length > FIELD_LIMITS.email) return { ok: false, error: "Please enter a valid email address." };
  if (!SERVICES_DATA.some(service => service.id === fields.service)) return { ok: false, error: "Please choose a service." };
  if (fields.areas.some(area => !ASSESSMENT_ZONES.some(zone => zone.id === area))) return { ok: false, error: "Please choose damage areas from the list." };
  if (fields.aircraftType.length > FIELD_LIMITS.aircraftType || fields.aircraftRegistration.length > FIELD_LIMITS.aircraftRegistration || fields.aircraftLocation.length > FIELD_LIMITS.aircraftLocation) {
    return { ok: false, error: "Please shorten the aircraft details." };
  }
  if (fields.incidentDescription.length < 10) return { ok: false, error: "Please describe your enquiry." };
  if (fields.incidentDescription.length > FIELD_LIMITS.incidentDescription) return { ok: false, error: "Please shorten your description." };
  return { ok: true, fields };
}
/** Validates the uploaded files. Names are only used as email attachment labels, never as paths. */
export function validateFiles(files: File[]): { ok: true; files: File[] } | { ok: false; error: string } {
  const chosen = files.filter(file => file.size > 0);
  if (chosen.length > MAX_FILES) return { ok: false, error: `Please attach no more than ${MAX_FILES} files.` };
  let total = 0;
  for (const file of chosen) {
    if (!ACCEPTED_TYPES.includes(file.type)) return { ok: false, error: "Photos must be JPEG, PNG, WebP or HEIC images, or a PDF." };
    if (file.size > MAX_FILE_BYTES) return { ok: false, error: `Each file must be ${formatBytes(MAX_FILE_BYTES)} or smaller.` };
    total += file.size;
  }
  if (total > MAX_TOTAL_BYTES) return { ok: false, error: `Attachments must total ${formatBytes(MAX_TOTAL_BYTES)} or less.` };
  return { ok: true, files: chosen };
}
export function safeFileName(name: string, index: number) {
  const cleaned = name.replace(/[^\w.-]+/g, "-").replace(/^[-.]+/, "").slice(-80);
  return cleaned || `attachment-${index + 1}`;
}
