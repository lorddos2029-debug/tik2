import { gallery as chainsawGallery, product as chainsawProduct } from "@/lib/catalog";
import { gallery as pillowGallery, product as pillowProduct } from "@/lib/pillow-catalog";
import { gallery as rolimaGallery, product as rolimaProduct } from "@/lib/rolima-catalog";
import { gallery as guardaGallery, product as guardaProduct } from "@/lib/guarda-catalog";
import { gallery as cobertaGallery, product as cobertaProduct } from "@/lib/coberta-catalog";
import { gallery as ferramentasGallery, product as ferramentasProduct } from "@/lib/ferramentas-catalog";
import { gallery as fornoGallery, product as fornoProduct } from "@/lib/forno-catalog";
import { gallery as panelaGallery, product as panelaProduct } from "@/lib/panela-catalog";
import { gallery as tabletGallery, product as tabletProduct } from "@/lib/tablet-catalog";
import { gallery as tablet2Gallery, product as tablet2Product } from "@/lib/tablet2-catalog";
import { gallery as shortGallery, product as shortProduct } from "@/lib/short-catalog";
import { gallery as bermudaGallery, product as bermudaProduct } from "@/lib/bermuda-catalog";
import { gallery as magnesioGallery, product as magnesioProduct } from "@/lib/magnesio-catalog";
import { gallery as driftGallery, product as driftProduct } from "@/lib/drift-catalog";
import { gallery as wapGallery, product as wapProduct } from "@/lib/wap-catalog";
import { gallery as serumGallery, product as serumProduct } from "@/lib/serum-catalog";

export type ProductKey =
  | "motoserra"
  | "travesseiro"
  | "rolima"
  | "guarda"
  | "coberta"
  | "ferramentas"
  | "panela"
  | "forno"
  | "tablet"
  | "tablet2"
  | "short"
  | "bermuda"
  | "magnesio"
  | "drift"
  | "wap"
  | "serum";

export interface CheckoutProduct {
  key: ProductKey;
  id: string;
  pagePath:
    | "/p/motoserra"
    | "/travesseiro"
    | "/carrinho"
    | "/guarda"
    | "/coberta"
    | "/ferramentas"
    | "/panela"
    | "/forno"
    | "/tablet"
    | "/tablet2"
    | "/short"
    | "/bermuda"
    | "/magnesio"
    | "/drift"
    | "/wap";
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  shipping: number;
  rating: number;
  variant: string;
  storeName: string;
}

const firstImage = (images: readonly string[], fallback = "/favicon.png") =>
  images[0] ?? fallback;

