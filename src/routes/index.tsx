import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, CTAButton, ClosingCTA } from "@/components/ui-bits";
import { featuredWatches, featuredPerfumes } from "@/data/products";
import { inquiryLink } from "@/data/contact";
import heroWatches from "@/assets/hero-watches.jpg";
import heroPerfume from "@/assets/hero-perfume.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stylr.store — Timepieces & Parfums d'Exception · Dhaka" },
      { name: "description", content: "Stylr.store is a Dhaka-based curated boutique for rare watches and niche perfumes. Private WhatsApp concierge, worldwide insured delivery." },
      { property: "og:title", content: "Stylr.store — Timepieces & Parfums d'Exception" },
      { property: "og:description", content: "Hand-selected rare watches and niche perfumes, by private inquiry." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 py-20 lg:py-28 items-center">
          <div>
            <p className="kicker">Stylr · Dhaka</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mt-6">
              Timepieces<br />
              <span className="italic text-gold-deep">&</span> Parfums<br />
              d'Exception.
            </h1>
            <p className="mt-8 text-muted-ink text-lg max-w-md leading-relaxed">
              A private maison for the quietly discerning — rare watches and niche fragrances, hand-selected and delivered with care from Dhaka to the world.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton to="/watches" variant="filled">Discover Watches</CTAButton>
              <CTAButton to="/perfumes" variant="outline">Explore Perfumes →</CTAButton>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-charcoal shadow-[0_30px_80px_-30px_rgba(28,26,23,0.45)]">
              <img src={heroWatches} alt="Featured timepiece" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden md:block bg-surface border border-hairline px-6 py-5 max-w-[220px]">
              <p className="eyebrow">Established</p>
              <p className="font-serif text-2xl text-ink mt-1">Dhaka · BD</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "Hand-Selected & Authenticated", d: "Every piece is sourced, inspected and verified by our curators before it reaches you." },
            { n: "02", t: "Private WhatsApp Concierge", d: "No carts, no checkouts. Each inquiry is answered personally by a single dedicated curator." },
            { n: "03", t: "Worldwide Insured Delivery", d: "Fully insured, discreetly packaged, and tracked from Dhaka to your doorstep, wherever you are." },
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

      <ClosingCTA />
    </>
  );
}
