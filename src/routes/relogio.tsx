import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/relogio")({
  head: () => ({
    meta: [
      { title: "Bettdow Smartwatch GPS 1.43” | R$ 127,90" },
      {
        name: "description",
        content: "Bettdow Smartwatch GPS 1.43” com chamadas Bluetooth, monitoramento de sono, GPS e resistência 3ATM. R$ 127,90.",
      },
      { property: "og:title", content: "Bettdow Smartwatch GPS 1.43”" },
      { property: "og:description", content: "Smartwatch Bettdow por R$ 127,90." },
      { property: "og:image", content: "/products/relogio/relogio-1.png" },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="relogio" />,
});
