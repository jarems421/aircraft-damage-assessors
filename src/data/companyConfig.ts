/**
 * Centralised Company Configuration
 * Clean client-facing defaults without developer bracket placeholders.
 */

export interface CompanyConfig {
  name: string;
  shortName: string;
  tagline: string;
  descriptor: string;
  email: string;
  phone: string;
  officeLocation: string;
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: "Aircraft Damage Assessors Ltd",
  shortName: "Aircraft Damage Assessors",
  tagline: "When Aircraft Are Damaged, Decisions Need Evidence.",
  descriptor: "Aircraft Damage Assessors Ltd provides specialist aircraft damage assessment and associated technical aviation services.",
  
  email: "enquiries@aircraftdamageassessors.com",
  phone: "Technical Enquiries Via Portal",
  officeLocation: "Location Available Upon Request",
};

export const CONFIRMED_AUDIENCES = [
  {
    title: "Aircraft Insurance Companies",
    description: "Technical damage assessments, parts and labour estimates, and repairability evaluations following aviation incidents.",
    iconName: "ShieldCheck",
  },
  {
    title: "Insurance Brokers",
    description: "Detailed, evidence-based technical damage reports to support policyholders and facilitate clear claims communication.",
    iconName: "FileCheck2",
  },
  {
    title: "Aircraft Owners",
    description: "Clear technical evaluation of aircraft damage, repairability assessment, and potential cause findings within technical scope.",
    iconName: "Plane",
  },
  {
    title: "Aircraft Operators",
    description: "Assessment of damaged aircraft, recovery cost estimation, and coordination with capable third-party repair facilities where required.",
    iconName: "Building2",
  },
];
