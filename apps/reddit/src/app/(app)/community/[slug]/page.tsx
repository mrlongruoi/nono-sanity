import Post from "@/components/post/Post";
import { urlFor } from "@/sanity/image";
import { getPostsForSubreddit } from "@workspace/sanity-utils/groq/subreddit/getPostsForSubreddit";
import { getSubredditBySlug } from "@workspace/sanity-utils/groq/subreddit/getSubredditBySlug";
import type { GetAllPostsQueryResult } from "@workspace/sanity-types/generated";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

// Force dynamic rendering - needs user authentication
export const dynamic = "force-dynamic";

async function CommunityPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const community = await getSubredditBySlug(slug);
  if (!community) return null;

  const user = await currentUser();
  const posts = await getPostsForSubreddit(community._id) as GetAllPostsQueryResult;

  return (
    <>
      {/* Community Banner */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            {community?.image && community.image.asset?._ref && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                <Image
                  src={urlFor(community.image).url()}
                  alt={
                    community.image.alt || `${community.title} community icon`
                  }
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{community?.title}</h1>
              {community?.description && (
                <p className="text-sm text-gray-600">{community.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post: GetAllPostsQueryResult[number]) => (
                <Post key={post._id} post={post} userId={user?.id || null} />
              ))
            ) : (
              <div className="bg-white rounded-md p-6 text-center">
                <p className="text-gray-500">No posts in this community yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CommunityPage;