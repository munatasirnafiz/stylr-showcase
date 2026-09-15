import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useWatches, useWatchBrands } from "@/hooks/useProducts";
import heroWatches from "@/assets/hero-watches.jpg";

export const Route = createFileRoute("/watches")({
  validateSearch: (search: Record<string, unknown>): { brand?: string } => ({
    brand: typeof search.brand === "string" ? search.brand : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Watches — Rare Timepieces · Stylr.store Dhaka" },
      { name: "description", content: "A curated collection of rare and pre-owned timepieces — Rolex, Omega and beyond. Private inquiry by WhatsApp." },
      { property: "og:title", content: "Watches — Stylr.store" },
      { property: "og:description", content: "Hand-selected rare timepieces, by private inquiry." },
    ],
  }),
  component: WatchesPage,
});

const toggleItemClass =
  "border border-hairline px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-ink hover:text-ink data-[state=on]:border-gold data-[state=on]:text-gold-deep data-[state=on]:bg-transparent rounded-none";

function WatchesPage() {
  const { data: watches, isLoading, isError } = useWatches();
  const { data: brandsData } = useWatchBrands();
  const brands = brandsData ?? [];
  const { brand } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = brand ? watches?.filter((w) => w.brand === brand) : watches;

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="absolute inset-0 opacity-40">
          <img src={heroWatches} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 01</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Timepieces, <span className="italic">carefully</span> kept.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            Each timepiece is authenticated by our atelier in Mirpur-2 and delivered with full documentation, Bangladesh-wide.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-12">
          <SectionLabel>The Vault</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">
            {isLoading
              ? "Loading the vault…"
              : `${filtered?.length ?? 0} piece${filtered?.length === 1 ? "" : "s"}${brand ? ` from ${brand}` : ""}, in residence.`}
          </h2>
        </div>
        {brands.length > 0 && (
          <ToggleGroup
            type="single"
            value={brand ?? ""}
            onValueChange={(value) => navigate({ search: { brand: value || undefined } })}
            className="flex-wrap justify-start gap-2 mb-10"
          >
            <ToggleGroupItem value="" className={toggleItemClass}>
              All
            </ToggleGroupItem>
            {brands.map((b) => (
              <ToggleGroupItem key={b} value={b} className={toggleItemClass}>
                {b}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError || !filtered?.length ? (
            <ProductGridEmpty
              channel="watches"
              label={brand ? `No timepieces from ${brand} right now.` : "No timepieces in residence right now."}
            />
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} channel="watches" productType="watch" />)
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
