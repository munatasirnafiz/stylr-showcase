import rolexBlue from "@/assets/products/rolex-datejust-blue.asset.json";
import rolexBlack from "@/assets/products/rolex-datejust-black.asset.json";
import rolexGreen from "@/assets/products/rolex-daydate-green.asset.json";
import omegaSpeed from "@/assets/products/omega-speedmaster.asset.json";
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
    ref: "REF · 116610LN",
    name: "Rolex Datejust 41 — Azure",
    specs: ["904L Oystersteel", "Sunburst blue dial", "Jubilee bracelet, 41mm"],
    image: rolexBlue.url,
  },
  {
    ref: "REF · 126300BK",
    name: "Rolex Datejust — Onyx Edition",
    specs: ["PVD-coated steel", "Matte black dial", "Jubilee bracelet, 41mm"],
    image: rolexBlack.url,
  },
  {
    ref: "REF · 228239GR",
    name: "Rolex Day-Date 40 — Emerald",
    specs: ["18k white gold", "Lacquered green dial", "President bracelet"],
    image: rolexGreen.url,
  },
  {
    ref: "REF · 331.12.42",
    name: "Omega Speedmaster '57 Co-Axial",
    specs: ["Stainless steel, 41.5mm", "Silver chronograph dial", "Tobacco leather"],
    image: omegaSpeed.url,
  },
  {
    ref: "REF · 116710BL",
    name: "Rolex Datejust 41 — Azure II",
    specs: ["904L Oystersteel", "Smooth bezel", "Jubilee, 41mm"],
    image: rolexBlue.url,
  },
  {
    ref: "REF · 126300SL",
    name: "Rolex Datejust — Noir Slate",
    specs: ["DLC finish", "Slate dial", "Jubilee bracelet"],
    image: rolexBlack.url,
  },
  {
    ref: "REF · 218239WG",
    name: "Rolex Day-Date — Verde Royale",
    specs: ["White gold", "Roman markers", "Green sunburst dial"],
    image: rolexGreen.url,
  },
  {
    ref: "REF · 331.12.42·CR",
    name: "Omega Speedmaster — Cream Dial",
    specs: ["Steel case, 41.5mm", "Cream dial, rose gold hands", "Calfskin strap"],
    image: omegaSpeed.url,
  },
  {
    ref: "REF · 126334BL",
    name: "Rolex Datejust 41 — Cobalt",
    specs: ["Oystersteel & white gold", "Cobalt sunray dial", "Fluted bezel"],
    image: rolexBlue.url,
  },
  {
    ref: "REF · 116300PVD",
    name: "Rolex Datejust — Carbon Black",
    specs: ["Full PVD case", "Black on black", "Jubilee bracelet"],
    image: rolexBlack.url,
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
