import { defineQuery } from "groq";

export const getBlogPostBySlugQuery = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    category,
    tags,
    author,
    publishedAt,
    readingTime,
    featured,
    seo
  }
`);

export async function getBlogPostBySlug(slug: string) {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getBlogPostBySlugQuery, params: { slug } });
  return result.data;
}

