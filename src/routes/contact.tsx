import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/ui-bits";
import { CONTACT, inquiryLink } from "@/data/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Private Concierge · Stylr.store Dhaka" },
      { name: "description", content: "Reach our private concierge by WhatsApp. Address, phone and inquiry lines for Stylr.store, Mirpur-2, Dhaka." },
      { property: "og:title", content: "Contact — Stylr.store" },
      { property: "og:description", content: "Start a private inquiry by WhatsApp." },
    ],
  }),
  component: ContactPage,
});

const lines = [
  { label: "Concierge · General", phone: CONTACT.concierge.phone, wa: CONTACT.concierge.wa, note: "First point of contact for all inquiries." },
  { label: "Watches Line", phone: CONTACT.watches.phone, wa: CONTACT.watches.wa, note: "Direct line for timepiece curators." },
  { label: "Perfumes Line", phone: CONTACT.perfumes.phone, wa: CONTACT.perfumes.wa, note: "Direct line for the parfumerie atelier." },
];

const mapQuery = encodeURIComponent("KAKOLI Apartment 562, Middle Monipur, Mirpur-2, Dhaka, Bangladesh");

function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-28">
        <SectionLabel>Concierge</SectionLabel>
        <h1 className="font-serif text-5xl md:text-6xl text-ink mt-6 leading-[1.05] max-w-3xl">
          Start a <span className="italic">private</span> inquiry.
        </h1>
        <p className="mt-6 text-muted-ink text-lg max-w-xl">
          Tell us what you're looking for. A curator will respond personally, usually within a few hours.
        </p>
        <div className="mt-10">
          <a
            href={inquiryLink("concierge")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-charcoal text-ivory hover:bg-ink transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium"
          >
            Start a WhatsApp Inquiry →
          </a>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <SectionLabel>Atelier</SectionLabel>
            <h2 className="font-serif text-2xl text-ink mt-4">Mirpur-2, Dhaka</h2>
            <address className="not-italic mt-4 text-muted-ink leading-relaxed">
              KAKOLI Apartment 562<br />
              Middle Monipur, Mirpur-2<br />
              Dhaka, Bangladesh
            </address>
            <p className="mt-6 text-muted-ink">
              <span className="eyebrow block mb-1">Email</span>
              <a href={`mailto:${CONTACT.email}`} className="text-ink hover:text-gold transition-colors">{CONTACT.email}</a>
            </p>
            <p className="mt-6 text-muted-ink">
              <span className="eyebrow block mb-1">Hours</span>
              By appointment only · 11:00 – 20:00 BST
            </p>
          </div>
          <div className="lg:col-span-2 space-y-5">
            {lines.map((l) => (
              <div key={l.label} className="card-lux p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="eyebrow">{l.label}</span>
                  <p className="font-serif text-xl text-ink mt-2">{l.phone}</p>
                  <p className="text-sm text-muted-ink mt-1">{l.note}</p>
                </div>
                <a
                  href={l.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold text-gold-deep hover:bg-gold hover:text-charcoal transition-colors px-6 py-3 text-xs uppercase tracking-[0.22em] shrink-0"
                >
                  WhatsApp →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <SectionLabel>Locate Us</SectionLabel>
        <h2 className="font-serif text-3xl text-ink mt-4 mb-8">Find the atelier</h2>
        <div className="aspect-[16/8] w-full overflow-hidden border border-hairline bg-surface">
          <iframe
            title="Stylr.store location · Mirpur-2 Dhaka"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
