import { defineLive } from "next-sanity/live";
import { getServerClient } from "../clients/client.server";

// Live-enabled Sanity helpers for Next.js app-router apps with visual editing support.
// This wraps the existing server client with next-sanity/live so that
// queries can be fetched and subscribed to in React components.
// 
// Token strategy:
// - serverToken: Use READWRITE for mutations (server-only)
// - browserToken: Use read-only TOKEN for live updates (public, safe)
const liveClient = getServerClient();

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: process.env.SANITY_API_READWRITE_TOKEN || process.env.SANITY_API_TOKEN,
  // Use regular token for browser - it's already read-only by default
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  fetchOptions: {
    revalidate: 0,
  },
});
