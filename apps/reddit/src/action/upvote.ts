"use server";

import { getUser } from "@/lib/getRedditUser";
import { upvoteComment, upvotePost } from "@workspace/sanity-utils/server";

export async function upvote(
  contentId: string,
  contentType: "post" | "comment" = "post"
) {
  const user = await getUser();

  if ("error" in user) {
    return { error: user.error };
  }

  if (contentType === "comment") {
    const vote = await upvoteComment(contentId, user._id);
    return { vote };
  } else {
    const vote = await upvotePost(contentId, user._id);
    return { vote };
  }
}