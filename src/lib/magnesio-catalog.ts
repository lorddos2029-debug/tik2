import flavorMaracuja from "@/assets/uploads/5281.png";
import flavorAbacaxi from "@/assets/uploads/5282.png";
import flavorFrutasVermelhas from "@/assets/uploads/5283.png";
import flavorMaracuja2 from "@/assets/uploads/5284.png";
import nutritionFactsImage from "@/assets/uploads/5285.png";
import magnesioBenefitsImage from "@/assets/uploads/5286.png";
import magnesioReviewImage1 from "@/assets/uploads/5287.png";
import magnesioReviewImage2 from "@/assets/uploads/5288.png";
import magnesioReviewImage3 from "@/assets/uploads/5289.png";
import magnesioReviewImage4 from "@/assets/uploads/5290.png";

export const colorImages = {
  Maracujá: flavorMaracuja,
  "Abacaxi com Hortelã": flavorAbacaxi,
  "Frutas Vermelhas": flavorFrutasVermelhas,
  "Maracujá com Abacaxi": flavorMaracuja2,
} as const;

export const gallery = [flavorMaracuja];

export const descriptionImages: string[] = [
  nutritionFactsImage,
  magnesioBenefitsImage,
];

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [
  {
    poster: flavorMaracuja,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7574561513462107410",
  },
  {
    poster: flavorAbacaxi,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7663497315826683152",
  },
  {
    poster: flavorFrutasVermelhas,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7635245195415653650",
  },
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
    name: "M****a S.",
    stars: 5,
    variant: "Maracujá",
    text: "Chegou bem embalado e o sabor de maracujá é muito agradável. O kit tem ótimo custo-benefício.",
    photos: [magnesioReviewImage1],
  },
  {
    name: "R****o A.",
    stars: 5,
    variant: "Abacaxi com Hortelã",
    text: "Gostei bastante do sabor e da praticidade. As três latas chegaram certinhas.",
    photos: [magnesioReviewImage2],
  },
  {
    name: "C****a P.",
    stars: 5,
    variant: "Frutas Vermelhas",
    text: "Produto conforme o anúncio, embalagem bonita e sabor gostoso.",
    photos: [magnesioReviewImage3],
  },
  {
    name: "F****e L.",
    stars: 5,
    variant: "Maracujá com Abacaxi",
    text: "Compra aprovada. Veio rápido e bem protegido.",
    photos: [magnesioReviewImage4],
  },
  {
    name: "J****o M.",
    stars: 4,
    variant: "Maracujá",
    text: "Bom produto e preço excelente pelo combo com três unidades.",
    photos: [],
  },
];

export const product = {
  slug: "magnesio",
  titleShort:
    "Combo 3 Unidades - Magnésio & Inositol Bodyaction - 3 Latas de 210g Cada",
  titleFull:
    "Combo 3 Unidades - Magnésio & Inositol Bodyaction - 3 Latas de 210g Cada",
  price: 59.9,
  originalPrice: 119.9,
  discountPercent: 50,
  discountValue: 60,
  shipping: 26.6,
  installments: { count: 6, value: 9.98 },
  rating: 4.8,
  ratingCount: 184,
  sold: "1.2K",
  variant: "Maracujá",
  store: {
    name: "Bodyaction Suplementos",
    initials: "BA",
    color: "#f2b900",
    sold: "18.4K vendido(s)",
  },
  specs: [
    "Combo com 3 latas de 210g cada",
    "Magnésio & Inositol Bodyaction",
    "Sabores disponíveis: Maracujá, Abacaxi com Hortelã e Frutas Vermelhas",
    "Produto em pó para preparo de bebida",
    "Consulte o rótulo para informações nutricionais e modo de preparo",
  ],
};

export const money = (v: number) =>
  "R$ " +
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });