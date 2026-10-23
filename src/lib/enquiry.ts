import { enquiryForm, type EnquiryForm } from "@/data/enquiryForms";
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
export const FIELD_LIMITS = { fullName: 120, email: 254, incidentDescription: 5000 };
/** Hidden field: real people leave it empty, simple bots fill it in. */
export const HONEYPOT_FIELD = "companyWebsite";

/** One answer to a service-specific question, labelled for the emails and the preview. */
export type EnquiryDetail = { label: string; value: string };
export type EnquiryFields = { fullName: string; email: string; service: string; details: EnquiryDetail[]; incidentDescription: string };
export type ValidationResult = { ok: true; fields: EnquiryFields } | { ok: false; error: string };

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
export function serviceTitle(id: string) {
  return SERVICES_DATA.find(service => service.id === id)?.title ?? "";
}
function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
/** Reads the chosen service's own questions. Answers outside a question's options are dropped here and rejected by validation. */
export function enquiryDetails(spec: EnquiryForm, form: FormData): EnquiryDetail[] {
  return spec.fields.map(field => {
    if (field.kind === "text") return { label: field.label, value: text(form, field.name) };
    const chosen = field.kind === "checks" ? form.getAll(field.name) : [form.get(field.name)];
    return { label: field.label, value: field.options.filter(option => chosen.includes(option.value)).map(option => option.label).join(", ") };
  });
}
function detailsError(spec: EnquiryForm, form: FormData) {
  for (const field of spec.fields) {
    if (field.kind === "text") {
      const value = text(form, field.name);
      if (field.required && !value) return `Please enter ${field.label.toLowerCase()}.`;
      if (value.length > field.maxLength) return `Please shorten ${field.label.toLowerCase()}.`;
      if (field.type === "date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Please check ${field.label.toLowerCase()}.`;
      continue;
    }
    const allowed = field.options.map(option => option.value);
    const chosen = form.getAll(field.name).filter(value => value !== "");
    if (chosen.some(value => typeof value !== "string" || !allowed.includes(value)) || (field.kind === "select" && chosen.length > 1)) return `Please choose ${field.label.toLowerCase()} from the list.`;
  }
  return "";
}
/** Server-side validation. Returns a message safe to show a visitor. */
export function validateEnquiry(form: FormData): ValidationResult {
  if (text(form, HONEYPOT_FIELD)) return { ok: false, error: "Your enquiry could not be accepted." };
  const fullName = text(form, "fullName"), email = text(form, "email");
  if (fullName.length < 2 || fullName.length > FIELD_LIMITS.fullName) return { ok: false, error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > FIELD_LIMITS.email) return { ok: false, error: "Please enter a valid email address." };
  const service = text(form, "serviceRequired");
  const spec = enquiryForm(service);
  if (!spec) return { ok: false, error: "Please choose a service." };
  const error = detailsError(spec, form);
  if (error) return { ok: false, error };
  const fields: EnquiryFields = { fullName, email, service, details: enquiryDetails(spec, form), incidentDescription: text(form, "incidentDescription") };
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
