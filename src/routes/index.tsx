import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { HeroCarousel } from "@/components/HeroCarousel";
import { featuredWatches, featuredPerfumes, featuredEyewear } from "@/data/products";
import heroPerfume from "@/assets/hero-perfume.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stylr.store — Timepieces, Parfums & Eyewear · Dhaka" },
      { name: "description", content: "Stylr.store is a Dhaka-based curated boutique for rare watches, niche perfumes and considered eyewear. Private WhatsApp inquiry, Bangladesh-wide delivery." },
      { property: "og:title", content: "Stylr.store — Timepieces, Parfums & Eyewear" },
      { property: "og:description", content: "Hand-selected rare watches, niche perfumes and eyewear, by private inquiry." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* TRUST STRIP */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "Hand-Selected & Authenticated", d: "Every piece is sourced, inspected and verified by our curators before it reaches you." },
            { n: "02", t: "Private WhatsApp Inquiry", d: "No carts, no checkouts. Each inquiry is answered personally by a single dedicated curator." },
            { n: "03", t: "Bangladesh-Wide Delivery", d: "Discreetly packaged and delivered nationwide from Dhaka. Cash on delivery available in Dhaka." },
          ].map((b) => (
            <div key={b.n}>
              <span className="font-serif text-3xl text-gold">{b.n}</span>
              <span className="gold-rule ml-4 align-middle" />
              <h3 className="font-serif text-xl text-ink mt-5">{b.t}</h3>
              <p className="text-muted-ink text-sm mt-3 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WATCHES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>The Collection</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-5">Featured Timepieces</h2>
          </div>
          <Link to="/watches" className="text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-gold border-b border-gold pb-1 self-start md:self-end">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredWatches.map((p) => (
            <ProductCard key={p.ref} product={p} channel="watches" />
          ))}
        </div>
      </section>

      {/* PARFUMERIE BANNER */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="aspect-[4/5] overflow-hidden order-2 lg:order-1">
            <img src={heroPerfume} alt="Niche perfumery" className="h-full w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="kicker" style={{ color: "#C9A227" }}>Parfumerie</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
              Rare materials, <span className="italic">quietly</span> bottled.
            </h2>
            <p className="mt-6 text-ivory/70 text-lg leading-relaxed max-w-md">
              From Mysore sandalwood to grey ambergris, our parfumerie favours scents composed with patience — house exclusives, archive editions, and discontinued favourites.
            </p>
            <div className="mt-10">
              <Link
                to="/perfumes"
                className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em]"
              >
                Enter the Parfumerie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PERFUMES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>The Parfumerie</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-5">Signature Perfumes</h2>
          </div>
          <Link to="/perfumes" className="text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-gold border-b border-gold pb-1 self-start md:self-end">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredPerfumes.map((p) => (
            <ProductCard key={p.ref} product={p} channel="perfumes" />
          ))}
        </div>
      </section>

      {/* EYEWEAR BANNER */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="kicker" style={{ color: "#C9A227" }}>Eyewear</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
              Frames worth <span className="italic">being seen</span> in.
            </h2>
            <p className="mt-6 text-ivory/70 text-lg leading-relaxed max-w-md">
              Sun and optical — hand-selected for fit and finish. Polarised Ray-Ban classics alongside Italian-made acetate optical frames.
            </p>
            <div className="mt-10">
              <Link
                to="/eyewear"
                className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em]"
              >
                View the Eyewear Edit →
              </Link>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="/products/rb4246-clubround.jpg" alt="Eyewear collection" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* FEATURED EYEWEAR */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>The Eyewear Edit</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-5">Featured Eyewear</h2>
          </div>
          <Link to="/eyewear" className="text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-gold border-b border-gold pb-1 self-start md:self-end">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredEyewear.map((p) => (
            <ProductCard key={p.ref} product={p} channel="eyewear" />
          ))}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
