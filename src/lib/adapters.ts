import type { Product } from "@/components/ProductCard";
import { urlFor } from "./sanity";
import type {
  SanityImage,
  SanityWatch,
  SanityPerfume,
  SanitySunglasses,
  SanityOptical,
  SanityHeroSlide,
  SanityPromoBanner,
} from "./queries";

function img(source: SanityImage) {
  return urlFor(source).width(800).height(1000).fit("crop").url();
}

function heroImg(source: SanityImage) {
  return urlFor(source).width(1600).height(900).fit("crop").url();
}

export function toWatchProduct(w: SanityWatch): Product {
  return {
    id: w._id,
    ref: w.referenceNumber,
    brand: w.brand,
    name: w.name,
    specs: w.specs,
    image: img(w.image),
    price: w.price,
  };
}

export function toPerfumeProduct(p: SanityPerfume): Product {
  return {
    id: p._id,
    ref: p.catalogueNumber,
    brand: p.brand,
    gender: p.gender,
    name: p.name,
    specs: p.specs,
    image: img(p.image),
    price: p.price,
  };
}

export function toSunglassesProduct(s: SanitySunglasses): Product {
  return {
    id: s._id,
    ref: s.referenceNumber,
    brand: s.brand,
    name: s.name,
    specs: s.specs,
    image: img(s.image),
    price: s.price,
  };
}

export function toOpticalProduct(o: SanityOptical): Product {
  return toSunglassesProduct(o);
}

export interface HeroSlideView {
  kicker: string;
  headingPrefix: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  copy: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface PromoBannerView {
  kicker: string;
  headingPrefix: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  paragraph: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  ctaLabel: string;
  ctaLink: string;
}

export function toHeroSlideView(s: SanityHeroSlide): HeroSlideView {
  return {
    kicker: s.kicker,
    headingPrefix: s.headingPrefix,
    headingEmphasis: s.headingEmphasis,
    headingSuffix: s.headingSuffix,
    copy: s.copy,
    imageUrl: heroImg(s.image),
    ctaLabel: s.ctaLabel,
    ctaLink: s.ctaLink,
  };
}

export function toPromoBannerView(b: SanityPromoBanner): PromoBannerView {
  return {
    kicker: b.kicker,
    headingPrefix: b.headingPrefix,
    headingEmphasis: b.headingEmphasis,
    headingSuffix: b.headingSuffix,
    paragraph: b.paragraph,
    imageUrl: img(b.image),
    imagePosition: b.imagePosition,
    ctaLabel: b.ctaLabel,
    ctaLink: b.ctaLink,
  };
}
