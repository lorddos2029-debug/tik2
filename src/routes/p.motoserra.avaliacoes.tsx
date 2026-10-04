import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Star } from "lucide-react";
import { Shell } from "@/components/tt/Shell";
import { product, reviews } from "@/lib/catalog";

export const Route = createFileRoute("/p/motoserra/avaliacoes")({
  head: () => ({
    meta: [
      { title: "Avaliações — DEWEN Motosserra 52CC" },
      {
        name: "description",
        content: "Leia as avaliações de clientes sobre a motosserra a gasolina DEWEN 52CC.",
      },
      { property: "og:title", content: "Avaliações — DEWEN Motosserra 52CC" },
      { property: "og:description", content: "Nota 4.8 de 5 com 184 avaliações de clientes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const router = useRouter();
  const all = Array.from({ length: 60 }, (_, index) => reviews[index % reviews.length]);

  return (
    <Shell className="bg-white">
      <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-[#f0f0f0] bg-white px-2 py-2.5">
        <button aria-label="Voltar" onClick={() => router.history.back()} className="p-1">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-[16px] font-semibold">Avaliações ({product.ratingCount})</span>
      </div>

      <div className="flex items-center gap-2 px-4 py-4">
        <Star className="h-6 w-6 fill-[#f2b900] text-[#f2b900]" />
        <span className="text-[26px] font-extrabold leading-none">{product.rating}</span>
        <span className="text-[13px] text-[#8a8b91]">de 5 · {product.ratingCount} avaliações</span>
      </div>

      <div className="px-4 pb-10">
        {all.map((r, i) => (
          <div key={`${r.name}-${i}`} className="border-t border-[#f0f0f0] py-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f1f1f3] text-[12px] font-bold text-[#5a5b60]">
                {r.name[0]}
              </span>
              <span className="text-[13px] font-semibold">{r.name}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#8a8b91]">
              <span className="tracking-[1px]">
                <span className="text-[#f2b900]">{"★".repeat(r.stars)}</span>
                <span className="text-[#d9d9dc]">{"★".repeat(5 - r.stars)}</span>
              </span>
              <span>· {r.variant}</span>
            </div>
            <p className="mt-1.5 whitespace-pre-line text-[14px]">{r.text}</p>

          </div>
        ))}
      </div>
    </Shell>
  );
}
