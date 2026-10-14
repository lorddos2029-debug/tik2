/** Imagens originais Bettdow fornecidas para /relogio (PNG 800px, sem redução de qualidade). */
export const colorImages = {
  Preto: "/products/relogio/preto.png",
  Branco: "/products/relogio/branco.png",
} as const;

export const gallery = Array.from({ length: 9 }, (_, index) => `/products/relogio/relogio-${index + 1}.png`);

/** Galeria ilustrativa e especificações detalhadas na descrição. */
export const descriptionImages = gallery.slice(1);
export const creatorVideos: { poster: string; src: string; embedUrl?: string }[] = [];

/** Avaliações transcritas dos prints enviados para este produto. */
export const reviews: Array<{
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
  verified?: boolean;
  country?: string;
  date?: string;
}> = [
  {
    name: "K**a S**a",
    stars: 5,
    variant: "Titânio",
    text: "Amei o relógio, fácil de conectar. Aparentemente parece ser muito bom. Comecei a usar e tô gostando. Meu pulso é fino e ficou muito bom.",
    photos: ["/products/relogio/reviews/review-1.jpg"],
    verified: true,
    country: "BR",
    date: "2026-10-13",
  },
  {
    name: "R**a K**y",
    stars: 5,
    variant: "Titânio",
    text: "O relógio é lindo demais e muito fácil de configurar. Amei e super indico! Ah e a entrega foi muito rápida, chegou com 5 dias.",
    photos: ["/products/relogio/reviews/review-2.jpg"],
    verified: true,
    country: "BR",
    date: "2026-10-09",
  },
  {
    name: "s**a m**s",
    stars: 5,
    variant: "Titânio",
    text: "Desempenho: Um relógio bonito, chegou bem rápido inclusive. Uma estética delicada feminina, veio com duas pulseiras, o touch dele é fácil de mexer o aplicativo também, tem muitas funções. Não cheguei a testar muita coisa nele nem a parte de treino, mas eu vou fazer o teste e venho aqui pra dar um feedback. Qualidade do trabalho: Bom.",
    photos: ["/products/relogio/reviews/review-3.jpg"],
    verified: true,
    country: "BR",
  },
  {
    name: "A**a B**a",
    stars: 5,
    variant: "Titânio",
    text: "Desempenho: SIMPLESMENTE PERFEITO. Comprem sem medo. Estou usando a uma semana. Ele é maravilhoso !!!! Muitas funções. Mc todas funcionam. Chega notificação. Consigo atender chamadas. Bateria dura muuuuuito mesmo. Estou usando a uma semana sem parar e ainda tem 40% de bateria. Vale muito a pena.",
    photos: ["/products/relogio/reviews/review-4.jpg"],
    verified: true,
    country: "BR",
    date: "2026-10-08",
  },
  {
    name: "D**o",
    stars: 5,
    variant: "Titânio",
    text: "Qualidade do trabalho: Parabéns, entrega muito rápido apenas 4 dias SLK👏👏👏 Desempenho: Confesso que fiquei ansioso para testar, então como eu tenho uma prova amanhã hoje fiz uma rodagem de leve apenas 2k pra ver como era o relógio. Primeiro smartwatch que eu vejo... a marcação até das zonas.... Uma pena não dar pra descrever tudo.",
    photos: ["/products/relogio/reviews/review-5.jpg"],
    verified: true,
    country: "BR",
  },
];

export const product = {
  slug: "relogio",
  titleShort: "Bettdow Smartwatch GPS 1.43”, Chamadas Bluetooth, Monitoramento de Saúde e Sono, Resistente à Água 3ATM",
  titleFull: "Bettdow Smartwatch GPS 1.43”, Chamadas Bluetooth, Monitoramento de Saúde e Sono, Resistente à Água 3ATM",
  price: 127.9,
  originalPrice: 399.9,
  discountPercent: 68,
  discountValue: 272,
  shipping: 0,
  installments: { count: 1, value: 127.9 },
  rating: 5,
  ratingCount: 5,
  sold: "—",
  variant: "Preto",
  store: {
    name: "TikTok",
    initials: "TikTok",
    color: "#161823",
    sold: "24.312 vendidos",
  },
  specs: [
    "Smartwatch esportivo Bettdow com tela AMOLED de aproximadamente 1,43 polegada, conforme informações do anúncio.",
    "GPS com suporte anunciado a cinco constelações de posicionamento: GPS, BeiDou, Galileo, GLONASS e QZSS.",
    "Chamadas por Bluetooth com telefone compatível conectado.",
    "Acompanhamento de frequência cardíaca, sono e atividades físicas. Os dados são informativos e não substituem equipamentos médicos.",
    "Mais de 100 modos esportivos e recursos para caminhada, corrida, ciclismo e outras atividades.",
    "Mostradores personalizáveis, com opções de fotos e vídeo, conforme compatibilidade do aplicativo.",
    "Recursos como bússola, previsão do tempo, cronômetro, despertador, controle de música, localizador de telefone e controle remoto da câmera.",
    "Resistência à água 3 ATM conforme informado nas imagens do produto. Evite banhos quentes e consulte o manual antes de utilizar na água.",
    "Bateria anunciada para até 7 dias de uso típico e até 12 horas de GPS contínuo. A autonomia real varia conforme o uso.",
    "Compatibilidade de notificações e respostas rápidas conforme telefone, sistema operacional e aplicativo. Resposta rápida indicada para Android.",
    "Carregamento magnético. Consulte as informações do fabricante sobre acessórios inclusos.",
  ],
};

export const money = (value: number) =>
  "R$ " + value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
