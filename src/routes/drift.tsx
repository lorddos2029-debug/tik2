import { createFileRoute } from "@tanstack/react-router";
import { DriftProductPage } from "@/components/tt/DriftProductPage";

export const Route = createFileRoute("/drift")({
  head: () => ({
    meta: [
      { title: "HDJ Drift Trike Elétrico Infantil 350W 36V | Promoções" },
      {
        name: "description",
        content:
          "HDJ Drift Trike Elétrico Infantil 350W 36V com 3 velocidades e rodas traseiras giratórias 360° por R$ 97,90.",
      },
      { property: "og:title", content: "HDJ Drift Trike Elétrico Infantil 350W 36V" },
      {
        property: "og:description",
        content: "Drift trike elétrico com 3 velocidades, rodas traseiras 360° e kit de proteção.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DriftProductPage,
});
