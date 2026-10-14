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
// Avaliações reais podem ser cadastradas aqui quando fornecidas/verificadas.
export const reviews: Array<{
  name: string;
  stars: number;
  variant: string;
  text: string;
  photos: string[];
}> = [];

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
  rating: 0,
  ratingCount: 0,
  sold: "—",
  variant: "Natural",
  store: {
    name: "Loja de Suplementos",
    initials: "WHEY",
    color: "#161823",
    sold: "Basic Whey Protein 1Kg",
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
