import { defineQuery } from "groq";

export const getBlogPostsQuery = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    tags,
    author,
    publishedAt,
    readingTime,
    featured
  }
`);

export async function getBlogPosts() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getBlogPostsQuery });
  return result.data;
}

