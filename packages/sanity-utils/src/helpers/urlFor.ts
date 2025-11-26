
import imageUrlBuilder from "@sanity/image-url";
import { publicClient } from "../clients/client.public";

/**
 * Build a Sanity image URL for a given image source.
 * Uses the public client, so is safe for both client and server usage.
 * @param src - The Sanity image source (asset, ref, or object)
 */
export function urlFor(src: any) {
  return imageUrlBuilder(publicClient).image(src);
}