export const checkoutProducts: Record<ProductKey, CheckoutProduct> = {
  serum: {
    key: "serum",
    id: "ghk-zencial-envy-skin-serum-30ml",
    pagePath: "/serum",
    title: serumProduct.titleShort,
    image: firstImage(serumGallery),
    price: serumProduct.price,
    originalPrice: serumProduct.originalPrice,
    discountPercent: serumProduct.discountPercent,
    shipping: serumProduct.shipping,
    rating: serumProduct.rating,
    variant: serumProduct.variant,
    storeName: serumProduct.store.name,
  },
  wap: {
    key: "wap",
    id: "lavadora-wap-agil-1800-1300psi",
    pagePath: "/wap",
    title: wapProduct.titleShort,
    image: firstImage(wapGallery),
    price: wapProduct.price,
    originalPrice: wapProduct.originalPrice,
    discountPercent: wapProduct.discountPercent,
    shipping: wapProduct.shipping,
    rating: wapProduct.rating,
    variant: wapProduct.variant,
    storeName: wapProduct.store.name,
  },
  drift: {
    key: "drift",
    id: "hdj-drift-trike-eletrico-350w-36v",
    pagePath: "/drift",
    title: driftProduct.titleShort,
    image: firstImage(driftGallery),
    price: driftProduct.price,
    originalPrice: driftProduct.originalPrice,
    discountPercent: driftProduct.discountPercent,
    shipping: driftProduct.shipping,
    rating: driftProduct.rating,
    variant: driftProduct.variant,
    storeName: driftProduct.store.name,
  },
  motoserra: {
    key: "motoserra",
    id: "motoserra-52cc",
    pagePath: "/p/motoserra",
    title: chainsawProduct.titleShort,
    image: firstImage(chainsawGallery, "/products/motoserra/gal1.webp"),
    price: chainsawProduct.price,
    originalPrice: chainsawProduct.originalPrice,
    discountPercent: chainsawProduct.discountPercent,
    shipping: chainsawProduct.shipping,
    rating: chainsawProduct.rating,
    variant: chainsawProduct.variant,
    storeName: chainsawProduct.store.name,
  },
  travesseiro: {
    key: "travesseiro",
    id: "travesseiro-abranuv-pro2",
    pagePath: "/travesseiro",
    title: pillowProduct.titleShort,
    image: firstImage(pillowGallery, "/products/travesseiro/travesseiro-1.webp"),
    price: pillowProduct.price,
    originalPrice: pillowProduct.originalPrice,
    discountPercent: pillowProduct.discountPercent,
    shipping: pillowProduct.shipping,
    rating: pillowProduct.rating,
    variant: pillowProduct.variant,
    storeName: pillowProduct.store.name,
  },
  rolima: {
    key: "rolima",
    id: "rolima-super-car-unitoys",
    pagePath: "/carrinho",
    title: rolimaProduct.titleShort,
    image: firstImage(rolimaGallery),
    price: rolimaProduct.price,
    originalPrice: rolimaProduct.originalPrice,
    discountPercent: rolimaProduct.discountPercent,
    shipping: rolimaProduct.shipping,
    rating: rolimaProduct.rating,
    variant: rolimaProduct.variant,
    storeName: rolimaProduct.store.name,
  },
  guarda: {
    key: "guarda",
    id: "guarda-chuva-automatico-uv",
    pagePath: "/guarda",
    title: guardaProduct.titleShort,
    image: firstImage(guardaGallery),
    price: guardaProduct.price,
    originalPrice: guardaProduct.originalPrice,
    discountPercent: guardaProduct.discountPercent,
    shipping: guardaProduct.shipping,
    rating: guardaProduct.rating,
    variant: guardaProduct.variant,
    storeName: guardaProduct.store.name,
  },
  coberta: {
    key: "coberta",
    id: "kit-cobre-leito-piquet-6-pecas",
    pagePath: "/coberta",
    title: cobertaProduct.titleShort,
    image: firstImage(cobertaGallery),
    price: cobertaProduct.price,
    originalPrice: cobertaProduct.originalPrice,
    discountPercent: cobertaProduct.discountPercent,
    shipping: cobertaProduct.shipping,
    rating: cobertaProduct.rating,
    variant: cobertaProduct.variant,
    storeName: cobertaProduct.store.name,
  },
  ferramentas: {
    key: "ferramentas",
    id: "jogo-oficina-master-222-ferramentas",
    pagePath: "/ferramentas",
    title: ferramentasProduct.titleShort,
    image: firstImage(ferramentasGallery),
    price: ferramentasProduct.price,
    originalPrice: ferramentasProduct.originalPrice,
    discountPercent: ferramentasProduct.discountPercent,
    shipping: ferramentasProduct.shipping,
    rating: ferramentasProduct.rating,
    variant: ferramentasProduct.variant,
    storeName: ferramentasProduct.store.name,
  },
  forno: {
    key: "forno",
    id: "forno-eletrico-mondial-grand-family-52l",
    pagePath: "/forno",
    title: fornoProduct.titleShort,
    image: firstImage(fornoGallery),
    price: fornoProduct.price,
    originalPrice: fornoProduct.originalPrice,
    discountPercent: fornoProduct.discountPercent,
    shipping: fornoProduct.shipping,
    rating: fornoProduct.rating,
    variant: fornoProduct.variant,
    storeName: fornoProduct.store.name,
  },
  tablet2: {
    key: "tablet2",
    id: "tablet2-jepk-t105",
    pagePath: "/tablet2",
    title: tablet2Product.titleShort,
    image: firstImage(tablet2Gallery),
    price: tablet2Product.price,
    originalPrice: tablet2Product.originalPrice,
    discountPercent: tablet2Product.discountPercent,
    shipping: tablet2Product.shipping,
    rating: tablet2Product.rating,
    variant: tablet2Product.variant,
    storeName: tablet2Product.store.name,
  },
  tablet: {
    key: "tablet",
    id: "tablet-jepk-t105",
    pagePath: "/tablet",
    title: tabletProduct.titleShort,
    image: firstImage(tabletGallery),
    price: tabletProduct.price,
    originalPrice: tabletProduct.originalPrice,
    discountPercent: tabletProduct.discountPercent,
    shipping: tabletProduct.shipping,
    rating: tabletProduct.rating,
    variant: tabletProduct.variant,
    storeName: tabletProduct.store.name,
  },
  short: {
    key: "short",
    id: "kit-3-bermudas-seda-gelada",
    pagePath: "/short",
    title: shortProduct.titleShort,
    image: firstImage(shortGallery),
    price: shortProduct.price,
    originalPrice: shortProduct.originalPrice,
    discountPercent: shortProduct.discountPercent,
    shipping: shortProduct.shipping,
    rating: shortProduct.rating,
    variant: shortProduct.variant,
    storeName: shortProduct.store.name,
  },
  bermuda: {
    key: "bermuda",
    id: "kit-3-bermudas-sarja-bolsa-embutida",
    pagePath: "/bermuda",
    title: bermudaProduct.titleShort,
    image: firstImage(bermudaGallery),
    price: bermudaProduct.price,
    originalPrice: bermudaProduct.originalPrice,
    discountPercent: bermudaProduct.discountPercent,
    shipping: bermudaProduct.shipping,
    rating: bermudaProduct.rating,
    variant: bermudaProduct.variant,
    storeName: bermudaProduct.store.name,
  },
  magnesio: {
    key: "magnesio",
    id: "combo-magnesio-inositol-bodyaction",
    pagePath: "/magnesio",
    title: magnesioProduct.titleShort,
    image: firstImage(magnesioGallery),
    price: magnesioProduct.price,
    originalPrice: magnesioProduct.originalPrice,
    discountPercent: magnesioProduct.discountPercent,
    shipping: magnesioProduct.shipping,
    rating: magnesioProduct.rating,
    variant: magnesioProduct.variant,
    storeName: magnesioProduct.store.name,
  },
  panela: {
    key: "panela",
    id: "jogo-panelas-ceramica-monaco-20-pecas",
    pagePath: "/panela",
    title: panelaProduct.titleShort,
    image: firstImage(panelaGallery),
    price: panelaProduct.price,
    originalPrice: panelaProduct.originalPrice,
    discountPercent: panelaProduct.discountPercent,
    shipping: panelaProduct.shipping,
    rating: panelaProduct.rating,
    variant: panelaProduct.variant,
    storeName: panelaProduct.store.name,
  },
};

export const defaultCheckoutProduct = checkoutProducts.motoserra;

export const isProductKey = (value: unknown): value is ProductKey =>
  value === "motoserra" ||
  value === "travesseiro" ||
  value === "rolima" ||
  value === "guarda" ||
  value === "coberta" ||
  value === "ferramentas" ||
  value === "panela" ||
  value === "forno" ||
  value === "tablet" ||
  value === "tablet2" ||
  value === "short" ||
  value === "bermuda" ||
  value === "magnesio" ||
  value === "drift" ||
  value === "wap" ||
  value === "serum";
