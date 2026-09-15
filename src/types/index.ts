export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  scopePoints: string[];
  isFlagship?: boolean;
  targetAudiences: string[];
  deliverableSummary: string;
}

export interface DeliverableItem {
  id: string;
  title: string;
  referenceTag: string;
  summary: string;
  detail: string;
  includedElements: string[];
}

export interface ProcessStage {
  stepNumber: string;
  title: string;
  summary: string;
  details: string[];
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  telephone: string;
  serviceRequired: string;
  aircraftType: string;
  aircraftRegistration: string;
  aircraftLocation: string;
  incidentDate: string;
  incidentDescription: string;
  insurerOrBroker: string;
  claimReference?: string; // Optional UX convenience
  additionalInformation?: string;
}
