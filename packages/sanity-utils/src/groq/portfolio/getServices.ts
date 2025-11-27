import { defineQuery } from "groq";

export const getServicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    description,
    icon,
    features,
    technologies,
    pricing,
    deliveryTime,
    featured,
    order
  }
`);

export async function getServices() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getServicesQuery });
  return result.data;
}

