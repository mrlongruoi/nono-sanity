import { sanityFetch } from "../../helpers/sanityFetch";
import { defineQuery } from "groq";
import type { GetCommentByIdQueryResult } from "@workspace/sanity-types/generated";

export async function getCommentById(commentId: string): Promise<GetCommentByIdQueryResult> {
  const getCommentByIdQuery =
    defineQuery(`*[_type == "comment" && _id == $commentId][0] {
    _id,
    content,
    createdAt,
    "author": author->,
    isDeleted
  }`);

  const comment = await sanityFetch({
    query: getCommentByIdQuery,
    params: { commentId },
  });
  return comment.data as GetCommentByIdQueryResult;
}