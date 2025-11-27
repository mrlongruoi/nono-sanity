import { defineQuery } from "groq";

export const getExperiencesQuery = defineQuery(`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    company,
    companyLogo,
    position,
    location,
    locationType,
    startDate,
    endDate,
    current,
    description,
    responsibilities,
    achievements,
    technologies
  }
`);

export async function getExperiences() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getExperiencesQuery });
  return result.data;
}

