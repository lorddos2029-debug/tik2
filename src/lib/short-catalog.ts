import shortImage1 from "@/assets/uploads/5226.png";
import shortImage2 from "@/assets/uploads/5227.png";
import shortImage3 from "@/assets/uploads/5228.png";
import shortImage4 from "@/assets/uploads/5229.png";
import shortReviewImage1 from "@/assets/uploads/5232.png";
import shortReviewImage2 from "@/assets/uploads/5233.png";
import shortReviewImage3 from "@/assets/uploads/5234.png";
import shortReviewImage4 from "@/assets/uploads/5235.png";

export const colorImages = {
  Preto: shortImage3,
  Cinza: shortImage2,
  "Cinza claro": shortImage4,
  "Kit mesclado": shortImage1,
};

export const gallery = [shortImage1, shortImage2, shortImage3, shortImage4];

export const descriptionImages = gallery;

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7672510346342567188",
  },
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7689523639561129223",
  },
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7690577266543234324",
  },
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7681012908414799125",
  },
];

export const reviews = [
  {
    name: "J****o S.",
    stars: 5,
    variant: "Kit com 3 bermudas",
    text: "As bermudas são leves, confortáveis e secam muito rápido. Ótimo custo-benefício.",
    photos: [shortReviewImage1],
  },
  {
    name: "M****s R.",
    stars: 5,
    variant: "Preto · Tamanho G",
    text: "O tecido é bem macio e o tamanho ficou perfeito. Uso para academia e no dia a dia.",
    photos: [shortReviewImage2],
  },
  {
    name: "C****s A.",
    stars: 5,
    variant: "Kit mesclado · Tamanho GG",
    text: "Chegaram bem embaladas e as três bermudas são muito bonitas. Recomendo.",
    photos: [shortReviewImage3],
  },
  {
    name: "R****o P.",
    stars: 5,
    variant: "Cinza · Tamanho M",
    text: "Material respirável e confortável. Valeu muito a compra.",
    photos: [shortReviewImage4],
  },
  {
    name: "F****e L.",
    stars: 5,
    variant: "Cinza claro · Tamanho P",
    text: "A modelagem veste bem e o tecido realmente é fresco.",
    photos: [],
  },
];

export const product = {
  slug: "short",
  titleShort:
    "Kit 3 Bermudas Masculinas Seda Gelada Texturizada - Conforto e Estilo em Triplo",
  titleFull:
    "Kit 3 Bermudas Masculinas Seda Gelada Texturizada - Conforto e Estilo em Triplo, com tecido leve, respirável e secagem rápida",
  price: 59.9,
  originalPrice: 149,
  discountPercent: 60,
  discountValue: 89.1,
  shipping: 26.6,
  installments: { count: 6, value: 9.98 },
  rating: 4.8,
  ratingCount: 184,
  sold: "5.1K",
  variant: "Kit com 3 bermudas",
  store: {
    name: "Moda Conforto",
    initials: "MC",
    color: "#161823",
    sold: "12.8K vendido(s)",
  },
  specs: [
    "Kit com 3 bermudas masculinas",
    "Tecido seda gelada texturizada",
    "Material leve, macio e respirável",
    "Secagem rápida e toque confortável",
    "Possui bolsos com zíper",
    "Indicado para academia, praia, caminhada e uso diário",
    "Tamanhos disponíveis: P, M, G e GG",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });