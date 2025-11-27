// Server-only exports for packages/sanity-utils
// Import and re-export helpers that are server-only so they are not
// included in client bundles when apps import the package public API.
export * from "./helpers/sanityFetch";
export * from "./clients/client.server";

// Alias for write operations
export { getServerClient as adminClient } from "./clients/client.server";

// Server-only GROQ mutations (create/update operations)
export * from "./groq/student/createStudentIfNotExists";
export * from "./groq/student/createEnrollment";

// Reddit server-only mutations - moved to helpers/mutations for better organization
export * from "./helpers/mutations/addComment";
export * from "./helpers/mutations/addUser";
export * from "./helpers/mutations/upvotePost";
export * from "./helpers/mutations/upvoteComment";
export * from "./helpers/mutations/downvotePost";
export * from "./helpers/mutations/downvoteComment";

// Image upload helper
export * from "./helpers/uploadImage";
