# Switching on the enquiry form

The contact form is built and tested, but it only sends once an email key is configured. Until then it
stays in preview mode and tells visitors to email the company directly. Nothing is faked.

## What happens when an enquiry is sent

1. The visitor fills in the form and may attach up to 5 photos or PDFs.
2. Large photos are downscaled in the browser (longest edge 1600px, JPEG) so they fit the upload allowance.
3. `POST /api/enquiry` validates every field again on the server, rejects spam (hidden honeypot field) and
   limits repeated posts from one address.
4. The enquiry is emailed to the company with the photos attached, with `reply-to` set to the visitor.
5. The visitor receives an automatic confirmation email.
6. Without JavaScript the same form posts normally and returns to `/contact?sent=1`.

## Configuration

Set these in Vercel (Project → Settings → Environment Variables), and in `.env.local` for local work.
See `.env.example`. Never commit real keys.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Enables sending. Create at [resend.com](https://resend.com). |
| `ENQUIRY_TO` | No | Where enquiries go. Defaults to the published company email. |
| `ENQUIRY_FROM` | Recommended | Verified sender address. Needed for confirmations to reach visitors. |
| `RESEND_API_BASE` | No | Test only; `scripts/check-enquiry.cjs` points it at a local stand-in. |

## Current live configuration (17 September 2026)

Sending is **switched on and fully configured** in Production and Preview:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | set (send-only key) |
| `ENQUIRY_TO` | `avionicsplus@gmail.com` |
| `ENQUIRY_FROM` | `enquiries@aircraftdamageassessors.com` |

`aircraftdamageassessors.com` is verified in Resend (DKIM, SPF and DMARC records live at Namecheap) and
attached to the Vercel project, with the bare domain redirecting to `www`. Verified end to end on
17 September 2026: an enquiry reached the company inbox and a confirmation reached an address other than
the Resend account owner's, which only works once a domain is verified.

**Outstanding: rotate `RESEND_API_KEY`.** The current key was shared in a chat transcript. Create a
replacement at resend.com, update it in Vercel and in `.env.local`, and revoke the old one.

**Note on `enquiries@aircraftdamageassessors.com`:** it sends but does not receive. Mail sent *to* it goes
nowhere until email hosting is added (Namecheap Private Email, Google Workspace or similar). Replies to an
enquiry still work, because each enquiry carries the visitor's address as reply-to.

When setting variables with the Vercel CLI, pipe values from a shell that does not add a byte-order mark
(bash `printf`, not PowerShell). A BOM in `RESEND_API_KEY` produces an invalid `Authorization` header and
every enquiry fails with a 500.

### Steps

1. Create a Resend account and an API key; put it in `RESEND_API_KEY`.
2. **Verify a sending domain** in Resend and set `ENQUIRY_FROM` to an address on it, for example
   `enquiries@yourdomain`. Until a domain is verified, Resend only sends from `onboarding@resend.dev`
   and only to the account owner's own address, so visitor confirmations will not arrive. Enquiries to the
   company will still work if `ENQUIRY_TO` is that same owner address.
3. Redeploy. The contact page switches to real sending automatically.
4. Send a test enquiry with a photo and confirm both emails arrive.

Gmail cannot be used as the sending address directly: Resend needs a domain it can verify. A Gmail address
is fine as the *recipient* (`ENQUIRY_TO`).

## Limits

- 5 files per enquiry, 3 MB each, 4 MB in total. Vercel rejects request bodies above roughly 4.5 MB.
- Accepted: JPEG, PNG, WebP, HEIC and PDF.
- 3 enquiries per minute per address, applied per server instance.
- If more or larger uploads are needed later, move uploads to Vercel Blob and email links instead of attachments.

## Testing

`npm run build` then `npm run test:enquiry`. The test starts its own server against a local stand-in for
Resend, so **no real email is sent**. It covers validation, the honeypot, file type and size limits,
attachment integrity, both emails, the no-JavaScript path, rate limiting, and a browser submission
including photo downscaling.
