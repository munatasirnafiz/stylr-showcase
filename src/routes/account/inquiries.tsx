import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useInquiries } from "@/hooks/useInquiries";
import { buildInquiryLink } from "@/data/contact";
import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";
import type { InquiryStatus } from "@/lib/supabase/types";

export const Route = createFileRoute("/account/inquiries")({
  head: () => ({
    meta: [{ title: "My Inquiries — Stylr.store" }],
  }),
  component: InquiriesPage,
});

const statusVariant: Record<InquiryStatus, "secondary" | "default" | "outline" | "destructive"> = {
  submitted: "secondary",
  contacted: "default",
  reserved: "outline",
  fulfilled: "default",
  cancelled: "destructive",
};

const statusLabel: Record<InquiryStatus, string> = {
  submitted: "Submitted",
  contacted: "Contacted",
  reserved: "Reserved",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

function InquiriesPage() {
  const { data: inquiries, isLoading } = useInquiries();
  const { data: settings } = useSiteSettings();
  const phones = settings?.phones ?? FALLBACK_SITE_SETTINGS.phones;

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!inquiries?.length) {
    return (
      <div className="text-center py-16">
        <p className="kicker">No inquiries yet</p>
        <h3 className="font-serif text-2xl text-ink mt-4">You haven't started an inquiry.</h3>
        <p className="mt-3 text-muted-ink">Inquiries you make while logged in will show up here.</p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-gold text-gold-deep px-7 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition-colors"
          >
            Start an Inquiry →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="card-lux p-6 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-ink">{inquiry.product_name}</span>
              <Badge variant={statusVariant[inquiry.status]}>{statusLabel[inquiry.status]}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-ink">
              {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <a
            href={buildInquiryLink(phones, inquiry.channel, inquiry.product_name)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 border border-gold text-gold-deep hover:bg-gold hover:text-charcoal transition-colors px-5 py-2.5 text-xs uppercase tracking-[0.22em]"
          >
            Re-inquire →
          </a>
        </div>
      ))}
    </div>
  );
}
