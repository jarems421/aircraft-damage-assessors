import { ASSESSMENT_ZONES } from "@/data/assessmentZones";

/**
 * The enquiry form for each service. Name, email, the service choice and the description are common
 * to every form; everything listed in `fields` is specific to that service. These are questions for
 * the visitor only: they do not describe procedures, report formats or capabilities.
 */
export type EnquiryOption = { value: string; label: string };
export type EnquiryField =
  | { kind: "text"; name: string; label: string; maxLength: number; required?: boolean; type?: "text" | "date"; inputMode?: "numeric"; placeholder?: string; wide?: boolean }
  | { kind: "select"; name: string; label: string; options: EnquiryOption[]; wide?: boolean }
  | { kind: "checks"; name: string; label: string; options: EnquiryOption[] };
export type EnquiryForm = {
  service: string;
  intro: string;
  readyItems: string[];
  fields: EnquiryField[];
  description: { label: string; placeholder: string };
  attachments: { label: string; action: string };
};

const options = (...labels: string[]): EnquiryOption[] => labels.map(label => ({ value: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label }));
const yesNo = options("Yes", "No", "Not sure");
const aircraftType: EnquiryField = { kind: "text", name: "aircraftType", label: "Aircraft type", maxLength: 120, placeholder: "e.g. Cessna 172" };
const registration: EnquiryField = { kind: "text", name: "aircraftRegistration", label: "Registration", maxLength: 40 };
const location = (label: string, required = false): EnquiryField => ({ kind: "text", name: "aircraftLocation", label, maxLength: 200, required, wide: true });
const role = (...labels: string[]): EnquiryField => ({ kind: "select", name: "enquirerRole", label: "You are enquiring as", options: options(...labels), wide: true });
const areas = (label: string): EnquiryField => ({ kind: "checks", name: "damageArea", label, options: ASSESSMENT_ZONES.map(zone => ({ value: zone.id, label: zone.label })) });

export const ENQUIRY_FORMS: EnquiryForm[] = [
  {
    service: "damage-assessment",
    intro: "Tell us what happened and where the aircraft is.",
    readyItems: ["Aircraft type and registration", "Where the aircraft is located", "When the incident happened", "Which areas are damaged", "Photos of the damage"],
    fields: [
      role("Aircraft owner", "Aircraft operator", "Insurer", "Insurance broker", "Other"),
      aircraftType, registration,
      location("Aircraft location"),
      { kind: "text", name: "incidentDate", label: "Date of the incident", type: "date", maxLength: 10 },
      { kind: "select", name: "incidentType", label: "What happened", options: options("Landing incident", "Ground incident", "In-flight incident", "Weather", "Other or not sure") },
      { kind: "text", name: "insurer", label: "Insurer", maxLength: 120, wide: true },
      areas("Areas of aircraft damage"),
    ],
    description: { label: "Describe what happened", placeholder: "What happened, and the damage you can see." },
    attachments: { label: "Photos of the damage", action: "Choose photos" },
  },
  {
    service: "pre-purchase-inspections",
    intro: "Tell us about the aircraft you are looking to buy or sell.",
    readyItems: ["Aircraft type and registration", "Year of manufacture", "Total airframe hours", "Where the aircraft is located", "When you need the inspection"],
    fields: [
      role("Prospective buyer", "Seller", "Broker or agent", "Other"),
      aircraftType, registration,
      { kind: "text", name: "yearOfManufacture", label: "Year of manufacture", maxLength: 4, inputMode: "numeric" },
      { kind: "text", name: "airframeHours", label: "Total airframe hours", maxLength: 20, inputMode: "numeric" },
      location("Where the aircraft is located"),
      { kind: "text", name: "preferredTiming", label: "When you need the inspection", maxLength: 120, wide: true, placeholder: "e.g. before the end of the month" },
    ],
    description: { label: "Tell us about the aircraft and the purchase", placeholder: "Anything you would like us to know about the aircraft or the sale." },
    attachments: { label: "Aircraft listing or documents", action: "Choose files" },
  },
  {
    service: "aircraft-recovery",
    intro: "Tell us where the aircraft is and the conditions at the site.",
    readyItems: ["Where the aircraft is now", "Aircraft type and registration", "Whether it can move on its own wheels", "Which areas are damaged", "Photos of the aircraft and the site"],
    fields: [
      role("Aircraft owner", "Aircraft operator", "Insurer", "Insurance broker", "Other"),
      location("Where the aircraft is now", true),
      aircraftType, registration,
      { kind: "select", name: "siteType", label: "The aircraft is", options: options("At an airfield", "Away from an airfield", "Not sure") },
      { kind: "select", name: "canMoveOnWheels", label: "Can it move on its own wheels?", options: yesNo },
      areas("Areas of aircraft damage"),
    ],
    description: { label: "Describe the situation", placeholder: "How the aircraft came to be there, access to the site and anything else we should know." },
    attachments: { label: "Photos of the aircraft and the site", action: "Choose photos" },
  },
  {
    service: "repair-coordination",
    intro: "Tell us about the repair and who maintains the aircraft now.",
    readyItems: ["Aircraft type and registration", "Your current maintenance organisation", "Any damage assessment or report", "Which areas need repair", "Photos, reports or quotes"],
    fields: [
      role("Aircraft owner", "Aircraft operator", "Insurer", "Insurance broker", "Maintenance organisation", "Other"),
      aircraftType, registration,
      location("Aircraft location"),
      { kind: "text", name: "currentAmo", label: "Current maintenance organisation (AMO)", maxLength: 160 },
      { kind: "select", name: "alreadyAssessed", label: "Has the damage been assessed?", options: yesNo },
      areas("Areas needing repair"),
    ],
    description: { label: "Describe the repair needed", placeholder: "The damage or work needed, and why the current AMO cannot carry it out if known." },
    attachments: { label: "Photos, reports or quotes", action: "Choose files" },
  },
  {
    service: "modification-approvals",
    intro: "Tell us about the aircraft and the modification you have in mind.",
    readyItems: ["Aircraft type and registration", "What the modification involves", "Details of the equipment or parts", "Drawings, data sheets or documents"],
    fields: [
      role("Aircraft owner", "Aircraft operator", "Maintenance organisation", "Other"),
      aircraftType, registration,
      { kind: "checks", name: "modificationArea", label: "What the modification involves", options: options("Airframe", "Engine", "Avionics", "Instruments", "Associated equipment") },
      { kind: "text", name: "equipment", label: "Equipment or parts", maxLength: 200, wide: true, placeholder: "e.g. make and model" },
      location("Where the aircraft is based"),
    ],
    description: { label: "Describe the proposed modification", placeholder: "What you would like to change, and why." },
    attachments: { label: "Drawings, data sheets or documents", action: "Choose files" },
  },
];

export const enquiryForm = (service: string) => ENQUIRY_FORMS.find(form => form.service === service);
