import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import {
  useFeaturedWatches,
  useFeaturedPerfumes,
  useFeaturedSunglasses,
  useFeaturedOptical,
} from "@/hooks/useProducts";
import { useHomepage, FALLBACK_HOMEPAGE } from "@/hooks/useSiteContent";
import type { PromoBannerView } from "@/lib/adapters";

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

function renderBanner(b: PromoBannerView) {
  const imageCol = b.imagePosition === "left" ? "order-2 lg:order-1" : "";
  const copyCol = b.imagePosition === "left" ? "order-1 lg:order-2" : "";
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className={`aspect-[4/5] overflow-hidden ${imageCol}`}>
        <img src={b.imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <div className={copyCol}>
        <p className="kicker" style={{ color: "#C9A227" }}>{b.kicker}</p>
        <h2 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
          {b.headingPrefix}
          {b.headingEmphasis && <span className="italic">{b.headingEmphasis}</span>}
          {b.headingSuffix}
        </h2>
        <p className="mt-6 text-ivory/70 text-lg leading-relaxed max-w-md">{b.paragraph}</p>
        <div className="mt-10">
          <Link
            to={b.ctaLink}
            className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em]"
          >
            {b.ctaLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { data: featuredWatches, isLoading: watchesLoading, isError: watchesError } = useFeaturedWatches();
  const { data: featuredPerfumes, isLoading: perfumesLoading, isError: perfumesError } = useFeaturedPerfumes();
  const { data: featuredSunglasses, isLoading: sunglassesLoading, isError: sunglassesError } = useFeaturedSunglasses();
  const { data: featuredOptical, isLoading: opticalLoading, isError: opticalError } = useFeaturedOptical();
  const { data: homepage } = useHomepage();
  const { trustPoints, promoBanners } = homepage ?? FALLBACK_HOMEPAGE;

  return (
    <>
      <HeroCarousel />

      {/* TRUST STRIP */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-12">
          {trustPoints.map((t, i) => (
            <div key={i}>
              <span className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="gold-rule ml-4 align-middle" />
              <h3 className="font-serif text-xl text-ink mt-5">{t.title}</h3>
              <p className="text-muted-ink text-sm mt-3 leading-relaxed">{t.description}</p>
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
          {watchesLoading ? (
            <ProductGridSkeleton count={4} />
          ) : watchesError || !featuredWatches?.length ? (
            <ProductGridEmpty channel="watches" label="Featured timepieces are being curated." />
          ) : (
            featuredWatches.map((p) => <ProductCard key={p.id} product={p} channel="watches" productType="watch" />)
          )}
        </div>
      </section>

      {/* PARFUMERIE BANNER */}
      <section className="bg-charcoal text-ivory">
        {renderBanner(promoBanners[0])}
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
          {perfumesLoading ? (
            <ProductGridSkeleton count={4} />
          ) : perfumesError || !featuredPerfumes?.length ? (
            <ProductGridEmpty channel="perfumes" label="Signature perfumes are being curated." />
          ) : (
            featuredPerfumes.map((p) => <ProductCard key={p.id} product={p} channel="perfumes" productType="perfume" />)
          )}
        </div>
      </section>

      {/* SUNGLASSES BANNER */}
      <section className="bg-charcoal text-ivory">
        {renderBanner(promoBanners[1])}
      </section>

      {/* FEATURED SUNGLASSES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>The Sun Edit</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-5">Featured Sunglasses</h2>
          </div>
          <Link to="/sunglasses" className="text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-gold border-b border-gold pb-1 self-start md:self-end">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sunglassesLoading ? (
            <ProductGridSkeleton count={4} />
          ) : sunglassesError || !featuredSunglasses?.length ? (
            <ProductGridEmpty channel="eyewear" label="Featured sunglasses are being curated." />
          ) : (
            featuredSunglasses.map((p) => <ProductCard key={p.id} product={p} channel="eyewear" productType="sunglasses" />)
          )}
        </div>
      </section>

      {/* OPTICAL BANNER */}
      <section className="bg-charcoal text-ivory">
        {renderBanner(promoBanners[2])}
      </section>

      {/* FEATURED OPTICAL */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel>The Optical Edit</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-5">Featured Optical</h2>
          </div>
          <Link to="/optical" className="text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-gold border-b border-gold pb-1 self-start md:self-end">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {opticalLoading ? (
            <ProductGridSkeleton count={4} />
          ) : opticalError || !featuredOptical?.length ? (
            <ProductGridEmpty channel="eyewear" label="Featured optical frames are being curated." />
          ) : (
            featuredOptical.map((p) => <ProductCard key={p.id} product={p} channel="eyewear" productType="optical" />)
          )}
        </div>
      </section>


      <ClosingCTA />
    </>
  );
}
