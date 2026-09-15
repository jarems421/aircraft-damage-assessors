/** Confirmed identity. Unknown contact details remain unpublished. */
type CompanyConfig = {
  name: string; shortName: string; descriptor: string;
  email: string | null; telephone: string | null; address: string | null;
  serviceRegion: string | null; registration: string | null;
};
export const COMPANY_CONFIG: CompanyConfig = {
  name: "Aircraft Damage Assessors Ltd",
  shortName: "Aircraft Damage Assessors",
  descriptor: "Aircraft damage assessment and related aviation technical services.",
  email: null,
  telephone: null,
  address: null,
  serviceRegion: null,
  registration: null,
};
/**
 * Production origin, e.g. "https://www.example.co.uk", set via NEXT_PUBLIC_SITE_URL when the domain is confirmed.
 * Search indexing, the robots allow rule and absolute sitemap/share URLs switch on only when it is set,
 * so preview and review deployments stay out of search results.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
export const SEARCH_INDEXING_ENABLED = SITE_URL !== null;
export const CONFIRMED_AUDIENCES = ["Aircraft insurers", "Insurance brokers", "Aircraft owners", "Aircraft operators", "Aviation organisations"];
