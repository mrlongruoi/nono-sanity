/**
 * DEPRECATED: Use live.server.ts instead
 * 
 * This file is kept for backward compatibility but should not be used.
 * Import from:
 * - "@workspace/sanity-utils/live/server" for server components
 * - "@workspace/sanity-utils/live" for SanityLive component only
 * 
 * @deprecated Use live.server.ts
 */

// Re-export from server implementation
// This ensures existing imports still work but the logic lives in server-only file
export { sanityFetch, SanityLive } from "./live.server";
