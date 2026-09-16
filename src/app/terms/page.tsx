import { LegalDocument, pageMetadata } from "@/components/ui/Editorial";
import { TERMS } from "@/data/legalContent";
export const metadata = pageMetadata("Terms of use", "The terms on which you may use the Aircraft Damage Assessors Ltd website.");
export default function Page() { return <LegalDocument document={TERMS} />; }
