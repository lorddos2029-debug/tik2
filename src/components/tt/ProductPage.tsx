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
  creatorVideos as chainsawCreatorVideos,
  descriptionImages as chainsawDescriptionImages,
  gallery as chainsawGallery,
  money as chainsawMoney,
  product as chainsawProduct,
  reviews as chainsawReviews,
} from "@/lib/catalog";
import {
  creatorVideos as ferramentasCreatorVideos,
  descriptionImages as ferramentasDescriptionImages,
  gallery as ferramentasGallery,
  money as ferramentasMoney,
  product as ferramentasProduct,
  reviews as ferramentasReviews,
} from "@/lib/ferramentas-catalog";
import {
  creatorVideos as fornoCreatorVideos,
  descriptionImages as fornoDescriptionImages,
  gallery as fornoGallery,
  money as fornoMoney,
  product as fornoProduct,
  reviews as fornoReviews,
} from "@/lib/forno-catalog";
import {
  colorImages as panelaColorImages,
  creatorVideos as panelaCreatorVideos,
  descriptionImages as panelaDescriptionImages,
  gallery as panelaGallery,
  money as panelaMoney,
  product as panelaProduct,
  reviews as panelaReviews,
} from "@/lib/panela-catalog";
import {
  colorImages as tabletColorImages,
  creatorVideos as tabletCreatorVideos,
  descriptionImages as tabletDescriptionImages,
  gallery as tabletGallery,
  money as tabletMoney,
  product as tabletProduct,
  reviews as tabletReviews,
} from "@/lib/tablet-catalog";
import {
  gallery as shortGallery,
  colorImages as shortColorImages,
  descriptionImages as shortDescriptionImages,
  creatorVideos as shortCreatorVideos,
  money as shortMoney,
  product as shortProduct,
  reviews as shortReviews,
} from "@/lib/short-catalog";
import {
  gallery as bermudaGallery,
  colorImages as bermudaColorImages,
  descriptionImages as bermudaDescriptionImages,
  creatorVideos as bermudaCreatorVideos,
  money as bermudaMoney,
  product as bermudaProduct,
  reviews as bermudaReviews,
} from "@/lib/bermuda-catalog";
import {
  gallery as magnesioGallery,
  colorImages as magnesioColorImages,
  descriptionImages as magnesioDescriptionImages,
  creatorVideos as magnesioCreatorVideos,
  money as magnesioMoney,
  product as magnesioProduct,
  reviews as magnesioReviews,
} from "@/lib/magnesio-catalog";
import {
  colorImages as tablet2ColorImages,
  creatorVideos as tablet2CreatorVideos,
  descriptionImages as tablet2DescriptionImages,
  gallery as tablet2Gallery,
  money as tablet2Money,
  product as tablet2Product,
  reviews as tablet2Reviews,
} from "@/lib/tablet2-catalog";
import {
  getFlashDeadline,
  getQty,
  hhmmss,
  saveQty,
  saveSelectedProduct,
  saveSelectedVariantImage,
  saveSelectedVariantLabel,
} from "@/lib/funnel";
import { useDeliveryWindow } from "@/hooks/use-delivery-window";
import { cn } from "@/lib/utils";

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

