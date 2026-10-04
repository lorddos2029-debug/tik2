import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/tablet")({
  head: () => ({
    meta: [
      {
        title: "JEPK T105 Tablet 10.1 Android 14 512GB | Promoções",
      },
      {
        name: "description",
        content:
          "JEPK T105 Tablet 10.1 Android 14.0 com 512GB, 8GB de RAM, câmera traseira e teclado Bluetooth por R$ 87,90.",
      },
      {
        property: "og:title",
        content:
          "JEPK T105 NOVO Tablet 10.1 Android 14.0 512GB e 8GB",
      },
      {
        property: "og:description",
        content:
          "Tablet JEPK com Android 14, teclado Bluetooth e câmera traseira por R$ 87,90.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TabletPage,
});

function TabletPage() {
  return <ProductPage productKey="tablet" />;
}