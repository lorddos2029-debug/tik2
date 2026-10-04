import { createFileRoute } from "@tanstack/react-router";
import { CobertaProductPage } from "@/components/tt/CobertaProductPage";

export const Route = createFileRoute("/coberta")({
  head: () => ({
    meta: [
      { title: "Kit 6 Peças Cobre Leito Piquet | Promoções" },
      {
        name: "description",
        content:
          "Kit 6 peças com cobre-leito piquet, jogo de fronhas ponto palito e lençol de elástico por R$ 59,90.",
      },
      { property: "og:title", content: "Kit 6 Peças Cobre Leito Piquet" },
      {
        property: "og:description",
        content:
          "Cobre-leito piquet com jogo de fronhas ponto palito e lençol de elástico.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CobertaProductPage,
});
