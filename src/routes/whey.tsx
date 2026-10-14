import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/whey")({
  head: () => ({
    meta: [
      { title: "Basic Whey Protein 1Kg | R$ 49,90" },
      {
        name: "description",
        content: "Basic Whey Protein 1Kg por R$ 49,90. Sabores Natural, Chocolate, Morango e Baunilha.",
      },
      { property: "og:title", content: "Basic Whey Protein 1Kg" },
      { property: "og:description", content: "Basic Whey Protein 1Kg por R$ 49,90." },
      { property: "og:image", content: "/products/whey/natural.png" },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="whey" />,
});
