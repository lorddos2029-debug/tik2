import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  Check,
  ChevronRight,
  Info,
  LayoutGrid,
  MessageCircle,
  Package,
  ShieldCheck,
  Star,
  Store,
  Ticket,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet, Toasts } from "@/components/tt/BottomSheet";
import { Shell } from "@/components/tt/Shell";
import {
  colorImages,
  creatorVideos,
  descriptionImages,
  gallery,
  money,
  product,
  reviews,
} from "@/lib/drift-catalog";
import {
  getFlashDeadline,
  getQty,
  hhmmss,
  saveQty,
  saveSelectedProduct,
  saveSelectedVariantImage,
} from "@/lib/funnel";
import { formatDeliveryWindow, useDeliveryWindow } from "@/hooks/use-delivery-window";
import { cn } from "@/lib/utils";

const productKey = "drift" as const;
const modelOptions = [
  { name: "Fogo & Gelo", image: colorImages.fogoGelo },
  { name: "Galáxia Rosa", image: colorImages.galaxia },
  { name: "Corações", image: colorImages.coracoes },
  { name: "Preto", image: colorImages.preto },
];
const defaultModel = modelOptions[0] ?? { name: product.variant, image: gallery[0] ?? "" };

const protectionTopics = [
  {
    icon: Package,
    title: "Devoluções gratuitas em 30 dias",
    text: "Devolução gratuita em até 30 dias após o recebimento do seu produto. Os Termos e Condições se aplicam.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento seguro",
    text: "O TikTok Shop não vende, aluga ou cede suas informações pessoais a terceiros para fins de marketing.",
  },
  {
    icon: ShieldCheck,
    title: "Reembolso se algo der errado",
    text: "Se o seu pedido for perdido ou danificado durante o transporte antes de chegar, reembolsaremos automaticamente o seu dinheiro. Você não precisa fazer nada.",
  },
  {
    icon: Truck,
    title: "Se o seu pedido não for enviado no prazo",
    text: "Você não precisa fazer nada. Se ele não for despachado em até 7 dias úteis, cancelaremos o seu pedido e reembolsaremos automaticamente o seu dinheiro.",
  },
];

