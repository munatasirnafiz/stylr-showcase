import { createClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "yczlvuot";
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
export const SANITY_API_VERSION = "2024-01-01";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
