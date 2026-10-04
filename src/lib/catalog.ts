import video1 from "@/assets/video1.mp4.asset.json";
import video2 from "@/assets/video2.mp4.asset.json";
import video3 from "@/assets/video3.mp4.asset.json";
import video4 from "@/assets/video4.mp4.asset.json";

export const gallery = Array.from({ length: 9 }, (_, index) => `/products/motosserra/gal${index + 1}.webp`);

/** Description images reuse gallery slots 2,3,4,5,6,8 (same as the reference site). */
export const descriptionImages = [2, 3, 4, 5, 6, 8].map((number) => `/products/motosserra/gal${number}.webp`);

export const creatorVideos = [
  { poster: "/products/motosserra/poster1.jpg", src: video1.url },
  { poster: "/products/motosserra/poster2.jpg", src: video2.url },
  { poster: "/products/motosserra/poster3.jpg", src: video3.url },
  { poster: "/products/motosserra/poster4.jpg", src: video4.url },
  { poster: "/products/motosserra/poster5.jpg", src: "" },
];

export interface Review {
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
  verified?: boolean;
  country?: string;
  date?: string;
}

export const reviews: Review[] = [
  {
    name: "R****o S.",
    stars: 5,
    variant: "Padrão",
    text: "Produto muito forte e potente, deu conta do recado aqui no sítio.",
    photos: ["/products/motosserra/rev1.webp", "/products/motosserra/rev2.webp", "/products/motosserra/rev3.webp"],
  },
  {
    name: "M****s A.",
    stars: 5,
    variant: "Padrão",
    text: "Chegou antes do prazo e a montagem foi bem tranquila.",
    photos: ["/products/motosserra/rev4.webp", "/products/motosserra/rev5.webp"],
  },
  {
    name: "F****e M.",
    stars: 5,
    variant: "Padrão",
    text: "O sabre de 20 polegadas é excelente para troncos maiores.",
    photos: ["/products/motosserra/rev6.webp", "/products/motosserra/rev7.webp"],
  },
  {
    name: "J**é R.",
    stars: 5,
    variant: "Padrão",
    text: "Ótimo custo-benefício para uma máquina de 52 cilindradas.",
    photos: ["/products/motosserra/rev8.webp", "/products/motosserra/rev9.webp"],
  },
  {
    name: "A***é L.",
    stars: 5,
    variant: "Padrão",
    text: "A máquina liga fácil e o motor é bem estável.",
    photos: ["/products/motosserra/rev10.webp"],
  },
];

export const product = {
  slug: "motoserra",
  titleShort: "DEWEN Motosserra a Gasolina 52CC 20 Polegadas 3.0HP/2.2kW Corte Profissional de",
  titleFull:
    "DEWEN Motosserra a Gasolina 52CC 20 Polegadas 3.0HP/2.2kW Corte Profissional de Árvores Barra de 20 Polegadas 2 Tempos Alta Potência Garantia Oficial",
  price: 87.9,
  originalPrice: 293,
  discountPercent: 70,
  discountValue: 205.1,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.8,
  ratingCount: 184,
  sold: "2.847",
  variant: "Padrão",
  store: {
    name: "DEWEN Hardware Ferramentas",
    initials: "DEWEN",
    color: "#FFD700",
    sold: "24.6K vendido(s)",
  },
  specs: [
    "Tamanho: 20 polegadas",
    "Cilindrada: 52cc",
    'Especificações da corrente: 20" / 0.058" - 325',
    "Potência: 3.0 HP",
    "Velocidade de marcha lenta: 11500 rpm",
    "Potência de saída: 2.2 kW",
    "！！！Proporção recomendada: 50:1 (Gasolina : Óleo especial para motor de dois tempos)",
  ],
};

export const money = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
