import Link from "next/link";
import { EnquiryCTA, PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { CONFIRMED_AUDIENCES } from "@/data/companyConfig";
import { SERVICES_DATA } from "@/data/servicesData";
export const metadata = pageMetadata("About", "About Aircraft Damage Assessors Ltd, a technical services company providing aircraft damage assessment and related aviation technical services.");
export default function AboutPage() {
  return <><PageIntro label="About the company" title="Aircraft. Assessment. Detail."><p>Aircraft Damage Assessors Ltd provides aircraft damage assessment and related aviation technical services.</p></PageIntro>
    <section className="site-width section-space editorial-split"><div><p className="eyebrow">What the company does</p><h2>Damage assessment<br />and related services.</h2></div><ul className="link-list">{SERVICES_DATA.map(service => <li key={service.id}><Link href={service.id === "damage-assessment" ? "/damage-assessment" : `/services#${service.id}`}>{service.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></section>
    <section className="services-section section-space"><div className="site-width editorial-split"><div><p className="eyebrow">Who the services are for</p><h2>Across aviation<br />and insurance.</h2></div><ul className="audience-list">{CONFIRMED_AUDIENCES.map(audience => <li key={audience}>{audience}</li>)}</ul></div></section>
    <section className="site-width section-space editorial-split"><div><p className="eyebrow">Technical scope</p><h2>A technical<br />services company.</h2></div><div className="prose">
      <p>Investigation into the potential cause of an incident or accident is carried out within the company’s technical assessment scope.</p>
      <p>The company is not a government accident investigation authority, regulator or statutory investigator.</p>
      {/* CLIENT PLACEHOLDER: replace with confirmed company background, people, qualifications and memberships. */}
      <p className="pending-note">Awaiting client information: company background, people, qualifications and professional memberships.</p>
    </div></section>
    <EnquiryCTA /></>;
}
