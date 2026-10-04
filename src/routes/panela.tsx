import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/panela")({
  head: () => ({
    meta: [
      {
        title: "Jogo de Panelas de Cerâmica Antiaderente 20 peças Mônaco | Promoções",
      },
      {
        name: "description",
        content:
          "Jogo de Panelas de Cerâmica Antiaderente com 20 peças Mônaco por R$ 87,90. Oferta relâmpago com frete grátis.",
      },
      {
        property: "og:title",
        content: "Jogo de Panelas de Cerâmica Antiaderente 20 peças Mônaco",
      },
      {
        property: "og:description",
        content: "Conjunto completo com 20 peças por R$ 87,90.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="panela" />,
});