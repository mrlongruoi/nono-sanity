// Re-export GROQ queries so studio typegen finds them reliably
export * from "./course/getCourseById";
export * from "./course/getCourseBySlug";
export * from "./course/getCourses";
export * from "./course/searchCourses";

export * from "./lessons/completeLessonById";
export * from "./lessons/getCourseProgress";
export * from "./lessons/getLessonById";
export * from "./lessons/getLessonCompletions";
export * from "./lessons/getLessonCompletionStatus";
export * from "./lessons/uncompleteLessonById";

export * from "./student/createEnrollment";
export * from "./student/createStudentIfNotExists";
export * from "./student/getEnrolledCourses";
export * from "./student/getStudentByClerkId";
export * from "./student/isEnrolledInCourse";

// Reddit queries are NOT exported here because they use live-enabled sanityFetch
// which causes "defineLive can only be used in React Server Components" errors
// during Studio typegen (which runs in Node.js, not React).
// 
// Import Reddit queries directly from their subpaths:
// import { getPostById } from "@workspace/sanity-utils/groq/post/getPostById"
//
// Commented out to prevent Studio typegen failures:
// export * from "./post/getPostById";
// export * from "./post/getPosts";
// export * from "./post/getPostBySlug";
// export * from "./comment/getCommentById";
// export * from "./comment/getCommentReplies";
// export * from "./subreddit/getPostsForSubreddit";
// export * from "./subreddit/getSubredditBySlug";
// export * from "./subreddit/getSubreddits";
// export * from "./subreddit/searchSubreddits";
// export * from "./vote/getPostComments"
// export * from "./vote/getPostVotes"
// export * from "./vote/getUserPostVoteStatus"
