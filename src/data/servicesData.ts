export type Service = { id: string; title: string; description: string };
/** Only the five services explicitly confirmed by the client. */
export const SERVICES_DATA: Service[] = [
  { id: "damage-assessment", title: "Aircraft damage assessment", description: "Comprehensive aircraft damage assessment, a detailed damage report and an assessment of repairability." },
  { id: "pre-purchase-inspections", title: "Pre-purchase inspections", description: "Aircraft inspections before purchase. Discuss the aircraft and your enquiry with us." },
  { id: "aircraft-recovery", title: "Aircraft recovery", description: "Aircraft recovery services. Estimated recovery cost is also included within the damage assessment scope." },
  { id: "repair-coordination", title: "Repair coordination", description: "Aircraft repair coordination through third parties. A suitable third-party Approved Maintenance Organisation (AMO) can be arranged where the current AMO lacks the required repair capability." },
  { id: "modification-approvals", title: "Modification applications & approvals", description: "Aircraft modification applications and approvals involving airframes, engines, avionics, instruments and associated equipment." },
];
