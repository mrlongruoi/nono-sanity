import { defineQuery } from "groq";

export const getAchievementsQuery = defineQuery(`
  *[_type == "achievement"] | order(date desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    type,
    description,
    date,
    organization,
    link,
    image,
    featured,
    tags
  }
`);

export async function getAchievements() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getAchievementsQuery });
  return result.data;
}

