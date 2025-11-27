import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live/live";
import type { GetSubredditBySlugQueryResult } from "@workspace/sanity-types/generated";

export async function getSubredditBySlug(slug: string): Promise<GetSubredditBySlugQueryResult> {
  const lowerCaseSlug = slug.toLowerCase();
  const getSubredditBySlugQuery =
    defineQuery(`*[_type == "subreddit" && slug.current == $slug][0] {
      ...,
      "slug": slug.current,
      "moderator": moderator->,
    }`);

  const subreddit = await sanityFetch({
    query: getSubredditBySlugQuery,
    params: { slug: lowerCaseSlug },
  });

  return subreddit.data as GetSubredditBySlugQueryResult;
}