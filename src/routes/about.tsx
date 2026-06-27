import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import aboutImg from "@/assets/about-boutique.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — A Quiet Maison in Dhaka · Stylr.store" },
      { name: "description", content: "Stylr.store is a private, curator-led boutique for rare watches and niche perfumes, founded in Mirpur-2, Dhaka." },
      { property: "og:title", content: "About — Stylr.store" },
      { property: "og:description", content: "A quiet maison for the discerning, founded in Dhaka." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-24 lg:py-32 text-center">
        <SectionLabel>Our Story</SectionLabel>
        <h1 className="font-serif text-5xl md:text-6xl text-ink mt-6 leading-[1.05]">
          A quiet maison for those who<br /><span className="italic">already know</span> what they want.
        </h1>
        <p className="mt-8 text-muted-ink text-lg leading-relaxed max-w-2xl mx-auto">
          Stylr.store began as a private notebook of contacts — a small list of trusted ateliers, perfumers and watch dealers that we relied on for our own collections. Today it is a boutique, but the philosophy is unchanged: source quietly, verify thoroughly, deliver personally.
        </p>
      </section>

      <section className="w-full">
        <img src={aboutImg} alt="Inside the Stylr atelier" className="w-full h-[60vh] object-cover" />
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-24 space-y-12">
        <div>
          <SectionLabel>Curation</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">Selection, not assortment.</h2>
          <p className="mt-5 text-muted-ink leading-relaxed">
            We carry pieces we would wear ourselves. Every reference in our vault has been chosen for the integrity of its build, the patience of its design and the quietness of its presence on the wrist or the skin. There is no algorithm, no trending tab — only the slow accumulation of taste.
          </p>
        </div>
        <div>
          <SectionLabel>Craftsmanship</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">Trust, built across borders.</h2>
          <p className="mt-5 text-muted-ink leading-relaxed">
            Each watch is inspected and serviced by our partner watchmakers before despatch. Every flacon is verified for authenticity and seal integrity. We work with insured couriers and discreet packaging so that what arrives feels exactly as it should — considered, intact, personal.
          </p>
        </div>
        <div>
          <SectionLabel>Concierge</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">One conversation, one curator.</h2>
          <p className="mt-5 text-muted-ink leading-relaxed">
            We deliberately do not run a checkout. Every inquiry is handled by a single curator on WhatsApp — the same person from first message to final delivery. If a piece is not in our vault, we will source it.
          </p>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