export function DriftProductPage() {
  const deliveryWindow = useDeliveryWindow();
  const deliveryText = deliveryWindow.startsWith("Calculando")
    ? formatDeliveryWindow(new Date())
    : deliveryWindow;
  const [slide, setSlide] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [qty, setQty] = useState(1);
  const [variantOpen, setVariantOpen] = useState(false);
  const [protectionOpen, setProtectionOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const reviewList = Array.from({ length: 10 }, (_, index) => reviews[index % reviews.length]).filter(
    (review): review is (typeof reviews)[number] => review !== undefined,
  );

  const displayedReviews = showAllReviews
    ? Array.from({ length: 60 }, (_, index) => reviewList[index % reviewList.length]).filter(
        (review): review is (typeof reviews)[number] => review !== undefined,
      )
    : reviewList;

  const selectedGallery = gallery;

  useEffect(() => {
    setQty(getQty());
    saveSelectedVariantImage(defaultModel.image);

    const deadline = getFlashDeadline();
    const tick = () => setRemaining(deadline - Date.now());

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const toast = (message: string) => {
    setToasts([message]);
    window.setTimeout(() => setToasts([]), 1800);
  };

  const changeQty = (next: number) => {
    const value = Math.min(99, Math.max(1, next));
    setQty(value);
    saveQty(value);
  };

  const checkoutLink = (
    <Link
      to="/checkout"
      search={{ product: productKey }}
      onClick={() => saveSelectedProduct(productKey)}
      className="flex-1 rounded-full bg-[#fe2c55] py-2.5 text-center text-[15px] font-extrabold text-white"
    >
      Comprar agora
    </Link>
  );

  return (
    <Shell className="bg-[#f5f5f5]">
      <div className="relative h-screen overflow-y-auto bg-[#f5f5f5]">
        <div className="relative bg-white">
          <div
            ref={scrollerRef}
            onScroll={(event) => {
              const element = event.currentTarget;
              setSlide(
                Math.min(
                  selectedGallery.length,
                  Math.round(element.scrollLeft / element.clientWidth) + 1,
                ),
              );
            }}
            className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {selectedGallery.map((src, index) => (
              <img
                key={`${src}-${index}`}
                src={src}
                alt={`Imagem ${index + 1} de ${product.titleShort}`}
                className="block h-full w-full shrink-0 snap-start object-cover"
              />
            ))}
          </div>
          <div className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-[3px] text-[11px] text-white">
            {slide}/{selectedGallery.length}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#ff6a1f] px-4 pb-2 pt-2 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-end gap-1">
                <span className="mb-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-extrabold text-[#fe2c55]">
                  -{product.discountPercent}%
                </span>
                <span className="mb-1 text-xs font-bold">R$</span>
                <span className="text-[28px] font-extrabold leading-none">
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <Ticket className="mb-1 h-3.5 w-3.5 -rotate-12" />
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-white/90">
                <span>De</span>
                <span className="line-through">{money(product.originalPrice)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-[13px] font-extrabold">
                <Zap className="h-3.5 w-3.5 fill-white" />
                Oferta Relâmpago
              </div>
              <div className="mt-1 text-[11px] font-semibold tabular-nums">
                Termina em: {hhmmss(remaining)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-2">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-[15px] font-bold leading-[1.28] text-[#161823]">
              {product.titleShort}
            </h1>
            <button
              aria-label="Salvar"
              onClick={() => {
                setSaved((value) => !value);
                toast(saved ? "Removido dos salvos" : "Salvo");
              }}
              className="shrink-0 p-1"
            >
              <Bookmark className={cn("h-5 w-5", saved && "fill-[#161823]")} />
            </button>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[12px] text-[#5a5b60]">
            <span>HDJ</span>
            <span className="mx-1 text-[#d0d0d3]">|</span>
            <span>Modelo Fogo & Gelo</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[12px]">
            <span className="font-bold text-[#f59e0b]">★★★★★</span>
            <span className="font-semibold">{reviewList.length} avaliações</span>
            <span className="text-[#5a5b60]">· Produto verificado</span>
          </div>
        </div>

        <div className="mt-2 bg-white">
          <Link
            to="/endereco"
            search={{ product: productKey }}
            onClick={() => saveSelectedProduct(productKey)}
            className="flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4" />
              <div className="text-[13px]">
                <div>
                  <span className="rounded bg-[#e7f7f5] px-2 py-1 text-[11px] font-extrabold text-[#00a99d]">
                    Frete grátis
                  </span>{" "}
                  <span className="line-through">{money(product.shipping)}</span>
                </div>
                <div className="mt-1 font-extrabold">
                  {deliveryText}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#c0c0c3]" />
          </Link>

          <div className="mx-4 h-px bg-[#f0f0f2]" />

          <button
            type="button"
            onClick={() => setVariantOpen(true)}
            className="flex w-full items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="h-4 w-4 text-[#5a5b60]" />
              <img
                src={selectedModel.image}
                alt={selectedModel.name}
                className="h-9 w-9 rounded-md object-cover"
              />
              <span className="text-[13px] text-[#5a5b60]">
                Selecionado: <span className="text-[#161823]">{selectedModel.name}</span>
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#c8c8cc]" />
          </button>

          <div className="mx-4 h-px bg-[#f0f0f2]" />

          <button
            type="button"
            onClick={() => setProtectionOpen(true)}
            className="w-full px-4 py-3 text-left"
          >
            <div className="flex items-center justify-between text-[14px] font-bold text-[#8a5a1e]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Proteção do cliente
              </span>
              <ChevronRight className="h-4 w-4 text-[#c8c8cc]" />
            </div>
            <div className="mt-[4px] overflow-x-auto scroll-smooth pl-[21px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-col gap-y-[2px] text-[12.5px] font-normal leading-[1.25] text-[#161823]">
                {[
                  ["Devolução gratuita", "Reembolso se algo der errado"],
                  ["Pagamento seguro", "Se o seu pedido não for enviado no prazo"],
                ].map((row) => (
                  <div key={row[0]} className="flex gap-x-4">
                    <span className="flex w-[128px] shrink-0 items-start gap-[4px]">
                      <Check className="mt-[2px] h-[12px] w-[12px] shrink-0 text-[#8a5a1e]" strokeWidth={2.75} />
                      <span className="whitespace-nowrap leading-[1.25]">{row[0]}</span>
                    </span>
                    <span className="flex shrink-0 items-start gap-[4px]">
                      <Check className="mt-[2px] h-[12px] w-[12px] shrink-0 text-[#8a5a1e]" strokeWidth={2.75} />
                      <span className="whitespace-nowrap leading-[1.25]">{row[1]}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>

        <div className="mt-2 bg-white px-4 pt-3">
          <div className="mb-2 flex items-center justify-between text-[15px] font-semibold">
            <span>Vídeos de criadores</span>
            <span className="text-[12px] font-normal text-[#5a5b60]">
              {creatorVideos.length} vídeos
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {creatorVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/13] w-[118px] shrink-0 overflow-hidden rounded-lg bg-black"
              >
                <iframe
                  title={`Vídeo de criador ${video.id}`}
                  src={`https://www.tiktok.com/player/v1/${video.id}?description=1&music_info=1`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allow="fullscreen"
                />
                <span className="pointer-events-none absolute inset-x-1.5 bottom-1.5 rounded bg-black/50 px-1.5 py-1 text-center text-[11px] font-medium text-white">
                  Assistir vídeo
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-1.5 text-[14px] font-semibold">
            <Star className="h-4 w-4 fill-[#f2b900] text-[#f2b900]" />
            4.9
            <span className="mx-1 text-[#d0d0d3]">|</span>
            Avaliações dos clientes ({reviewList.length})
            <Info className="h-3.5 w-3.5 text-[#8a8b91]" />
          </div>

          {displayedReviews.map((review, index) => (
            <div key={`${review.name}-${index}`} className="mt-4 flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1f1f3] text-xs font-bold">
                {review.name[0]}
              </span>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold">{review.name}</div>
                <div className="mt-1 text-xs">
                  <span className="text-[#f2b900]">{"★".repeat(review.stars)}</span>
                  <span className="text-[#d9d9dc]">{"★".repeat(5 - review.stars)}</span>
                  <span className="ml-2 text-[#5a5b60]">· Compra verificada</span>
                </div>
                <div className="mt-1 text-[14px]">{review.text}</div>
                {review.photos.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {review.photos.map((photo, photoIndex) => (
                      <img
                        key={`${photo}-${photoIndex}`}
                        src={photo}
                        alt={`Foto da avaliação de ${review.name}`}
                        className="h-24 w-24 shrink-0 rounded-md object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setShowAllReviews((value) => !value)}
            className="mt-4 flex w-full items-center justify-center gap-1 rounded-full border border-[#e5e5e7] py-2.5 text-[13.5px] font-semibold text-[#161823]"
          >
            {showAllReviews
              ? "Ocultar avaliações"
              : `Ver todas as ${reviewList.length} avaliações`}
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full text-xs font-black text-white"
              style={{ backgroundColor: product.store.color }}
            >
              TikTok
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold">TikTok Shop</div>
              <div className="mt-0.5 text-[12px] text-[#5a5b60]">24.6K vendido(s)</div>
            </div>
            <button
              type="button"
              onClick={() => toast("Loja indisponível no momento")}
              className="rounded-full border border-[#e5e5e7] px-4 py-2 text-[13px] font-semibold"
            >
              Ver loja
            </button>
          </div>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <h2 className="text-[17px] font-bold">Sobre este produto</h2>
          <h3 className="mt-3 text-[15px] font-semibold">Descrição</h3>
          <p className="mt-2 text-[14px] leading-[1.5]">{product.titleFull}</p>
          <p className="mt-2 text-[14px] leading-[1.5] text-[#5a5b60]">
            Drift trike elétrico desenvolvido para manobras e condução recreativa,
            com três níveis de velocidade, rodas traseiras giratórias em 360°,
            comandos no guidão e estrutura com foco em estabilidade e controle.
          </p>

          <div className="mt-4 space-y-2">
            {product.specs.map((specification) => (
              <div key={specification} className="flex gap-2 text-[14px] leading-[1.45]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00a99d]" />
                <span>{specification}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {descriptionImages.map((src, index) => (
              <img
                key={`${src}-${index}`}
                src={src}
                alt={`Detalhe ${index + 1} do HDJ Drift Trike`}
                className="block aspect-square w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        <div className="h-20" />

        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[440px] items-center gap-2 border-t border-[#f0f0f0] bg-white px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
          <button
            onClick={() => toast("Loja indisponível no momento")}
            className="flex flex-col items-center px-1 text-[11px]"
          >
            <Store className="h-[22px] w-[22px]" />
            Loja
          </button>
          <button
            onClick={() => toast("Chat indisponível no momento")}
            className="flex flex-col items-center px-1 text-[11px]"
          >
            <MessageCircle className="h-[22px] w-[22px]" />
            Chat
          </button>
          <Link
            to="/checkout"
            search={{ product: productKey }}
            onClick={() => saveSelectedProduct(productKey)}
            className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold text-[#161823]"
          >
            Adicionar ao carrinho
          </Link>
          {checkoutLink}
        </div>
      </div>

      <Toasts messages={toasts} />

      <BottomSheet
        open={variantOpen}
        onClose={() => setVariantOpen(false)}
        hideHeader
        bodyClassName="max-h-[80vh] overflow-y-auto"
      >
        <div className="px-4 pt-5">
          <div className="flex items-start gap-3">
            <img
              src={selectedModel.image}
              alt={selectedModel.name}
              className="h-[104px] w-[104px] rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#5a5b60] line-through">
                    De R$ {product.originalPrice.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-[#fe2c55] px-1.5 py-[3px] text-[12px] font-extrabold leading-none text-white">
                      -{product.discountPercent}%
                    </span>
                    <span className="text-[28px] font-extrabold text-[#fe2c55]">
                      {money(product.price)}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] text-[#8a8b91] line-through">
                    {money(product.originalPrice)}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#00a99d]">
                    Frete grátis
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#5a5b60]">
                    350W · 36V · 3 velocidades
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setVariantOpen(false)}
                  className="p-1 text-[#5a5b60]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[15px] font-semibold">Modelo</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {modelOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  setSelectedModel(option);
                  saveSelectedVariantImage(option.image);
                  setVariantOpen(false);
                }}
                className={cn(
                  "overflow-hidden rounded-lg border-2 text-left",
                  selectedModel.name === option.name ? "border-[#fe2c55]" : "border-[#e5e5e7]",
                )}
              >
                <img
                  src={option.image}
                  alt={`Modelo ${option.name}`}
                  className="aspect-square w-full object-cover"
                />
                <div className="px-1 py-2 text-center text-[13px] font-semibold">{option.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[15px] font-semibold">Quantidade</span>
            <div className="flex items-center gap-4 rounded-full bg-[#f1f1f2] px-2 py-1.5">
              <button
                aria-label="Diminuir"
                disabled={qty <= 1}
                onClick={() => changeQty(qty - 1)}
                className="h-6 w-6 text-lg disabled:text-[#c8c8cc]"
              >
                −
              </button>
              <span className="min-w-4 text-center font-semibold">{qty}</span>
              <button
                aria-label="Aumentar"
                onClick={() => changeQty(qty + 1)}
                className="h-6 w-6 text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex gap-2 border-t border-[#f0f0f0] bg-white px-3 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
          <Link
            to="/checkout"
            search={{ product: productKey }}
            onClick={() => saveSelectedProduct(productKey)}
            className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold"
          >
            Adicionar ao carrinho
          </Link>
          {checkoutLink}
        </div>
      </BottomSheet>

      <BottomSheet
        open={protectionOpen}
        title="Proteção do cliente"
        onClose={() => setProtectionOpen(false)}
      >
        <div className="px-1 py-2">
          {protectionTopics.map(({ icon: Icon, title, text }) => (
            <section key={title} className="mb-5">
              <div className="flex items-center gap-2 text-[#8a5a1e]">
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                <h3 className="text-[15px] font-bold">{title}</h3>
              </div>
              <p className="mt-2 text-[13px] leading-[1.5] text-[#161823]">{text}</p>
            </section>
          ))}
        </div>
      </BottomSheet>
    </Shell>
  );
}
