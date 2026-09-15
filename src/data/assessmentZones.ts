export type AssessmentZone = { id: string; label: string; shortLabel: string; position: [number, number, number] };
// Visitor-selected damage locations on the illustrative model. These are enquiry inputs only:
// they do not describe area-specific procedures, capabilities or aircraft-type expertise.
export const ASSESSMENT_ZONES: AssessmentZone[] = [
  { id: "nose", label: "Nose & propeller", shortLabel: "Nose", position: [-.3, .3, -2.15] },
  { id: "cabin", label: "Cabin & fuselage", shortLabel: "Cabin", position: [-.5, .35, -.45] },
  { id: "wing", label: "Wings", shortLabel: "Wings", position: [2.65, 1.03, -.3] },
  { id: "gear", label: "Landing gear", shortLabel: "Gear", position: [-1.1, -1.0, .12] },
  { id: "tail", label: "Tail", shortLabel: "Tail", position: [0, 1.15, 2.85] },
];
