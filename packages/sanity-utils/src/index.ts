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
export * from "./groq/course/getCourses";
export * from "./groq/course/getCourseBySlug";
export * from "./groq/course/getCourseById";
export * from "./groq/course/searchCourses";

export * from "./groq/lessons/getLessonById";
export * from "./groq/lessons/getLessonCompletions";
export * from "./groq/lessons/getLessonCompletionStatus";
export * from "./groq/lessons/uncompleteLessonById";
export * from "./groq/lessons/completeLessonById";

export * from "./groq/student/getEnrolledCourses";
export * from "./groq/student/getStudentByClerkId";
export * from "./groq/student/isEnrolledInCourse";

// Live API (Next.js live preview / draft content helpers)
// Exported via a dedicated subpath "@workspace/sanity-utils/live" to
// keep the main entry free of server-only concerns.

