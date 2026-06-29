import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@tanstack/react-router";
import heroWatches from "@/assets/hero-watches.jpg";
import heroPerfume from "@/assets/hero-perfume.jpg";

type Slide = {
  kicker: string;
  title: React.ReactNode;
  copy: string;
  image: string;
  to: "/watches" | "/perfumes" | "/sunglasses" | "/optical";
  cta: string;
};

const SLIDES: Slide[] = [
  {
    kicker: "Collection · 01",
    title: <>Timepieces <span className="italic text-gold">d'exception.</span></>,
    copy: "Rare Rolex, Audemars Piguet, Omega and beyond — hand-selected and authenticated in Dhaka.",
    image: heroWatches,
    to: "/watches",
    cta: "Discover Watches",
  },
  {
    kicker: "Collection · 02",
    title: <>Parfums, <span className="italic text-gold">quietly</span> kept.</>,
    copy: "Niche houses, house exclusives and discontinued cult favourites — every flacon verified.",
    image: heroPerfume,
    to: "/perfumes",
    cta: "Enter the Parfumerie",
  },
  {
    kicker: "Collection · 03 · Sun",
    title: <>Sun, <span className="italic text-gold">sealed</span> in acetate.</>,
    copy: "Ray-Ban classics — Wayfarer, Aviator, Round Metal, Clubround. Polarised lenses, ready to wear.",
    image: "/products/rb2140-wayfarer.jpg",
    to: "/sunglasses",
    cta: "Shop Sunglasses",
  },
  {
    kicker: "Collection · 04 · Optical",
    title: <>Optical, <span className="italic text-gold">precisely</span> made.</>,
    copy: "Italian titanium rimless and acetate frames — prescription-ready, hand-finished in Italy.",
    image: "/products/essences-r6084.jpg",
    to: "/optical",
    cta: "View Optical Frames",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="relative bg-charcoal text-ivory">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative shrink-0 grow-0 basis-full">
              <div className="absolute inset-0">
                <img src={s.image} alt="" className="h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/30" />
              </div>
              <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36 lg:py-44 min-h-[520px] md:min-h-[620px] flex items-center">
                <div className="max-w-2xl">
                  <p className="kicker" style={{ color: "#C9A227" }}>{s.kicker}</p>
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
                    {s.title}
                  </h1>
                  <p className="mt-7 text-ivory/75 text-lg max-w-lg leading-relaxed">{s.copy}</p>
                  <div className="mt-10">
                    <Link
                      to={s.to}
                      className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em]"
                    >
                      {s.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-[2px] transition-all ${selected === i ? "w-10 bg-gold" : "w-6 bg-ivory/40 hover:bg-ivory/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
