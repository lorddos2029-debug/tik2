import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useLocation, HeadContent, Scripts, } from "@tanstack/react-router";
import { useEffect } from "react";
import { ProductPage } from "@/components/tt/ProductPage";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { META_PIXEL_ID, trackMetaEvent } from "../lib/meta-pixel";
const UTMIFY_SCRIPT_ID = "utmify-utms-script";
const UTMIFY_SCRIPT_SRC = "https://cdn.utmify.com.br/scripts/utms/latest.js";
function NotFoundComponent() {
    const location = useLocation();
    if (location.pathname.startsWith("/tablet")) {
        return <ProductPage productKey="tablet"/>;
    }
    return (<div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>);
}
function ErrorComponent({ error, reset }) {
    console.error(error);
    const router = useRouter();
    useEffect(() => {
        reportLovableError(error, { boundary: "tanstack_root_error_component" });
    }, [error]);
    return (<div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => {
            router.invalidate();
            reset();
        }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>);
}
export const Route = createRootRouteWithContext()({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "Promoções Tik | Ofertas especiais" },
            { name: "description", content: "Ofertas especiais em produtos selecionados com pagamento seguro e entrega rápida." },
            { name: "author", content: "Promoções Tik" },
            { property: "og:title", content: "Promoções Tik" },
            { property: "og:description", content: "Ofertas especiais em produtos selecionados." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            { rel: "icon", href: "/favicon.png", type: "image/png" },
        ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
});
function RootShell({ children }) {
    return (<html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <noscript>
          <img alt="" height="1" width="1" className="hidden" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}/>
        </noscript>
        <Scripts />
      </body>
    </html>);
}
function RootComponent() {
    const { queryClient } = Route.useRouteContext();
    const location = useLocation();
    useEffect(() => {
        if (document.getElementById(UTMIFY_SCRIPT_ID))
            return;
        const script = document.createElement("script");
        script.id = UTMIFY_SCRIPT_ID;
        script.src = UTMIFY_SCRIPT_SRC;
        script.async = true;
        script.dataset["utmifyPreventXcodSck"] = "";
        script.dataset["utmifyPreventSubids"] = "";
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, []);
    useEffect(() => {
        trackMetaEvent("PageView");
    }, [location.pathname, location.searchStr]);
    return (<QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>);
}
