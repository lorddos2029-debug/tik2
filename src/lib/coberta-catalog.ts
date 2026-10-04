import cobertaImage1 from "@/assets/uploads/5605.png";
import cobertaImage2 from "@/assets/uploads/5606.png";
import cobertaImage3 from "@/assets/uploads/5607.png";
import cobertaImage4 from "@/assets/uploads/5608.png";
import reviewImage1 from "@/assets/uploads/coberta-review-1.webp";
import reviewImage2 from "@/assets/uploads/coberta-review-2.webp";
import reviewImage3 from "@/assets/uploads/coberta-review-3.webp";
import reviewImage4 from "@/assets/uploads/coberta-review-4.webp";
import reviewImage5 from "@/assets/uploads/coberta-review-5.webp";

export const colorImages = {
  cereja: cobertaImage1,
  coracoesVermelho: cobertaImage2,
  floralRosa: cobertaImage3,
  coracoesBege: cobertaImage4,
  cereja: cobertaImage2,
  branco: cobertaImage3,
  verde: cobertaImage4,
};

export const gallery = [
  cobertaImage1,
  cobertaImage2,
  cobertaImage3,
  cobertaImage4,
];

export const descriptionImages = gallery;

export const creatorVideos: Array<{ id: string }> = [];

export const reviews = [
  {
    name: "m**4",
    country: "BR",
    verified: "Verified purchase",
    stars: 5,
    variant: "Listrado/Azul, Casal",
    text:
      "Conforto: Não usei ainda, porém parece ser confortável. Forma e tamanho: Tem um formato impecável Cor: Perfeito.",
    item: "Listrado/Azul, Casal",
    date: "2026-10-02",
    images: [reviewImage1],
  },
  {
    name: "M**s d** f**a **",
    country: "BR",
    verified: "Verified purchase",
    stars: 5,
    variant: "Cereja/Vermelho, King",
    text: "Conforto: 10/10 Forma e tamanho: 10/10 Cor: 10/10",
    item: "Cereja/Vermelho, King",
    date: "2026-09-28",
    images: [reviewImage2, reviewImage3],
  },
  {
    name: "I**l ** R**s",
    country: "BR",
    verified: "Verified purchase",
    stars: 5,
    variant: "Cereja/Vermelho, Casal",
    text: "É perfeito qualidade boa eu amei",
    item: "Cereja/Vermelho, Casal",
    date: "2026-09-27",
    images: [reviewImage4, reviewImage5],
  },
];

export const product = {
  slug: "coberta",
  titleShort:
    "Kit 6 Peças Cobre Leito Piquet com Jogo de Fronhas Ponto Palito e Lençol de Elástico",
  titleFull:
    "Kit 6 Peças Cobre Leito Piquet com Jogo de Fronhas Ponto Palito e Lençol de Elástico para Cama Confortável",
  price: 59.9,
  originalPrice: 127.9,
  discountPercent: 53,
  discountValue: 68,
  shipping: 0,
  installments: { count: 6, value: 9.98 },
  rating: 5,
  ratingCount: 3,
  sold: "",
  variant: "Cereja",
  store: {
    name: "Loja",
    initials: "KIT",
    color: "#9a3b45",
    sold: "",
  },
  specs: [
    "Kit com 6 peças para compor a cama",
    "Cobre-leito com acabamento piquet",
    "Jogo de fronhas com acabamento ponto palito",
    "Lençol com elástico",
    "Opções variadas de cores e estampas",
    "Conjunto coordenado para deixar a cama organizada e confortável",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
