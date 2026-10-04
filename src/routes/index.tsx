import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEWEN Motosserra a Gasolina 52CC 20 Polegadas | Promoções" },
      {
        name: "description",
        content:
          "Motosserra a gasolina 52CC 20 polegadas por R$ 87,90 com frete grátis. Oferta relâmpago, pagamento via Pix e entrega rápida.",
      },
      { property: "og:title", content: "DEWEN Motosserra a Gasolina 52CC 20 Polegadas" },
      {
        property: "og:description",
        content: "R$ 87,90 com frete grátis e 9x sem juros. Oferta relâmpago por tempo limitado.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProductPage productKey="motoserra" />,
});
