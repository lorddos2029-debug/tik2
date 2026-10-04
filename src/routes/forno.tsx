import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/forno")({
  head: () => ({
    meta: [
      {
        title: "Forno Elétrico Mondial Grand Family II 52L | Promoções",
      },
      {
        name: "description",
        content:
          "Forno Elétrico Mondial Grand Family II 52L FRN-52-W 1800W por R$ 87,90, com frete grátis.",
      },
      {
        property: "og:title",
        content: "Forno Elétrico Mondial Grand Family II 52L FRN-52-W 1800W",
      },
      {
        property: "og:description",
        content: "Forno elétrico Mondial de 52 litros por R$ 87,90.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProductPage productKey="forno" />,
});