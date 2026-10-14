/** Dados da câmera Jortan enviados pelo anunciante. Não inventar avaliações ou descontos. */
export const gallery = Array.from({ length: 8 }, (_, i) => `/products/camera/camera-${i + 1}.webp`);
export const descriptionImages = [...gallery];
export const creatorVideos: { poster: string; src: string }[] = [];
export const reviews: { name: string; stars: number; variant: string; text: string; photos: string[] }[] = [];

export const product = {
  slug: "camera",
  titleShort: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD – Monitoramento Inteligente via Celular com Visão Noturna e Proteção IP66",
  titleFull: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD – Monitoramento Inteligente via Celular com Visão Noturna e Proteção IP66",
  price: 69.90,
  originalPrice: 69.90,
  discountPercent: 0,
  discountValue: 0,
  shipping: 0,
  installments: { count: 1, value: 69.90 },
  rating: 0,
  ratingCount: 0,
  sold: "—",
  variant: "Branca",
  store: {
    name: "Jortan",
    initials: "JORTAN",
    color: "#19865f",
    sold: "Câmera de segurança",
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
