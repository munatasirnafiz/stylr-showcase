import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";
import { urlFor } from "@/lib/sanity";
import logoIcon from "@/assets/logo-icon.png";

export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? "#F7F3EC" : "#1C1A17";
  const { data } = useSiteSettings();
  const brandName = data?.brandName ?? FALLBACK_SITE_SETTINGS.brandName;
  const brandSuffix = data?.brandSuffix ?? FALLBACK_SITE_SETTINGS.brandSuffix;
  const logoSrc = data?.logo ? urlFor(data.logo).width(160).fit("max").url() : logoIcon;
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoSrc} alt={`${brandName}${brandSuffix}`} className="h-9 w-auto shrink-0" />
      <div className="flex items-baseline">
        <span className="font-serif text-xl tracking-tight" style={{ color: ink }}>{brandName}</span>
        <span className="font-serif text-xl tracking-tight" style={{ color: "#C9A227" }}>{brandSuffix}</span>
      </div>
    </div>
  );
}
