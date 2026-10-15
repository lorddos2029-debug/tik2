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

/** Avaliações individuais não foram fornecidas. Não atribuir comentários a clientes fictícios. */
export const reviews: Array<{
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
}> = [];

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
  rating: 0,
  ratingCount: 0,
  sold: "—",
  variant: "110V",
  store: {
    name: "Loja de Eletrodomésticos",
    initials: "Elgin",
    color: "#161823",
    sold: "Fritadeira Elgin",
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
