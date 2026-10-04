import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/magnesio")({
  head: () => ({
    meta: [
      {
        title: "Combo 3 Unidades Magnésio & Inositol Bodyaction | Promoções",
      },
      {
        name: "description",
        content:
          "Combo com 3 latas de 210g de Magnésio & Inositol Bodyaction por R$ 59,90.",
      },
      {
        property: "og:title",
        content: "Combo 3 Unidades - Magnésio & Inositol Bodyaction",
      },
      {
        property: "og:description",
        content:
          "3 latas de 210g de Magnésio & Inositol Bodyaction por R$ 59,90.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="magnesio" />,
});