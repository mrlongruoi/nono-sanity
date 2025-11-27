import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";
import type { GetLessonByIdQueryResult } from "@workspace/sanity-types/generated";

export const getLessonByIdQuery = defineQuery(`
  *[_type == "lesson" && _id == $id][0]{
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
    module->{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      lessons,
      course->{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        price,
        slug,
        description,
        image
      }
    }
  }
`);

export async function getLessonById(
  id: string
): Promise<GetLessonByIdQueryResult | null> {
  const result = await sanityFetch({ query: getLessonByIdQuery, params: { id } });
  return result.data;
}
