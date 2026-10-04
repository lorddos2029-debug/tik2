import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/short")({
  head: () => ({
    meta: [
      {
        title:
          "Kit 3 Bermudas Masculinas Seda Gelada Texturizada | Promoções",
      },
      {
        name: "description",
        content:
          "Kit com 3 bermudas masculinas de seda gelada texturizada por R$ 59,90. Conforto, estilo e secagem rápida.",
      },
      {
        property: "og:title",
        content:
          "Kit 3 Bermudas Masculinas Seda Gelada Texturizada",
      },
      {
        property: "og:description",
        content:
          "Kit com 3 bermudas masculinas por R$ 59,90.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="short" />,
});