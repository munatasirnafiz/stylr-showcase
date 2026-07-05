import { useSiteSettings, FALLBACK_SITE_SETTINGS } from "@/hooks/useSiteContent";

export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? "#F7F3EC" : "#1C1A17";
  const { data } = useSiteSettings();
  const brandName = data?.brandName ?? FALLBACK_SITE_SETTINGS.brandName;
  const brandSuffix = data?.brandSuffix ?? FALLBACK_SITE_SETTINGS.brandSuffix;
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* handle */}
        <path d="M11 9 V6 a6 6 0 0 1 12 0 V9" stroke={ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* bag */}
        <path d="M5 9 H29 L27 35 H7 Z" fill={ink} />
        {/* gold S */}
        <text x="17" y="26" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fontStyle="italic" fill="#C9A227" fontWeight="600">S</text>
        {/* price tag */}
        <g transform="translate(22 4) rotate(20)">
          <path d="M0 0 L7 0 L9 3 L7 6 L0 6 Z" fill="#C9A227" />
          <circle cx="6.5" cy="3" r="0.7" fill={ink} />
        </g>
      </svg>
      <div className="flex items-baseline">
        <span className="font-serif text-xl tracking-tight" style={{ color: ink }}>{brandName}</span>
        <span className="font-serif text-xl tracking-tight" style={{ color: "#C9A227" }}>{brandSuffix}</span>
      </div>
    </div>
  );
}
