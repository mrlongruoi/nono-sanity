export const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_REDDIT_URL || process.env.NEXT_PUBLIC_LMS_URL || "http://localhost:3000";
