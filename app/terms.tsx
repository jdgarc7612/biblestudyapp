import { LegalPage } from "../components/legal-page";
import { TERMS } from "../data/legal";

export default function TermsScreen() {
  return <LegalPage title="Terms of Use" sections={TERMS} />;
}
