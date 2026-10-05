import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/serum")({
  head: () => ({
    meta: [
      {
        title: "GHK Zencial Envy Skin GHK Sérum | Promoção",
      },
      {
        name: "description",
        content:
          "Sérum GHK-Cu com peptídeos de cobre, colágeno e ácido hialurônico por R$ 69,90.",
      },
      {
        property: "og:title",
        content: "GHK Zencial Envy Skin GHK Sérum 30ml",
      },
      {
        property: "og:description",
        content:
          "Sérum com peptídeos de cobre, colágeno e ácido hialurônico.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ProductPage productKey="serum" />,
});