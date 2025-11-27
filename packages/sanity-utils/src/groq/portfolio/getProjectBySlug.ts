import { defineQuery } from "groq";

export const getProjectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
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

export async function getProjectBySlug(slug: string) {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getProjectBySlugQuery, params: { slug } });
  return result.data;
}

