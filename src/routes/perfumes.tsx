import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import { usePerfumes } from "@/hooks/useProducts";
import heroPerfume from "@/assets/hero-perfume.jpg";

export const Route = createFileRoute("/perfumes")({
  head: () => ({
    meta: [
      { title: "Perfumes — Niche Parfumerie · Stylr.store Dhaka" },
      { name: "description", content: "A curated parfumerie of niche, designer and archive fragrances. Private inquiry by WhatsApp." },
      { property: "og:title", content: "Perfumes — Stylr.store" },
      { property: "og:description", content: "Hand-selected niche and designer perfumes." },
    ],
  }),
  component: PerfumesPage,
});

function PerfumesPage() {
  const { data: perfumes, isLoading, isError } = usePerfumes();

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="absolute inset-0 opacity-50">
          <img src={heroPerfume} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 02</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Parfums, <span className="italic">quietly</span> kept.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            From house exclusives to discontinued cult favourites — every flacon is verified and sealed before it leaves Dhaka.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-12">
          <SectionLabel>The Parfumerie</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">
            {isLoading ? "Loading the parfumerie…" : `${perfumes?.length ?? 0} flacons, currently in stock.`}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError || !perfumes?.length ? (
            <ProductGridEmpty channel="perfumes" label="No flacons in stock right now." />
          ) : (
            perfumes.map((p) => <ProductCard key={p.ref} product={p} channel="perfumes" />)
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
