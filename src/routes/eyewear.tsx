import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { eyewear, type EyewearKind } from "@/data/products";

export const Route = createFileRoute("/eyewear")({
  head: () => ({
    meta: [
      { title: "Eyewear — Sunglasses & Optical · Stylr.store Dhaka" },
      { name: "description", content: "Curated sunglasses and optical frames — hand-selected for fit and finish. Private WhatsApp inquiry, Bangladesh-wide delivery." },
      { property: "og:title", content: "Eyewear — Stylr.store" },
      { property: "og:description", content: "Sun and optical frames, hand-selected for fit and finish." },
    ],
  }),
  component: EyewearPage,
});

type Filter = "all" | EyewearKind;
const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sunglasses", label: "Sunglasses" },
  { id: "optical", label: "Optical" },
];

function EyewearPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? eyewear : eyewear.filter((e) => e.kind === filter);

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 03</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Frames worth <span className="italic">being seen</span> in.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            Sun and optical — hand-selected for fit, finish and quiet confidence. Polarised classics and Italian-made acetate, ready to wear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionLabel>The Eyewear Edit</SectionLabel>
            <h2 className="font-serif text-3xl text-ink mt-4">{items.length} frames, currently in stock.</h2>
          </div>
          <div className="inline-flex border border-hairline bg-surface self-start">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors ${
                  filter === t.id ? "bg-charcoal text-ivory" : "text-muted-ink hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {items.map((p) => (
            <ProductCard key={p.ref} product={p} channel="eyewear" />
          ))}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
