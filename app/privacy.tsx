import { LegalPage } from "../components/legal-page";
import { PRIVACY } from "../data/legal";

export default function PrivacyScreen() {
  return <LegalPage title="Privacy Policy" sections={PRIVACY} />;
}
