import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { SectionLabel, ClosingCTA } from "@/components/ui-bits";
import { ProductGridSkeleton, ProductGridEmpty } from "@/components/ProductGridState";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePerfumes } from "@/hooks/useProducts";
import heroPerfume from "@/assets/hero-perfume.jpg";

type Gender = "men" | "women" | "unisex";
const GENDERS: { value: Gender; label: string }[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];

export const Route = createFileRoute("/perfumes")({
  validateSearch: (search: Record<string, unknown>): { gender?: Gender } => ({
    gender:
      search.gender === "men" || search.gender === "women" || search.gender === "unisex"
        ? (search.gender as Gender)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Perfumes — Niche Parfumerie · Stylr.store Dhaka" },
      { name: "description", content: "A curated parfumerie of niche, designer and archive fragrances. Private inquiry by WhatsApp." },
      { property: "og:title", content: "Perfumes — Stylr.store" },
      { property: "og:description", content: "Hand-selected niche and designer perfumes." },
    ],
  }),
  component: PerfumesPage,
});

const toggleItemClass =
  "border border-hairline px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-ink hover:text-ink data-[state=on]:border-gold data-[state=on]:text-gold-deep data-[state=on]:bg-transparent rounded-none";

function PerfumesPage() {
  const { data: perfumes, isLoading, isError } = usePerfumes();
  const { gender } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = gender ? perfumes?.filter((p) => p.gender === gender) : perfumes;
  const genderLabel = GENDERS.find((g) => g.value === gender)?.label;

  return (
    <>
      <section className="relative bg-charcoal text-ivory">
        <div className="absolute inset-0 opacity-50">
          <img src={heroPerfume} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36">
          <p className="kicker" style={{ color: "#C9A227" }}>Collection · 02</p>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 leading-tight max-w-3xl">
            Parfums, <span className="italic">quietly</span> kept.
          </h1>
          <p className="mt-6 text-ivory/70 max-w-xl text-lg">
            From house exclusives to discontinued cult favourites — every flacon is verified and sealed before it leaves Dhaka.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="mb-12">
          <SectionLabel>The Parfumerie</SectionLabel>
          <h2 className="font-serif text-3xl text-ink mt-4">
            {isLoading
              ? "Loading the parfumerie…"
              : `${filtered?.length ?? 0} flacon${filtered?.length === 1 ? "" : "s"}${genderLabel ? ` for ${genderLabel}` : ""}, currently in stock.`}
          </h2>
        </div>
        <ToggleGroup
          type="single"
          value={gender ?? ""}
          onValueChange={(value) => navigate({ search: { gender: (value || undefined) as Gender | undefined } })}
          className="flex-wrap justify-start gap-2 mb-10"
        >
          <ToggleGroupItem value="" className={toggleItemClass}>
            All
          </ToggleGroupItem>
          {GENDERS.map((g) => (
            <ToggleGroupItem key={g.value} value={g.value} className={toggleItemClass}>
              {g.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : isError || !filtered?.length ? (
            <ProductGridEmpty
              channel="perfumes"
              label={genderLabel ? `No ${genderLabel} flacons in stock right now.` : "No flacons in stock right now."}
            />
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} channel="perfumes" productType="perfume" />)
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
