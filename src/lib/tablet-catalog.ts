import tabletImageCinza from "@/assets/uploads/5037.png";
import tabletImageAzul from "@/assets/uploads/5039.png";
import tabletImageRoxo from "@/assets/uploads/5040.png";
import tabletImagePreto from "@/assets/uploads/5041.png";

export const colorImages = {
  Cinza: tabletImageCinza,
  Azul: tabletImageAzul,
  Roxo: tabletImageRoxo,
  Preto: tabletImagePreto,
};

export const gallery = [
  tabletImageCinza,
  tabletImageAzul,
  tabletImageRoxo,
  tabletImagePreto,
];

export const descriptionImages = [tabletImageCinza, tabletImageAzul, tabletImageRoxo, tabletImagePreto];

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [
  {
    poster: tabletImageCinza,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7689101637536812308",
  },
  {
    poster: tabletImageAzul,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7686934021774888212",
  },
  {
    poster: tabletImageRoxo,
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7686933316188097812",
  },
];

export const reviews = [
  {
    name: "M****a S.",
    stars: 5,
    variant: "Preto",
    text: "O tablet chegou muito bem embalado e superou minhas expectativas. A tela é grande e a imagem é muito boa.",
    photos: [],
  },
  {
    name: "R****o A.",
    stars: 5,
    variant: "Cinza",
    text: "Ótimo para estudar e assistir vídeos. O teclado Bluetooth facilita bastante na hora de digitar.",
    photos: [],
  },
  {
    name: "C****a L.",
    stars: 5,
    variant: "Azul",
    text: "Produto bonito, rápido e com bastante espaço. Estou usando todos os dias para trabalho e entretenimento.",
    photos: [],
  },
  {
    name: "J****o P.",
    stars: 5,
    variant: "Preto",
    text: "A bateria dura bem e o Android 14 funciona muito bem. Excelente custo-benefício.",
    photos: [],
  },
  {
    name: "A****a C.",
    stars: 5,
    variant: "Cinza",
    text: "Veio completo com teclado e acessórios. A câmera também tem uma qualidade muito boa.",
    photos: [],
  },
];

export const product = {
  slug: "tablet",
  titleShort:
    "JEPK T105 NOVO Tablet 10.1 Android 14.0 512GB e 8GB com Câmera Traseira e Teclado Bluetooth",
  titleFull:
    "JEPK T105 NOVO Tablet 10.1 Android 14.0 512GB e 8GB com Câmera Traseira e Teclado Bluetooth para Entretenimento e Estudo",
  price: 87.9,
  originalPrice: 631,
  discountPercent: 86,
  discountValue: 543.1,
  shipping: 26.6,
  installments: { count: 9, value: 9.77 },
  rating: 4.8,
  ratingCount: 184,
  sold: "2.1K",
  variant: "Preto",
  store: {
    name: "JEPK Store",
    initials: "JEPK",
    color: "#2f7fff",
    sold: "21.8K vendido(s)",
  },
  specs: [
    "Tela de 10,1 polegadas",
    "Sistema operacional Android 14.0",
    "Armazenamento de 512GB",
    "Memória RAM de 8GB",
    "Câmera frontal de 5MP",
    "Câmera traseira de 13MP",
    "Teclado Bluetooth incluso",
    "Indicado para entretenimento, estudo e trabalho",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });