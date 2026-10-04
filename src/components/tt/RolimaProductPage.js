import { Link } from "@tanstack/react-router";
import { Bookmark, Check, ChevronRight, Info, LayoutGrid, MessageCircle, Package, ShieldCheck, Star, Store, Ticket, Truck, Zap, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet, Toasts } from "@/components/tt/BottomSheet";
import { Shell } from "@/components/tt/Shell";
import { colorImages, descriptionImages, gallery as catalogGallery, money, product, reviews, } from "@/lib/rolima-catalog";
import { getFlashDeadline, getQty, hhmmss, saveQty, saveSelectedProduct, } from "@/lib/funnel";
import { useDeliveryWindow } from "@/hooks/use-delivery-window";
import { cn } from "@/lib/utils";
const productKey = "rolima";
const colorNames = [
    "Azul e laranja",
    "Verde e roxo",
    "Rosa e azul",
    "Branco e azul",
    "Rosa",
    "Azul e vermelho",
    "Amarelo e preto",
    "Rosa e verde",
];
const colorOptions = colorImages.map((image, index) => ({
    name: colorNames[index] ?? `Cor ${index + 1}`,
    image,
}));
const protectionTopics = [
    {
        icon: Package,
        title: "Devoluções gratuitas em 30 dias",
        text: "Devolução gratuita em até 30 dias após o recebimento do produto. Os Termos e Condições se aplicam.",
    },
    {
        icon: ShieldCheck,
        title: "Pagamento seguro",
        text: "Suas informações pessoais são protegidas durante todo o processo de compra.",
    },
    {
        icon: ShieldCheck,
        title: "Reembolso se algo der errado",
        text: "Se o pedido for perdido ou danificado durante o transporte, reembolsaremos automaticamente o seu dinheiro.",
    },
    {
        icon: Truck,
        title: "Envio dentro do prazo",
        text: "Se o pedido não for despachado no prazo informado, cancelaremos e reembolsaremos automaticamente.",
    },
];
export function RolimaProductPage() {
    const deliveryWindow = useDeliveryWindow();
    const [slide, setSlide] = useState(1);
    const [tab, setTab] = useState("visao");
    const [showTabs, setShowTabs] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [qty, setQty] = useState(1);
    const [variantOpen, setVariantOpen] = useState(false);
    const [protectionOpen, setProtectionOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [saved, setSaved] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const displayedReviews = showAllReviews
        ? Array.from({ length: 60 }, (_, index) => reviews[index % reviews.length])
        : reviews;
    const gallery = Array.from(new Set([
        selectedColor.image,
        ...colorOptions
            .filter((option) => option.image !== selectedColor.image)
            .map((option) => option.image),
        ...catalogGallery,
    ]));
    const scrollerRef = useRef(null);
    const pageRef = useRef(null);
    const reviewsRef = useRef(null);
    const descRef = useRef(null);
    useEffect(() => {
        setQty(getQty());
        const deadline = getFlashDeadline();
        const tick = () => setRemaining(deadline - Date.now());
        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, []);
    const toast = (message) => {
        setToasts([message]);
        window.setTimeout(() => setToasts([]), 1800);
    };
    const changeQty = (next) => {
        const value = Math.min(99, Math.max(1, next));
        setQty(value);
        saveQty(value);
    };
    const goTo = (target) => {
        const element = pageRef.current;
        if (!element)
            return;
        const top = target === "visao"
            ? 0
            : target === "avaliacoes"
                ? (reviewsRef.current?.offsetTop ?? 0) - 48
                : (descRef.current?.offsetTop ?? 0) - 48;
        element.scrollTo({ top, behavior: "smooth" });
    };
    const onPageScroll = () => {
        const element = pageRef.current;
        if (!element)
            return;
        setShowTabs(element.scrollTop > 320);
        const reviewsTop = (reviewsRef.current?.offsetTop ?? 0) - 60;
        const descTop = (descRef.current?.offsetTop ?? 0) - 60;
        if (element.scrollTop >= descTop)
            setTab("descricao");
        else if (element.scrollTop >= reviewsTop)
            setTab("avaliacoes");
        else
            setTab("visao");
    };
    return (<Shell className="bg-[#f5f5f5]">
      <div ref={pageRef} onScroll={onPageScroll} className="relative h-screen overflow-y-auto bg-[#f5f5f5]">
        <div className={cn("fixed inset-x-0 top-0 z-50 mx-auto max-w-[440px] border-b border-[#f0f0f0] bg-white transition-transform duration-200", showTabs ? "translate-y-0" : "-translate-y-full")}>
          <div className="flex h-11 items-stretch">
            {[
            ["visao", "Visão geral"],
            ["avaliacoes", "Avaliações"],
            ["descricao", "Descrição"],
        ].map(([key, label]) => (<button key={key} onClick={() => goTo(key)} className="relative flex-1 text-[14px] font-medium">
                <span className={tab === key ? "text-[#161823]" : "text-[#8a8b91]"}>
                  {label}
                </span>
                {tab === key ? (<span className="absolute inset-x-0 -bottom-px mx-auto h-[2px] w-8 rounded-full bg-[#fe2c55]"/>) : null}
              </button>))}
          </div>
        </div>

        <div className="relative bg-white">
          <div ref={scrollerRef} onScroll={() => {
            const element = scrollerRef.current;
            if (element) {
                setSlide(Math.min(gallery.length, Math.round(element.scrollLeft / element.clientWidth) + 1));
            }
        }} className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((src, index) => (<img key={src} src={src} alt={`Imagem ${index + 1} de ${product.titleShort}`} className="block h-full w-full shrink-0 snap-start object-cover"/>))}
          </div>
          <div className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-[3px] text-[11px] font-medium leading-none text-white">
            {slide}/{gallery.length}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#ff6a1f] px-4 pb-2 pt-2 text-white">
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-end gap-1">
                <span className="mb-[5px] rounded-[4px] bg-white px-[5px] py-[2px] text-[10px] font-extrabold leading-none text-[#fe2c55]">
                  -{product.discountPercent}%
                </span>
                <span className="mb-[5px] text-[12px] font-bold leading-none">R$</span>
                <span className="text-[28px] font-extrabold leading-[0.85]">
                  87<span className="align-baseline text-[15px]">,90</span>
                </span>
                <Ticket className="mb-[5px] ml-1 h-[13px] w-[13px] -rotate-12"/>
              </div>
              <span className="mt-1 text-[11px] text-white/90 line-through">
                {money(product.originalPrice)}
              </span>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-[13px] font-extrabold">
                <Zap className="h-[13px] w-[13px] fill-white"/>
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
            <button aria-label="Salvar" onClick={() => {
            setSaved((value) => !value);
            toast(saved ? "Removido dos salvos" : "Salvo");
        }} className="shrink-0 p-1">
              <Bookmark className={cn("h-5 w-5", saved && "fill-[#161823]")} strokeWidth={1.8}/>
            </button>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[12px] text-[#5a5b60]">
            <Star className="h-[14px] w-[14px] fill-[#f2b900] text-[#f2b900]"/>
            <b className="text-[#161823]">{product.rating}</b>
            <span className="text-[#2f7fff]">({product.ratingCount})</span>
            <span className="mx-1 text-[#d0d0d3]">|</span>
            <span>
              <b className="text-[#161823]">{product.sold}</b> vendidos
            </span>
          </div>
        </div>

        <div className="mt-2 bg-white">
          <button type="button" onClick={() => setVariantOpen(true)} className="flex w-full items-center justify-between px-4 py-3">
            <div className="flex items-center gap-[10px]">
              <LayoutGrid className="h-[16px] w-[16px] shrink-0 text-[#5a5b60]"/>
              <img src={selectedColor.image} alt="" className="h-[36px] w-[36px] shrink-0 rounded-[6px] object-cover"/>
              <span className="text-[13px] text-[#5a5b60]">
                Selecionado:{" "}
                <span className="text-[#161823]">{selectedColor.name}</span>
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#c8c8cc]"/>
          </button>
        </div>

        <div className="mt-2 bg-white">
          <Link to="/endereco" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4"/>
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
            <ChevronRight className="h-5 w-5 text-[#c0c0c3]"/>
          </Link>

          <div className="mx-4 h-px bg-[#f0f0f2]"/>

          <div role="button" tabIndex={0} onClick={() => setProtectionOpen(true)} className="cursor-pointer px-4 py-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#8a5a1e]">
                <ShieldCheck className="h-4 w-4"/>
                Proteção do cliente
              </div>
              <ChevronRight className="h-4 w-4 text-[#c8c8cc]"/>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 pl-5 text-[12px]">
              {["Devolução gratuita", "Pagamento seguro", "Reembolso se algo der errado"].map((item) => (<span key={item} className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-[#8a5a1e]"/>
                    {item}
                  </span>))}
            </div>
          </div>
        </div>

        <div ref={reviewsRef} className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-1.5 text-[14px] font-semibold">
            <Star className="h-4 w-4 fill-[#f2b900] text-[#f2b900]"/>
            {product.rating}
            <span className="mx-1 text-[#d0d0d3]">|</span>
            Avaliações dos clientes ({product.ratingCount})
            <Info className="h-3.5 w-3.5 text-[#8a8b91]"/>
          </div>

          {displayedReviews.map((review, index) => (<div key={`${review.name}-${index}`} className="mt-4 flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1f1f3] text-xs font-bold text-[#5a5b60]">
                {review.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold">{review.name}</div>
                <div className="mt-1 text-[12px]">
                  <span className="text-[#f2b900]">{"★".repeat(review.stars)}</span>
                  <span className="text-[#d9d9dc]">{"★".repeat(5 - review.stars)}</span>
                  <span className="ml-2 text-[#5a5b60]">· {review.variant}</span>
                </div>
                <div className="mt-1 whitespace-pre-line text-[14px]">{review.text}</div>
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {review.photos.map((photo) => (<img key={photo} src={photo} alt={`Foto da avaliação de ${review.name}`} className="h-[76px] w-[76px] shrink-0 rounded-md object-cover"/>))}
                </div>
              </div>
            </div>))}
          <button type="button" onClick={() => setShowAllReviews((value) => !value)} className="mt-4 flex w-full items-center justify-center gap-1 rounded-full border border-[#e5e5e7] py-2.5 text-[13.5px] font-semibold text-[#161823]">
            {showAllReviews
            ? "Ocultar avaliações"
            : `Ver todas as ${product.ratingCount} avaliações`}
            <ChevronRight aria-hidden="true" className="h-4 w-4"/>
          </button>
        </div>

        <div className="mt-2 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full text-xs font-black text-white" style={{ backgroundColor: product.store.color }}>
              {product.store.initials}
            </div>
            <div>
              <div className="text-[15px] font-semibold">{product.store.name}</div>
              <div className="text-[12px] text-[#8a8b91]">{product.store.sold}</div>
            </div>
          </div>
        </div>

        <div ref={descRef} className="mt-2 bg-white px-4 py-3">
          <h2 className="text-[17px] font-bold">Sobre este produto</h2>
          <h3 className="mt-3 text-[15px] font-semibold">Descrição</h3>
          <p className="mt-2 text-[14px] font-semibold">{product.titleFull}</p>
          {product.specs.map((specification) => (<p key={specification} className="mt-1 text-[14px]">
              {specification}
            </p>))}
          <div className="mt-3 space-y-3">
            {descriptionImages.map((src, index) => (<img key={src} src={src} alt={`Descrição ${index + 1}`} className="block aspect-square w-full rounded-md object-cover"/>))}
          </div>
        </div>

        <div className="h-[76px]"/>

        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[440px] items-center gap-2 border-t border-[#f0f0f0] bg-white px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
          <button onClick={() => toast("Loja indisponível no momento")} className="flex flex-col items-center px-1 text-[11px]">
            <Store className="h-[22px] w-[22px]" strokeWidth={1.6}/>
            <span>Loja</span>
          </button>
          <button onClick={() => toast("Chat indisponível no momento")} className="flex flex-col items-center px-1 text-[11px]">
            <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.6}/>
            <span>Chat</span>
          </button>
          <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold">
            Adicionar ao carrinho
          </Link>
          <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#fe2c55] py-2.5 text-center text-[15px] font-extrabold text-white">
            Comprar agora
          </Link>
        </div>
      </div>

      <Toasts messages={toasts}/>

      <BottomSheet open={variantOpen} onClose={() => setVariantOpen(false)} hideHeader bodyClassName="max-h-[80vh] overflow-y-auto">
        <div className="px-4 pt-5">
          <div className="flex gap-3">
            <img src={selectedColor.image} alt="" className="h-[104px] w-[104px] shrink-0 rounded-lg object-cover"/>
            <div className="min-w-0 flex-1 pr-6">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-[#fe2c55] px-1.5 py-[3px] text-[12px] font-extrabold leading-none text-white">
                  -{product.discountPercent}%
                </span>
                <span className="text-[14px] font-semibold text-[#fe2c55]">R$</span>
                <span className="text-[28px] font-extrabold leading-none text-[#fe2c55]">
                  87<span className="text-[18px]">,90</span>
                </span>
                <Ticket className="h-4 w-4 -rotate-12 text-[#fe2c55]"/>
              </div>
              <div className="mt-1 text-[13px] text-[#8a8b91] line-through">
                {money(product.originalPrice)}
              </div>
              <div className="mt-2 flex flex-col gap-1 text-[12px]">
                <span className="inline-flex items-center gap-1 font-extrabold text-[#00b8a9]">
                  <Truck className="h-4 w-4 text-[#161823]"/>
                  Frete grátis
                </span>
                <span className="inline-flex items-center gap-1 font-extrabold text-[#fe2c55]">
                  <Ticket className="h-3 w-3"/>
                  Desconto máximo de {money(product.discountValue)} aplicado
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-[linear-gradient(90deg,#ff7a2f,#ff9a4a)] px-3 py-2 text-white">
            <div className="flex items-center gap-1.5 text-[14px] font-extrabold">
              <Zap className="h-4 w-4 fill-white"/>
              Oferta Relâmpago
            </div>
            <div className="text-[12.5px] tabular-nums">
              Termina em: <b>{hhmmss(remaining)}</b>
            </div>
          </div>

          <div className="mt-3 text-[15px] font-semibold text-[#161823]">
            ({colorOptions.length})
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {colorOptions.map((option) => {
            const isSelected = option.image === selectedColor.image;
            return (<button key={option.name} type="button" onClick={() => {
                    setSelectedColor(option);
                    setSlide(1);
                    setVariantOpen(false);
                    requestAnimationFrame(() => {
                        scrollerRef.current?.scrollTo({
                            left: 0,
                            behavior: "smooth",
                        });
                    });
                }} aria-label={`Selecionar cor ${option.name}`} aria-pressed={isSelected} className={cn("relative overflow-hidden rounded-lg border-2 bg-white text-left", isSelected ? "border-[#fe2c55]" : "border-[#e5e5e7]")}>
                  <img src={option.image} alt={option.name} className="block aspect-square w-full object-cover"/>
                  <div className="bg-white px-1 pb-2 pt-1 text-center text-[13px] font-semibold text-[#161823]">
                    {option.name}
                  </div>
                </button>);
        })}
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-[#f0f0f0] bg-white px-3 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
          <div className="flex items-center gap-2">
            <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#f1f1f2] py-2.5 text-center text-[15px] font-extrabold leading-[1.05]">
              Adicionar ao carrinho
            </Link>
            <Link to="/checkout" search={{ product: productKey }} onClick={() => saveSelectedProduct(productKey)} className="flex-1 rounded-full bg-[#fe2c55] py-2.5 text-center text-[15px] font-extrabold leading-[1.05] text-white">
              Comprar agora
            </Link>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet open={protectionOpen} title="Proteção do cliente" onClose={() => setProtectionOpen(false)}>
        <div className="px-1 py-2">
          {protectionTopics.map(({ icon: Icon, title, text }) => (<section key={title} className="mb-5">
              <div className="flex items-center gap-2 text-[#8a5a1e]">
                <Icon className="h-5 w-5"/>
                <h3 className="text-[15px] font-bold">{title}</h3>
              </div>
              <p className="mt-2 text-[13px] leading-[1.5]">{text}</p>
            </section>))}
        </div>
      </BottomSheet>
    </Shell>);
}
