import { sanityFetch } from "../../live/live";
import { defineQuery } from "groq";

export const getUserByIdQuery = defineQuery(`
  *[_type == "user" && _id == $id][0]
`);

export async function getUserById(id: string) {
  const result = await sanityFetch({ query: getUserByIdQuery, params: { id } });
  return result.data;
}
