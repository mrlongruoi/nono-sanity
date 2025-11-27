// Note: This module is only exported via the /server subpath in package.json.
// This prevents it from being imported in client code.
import { createClient, type SanityClient } from "@sanity/client";
import { baseUrl } from "../lib/baseUrl";

let client: SanityClient | null = null;

export function getServerClient(): SanityClient {
  if (client) return client;

  // Ưu tiên env riêng cho Studio CLI
  const projectId =
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const dataset =
    process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    throw new Error(
      "Sanity server client: Missing one of the required environment variables: SANITY_PROJECT_ID, SANITY_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (or their Studio equivalents SANITY_STUDIO_PROJECT_ID/SANITY_STUDIO_DATASET)."
    );
  }

  client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-11-24",
    useCdn: false,
    stega: {
      studioUrl: `${baseUrl}/studio`
    },
    token: process.env.SANITY_API_READWRITE_TOKEN
  });

  return client;
}
