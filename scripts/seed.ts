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

async function uploadAssetImage(filename: string) {
  const filePath = path.join(process.cwd(), "src/assets", filename);
  const asset = await client.assets.upload("image", readFileSync(filePath), { filename });
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

async function seedSiteSettings() {
  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Stylr",
    brandSuffix: ".store",
    headerNavLinks: [
      { _key: "home", label: "Home", path: "/" },
      { _key: "watches", label: "Watches", path: "/watches" },
      { _key: "perfumes", label: "Perfumes", path: "/perfumes" },
      { _key: "sunglasses", label: "Sunglasses", path: "/sunglasses" },
      { _key: "optical", label: "Optical", path: "/optical" },
      { _key: "contact", label: "Contact", path: "/contact" },
    ],
    footerNavLinks: [
      { _key: "watches", label: "Watches", path: "/watches" },
      { _key: "perfumes", label: "Perfumes", path: "/perfumes" },
      { _key: "sunglasses", label: "Sunglasses", path: "/sunglasses" },
      { _key: "optical", label: "Optical", path: "/optical" },
      { _key: "about", label: "About", path: "/about" },
      { _key: "contact", label: "Contact", path: "/contact" },
    ],
    footerBlurb:
      "A Dhaka-based maison for the quietly discerning. Rare timepieces and niche parfums, hand-selected, privately delivered.",
    footerTagline: "Style Your Way, Shop Your Day",
    footerLocationTag: "Dhaka · Bangladesh",
    copyrightSuffix: "Stylr.store — All rights reserved.",
    addressLines: ["KAKOLI Apartment 562", "Middle Monipur, Mirpur-2", "Dhaka, Bangladesh"],
    delivery: "Bangladesh wide — cash on delivery available in Dhaka.",
    email: "hello@stylr.store",
    businessHours: "By appointment only · 11:00 – 20:00 BST",
    phones: [
      { _key: "eyewear", channel: "eyewear", phone: "+880 1770 484702", waNumber: "8801770484702" },
      { _key: "watches", channel: "watches", phone: "+880 1711 885606", waNumber: "8801711885606" },
      { _key: "perfumes", channel: "perfumes", phone: "+880 1521 430196", waNumber: "8801521430196" },
    ],
  };
  await client.createOrReplace(doc as never);
  console.log("Site settings seeded.");
}

async function seedHomepage() {
  const heroWatchesImage = await uploadAssetImage("hero-watches.jpg");
  const heroPerfumeImage = await uploadAssetImage("hero-perfume.jpg");
  const sunglassesCarouselImage = await uploadImage("/products/rb2140-wayfarer.jpg");
  const opticalCarouselImage = await uploadImage("/products/essences-r6084.jpg");
  const sunglassesBannerImage = await uploadImage("/products/rb4246-clubround.jpg");
  const opticalBannerImage = await uploadImage("/products/essences-6020-rimless.jpg");

  const doc = {
    _id: "homepage",
    _type: "homepage",
    heroSlides: [
      {
        _key: "watches",
        kicker: "Collection · 01",
        headingPrefix: "Timepieces ",
        headingEmphasis: "d'exception.",
        copy: "Rare Rolex, Audemars Piguet, Omega and beyond — hand-selected and authenticated in Dhaka.",
        image: heroWatchesImage,
        ctaLabel: "Discover Watches",
        ctaLink: "/watches",
      },
      {
        _key: "perfumes",
        kicker: "Collection · 02",
        headingPrefix: "Parfums, ",
        headingEmphasis: "quietly",
        headingSuffix: " kept.",
        copy: "Niche houses, house exclusives and discontinued cult favourites — every flacon verified.",
        image: heroPerfumeImage,
        ctaLabel: "Enter the Parfumerie",
        ctaLink: "/perfumes",
      },
      {
        _key: "sunglasses",
        kicker: "Collection · 03 · Sun",
        headingPrefix: "Sun, ",
        headingEmphasis: "sealed",
        headingSuffix: " in acetate.",
        copy: "Ray-Ban classics — Wayfarer, Aviator, Round Metal, Clubround. Polarised lenses, ready to wear.",
        image: sunglassesCarouselImage,
        ctaLabel: "Shop Sunglasses",
        ctaLink: "/sunglasses",
      },
      {
        _key: "optical",
        kicker: "Collection · 04 · Optical",
        headingPrefix: "Optical, ",
        headingEmphasis: "precisely",
        headingSuffix: " made.",
        copy: "Italian titanium rimless and acetate frames — prescription-ready, hand-finished in Italy.",
        image: opticalCarouselImage,
        ctaLabel: "View Optical Frames",
        ctaLink: "/optical",
      },
    ],
    trustPoints: [
      {
        _key: "authenticated",
        title: "Hand-Selected & Authenticated",
        description: "Every piece is sourced, inspected and verified by our curators before it reaches you.",
      },
      {
        _key: "whatsapp",
        title: "Private WhatsApp Inquiry",
        description: "No carts, no checkouts. Each inquiry is answered personally by a single dedicated curator.",
      },
      {
        _key: "delivery",
        title: "Bangladesh-Wide Delivery",
        description: "Discreetly packaged and delivered nationwide from Dhaka. Cash on delivery available in Dhaka.",
      },
    ],
    promoBanners: [
      {
        _key: "parfumerie",
        kicker: "Parfumerie",
        headingPrefix: "Rare materials, ",
        headingEmphasis: "quietly",
        headingSuffix: " bottled.",
        paragraph:
          "From Mysore sandalwood to grey ambergris, our parfumerie favours scents composed with patience — house exclusives, archive editions, and discontinued favourites.",
        image: heroPerfumeImage,
        imagePosition: "left",
        ctaLabel: "Enter the Parfumerie",
        ctaLink: "/perfumes",
      },
      {
        _key: "sunglasses",
        kicker: "Sunglasses",
        headingPrefix: "Sun, ",
        headingEmphasis: "sealed",
        headingSuffix: " in acetate.",
        paragraph:
          "Aviator, Wayfarer, Round Metal, Clubround — polarised G-15 and gradient lenses, Ray-Ban classics, ready to wear.",
        image: sunglassesBannerImage,
        imagePosition: "right",
        ctaLabel: "Shop Sunglasses",
        ctaLink: "/sunglasses",
      },
      {
        _key: "optical",
        kicker: "Optical",
        headingPrefix: "Optical, ",
        headingEmphasis: "precisely",
        headingSuffix: " made.",
        paragraph:
          "Italian titanium rimless and acetate frames — prescription-ready, blue-light options, hand-finished in Italy.",
        image: opticalBannerImage,
        imagePosition: "left",
        ctaLabel: "View Optical Frames",
        ctaLink: "/optical",
      },
    ],
  };
  await client.createOrReplace(doc as never);
  console.log("Homepage seeded.");
}

async function main() {
  await seedCategory(watches, "watch", "referenceNumber", (w) => w.price!);
  await seedCategory(perfumes, "perfume", "catalogueNumber", (_p, i) => perfumePrices[i % perfumePrices.length]);
  await seedCategory(sunglasses, "sunglasses", "referenceNumber", (_s, i) => sunglassesPrices[i % sunglassesPrices.length]);
  await seedCategory(optical, "optical", "referenceNumber", (_o, i) => opticalPrices[i % opticalPrices.length]);
  await seedSiteSettings();
  await seedHomepage();
  console.log("Seed complete — 63 products, site settings, and homepage created/updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
