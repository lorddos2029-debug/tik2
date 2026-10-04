import type { Review } from "@/lib/catalog";
import guardaImage1 from "@/assets/uploads/4729.png";
import guardaImage2 from "@/assets/uploads/4730.png";
import guardaImage3 from "@/assets/uploads/4731.png";
import guardaImage4 from "@/assets/uploads/4732.png";
import guardaBlueDark from "@/assets/uploads/4734.png";
import guardaBlueLight from "@/assets/uploads/4735.png";
import guardaBlack from "@/assets/uploads/4736.png";
import guardaBeige from "@/assets/uploads/4737.png";
import guardaRed from "@/assets/uploads/4746.png";
import guardaUvProtection from "@/assets/uploads/4738.png";
import guardaRedDetail from "@/assets/uploads/4739.png";
import guardaDescription1 from "@/assets/uploads/4741.png";
import guardaDescription2 from "@/assets/uploads/4742.png";
import guardaDescription3 from "@/assets/uploads/4743.png";
import guardaDescription4 from "@/assets/uploads/4745.png";

export const colorImages = {
  azulMarinho: guardaBlueDark,
  azulClaro: guardaBlueLight,
  preto: guardaBlack,
  bege: guardaBeige,
  vermelho: guardaRed,
};

export const gallery = [
  guardaImage1,
  guardaImage2,
  guardaImage3,
  guardaImage4,
  guardaUvProtection,
  guardaRedDetail,
];

export const descriptionImages = [
  guardaDescription1,
  guardaDescription3,
  guardaDescription4,
];

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
    name: "M****a S.",
    stars: 5,
    variant: "Vermelho",
    text: "Guarda-chuva muito bonito e resistente. Abre e fecha automaticamente e chegou bem embalado.",
    photos: [],
  },
  {
    name: "R****o A.",
    stars: 5,
    variant: "Vermelho",
    text: "Tamanho ótimo, protege bastante do sol e da chuva. A estrutura parece bem reforçada.",
    photos: [],
  },
  {
    name: "C****a L.",
    stars: 5,
    variant: "Vermelho",
    text: "Gostei muito da proteção solar e do acabamento. É compacto quando fechado e fácil de carregar.",
    photos: [],
  },
  {
    name: "J****o P.",
    stars: 4,
    variant: "Vermelho",
    text: "Produto bonito e funcional. O botão de abertura facilita bastante no dia a dia.",
    photos: [],
  },
];

export const product = {
  slug: "guarda",
  titleShort:
    "10/12 Hastes Guarda Chuva Automático Sombrinha Grande Proteção Solar UV Reforçado Dobrável colorido",
  titleFull:
    "10/12 Hastes Guarda Chuva Automático Sombrinha Grande Proteção Solar UV Reforçado Dobrável colorido",
  price: 37.9,
  originalPrice: 87.9,
  discountPercent: 57,
  discountValue: 50,
  shipping: 26.6,
  installments: { count: 4, value: 9.48 },
  rating: 4.8,
  ratingCount: 86,
  sold: "1,5 mil",
  variant: "Vermelho",
  store: {
    name: "Casa & Cia Store",
    initials: "CC",
    color: "#991f3d",
    sold: "12.4K vendido(s)",
  },
  specs: [
    "Abertura e fechamento automáticos com um botão",
    "Modelo reforçado com 10/12 hastes",
    "Proteção solar UV e tecido com quatro camadas",
    "Proteção solar equivalente a UPF50+",
    "Estrutura resistente para uso em dias de chuva e sol",
    "Modelo dobrável e fácil de transportar",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });