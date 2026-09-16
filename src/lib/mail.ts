import { COMPANY_CONFIG } from "@/data/companyConfig";

/**
 * Email delivery through the Resend HTTPS API. No secrets reach the browser: this module is only
 * imported by the server route. Sending stays switched off until RESEND_API_KEY is set, and the
 * contact page tells visitors so rather than pretending an enquiry was sent.
 *
 * Environment variables (set in Vercel, never committed):
 *   RESEND_API_KEY   required to send at all
 *   ENQUIRY_TO       where enquiries go (defaults to the published company email)
 *   ENQUIRY_FROM     verified sender address, e.g. "enquiries@yourdomain" — required for
 *                    confirmation emails to reach anyone other than the account owner
 *   RESEND_API_BASE  overridden only by scripts/check-enquiry.cjs to test without sending mail
 */
export type Attachment = { filename: string; content: string };
export type Mail = { to: string; subject: string; text: string; replyTo?: string; attachments?: Attachment[] };

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY);
export const enquiryRecipient = () => process.env.ENQUIRY_TO || COMPANY_CONFIG.email || "";
const sender = () => process.env.ENQUIRY_FROM || "onboarding@resend.dev";

export async function sendMail(mail: Mail): Promise<{ ok: boolean; status: number; detail?: string }> {
  const base = process.env.RESEND_API_BASE || "https://api.resend.com";
  const response = await fetch(`${base}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${COMPANY_CONFIG.name} <${sender()}>`,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      reply_to: mail.replyTo,
      attachments: mail.attachments,
    }),
  });
  if (response.ok) return { ok: true, status: response.status };
  return { ok: false, status: response.status, detail: (await response.text()).slice(0, 300) };
}
