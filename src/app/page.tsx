import Link from "next/link";
import { AircraftExplorer } from "@/components/aircraft/AircraftExplorer";
import { HeroSky } from "@/components/home/HeroSky";
import { EnquiryCTA, TextLink, pageMetadata } from "@/components/ui/Editorial";
import { COMPANY_CONFIG, HERO_FACTS } from "@/data/companyConfig";
import { ASSESSMENT_SCOPE } from "@/data/deliverablesData";
import { SERVICES_DATA } from "@/data/servicesData";
export const metadata = pageMetadata("Aircraft damage assessment", "Aircraft damage assessment, detailed damage reports, parts estimates and repairability assessment for insurers, brokers, aircraft owners and operators in East Africa.");
export default function HomePage() {
  return <>
    <section className="home-hero"><HeroSky /><div className="site-width hero-grid">
      <div className="hero-copy"><p className="eyebrow">Aircraft Damage Assessors Ltd</p><h1>Aircraft damage.<br /><em>A clearer picture.</em></h1><p className="hero-description">Aircraft damage assessment and detailed reporting for insurers, brokers, aircraft owners and operators across {COMPANY_CONFIG.serviceRegion}.</p><Link href="/contact" className="button button-light">Request an assessment <span aria-hidden="true">↗</span></Link><TextLink href="/damage-assessment">Explore the assessment scope</TextLink>
        <dl className="hero-facts">{HERO_FACTS.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.detail}</dd></div>)}</dl></div>
      <AircraftExplorer />
    </div><div className="site-width hero-baseline"><span>Aircraft damage assessment & aviation technical services · {COMPANY_CONFIG.serviceRegion}</span><span>Explore below <span aria-hidden="true">↓</span></span></div></section>
    <section className="site-width section-space assessment-intro"><div><p className="eyebrow">Damage assessment</p><h2>From damage<br />to detail.</h2><TextLink href="/damage-assessment">What the assessment includes</TextLink></div><div><p className="section-lead">Understand the damage, the parts required and whether the aircraft is believed to be repairable.</p><div className="scope-preview">{ASSESSMENT_SCOPE.slice(0, 4).map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div></section>
    <section className="services-section section-space"><div className="site-width"><div className="section-top"><div><p className="eyebrow">Related services</p><h2>Beyond the assessment.</h2></div><TextLink href="/services">All services</TextLink></div><div className="service-index">{SERVICES_DATA.slice(1).map((service, index) => <Link key={service.id} href={`/services#${service.id}`}><span className="row-number">0{index + 1}</span><h3>{service.title}</h3><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></div></section>
    <EnquiryCTA />
  </>;
}
