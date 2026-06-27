import type { Product } from "@/components/ProductCard";

const watchPrices = [9750, 9400, 9800, 9550, 9650, 9450, 9700, 9500, 9600, 9780, 9720, 9420, 9680, 9530, 9610, 9470, 9590, 9740, 9430, 9670];

const watchesBase: Omit<Product, "price">[] = [
  // Latest uploads (6)
  {
    ref: "REF · GU-DV-SN",
    name: "Gucci Dive — Serpent Black",
    specs: ["Stainless steel, 45mm", "Black snake-motif dial", "Black Gucci rubber strap"],
    image: "/products/gucci-dive-snake.jpg",
  },
  {
    ref: "REF · GU-DV-RD",
    name: "Gucci Dive — Scarlet Strap",
    specs: ["Stainless steel, 45mm", "Black dial, luminous indices", "Scarlet rubber strap"],
    image: "/products/gucci-dive-red.jpg",
  },
  {
    ref: "REF · GU-DV-BK",
    name: "Gucci Dive — Nero",
    specs: ["Stainless steel, 40mm", "Matte black dial", "Black rubber strap"],
    image: "/products/gucci-dive-black.jpg",
  },
  {
    ref: "REF · DJ28-TT",
    name: "Rolex Datejust 28 — Two-Tone",
    specs: ["Steel & yellow gold, 28mm", "Silver dial, gold bezel", "Oyster bracelet"],
    image: "/products/rolex-datejust28-two-tone.jpg",
  },
  {
    ref: "REF · DJ28-SL",
    name: "Rolex Datejust 28 — Silver",
    specs: ["Stainless steel, 28mm", "Silver sunray dial", "President bracelet"],
    image: "/products/rolex-datejust28-silver.jpg",
  },
  {
    ref: "REF · DJ28-BL",
    name: "Rolex Datejust 28 — Indigo",
    specs: ["Stainless steel, 28mm", "Deep blue dial, smooth bezel", "Oyster bracelet"],
    image: "/products/rolex-datejust28-blue.jpg",
  },
  // Previous uploads (10)
  {
    ref: "REF · OM-SM-GW",
    name: "Omega Seamaster Pro 300m — Gold/White",
    specs: ["Two-tone steel & gold, 42mm", "White dial, moonphase", "Black rubber strap"],
    image: "/products/omega-seamaster-gold-white.jpg",
  },
  {
    ref: "REF · OM-SM-RB",
    name: "Omega Seamaster Pro 300m — Rose/Blue",
    specs: ["Steel & rose gold, 42mm", "Lacquered blue dial", "Blue rubber strap"],
    image: "/products/omega-seamaster-rose-blue.jpg",
  },
  {
    ref: "REF · DJ-DD-CP",
    name: "Rolex His & Hers Set — Two-Tone Onyx",
    specs: ["Datejust 31 + Day-Date 40", "Steel & yellow gold", "Black sunray dials"],
    image: "/products/rolex-couple-two-tone-black.jpg",
  },
  {
    ref: "REF · DJ41-SS",
    name: "Rolex Datejust 41 — Silver Sunray",
    specs: ["Oystersteel, 41mm", "Silver sunray dial, stick markers", "Jubilee, fluted bezel"],
    image: "/products/rolex-datejust-silver-sunray.jpg",
  },
  {
    ref: "REF · DJ41-BS",
    name: "Rolex Datejust 41 — Midnight Blue",
    specs: ["Oystersteel, 41mm", "Blue sunray dial", "Jubilee, smooth bezel"],
    image: "/products/rolex-datejust-blue-smooth.jpg",
  },
  {
    ref: "REF · AP-RO-B",
    name: "Audemars Piguet Royal Oak — Bleu Nuit",
    specs: ["Stainless steel, 41mm", "Midnight blue tapisserie dial", "Integrated bracelet"],
    image: "/products/ap-royal-oak-blue.jpg",
  },
  {
    ref: "REF · DD40-GR",
    name: "Rolex Day-Date 40 — Graphite",
    specs: ["Polished steel, 40mm", "Graphite dial, baton indices", "President bracelet"],
    image: "/products/rolex-daydate-graphite.jpg",
  },
  {
    ref: "REF · DJ41-FP",
    name: "Rolex Datejust 41 — Full PVD",
    specs: ["Full PVD black case", "Stealth black dial", "Jubilee bracelet"],
    image: "/products/rolex-datejust-full-pvd.jpg",
  },
  {
    ref: "REF · OP41-BR",
    name: "Rolex Oyster Perpetual 41 — Black Roman",
    specs: ["Stainless steel, 41mm", "Black dial, Roman numerals", "Oyster bracelet"],
    image: "/products/rolex-oyster-perpetual-black-roman.jpg",
  },
  {
    ref: "REF · DD40-CB",
    name: "Rolex Day-Date 40 — Cobalt",
    specs: ["Polished steel, 40mm", "Cobalt blue dial", "President bracelet"],
    image: "/products/rolex-daydate-cobalt.jpg",
  },
  // Existing watches
  {
    ref: "REF · DJ41-TQ",
    name: "Rolex Datejust 41 — Tiffany Turquoise",
    specs: ["Oystersteel, 41mm", "Turquoise sunray dial", "Jubilee bracelet"],
    image: "/products/rolex-datejust-tiffany.jpg",
  },
  {
    ref: "REF · DD40-IB",
    name: "Rolex Day-Date 40 — Ice Blue",
    specs: ["Polished steel, 40mm", "Ice blue lacquered dial", "President bracelet"],
    image: "/products/rolex-daydate-ice-blue.jpg",
  },
  {
    ref: "REF · DJ41-EM",
    name: "Rolex Datejust 41 — Emerald",
    specs: ["Oystersteel, 41mm", "Emerald green dial", "Jubilee, fluted bezel"],
    image: "/products/rolex-datejust-emerald.jpg",
  },
  {
    ref: "REF · DJ41-VR",
    name: "Rolex Datejust 41 — Verde Royale",
    specs: ["Oystersteel, 41mm", "Vivid green dial, stick markers", "Jubilee bracelet"],
    image: "/products/rolex-datejust-green-stick.jpg",
  },
  {
    ref: "REF · AP-RO-N",
    name: "Audemars Piguet Royal Oak — Noir",
    specs: ["Stainless steel, 41mm", "Black 'Grande Tapisserie' dial", "Integrated bracelet"],
    image: "/products/ap-royal-oak-black.jpg",
  },
  {
    ref: "REF · AP-RO-W",
    name: "Audemars Piguet Royal Oak — Blanc",
    specs: ["Stainless steel, 41mm", "Silver tapisserie dial", "Octagonal bezel"],
    image: "/products/ap-royal-oak-white.jpg",
  },
  {
    ref: "REF · DJ41-SR",
    name: "Rolex Datejust 41 — Silver Roman (Ruby)",
    specs: ["Oystersteel, 41mm", "Silver dial, red Roman markers", "Jubilee bracelet"],
    image: "/products/rolex-datejust-silver-red-roman.jpg",
  },
  {
    ref: "REF · DJ41-SO",
    name: "Rolex Datejust 41 — Silver Roman (Onyx)",
    specs: ["Oystersteel, 41mm", "Silver dial, black Roman markers", "Jubilee bracelet"],
    image: "/products/rolex-datejust-silver-black-roman.jpg",
  },
  {
    ref: "REF · DJ41-SB",
    name: "Rolex Datejust 41 — Silver Roman (Cobalt)",
    specs: ["Oystersteel, 41mm", "Silver dial, blue Roman markers", "Jubilee bracelet"],
    image: "/products/rolex-datejust-silver-blue-roman.jpg",
  },
  {
    ref: "REF · OP36-SL",
    name: "Rolex Oyster Perpetual 36 — Silver",
    specs: ["Stainless steel, 36mm", "Silver dial, Roman numerals", "Oyster bracelet"],
    image: "/products/rolex-oyster-perpetual-silver.jpg",
  },
];

