import serumImage1 from "@/assets/uploads/5636.png";
import serumImage2 from "@/assets/uploads/5637.png";
import serumDescription1 from "@/assets/uploads/5638.png";
import serumDescription2 from "@/assets/uploads/5640.png";

export const gallery = [serumImage1, serumImage2];

export const descriptionImages = [serumDescription1, serumDescription2];

export const creatorVideos: {
  id: string;
  href: string;
}[] = [];

export const reviews = [
  {
    name: "A****a M.",
    stars: 5,
    variant: "30ml",
    text: "A textura é leve e deixa a pele muito hidratada. Gostei bastante do resultado.",
    photos: [serumImage2],
  },
  {
    name: "C****a R.",
    stars: 5,
    variant: "30ml",
    text: "Chegou bem embalado e o sérum tem uma sensação refrescante na pele.",
    photos: [serumDescription2],
  },
  {
    name: "M****s S.",
    stars: 4,
    variant: "30ml",
    text: "Estou usando diariamente e minha pele está com aparência mais viçosa.",
    photos: [],
  },
  {
    name: "J****o L.",
    stars: 5,
    variant: "30ml",
    text: "Produto bonito, fácil de aplicar e com boa absorção.",
    photos: [serumImage1],
  },
];

export const product = {
  slug: "serum",
  titleShort:
    "GHK Zencial Envy Skin GHK - Sérum com Peptídeos de Cobre Colágeno e Ácido Hialurônico 30ml",
  titleFull:
    "GHK Zencial Envy Skin GHK - Sérum com Peptídeos de Cobre, Colágeno e Ácido Hialurônico 30ml",
  price: 69.9,
  originalPrice: 127.9,
  discountPercent: 45,
  discountValue: 58,
  shipping: 26.6,
  installments: { count: 7, value: 9.99 },
  rating: 4.9,
  ratingCount: 128,
  sold: "1,8 mil",
  variant: "30ml",
  store: {
    name: "TikTok Shop",
    initials: "TikTok",
    color: "#161823",
    sold: "24.6K vendido(s)",
  },
  specs: [
    "Conteúdo: 30ml",
    "Com peptídeos de cobre GHK-Cu",
    "Com colágeno e ácido hialurônico",
    "Textura leve e de rápida absorção",
    "Indicado para rotina diária de cuidados com a pele",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });