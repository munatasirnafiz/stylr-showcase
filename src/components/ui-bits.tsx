import { Link } from "@tanstack/react-router";
import { inquiryLink } from "@/data/contact";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="gold-rule" />
      <span className="kicker">{children}</span>
    </div>
  );
}

export function CTAButton({
  to,
  href,
  children,
  variant = "filled",
  external,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition-colors";
  const cls =
    variant === "filled"
      ? `${base} bg-charcoal text-ivory hover:bg-ink`
      : `${base} border border-gold text-gold-deep hover:bg-gold hover:text-charcoal`;
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to!} className={cls}>
      {children}
    </Link>
  );
}

export function ClosingCTA() {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="kicker" style={{ color: "#C9A227" }}>Private Inquiry</span>
        <h2 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
          A private inquiry,<br />answered personally.
        </h2>
        <p className="mt-6 text-ivory/70 max-w-xl mx-auto">
          Tell us what you're looking for. Each conversation is handled by a single curator from first message to delivery — Bangladesh wide.
        </p>
        <div className="mt-10">
          <a
            href={inquiryLink("watches")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium"
          >
            Start a WhatsApp Inquiry →
          </a>
        </div>
      </div>
    </section>
  );
}
