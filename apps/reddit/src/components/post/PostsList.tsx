import { getPosts } from "@workspace/sanity-utils/groq/post/getPosts";
import type { GetAllPostsQueryResult } from "@workspace/sanity-types/generated";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";

async function PostsList() {
  const posts = await getPosts() as GetAllPostsQueryResult;
  const user = await currentUser();

  return (
    <div className="space-y-4">
      {posts.map((post: GetAllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  );
}

export default PostsList;