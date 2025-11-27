import { defineQuery } from "groq";

export const getSkillsQuery = defineQuery(`
  *[_type == "skill"] | order(order asc, name asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    category,
    proficiency,
    yearsOfExperience,
    icon,
    description,
    order
  }
`);

export async function getSkills() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getSkillsQuery });
  return result.data;
}

