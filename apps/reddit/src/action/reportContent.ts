"use server";

import { adminClient } from "@workspace/sanity-utils/server";
import { getUser } from "@/lib/getRedditUser";

export async function reportContent(contentId: string) {
  const user = await getUser();
  if ("error" in user) return { error: user.error };

  const result = await adminClient()
    .patch(contentId)
    .set({ isReported: true })
    .commit();

  return { result };
}