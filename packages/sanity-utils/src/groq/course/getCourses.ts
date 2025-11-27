import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";


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
  const result = await sanityFetch({ query: getCoursesQuery, params: {} });
  return result.data;
}
