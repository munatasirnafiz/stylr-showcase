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

export const ALL_WATCHES_QUERY = `*[_type == "watch"] | order(_createdAt asc){ ${WATCH_FIELDS} }`;
export const FEATURED_WATCHES_QUERY = `*[_type == "watch" && featured == true] | order(_createdAt asc)[0...4]{ ${WATCH_FIELDS} }`;

export const ALL_PERFUMES_QUERY = `*[_type == "perfume"] | order(_createdAt asc){ ${PERFUME_FIELDS} }`;
export const FEATURED_PERFUMES_QUERY = `*[_type == "perfume" && featured == true] | order(_createdAt asc)[0...4]{ ${PERFUME_FIELDS} }`;

export const ALL_SUNGLASSES_QUERY = `*[_type == "sunglasses"] | order(_createdAt asc){ ${SUNGLASSES_FIELDS} }`;
export const FEATURED_SUNGLASSES_QUERY = `*[_type == "sunglasses" && featured == true] | order(_createdAt asc)[0...4]{ ${SUNGLASSES_FIELDS} }`;

export const ALL_OPTICAL_QUERY = `*[_type == "optical"] | order(_createdAt asc){ ${OPTICAL_FIELDS} }`;
export const FEATURED_OPTICAL_QUERY = `*[_type == "optical" && featured == true] | order(_createdAt asc)[0...4]{ ${OPTICAL_FIELDS} }`;
