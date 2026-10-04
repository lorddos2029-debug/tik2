import type { Review } from "@/lib/catalog";
import rolimaImage1 from "@/assets/uploads/4231.png";
import rolimaImage2 from "@/assets/uploads/4232.png";
import rolimaImage3 from "@/assets/uploads/4233.png";
import rolimaImage4 from "@/assets/uploads/4234.png";
import rolimaImage5 from "@/assets/uploads/4235.png";
import rolimaImage6 from "@/assets/uploads/4236.png";
import rolimaImage7 from "@/assets/uploads/4237.png";
import rolimaImage8 from "@/assets/uploads/4238.png";

export const gallery = [
  rolimaImage1,
  rolimaImage2,
  rolimaImage3,
  rolimaImage4,
];

export const colorImages = [
  rolimaImage1,
  rolimaImage2,
  rolimaImage3,
  rolimaImage4,
  rolimaImage5,
  rolimaImage6,
  rolimaImage7,
  rolimaImage8,
];

export const descriptionImages = gallery.slice(1);

export const creatorVideos: Array<{ poster: string; src: string }> = [];

export const reviews: Review[] = [
  {
    name: "J****o S.",
    stars: 5,
    variant: "Super Car",
    text: "Muito divertido! Meu filho adorou e o carrinho chegou bem embalado.",
    photos: [],
  },
  {
    name: "M****a R.",
    stars: 5,
    variant: "Super Car",
    text: "Produto resistente, bonito e fácil de montar. Recomendo a compra.",
    photos: [],
  },
  {
    name: "C****s A.",
    stars: 5,
    variant: "Super Car",
    text: "Suporta bem o peso e a diversão é garantida. Chegou antes do prazo.",
    photos: [],
  },
  {
    name: "F****e L.",
    stars: 4,
    variant: "Super Car",
    text: "Bom custo-benefício e acabamento muito bonito.",
    photos: [],
  },
];

export const product = {
  slug: "rolima",
  titleShort: "Carrinho de Rolimã Super Car Suporta até 100kg Unitoys",
  titleFull:
    "Carrinho de Rolimã Super Car Suporta até 100kg Unitoys, diversão para crianças e adultos",
  price: 87.9,
  originalPrice: 199,
  discountPercent: 56,
  discountValue: 111.1,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.8,
  ratingCount: 127,
  sold: "1.2 mil",
  variant: "Super Car",
  store: {
    name: "Unitoys Store",
    initials: "UT",
    color: "#e53935",
    sold: "8.7K vendido(s)",
  },
  specs: [
    "Modelo: Super Car",
    "Capacidade máxima: até 100kg",
    "Estrutura resistente para maior segurança",
    "Indicado para crianças e adultos",
    "Produto recreativo para uso em superfícies adequadas",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });