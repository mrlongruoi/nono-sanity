import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";
import type { GetCourseBySlugQueryResult } from "@workspace/sanity-types/generated";


export const getCourseBySlugQuery = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    price,
    slug,
    description,
    image,
    category->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug
    },
    instructor->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      bio,
      photo
    },
    modules[]->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      course,
      lessons[]->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        description,
        videoUrl,
        loomUrl,
        content,
        module
      }
    }
  }
`);

export async function getCourseBySlug(slug: string): Promise<GetCourseBySlugQueryResult | null> {
  const result = await sanityFetch({ query: getCourseBySlugQuery, params: { slug } });
  return result.data;
}
