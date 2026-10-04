import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      {
        title: "Jogo Oficina Master Maleta com 222 Ferramentas | Promoções",
      },
      {
        name: "description",
        content:
          "Jogo Oficina Master Maleta com 222 ferramentas por R$ 87,90. Oferta relâmpago com frete grátis.",
      },
      {
        property: "og:title",
        content: "Jogo Oficina Master Maleta com 222 Ferramentas",
      },
      {
        property: "og:description",
        content: "Kit completo com 222 ferramentas por R$ 87,90.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="ferramentas" />,
});