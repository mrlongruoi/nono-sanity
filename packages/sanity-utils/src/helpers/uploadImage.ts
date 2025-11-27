import { getServerClient } from "../clients/client.server";
import type { ImageUploadData } from "@workspace/sanity-types";

/**
 * Uploads an image to Sanity from base64 data
 * @param imageData - Object containing base64 data, filename, and content type
 * @returns The uploaded image asset reference or null if upload fails
 */
export async function uploadImageToSanity(
  imageData: ImageUploadData | null
): Promise<{ _id: string } | null> {
  if (!imageData) return null;

  try {
    // Extract base64 data (remove data:image/jpeg;base64, part if present)
    const base64Data = imageData.base64.includes(",")
      ? imageData.base64.split(",")[1]
      : imageData.base64;

    if (!base64Data) {
      throw new Error("Invalid image data format");
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Upload to Sanity
    const imageAsset = await getServerClient().assets.upload("image", buffer, {
      filename: imageData.filename,
      contentType: imageData.contentType,
    });

    return imageAsset;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

