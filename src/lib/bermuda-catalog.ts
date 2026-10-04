import bermudaImage1 from "@/assets/uploads/5236.png";
import bermudaImage2 from "@/assets/uploads/5237.png";
import bermudaImage3 from "@/assets/uploads/5238.png";
import bermudaImage4 from "@/assets/uploads/5240.png";
import bermudaColorImage1 from "@/assets/uploads/5241.png";
import bermudaColorImage2 from "@/assets/uploads/5242.png";
import bermudaColorImage3 from "@/assets/uploads/5243.png";
import bermudaColorImage4 from "@/assets/uploads/5244.png";
import bermudaReviewImage1 from "@/assets/uploads/5245.png";
import bermudaReviewImage2 from "@/assets/uploads/5246.png";
import bermudaReviewImage3 from "@/assets/uploads/5247.png";
import bermudaReviewImage4 from "@/assets/uploads/5248.png";

export const colorImages = {
  Bege: bermudaImage1,
  "Azul-marinho": bermudaImage2,
  Branca: bermudaImage3,
  Bordô: bermudaImage4,
  "Kit Bege, Preto e Bordô": bermudaColorImage1,
  "Kit Bege, Preto e Vinho": bermudaColorImage2,
  "Kit Bege, Verde e Cinza": bermudaColorImage3,
  "Kit Caqui, Marinho e Mostarda": bermudaColorImage4,
};

export const gallery = [
  bermudaImage1,
  bermudaImage2,
  bermudaImage3,
  bermudaImage4,
];

export const descriptionImages = gallery;

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7654617115139263762",
  },
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7643260206264225032",
  },
  {
    poster: "",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7665345770085731592",
  },
];

export const reviews = [
  {
    name: "R****o S.",
    stars: 5,
    variant: "Kit com 3 bermudas · Tamanho 42",
    text: "As bermudas têm ótimo acabamento, tecido confortável e vestiram muito bem. O bolso embutido é bastante prático.",
    photos: [bermudaReviewImage1],
  },
  {
    name: "M****s A.",
    stars: 5,
    variant: "Kit com 3 bermudas · Tamanho 44",
    text: "Chegaram bem embaladas e as cores são bonitas. O tamanho ficou certinho e o material parece resistente.",
    photos: [bermudaReviewImage2],
  },
  {
    name: "J****o P.",
    stars: 5,
    variant: "Kit com 3 bermudas · Tamanho 40",
    text: "Produto confortável para usar no dia a dia e no verão. Gostei muito do caimento e do custo-benefício.",
    photos: [bermudaReviewImage3],
  },
  {
    name: "C****s L.",
    stars: 5,
    variant: "Kit com 3 bermudas · Tamanho 46",
    text: "A sarja é leve e as bermudas têm bom acabamento. As três cores vieram conforme o anúncio.",
    photos: [bermudaReviewImage4],
  },
  {
    name: "F****e R.",
    stars: 5,
    variant: "Kit com 3 bermudas · Tamanho 48",
    text: "Ficaram confortáveis e não apertaram. Recomendo para quem procura bermudas casuais para o verão.",
    photos: [],
  },
];

export const product = {
  slug: "bermuda",
  titleShort:
    "Kit 3 bermuda sarja masculino bolsa embutida economica premiun Shorts Casuais De Verão Shorts Essenciais",
  titleFull:
    "Kit 3 bermuda sarja masculino bolsa embutida economica premiun Shorts Casuais De Verão Shorts Essenciais, com tecido confortável, acabamento resistente e modelagem casual",
  price: 69.9,
  originalPrice: 159.9,
  discountPercent: 56,
  discountValue: 90,
  shipping: 26.6,
  installments: { count: 6, value: 11.65 },
  rating: 4.8,
  ratingCount: 184,
  sold: "3.8K",
  variant: "Kit com 3 bermudas",
  store: {
    name: "Moda Casual Premium",
    initials: "MP",
    color: "#49352a",
    sold: "8.7K vendido(s)",
  },
  specs: [
    "Kit com 3 bermudas masculinas",
    "Modelo casual de verão em sarja",
    "Bolsa embutida e bolsos funcionais",
    "Tecido confortável e resistente",
    "Ideal para uso diário, passeio, praia e viagens",
    "Cores variadas conforme a opção selecionada",
    "Tamanhos disponíveis: 38, 40, 42, 44, 46 e 48",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });