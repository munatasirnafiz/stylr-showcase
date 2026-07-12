import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useWatches, usePerfumes, useSunglasses, useOptical } from "@/hooks/useProducts";
import type { Product } from "@/components/ProductCard";
import { useInquiryLink } from "@/hooks/useSiteContent";
import type { InquiryChannel } from "@/data/contact";

function SearchResultOverlay({ product, channel }: { product: Product; channel: InquiryChannel }) {
  const href = useInquiryLink(channel, product.name);
  return (
    <div className="group flex gap-4 bg-surface border border-hairline p-6 pr-11">
      <div className="relative w-32 sm:w-44 shrink-0 aspect-[4/5] overflow-hidden bg-ivory">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <span className="kicker whitespace-nowrap">{product.ref}</span>
          {product.brand && (
            <span className="eyebrow text-muted-ink whitespace-nowrap">{product.brand}</span>
          )}
        </div>
        <h3 className="font-serif text-xl text-ink mt-2 leading-snug">{product.name}</h3>
        <p className="mt-2 text-xs text-muted-ink leading-relaxed">{product.specs.join(" · ")}</p>
        {product.price !== undefined && (
          <div className="mt-3 flex items-baseline justify-between border-t border-ink/10 pt-3">
            <span className="eyebrow text-muted-ink">Price</span>
            <span className="font-serif text-ink">৳ {product.price.toLocaleString("en-BD")}</span>
          </div>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 border border-gold text-gold-deep hover:bg-gold hover:text-charcoal transition-colors px-4 py-2 text-xs uppercase tracking-[0.22em] font-medium"
        >
          Inquire
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

const CATEGORIES: {
  heading: string;
  channel: InquiryChannel;
  useList: typeof useWatches;
}[] = [
  { heading: "Watches", channel: "watches", useList: useWatches },
  { heading: "Perfumes", channel: "perfumes", useList: usePerfumes },
  { heading: "Sunglasses", channel: "eyewear", useList: useSunglasses },
  { heading: "Optical", channel: "eyewear", useList: useOptical },
];

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ product: Product; channel: InquiryChannel } | null>(
    null,
  );
  const groups = CATEGORIES.map((c) => ({ ...c, query: c.useList() }));
  const anyLoading = groups.some((g) => g.query.isLoading);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) setQuery("");
  }

  function selectProduct(product: Product, channel: InquiryChannel) {
    setSelected({ product, channel });
    handleOpenChange(false);
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search watches, perfumes, sunglasses, optical…"
        />
        <CommandList>
          <CommandEmpty>
            {hasQuery
              ? anyLoading
                ? "Loading catalogue…"
                : "No products found."
              : "Start typing to search the collection…"}
          </CommandEmpty>
          {hasQuery &&
            groups.map(
              (group) =>
                !!group.query.data?.length && (
                  <CommandGroup key={group.heading} heading={group.heading}>
                    {group.query.data.map((product: Product) => (
                      <CommandItem
                        key={product.ref}
                        value={`${product.brand ?? ""} ${product.name} ${product.ref}`}
                        onSelect={() => selectProduct(product, group.channel)}
                      >
                        <span>
                          {product.brand && (
                            <span className="text-muted-ink">{product.brand} · </span>
                          )}
                          {product.name}
                        </span>
                        <CommandShortcut>{product.ref}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ),
            )}
        </CommandList>
      </CommandDialog>
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-xl p-0 border-0 bg-transparent shadow-none">
          {selected && (
            <>
              <DialogTitle className="sr-only">{selected.product.name}</DialogTitle>
              <SearchResultOverlay product={selected.product} channel={selected.channel} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
