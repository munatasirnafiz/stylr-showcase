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
import { ProductCard, type Product } from "@/components/ProductCard";
import type { InquiryChannel } from "@/data/contact";

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
        <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none">
          {selected && (
            <>
              <DialogTitle className="sr-only">{selected.product.name}</DialogTitle>
              <ProductCard product={selected.product} channel={selected.channel} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
