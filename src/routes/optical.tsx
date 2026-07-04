import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import { useOptical } from "@/hooks/useProducts";

export const Route = createFileRoute("/optical")({
  head: () => ({
    meta: [
      { title: "Optical Frames — Italian-Made · Stylr.store Dhaka" },
      { name: "description", content: "Curated optical frames — Ray-Ban semi-rimless and Essences Occhiali Italian titanium and acetate. Prescription-ready, blue-light options. Bangladesh-wide delivery." },
      { property: "og:title", content: "Optical Frames — Stylr.store" },
      { property: "og:description", content: "Italian-made optical frames, prescription-ready." },
    ],
  }),
  component: OpticalPage,
});

function OpticalPage() {
  const { data: optical, isLoading, isError } = useOptical();

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 04 · Optical</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Optical, <span className="italic">precisely</span> made.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            Italian titanium rimless and acetate frames — prescription-ready, blue-light options, hand-finished in Italy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-10">
          <SectionLabel>The Optical Edit</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">
            {isLoading ? "Loading the optical edit…" : `${optical?.length ?? 0} optical frames, currently in stock.`}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError || !optical?.length ? (
            <ProductGridEmpty channel="eyewear" label="No optical frames in stock right now." />
          ) : (
            optical.map((p) => <ProductCard key={p.ref} product={p} channel="eyewear" />)
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
