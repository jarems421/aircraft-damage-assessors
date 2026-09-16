/**
 * Confirmed company information only. Anything the client has not supplied stays null and
 * is not rendered. Client confirmations received 16 September 2026.
 */
type CompanyConfig = {
  name: string; shortName: string; descriptor: string;
  email: string | null; telephone: string | null; telephoneDisplay: string | null;
  /** Public postal address. Client: none to publish at this stage. */
  address: string | null;
  /** Registered office, held for legal drafts. Not published until the client asks. */
  registeredOffice: string | null;
  serviceRegion: string | null; registration: string | null;
  founded: number | null; reportTurnaround: string | null;
};
export const COMPANY_CONFIG: CompanyConfig = {
  name: "Aircraft Damage Assessors Ltd",
  shortName: "Aircraft Damage Assessors",
  descriptor: "Aircraft damage assessment and related aviation technical services.",
  email: "avionicsplus@gmail.com",
  telephone: "+254713971662",
  telephoneDisplay: "+254 713 971 662",
  address: null,
  registeredOffice: "Naivasha Airspray, Moi South Lake Road, Kenya",
  serviceRegion: "East Africa",
  registration: null,
  founded: 2026,
  reportTurnaround: "five working days",
};
/** Confirmed people. Biographies are still to be supplied. */
export const COMPANY_PEOPLE = [{ name: "Roger Thomson", role: "Director" }];
/** Confirmed licences, held by the company's director. */
export const DIRECTOR_LICENCES = ["United Kingdom", "United States", "Middle East", "Kenya"];
/** Confirmed aircraft scope. */
export const AIRCRAFT_SCOPE = {
  categories: "Light general aviation aircraft",
  manufacturers: ["Cessna", "Piper", "Diamond", "Beechcraft"],
};
/**
 * Production origin, e.g. "https://www.example.co.ke", set via NEXT_PUBLIC_SITE_URL when the domain is confirmed.
 * Search indexing, the robots allow rule and absolute sitemap/share URLs switch on only when it is set,
 * so preview and review deployments stay out of search results.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
export const SEARCH_INDEXING_ENABLED = SITE_URL !== null;
export const CONFIRMED_AUDIENCES = ["Aircraft insurers", "Insurance brokers", "Aircraft owners", "Aircraft operators", "Aviation organisations"];
