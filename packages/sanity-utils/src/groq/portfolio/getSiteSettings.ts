import { defineQuery } from "groq";

export const getSiteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    siteTitle,
    siteDescription,
    siteKeywords,
    siteLogo,
    favicon,
    ogImage,
    analyticsId,
    gtmId,
    contactEmail,
    socialMedia
  }
`);

export async function getSiteSettings() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getSiteSettingsQuery });
  return result.data;
}

