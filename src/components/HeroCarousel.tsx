import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@tanstack/react-router";
import { useHomepage, FALLBACK_HOMEPAGE } from "@/hooks/useSiteContent";

export function HeroCarousel() {
  const { data } = useHomepage();
  const slides = data?.heroSlides ?? FALLBACK_HOMEPAGE.heroSlides;
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
          {slides.map((s, i) => (
            <div key={i} className="relative shrink-0 grow-0 basis-full">
              <div className="absolute inset-0">
                <img src={s.imageUrl} alt="" className="h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/30" />
              </div>
              <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36 lg:py-44 min-h-[520px] md:min-h-[620px] flex items-center">
                <div className="max-w-2xl">
                  <p className="kicker" style={{ color: "#C9A227" }}>{s.kicker}</p>
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
                    {s.headingPrefix}
                    {s.headingEmphasis && <span className="italic text-gold">{s.headingEmphasis}</span>}
                    {s.headingSuffix}
                  </h1>
                  <p className="mt-7 text-ivory/75 text-lg max-w-lg leading-relaxed">{s.copy}</p>
                  <div className="mt-10">
                    <Link
                      to={s.ctaLink}
                      className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em]"
                    >
                      {s.ctaLabel} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
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
