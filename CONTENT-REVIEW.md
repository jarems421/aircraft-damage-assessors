# Website content review

## Source of truth

Company statements are limited to the services and assessment scope supplied in AGENTS.md, with the latest client correction taking precedence: do not describe the company or its reporting as independent.

- `src/data/companyConfig.ts`: confirmed identity, contact details, service region, founding year, director, licences, aircraft scope and report turnaround (client confirmations of 16 September 2026). Anything still unconfirmed stays `null` and is not rendered.
- `src/data/legalContent.ts`: privacy, terms and cookie drafts awaiting the client's legal adviser. Unconfirmed points are marked `[To confirm: ...]` and the draft notice stays on each page until the wording is approved.
- `src/data/servicesData.ts`: the five confirmed services, without added procedures or deliverables.
- `src/data/deliverablesData.ts`: the confirmed assessment scope, not an invented process sequence.
- `src/data/assessmentZones.ts`: illustrative damage locations used only as enquiry inputs, with no area-specific claims.
- `src/components/brand/`: temporary "AD" text monogram, wordmark and share-image template; replace with client branding.

## Removed

The previous site included structural surveys/condition, latent damage, line-item formats, repair-hour projections, claims-related benefits, recovery logistics, personnel assertions and an invented operational workflow. These have been removed, including from metadata and unused report/schematic components.

The previous legal drafts also asserted cookie usage, an upload portal, a privacy representative and engagement terms that had not been established. The legal routes now carry fresh drafts written against what the site actually does, each marked as a draft for legal review.

## Form behaviour

The enquiry form prepares a local preview only. It does not send a request, upload files or persist entries. The action is explicitly labelled "Preview enquiry". Submission is disabled without JavaScript.

The client has asked for photo uploads with enquiries and an automatic confirmation email. Both need a server endpoint and an email service, and neither may be simulated: do not add an upload control or a confirmation message until delivery actually works. Sending enquiries to avionicsplus@gmail.com is the remaining launch blocker, together with approved legal wording.

## Search indexing

Indexing is controlled by `NEXT_PUBLIC_SITE_URL` (see `src/data/companyConfig.ts`). When unset — review and preview builds — pages are `noindex` and robots.txt disallows crawling. Set it to the confirmed production domain to enable indexing, the robots sitemap link and absolute share-image URLs. Do this only once contact details, legal pages and the form service are in place.

## Regression checks

Run `node scripts/check-copy.cjs` to catch previously rejected phrases. Review all new claims against confirmed client information even when this check passes. Do not expand the scope to make copy sound more impressive.

`node scripts/check-site.cjs` checks all eight routes at four viewport widths, metadata, overflow, mobile navigation, form validation and local preview behaviour. `node scripts/check-aircraft.cjs` checks rotation, touch, keyboard controls, fallback, context loss and retry. Both accept an `AIRCRAFT_TEST_URL` environment variable.
