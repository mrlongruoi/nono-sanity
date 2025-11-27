import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET;

if (!projectId) {
  throw new Error(
    "Missing Sanity project ID. Set NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID / SANITY_STUDIO_PROJECT_ID) in your environment."
  );
}

if (!dataset) {
  throw new Error(
    "Missing Sanity dataset. Set NEXT_PUBLIC_SANITY_DATASET (or SANITY_DATASET / SANITY_STUDIO_DATASET) in your environment."
  );
}

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-11-24",
  useCdn: true,
});

// Alias for convenience
export { publicClient as client };
export default publicClient;
