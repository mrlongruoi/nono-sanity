import { defineQuery } from "groq";

export const getTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    position,
    company,
    companyLogo,
    avatar,
    testimonial,
    rating,
    featured,
    order,
    relationshipType
  }
`);

export async function getTestimonials() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getTestimonialsQuery });
  return result.data;
}

