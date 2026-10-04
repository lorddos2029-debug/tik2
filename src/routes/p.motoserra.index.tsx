import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/p/motoserra/")({
  head: () => ({
    meta: [
      { title: "DEWEN Motosserra a Gasolina 52CC 20 Polegadas | Promoções" },
      {
        name: "description",
        content:
          "Motosserra a gasolina 52CC 20 polegadas por R$ 87,90 com frete grátis, 9x sem juros e pagamento via Pix.",
      },
      { property: "og:title", content: "DEWEN Motosserra a Gasolina 52CC 20 Polegadas" },
      {
        property: "og:description",
        content: "R$ 87,90 com frete grátis. Oferta relâmpago por tempo limitado.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});
