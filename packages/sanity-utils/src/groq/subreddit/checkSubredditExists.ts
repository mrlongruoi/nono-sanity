import { sanityFetch } from "../../live/live";
import { defineQuery } from "groq";

export const checkSubredditByTitleQuery = defineQuery(`
  *[_type == "subreddit" && title == $name][0] {
    _id
  }
`);

export const checkSubredditBySlugQuery = defineQuery(`
  *[_type == "subreddit" && slug.current == $slug][0] {
    _id
  }
`);

export async function checkSubredditByTitle(name: string) {
  const result = await sanityFetch({ query: checkSubredditByTitleQuery, params: { name } });
  return result.data;
}

export async function checkSubredditBySlug(slug: string) {
  const result = await sanityFetch({ query: checkSubredditBySlugQuery, params: { slug } });
  return result.data;
}