export function ProductPage({
  productKey = "motoserra",
}: {
  productKey?: "motoserra" | "ferramentas" | "panela" | "forno" | "tablet" | "tablet2" | "short" | "bermuda" | "magnesio";
}) {
  const isFerramentas = productKey === "ferramentas";
  const isPanela = productKey === "panela";
  const isForno = productKey === "forno";
  const isTablet = productKey === "tablet";
  const isTablet2 = productKey === "tablet2";
  const isShort = productKey === "short";
  const isBermuda = productKey === "bermuda";
  const isMagnesio = productKey === "magnesio";
  const gallery = isMagnesio
    ? magnesioGallery
    : isBermuda
      ? bermudaGallery
    : isShort
      ? shortGallery
      : isTablet2
      ? tablet2Gallery
    : isTablet
      ? tabletGallery
    : isForno
      ? fornoGallery
      : isPanela
        ? panelaGallery
        : isFerramentas
          ? ferramentasGallery
          : chainsawGallery;
  const descriptionImages = isMagnesio
    ? magnesioDescriptionImages
    : isBermuda
      ? bermudaDescriptionImages
    : isShort
      ? shortDescriptionImages
      : isTablet2
      ? tablet2DescriptionImages
    : isTablet
      ? tabletDescriptionImages
    : isForno
      ? fornoDescriptionImages
      : isPanela
        ? panelaDescriptionImages
        : isFerramentas
          ? ferramentasDescriptionImages
          : chainsawDescriptionImages;
  const creatorVideos = isMagnesio
    ? magnesioCreatorVideos
    : isBermuda
      ? bermudaCreatorVideos
    : isShort
      ? shortCreatorVideos
      : isTablet2
      ? tablet2CreatorVideos
    : isTablet
      ? tabletCreatorVideos
    : isForno
      ? fornoCreatorVideos
      : isPanela
        ? panelaCreatorVideos
        : isFerramentas
          ? ferramentasCreatorVideos
          : chainsawCreatorVideos;
  const product = isMagnesio
    ? magnesioProduct
    : isBermuda
      ? bermudaProduct
    : isShort
      ? shortProduct
      : isTablet2
      ? tablet2Product
    : isTablet
      ? tabletProduct
    : isForno
      ? fornoProduct
      : isPanela
        ? panelaProduct
        : isFerramentas
          ? ferramentasProduct
          : chainsawProduct;
  const reviews = isMagnesio
    ? magnesioReviews
    : isBermuda
      ? bermudaReviews
    : isShort
      ? shortReviews
      : isTablet2
      ? tablet2Reviews
    : isTablet
      ? tabletReviews
    : isForno
      ? fornoReviews
      : isPanela
        ? panelaReviews
        : isFerramentas
          ? ferramentasReviews
          : chainsawReviews;
  const money = isMagnesio
    ? magnesioMoney
    : isBermuda
      ? bermudaMoney
    : isShort
      ? shortMoney
      : isTablet2
      ? tablet2Money
    : isTablet
      ? tabletMoney
    : isForno
      ? fornoMoney
      : isPanela
        ? panelaMoney
        : isFerramentas
          ? ferramentasMoney
          : chainsawMoney;
  const panelaColorOptions = [
    { name: "Marrom", image: panelaColorImages.Marrom },
    { name: "Branca", image: panelaColorImages.Branca },
    { name: "Preta", image: panelaColorImages.Preta },
    { name: "Rosé", image: panelaColorImages["Rosé"] },
  ];
  const tabletColorOptions = [
    { name: "Cinza", image: tabletColorImages.Cinza },
    { name: "Azul", image: tabletColorImages.Azul },
    { name: "Roxo", image: tabletColorImages.Roxo },
    { name: "Preto", image: tabletColorImages.Preto },
  ];
  const shortColorOptions = [
    { name: "Preto", image: shortColorImages.Preto },
    { name: "Cinza", image: shortColorImages.Cinza },
    { name: "Cinza claro", image: shortColorImages["Cinza claro"] },
    { name: "Kit mesclado", image: shortColorImages["Kit mesclado"] },
  ];
  const shortSizeOptions = ["P", "M", "G", "GG"];
  const bermudaColorOptions = [
    { name: "Bege", image: bermudaColorImages.Bege },
    { name: "Azul-marinho", image: bermudaColorImages["Azul-marinho"] },
    { name: "Branca", image: bermudaColorImages.Branca },
    { name: "Bordô", image: bermudaColorImages.Bordô },
    {
      name: "Kit Bege, Preto e Bordô",
      image: bermudaColorImages["Kit Bege, Preto e Bordô"],
    },
    {
      name: "Kit Bege, Preto e Vinho",
      image: bermudaColorImages["Kit Bege, Preto e Vinho"],
    },
    {
      name: "Kit Bege, Verde e Cinza",
      image: bermudaColorImages["Kit Bege, Verde e Cinza"],
    },
    {
      name: "Kit Caqui, Marinho e Mostarda",
      image: bermudaColorImages["Kit Caqui, Marinho e Mostarda"],
    },
  ];
  const bermudaSizeOptions = ["38", "40", "42", "44", "46", "48"];
  const magnesioFlavorOptions = [
    { name: "Maracujá", image: magnesioColorImages.Maracujá },
    {
      name: "Abacaxi com Hortelã",
      image: magnesioColorImages["Abacaxi com Hortelã"],
    },
    {
      name: "Frutas Vermelhas",
      image: magnesioColorImages["Frutas Vermelhas"],
    },
    {
      name: "Maracujá com Abacaxi",
      image: magnesioColorImages["Maracujá com Abacaxi"],
    },
  ];

  const tablet2ColorOptions = [
    { name: "Dourado", image: tablet2ColorImages.Dourado },
    { name: "Cinza", image: tablet2ColorImages.Cinza },
    { name: "Azul", image: tablet2ColorImages.Azul },
    { name: "Verde", image: tablet2ColorImages.Verde },
  ];
  const fallbackVariant = { name: product.variant, image: gallery[0] ?? "" };

  const deliveryWindow = useDeliveryWindow();
  const [slide, setSlide] = useState(1);
  const [selectedPanelaColor, setSelectedPanelaColor] = useState(panelaColorOptions[0] ?? fallbackVariant);
  const [selectedTabletColor, setSelectedTabletColor] = useState(tabletColorOptions[3] ?? fallbackVariant);
  const [selectedTablet2Color, setSelectedTablet2Color] = useState(tablet2ColorOptions[0] ?? fallbackVariant);
  const [selectedShortColor, setSelectedShortColor] = useState(shortColorOptions[0] ?? fallbackVariant);
  const [selectedShortSize, setSelectedShortSize] = useState("M");
  const [selectedBermudaColor, setSelectedBermudaColor] = useState(bermudaColorOptions[0] ?? fallbackVariant);
  const [selectedBermudaSize, setSelectedBermudaSize] = useState("42");
  const [selectedMagnesioFlavor, setSelectedMagnesioFlavor] = useState(
    magnesioFlavorOptions[0] ?? fallbackVariant,
  );
  const [tabletColorSelected, setTabletColorSelected] = useState(false);
  const [tablet2ColorSelected, setTablet2ColorSelected] = useState(false);
  const [tab, setTab] = useState<"visao" | "avaliacoes" | "descricao">("visao");
  const [showTabs, setShowTabs] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [qty, setQty] = useState(1);
  const [variantOpen, setVariantOpen] = useState(false);
  const [protectionOpen, setProtectionOpen] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const checkoutKey = productKey;
  const selectedGallery =
    isMagnesio
      ? [selectedMagnesioFlavor.image]
      : isBermuda
        ? [selectedBermudaColor.image, ...bermudaGallery.filter((image) => image !== selectedBermudaColor.image)]
      : isShort
        ? [selectedShortColor.image, ...shortGallery.filter((image) => image !== selectedShortColor.image)]
      : isPanela
      ? [selectedPanelaColor.image, ...panelaGallery.filter((image) => image !== selectedPanelaColor.image)]
      : isTablet && tabletColorSelected
        ? [selectedTabletColor.image, ...tabletGallery.filter((image) => image !== selectedTabletColor.image)]
        : isTablet2 && tablet2ColorSelected
          ? [selectedTablet2Color.image, ...tablet2Gallery.filter((image) => image !== selectedTablet2Color.image)]
          : gallery;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQty(getQty());
    if (isPanela) saveSelectedVariantImage(selectedPanelaColor.image);
    if (isTablet) saveSelectedVariantImage(selectedTabletColor.image);
    if (isTablet2) saveSelectedVariantImage(selectedTablet2Color.image);
    if (isShort) saveSelectedVariantImage(selectedShortColor.image);
    if (isBermuda) saveSelectedVariantImage(selectedBermudaColor.image);
    if (isMagnesio) saveSelectedVariantImage(selectedMagnesioFlavor.image);
    const deadline = getFlashDeadline();
    const tick = () => setRemaining(deadline - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = hhmmss(remaining);

  const changeQty = (next: number) => {
    const value = Math.min(99, Math.max(1, next));
    setQty(value);
    saveQty(value);
  };

  const toast = (message: string) => {
    setToasts([message]);
    window.setTimeout(() => setToasts([]), 1800);
  };

  const onPageScroll = () => {
    const el = pageRef.current;
    if (!el) return;
    setShowTabs(el.scrollTop > 320);
    const reviewsTop = (reviewsRef.current?.offsetTop ?? 0) - 60;
    const descTop = (descRef.current?.offsetTop ?? 0) - 60;
    if (el.scrollTop >= descTop) setTab("descricao");
    else if (el.scrollTop >= reviewsTop) setTab("avaliacoes");
    else setTab("visao");
  };

  const goTo = (target: "visao" | "avaliacoes" | "descricao") => {
    const el = pageRef.current;
    if (!el) return;
    const top =
      target === "visao"
        ? 0
        : target === "avaliacoes"
          ? (reviewsRef.current?.offsetTop ?? 0) - 48
          : (descRef.current?.offsetTop ?? 0) - 48;
    el.scrollTo({ top, behavior: "smooth" });
  };

  const onGalleryScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setSlide(Math.min(gallery.length, Math.round(el.scrollLeft / el.clientWidth) + 1));
  };

  return (
    <Shell className="bg-[#f5f5f5]">
      <div
        ref={pageRef}
        onScroll={onPageScroll}
        className="relative h-screen overflow-y-auto bg-[#f5f5f5]"
      >
        <div
          className={cn(
            "fixed inset-x-0 top-0 z-50 mx-auto max-w-[440px] border-b border-[#f0f0f0] bg-white transition-transform duration-200",
            showTabs ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex h-11 items-stretch">
            {(
              [
                ["visao", "Visão geral"],
                ["avaliacoes", "Avaliações"],
                ["descricao", "Descrição"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => goTo(key)}
                className="relative flex-1 text-[14px] font-medium"
              >
                <span className={tab === key ? "text-[#161823]" : "text-[#8a8b91]"}>{label}</span>
                {tab === key && (
                  <span className="absolute inset-x-0 -bottom-px mx-auto h-[2px] w-8 rounded-full bg-[#fe2c55]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="relative bg-white">
            <div
              ref={scrollerRef}
              onScroll={onGalleryScroll}
              className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {selectedGallery.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={`Imagem ${i + 1} de ${product.titleShort}`}
                  className="block h-full w-full shrink-0 snap-start object-cover object-top"
                />
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-[3px] text-[11px] font-medium leading-none text-white">
              {slide}/{selectedGallery.length}
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#ff6a1f] px-4 pb-2 pt-2 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-[38%] w-[26%] -skew-x-12 bg-white/[0.07]"
            />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-end gap-1">
                  <span className="mb-[5px] rounded-[4px] bg-white px-[5px] py-[2px] text-[10px] font-extrabold leading-none text-[#fe2c55]">
                    -{product.discountPercent}%
                  </span>
                  <span className="mb-[5px] text-[12px] font-bold leading-none">R$</span>
                  <span className="text-[28px] font-extrabold leading-[0.85] tracking-[-0.02em]">
                    {money(product.price)}
                  </span>
                  <Ticket
                    aria-hidden="true"
                    className="mb-[5px] ml-[4px] h-[13px] w-[13px] shrink-0 -rotate-12 text-white"
                    strokeWidth={2.2}
                  />
                </div>
                <span className="mt-[4px] text-[12px] font-normal text-white/90 line-through">
                  {money(product.originalPrice)}
                </span>
              </div>
              <div className="shrink-0 pr-0.5 text-right">
                <div className="flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-extrabold leading-none">
                  <Zap aria-hidden="true" className="h-[13px] w-[13px] fill-white text-white" strokeWidth={0} />
                  Oferta Relâmpago
                </div>
                <div className="mt-1.5 whitespace-nowrap text-[11px] font-semibold leading-none tabular-nums text-white">
                  Termina em: {countdown}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-[7px]">
            <div className="flex items-center text-[12px] leading-none text-[#161823]">
              <div className="flex items-center gap-[6px]">
                <svg fill="none" height="15" stroke="#161823" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24" width="15">
                  <rect height="13" rx="2" width="20" x="2" y="6" />
                  <path d="M2 10h20" />
                  <circle cx="17" cy="15" fill="#161823" r="1.4" />
                </svg>
                <span className="font-semibold">
                  {product.installments.count}x de {money(product.installments.value)}
                </span>
                <span className="font-semibold text-[#d62955]">sem juros</span>
                <ChevronRight aria-hidden="true" className="h-[14px] w-[14px] text-[#c8c8cc]" />
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-[7px]">
            <div className="flex min-w-0 items-center gap-[5px] text-[12px] font-extrabold leading-none text-[#d62955]">
              <Ticket aria-hidden="true" className="h-[13px] w-[13px] shrink-0 -rotate-12 text-[#fe2c55]" strokeWidth={2.2} />
              <span className="min-w-0 flex-1 truncate">
                Desconto máximo de {money(product.discountValue)} aplicado
              </span>
            </div>
          </div>

          <div className="bg-white px-4 pb-2 pt-1.5">
            <div className="flex items-start justify-between gap-3">
              <h1 className="cursor-pointer text-[15px] font-bold leading-[1.28] tracking-[-0.005em] text-[#161823]">
                {product.titleShort}
                <span className="text-[#161823]">...</span>
              </h1>
              <button
                aria-label="Salvar"
                onClick={() => {
                  setSaved((s) => !s);
                  toast(saved ? "Removido dos salvos" : "Salvo");
                }}
                className="mt-0.5 shrink-0 p-1"
              >
                <Bookmark
                  aria-hidden="true"
                  className={cn(
                    "h-[20px] w-[20px] text-[#161823]",
                    saved && "fill-[#161823]",
                  )}
                  strokeWidth={1.8}
                />
              </button>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-[#5a5b60]">
              <Star aria-hidden="true" className="h-[14px] w-[14px] fill-[#f2b900] text-[#f2b900]" />
              <b className="text-[#161823]">{product.rating}</b>
              <span className="text-[#2f7fff]">({product.ratingCount})</span>
              <span className="mx-1 text-[#d0d0d3]">|</span>
              <span>
                <b className="font-semibold text-[#161823]">{product.sold}</b> vendidos
              </span>
            </div>
          </div>

          <div className="mt-2 bg-white">
            <Link to="/endereco" search={{ product: checkoutKey }} onClick={() => saveSelectedProduct(checkoutKey)} className="block">
              <div className="flex items-center justify-between px-4 py-[13px]">
                <div className="flex items-start gap-[8px]">
                  <Truck aria-hidden="true" className="mt-[1px] h-[16px] w-[16px] shrink-0 text-[#161823]" strokeWidth={1.9} />
                  <div className="flex flex-col items-start text-[13px] leading-[1.2]">
                    <div className="flex items-center gap-x-[6px]">
                      <span className="inline-flex items-center rounded-[4px] bg-[#e7f7f5] px-2 py-[2px] text-[11.5px] font-extrabold text-[#00b8a9]">
                        Frete grátis
                      </span>
                      <span className="text-[#161823] line-through decoration-[#161823]">
                        {money(product.shipping)}
                      </span>
                    </div>
                    <div className="mt-[4px] font-extrabold text-[#161823]">
                      {deliveryWindow || "Calculando prazo de entrega..."}
                    </div>
                  </div>
                </div>
                <ChevronRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#c0c0c3]" strokeWidth={1.8} />
              </div>
            </Link>
            <div className="mx-4 h-px bg-[#f0f0f2]" />
            <button
              onClick={() => setVariantOpen(true)}
              className="flex w-full items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-[10px]">
                <LayoutGrid aria-hidden="true" className="h-[16px] w-[16px] shrink-0 text-[#5a5b60]" strokeWidth={1.9} />
                <img
                  src={
                    isMagnesio
                      ? selectedMagnesioFlavor.image
                      : isBermuda
                        ? selectedBermudaColor.image
                      : isPanela
                        ? selectedPanelaColor.image
                        : isTablet2
                        ? selectedTablet2Color.image
                        : isTablet
                          ? selectedTabletColor.image
                          : isShort
                            ? selectedShortColor.image
                            : gallery[0]
                  }
                  alt={
                    isPanela
                      ? selectedPanelaColor.name
                      : isTablet2
                        ? selectedTablet2Color.name
                        : isTablet
                          ? selectedTabletColor.name
                          : ""
                  }
                  className="h-[36px] w-[36px] shrink-0 rounded-[6px] object-cover"
                />
                <span className="text-[13px] text-[#5a5b60]">
                  Selecionado:{" "}
                  <span className="text-[#161823]">
                    {isPanela
                      ? selectedPanelaColor.name
                      : isTablet2
                        ? selectedTablet2Color.name
                        : isTablet
                          ? selectedTabletColor.name
                          : isShort
                            ? `${selectedShortColor.name} · ${selectedShortSize}`
                            : isBermuda
                              ? `${selectedBermudaColor.name} · ${selectedBermudaSize}`
                              : isMagnesio
                                ? selectedMagnesioFlavor.name
                                : product.variant}
                  </span>
                </span>
              </div>
              <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#c8c8cc]" />
            </button>
            <div className="mx-4 h-px bg-[#f0f0f2]" />
            <div
              role="button"
              tabIndex={0}
              onClick={() => setProtectionOpen(true)}
              className="block w-full cursor-pointer px-4 py-3.5 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] text-[14px] font-bold text-[#8a5a1e]">
                  <ShieldCheck aria-hidden="true" className="h-[16px] w-[16px] shrink-0 text-[#8a5a1e]" strokeWidth={1.9} />
                  Proteção do cliente
                </div>
                <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#c8c8cc]" />
              </div>
              <div className="mt-[4px] overflow-x-auto scroll-smooth pl-[21px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col gap-y-[2px] text-[12.5px] font-normal leading-[1.25] text-[#161823]">
                  {[
                    ["Devolução gratuita", "Reembolso se algo der errado"],
                    ["Pagamento seguro", "Se o seu pedido não for enviado no prazo"],
                  ].map((row) => (
                    <div key={row[0]} className="flex gap-x-4">
                      <span className="flex w-[128px] shrink-0 items-start gap-[4px]">
                        <Check aria-hidden="true" className="mt-[2px] h-[12px] w-[12px] shrink-0 text-[#8a5a1e]" strokeWidth={2.75} />
                        <span className="whitespace-nowrap leading-[1.25]">{row[0]}</span>
                      </span>
                      <span className="flex shrink-0 items-start gap-[4px]">
                        <Check aria-hidden="true" className="mt-[2px] h-[12px] w-[12px] shrink-0 text-[#8a5a1e]" strokeWidth={2.75} />
                        <span className="whitespace-nowrap leading-[1.25]">{row[1]}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 bg-white px-4 pt-3">
          <div className="mb-2 text-[15px] font-semibold">
            Vídeos de criadores ({creatorVideos.length})
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {creatorVideos.map((v, i) => (
              <div
                key={i}
                className="relative aspect-[9/13] w-[118px] shrink-0 overflow-hidden rounded-lg bg-neutral-200"
              >
                <div
                  className="h-full w-full bg-neutral-200 bg-cover bg-center"
                  style={{ backgroundImage: `url("${v.poster}")` }}
                >
                  {"embedUrl" in v ? (
                    <iframe
                      title={`Vídeo de criador ${i + 1}`}
                      src={`${v.embedUrl}?loop=1&description=0&music_info=0`}
                      className="h-full w-full border-0"
                      allow="autoplay; encrypted-media;"
                      scrolling="no"
                    />
                  ) : v.src ? (
                    <video
                      className="h-full w-full cursor-pointer object-cover transition-opacity duration-200"
                      src={v.src}
                      poster={v.poster}
                      playsInline
                      muted
                      loop
                      onClick={(e) => {
                        const el = e.currentTarget;
                        if (el.paused) void el.play();
                        else el.pause();
                      }}
                    />
                  ) : null}
                </div>
                <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 flex items-center gap-1.5 text-[11px] font-medium text-white drop-shadow">
                  <img src={v.poster} alt="Criador" className="h-4 w-4 rounded-full object-cover ring-1 ring-white/70" />
                  <span className="truncate">Criador</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={reviewsRef} className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[14px]">
              <Star aria-hidden="true" className="h-4 w-4 fill-[#f2b900] text-[#f2b900]" />
              <b>{product.rating}</b>
              <span className="mx-1 text-[#d0d0d3]">|</span>
              <span className="font-semibold">Avaliações dos clientes ({product.ratingCount})</span>
              <Info aria-hidden="true" className="h-3.5 w-3.5 text-[#8a8b91]" />
            </div>
            <Link
              to={
                isPanela
                  ? "/panela"
                  : isFerramentas
                    ? "/ferramentas"
                    : isForno
                      ? "/forno"
                      : isTablet || isTablet2
                        ? "/tablet2"
                        : "/p/motoserra/avaliacoes"
              }
              className="flex items-center gap-0.5 text-[13px] text-[#5a5b60]"
            >
              Ver mais
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          {reviews.map((r) => (
            <div key={r.name} className="mt-4 flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1f1f3] text-[12px] font-bold text-[#5a5b60]">
                {r.name[0]}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1 text-[12px] text-[#5a5b60]">
                  <span className="font-semibold text-[#161823]">{r.name}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-[#5a5b60]">
                  <span className="tracking-[1px]">
                    <span className="text-[#f2b900]">{"★".repeat(r.stars)}</span>
                    <span className="text-[#d9d9dc]">{"★".repeat(5 - r.stars)}</span>
                  </span>
                  <span className="ml-1.5">· {r.variant}</span>
                </div>
                <div className="mt-1 whitespace-pre-line text-[14px]">{r.text}</div>
                {r.photos?.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {r.photos.map((photo) => (
                      <img
                        key={photo}
                        src={photo}
                        alt={`Foto da avaliação de ${r.name}`}
                        className="h-[88px] w-[88px] shrink-0 rounded-md object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <Link
            to={
              isPanela
                ? "/panela"
                : isFerramentas
                  ? "/ferramentas"
                  : isForno
                    ? "/forno"
                    : isTablet || isTablet2
                      ? "/tablet2"
                      : "/p/motoserra/avaliacoes"
            }
            className="mt-4 flex items-center justify-center gap-1 rounded-full border border-[#e5e5e7] py-2.5 text-[13.5px] font-semibold text-[#161823]"
          >
            Ver todas as {product.ratingCount} avaliações
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full text-[11px] font-black text-white"
              style={{ backgroundColor: product.store.color }}
            >
              {product.store.initials}
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold">{product.store.name}</div>
              <div className="text-[12px] text-[#8a8b91]">{product.store.sold}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-6 text-[12px] text-[#5a5b60]">
            <span>
              <b className="text-[#161823]">100%</b> responde em 24 horas
            </span>
            <span>
              <b className="text-[#161823]">100%</b> envios pontuais
            </span>
          </div>
        </div>

        <div ref={descRef} className="mt-2 bg-white pb-3">
          <div className="px-4 pt-3">
            <h2 className="text-[17px] font-bold">Sobre este produto</h2>
            <h3 className="mt-3 text-[15px] font-semibold">Detalhes</h3>
            <div className="mt-2 flex items-start justify-between text-[14px]">
              <span className="whitespace-pre-line text-[#8a8b91]">{"Quantidade\npor embalagem"}</span>
              <span>1</span>
            </div>
          </div>
          <div className="mt-4 px-4 text-[14px] leading-[1.55]">
            <h3 className="text-[15px] font-semibold">Descrição</h3>
            <p className="mt-2 font-semibold">{product.titleFull}</p>
            {product.specs.map((s) => (
              <p key={s} className="mt-1">
                {s}
              </p>
            ))}
            <div className="mt-3 space-y-3">
              {descriptionImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Descrição ${i + 1}`}
                  className="block aspect-square w-full cursor-pointer rounded-md object-cover"
                />
              ))}
              {isPanela && (
                <p className="pt-1 text-center text-[10px] text-[#8a8b91]">
                  Imagens oficiais do produto fornecidas pela loja.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="h-[68px]" />

        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[440px] items-center gap-2 border-t border-[#f0f0f0] bg-white px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
          <button
            onClick={() => toast("Loja indisponível no momento")}
            className="flex flex-col items-center px-1 text-[11px] font-normal text-[#161823]"
          >
            <Store aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.6} />
            <span className="mt-0.5">Loja</span>
          </button>
          <button
            onClick={() => toast("Chat indisponível no momento")}
            className="flex flex-col items-center px-1 text-[11px] font-normal text-[#161823]"
          >
            <MessageCircle aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.6} />
            <span className="mt-0.5">Chat</span>
          </button>
          <Link
            to="/checkout"
            search={{ product: checkoutKey }}
            onClick={() => saveSelectedProduct(checkoutKey)}
            className="flex-1 basis-0 rounded-full bg-[#f1f1f2] py-2.5 text-center leading-[1.05]"
          >
            <div className="text-[15px] font-extrabold text-[#161823]">Adicionar</div>
            <div className="text-[15px] font-extrabold text-[#161823]">ao carrinho</div>
          </Link>
          <Link
            to="/checkout"
            search={{ product: checkoutKey }}
            onClick={() => saveSelectedProduct(checkoutKey)}
            className="flex-1 basis-0 rounded-full bg-[#fe2c55] py-2.5 text-center leading-[1.05] text-white"
          >
            <div className="text-[15px] font-extrabold">Comprar agora</div>
            <div className="text-[11px] font-bold">Frete grátis</div>
          </Link>
        </div>
      </div>

      <Toasts messages={toasts} />

      <BottomSheet open={variantOpen} onClose={() => setVariantOpen(false)} hideHeader bodyClassName="max-h-[80vh] overflow-y-auto">
        <div className="px-4 pt-5">
          <div className="flex gap-3">
            <img
              src={
                isMagnesio
                  ? selectedMagnesioFlavor.image
                  : isPanela
                    ? selectedPanelaColor.image
                  : isTablet2
                    ? selectedTablet2Color.image
                    : isTablet
                      ? selectedTabletColor.image
                      : gallery[0]
              }
              alt={
                isMagnesio
                  ? selectedMagnesioFlavor.name
                  : isBermuda
                    ? selectedBermudaColor.name
                  : isPanela
                    ? selectedPanelaColor.name
                    : isTablet2
                    ? selectedTablet2Color.name
                    : isTablet
                      ? selectedTabletColor.name
                      : ""
              }
              className="h-[104px] w-[104px] shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1 pr-6">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-[#fe2c55] px-1.5 py-[3px] text-[12px] font-extrabold leading-none text-white">
                  -{product.discountPercent}%
                </span>
                <span className="text-[14px] font-semibold text-[#fe2c55]">R$</span>
                <span className="text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[#fe2c55]">
                  {money(product.price)}
                </span>
                <Ticket aria-hidden="true" className="h-4 w-4 -rotate-12 text-[#fe2c55]" strokeWidth={2.2} />
              </div>
              <div className="mt-1 text-[13px] text-[#8a8b91] line-through">
                {money(product.originalPrice)}
              </div>
              <div className="mt-2 flex flex-col gap-1 text-[12px]">
                <span className="inline-flex items-center gap-1 font-extrabold text-[#00b8a9]">
                  <Truck aria-hidden="true" className="mt-[1px] h-[16px] w-[16px] shrink-0 text-[#161823]" strokeWidth={1.9} />
                  Frete grátis
                </span>
                <span className="inline-flex items-center gap-1 font-extrabold text-[#fe2c55]">
                  <Ticket aria-hidden="true" className="h-[11px] w-[11px]" />
                  <span className="truncate">Desconto máximo de {money(product.discountValue)} aplicado</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-[linear-gradient(90deg,#ff7a2f,#ff9a4a)] px-3 py-2 text-white">
            <div className="flex items-center gap-1.5 text-[14px] font-extrabold">
              <Zap aria-hidden="true" className="h-4 w-4 fill-white text-white" />
              Oferta Relâmpago
            </div>
            <div className="text-[12.5px] tabular-nums">
              Termina em: <b>{countdown}</b>
            </div>
          </div>
          <div className="mt-3 text-[15px] font-semibold text-[#161823]">
            {isPanela || isTablet || isTablet2 || isShort || isBermuda
              ? `Cor (${
                  isPanela
                    ? panelaColorOptions.length
                    : isTablet2
                      ? tablet2ColorOptions.length
                      : isShort
                        ? shortColorOptions.length
                        : isBermuda
                          ? bermudaColorOptions.length
                          : magnesioFlavorOptions.length
                })`
              : "(1)"}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(isPanela
              ? panelaColorOptions
              : isTablet2
                ? tablet2ColorOptions
                : isTablet
                  ? tabletColorOptions
                  : isShort
                    ? shortColorOptions
                    : isBermuda
                      ? bermudaColorOptions
                      : isMagnesio
                        ? magnesioFlavorOptions
                        : [{ name: product.variant, image: gallery[0] }]
            ).map(
              (option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => {
                    if (isPanela) setSelectedPanelaColor(option);
                    if (isTablet2) {
                      setSelectedTablet2Color(option);
                      setTablet2ColorSelected(true);
                    }
                    if (isTablet) {
                      setSelectedTabletColor(option);
                      setTabletColorSelected(true);
                    }
                    if (isShort) setSelectedShortColor(option);
                    if (isBermuda) setSelectedBermudaColor(option);
                    if (isMagnesio) setSelectedMagnesioFlavor(option);
                    if (!isPanela && !isTablet && !isTablet2 && !isShort && !isBermuda && !isMagnesio) return;
                    saveSelectedVariantImage(option.image);
                    saveSelectedVariantLabel(
                      isBermuda
                        ? `${option.name} · ${selectedBermudaSize}`
                        : isShort
                          ? `${option.name} · ${selectedShortSize}`
                          : option.name,
                    );
                    setSlide(1);
                    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "relative inline-block overflow-hidden rounded-lg border-2",
                    (!isPanela && !isTablet && !isTablet2 && !isShort && !isBermuda && !isMagnesio) ||
                    (isPanela && selectedPanelaColor.name === option.name) ||
                    (isTablet && selectedTabletColor.name === option.name) ||
                    (isTablet2 && selectedTablet2Color.name === option.name) ||
                    (isShort && selectedShortColor.name === option.name) ||
                    (isBermuda && selectedBermudaColor.name === option.name) ||
                    (isMagnesio && selectedMagnesioFlavor.name === option.name)
                      ? "border-[#fe2c55]"
                      : "border-[#e5e5e7]",
                  )}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="block h-[140px] w-[140px] object-cover"
                  />
                  <div className="bg-white px-1 pb-1.5 pt-1 text-center text-[13px] font-semibold text-[#161823]">
                    {option.name}
                  </div>
                </button>
              ),
            )}
          </div>
          {(isShort || isBermuda) && (
            <div className="mt-4">
              <div className="text-[15px] font-semibold text-[#161823]">
                Tamanho
              </div>
              <div className="mt-2 flex gap-2">
                {(isShort ? shortSizeOptions : bermudaSizeOptions).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      if (isShort) {
                        setSelectedShortSize(size);
                        saveSelectedVariantLabel(`${selectedShortColor.name} · ${size}`);
                      } else {
                        setSelectedBermudaSize(size);
                        saveSelectedVariantLabel(`${selectedBermudaColor.name} · ${size}`);
                      }
                    }}
                    className={cn(
                      "min-w-[48px] rounded-md border px-4 py-2 text-[14px] font-semibold",
                      (isShort ? selectedShortSize : selectedBermudaSize) === size
                        ? "border-[#fe2c55] bg-[#fff0f3] text-[#fe2c55]"
                        : "border-[#e5e5e7] text-[#161823]",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[15px] font-semibold text-[#161823]">Quantidade</span>
            <div className="flex items-center gap-4 rounded-full bg-[#f1f1f2] px-2 py-1.5">
              <button
                aria-label="Diminuir"
                disabled={qty <= 1}
                onClick={() => changeQty(qty - 1)}
                className="grid h-6 w-6 place-items-center text-[18px] text-[#161823] disabled:text-[#c8c8cc]"
              >
                −
              </button>
              <span className="min-w-[16px] text-center text-[15px] font-semibold text-[#161823]">
                {qty}
              </span>
              <button
                aria-label="Aumentar"
                onClick={() => changeQty(qty + 1)}
                className="grid h-6 w-6 place-items-center text-[18px] text-[#161823]"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 border-t border-[#f0f0f0] bg-white px-3 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
          <div className="flex items-center gap-2">
            <Link
              to="/checkout"
              search={{ product: checkoutKey }}
              onClick={() => saveSelectedProduct(checkoutKey)}
              className="flex-1 basis-0 rounded-full bg-[#f1f1f2] py-2.5 text-center leading-[1.05]"
            >
              <div className="text-[15px] font-extrabold text-[#161823]">Adicionar</div>
              <div className="text-[15px] font-extrabold text-[#161823]">ao carrinho</div>
            </Link>
            <Link
              to="/checkout"
              search={{ product: checkoutKey }}
              onClick={() => saveSelectedProduct(checkoutKey)}
              className="flex-1 basis-0 rounded-full bg-[#fe2c55] py-2.5 text-center leading-[1.05] text-white"
            >
              <div className="text-[15px] font-extrabold">Comprar agora</div>
              <div className="text-[11px] font-bold">Frete grátis</div>
            </Link>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet open={protectionOpen} title="Proteção do cliente" onClose={() => setProtectionOpen(false)}>
        <div className="px-1 py-2">
          {protectionTopics.map(({ icon: Icon, title, text }) => (
            <section key={title} className="mb-5">
              <div className="flex items-center gap-2 text-[#8a5a1e]">
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.8} />
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
