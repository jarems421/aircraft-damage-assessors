import { AircraftExplorer } from "@/components/aircraft/AircraftExplorer";
import { PageIntro, pageMetadata } from "@/components/ui/Editorial";
import { ASSESSMENT_SCOPE } from "@/data/deliverablesData";
export const metadata = pageMetadata("Damage assessment", "Aircraft damage reporting, parts requirements, estimated costs, repairability, potential cause and third-party AMO arrangement.");
export default function DamageAssessmentPage() {
  return <><PageIntro label="Aircraft damage assessment" title="The detail behind the damage."><p>Comprehensive aircraft damage assessment, a detailed damage report and an assessment of repairability.</p></PageIntro>
    <section className="site-width section-space scope-section"><div className="section-top"><h2>What the assessment includes.</h2><p>For aircraft insurers, brokers,<br />owners and operators.</p></div><div className="scope-table">{ASSESSMENT_SCOPE.map((item, index) => <div key={item.title}><span className="row-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div><p className="scope-note">Investigation into potential cause forms part of the company’s technical assessment scope. It does not represent a statutory accident investigation.</p></section>
    <section className="damage-locator section-space"><div className="site-width"><AircraftExplorer variant="full" /></div></section></>;
}
