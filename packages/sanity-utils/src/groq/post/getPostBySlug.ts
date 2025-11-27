import { sanityFetch } from "../../live/live";
import { defineQuery } from "groq";

export async function getPostBySlug(slug: string) {
  const getPostBySlugQuery = defineQuery(`*[_type == "post" && slug.current == $slug] {
    _id,
    title,
    "slug": slug.current,
    body,
    publishedAt,
    "author": author->{
      _id,
      username,
      email,
      "image": image.asset->url
    },
    "subreddit": subreddit->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    image,
    isDeleted,
    "commentCount": count(*[_type == "comment" && post._ref == ^._id && !isDeleted]),
    "upvoteCount": count(*[_type == "vote" && post._ref == ^._id && voteType == "upvote"]),
    "downvoteCount": count(*[_type == "vote" && post._ref == ^._id && voteType == "downvote"])
  }[0]`);

  const post = await sanityFetch({
    query: getPostBySlugQuery,
    params: { slug },
  });
  
  return post.data;
}
