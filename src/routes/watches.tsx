import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { watches } from "@/data/products";
import heroWatches from "@/assets/hero-watches.jpg";

export const Route = createFileRoute("/watches")({
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

function WatchesPage() {
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
            Each timepiece is authenticated by our atelier in Mirpur-2 and delivered with full documentation, worldwide.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-12">
          <SectionLabel>The Vault</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">{watches.length} pieces, in residence.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {watches.map((p) => (
            <ProductCard key={p.ref} product={p} channel="watches" />
          ))}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
