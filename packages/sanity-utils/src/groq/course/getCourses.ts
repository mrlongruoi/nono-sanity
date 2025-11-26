import { defineQuery } from "groq";
import { sanityFetch } from "../../helpers/sanityFetch";
import type { GetCoursesQueryResult } from "@workspace/sanity-types";


export const getCoursesQuery = defineQuery(`
  *[_type == "course"] {
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
      title,
      slug
    },
    instructor->{
      _id,
      _type,
      name,
      bio,
      photo
    },
    modules
  }
`);

export async function getCourses() {
  return await sanityFetch<GetCoursesQueryResult>(getCoursesQuery);
}
