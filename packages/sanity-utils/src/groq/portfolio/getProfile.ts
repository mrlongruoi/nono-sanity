import { defineQuery } from "groq";
import { sanityFetch } from "../../live/live.server";

export const getProfileQuery = defineQuery(`
  *[_type == "profile"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    headlineStaticText,
    headlineAnimatedWords,
    headlineAnimationDuration,
    shortBio,
    fullBio,
    profileImage,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    stats
  }
`);

export async function getProfile() {
  const result = await sanityFetch({ query: getProfileQuery });
  return result.data;
}

