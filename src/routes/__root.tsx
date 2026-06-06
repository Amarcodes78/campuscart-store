import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-7xl font-bold neon-text">404</h1>
        <h2 className="mt-4 font-display text-xl">This page took a gap year</h2>
        <p className="mt-2 text-sm text-muted-foreground">It'll come back. Maybe. Probably not.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 btn-glow"
        >
          Take me home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-8 text-center">
        <h1 className="font-display text-xl font-semibold">Oof. Something cracked.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Even our best students fail sometimes. Try again?
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl px-4 py-2 btn-glow"
          >
            Try again
          </button>
          <a href="/" className="rounded-xl glass px-4 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CampusCart — Everything a student needs, in one cart." },
      { name: "description", content: "Glassy, neon, slightly chaotic ecommerce for college students. Hoodies, stationery, tech, bottles & backpacks." },
      { name: "author", content: "CampusCart" },
      { property: "og:title", content: "CampusCart" },
      { property: "og:description", content: "Everything a student needs, in one cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function BlobBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-blob [animation-delay:-12s]" />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BlobBg />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pt-6">
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}
