import { inquiryLink } from "@/data/contact";

export interface Product {
  ref: string;
  brand?: string;
  name: string;
  specs: string[];
  image: string;
  price?: number;
}

export function ProductCard({
  product,
  channel,
}: {
  product: Product;
  channel: "watches" | "perfumes" | "concierge";
}) {
  return (
    <article className="card-lux group flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(28,26,23,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="kicker">{product.ref}</span>
          {product.brand && (
            <span className="eyebrow text-muted-ink">{product.brand}</span>
          )}
        </div>
        <h3 className="font-serif text-xl text-ink mt-3 leading-snug">{product.name}</h3>
        <ul className="mt-4 space-y-1.5 text-sm text-muted-ink flex-1">
          {product.specs.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-gold">·</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        {product.price !== undefined && (
          <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-4">
            <span className="eyebrow text-muted-ink">Price</span>
            <span className="font-serif text-lg text-ink">
              ৳ {product.price.toLocaleString("en-BD")}
            </span>
          </div>
        )}
        <a
          href={inquiryLink(channel, product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 border border-gold text-gold-deep hover:bg-gold hover:text-charcoal transition-colors px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-medium"
        >
          Inquire
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
