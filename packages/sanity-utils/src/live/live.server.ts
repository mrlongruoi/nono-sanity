/**
 * Server-only live fetch implementation
 * This file MUST only be imported in React Server Components or root layouts
 * Never import this in client components or shared modules
 * 
 * IMPORTANT: defineLive() is executed at module load time.
 * This is safe because:
 * 1. Next.js only bundles this for server chunks (not browser)
 * 2. Sanity Studio typegen doesn't import this file
 * 3. This follows the official next-sanity pattern
 */

import { defineLive } from "next-sanity/live";
import { getServerClient } from "../clients/client.server";

// Execute defineLive at module level - this is the official pattern
const liveClient = getServerClient();
const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: process.env.SANITY_API_READWRITE_TOKEN || process.env.SANITY_API_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  fetchOptions: {
    revalidate: 0,
  },
});

// Export for use in Server Components and layouts
export { sanityFetch, SanityLive };
