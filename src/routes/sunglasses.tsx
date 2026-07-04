import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import { useSunglasses } from "@/hooks/useProducts";

export const Route = createFileRoute("/sunglasses")({
  head: () => ({
    meta: [
      { title: "Sunglasses — Ray-Ban & Beyond · Stylr.store Dhaka" },
      { name: "description", content: "Curated Ray-Ban sunglasses — Aviator, Wayfarer, Round Metal, Clubround. Polarised lenses, UV400. Private WhatsApp inquiry, Bangladesh-wide delivery." },
      { property: "og:title", content: "Sunglasses — Stylr.store" },
      { property: "og:description", content: "Polarised classics, hand-selected in Dhaka." },
    ],
  }),
  component: SunglassesPage,
});

function SunglassesPage() {
  const { data: sunglasses, isLoading, isError } = useSunglasses();

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 03 · Sun</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Sun, <span className="italic">sealed</span> in acetate.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            Aviator, Wayfarer, Round Metal, Clubround — polarised G-15 and gradient lenses, ready to wear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-10">
          <SectionLabel>The Sun Edit</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">
            {isLoading ? "Loading the sun edit…" : `${sunglasses?.length ?? 0} sunglasses, currently in stock.`}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError || !sunglasses?.length ? (
            <ProductGridEmpty channel="eyewear" label="No sunglasses in stock right now." />
          ) : (
            sunglasses.map((p) => <ProductCard key={p.ref} product={p} channel="eyewear" />)
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
