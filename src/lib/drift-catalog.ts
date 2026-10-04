import type { Review } from "@/lib/catalog";
import driftImage1 from "@/assets/uploads/5578.png";
import driftImage2 from "@/assets/uploads/5579.png";
import driftImage3 from "@/assets/uploads/5580.png";
import driftImage4 from "@/assets/uploads/5581.png";

export const colorImages = { fogoGelo: driftImage1 };
export const gallery = [driftImage1, driftImage2, driftImage3, driftImage4];
export const descriptionImages = [driftImage1, driftImage2, driftImage3, driftImage4];
export const creatorVideos = [
  {
    id: "7682124835245395221",
    href: "https://www.tiktok.com/@acheilazaparoli/video/7682124835245395221",
  },
  {
    id: "7688380165759454485",
    href: "https://www.tiktok.com/@andressaebetao/video/7688380165759454485",
  },
  {
    id: "7687642483508907285",
    href: "https://www.tiktok.com/@marcele.aquino15/video/7687642483508907285",
  },
];

export const reviews: Review[] = [
  {
    name: "C****a M.",
    stars: 5,
    variant: "Fogo & Gelo",
    text: "O drift trike é muito divertido e as rodas traseiras giram de verdade. As três velocidades ajudam bastante no controle.",
    photos: [],
    verified: true,
    country: "Brasil",
    date: "há 2 dias",
  },
  {
    name: "R****o S.",
    stars: 5,
    variant: "Fogo & Gelo",
    text: "Chegou bem embalado e meu filho adorou. A montagem foi simples e o acabamento é muito bonito.",
    photos: [],
    verified: true,
    country: "Brasil",
    date: "há 5 dias",
  },
  {
    name: "A****a P.",
    stars: 4,
    variant: "Fogo & Gelo",
    text: "Produto potente e estável. O seletor de velocidade e o display de bateria são muito úteis.",
    photos: [],
    verified: true,
    country: "Brasil",
    date: "há 1 semana",
  },
];

export const product = {
  slug: "drift",
  titleShort: "HDJ Drift Trike Elétrico Infantil 350W 36V com 3 Velocidades, Rodas Traseiras Giratórias 360° e Kit de Proteção",
  titleFull: "HDJ Drift Trike Elétrico Infantil 350W 36V com 3 Velocidades, Rodas Traseiras Giratórias 360° e Kit de Proteção",
  price: 97.9,
  originalPrice: 897.9,
  discountPercent: 89,
  discountValue: 800,
  shipping: 0,
  installments: { count: 4, value: 24.48 },
  rating: 0,
  ratingCount: 0,
  sold: "",
  variant: "Fogo & Gelo",
  store: { name: "HDJ", initials: "HDJ", color: "#111827", sold: "" },
  specs: [
    "Motor elétrico de 350W e sistema de 36V",
    "3 níveis de velocidade: 0–10 km/h, 10–15 km/h e 15–20 km/h",
    "Velocidade máxima indicada de 20 km/h",
    "Display de bateria no guidão",
    "Seletor de velocidade, buzina e chave de energia",
    "Rodas traseiras giratórias em 360° para manobras de drift",
    "Aceleração por comando no guidão",
    "Centro de gravidade baixo e estrutura reforçada",
    "Pneu dianteiro de alta aderência",
    "Sistema de suspensão traseira",
    "Apoios laterais para os pés e rodas de apoio 360°",
    "Kit de proteção incluído conforme a oferta",
  ],
};

export const money = (value: number) =>
  "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
