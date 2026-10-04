import { createFileRoute } from "@tanstack/react-router";
import { GuardaProductPage } from "@/components/tt/GuardaProductPage";

export const Route = createFileRoute("/guarda")({
  head: () => ({
    meta: [
      {
        title: "Guarda-chuva Automático com Proteção UV | Promoções",
      },
      {
        name: "description",
        content:
          "Guarda-chuva automático dobrável com proteção solar UV por R$ 37,90 e frete grátis.",
      },
      {
        property: "og:title",
        content: "10/12 Hastes Guarda Chuva Automático Proteção Solar UV",
      },
      {
        property: "og:description",
        content: "Guarda-chuva reforçado e dobrável por R$ 37,90.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuardaProductPage,
});