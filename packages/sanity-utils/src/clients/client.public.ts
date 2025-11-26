import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID || // để CLI không crash
  process.env.SANITY_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET;

export const publicClient = createClient({
  projectId: projectId || "dummy",
  dataset: dataset || "dummy",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-11-24",
  useCdn: true
});
