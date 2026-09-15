<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aircraft Damage Assessors Ltd — Project Instructions

These instructions apply to all work in this repository.

## Project Context

This is a real commercial website for:
**Aircraft Damage Assessors Ltd**

The company provides aircraft damage assessment and related aviation technical services.

Primary audiences include:
- Aircraft insurance companies
- Insurance brokers
- Aircraft owners
- Aircraft operators
- Aviation organisations

The website must feel credible, technical, precise and appropriate for professional aviation and insurance clients.

## Absolute Factual Accuracy Rule

Never invent or imply company capabilities, credentials, approvals, experience, clients, statistics, partnerships, geographic coverage or regulatory status.

Before writing any factual statement about the company, ask:
> Was this explicitly provided or confirmed by the client?

If not:
- Remove the claim, or
- Rewrite it neutrally, or
- Use a clearly identifiable placeholder.

Do not expand services based merely on what aviation companies typically offer.

## Confirmed Services

The client has confirmed the following services:
- **Aircraft Damage Assessment**
- **Pre-Purchase Inspections**
- **Aircraft Recovery**
- **Aircraft Repair Coordination through third parties**
- **Aircraft Modification Applications and Approvals** involving:
  - Airframes
  - Engines
  - Avionics
  - Instruments
  - Associated equipment

Do not add additional service capabilities without confirmation.

## Confirmed Damage Assessment Scope

Confirmed information includes:
- Comprehensive aircraft damage assessment
- Detailed damage report
- Identification of parts required
- Estimated cost of parts
- Estimated labour cost where the aircraft is believed to be repairable
- Assessment of repairability
- Estimated aircraft recovery cost
- Investigation aimed at determining the potential cause of an incident or accident
- Arrangement of a suitable third-party AMO where the current AMO does not have the required repair capability

Do not expand this scope without client confirmation.

## Accident Investigation Language

Aircraft Damage Assessors Ltd must be positioned as a technical services company. The client has explicitly instructed that "independent" must not appear in company copy; this correction supersedes earlier positioning language.

Never imply that it is:
- A government accident investigation authority
- AAIB
- NTSB
- A regulator
- A law-enforcement body
- An official statutory investigator

Prefer wording such as:
> "Investigation into the potential cause of an incident or accident within the company's technical assessment scope."

## Unsupported Claims

Client correction: do not use "independent", "detailed structural survey", "line-item cost estimates", "direct & latent damage", or "structural condition". Do not turn a confirmed service into unconfirmed procedures, report formats, repair-hour projections or claims-related benefits. Keep service copy in the central data files and run `node scripts/check-copy.cjs` after content changes. This regression check supplements a factual review; passing it does not validate new claims.

Do not currently claim that the company provides:
- Airworthiness Directive reviews
- Logbook audits
- Structural integrity audits
- Site containment
- Evidence preservation
- Test flights
- Specific aircraft-category expertise
- Specific manufacturer expertise
- Independent repair supervision
- Regulatory approvals
- International coverage
- Emergency response times
- Specific turnaround times
- Claim validation
- Dispute reduction
- Specific financial savings

unless these are subsequently confirmed by the client.

## Current Unknown Information

Treat the following as unknown until confirmed:
- Company logo
- Business email
- Business telephone
- Office address
- Service region
- Geographic coverage
- Years of experience
- Founder/director information
- Team members
- Qualifications
- Licences
- Certifications
- Regulatory approvals
- Professional memberships
- Aircraft categories covered
- Manufacturers covered
- Previous clients
- Partner AMOs
- Testimonials
- Case studies
- Pricing
- Response times
- Report turnaround times
- Real company photography

Use structured placeholders where necessary.

## Design Direction

The website should feel like a serious aviation engineering / technical consultancy.

Primary characteristics:
- Professional
- Technical
- Precise
- Independent
- Trustworthy
- Premium
- Restrained

Use:
- Deep navy
- Near-black
- White / off-white
- Cool neutral greys
- Restrained aviation blue

Avoid:
- Generic SaaS visuals
- Neon gradients
- Excessive glassmorphism
- Cartoon aircraft icons
- Airline/travel aesthetics
- Military aesthetics
- Excessive animation
- AI-looking decorative clutter

Use strong typography, clean spacing and subtle technical/engineering visual language.

## Branding

Until the client provides branding:
- Use a clean temporary text wordmark.
- Do not invent an elaborate permanent logo.
- Keep all brand assets easy to replace.
- Treat placeholder photography as temporary.

