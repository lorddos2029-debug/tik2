/** Dados da câmera Jortan enviados pelo anunciante. Não inventar avaliações ou descontos. */
export const colorImages = {
  Branca: "/products/camera/cor-branca.webp",
  Preta: "/products/camera/cor-preta.webp",
  Rosa: "/products/camera/cor-rosa.webp",
} as const;

export const gallery = Array.from({ length: 8 }, (_, i) => `/products/camera/camera-${i + 1}.webp`);
export const descriptionImages = [...gallery];
export const creatorVideos: Array<{ poster: string; src: string; embedUrl: string; href: string }> = [
  {
    poster: "/products/camera/camera-1.webp",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7695402661847305492",
    href: "https://www.tiktok.com/@vanessadantask/video/7695402661847305492",
  },
  {
    poster: "/products/camera/camera-1.webp",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7695426729971682580",
    href: "https://www.tiktok.com/@rodrigoarantespro/video/7695426729971682580",
  },
  {
    poster: "/products/camera/camera-1.webp",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7695427212304010516",
    href: "https://www.tiktok.com/@rodrigoarantespro/video/7695427212304010516",
  },
];
export const reviews: { name: string; stars: number; variant: string; text: string; photos: string[] }[] = [];

export const product = {
  slug: "camera",
  titleShort: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD – Monitoramento Inteligente via Celular com Visão Noturna e Proteção IP66",
  titleFull: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD – Monitoramento Inteligente via Celular com Visão Noturna e Proteção IP66",
  price: 69.90,
  originalPrice: 199.90,
  discountPercent: 65,
  discountValue: 130,
  shipping: 0,
  installments: { count: 1, value: 69.90 },
  rating: 0,
  ratingCount: 0,
  sold: "—",
  variant: "Branca",
  store: {
    name: "TikTok",
    initials: "TikTok",
    color: "#000000",
    sold: "24.312 vendidos",
  },
  specs: [
    "Câmera de segurança Wi-Fi IP para área externa, modelo Jortan.",
    "Resolução Full HD 1080p, conforme informações fornecidas.",
    "Monitoramento em tempo real pelo celular, com suporte anunciado a Android e iOS.",
    "Detecção de movimento com alertas no aplicativo.",
    "Áudio bidirecional: ouça e fale pelo aplicativo.",
    "Visão noturna colorida.",
    "Rotação de até 360° com controle pelo aplicativo.",
    "Proteção IP66 contra poeira e jatos de água, conforme informação do produto.",
    "Dimensões ilustradas: aproximadamente 185 mm de altura e 90 mm de largura.",
    "Cor: branca. Quantidade: 1 unidade.",
  ],
};

export const money = (value: number) =>
  "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
