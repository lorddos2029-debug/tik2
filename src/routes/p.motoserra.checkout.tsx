import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/p/motoserra/checkout")({
  beforeLoad: () => {
    throw redirect({ to: "/checkout", search: { product: "motoserra" } });
  },
});
