import { defineQuery } from "groq";

export const getCertificationsQuery = defineQuery(`
  *[_type == "certification"] | order(issueDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    logo,
    description,
    skills
  }
`);

export async function getCertifications() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getCertificationsQuery });
  return result.data;
}

