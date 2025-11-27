import { getPostBySlug } from "@workspace/sanity-utils/groq/post/getPostBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@workspace/sanity-utils/image";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  // Type guard to ensure post has required fields
  const post = postData as {
    _id: string;
    title: string;
    slug: string;
    body?: string | Array<{
      children?: Array<{
        marks?: string[];
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: string;
      _type: "block";
      _key: string;
    }>;
    publishedAt?: string;
    author?: {
      _id: string;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
    subreddit?: {
      _id: string;
      title: string;
      slug: string;
      description?: string;
    };
    image?: {
      asset?: {
        _ref: string;
      };
    };
    isDeleted?: boolean;
    commentCount?: number;
    upvoteCount?: number;
    downvoteCount?: number;
  };

  if (post.isDeleted) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Subreddit info */}
      {post.subreddit && (
        <div className="mb-4 text-sm">
          <a
            href={`/community/${post.subreddit.slug}`}
            className="text-primary hover:underline"
          >
            r/{post.subreddit.title}
          </a>
        </div>
      )}

      {/* Post header */}
      <article className="bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        {/* Author and metadata */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <Image
                src={post.author.image}
                alt={post.author.username || "User"}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>u/{post.author?.username || "Anonymous"}</span>
          </div>
          <span>•</span>
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : "Draft"}
          </span>
        </div>

        {/* Post image */}
        {post.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.image).width(800).url()}
              alt={post.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Post body */}
        {post.body && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
            {typeof post.body === "string" ? (
              <p className="whitespace-pre-wrap">{post.body}</p>
            ) : (
              <p className="whitespace-pre-wrap">
                {post.body
                  .map((block) =>
                    block.children
                      ?.map((child) => child.text)
                      .join("")
                  )
                  .join("\n\n")}
              </p>
            )}
          </div>
        )}

        {/* Post stats */}
        <div className="flex items-center gap-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {(post.upvoteCount || 0) - (post.downvoteCount || 0)} votes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {post.commentCount || 0} comments
            </span>
          </div>
        </div>
      </article>

      {/* Comments section placeholder */}
      <div className="mt-8 bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <p className="text-muted-foreground">Comments feature coming soon...</p>
      </div>
    </div>
  );
}
