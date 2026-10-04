import panelaMarrom from "@/assets/uploads/4794.png";
import panelaBranca from "@/assets/uploads/4795.png";
import panelaPreta from "@/assets/uploads/4796.png";
import panelaRose from "@/assets/uploads/4797.png";
import reviewPhotoPanelas from "@/assets/uploads/4801.png";
import reviewPhotoCozinha from "@/assets/uploads/4802.png";
import reviewPhotoUtensilios from "@/assets/uploads/4803.png";

export const colorImages = {
  Marrom: panelaMarrom,
  Branca: panelaBranca,
  Preta: panelaPreta,
  Rosé: panelaRose,
};

/** Somente imagens do produto na galeria principal. */
export const gallery = [
  panelaMarrom,
  panelaBranca,
  panelaPreta,
  panelaRose,
];

/** As fotos das avaliações ficam exclusivamente em `reviews.photos`. */
export const descriptionImages = [
  panelaMarrom,
  panelaBranca,
  panelaPreta,
];

export const creatorVideos = [
  {
    poster: "https://picsum.photos/seed/criador-panelas-1/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7662555642598526228",
  },
  {
    poster: "https://picsum.photos/seed/criador-panelas-2/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7682187339057138962",
  },
  {
    poster: "https://picsum.photos/seed/criador-panelas-3/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7687967078422252808",
  },
];

export const reviews = [
  {
    name: "M****a S.",
    stars: 5,
    variant: "Jogo completo",
    text: "As panelas são lindas e chegaram muito bem embaladas. O acabamento é excelente.",
    photos: [reviewPhotoPanelas],
  },
  {
    name: "C****a R.",
    stars: 5,
    variant: "20 peças",
    text: "Conjunto completo, as peças são ótimas para o uso diário e fáceis de limpar.",
    photos: [reviewPhotoCozinha],
  },
  {
    name: "A****a P.",
    stars: 5,
    variant: "Jogo completo",
    text: "Gostei muito da qualidade e do tamanho das panelas. Recomendo.",
    photos: [reviewPhotoUtensilios],
  },
];

export const product = {
  slug: "panela",
  titleShort: "Jogo de Panelas de Cerâmica Antiaderente 20 peças Mônaco",
  titleFull:
    "Jogo de Panelas de Cerâmica Antiaderente 20 peças Mônaco com tampas e acessórios",
  price: 97.9,
  originalPrice: 539.9,
  discountPercent: 82,
  discountValue: 442,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.8,
  ratingCount: 127,
  sold: "1.2K",
  variant: "Jogo completo",
  store: {
    name: "Mônaco Casa & Cozinha",
    initials: "MC",
    color: "#d97706",
    sold: "18.4K vendido(s)",
  },
  specs: [
    "Conjunto com 20 peças",
    "Revestimento cerâmico antiaderente",
    "Tampas inclusas",
    "Indicado para uso diário",
    "Fácil de limpar",
    "Design moderno e acabamento resistente",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });