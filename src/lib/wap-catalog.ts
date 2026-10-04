import type { Review } from "@/lib/catalog";
import wapImage1 from "@/assets/uploads/5587.png";
import wapImage2 from "@/assets/uploads/5588.png";
import wapImage3 from "@/assets/uploads/5589.png";
import wapImage4 from "@/assets/uploads/5590.png";

export const gallery = [wapImage1, wapImage2, wapImage3, wapImage4];

export const descriptionImages = [wapImage1, wapImage2, wapImage3, wapImage4];

export const creatorVideos: Array<{ id: string; href: string }> = [];

export const reviews: Review[] = [
  {
    name: "J****o S.",
    stars: 5,
    variant: "110V",
    text: "Lavadora compacta, potente e muito prática para lavar o carro e a calçada.",
    photos: [],
  },
  {
    name: "M****a R.",
    stars: 5,
    variant: "220V",
    text: "Chegou bem embalada e acompanha os acessórios necessários para começar a usar.",
    photos: [],
  },
  {
    name: "A****o P.",
    stars: 5,
    variant: "110V",
    text: "A pressão é excelente para limpeza do quintal. O jato regulável ajuda bastante.",
    photos: [],
  },
  {
    name: "C****a F.",
    stars: 4,
    variant: "220V",
    text: "Produto fácil de montar, ocupa pouco espaço e funciona muito bem.",
    photos: [],
  },
];

export const product = {
  slug: "wap",
  titleShort: "Lavadora De Alta Pressão Ágil 1800 1300psi Wap",
  titleFull:
    "Lavadora De Alta Pressão Ágil 1800 1300psi Wap com Jato Regulável, Mangueira de 3m e Engate Rápido",
  price: 87.9,
  originalPrice: 297.9,
  discountPercent: 71,
  discountValue: 210,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.9,
  ratingCount: 128,
  sold: "1,2 mil",
  variant: "110V",
  store: {
    name: "WAP",
    initials: "WAP",
    color: "#f59e0b",
    sold: "24.6K vendido(s)",
  },
  specs: [
    "Modelo: Ágil 1800",
    "Pressão máxima: 1300 PSI",
    "Jato regulável para diferentes tipos de limpeza",
    "Mangueira de alta pressão com 3 metros",
    "Engates rápidos para montagem sem ferramentas",
    "Acompanha pistola, lança e engate rápido",
    "Disponível nas voltagens 110V e 220V",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });