import jomalonePear from "@/assets/products/jomalone-pear.asset.json";
import jomaloneBlackberry from "@/assets/products/jomalone-blackberry.asset.json";
import armaniSi from "@/assets/products/armani-si.asset.json";
import armaniSiPassione from "@/assets/products/armani-si-passione.asset.json";
import armaniYou from "@/assets/products/armani-you.asset.json";
import armaniAcquaDiGio from "@/assets/products/armani-acqua-di-gio.asset.json";
import pradaParadoxe from "@/assets/products/prada-paradoxe.asset.json";
import diorSauvageEdp from "@/assets/products/dior-sauvage-edp.asset.json";
import diorSauvageParfum from "@/assets/products/dior-sauvage-parfum.asset.json";
import amouageHonour from "@/assets/products/amouage-honour.asset.json";
import amouageLineage from "@/assets/products/amouage-lineage.asset.json";
import amouageJourney from "@/assets/products/amouage-journey.asset.json";
import casamoratiLira from "@/assets/products/casamorati-lira.asset.json";
import casamoratiMefisto from "@/assets/products/casamorati-mefisto.asset.json";
import type { Product } from "@/components/ProductCard";

const watchPrices = [9750, 9400, 9800, 9550, 9650, 9450, 9700, 9500, 9600, 9780];

const watchesBase: Omit<Product, "price">[] = [
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
    image: diorSauvageEdp.url,
  },
  {
    ref: "N° 486385",
    brand: "Dior",
    name: "Sauvage Parfum",
    specs: ["100 ml", "Parfum", "Men"],
    image: diorSauvageParfum.url,
  },
  {
    ref: "N° P4697",
    brand: "Giorgio Armani",
    name: "Acqua di Giò — Pour Homme",
    specs: ["100 ml", "Eau de Toilette", "Men"],
    image: armaniAcquaDiGio.url,
  },
  {
    ref: "N° 994844",
    brand: "Giorgio Armani",
    name: "Sì Passione — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: armaniSiPassione.url,
  },
  {
    ref: "N° 610",
    brand: "Jo Malone London",
    name: "Blackberry & Bay Cologne",
    specs: ["100 ml", "Eau de Cologne", "Unisex"],
    image: jomaloneBlackberry.url,
  },
  {
    ref: "N° 410164",
    brand: "Amouage",
    name: "Honour Woman",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: amouageHonour.url,
  },
  {
    ref: "N° 410423",
    brand: "Amouage",
    name: "Lineage",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: amouageLineage.url,
  },
  {
    ref: "N° 410232",
    brand: "Amouage",
    name: "Journey Woman",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: amouageJourney.url,
  },
  {
    ref: "N° 153595",
    brand: "Xerjoff Casamorati",
    name: "Lira — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: casamoratiLira.url,
  },
  {
    ref: "N° 153557",
    brand: "Xerjoff Casamorati",
    name: "Mefisto — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: casamoratiMefisto.url,
  },
  {
    ref: "N° 911",
    brand: "Jo Malone London",
    name: "English Pear & Freesia Cologne",
    specs: ["100 ml", "Eau de Cologne", "Unisex"],
    image: jomalonePear.url,
  },
  {
    ref: "N° 0588",
    brand: "Emporio Armani",
    name: "Stronger With You — Pour Homme",
    specs: ["100 ml", "Eau de Toilette", "Men"],
    image: armaniYou.url,
  },
  {
    ref: "N° 816658",
    brand: "Giorgio Armani",
    name: "Sì — Eau de Parfum",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: armaniSi.url,
  },
  {
    ref: "N° 760164",
    brand: "Prada",
    name: "Paradoxe — Refillable Edition",
    specs: ["90 ml", "Eau de Parfum", "Women"],
    image: pradaParadoxe.url,
  },
];

export const featuredWatches = watches.slice(0, 4);
export const featuredPerfumes = perfumes.slice(0, 4);
