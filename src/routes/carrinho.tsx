import { createFileRoute } from "@tanstack/react-router";
import { RolimaProductPage } from "@/components/tt/RolimaProductPage";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      {
        title: "Carrinho de Rolimã Super Car até 100kg | Promoções",
      },
      {
        name: "description",
        content:
          "Carrinho de Rolimã Super Car Unitoys, suporta até 100kg, por R$ 87,90 com frete grátis e pagamento seguro via Pix.",
      },
      {
        property: "og:title",
        content: "Carrinho de Rolimã Super Car Suporta até 100kg Unitoys",
      },
      {
        property: "og:description",
        content:
          "Carrinho de Rolimã Super Car Unitoys por R$ 87,90 com frete grátis.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RolimaProductPage,
});