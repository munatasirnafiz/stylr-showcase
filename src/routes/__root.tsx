import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-32">
        <div className="max-w-md text-center">
          <p className="kicker">Error 404</p>
          <h1 className="font-serif text-6xl text-ink mt-4">Page not found</h1>
          <p className="mt-4 text-muted-ink">The page you're looking for doesn't exist or has been moved.</p>
          <div className="mt-8">
            <Link to="/" className="inline-flex items-center gap-2 border border-gold text-gold-deep px-7 py-3 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-ink">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-ink">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-charcoal text-ivory px-6 py-3 text-xs uppercase tracking-[0.22em]"
          >Try again</button>
          <a href="/" className="border border-gold text-gold-deep px-6 py-3 text-xs uppercase tracking-[0.22em]">Go home</a>
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
      { title: "Stylr.store — Timepieces & Parfums d'Exception · Dhaka" },
      { name: "description", content: "A Dhaka-based maison for rare watches and niche perfumes. Hand-selected, privately delivered." },
      { name: "author", content: "Stylr.store" },
      { property: "og:title", content: "Stylr.store — Style Your Way, Shop Your Day" },
      { property: "og:description", content: "Curated rare watches and niche perfumes, by private WhatsApp inquiry from Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" },
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
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isStudio = pathname.startsWith("/studio");

  return (
    <QueryClientProvider client={queryClient}>
      {isStudio ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
      )}
    </QueryClientProvider>
  );
}
