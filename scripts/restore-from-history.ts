import { createClient } from "@sanity/client";
import { watches, perfumes, sunglasses, optical } from "../src/data/products";
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "../src/lib/sanity";

// One-off recovery tool: pulls each seeded document's content as of RESTORE_TIME
// (via Sanity's History API) and, unless DRY_RUN, writes it back over the current
// document. Use this to undo a `bun run seed` that clobbered live Studio edits
// with the older createOrReplace behavior (seed.ts now uses createIfNotExists,
// so this situation shouldn't recur going forward).
//
// Usage:
//   RESTORE_TIME=2026-07-15T09:30:00Z bun run scripts/restore-from-history.ts        # dry run, prints diffs only
//   RESTORE_TIME=2026-07-15T09:30:00Z DRY_RUN=false bun run scripts/restore-from-history.ts   # actually writes

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error("Set SANITY_API_WRITE_TOKEN in .env (needs write access) before running this script.");
}

const restoreTime = process.env.RESTORE_TIME;
if (!restoreTime) {
  throw new Error(
    "Set RESTORE_TIME to an ISO-8601 timestamp from just before the seed ran, e.g. RESTORE_TIME=2026-07-15T09:30:00Z",
  );
}

const dryRun = process.env.DRY_RUN !== "false";

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

async function fetchHistorical(id: string): Promise<Record<string, unknown> | null> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/history/${SANITY_DATASET}/documents/${id}?time=${encodeURIComponent(restoreTime!)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.log(`  ${id}: history lookup failed (HTTP ${res.status})`);
    return null;
  }
  const data = (await res.json()) as { documents?: Record<string, unknown>[] };
  return data.documents?.[0] ?? null;
}

async function restoreCategory(refs: string[], type: "watch" | "perfume" | "sunglasses" | "optical") {
  for (const ref of refs) {
    const id = `${type}-${slugify(ref)}`;
    const current = (await client.getDocument(id)) as Record<string, unknown> | undefined;
    const historical = await fetchHistorical(id);

    if (!historical) {
      console.log(`${id}: no snapshot found at ${restoreTime} — skipping.`);
      continue;
    }

    const priceChanged = current?.price !== historical.price;
    const currentImage = (current?.image as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
    const historicalImage = (historical.image as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
    const imageChanged = currentImage !== historicalImage;

    if (!priceChanged && !imageChanged) {
      console.log(`${id}: matches historical snapshot already, nothing to do.`);
      continue;
    }

    console.log(`${id}:`);
    if (priceChanged) console.log(`  price: ${current?.price} -> ${historical.price}`);
    if (imageChanged) console.log(`  image asset: ${currentImage} -> ${historicalImage}`);

    if (dryRun) {
      console.log("  (dry run — not writing. Re-run with DRY_RUN=false to apply.)");
      continue;
    }

    const { _rev, _updatedAt, ...restoreBody } = historical;
    await client.createOrReplace(restoreBody as never);
    console.log("  restored.");
  }
}

async function main() {
  console.log(`Restoring from snapshot at ${restoreTime}${dryRun ? " (dry run)" : ""}...\n`);
  await restoreCategory(
    watches.map((w) => w.ref),
    "watch",
  );
  await restoreCategory(
    perfumes.map((p) => p.ref),
    "perfume",
  );
  await restoreCategory(
    sunglasses.map((s) => s.ref),
    "sunglasses",
  );
  await restoreCategory(
    optical.map((o) => o.ref),
    "optical",
  );
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
