import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import {
  toWatchProduct,
  toPerfumeProduct,
  toSunglassesProduct,
  toOpticalProduct,
} from "@/lib/adapters";
import {
  ALL_WATCHES_QUERY,
  FEATURED_WATCHES_QUERY,
  WATCH_BRANDS_QUERY,
  ALL_PERFUMES_QUERY,
  FEATURED_PERFUMES_QUERY,
  ALL_SUNGLASSES_QUERY,
  FEATURED_SUNGLASSES_QUERY,
  ALL_OPTICAL_QUERY,
  FEATURED_OPTICAL_QUERY,
} from "@/lib/queries";
import type { Product } from "@/components/ProductCard";

function useSanityList<TDoc>(key: readonly unknown[], query: string, map: (doc: TDoc) => Product) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const docs = await sanityClient.fetch<TDoc[]>(query);
      return docs.map(map);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export const useWatches = () => useSanityList(["watches", "all"], ALL_WATCHES_QUERY, toWatchProduct);
export const useFeaturedWatches = () => useSanityList(["watches", "featured"], FEATURED_WATCHES_QUERY, toWatchProduct);

export const useWatchBrands = () =>
  useQuery({
    queryKey: ["watches", "brands"],
    queryFn: async () => {
      const brands = await sanityClient.fetch<string[]>(WATCH_BRANDS_QUERY);
      return [...brands].sort((a, b) => a.localeCompare(b));
    },
    placeholderData: [],
    staleTime: 5 * 60 * 1000,
  });

export const usePerfumes = () => useSanityList(["perfumes", "all"], ALL_PERFUMES_QUERY, toPerfumeProduct);
export const useFeaturedPerfumes = () => useSanityList(["perfumes", "featured"], FEATURED_PERFUMES_QUERY, toPerfumeProduct);

export const useSunglasses = () => useSanityList(["sunglasses", "all"], ALL_SUNGLASSES_QUERY, toSunglassesProduct);
export const useFeaturedSunglasses = () => useSanityList(["sunglasses", "featured"], FEATURED_SUNGLASSES_QUERY, toSunglassesProduct);

export const useOptical = () => useSanityList(["optical", "all"], ALL_OPTICAL_QUERY, toOpticalProduct);
export const useFeaturedOptical = () => useSanityList(["optical", "featured"], FEATURED_OPTICAL_QUERY, toOpticalProduct);
