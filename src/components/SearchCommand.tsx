import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useWatches, usePerfumes, useSunglasses, useOptical } from "@/hooks/useProducts";
import type { Product } from "@/components/ProductCard";

const CATEGORIES = [
  { heading: "Watches", path: "/watches" as const, useList: useWatches },
  { heading: "Perfumes", path: "/perfumes" as const, useList: usePerfumes },
  { heading: "Sunglasses", path: "/sunglasses" as const, useList: useSunglasses },
  { heading: "Optical", path: "/optical" as const, useList: useOptical },
];

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const groups = CATEGORIES.map((c) => ({ ...c, query: c.useList() }));
  const anyLoading = groups.some((g) => g.query.isLoading);

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

  function selectProduct(path: string) {
    onOpenChange(false);
    navigate({ to: path });
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search products</DialogTitle>
      <CommandInput placeholder="Search watches, perfumes, sunglasses, optical…" />
      <CommandList>
        <CommandEmpty>{anyLoading ? "Loading catalogue…" : "No products found."}</CommandEmpty>
        {groups.map(
          (group) =>
            !!group.query.data?.length && (
              <CommandGroup key={group.path} heading={group.heading}>
                {group.query.data.map((product: Product) => (
                  <CommandItem
                    key={product.ref}
                    value={`${product.brand ?? ""} ${product.name} ${product.ref}`}
                    onSelect={() => selectProduct(group.path)}
                  >
                    <span>
                      {product.brand && <span className="text-muted-ink">{product.brand} · </span>}
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
  );
}
