import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTACT } from "@/data/contact";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-6 text-sm leading-relaxed text-ivory/70 max-w-xs">
            A Dhaka-based maison for the quietly discerning. Rare timepieces and niche parfums, hand-selected, privately delivered.
          </p>
          <p className="kicker mt-6 block" style={{ color: "#C9A227" }}>Style Your Way, Shop Your Day</p>
        </div>
        <div>
          <h4 className="eyebrow text-ivory/60">Maison</h4>
          <span className="gold-rule mt-3 mb-5" />
          <ul className="space-y-3 text-sm">
            <li><Link to="/watches" className="hover:text-gold transition-colors">Watches</Link></li>
            <li><Link to="/perfumes" className="hover:text-gold transition-colors">Perfumes</Link></li>
            <li><Link to="/eyewear" className="hover:text-gold transition-colors">Eyewear</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-ivory/60">Visit & Inquire</h4>
          <span className="gold-rule mt-3 mb-5" />
          <address className="not-italic text-sm leading-relaxed text-ivory/80 space-y-3">
            <p>{CONTACT.address}</p>
            <p>
              <span className="block text-ivory/50 text-xs uppercase tracking-widest mb-1">Delivery</span>
              {CONTACT.delivery}
            </p>
            <div>
              <span className="block text-ivory/50 text-xs uppercase tracking-widest mb-1">Contact</span>
              <ul className="space-y-1">
                {CONTACT.phones.map((p) => (
                  <li key={p.waNumber}>
                    <a className="hover:text-gold" href={p.wa}>{p.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
          </address>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Stylr.store — All rights reserved.</p>
          <p className="tracking-widest uppercase">Dhaka · Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
