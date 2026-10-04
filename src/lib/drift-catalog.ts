import type { Review } from "@/lib/catalog";
import driftImage1 from "@/assets/uploads/drift-1.png";
import driftImage2 from "@/assets/uploads/drift-2.png";
import driftImage3 from "@/assets/uploads/drift-3.png";
import driftImage4 from "@/assets/uploads/drift-4.png";

export const colorImages = { fogoGelo: driftImage1 };
export const gallery = [driftImage1, driftImage2, driftImage3, driftImage4];
export const descriptionImages = [driftImage1, driftImage2, driftImage3, driftImage4];
export const creatorVideos: { id: string; href: string }[] = [];
export const reviews: Review[] = [];

export const product = {
  slug: "drift",
  titleShort: "HDJ Drift Trike Elétrico Infantil 350W 36V com 3 Velocidades, Rodas Traseiras Giratórias 360° e Kit de Proteção",
  titleFull: "HDJ Drift Trike Elétrico Infantil 350W 36V com 3 Velocidades, Rodas Traseiras Giratórias 360° e Kit de Proteção",
  price: 97.9,
  originalPrice: 97.9,
  discountPercent: 0,
  discountValue: 0,
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
