import { defineQuery } from "groq";

export const getNavigationQuery = defineQuery(`
  *[_type == "navigation"] | order(order asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    label,
    href,
    order,
    isExternal,
    showInHeader,
    showInFooter
  }
`);

export async function getNavigation() {
  const { sanityFetch } = await import("../../live/live.server");
  const result = await sanityFetch({ query: getNavigationQuery });
  return result.data;
}

