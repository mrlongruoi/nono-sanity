import { defineQuery } from "groq";

export const getEducationHistoryQuery = defineQuery(`
  *[_type == "education"] | order(startDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    institution,
    institutionLogo,
    degree,
    field,
    location,
    startDate,
    endDate,
    current,
    gpa,
    description,
    achievements,
    coursework
  }
`);

export async function getEducationHistory() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getEducationHistoryQuery });
  return result.data;
}

