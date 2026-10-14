/** Catálogo do Basic Whey. Fotos servidas diretamente de public/products/whey. */
export const flavorImages = {
  Natural: "/products/whey/natural.png",
  Chocolate: "/products/whey/chocolate.png",
  Morango: "/products/whey/morango.png",
  Baunilha: "/products/whey/baunilha.png",
} as const;

export const gallery = Object.values(flavorImages);
export const descriptionImages = [...gallery];
export const creatorVideos: Array<{ poster: string; src: string }> = [];
/** Avaliações transcritas dos prints fornecidos para este produto. */
export const reviews: Array<{
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
  verified: boolean;
  country: string;
  date: string;
}> = [
  {
    name: "M**e J**e",
    stars: 5,
    variant: "1 kg, Morango",
    text: "Sabor: Maravilhoso\nDesempenho: Proteína de qualidade\nPreço justo e qualidade",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-10-01",
  },
  {
    name: "M**e J**e",
    stars: 5,
    variant: "1 kg, Baunilha",
    text: "Sabor: Maravilhoso\nDesempenho: Ótimo\nSuper recomendo a marca.",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-10-01",
  },
  {
    name: "e**6",
    stars: 5,
    variant: "1 kg, Morango",
    text: "Produto de ótima qualidade. Meu filho está gostando muito.\nEntrega rápida\nSabor: Morango\nDesempenho: Meu filho gostou",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-09-29",
  },
  {
    name: "M**a F**a S**a",
    stars: 5,
    variant: "1 kg, Morango",
    text: "Sabor: Sabor delicioso de morango, da para fazer receitas, embalagem veio bem protegida. Muito satisfeita.\nDesempenho: De acordo com o esperado que é substituir refeição no meu caso.",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-09-28",
  },
  {
    name: "S**s",
    stars: 5,
    variant: "1 kg, Morango",
    text: "Top, peguei de morango gosto parece de Nesquik. Muito bom.",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-09-26",
  },
  {
    name: "V**a L**a",
    stars: 5,
    variant: "1 kg, Baunilha",
    text: "Sabor: Baunilha. Ainda vou experimentar. O cheiro é muito bom. Chegou super rápido. Estou muito satisfeita.",
    photos: [],
    verified: true,
    country: "BR",
    date: "2026-09-21",
  },
];

export const product = {
  slug: "whey",
  titleShort: "Basic Whey Protein 1Kg",
  titleFull: "Basic Whey Protein 1Kg - Suplemento alimentar de proteína em pó",
  price: 49.9,
  originalPrice: 104.9,
  discountPercent: 52,
  discountValue: 55,
  shipping: 0,
  installments: { count: 1, value: 49.9 },
  rating: 5,
  ratingCount: 6,
  sold: "—",
  variant: "Natural",
  store: {
    name: "TikTok",
    initials: "TikTok",
    color: "#161823",
    sold: "24.312 vendidos",
  },
  specs: [
    "Suplemento alimentar de proteína em pó.",
    "Conteúdo líquido: 1 kg.",
    "Sabores disponíveis: Natural, Chocolate, Morango e Baunilha.",
    "Indicado para complementar a ingestão de proteínas conforme as necessidades alimentares individuais.",
    "Pode ser misturado com água ou outra bebida conforme as orientações do rótulo.",
    "A quantidade de proteína por porção, os ingredientes e as informações sobre alergênicos devem ser consultados no rótulo da versão escolhida.",
    "Conserve conforme as instruções da embalagem.",
  ],
};

export const money = (value: number) =>
  "R$ " +
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
