import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/airfryer")({
  head: () => ({
    meta: [
      { title: "Fritadeira Air Fryer Elgin Facilita Fry 3,5L | R$ 79,90" },
      {
        name: "description",
        content: "Fritadeira Air Fryer Facilita Fry 3,5 litros Preta Elgin por R$ 79,90. 1400 W, temperatura ajustável e timer de até 60 minutos.",
      },
      { property: "og:title", content: "Fritadeira Air Fryer Facilita Fry 3,5 litros Preta Elgin" },
      { property: "og:description", content: "Air Fryer Elgin 3,5L por R$ 79,90." },
      { property: "og:image", content: "/products/airfryer/airfryer-1.png" },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="airfryer" />,
});
