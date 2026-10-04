import type { Review } from "@/lib/catalog";

export const gallery = [
  "/products/travesseiro/travesseiro-1.webp",
  "/products/travesseiro/travesseiro-2.webp",
  "/products/travesseiro/travesseiro-3.webp",
  "/products/travesseiro/travesseiro-4.webp",
  "/products/travesseiro/travesseiro-5.webp",
];

export const descriptionImages = gallery.slice(1);

/** O TikTok bloqueia a mídia dos criadores deste anúncio por captcha. */
export const creatorVideos: Array<{ poster: string; src: string }> = [];

export const reviews: Review[] = [
  {
    name: "V**n p**o",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-Branco",
    date: "2026-09-28",
    text: "Pode comprar sem medo, original da abranuv, com nome e etiqueta como coloquei no vídeo, muito confortável, recomendo.",
    photos: ["/products/travesseiro/avaliacoes/avaliacao-1.webp"],
  },
  {
    name: "E**s F**o S**a",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-Branco",
    date: "2026-09-26",
    text: "Conforto: Ótimo Excelente produto. O vendedor está de parabéns. Produto original.",
    photos: ["/products/travesseiro/avaliacoes/avaliacao-2.webp"],
  },
  {
    name: "V**",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-Branco",
    date: "2026-09-26",
    text: "Excelente compra igual ao anúncio ótimo para dormir muito conforto vale o preço gostei bastante",
    photos: [],
  },
  {
    name: "C**n C**n",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-kit2 Branco",
    date: "2026-09-21",
    text: "Forma e tamanho: Aspecto agradável, espero que resolva meus problemas de incomodo ao deitar",
    photos: ["/products/travesseiro/avaliacoes/avaliacao-3.webp"],
  },
  {
    name: "A**o ** S**s",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-Branco",
    date: "2026-09-03",
    text: "Conforto: Super confortável\nForma e tamanho: Tamanho adequado como no anúncio e live.\nCor: A cor é linda! Estou muito satisfeito e comprei um pra testar, agora vou pedir mais 3.",
    photos: ["/products/travesseiro/avaliacoes/avaliacao-5.webp"],
  },
  {
    name: "G**i",
    stars: 5,
    verified: true,
    country: "BR",
    variant: "Travesseiro-Branco",
    date: "2026-08-30",
    text: "Comprei de presente para meu marido e ele adorou, sensacional, ele ajuda a respirar melhor e reduz drasticamente o ronco, super recomendo, agora vou comprar um para mim",
    photos: ["/products/travesseiro/avaliacoes/avaliacao-4.webp"],
  },
];

export const product = {
  slug: "travesseiro",
  title: "Travesseiro Ergonômico Cervical Abranuv PRO2.0",
  titleShort: "Travesseiro Ergonômico Cervical Abranuv PRO2.0 em formato borboleta para dormir",
  titleFull:
    "Travesseiro Ergonômico Cervical Abranuv PRO2.0 em formato borboleta para dormir de costas ou de lado",
  price: 69.9,
  originalPrice: 233,
  discountPercent: 70,
  discountValue: 163.1,
  shipping: 26.6,
  installments: { count: 7, value: 9.99 },
  rating: 4.7,
  ratingCount: "4,4 mil",
  sold: "29,8 mil",
  variant: "Branco",
  dimensions: "62 × 41 cm",
  heights: "11 cm e 13 cm",
  store: {
    name: "Abranuv Store",
    initials: "ABRANUV",
    color: "#161823",
    sold: "Loja oficial",
  },
  specs: [
    "Formato: borboleta ergonômica",
    "Dimensões: 62 × 41 cm",
    "Alturas: 11 cm e 13 cm",
    "Indicado para dormir de costas ou de lado",
    "Apoio ergonômico para a região cervical",
  ],
};

export const pillowGallery = gallery;
export const pillowProduct = product;

export const money = (value: number) =>
  "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
