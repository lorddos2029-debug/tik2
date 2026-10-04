import { useEffect, useState } from "react";

const DAY_IN_MS = 86_400_000;

export function formatDeliveryWindow(referenceDate: Date): string {
  const firstDate = new Date(referenceDate.getTime() + DAY_IN_MS);
  const lastDate = new Date(referenceDate.getTime() + 3 * DAY_IN_MS);
  const firstMonth = firstDate.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  const lastMonth = lastDate.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");

  if (firstMonth !== lastMonth) {
    return `Receba até ${firstDate.getDate()} de ${firstMonth} – ${lastDate.getDate()} de ${lastMonth}.`;
  }

  return `Receba até ${firstDate.getDate()} – ${lastDate.getDate()} de ${lastMonth}.`;
}

export function useDeliveryWindow(): string {
  const [deliveryWindow, setDeliveryWindow] = useState(() =>
    formatDeliveryWindow(new Date()),
  );

  useEffect(() => {
    const update = () => setDeliveryWindow(formatDeliveryWindow(new Date()));
    const intervalId = window.setInterval(update, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return deliveryWindow;
}