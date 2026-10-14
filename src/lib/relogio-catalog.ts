/** Imagens originais Bettdow fornecidas para /relogio (PNG 800px, sem redução de qualidade). */
export const gallery = Array.from({ length: 9 }, (_, index) => `/products/relogio/relogio-${index + 1}.png`);

/** Galeria ilustrativa e especificações detalhadas na descrição. */
export const descriptionImages = gallery.slice(1);
export const creatorVideos: { poster: string; src: string; embedUrl?: string }[] = [];

/** Sem avaliações fornecidas: não criar compradores ou comentários fictícios. */
export const reviews: {
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
}[] = [];

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
  rating: 0,
  ratingCount: 0,
  sold: "—",
  variant: "Padrão",
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
