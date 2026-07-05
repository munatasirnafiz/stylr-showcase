import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import { toHeroSlideView, toPromoBannerView, type HeroSlideView, type PromoBannerView } from "@/lib/adapters";
import { SITE_SETTINGS_QUERY, HOMEPAGE_QUERY, type SanitySiteSettings, type SanityHomepage } from "@/lib/queries";
import { buildInquiryLink, type InquiryChannel } from "@/data/contact";
import heroWatches from "@/assets/hero-watches.jpg";
import heroPerfume from "@/assets/hero-perfume.jpg";

export const FALLBACK_SITE_SETTINGS: SanitySiteSettings = {
  brandName: "Stylr",
  brandSuffix: ".store",
  headerNavLinks: [
    { label: "Home", path: "/" },
    { label: "Watches", path: "/watches" },
    { label: "Perfumes", path: "/perfumes" },
    { label: "Sunglasses", path: "/sunglasses" },
    { label: "Optical", path: "/optical" },
    { label: "Contact", path: "/contact" },
  ],
  footerNavLinks: [
    { label: "Watches", path: "/watches" },
    { label: "Perfumes", path: "/perfumes" },
    { label: "Sunglasses", path: "/sunglasses" },
    { label: "Optical", path: "/optical" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
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
    { channel: "eyewear", phone: "+880 1770 484702", waNumber: "8801770484702" },
    { channel: "watches", phone: "+880 1711 885606", waNumber: "8801711885606" },
    { channel: "perfumes", phone: "+880 1521 430196", waNumber: "8801521430196" },
  ],
};

export const FALLBACK_HOMEPAGE: { heroSlides: HeroSlideView[]; trustPoints: SanityHomepage["trustPoints"]; promoBanners: PromoBannerView[] } = {
  heroSlides: [
    {
      kicker: "Collection · 01",
      headingPrefix: "Timepieces ",
      headingEmphasis: "d'exception.",
      headingSuffix: undefined,
      copy: "Rare Rolex, Audemars Piguet, Omega and beyond — hand-selected and authenticated in Dhaka.",
      imageUrl: heroWatches,
      ctaLabel: "Discover Watches",
      ctaLink: "/watches",
    },
    {
      kicker: "Collection · 02",
      headingPrefix: "Parfums, ",
      headingEmphasis: "quietly",
      headingSuffix: " kept.",
      copy: "Niche houses, house exclusives and discontinued cult favourites — every flacon verified.",
      imageUrl: heroPerfume,
      ctaLabel: "Enter the Parfumerie",
      ctaLink: "/perfumes",
    },
    {
      kicker: "Collection · 03 · Sun",
      headingPrefix: "Sun, ",
      headingEmphasis: "sealed",
      headingSuffix: " in acetate.",
      copy: "Ray-Ban classics — Wayfarer, Aviator, Round Metal, Clubround. Polarised lenses, ready to wear.",
      imageUrl: "/products/rb2140-wayfarer.jpg",
      ctaLabel: "Shop Sunglasses",
      ctaLink: "/sunglasses",
    },
    {
      kicker: "Collection · 04 · Optical",
      headingPrefix: "Optical, ",
      headingEmphasis: "precisely",
      headingSuffix: " made.",
      copy: "Italian titanium rimless and acetate frames — prescription-ready, hand-finished in Italy.",
      imageUrl: "/products/essences-r6084.jpg",
      ctaLabel: "View Optical Frames",
      ctaLink: "/optical",
    },
  ],
  trustPoints: [
    {
      title: "Hand-Selected & Authenticated",
      description: "Every piece is sourced, inspected and verified by our curators before it reaches you.",
    },
    {
      title: "Private WhatsApp Inquiry",
      description: "No carts, no checkouts. Each inquiry is answered personally by a single dedicated curator.",
    },
    {
      title: "Bangladesh-Wide Delivery",
      description: "Discreetly packaged and delivered nationwide from Dhaka. Cash on delivery available in Dhaka.",
    },
  ],
  promoBanners: [
    {
      kicker: "Parfumerie",
      headingPrefix: "Rare materials, ",
      headingEmphasis: "quietly",
      headingSuffix: " bottled.",
      paragraph:
        "From Mysore sandalwood to grey ambergris, our parfumerie favours scents composed with patience — house exclusives, archive editions, and discontinued favourites.",
      imageUrl: heroPerfume,
      imagePosition: "left",
      ctaLabel: "Enter the Parfumerie",
      ctaLink: "/perfumes",
    },
    {
      kicker: "Sunglasses",
      headingPrefix: "Sun, ",
      headingEmphasis: "sealed",
      headingSuffix: " in acetate.",
      paragraph:
        "Aviator, Wayfarer, Round Metal, Clubround — polarised G-15 and gradient lenses, Ray-Ban classics, ready to wear.",
      imageUrl: "/products/rb4246-clubround.jpg",
      imagePosition: "right",
      ctaLabel: "Shop Sunglasses",
      ctaLink: "/sunglasses",
    },
    {
      kicker: "Optical",
      headingPrefix: "Optical, ",
      headingEmphasis: "precisely",
      headingSuffix: " made.",
      paragraph:
        "Italian titanium rimless and acetate frames — prescription-ready, blue-light options, hand-finished in Italy.",
      imageUrl: "/products/essences-6020-rimless.jpg",
      imagePosition: "left",
      ctaLabel: "View Optical Frames",
      ctaLink: "/optical",
    },
  ],
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => sanityClient.fetch<SanitySiteSettings>(SITE_SETTINGS_QUERY),
    placeholderData: () => FALLBACK_SITE_SETTINGS,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHomepage() {
  return useQuery({
    queryKey: ["homepage"],
    queryFn: async () => {
      const doc = await sanityClient.fetch<SanityHomepage>(HOMEPAGE_QUERY);
      return {
        heroSlides: doc.heroSlides.map(toHeroSlideView),
        trustPoints: doc.trustPoints,
        promoBanners: doc.promoBanners.map(toPromoBannerView),
      };
    },
    placeholderData: () => FALLBACK_HOMEPAGE,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInquiryLink(channel: InquiryChannel = "watches", productName?: string) {
  const { data } = useSiteSettings();
  const phones = data?.phones ?? FALLBACK_SITE_SETTINGS.phones;
  return buildInquiryLink(phones, channel, productName);
}
