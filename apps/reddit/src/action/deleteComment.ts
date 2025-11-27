"use server";

import { adminClient } from "@workspace/sanity-utils/server";
import { getCommentById } from "@workspace/sanity-utils/groq/comment/getCommentById";
import type { GetCommentByIdQueryResult } from "@workspace/sanity-types/generated";
import { currentUser } from "@clerk/nextjs/server";

export const deleteComment = async (commentId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }

  const comment = await getCommentById(commentId) as GetCommentByIdQueryResult;
  if (!comment) {
    return { error: "Comment not found" };
  }

  if (comment.author?._id !== user?.id) {
    return { error: "You are not authorized to delete this comment" };
  }

  const patch = adminClient().patch(commentId);

  // Delete content
  patch.set({ content: "[DELETED]" });

  // Set comment to deleted
  patch.set({ isDeleted: true });

  // Commit changes
  await patch.commit();

  // Return success message
  return { success: "Comment deleted successfully" };
};