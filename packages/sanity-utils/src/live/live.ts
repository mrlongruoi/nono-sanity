import { defineLive } from "next-sanity/live";
import { getServerClient } from "../clients/client.server";

// Live-enabled Sanity helpers for Next.js app-router apps.
// This wraps the existing server client with next-sanity/live so that
// queries can be fetched and subscribed to in React components.
const liveClient = getServerClient();

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  // In this monorepo we use the same token for server and browser live mode.
  // If you later want stricter separation, you can introduce
  // SANITY_API_READ_TOKEN for the browser side.
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: process.env.SANITY_API_TOKEN,
  fetchOptions: {
    revalidate: 0,
  },
});
