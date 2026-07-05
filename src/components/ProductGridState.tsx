import { Skeleton } from "@/components/ui/skeleton";
import type { InquiryChannel } from "@/data/contact";
import { useInquiryLink } from "@/hooks/useSiteContent";

export function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <article key={i} className="card-lux flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="p-6 flex flex-col flex-1 gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </article>
      ))}
    </>
  );
}

export function ProductGridEmpty({
  channel,
  label,
}: {
  channel: InquiryChannel;
  label: string;
}) {
  const href = useInquiryLink(channel);
  return (
    <div className="col-span-full text-center py-16">
      <p className="kicker">Nothing here yet</p>
      <h3 className="font-serif text-2xl text-ink mt-4">{label}</h3>
      <p className="mt-3 text-muted-ink">
        In the meantime, reach out and we'll help you find what you're looking for.
      </p>
      <div className="mt-8">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gold text-gold-deep px-7 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition-colors"
        >
          Start a WhatsApp Inquiry →
        </a>
      </div>
    </div>
  );
}
