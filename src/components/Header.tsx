import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { SearchCommand } from "./SearchCommand";
import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data } = useSiteSettings();
  const links = data?.headerNavLinks ?? FALLBACK_SITE_SETTINGS.headerNavLinks;
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="nav-link group"
              activeProps={{ className: "nav-link nav-link-gold" }}
              activeOptions={{ exact: l.path === "/" }}
            >
              <span className="relative inline-block">
                {l.label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => setSearchOpen(true)} className="p-2 text-ink" aria-label="Search">
            <Search size={20} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-hairline bg-surface">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className="nav-link py-1"
                activeProps={{ className: "nav-link nav-link-gold py-1" }}
                activeOptions={{ exact: l.path === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
