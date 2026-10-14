import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/camera")({
  head: () => ({
    meta: [
      { title: "Câmera Jortan 360° Full HD Wi-Fi IP Externa | R$ 69,90" },
      {
        name: "description",
        content: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD por R$ 69,90. Monitoramento via celular, visão noturna, alertas e proteção IP66.",
      },
      {
        property: "og:title",
        content: "Câmera de Segurança Wi-Fi IP Externa Jortan 360° Full HD",
      },
      { property: "og:description", content: "Câmera Jortan Full HD por R$ 69,90." },
      { property: "og:image", content: "/products/camera/camera-1.webp" },
      { property: "og:type", content: "product" },
    ],
  }),
  component: () => <ProductPage productKey="camera" />,
});
