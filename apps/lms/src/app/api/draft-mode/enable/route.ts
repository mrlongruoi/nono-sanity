/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { publicClient } from "@workspace/sanity-utils";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

const token = process.env.SANITY_API_TOKEN;

export async function GET(request: Request) {
  // Defensive check: fail fast if the required Sanity API token is missing
  if (!token) {
    console.error(
      "Draft mode enable route: Missing SANITY_API_TOKEN environment variable. Cannot validate preview URL."
    );
    return new Response("Server misconfiguration: SANITY_API_TOKEN is not set", {
      status: 500,
    });
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    publicClient.withConfig({ token }),
    request.url
  );
  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}