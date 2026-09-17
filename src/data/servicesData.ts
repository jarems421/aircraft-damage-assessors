/** `enquiryHeading` is the contact page heading when a visitor arrives from that service. */
export type Service = { id: string; title: string; description: string; enquiryHeading: string };
/** Only the five services explicitly confirmed by the client. */
export const SERVICES_DATA: Service[] = [
  { id: "damage-assessment", title: "Aircraft damage assessment", description: "Comprehensive aircraft damage assessment, a detailed damage report and an assessment of repairability.", enquiryHeading: "Request an assessment." },
  { id: "pre-purchase-inspections", title: "Pre-purchase inspections", description: "Aircraft inspections before purchase. Discuss the aircraft and your enquiry with us.", enquiryHeading: "Enquire about a pre-purchase inspection." },
  { id: "aircraft-recovery", title: "Aircraft recovery", description: "Aircraft recovery services. Estimated recovery cost is also included within the damage assessment scope.", enquiryHeading: "Enquire about aircraft recovery." },
  { id: "repair-coordination", title: "Repair coordination", description: "Aircraft repair coordination through third parties. A suitable third-party Approved Maintenance Organisation (AMO) can be arranged where the current AMO lacks the required repair capability.", enquiryHeading: "Enquire about repair coordination." },
  { id: "modification-approvals", title: "Modification applications & approvals", description: "Aircraft modification applications and approvals involving airframes, engines, avionics, instruments and associated equipment.", enquiryHeading: "Enquire about a modification approval." },
];
