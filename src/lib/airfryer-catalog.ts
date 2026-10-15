/** Imagens originais da Air Fryer Elgin enviadas para o produto /airfryer. */
export const gallery = Array.from({ length: 8 }, (_, index) =>
  `/products/airfryer/airfryer-${index + 1}.png`
);

export const voltageOptions = [
  { name: "110V", image: "/products/airfryer/airfryer-1.png" },
  { name: "220V", image: "/products/airfryer/airfryer-1.png" },
];

export const descriptionImages = gallery.slice(1);
export const creatorVideos: { poster: string; src: string }[] = [];

/** Avaliações transcritas dos prints enviados pelo usuário; fotos associadas por ordem. */
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
    name: "j**a",
    stars: 5,
    variant: "127V",
    text: "Vou usar depois falo. Chegou bem embalado, entrega no prazo.",
    photos: ["/products/airfryer/reviews/review-1.jpg"],
    verified: true,
    country: "BR",
    date: "2026-09-21",
  },
  {
    name: "s**!",
    stars: 5,
    variant: "220V",
    text: "Gente a Air fryer é linda, preto espelhado, chegou em excelentes condições, super rápido, tamanho ideal, não é pequena, design lindíssimo, gostei bastante, e o melhor proporciona fritar sem óleo, maravilhosa, recomendo o vendedor.",
    photos: ["/products/airfryer/reviews/review-2.jpg"],
    verified: true,
    country: "BR",
    date: "2026-09-17",
  },
  {
    name: "U**✌",
    stars: 5,
    variant: "Não informado",
    text: "Qualidade do trabalho: Compacta, leve e super fácil de usar. Capacidade: Ótima capacidade pras minhas necessidades. Design: Compacto, enxuto sem frescuras pra usar. Adorei o produto.",
    photos: ["/products/airfryer/reviews/review-3.jpg"],
    verified: true,
    country: "BR",
  },
  {
    name: "A**a",
    stars: 5,
    variant: "220V",
    text: "Capacidade: Boa. Design: Linda. Pequena mas eu gostei.",
    photos: ["/products/airfryer/reviews/review-4.jpg"],
    verified: true,
    country: "BR",
    date: "2026-07-23",
  },
  {
    name: "v**o",
    stars: 5,
    variant: "127V",
    text: "Chegou em ótimo estado estou apaixonada.",
    photos: ["/products/airfryer/reviews/review-5.jpg"],
    verified: true,
    country: "BR",
    date: "2026-08-23",
  },
  {
    name: "A**a B**o",
    stars: 4,
    variant: "127V",
    text: "Qualidade do trabalho: Bom. Capacidade: Boa. Design: Lindo. Gostei muito, superou minhas expectativas, amei já usei.",
    photos: ["/products/airfryer/reviews/review-6.jpg"],
    verified: true,
    country: "BR",
    date: "2026-07-24",
  },
];

export const product = {
  slug: "airfryer",
  titleShort: "Fritadeira Air Fryer Facilita Fry 3,5 litros Preta Elgin",
  titleFull: "Fritadeira Air Fryer Facilita Fry 3,5 litros Preta Elgin",
  price: 79.90,
  originalPrice: 199.90,
  discountPercent: 60,
  discountValue: 120,
  shipping: 0,
  installments: { count: 1, value: 79.90 },
  rating: 4.8,
  ratingCount: 6,
  sold: "—",
  variant: "110V",
  store: {
    name: "TikTok",
    initials: "TikTok",
    color: "#161823",
    sold: "24.312 vendidos",
  },
  specs: [
    "Air Fryer Elgin Facilita Fry, cor preta, capacidade de 3,5 litros.",
    "Potência anunciada de 1400 W. Verifique a versão de voltagem selecionada antes da compra.",
    "Controle de temperatura ajustável de 80 °C a 200 °C.",
    "Timer ajustável de até 60 minutos, com aviso sonoro.",
    "Tecnologia Air Circuit 360° para circulação de ar quente ao redor dos alimentos.",
    "Prepara diversos alimentos com pouco ou nenhum óleo adicionado, conforme a receita.",
    "Cesto removível com revestimento antiaderente e grelha de fácil limpeza.",
    "Design compacto, com medidas ilustrativas anunciadas de aproximadamente 33 × 32 × 28 cm.",
    "Voltagem: selecione 110V ou 220V e confira a disponibilidade antes de finalizar o pedido.",
    "As alegações de eficiência energética, durabilidade e desempenho são informações apresentadas no material promocional.",
  ],
};

export const money = (value: number) =>
  "R$ " + value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
