import { defineQuery } from "groq";

export const getProjectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    tagline,
    coverImage,
    gallery,
    description,
    features,
    technologies,
    demoUrl,
    githubUrl,
    category,
    status,
    startDate,
    endDate,
    featured,
    order
  }
`);

export async function getProjects() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getProjectsQuery });
  return result.data;
}

