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
} from "@/lib/guarda-catalog";
import {
  getFlashDeadline,
  getQty,
  hhmmss,
  saveQty,
  saveSelectedProduct,
  saveSelectedVariantImage,
} from "@/lib/funnel";
import { useDeliveryWindow } from "@/hooks/use-delivery-window";
import { cn } from "@/lib/utils";

const productKey = "guarda" as const;
const colorOptions = [
  { name: "Azul-marinho", image: colorImages.azulMarinho },
  { name: "Azul-claro", image: colorImages.azulClaro },
  { name: "Preto", image: colorImages.preto },
  { name: "Bege", image: colorImages.bege },
  { name: "Vermelho", image: colorImages.vermelho },
];
const defaultColor = colorOptions[0] ?? { name: product.variant, image: gallery[0] ?? "" };

const protectionTopics = [
  ["Devoluções gratuitas em 30 dias", "Devolução gratuita em até 30 dias após o recebimento do produto."],
  ["Pagamento seguro", "Suas informações pessoais são protegidas durante todo o processo de compra."],
  ["Reembolso se algo der errado", "Se o pedido for perdido ou danificado durante o transporte, reembolsaremos automaticamente o seu dinheiro."],
];

export function GuardaProductPage() {
  const deliveryWindow = useDeliveryWindow();
  const [slide, setSlide] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [qty, setQty] = useState(1);
  const [variantOpen, setVariantOpen] = useState(false);
  const [protectionOpen, setProtectionOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [playingCreatorVideo, setPlayingCreatorVideo] = useState<string | null>(null);

  const displayedReviews = showAllReviews
    ? Array.from({ length: 60 }, (_, index) => reviews[index % reviews.length]).filter(
        (review): review is (typeof reviews)[number] => review !== undefined,
      )
    : reviews;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const selectedGallery = [
    selectedColor.image,
    ...gallery.filter((image) => image !== selectedColor.image),
  ];

  useEffect(() => {
    setQty(getQty());
    saveSelectedVariantImage(defaultColor.image);
    const deadline = getFlashDeadline();
    const tick = () => setRemaining(deadline - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
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
                onError={(event) => {
                  const image = event.currentTarget;
                  const fallback = gallery[index % gallery.length] ?? defaultColor.image;

                  if (image.src !== new URL(fallback, window.location.origin).href) {
                    image.onerror = null;
                    image.src = fallback;
                    saveSelectedVariantImage(fallback);
                  }
                }}
                className="block h-full w-full shrink-0 snap-start object-cover"
              />
            ))}
          </div>
          <div className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-[3px] text-[11px] text-white">
            {slide}/{selectedGallery.length}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#ff6a1f] px-4 py-2 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-end gap-1">
                <span className="mb-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-extrabold text-[#fe2c55]">
                  -{product.discountPercent}%
                </span>
                <span className="mb-1 text-xs font-bold">R$</span>
                <span className="text-[28px] font-extrabold leading-none">
                  37<span className="text-[15px]">,90</span>
                </span>
                <Ticket className="mb-1 h-3.5 w-3.5 -rotate-12" />
              </div>
              <div className="mt-1 text-[11px] text-white/90 line-through">
                {money(product.originalPrice)}
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
            <Star className="h-3.5 w-3.5 fill-[#f2b900] text-[#f2b900]" />
            <b className="text-[#161823]">{product.rating}</b>
            <span className="text-[#2f7fff]">({product.ratingCount})</span>
            <span className="mx-1 text-[#d0d0d3]">|</span>
            <b className="text-[#161823]">{product.sold}</b> vendidos
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
                  {deliveryWindow || "Calculando prazo de entrega..."}
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
                src={selectedColor.image}
                alt=""
                onError={(event) => {
                  const image = event.currentTarget;
                  image.onerror = null;
                  image.src = gallery[0] ?? defaultColor.image;
                }}
                className="h-9 w-9 rounded-md object-cover"
              />
              <span className="text-[13px] text-[#5a5b60]">
                Selecionado: <span className="text-[#161823]">{selectedColor.name}</span>
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
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-5 text-[12px]">
              {["Devolução gratuita", "Pagamento seguro", "Reembolso se algo der errado"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-[#8a5a1e]" />
                  {item}
                </span>
              ))}
            </div>
          </button>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="mb-2 text-[15px] font-semibold">
            Vídeos de criadores ({creatorVideos.length})
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {creatorVideos.map((video) => {
              const isPlaying = playingCreatorVideo === video.id;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setPlayingCreatorVideo(video.id)}
                  className="relative aspect-[9/13] w-[118px] shrink-0 overflow-hidden rounded-lg bg-black text-left"
                  aria-label={
                    isPlaying
                      ? "Vídeo do criador em reprodução"
                      : "Reproduzir vídeo do criador"
                  }
                >
                  <iframe
                    title={`Preview do vídeo de criador ${video.id}`}
                    src={`https://www.tiktok.com/player/v1/${video.id}?description=1&music_info=1`}
                    className="pointer-events-none h-full w-full border-0"
                    loading="lazy"
                    allow="fullscreen"
                  />

                  {!isPlaying && (
                    <span className="absolute inset-0 grid place-items-center bg-black/20">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#161823] shadow-lg">
                        <span className="ml-0.5 text-xl leading-none">▶</span>
                      </span>
                    </span>
                  )}

                  <span className="pointer-events-none absolute inset-x-1.5 bottom-1.5 rounded bg-black/50 px-1.5 py-1 text-center text-[11px] font-medium text-white">
                    {isPlaying ? "Vídeo em reprodução" : "Assistir vídeo"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-1.5 text-[14px] font-semibold">
            <Star className="h-4 w-4 fill-[#f2b900] text-[#f2b900]" />
            {product.rating}
            <span className="mx-1 text-[#d0d0d3]">|</span>
            Avaliações dos clientes ({product.ratingCount})
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
                  <span className="ml-2 text-[#5a5b60]">· {review.variant}</span>
                </div>
                <div className="mt-1 text-[14px]">{review.text}</div>

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
              : `Ver todas as ${product.ratingCount} avaliações`}
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full text-xs font-black text-white" style={{ backgroundColor: product.store.color }}>
              {product.store.initials}
            </div>
            <div>
              <div className="text-[15px] font-semibold">{product.store.name}</div>
              <div className="text-xs text-[#8a8b91]">{product.store.sold}</div>
            </div>
          </div>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <h2 className="text-[17px] font-bold">Sobre este produto</h2>
          <h3 className="mt-3 text-[15px] font-semibold">Descrição</h3>
          <p className="mt-2 text-[14px] font-semibold">{product.titleFull}</p>
          {product.specs.map((specification) => (
            <p key={specification} className="mt-1 text-[14px]">{specification}</p>
          ))}
          <div className="mt-3 space-y-3">
            {descriptionImages.map((src, index) => (
              <img
                key={`${src}-${index}`}
                src={src}
                alt={`Descrição ${index + 1}`}
                onError={(event) => {
                  const image = event.currentTarget;
                  image.onerror = null;
                  image.src = gallery[index % gallery.length] ?? defaultColor.image;
                }}
                className="block aspect-square w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>

        <div className="h-20" />

        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[440px] items-center gap-2 border-t border-[#f0f0f0] bg-white px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
          <button onClick={() => toast("Loja indisponível no momento")} className="flex flex-col items-center px-1 text-[11px]">
            <Store className="h-[22px] w-[22px]" />
            Loja
          </button>
          <button onClick={() => toast("Chat indisponível no momento")} className="flex flex-col items-center px-1 text-[11px]">
            <MessageCircle className="h-[22px] w-[22px]" />
            Chat
          </button>
          <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold text-[#161823]">
            Adicionar ao carrinho
          </Link>
          {checkoutLink}
        </div>
      </div>

      <Toasts messages={toasts} />

      <BottomSheet open={variantOpen} onClose={() => setVariantOpen(false)} hideHeader bodyClassName="max-h-[80vh] overflow-y-auto">
        <div className="px-4 pt-5">
          <div className="flex gap-3">
            <img
              src={selectedColor.image}
              alt=""
              onError={(event) => {
                const image = event.currentTarget;
                image.onerror = null;
                image.src = gallery[0] ?? defaultColor.image;
                saveSelectedVariantImage(gallery[0] ?? defaultColor.image);
              }}
              className="h-[104px] w-[104px] rounded-lg object-cover"
            />
            <div>
              <div className="text-[28px] font-extrabold text-[#fe2c55]">R$ 37<span className="text-lg">,90</span></div>
              <div className="text-[13px] text-[#8a8b91] line-through">{money(product.originalPrice)}</div>
              <div className="mt-2 text-xs font-extrabold text-[#00b8a9]">Frete grátis</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-[linear-gradient(90deg,#ff7a2f,#ff9a4a)] px-3 py-2 text-white">
            <span className="flex items-center gap-1.5 text-sm font-extrabold"><Zap className="h-4 w-4 fill-white" />Oferta Relâmpago</span>
            <span className="text-xs tabular-nums">Termina em: <b>{hhmmss(remaining)}</b></span>
          </div>

          <div className="mt-3 text-[15px] font-semibold">Cor ({colorOptions.length})</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  setSelectedColor(option);
                  saveSelectedVariantImage(option.image);
                  setVariantOpen(false);
                  setSlide(1);
                  scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                  setSlide(1);
                  scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                className={cn(
                  "overflow-hidden rounded-lg border-2 text-left",
                  selectedColor.name === option.name ? "border-[#fe2c55]" : "border-[#e5e5e7]",
                )}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.onerror = null;
                    image.src = gallery[colorOptions.indexOf(option) % gallery.length] ?? defaultColor.image;
                  }}
                  className="aspect-square w-full object-cover"
                />
                <div className="px-1 py-2 text-center text-[13px] font-semibold">{option.name}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[15px] font-semibold">Quantidade</span>
            <div className="flex items-center gap-4 rounded-full bg-[#f1f1f2] px-2 py-1.5">
              <button aria-label="Diminuir" disabled={qty <= 1} onClick={() => changeQty(qty - 1)} className="h-6 w-6 text-lg disabled:text-[#c8c8cc]">−</button>
              <span className="min-w-4 text-center font-semibold">{qty}</span>
              <button aria-label="Aumentar" onClick={() => changeQty(qty + 1)} className="h-6 w-6 text-lg">+</button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex gap-2 border-t border-[#f0f0f0] bg-white px-3 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
          <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold">Adicionar ao carrinho</Link>
          {checkoutLink}
        </div>
      </BottomSheet>

      <BottomSheet open={protectionOpen} title="Proteção do cliente" onClose={() => setProtectionOpen(false)}>
        <div className="px-1 py-2">
          {protectionTopics.map(([title, text]) => (
            <section key={title} className="mb-5">
              <div className="flex items-center gap-2 text-[#8a5a1e]"><ShieldCheck className="h-5 w-5" /><h3 className="text-[15px] font-bold">{title}</h3></div>
              <p className="mt-2 text-[13px] leading-[1.5]">{text}</p>
            </section>
          ))}
        </div>
      </BottomSheet>
    </Shell>
  );
}