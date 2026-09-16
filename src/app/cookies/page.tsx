import { LegalDocument, pageMetadata } from "@/components/ui/Editorial";
import { COOKIE_POLICY } from "@/data/legalContent";
export const metadata = pageMetadata("Cookie policy", "This website does not use cookies, analytics or tracking technologies.");
export default function Page() { return <LegalDocument document={COOKIE_POLICY} />; }