export const watches: Product[] = watchesBase.map((w, i) => ({
  ...w,
  price: watchPrices[i % watchPrices.length],
}));

export const perfumes: Product[] = [
  {
    ref: "N° 8247",
    brand: "Dior",
    name: "Sauvage — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: "/products/dior-sauvage-edp.jpg",
  },
  {
    ref: "N° 486385",
    brand: "Dior",
    name: "Sauvage Parfum",
    specs: ["100 ml", "Parfum", "Men"],
    image: "/products/dior-sauvage-parfum.jpg",
  },
  {
    ref: "N° P4697",
    brand: "Giorgio Armani",
    name: "Acqua di Giò — Pour Homme",
    specs: ["100 ml", "Eau de Toilette", "Men"],
    image: "/products/armani-acqua-di-gio.jpg",
  },
  {
    ref: "N° 994844",
    brand: "Giorgio Armani",
    name: "Sì Passione — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: "/products/armani-si-passione.jpg",
  },
  {
    ref: "N° 610",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    specs: ["100 ml", "Eau de Cologne", "Unisex"],
    image: "/products/jomalone-blackberry.jpg",
  },
  {
    ref: "N° 410164",
    brand: "Amouage",
    name: "Honour Woman",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: "/products/amouage-honour.jpg",
  },
  {
    ref: "N° 410423",
    brand: "Amouage",
    name: "Lineage",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: "/products/amouage-lineage.jpg",
  },
  {
    ref: "N° 410232",
    brand: "Amouage",
    name: "Journey Woman",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: "/products/amouage-journey.jpg",
  },
  {
    ref: "N° 153595",
    brand: "Xerjoff Casamorati",
    name: "Lira — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: "/products/casamorati-lira.jpg",
  },
  {
    ref: "N° 153557",
    brand: "Xerjoff Casamorati",
    name: "Mefisto — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: "/products/casamorati-mefisto.jpg",
  },
  {
    ref: "N° 911",
    brand: "Jo Malone London",
    name: "English Pear & Freesia Cologne",
    specs: ["100 ml", "Eau de Cologne", "Unisex"],
    image: "/products/jomalone-pear.jpg",
  },
  {
    ref: "N° 0588",
    brand: "Emporio Armani",
    name: "Stronger With You — Pour Homme",
    specs: ["100 ml", "Eau de Toilette", "Men"],
    image: "/products/armani-you.jpg",
  },
  {
    ref: "N° 816658",
    brand: "Giorgio Armani",
    name: "Sì — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: "/products/armani-si.jpg",
  },
  {
    ref: "N° 760164",
    brand: "Prada",
    name: "Paradoxe — Refillable Edition",
    specs: ["90 ml", "Eau de Parfum", "Women"],
    image: "/products/prada-paradoxe.jpg",
  },
];

export const featuredWatches = watches.slice(0, 4);
export const featuredPerfumes = perfumes.slice(0, 4);
