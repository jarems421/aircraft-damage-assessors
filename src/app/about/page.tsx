import Link from "next/link";
import { EnquiryCTA, PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { AIRCRAFT_SCOPE, COMPANY_CONFIG, COMPANY_PEOPLE, CONFIRMED_AUDIENCES, DIRECTOR_LICENCES } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
export const metadata = pageMetadata("About", "Aircraft Damage Assessors Ltd is a technical services company providing aircraft damage assessment and related aviation technical services in East Africa.");
// Every fact below was confirmed by the client on 16 September 2026.
const FACTS = [
  { term: "Founded", detail: String(COMPANY_CONFIG.founded) },
  { term: "Director", detail: COMPANY_PEOPLE.map(person => `${person.name}, ${person.role}`).join(", ") },
  { term: "Licences", detail: `Aircraft engineer’s licences issued in the ${DIRECTOR_LICENCES.slice(0, -1).join(", the ")} and ${DIRECTOR_LICENCES.at(-1)}, held by the director.` },
  { term: "Where we work", detail: `${COMPANY_CONFIG.serviceRegion}. We travel to the aircraft’s location.` },
  { term: "Aircraft", detail: `${AIRCRAFT_SCOPE.categories}, including ${AIRCRAFT_SCOPE.manufacturers.slice(0, -1).join(", ")} and ${AIRCRAFT_SCOPE.manufacturers.at(-1)}.` },
];
export default function AboutPage() {
  return <><PageIntro label="About the company" title="Aircraft. Assessment. Detail."><p>Aircraft Damage Assessors Ltd provides aircraft damage assessment and related aviation technical services across {COMPANY_CONFIG.serviceRegion}.</p></PageIntro>
    <section className="site-width section-space editorial-split"><div><p className="eyebrow">What the company does</p><h2>Damage assessment<br />and related services.</h2></div><ul className="link-list">{SERVICES_DATA.map(service => <li key={service.id}><Link href={service.id === "damage-assessment" ? "/damage-assessment" : `/services#${service.id}`}>{service.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></section>
    <section className="services-section section-space"><div className="site-width editorial-split"><div><p className="eyebrow">The company</p><h2>Who you are<br />dealing with.</h2></div><dl className="fact-list">{FACTS.map(fact => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.detail}</dd></div>)}</dl></div></section>
    <section className="site-width section-space editorial-split"><div><p className="eyebrow">Who the services are for</p><h2>Across aviation<br />and insurance.</h2></div><ul className="audience-list">{CONFIRMED_AUDIENCES.map(audience => <li key={audience}>{audience}</li>)}</ul></section>
    <section className="services-section section-space"><div className="site-width editorial-split"><div><p className="eyebrow">Technical scope</p><h2>A technical<br />services company.</h2></div><div className="prose">
      <p>Investigation into the potential cause of an incident or accident is carried out within the company’s technical assessment scope.</p>
      <p>The company is not a government accident investigation authority, regulator or statutory investigator.</p>
    </div></div></section>
    <EnquiryCTA /></>;
}
