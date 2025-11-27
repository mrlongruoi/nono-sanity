import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live";


export const searchCoursesQuery = defineQuery(`
  *[_type == "course" && (
    title match $wildcard ||
    description match $wildcard ||
    category->title match $wildcard
  )] {
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

export async function searchCourses(term: string) {
  const result = await sanityFetch({ 
    query: searchCoursesQuery, 
    params: { wildcard: `${term}*` }
  });
  return result.data;
}
