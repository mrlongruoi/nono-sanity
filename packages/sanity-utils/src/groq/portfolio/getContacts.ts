import { defineQuery } from "groq";

export const getContactsQuery = defineQuery(`
  *[_type == "contact"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    email,
    subject,
    message,
    phone,
    company,
    status,
    notes
  }
`);

export async function getContacts() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getContactsQuery });
  return result.data;
}

