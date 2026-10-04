import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/tt/ProductPage";

export const Route = createFileRoute("/$")({
  component: TabletFallbackPage,
});

function TabletFallbackPage() {
  if (window.location.pathname.replace(/\/+$/, "") === "/tablet") {
    return <ProductPage productKey="tablet" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">
          A página solicitada não foi encontrada.
        </p>
      </div>
    </div>
  );
}