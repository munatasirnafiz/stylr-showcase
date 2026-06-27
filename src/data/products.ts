import rolexBlue from "@/assets/products/rolex-datejust-blue.asset.json";
import rolexBlack from "@/assets/products/rolex-datejust-black.asset.json";
import rolexGreen from "@/assets/products/rolex-daydate-green.asset.json";
import omegaSpeed from "@/assets/products/omega-speedmaster.asset.json";
import jomalonePear from "@/assets/products/jomalone-pear.asset.json";
import armaniSi from "@/assets/products/armani-si.asset.json";
import armaniYou from "@/assets/products/armani-you.asset.json";
import pradaParadoxe from "@/assets/products/prada-paradoxe.asset.json";
import type { Product } from "@/components/ProductCard";

export const watches: Product[] = [
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

export const perfumes: Product[] = [
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
  {
    ref: "N° 244",
    brand: "Maison Argentée",
    name: "Oud Nuit · Black Edition",
    specs: ["75 ml", "Extrait de Parfum", "Unisex"],
    image: jomalonePear.url,
  },
  {
    ref: "N° 117",
    brand: "Atelier Lumière",
    name: "Bergamote 22",
    specs: ["50 ml", "Eau de Parfum", "Unisex"],
    image: armaniSi.url,
  },
  {
    ref: "N° 901",
    brand: "Jo Malone London",
    name: "Wood Sage & Sea Salt",
    specs: ["100 ml", "Eau de Cologne", "Unisex"],
    image: jomalonePear.url,
  },
  {
    ref: "N° 0612",
    brand: "Emporio Armani",
    name: "Because It's You — Pour Femme",
    specs: ["100 ml", "Eau de Parfum", "Women"],
    image: armaniYou.url,
  },
  {
    ref: "N° 433",
    brand: "Maison Noir",
    name: "Velours d'Ambre",
    specs: ["100 ml", "Extrait de Parfum", "Unisex"],
    image: pradaParadoxe.url,
  },
  {
    ref: "N° 058",
    brand: "Giorgio Armani",
    name: "Sì Intense — Limited",
    specs: ["50 ml", "Eau de Parfum Intense", "Women"],
    image: armaniSi.url,
  },
  {
    ref: "N° 277",
    brand: "Parfums de Dhaka",
    name: "Rose Mirpur",
    specs: ["75 ml", "Eau de Parfum", "Unisex"],
    image: pradaParadoxe.url,
  },
  {
    ref: "N° 814",
    brand: "Atelier Lumière",
    name: "Vétiver Noir",
    specs: ["100 ml", "Eau de Parfum", "Men"],
    image: armaniYou.url,
  },
];

export const featuredWatches = watches.slice(0, 4);
export const featuredPerfumes = perfumes.slice(0, 4);
