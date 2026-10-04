import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/wap")({
  head: () => ({
    meta: [
      {
        title: "Lavadora De Alta Pressão Ágil 1800 1300psi Wap | Promoções",
      },
      {
        name: "description",
        content:
          "Lavadora WAP Ágil 1800 de alta pressão por R$ 87,90, com jato regulável, mangueira de 3 metros e opções 110V e 220V.",
      },
      {
        property: "og:title",
        content: "Lavadora De Alta Pressão Ágil 1800 1300psi Wap",
      },
      {
        property: "og:description",
        content:
          "Lavadora de alta pressão WAP Ágil 1800 com 1300 PSI e seletor de voltagem.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProductPage productKey="wap" />,
});