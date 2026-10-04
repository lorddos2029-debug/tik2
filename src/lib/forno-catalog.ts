import fornoImage1 from "@/assets/uploads/4804.png";
import fornoImage2 from "@/assets/uploads/4805.png";
import fornoImage3 from "@/assets/uploads/4806.png";
import fornoImage4 from "@/assets/uploads/4807.png";

export const gallery = [fornoImage1, fornoImage2, fornoImage3, fornoImage4];

export const descriptionImages = [fornoImage2, fornoImage3, fornoImage4];

export const creatorVideos: Array<{
  poster: string;
  src: string;
  embedUrl?: string;
}> = [
  {
    poster: "https://picsum.photos/seed/forno-criador-1/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7676857404155251976",
  },
  {
    poster: "https://picsum.photos/seed/forno-criador-2/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7689818111951834369",
  },
  {
    poster: "https://picsum.photos/seed/forno-criador-3/400/600",
    src: "",
    embedUrl: "https://www.tiktok.com/player/v1/7672477062761925909",
  },
];

export const reviews = [
  {
    name: "M****a S.",
    stars: 5,
    variant: "Forno 52L",
    text: "O forno chegou muito bem embalado e funcionando perfeitamente. Tem um ótimo tamanho e esquenta bastante.",
    photos: [],
  },
  {
    name: "R****o A.",
    stars: 5,
    variant: "Forno Elétrico Mondial",
    text: "Produto bonito, espaçoso e fácil de usar. A porta de vidro ajuda muito a acompanhar o preparo.",
    photos: [],
  },
  {
    name: "C****a L.",
    stars: 5,
    variant: "52 litros",
    text: "Gostei muito do forno. As funções são práticas e o timer com aviso sonoro facilita o dia a dia.",
    photos: [],
  },
  {
    name: "J****o P.",
    stars: 4,
    variant: "Forno 1800W",
    text: "Forno excelente para assar e gratinar. Chegou rápido e conforme o anúncio.",
    photos: [],
  },
];

export const product = {
  slug: "forno",
  titleShort: "Forno Elétrico Mondial Grand Family II 52L FRN-52-W 1800W",
  titleFull:
    "Forno Elétrico Mondial Grand Family II 52L FRN-52-W 1800W com porta de vidro, timer e controle de temperatura",
  price: 87.9,
  originalPrice: 377.81,
  discountPercent: 77,
  discountValue: 289.91,
  shipping: 26.6,
  installments: { count: 4, value: 21.98 },
  rating: 4.8,
  ratingCount: 94,
  sold: "1,2 mil",
  variant: "Forno 52L",
  store: {
    name: "Eletro Casa Store",
    initials: "EC",
    color: "#1d4f91",
    sold: "15.8K vendido(s)",
  },
  specs: [
    "Capacidade de 52 litros",
    "Potência de 1800W",
    "Controle de temperatura de 100°C a 250°C",
    "Seletor com 3 opções de aquecimento interno",
    "Timer de até 90 minutos com aviso sonoro",
    "Grelha com ajuste de altura",
    "Porta de vidro para melhor visualização dos preparos",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });