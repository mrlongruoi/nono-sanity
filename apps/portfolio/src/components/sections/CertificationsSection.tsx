import { getCertifications } from "@workspace/sanity-utils/groq/portfolio";
import { CertificationsClient } from "./CertificationsClient";

export async function CertificationsSection() {
  const certifications = await getCertifications();

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return <CertificationsClient certifications={certifications} />;
}
