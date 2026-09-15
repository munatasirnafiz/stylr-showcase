import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridState";
import { useFavorites } from "@/hooks/useFavorites";
import {
  useWatchesByIds,
  usePerfumesByIds,
  useSunglassesByIds,
  useOpticalByIds,
} from "@/hooks/useProducts";
import type { ProductCategory } from "@/lib/supabase/types";

export const Route = createFileRoute("/account/favorites")({
  head: () => ({
    meta: [{ title: "My Favorites — Stylr.store" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { data: favorites, isLoading: favoritesLoading } = useFavorites();

  const idsByType = useMemo(() => {
    const map: Record<ProductCategory, string[]> = {
      watch: [],
      perfume: [],
      sunglasses: [],
      optical: [],
    };
    for (const f of favorites ?? []) map[f.product_type].push(f.product_id);
    return map;
  }, [favorites]);

  const watchesQuery = useWatchesByIds(idsByType.watch);
  const perfumesQuery = usePerfumesByIds(idsByType.perfume);
  const sunglassesQuery = useSunglassesByIds(idsByType.sunglasses);
  const opticalQuery = useOpticalByIds(idsByType.optical);

  const isLoading =
    favoritesLoading ||
    watchesQuery.isLoading ||
    perfumesQuery.isLoading ||
    sunglassesQuery.isLoading ||
    opticalQuery.isLoading;

  const items = [
    ...(watchesQuery.data ?? []).map((product) => ({
      product,
      channel: "watches" as const,
      productType: "watch" as const,
    })),
    ...(perfumesQuery.data ?? []).map((product) => ({
      product,
      channel: "perfumes" as const,
      productType: "perfume" as const,
    })),
    ...(sunglassesQuery.data ?? []).map((product) => ({
      product,
      channel: "eyewear" as const,
      productType: "sunglasses" as const,
    })),
    ...(opticalQuery.data ?? []).map((product) => ({
      product,
      channel: "eyewear" as const,
      productType: "optical" as const,
    })),
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ProductGridSkeleton count={3} />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-16">
        <p className="kicker">Nothing saved yet</p>
        <h3 className="font-serif text-2xl text-ink mt-4">Your favorites list is empty.</h3>
        <p className="mt-3 text-muted-ink">Heart a piece from the collection to save it here.</p>
        <div className="mt-8">
          <Link
            to="/watches"
            className="inline-flex items-center gap-2 border border-gold text-gold-deep px-7 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition-colors"
          >
            Browse the Collection →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {items.map(({ product, channel, productType }) => (
        <ProductCard
          key={product.id}
          product={product}
          channel={channel}
          productType={productType}
        />
      ))}
    </div>
  );
}
