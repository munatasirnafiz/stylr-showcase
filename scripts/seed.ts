import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Product } from "../src/components/ProductCard";
import { watches, perfumes, sunglasses, optical } from "../src/data/products";
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "../src/lib/sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Set SANITY_API_WRITE_TOKEN in .env (needs write access) before running the seed script.",
  );
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token,
  useCdn: false,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function uploadImage(publicPath: string) {
  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: path.basename(filePath),
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

// Perfumes/sunglasses/optical have no existing price data in src/data/products.ts —
// generate placeholder BDT prices using the same cycling technique already used for
// watchPrices there. These are placeholders; correct real prices in Sanity Studio.
const perfumePrices = [8500, 7900, 12500, 15000, 13500, 6800, 11200, 9200, 21000, 24500, 19800, 8700, 9100, 6400, 7300, 10200, 14600];
const sunglassesPrices = [6500, 7200, 8100, 5900, 9400, 6800, 7600, 5400, 8800, 6200];
const opticalPrices = [7400, 8600, 6900, 7800, 9200, 6300, 7100, 8300, 6700, 7900];

async function seedCategory(
  items: Product[],
  type: "watch" | "perfume" | "sunglasses" | "optical",
  refField: "referenceNumber" | "catalogueNumber",
  priceFor: (item: Product, index: number) => number,
) {
  for (const [i, item] of items.entries()) {
    const image = await uploadImage(item.image);
    const doc: Record<string, unknown> = {
      _id: `${type}-${slugify(item.ref)}`,
      _type: type,
      [refField]: item.ref,
      name: item.name,
      specs: item.specs,
      price: priceFor(item, i),
      image,
      featured: i < 4,
    };
    if (item.brand) doc.brand = item.brand;

    await client.createOrReplace(doc as never);
    console.log(`${type} ${i + 1}/${items.length}: ${item.name}`);
  }
}

async function main() {
  await seedCategory(watches, "watch", "referenceNumber", (w) => w.price!);
  await seedCategory(perfumes, "perfume", "catalogueNumber", (_p, i) => perfumePrices[i % perfumePrices.length]);
  await seedCategory(sunglasses, "sunglasses", "referenceNumber", (_s, i) => sunglassesPrices[i % sunglassesPrices.length]);
  await seedCategory(optical, "optical", "referenceNumber", (_o, i) => opticalPrices[i % opticalPrices.length]);
  console.log("Seed complete — 63 products created/updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
