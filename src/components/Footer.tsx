import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";

export function Footer() {
  const { data } = useSiteSettings();
  const settings = data ?? FALLBACK_SITE_SETTINGS;
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-6 text-sm leading-relaxed text-ivory/70 max-w-xs">
            {settings.footerBlurb}
          </p>
          <p className="kicker mt-6 block" style={{ color: "#C9A227" }}>{settings.footerTagline}</p>
        </div>
        <div>
          <h4 className="eyebrow text-ivory/60">Maison</h4>
          <span className="gold-rule mt-3 mb-5" />
          <ul className="space-y-3 text-sm">
            {settings.footerNavLinks.map((l) => (
              <li key={l.path}><Link to={l.path} className="hover:text-gold transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-ivory/60">Visit & Inquire</h4>
          <span className="gold-rule mt-3 mb-5" />
          <address className="not-italic text-sm leading-relaxed text-ivory/80 space-y-3">
            <p>{settings.addressLines.join(", ")}</p>
            <p>
              <span className="block text-ivory/50 text-xs uppercase tracking-widest mb-1">Delivery</span>
              {settings.delivery}
            </p>
            <div>
              <span className="block text-ivory/50 text-xs uppercase tracking-widest mb-1">Contact</span>
              <ul className="space-y-1">
                {settings.phones.map((p) => (
                  <li key={p.waNumber}>
                    <a className="hover:text-gold" href={`https://wa.me/${p.waNumber}`}>{p.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
          </address>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} {settings.copyrightSuffix}</p>
          <p className="tracking-widest uppercase">{settings.footerLocationTag}</p>
        </div>
      </div>
    </footer>
  );
}
