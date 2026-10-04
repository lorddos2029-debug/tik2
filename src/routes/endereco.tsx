import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { BottomSheet, Toasts } from "@/components/tt/BottomSheet";
import { Shell } from "@/components/tt/Shell";
import { getAddress, getQty, getSelectedProduct, saveAddress, type Address } from "@/lib/funnel";
import { newEventId } from "@/lib/tracking";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";
import { checkoutProducts, isProductKey } from "@/lib/commerce-products";

export const Route = createFileRoute("/endereco")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: isProductKey(search["product"]) ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Adicionar o novo endereço | Promoções" },
      { name: "description", content: "Informe o endereço de entrega do seu pedido." },
      { property: "og:title", content: "Adicionar o novo endereço" },
      { property: "og:description", content: "Informe o endereço de entrega do seu pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AddressPage,
});

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const empty: Address = {
  nome: "",
  telefone: "",
  email: "",
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  endereco: "",
  numero: "",
  complemento: "",
  cpf: "",
  padrao: false,
};

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const maskCep = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

const maskCpf = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
};

function AddressPage() {
  const { product: productKey } = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate();
  const [form, setForm] = useState<Address>(empty);
  const [ufOpen, setUfOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    const stored = getAddress();
    if (stored) setForm(stored);
  }, []);

  useEffect(() => {
    if (!form.estado) {
      setCities([]);
      return;
    }
    let alive = true;
    void (async () => {
      try {
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios`,
        );
        const data = (await res.json()) as Array<{ nome: string }>;
        if (alive) setCities(data.map((c) => c.nome));
      } catch {
        if (alive) setCities([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, [form.estado]);

  const set = <K extends keyof Address>(key: K, value: Address[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onCep = async (value: string) => {
    const masked = maskCep(value);
    set("cep", masked);
    const digits = masked.replace(/\D/g, "");
    if (digits.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = (await res.json()) as {
        erro?: boolean;
        uf?: string;
        localidade?: string;
        bairro?: string;
        logradouro?: string;
      };
      if (!data.erro) {
        setForm((f) => ({
          ...f,
          cep: masked,
          estado: data.uf ?? f.estado,
          cidade: data.localidade ?? f.cidade,
          bairro: data.bairro ?? f.bairro,
          endereco: data.logradouro ?? f.endereco,
        }));
      }
    } catch {
      /* offline: usuário completa manualmente */
    }
  };

  const canSave =
    form.nome.trim().length > 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) &&
    form.telefone.replace(/\D/g, "").length >= 10 &&
    form.cep.replace(/\D/g, "").length === 8 &&
    form.estado !== "" &&
    form.cidade !== "" &&
    form.endereco.trim() !== "" &&
    form.numero.trim() !== "";

  const submit = () => {
    if (!canSave) {
      setToasts(["Preencha os campos obrigatórios"]);
      window.setTimeout(() => setToasts([]), 1800);
      return;
    }
    const product = productKey ? checkoutProducts[productKey] : getSelectedProduct();
    saveAddress(form);
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "BRL",
        value: Number((product.price * getQty()).toFixed(2)),
        content_ids: [product.id],
        content_type: "product",
        num_items: getQty(),
      },
      newEventId(),
    );
    void navigate({ to: "/checkout", search: { product: product.key } });
  };

  return (
    <Shell className="bg-[#f5f5f5] pb-[130px]">
      <div className="sticky top-0 z-30 bg-white">
        <div className="relative flex h-12 items-center px-2">
          <button
            aria-label="Voltar"
            onClick={() => router.history.back()}
            className="grid h-10 w-10 place-items-center"
          >
            <ChevronLeft className="h-6 w-6 text-[#161823]" />
          </button>
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[17px] font-bold">
            Adicionar o novo endereço
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 pt-4 text-[13px] text-[#5a5b60]">Informações de contato</div>
      <div className="bg-white">
        <Row border>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => set("nome", e.target.value)}
            placeholder="Nome completo"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <Row border>
          <span className="mr-2 text-[15px] text-[#161823]">BR</span>
          <span className="mr-2 text-[15px] text-[#161823]">+55</span>
          <span className="mr-3 h-4 w-px bg-[#e5e5e7]" />
          <input
            value={form.telefone}
            inputMode="tel"
            onChange={(e) => set("telefone", maskPhone(e.target.value))}
            placeholder="Número de telefone"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <Row>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="Email"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
      </div>

      <div className="px-4 pb-2 pt-4 text-[13px] text-[#5a5b60]">Informações de endereço</div>
      <div className="bg-white">
        <Row border>
          <input
            type="text"
            value={form.cep}
            inputMode="numeric"
            onChange={(e) => void onCep(e.target.value)}
            placeholder="CEP/Código postal"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <div className="grid grid-cols-2 border-b border-[#f0f0f0]">
          <button
            onClick={() => setUfOpen(true)}
            className="flex items-center justify-between px-4 py-3.5 text-left"
          >
            <span
              className={cn("text-[15px]", form.estado ? "text-[#161823]" : "text-[#8a8b91]")}
            >
              {form.estado || "Estado/UF"}
            </span>
            <ChevronDown className="h-4 w-4 text-[#8a8b91]" />
          </button>
          <button
            onClick={() => setCityOpen(true)}
            className="flex items-center justify-between border-l border-[#f0f0f0] px-4 py-3.5 text-left"
          >
            <span
              className={cn(
                "truncate text-[15px]",
                form.cidade ? "text-[#161823]" : "text-[#8a8b91]",
              )}
            >
              {form.cidade || "Cidade"}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-[#8a8b91]" />
          </button>
        </div>
        <Row border>
          <input
            type="text"
            value={form.bairro}
            onChange={(e) => set("bairro", e.target.value)}
            placeholder="Bairro/Distrito"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <Row border>
          <input
            type="text"
            value={form.endereco}
            onChange={(e) => set("endereco", e.target.value)}
            placeholder="Endereço"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <Row border>
          <input
            type="text"
            value={form.numero}
            onChange={(e) => set("numero", e.target.value)}
            placeholder={'Nº da residência. Use "s/n" se nenhum'}
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
        <Row>
          <input
            type="text"
            value={form.complemento}
            onChange={(e) => set("complemento", e.target.value)}
            placeholder="Apartamento, bloco, unidade etc. (opcional)"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
      </div>

      <div className="px-4 pb-2 pt-4 text-[13px] text-[#5a5b60]">Informações fiscais</div>
      <div className="bg-white">
        <Row>
          <input
            type="text"
            value={form.cpf}
            inputMode="numeric"
            onChange={(e) => set("cpf", maskCpf(e.target.value))}
            placeholder="CPF"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#8a8b91]"
          />
        </Row>
      </div>
      <div className="bg-white px-4 pb-3 text-[12.5px]">
        <span className="text-[#8a8b91]">O CPF será usado para emitir faturas.</span>
      </div>

      <div className="px-4 pb-2 pt-4 text-[13px] text-[#5a5b60]">Configurações</div>
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-[15px]">Definir como padrão</span>
          <button
            aria-label="Definir como padrão"
            aria-pressed={form.padrao}
            onClick={() => set("padrao", !form.padrao)}
            className={cn(
              "relative h-[26px] w-[46px] rounded-full transition",
              form.padrao ? "bg-[#fe2c55]" : "bg-[#e5e5e7]",
            )}
          >
            <span
              className={cn(
                "absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all",
                form.padrao ? "left-[22px]" : "left-[2px]",
              )}
            />
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[440px] bg-white pt-2">
        <div className="px-6 pb-2 text-center text-[12px] leading-relaxed text-[#5a5b60]">
          Leia a <span className="font-semibold text-[#161823]">Política de privacidade do TikTok</span>{" "}
          para saber mais sobre como usamos suas informações pessoais.
        </div>
        <div className="px-4 pb-[max(env(safe-area-inset-bottom),12px)]">
          <button
            onClick={submit}
            className={cn(
              "w-full rounded-full py-3 text-[16px] font-semibold text-white transition",
              canSave ? "bg-[#fe2c55]" : "bg-[#fbb6c2]",
            )}
          >
            Salvar
          </button>
        </div>
      </div>

      <BottomSheet
        open={ufOpen}
        title="Estado/UF"
        onClose={() => setUfOpen(false)}
        bodyClassName="max-h-[80vh] overflow-y-auto px-4"
      >
        <div className="grid grid-cols-4 gap-2 py-2">
          {UFS.map((uf) => (
            <button
              key={uf}
              onClick={() => {
                setForm((f) => ({ ...f, estado: uf, cidade: "" }));
                setUfOpen(false);
              }}
              className={cn(
                "rounded-md border py-2 text-[14px]",
                form.estado === uf
                  ? "border-[#fe2c55] bg-[#fff0f3] text-[#fe2c55]"
                  : "border-[#e5e5e7]",
              )}
            >
              {uf}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet
        open={cityOpen}
        title="Cidade"
        onClose={() => setCityOpen(false)}
        bodyClassName="max-h-[80vh] overflow-y-auto px-4"
      >
        <div className="divide-y divide-[#f0f0f0] py-2">
          {!form.estado && (
            <button className="flex w-full items-center justify-between py-3 text-left text-[14px]">
              <span>Selecione o estado primeiro</span>
            </button>
          )}
          {form.estado &&
            cities.map((c) => (
              <button
                key={c}
                onClick={() => {
                  set("cidade", c);
                  setCityOpen(false);
                }}
                className="flex w-full items-center justify-between py-3 text-left text-[14px]"
              >
                <span>{c}</span>
              </button>
            ))}
          {form.estado && cities.length === 0 && (
            <button className="flex w-full items-center justify-between py-3 text-left text-[14px]">
              <span>Carregando cidades...</span>
            </button>
          )}
        </div>
      </BottomSheet>

      <Toasts messages={toasts} />
    </Shell>
  );
}

function Row({ children, border }: { children: React.ReactNode; border?: boolean }) {
  return (
    <div className={cn("px-4", border && "border-b border-[#f0f0f0]")}>
      <div className="flex items-center py-3.5">{children}</div>
    </div>
  );
}
