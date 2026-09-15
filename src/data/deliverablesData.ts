import { DeliverableItem, ProcessStage } from "@/types";

export const CONFIRMED_DELIVERABLES: DeliverableItem[] = [
  {
    id: "damage-assessment",
    title: "Comprehensive Damage Assessment",
    referenceTag: "DELIV-01",
    summary: "Comprehensive technical assessment of aircraft damage resulting from an incident or accident.",
    detail: "Assessment and documentation of aircraft damage to determine the extent of damage, affected components, and overall condition.",
    includedElements: [
      "Aircraft damage inspection",
      "Identification of affected components",
      "Assessment of damage extent",
      "Objective technical findings",
    ],
  },
  {
    id: "repairability-evaluation",
    title: "Assessment of Repairability",
    referenceTag: "DELIV-02",
    summary: "Objective evaluation of whether the aircraft is considered repairable following an incident.",
    detail: "Technical assessment to determine if the aircraft can be repaired, supporting decisions by insurers, brokers, and owners.",
    includedElements: [
      "Assessment of repairability",
      "Technical repair feasibility",
      "Evaluation of repair feasibility",
    ],
  },
  {
    id: "parts-requirements",
    title: "Parts Identification & Cost Estimates",
    referenceTag: "DELIV-03",
    summary: "Identification of parts required for rectification alongside estimated parts costs.",
    detail: "Clear schedule identifying the replacement parts and components required to return the aircraft to service.",
    includedElements: [
      "Identification of parts required",
      "Estimated cost of parts",
      "Component requirements schedule",
    ],
  },
  {
    id: "labour-estimate",
    title: "Estimated Labour Cost",
    referenceTag: "DELIV-04",
    summary: "Estimated labour cost where the aircraft is considered repairable.",
    detail: "Projection of labour costs and required repair hours where an aircraft is believed to be repairable.",
    includedElements: [
      "Estimated labour costs where repairable",
      "Repair man-hour projections",
      "Repair labour scope",
    ],
  },
  {
    id: "recovery-requirements",
    title: "Estimated Aircraft Recovery Cost",
    referenceTag: "DELIV-05",
    summary: "Estimated cost of aircraft recovery and arrangement of recovery logistics.",
    detail: "Assessment of recovery requirements and projected expenditure to reposition the aircraft following an incident.",
    includedElements: [
      "Estimated aircraft recovery cost",
      "Recovery logistics arrangement",
      "Assessment of aircraft recovery requirements",
    ],
  },
  {
    id: "technical-findings",
    title: "Investigation into Potential Cause",
    referenceTag: "DELIV-06",
    summary: "Investigation aimed at determining the potential cause of an incident or accident within technical assessment scope.",
    detail: "Technical examination of observable damage and conditions to assist clients in identifying potential causal factors.",
    includedElements: [
      "Investigation into potential cause",
      "Produced within technical assessment scope",
      "Objective technical observations",
    ],
  },
  {
    id: "comprehensive-report",
    title: "Detailed Technical Damage Report",
    referenceTag: "DELIV-07",
    summary: "A detailed damage report consolidating assessment findings, cost estimates, and recommendations.",
    detail: "The comprehensive technical deliverable prepared for insurance companies, insurance brokers, aircraft owners, and operators.",
    includedElements: [
      "Comprehensive damage findings",
      "Identification of parts and estimated costs",
      "Estimated labour and recovery costs",
      "Repairability conclusions",
    ],
  },
];

export const CONFIRMED_PROCESS_STAGES: ProcessStage[] = [
  {
    stepNumber: "01",
    title: "Initial Enquiry / Incident Information",
    summary: "Receipt of incident notification, aircraft identification, and preliminary damage overview.",
    details: [
      "Review of incident information and aircraft details",
      "Confirmation of inspection location and scope",
    ],
  },
  {
    stepNumber: "02",
    title: "Aircraft Damage Assessment",
    summary: "Comprehensive technical assessment of aircraft damage and identification of affected components.",
    details: [
      "Detailed damage inspection",
      "Identification of affected parts and assemblies",
    ],
  },
  {
    stepNumber: "03",
    title: "Repair, Parts & Recovery Evaluation",
    summary: "Evaluation of repairability, identification of parts required, labour cost estimation, and recovery cost assessment.",
    details: [
      "Assessment of repairability",
      "Identification of parts required and estimated costs",
      "Estimated labour cost where repairable",
      "Estimated aircraft recovery cost",
    ],
  },
  {
    stepNumber: "04",
    title: "Comprehensive Technical Report",
    summary: "Delivery of a detailed damage report incorporating all findings, cost estimates, and potential cause findings within technical scope.",
    details: [
      "Consolidation of damage findings and estimates",
      "Investigation into potential cause within technical scope",
      "Delivery of detailed technical report",
    ],
  },
  {
    stepNumber: "05",
    title: "Repair / Recovery Coordination (Where Required)",
    summary: "Arrangement of recovery and coordination of third-party Approved Maintenance Organisations (AMOs) where current AMO lacks capability.",
    details: [
      "Arrangement of third-party AMO where current facility lacks capability",
      "Coordination of aircraft recovery logistics",
    ],
  },
];
