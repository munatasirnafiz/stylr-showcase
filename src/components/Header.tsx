import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { SearchCommand } from "./SearchCommand";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";
import { useWatchBrands } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

const dropdownItemClass =
  "px-3 py-2 text-sm text-ink hover:text-gold-deep hover:bg-ivory rounded-sm transition-colors";

function NavHoverItem({
  to,
  label,
  onNavigate,
  children,
}: {
  to: "/watches" | "/perfumes";
  label: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  return (
    <HoverCard openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>
        <Link
          to={to}
          onClick={onNavigate}
          className="nav-link group inline-flex items-center gap-1"
          activeProps={{ className: "nav-link nav-link-gold group inline-flex items-center gap-1" }}
        >
          <span className="relative inline-block">
            {label}
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </span>
          <ChevronDown size={12} className="opacity-60" aria-hidden />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent align="start" sideOffset={14} className="w-56 p-1.5 border-hairline">
        <div className="flex flex-col">{children}</div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data } = useSiteSettings();
  const { data: brandsData } = useWatchBrands();
  const brands = brandsData ?? [];
  const links = data?.headerNavLinks ?? FALLBACK_SITE_SETTINGS.headerNavLinks;

  const closeAll = () => {
    setOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" onClick={closeAll} className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            if (l.path === "/watches") {
              return (
                <NavHoverItem key={l.path} to="/watches" label={l.label} onNavigate={closeAll}>
                  <Link to="/watches" onClick={closeAll} className={dropdownItemClass}>
                    All Watches
                  </Link>
                  {brands.length > 0 && <div className="my-1 h-px bg-hairline" />}
                  {brands.map((b) => (
                    <Link key={b} to="/watches" search={{ brand: b }} onClick={closeAll} className={dropdownItemClass}>
                      {b}
                    </Link>
                  ))}
                </NavHoverItem>
              );
            }
            if (l.path === "/perfumes") {
              return (
                <NavHoverItem key={l.path} to="/perfumes" label={l.label} onNavigate={closeAll}>
                  <Link to="/perfumes" onClick={closeAll} className={dropdownItemClass}>
                    All Perfumes
                  </Link>
                  <div className="my-1 h-px bg-hairline" />
                  <Link to="/perfumes" search={{ gender: "men" }} onClick={closeAll} className={dropdownItemClass}>
                    Men
                  </Link>
                  <Link to="/perfumes" search={{ gender: "women" }} onClick={closeAll} className={dropdownItemClass}>
                    Women
                  </Link>
                </NavHoverItem>
              );
            }
            return (
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
            );
          })}
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
            {links.map((l) => {
              if (l.path === "/watches") {
                const expanded = mobileExpanded === l.path;
                return (
                  <div key={l.path}>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : l.path)}
                      className="nav-link py-1 flex items-center justify-between w-full"
                    >
                      {l.label}
                      <ChevronDown size={14} className={cn("transition-transform", expanded && "rotate-180")} />
                    </button>
                    {expanded && (
                      <div className="mt-2 mb-1 pl-3 flex flex-col gap-3 border-l border-hairline">
                        <Link to="/watches" onClick={closeAll} className="eyebrow hover:text-gold-deep">
                          All Watches
                        </Link>
                        {brands.map((b) => (
                          <Link
                            key={b}
                            to="/watches"
                            search={{ brand: b }}
                            onClick={closeAll}
                            className="eyebrow hover:text-gold-deep"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (l.path === "/perfumes") {
                const expanded = mobileExpanded === l.path;
                return (
                  <div key={l.path}>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : l.path)}
                      className="nav-link py-1 flex items-center justify-between w-full"
                    >
                      {l.label}
                      <ChevronDown size={14} className={cn("transition-transform", expanded && "rotate-180")} />
                    </button>
                    {expanded && (
                      <div className="mt-2 mb-1 pl-3 flex flex-col gap-3 border-l border-hairline">
                        <Link to="/perfumes" onClick={closeAll} className="eyebrow hover:text-gold-deep">
                          All Perfumes
                        </Link>
                        <Link
                          to="/perfumes"
                          search={{ gender: "men" }}
                          onClick={closeAll}
                          className="eyebrow hover:text-gold-deep"
                        >
                          Men
                        </Link>
                        <Link
                          to="/perfumes"
                          search={{ gender: "women" }}
                          onClick={closeAll}
                          className="eyebrow hover:text-gold-deep"
                        >
                          Women
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={closeAll}
                  className="nav-link py-1"
                  activeProps={{ className: "nav-link nav-link-gold py-1" }}
                  activeOptions={{ exact: l.path === "/" }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
