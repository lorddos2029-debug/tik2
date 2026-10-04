import tablet2Image1 from "@/assets/uploads/5033.png";
import tablet2Image2 from "@/assets/uploads/5034.png";
import tablet2Image3 from "@/assets/uploads/5035.png";
import tablet2Image4 from "@/assets/uploads/5036.png";

export const colorImages = {
  Dourado: tablet2Image1,
  Cinza: tablet2Image2,
  Azul: tablet2Image3,
  Verde: tablet2Image4,
};

export const gallery = [tablet2Image1, tablet2Image2, tablet2Image3, tablet2Image4];

export const descriptionImages = [tablet2Image1, tablet2Image2, tablet2Image3, tablet2Image4];

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [];

export const reviews = [
  {
    name: "M****a S.",
    stars: 5,
    variant: "Dourado",
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
    variant: "Dourado",
    text: "A bateria dura bem e o Android 14 funciona muito bem. Excelente custo-benefício.",
    photos: [],
  },
  {
    name: "A***a C.",
    stars: 5,
    variant: "Verde",
    text: "Veio completo com teclado e acessórios. A câmera também tem uma qualidade muito boa.",
    photos: [],
  },
];

export const product = {
  slug: "tablet2",
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
  variant: "Dourado",
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