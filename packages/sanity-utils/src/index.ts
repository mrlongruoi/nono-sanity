// Barrel exports for the package public API
export { urlFor } from "./helpers/urlFor";
// NOTE: sanityFetch is server-only (it dynamically imports server client).
// Do not re-export it from the public package entry to avoid bundlers
// including server-only code in client bundles. Import it from
// "@workspace/sanity-utils/server" or the internal path when used on the server.

export * from "./clients/client.public";

export * from "./lib/baseUrl";
export * from "./lib/courseProgress";

// GROQ query helpers
// NOTE: LMS queries use live-enabled sanityFetch and should NOT be exported
// from the main entry to avoid loading defineLive in non-React contexts (Studio).
// Import them directly via "@workspace/sanity-utils/groq/course/*" subpaths.
//
// Commented out to prevent Studio loading issues:
// export * from "./groq/course/getCourses";
// export * from "./groq/course/getCourseBySlug";
// export * from "./groq/course/getCourseById";
// export * from "./groq/course/searchCourses";

// export * from "./groq/lessons/getLessonById";
// export * from "./groq/lessons/getLessonCompletions";
// export * from "./groq/lessons/getLessonCompletionStatus";
// export * from "./groq/lessons/uncompleteLessonById";
// export * from "./groq/lessons/completeLessonById";

// export * from "./groq/student/getEnrolledCourses";
// export * from "./groq/student/getStudentByClerkId";
// export * from "./groq/student/isEnrolledInCourse";

// Portfolio GROQ query helpers
// NOTE: Portfolio queries use live-enabled sanityFetch and should NOT be exported
// from the main entry to avoid loading defineLive in non-React contexts (Studio typegen).
// Import them directly via "@workspace/sanity-utils/groq/portfolio" subpath.
//
// Commented out to prevent Studio typegen failures and client bundling issues:
// export * from "./groq/portfolio";

// Reddit GROQ query helpers
// NOTE: Reddit queries use live-enabled sanityFetch and should NOT be exported
// from the main entry to avoid loading defineLive in non-React contexts (Studio typegen).
// Import them directly via "@workspace/sanity-utils/groq/post/..." subpaths.
// 
// Commented out to prevent Studio typegen failures:
// export * from "./groq/post/getPosts";
// export * from "./groq/post/getPostById";
// export * from "./groq/post/getPostBySlug";
// export * from "./groq/comment/getCommentById";
// export * from "./groq/comment/getCommentReplies";
// export * from "./groq/subreddit/getSubreddits";
// export * from "./groq/subreddit/getSubredditBySlug";
// export * from "./groq/subreddit/getPostsForSubreddit";
// export * from "./groq/subreddit/searchSubreddits";
// export * from "./groq/vote/getPostComments";
// export * from "./groq/vote/getPostVotes";
// export * from "./groq/vote/getUserPostVoteStatus";

// Live API (Next.js live preview / draft content helpers)
// Exported via a dedicated subpath "@workspace/sanity-utils/live" to
// keep the main entry free of server-only concerns.

