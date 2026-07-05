import type { Product } from "@/components/ProductCard";
import { urlFor } from "./sanity";
import type { SanityImage, SanityWatch, SanityPerfume, SanitySunglasses, SanityOptical } from "./queries";

function img(source: SanityImage) {
  return urlFor(source).width(800).height(1000).fit("crop").url();
}

export function toWatchProduct(w: SanityWatch): Product {
  return { ref: w.referenceNumber, name: w.name, specs: w.specs, image: img(w.image), price: w.price };
}

export function toPerfumeProduct(p: SanityPerfume): Product {
  return { ref: p.catalogueNumber, brand: p.brand, name: p.name, specs: p.specs, image: img(p.image), price: p.price };
}

export function toSunglassesProduct(s: SanitySunglasses): Product {
  return { ref: s.referenceNumber, brand: s.brand, name: s.name, specs: s.specs, image: img(s.image), price: s.price };
}

export function toOpticalProduct(o: SanityOptical): Product {
  return toSunglassesProduct(o);
}
