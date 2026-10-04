import { createFileRoute } from "@tanstack/react-router";
import { PillowProductPage } from "@/components/tt/PillowProductPage";

export const Route = createFileRoute("/travesseiro")({
  head: () => ({
    meta: [
      { title: "Travesseiro Ergonômico Abranuv PRO2.0 por R$ 69,90" },
      { name: "description", content: "Travesseiro ergonômico cervical Abranuv PRO2.0 em formato borboleta por R$ 69,90, com frete grátis." },
      { property: "og:title", content: "Travesseiro Ergonômico Abranuv PRO2.0" },
      { property: "og:description", content: "Abranuv PRO2.0 por R$ 69,90 com frete grátis." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PillowProductPage,
});