"use server";

import { adminClient, uploadImageToSanity, sanityFetch } from "@workspace/sanity-utils/server";
import { getUser } from "@/lib/getRedditUser";
import type { Subreddit } from "@workspace/sanity-types/generated";
import type { ImageUploadData } from "@workspace/sanity-types";
import { defineQuery } from "groq";

export async function createCommunity(
  name: string,
  imageBase64: string | null | undefined,
  imageFilename: string | null | undefined,
  imageContentType: string | null | undefined,
  slug?: string,
  description?: string
): Promise<{ subreddit?: Subreddit; error?: string }> {
  try {
    const user = await getUser();

    if ("error" in user) {
      return { error: user.error };
    }

    console.log(`Creating subreddit: ${name} with moderator: ${user._id}`);

    // Check if subreddit with this name already exists
    const checkExistingQuery = defineQuery(`
      *[_type == "subreddit" && title == $name][0] {
        _id
      }
    `);

    const existingSubreddit = await sanityFetch({
      query: checkExistingQuery,
      params: { name },
    });

    if (existingSubreddit.data) {
      console.log(`Subreddit "${name}" already exists`);
      return { error: "A subreddit with this name already exists" };
    }

    // Check if slug already exists if custom slug is provided
    const customSlug = slug || name.toLowerCase().replaceAll(/\s+/g, "-");
    const checkSlugQuery = defineQuery(`
      *[_type == "subreddit" && slug.current == $slug][0] {
        _id
      }
    `);

    const existingSlug = await sanityFetch({
      query: checkSlugQuery,
      params: { slug: customSlug },
    });

    if (existingSlug.data) {
      console.log(`Subreddit with slug "${customSlug}" already exists`);
      return { error: "A subreddit with this URL already exists" };
    }

    // Prepare image data if provided
    let imageData: ImageUploadData | null = null;
    if (imageBase64 && imageFilename && imageContentType) {
      imageData = {
        base64: imageBase64,
        filename: imageFilename,
        contentType: imageContentType,
      };
    }

    // Upload image if provided
    const imageAsset = await uploadImageToSanity(imageData);

    // Create the subreddit
    const subredditDoc: Partial<Subreddit> = {
      _type: "subreddit",
      title: name,
      description: description || `Welcome to r/${name}!`,
      slug: {
        current: customSlug,
        _type: "slug",
      },
      moderator: {
        _type: "reference",
        _ref: user._id,
      },
      createdAt: new Date().toISOString(),
    };

    // Add image if available
    if (imageAsset) {
      subredditDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const subreddit = await adminClient().create(subredditDoc as Subreddit);
    console.log(`Subreddit created successfully with ID: ${subreddit._id}`);

    return { subreddit };
  } catch (error) {
    console.error("Error in createCommunity:", error);
    return { error: "Failed to create community" };
  }
}