Any AI-generated or placeholder aviation imagery must be replaceable by real client or properly licensed photography before production launch.

## UX Priorities

The main conversion goal is:
**Request an Assessment**

Secondary actions may include:
- Explore Services
- Contact Us
- Discuss an Aircraft
- Request an Enquiry

Visitors should understand within approximately five seconds:
- What the company does
- Who it serves
- What the primary damage-assessment service provides
- How to contact the company

## Site Architecture

Current primary routes:
- `/`
- `/about`
- `/damage-assessment`
- `/services`
- `/contact`
- `/privacy`
- `/terms`
- `/cookies`

Do not create unnecessary pages unless there is a genuine UX or SEO reason.

## Technology

Use:
- Current stable Next.js 16 Active LTS release
- TypeScript
- App Router
- Tailwind CSS
- Semantic HTML
- Accessible React components

Avoid unnecessary dependencies.
Keep architecture simple and maintainable.

## Component Architecture

Prefer reusable components.
Keep page files reasonably small.

Reusable components should cover patterns such as:
- Header
- Navigation
- Footer
- Container
- Buttons
- Section headings
- Service cards
- CTA sections
- Form fields
- Technical badges
- Report/deliverable cards

Separate content/data from UI components where this materially improves maintainability.

## TypeScript

Use strict TypeScript.
Avoid:
- `any`
- unsafe casts
- duplicated interfaces
- unnecessary non-null assertions

Prefer explicit types for shared data structures and props.

## Styling

Maintain consistent design tokens for:
- spacing
- typography
- colours
- border radii
- shadows
- container widths

Do not scatter arbitrary styling values throughout components.
Avoid excessive visual effects.
Animations should be subtle and should never interfere with readability or performance.
Respect `prefers-reduced-motion`.

## Responsive Design

Every page must be deliberately designed and tested at approximately:
- 1440px
- 1024px
- 768px
- 390px

Mobile must not merely be the desktop layout compressed.

Check:
- navigation
- typography
- forms
- service cards
- technical diagrams
- CTA placement
- content hierarchy
- touch targets
- overflow

There must be no unintended horizontal scrolling.

## Accessibility

Maintain:
- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper form labels
- Accessible mobile navigation
- Appropriate contrast
- Meaningful link/button text
- Useful image alternative text
- ARIA only where necessary

Interactive controls should have appropriate touch target sizes.

## Forms

The assessment/contact form is currently frontend-only unless explicitly connected later.
Do not pretend submissions are being sent when no backend/email service exists.
If a simulated success state is used during development, label the implementation clearly in code.
Keep future API/email integration clean and obvious.
Never expose secrets or API keys in client-side code.

## SEO

Use:
- Unique page titles
- Useful meta descriptions
- Correct heading hierarchy
- Internal links
- Open Graph metadata
- Sitemap
- robots configuration
- Appropriate canonical metadata when necessary

SEO copy must remain natural.
Do not keyword-stuff.
Do not target specific geographic regions until service coverage is confirmed.

## Security

Never commit:
- API keys
- passwords
- private credentials
- `.env` secrets
- sensitive client data

Validate any future server-side form inputs.
Treat file-upload functionality cautiously and do not implement insecure uploads merely for visual completeness.

## Testing Requirement

Do not consider a task complete just because the code compiles.

After meaningful UI changes:
- Run type checking.
- Run linting.
- Run the production build.
- Start the site.
- Inspect it using the browser.
- Test affected routes.
- Test relevant interactions.
- Inspect responsive layouts.
- Check console output.
- Fix issues found.
- Retest.

For full-site reviews, visit every primary route.

## Visual Quality Rule

Before declaring the site finished, review it as if it were being presented to a paying aviation-industry client.

Specifically look for:
- Generic AI-generated layout patterns
- Inconsistent spacing
- Weak hierarchy
- Excessive card usage
- Unnecessary copy
- Repetitive sections
- Poor typography
- Weak CTAs
- Mobile layout issues
- Placeholder content that looks accidentally final
- Unsupported company claims

Fix issues rather than merely reporting them.

## Client Placeholder Rule

Placeholders must be easy for a developer to locate and replace.

Prefer centralised company configuration/data for items such as:
- email
- telephone
- address
- service region
- company registration information
- social links

Avoid duplicating placeholder values throughout multiple files.

## Final Principle

Design and engineering decisions may be made autonomously.
Company facts may not.
When uncertain about a factual company claim, preserve uncertainty instead of guessing.
