import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/bermuda")({
  head: () => ({
    meta: [
      {
        title:
          "Kit 3 Bermuda Sarja Masculina com Bolsa Embutida | Promoções",
      },
      {
        name: "description",
        content:
          "Kit com 3 bermudas masculinas de sarja com bolsa embutida por R$ 69,90. Shorts casuais de verão.",
      },
      {
        property: "og:title",
        content:
          "Kit 3 Bermuda Sarja Masculina com Bolsa Embutida",
      },
      {
        property: "og:description",
        content:
          "Kit com 3 bermudas masculinas por R$ 69,90.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="bermuda" />,
});