export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
}

export interface SanityWatch {
  _id: string;
  referenceNumber: string;
  name: string;
  specs: string[];
  price: number;
  image: SanityImage;
  featured: boolean;
}

export interface SanityPerfume {
  _id: string;
  catalogueNumber: string;
  brand: string;
  name: string;
  specs: string[];
  price: number;
  image: SanityImage;
  featured: boolean;
}

export interface SanitySunglasses {
  _id: string;
  referenceNumber: string;
  brand: string;
  name: string;
  specs: string[];
  price: number;
  image: SanityImage;
  featured: boolean;
}

export type SanityOptical = SanitySunglasses;

const WATCH_FIELDS = `_id, referenceNumber, name, specs, price, image, featured`;
const PERFUME_FIELDS = `_id, catalogueNumber, brand, name, specs, price, image, featured`;
const SUNGLASSES_FIELDS = `_id, referenceNumber, brand, name, specs, price, image, featured`;
const OPTICAL_FIELDS = SUNGLASSES_FIELDS;

export const ALL_WATCHES_QUERY = `*[_type == "watch"] | order(_createdAt desc){ ${WATCH_FIELDS} }`;
export const FEATURED_WATCHES_QUERY = `*[_type == "watch" && featured == true] | order(_createdAt desc)[0...4]{ ${WATCH_FIELDS} }`;

export const ALL_PERFUMES_QUERY = `*[_type == "perfume"] | order(_createdAt desc){ ${PERFUME_FIELDS} }`;
export const FEATURED_PERFUMES_QUERY = `*[_type == "perfume" && featured == true] | order(_createdAt desc)[0...4]{ ${PERFUME_FIELDS} }`;

export const ALL_SUNGLASSES_QUERY = `*[_type == "sunglasses"] | order(_createdAt desc){ ${SUNGLASSES_FIELDS} }`;
export const FEATURED_SUNGLASSES_QUERY = `*[_type == "sunglasses" && featured == true] | order(_createdAt desc)[0...4]{ ${SUNGLASSES_FIELDS} }`;

export const ALL_OPTICAL_QUERY = `*[_type == "optical"] | order(_createdAt desc){ ${OPTICAL_FIELDS} }`;
export const FEATURED_OPTICAL_QUERY = `*[_type == "optical" && featured == true] | order(_createdAt desc)[0...4]{ ${OPTICAL_FIELDS} }`;

export interface SanityNavLink {
  label: string;
  path: string;
}

export interface SanityPhoneEntry {
  channel: "watches" | "perfumes" | "eyewear";
  phone: string;
  waNumber: string;
}

export interface SanitySiteSettings {
  logo?: SanityImage;
  brandName: string;
  brandSuffix: string;
  headerNavLinks: SanityNavLink[];
  footerNavLinks: SanityNavLink[];
  footerBlurb: string;
  footerTagline: string;
  footerLocationTag: string;
  copyrightSuffix: string;
  addressLines: string[];
  delivery: string;
  email: string;
  businessHours: string;
  phones: SanityPhoneEntry[];
}

export interface SanityHeroSlide {
  kicker: string;
  headingPrefix: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  copy: string;
  image: SanityImage;
  ctaLabel: string;
  ctaLink: string;
}

export interface SanityTrustPoint {
  title: string;
  description: string;
}

export interface SanityPromoBanner {
  kicker: string;
  headingPrefix: string;
  headingEmphasis?: string;
  headingSuffix?: string;
  paragraph: string;
  image: SanityImage;
  imagePosition: "left" | "right";
  ctaLabel: string;
  ctaLink: string;
}

export interface SanityHomepage {
  heroSlides: SanityHeroSlide[];
  trustPoints: SanityTrustPoint[];
  promoBanners: SanityPromoBanner[];
}

const SITE_SETTINGS_FIELDS = `
  logo, brandName, brandSuffix, headerNavLinks, footerNavLinks, footerBlurb, footerTagline,
  footerLocationTag, copyrightSuffix, addressLines, delivery, email, businessHours, phones
`;

export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{ ${SITE_SETTINGS_FIELDS} }`;

const HOMEPAGE_FIELDS = `heroSlides, trustPoints, promoBanners`;

export const HOMEPAGE_QUERY = `*[_id == "homepage"][0]{ ${HOMEPAGE_FIELDS} }`;
