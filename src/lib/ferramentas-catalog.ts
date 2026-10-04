import video1 from "@/assets/video1.mp4.asset.json";
import video2 from "@/assets/video2.mp4.asset.json";
import video3 from "@/assets/video3.mp4.asset.json";
import toolImage1 from "@/assets/uploads/4748.png";
import toolImage2 from "@/assets/uploads/4749.png";
import toolImage3 from "@/assets/uploads/4750.png";
import toolImage4 from "@/assets/uploads/4751.png";

const toolImages = [toolImage1, toolImage2, toolImage3, toolImage4];

export const gallery = toolImages;
export const descriptionImages = toolImages;

export const creatorVideos = [
  {
    poster: toolImages[0],
    src: video1.url,
    embedUrl: "https://www.tiktok.com/player/v1/7677986023191612690",
  },
  {
    poster: toolImages[2],
    src: video2.url,
    embedUrl: "https://www.tiktok.com/player/v1/7682163205044440340",
  },
  {
    poster: toolImages[3],
    src: video3.url,
    embedUrl: "https://www.tiktok.com/player/v1/7678090252807949589",
  },
];

export const reviews = [
  {
    name: "R****o S.",
    stars: 5,
    variant: "222 ferramentas",
    text: "A maleta chegou completa e muito bem organizada. Pelo preço, valeu muito a pena.",
    photos: [],
  },
  {
    name: "M****s A.",
    stars: 5,
    variant: "222 ferramentas",
    text: "Tem bastante ferramenta e a maleta facilita muito para guardar tudo.",
    photos: [],
  },
  {
    name: "J****o P.",
    stars: 5,
    variant: "222 ferramentas",
    text: "Material muito bom para pequenos reparos em casa e no carro.",
    photos: [],
  },
  {
    name: "F****e L.",
    stars: 5,
    variant: "222 ferramentas",
    text: "Chegou rápido, bem embalada e sem nenhuma peça faltando.",
    photos: [],
  },
  {
    name: "A****a C.",
    stars: 5,
    variant: "222 ferramentas",
    text: "Gostei bastante da organização da maleta e da variedade de ferramentas.",
    photos: [],
  },
];

export const product = {
  slug: "ferramentas",
  titleShort: "Jogo Oficina Master Maleta Com 222 Ferramentas 5000r Robust",
  titleFull:
    "Jogo Oficina Master Maleta Com 222 Ferramentas 5000r Robust, kit completo para manutenção doméstica, automotiva e profissional",
  price: 87.9,
  originalPrice: 299,
  discountPercent: 71,
  discountValue: 211.1,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.8,
  ratingCount: 184,
  sold: "3.2K",
  variant: "222 ferramentas",
  store: {
    name: "Robust Ferramentas",
    initials: "ROBUST",
    color: "#161823",
    sold: "18.4K vendido(s)",
  },
  specs: [
    "Quantidade: 222 peças",
    "Maleta organizadora inclusa",
    "Indicado para uso doméstico, automotivo e profissional",
    "Ferramentas variadas para montagem, reparo e manutenção",
    "Maleta prática para transportar e armazenar as peças",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });