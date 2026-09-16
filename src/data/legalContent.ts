import { COMPANY_CONFIG } from "./companyConfig";
/**
 * DRAFTS PREPARED FOR THE CLIENT'S LEGAL ADVISER. Not yet approved.
 * Items the client has not confirmed are marked "[To confirm: ...]" so they are easy to find.
 * Keep these descriptions true to what the site actually does.
 */
export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };
export type LegalDoc = { title: string; intro: string; updated: string; sections: LegalSection[] };
const contact = `${COMPANY_CONFIG.email}${COMPANY_CONFIG.telephoneDisplay ? ` or ${COMPANY_CONFIG.telephoneDisplay}` : ""}`;
export const DRAFT_NOTICE = "Draft for review. This wording has not yet been approved and must be checked by the company’s legal adviser before the website goes live.";
export const PRIVACY_POLICY: LegalDoc = {
  title: "Privacy policy",
  intro: "How Aircraft Damage Assessors Ltd handles personal information provided through this website, by email or by telephone.",
  updated: "16 September 2026",
  sections: [
    { heading: "Who we are", paragraphs: [
      `${COMPANY_CONFIG.name} provides aircraft damage assessment and related aviation technical services in ${COMPANY_CONFIG.serviceRegion}.`,
      `Questions about privacy or personal information should go to Roger Thomson, Director, at ${contact}.`,
      "[To confirm: registered company number, and whether registration with the Office of the Data Protection Commissioner is required.]",
    ] },
    { heading: "Information we collect", paragraphs: ["We collect the information you choose to give us when you make an enquiry:"], list: [
      "Your name and email address",
      "Your telephone number, if you provide it",
      "Aircraft type and registration, if you provide them",
      "Where the aircraft is located, if you provide it",
      "The damaged areas you select and the description of your enquiry",
      "Any photographs or documents you attach to your enquiry",
    ] },
    { heading: "What happens to your enquiry", paragraphs: [
      "Your enquiry, and anything you attach to it, is emailed to us and is not stored on the website. Photographs are reduced in size in your browser before they are sent.",
      "We send you an automatic email confirming that your enquiry has been received. It repeats the details you gave us, so please only attach material you are content to receive by email.",
    ] },
    { heading: "Information collected automatically", paragraphs: [
      "Our website hosting provider keeps standard server records, such as the internet address your request came from, the pages requested and the type of browser used. These are used to deliver the website and keep it secure.",
      "This website does not use cookies, analytics or advertising tracking. See our cookie policy.",
    ] },
    { heading: "Why we use your information", paragraphs: [
      "We use the information you send us to respond to your enquiry, to discuss the aircraft and the service you are asking about, and to carry out any work you subsequently instruct.",
      "We rely on your consent when you contact us, on our legitimate interest in responding to enquiries about our services, and, where you instruct us, on the need to perform that agreement.",
      "We do not use your information for marketing and we do not sell it.",
    ] },
    { heading: "Who we share it with", paragraphs: ["We share personal information only where it is needed:"], list: [
      "With a third-party Approved Maintenance Organisation, where you ask us to arrange repair capability",
      "With our email and website hosting providers, who process information on our instructions",
      "Where we are required to do so by law, or to establish or defend legal claims",
    ] },
    { heading: "Where your information is held", paragraphs: [
      "Our email and website hosting providers may store information on servers outside Kenya. Where that happens, we take reasonable steps to ensure it remains protected.",
      "The website is hosted by Vercel and enquiry emails are delivered through Resend. Enquiries are then held in the company's email account.",
      "[To confirm once launched: whether these remain the providers used.]",
    ] },
    { heading: "How long we keep it", paragraphs: [
      "We keep enquiries for as long as needed to deal with the enquiry and any work that follows, and afterwards only where we must for legal, tax or record-keeping reasons.",
      "[To confirm: the retention period the company wishes to apply.]",
    ] },
    { heading: "Your rights", paragraphs: ["Under the Data Protection Act 2019 (Kenya) you may ask us to:"], list: [
      "Give you a copy of the personal information we hold about you",
      "Correct information that is inaccurate or incomplete",
      "Delete information we no longer need to hold",
      "Stop or limit how we use your information, or object to our use of it",
      "Withdraw consent you have given, at any time",
    ] },
    { heading: "Contact and complaints", paragraphs: [
      `To exercise any of these rights, contact Roger Thomson, Director, at ${contact}.`,
      "If you are not satisfied with our response, you may complain to the Office of the Data Protection Commissioner in Kenya.",
    ] },
    { heading: "Security", paragraphs: [
      "We take reasonable measures to protect the information you send us. No method of transmission over the internet is completely secure, so please do not send sensitive information by email unless it is necessary.",
    ] },
    { heading: "Changes to this policy", paragraphs: [
      "If we change how we handle personal information, we will update this page and the date shown below.",
    ] },
  ],
};
export const TERMS: LegalDoc = {
  title: "Terms of use",
  intro: "The terms on which you may use the Aircraft Damage Assessors Ltd website.",
  updated: "16 September 2026",
  sections: [
    { heading: "About these terms", paragraphs: [
      `This website is operated by ${COMPANY_CONFIG.name}. By using the site you accept these terms. If you do not accept them, please do not use the site.`,
    ] },
    { heading: "Information on this website", paragraphs: [
      "The information on this website describes the services the company offers. It is general information only, is not technical, legal or insurance advice, and should not be relied on in place of advice on your particular aircraft or claim.",
      "No assessment, inspection, recovery or other work is carried out unless separately agreed with you in writing.",
    ] },
    { heading: "Enquiries", paragraphs: [
      "Sending an enquiry through this website does not create a contract between you and the company, and does not oblige the company to accept the work.",
      "Any work the company accepts is governed by the separate terms agreed for that engagement, which take precedence over these website terms.",
    ] },
    { heading: "The aircraft illustration", paragraphs: [
      "The interactive aircraft shown on this website is an illustration used to help you indicate where an aircraft is damaged. It does not represent any particular aircraft type and nothing should be inferred from it about a specific aircraft.",
    ] },
    { heading: "Our intellectual property", paragraphs: [
      "The content, design and images on this website belong to the company or its licensors and may not be copied or reused without permission, beyond normal personal use of the site.",
    ] },
    { heading: "Availability", paragraphs: [
      "We aim to keep the site available but cannot guarantee uninterrupted access, and we may change or withdraw any part of it.",
    ] },
    { heading: "Liability", paragraphs: [
      "To the fullest extent permitted by law, the company is not liable for any loss arising from use of, or reliance on, this website or its content.",
      "Nothing in these terms limits liability where it cannot lawfully be limited.",
      "[To confirm with the company’s legal adviser: liability wording appropriate to the company’s insurance and jurisdiction.]",
    ] },
    { heading: "Links to other websites", paragraphs: [
      "Where this website links to other organisations, we are not responsible for their content or for how they handle your information.",
    ] },
    { heading: "Governing law", paragraphs: [
      "These terms are governed by the laws of Kenya, and the courts of Kenya have jurisdiction over any dispute.",
      "[To confirm: the governing law and jurisdiction the company wishes to apply.]",
    ] },
    { heading: "Contact", paragraphs: [`Questions about these terms can be sent to ${contact}.`] },
  ],
};
export const COOKIE_POLICY: LegalDoc = {
  title: "Cookie policy",
  intro: "How this website uses cookies and similar technologies.",
  updated: "16 September 2026",
  sections: [
    { heading: "This website does not use cookies", paragraphs: [
      "This website does not place cookies on your device, and does not use analytics, advertising or tracking technologies of any kind. There is nothing for you to accept or refuse.",
    ] },
    { heading: "What the site does store", paragraphs: [
      "Nothing is stored in your browser between visits. Choices you make on the site, such as the damaged areas you select, are held only while the page is open and are cleared when you leave or reload it.",
      "Fonts and images used by the site are served from the website itself, not from third-party services.",
    ] },
    { heading: "Server records", paragraphs: [
      "Our website hosting provider keeps standard server records of requests to the site, which are used to deliver the site and keep it secure. These are described in our privacy policy.",
    ] },
    { heading: "If this changes", paragraphs: [
      "If cookies or analytics are added to the site in future, this page will be updated first and, where the law requires it, your consent will be requested before anything is stored on your device.",
    ] },
    { heading: "Contact", paragraphs: [`Questions about this policy can be sent to ${contact}.`] },
  ],
};
