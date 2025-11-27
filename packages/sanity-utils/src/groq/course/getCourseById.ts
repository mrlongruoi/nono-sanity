import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";
import type { GetCourseByIdQueryResult } from "@workspace/sanity-types/generated";

export const getCourseByIdQuery = defineQuery(`
  *[_type == "course" && _id == $id][0] {
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

export async function getCourseById(
  id: string
): Promise<GetCourseByIdQueryResult | null> {
  const result = await sanityFetch({ query: getCourseByIdQuery, params: { id } });
  return result.data;
}
