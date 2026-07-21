import { Heart } from "lucide-react";
import { useInquiryLink } from "@/hooks/useSiteContent";
import { useLogInquiry } from "@/hooks/useInquiries";
import { useFavoriteIds, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  ref: string;
  brand?: string;
  gender?: "men" | "women" | "unisex";
  name: string;
  specs: string[];
  image: string;
  price?: number;
}

export type ProductType = "watch" | "perfume" | "sunglasses" | "optical";

export function ProductCard({
  product,
  channel,
  productType,
}: {
  product: Product;
  channel: "watches" | "perfumes" | "eyewear";
  productType: ProductType;
}) {
  const href = useInquiryLink(channel, product.name);
  const { user } = useAuth();
  const favoriteIds = useFavoriteIds();
  const toggleFavorite = useToggleFavorite();
  const logInquiry = useLogInquiry();
  const isFavorited = favoriteIds.has(product.id);

  return (
    <article className="card-lux group flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(28,26,23,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={isFavorited ? "Remove from favorites" : "Save to favorites"}
          onClick={() => toggleFavorite.mutate({ productId: product.id, productType, isFavorited })}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
        >
          <Heart
            size={18}
            className={cn("transition-colors", isFavorited ? "fill-gold text-gold" : "text-ink")}
          />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="kicker">{product.ref}</span>
          {product.brand && <span className="eyebrow text-muted-ink">{product.brand}</span>}
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
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (user) {
              logInquiry.mutate({
                productId: product.id,
                productType,
                productName: product.name,
                channel,
              });
            }
          }}
          className="mt-6 inline-flex items-center justify-center gap-2 border border-gold text-gold-deep hover:bg-gold hover:text-charcoal transition-colors px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-medium"
        >
          Inquire
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
