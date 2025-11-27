import { defineQuery } from "groq";
import { getServerClient } from "../../clients/client.server";
import { sanityFetch } from "../sanityFetch";

export async function downvotePost(postId: string, userId: string) {
  // Check if user has already voted on this post
  const existingVoteDownvoteQuery = defineQuery(
    `*[_type == "vote" && post._ref == $postId && user._ref == $userId][0]`
  );
  const existingVote = await sanityFetch({
    query: existingVoteDownvoteQuery,
    params: { postId, userId },
  }) as { data: any };

  if (existingVote.data) {
    const vote = existingVote.data;

    // If there's already a downvote, remove it (toggle off)
    if (vote.voteType === "downvote") {
      return await getServerClient().delete(vote._id);
    }

    // If there's an upvote, change it to a downvote
    if (vote.voteType === "upvote") {
      return await getServerClient()
        .patch(vote._id)
        .set({ voteType: "downvote" })
        .commit();
    }
  }

  // Create a new downvote
  return await getServerClient().create({
    _type: "vote",
    post: {
      _type: "reference",
      _ref: postId,
    },
    user: {
      _type: "reference",
      _ref: userId,
    },
    voteType: "downvote",
    createdAt: new Date().toISOString(),
  });
}
