import { LegalDocument, pageMetadata } from "@/components/ui/Editorial";
import { PRIVACY_POLICY } from "@/data/legalContent";
export const metadata = pageMetadata("Privacy policy", "How Aircraft Damage Assessors Ltd handles personal information provided through this website, by email or by telephone.");
export default function Page() { return <LegalDocument document={PRIVACY_POLICY} />; }
