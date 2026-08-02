import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AppProvider } from "@/providers/AppProvider";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-8xl font-black tracking-tighter text-[#F5C754]">404</h1>
        <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The requested page could not be located in the Luxora catalog.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button size="lg" className="rounded-xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Catalog Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error('[Luxora System Error]', error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Application Error</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An unexpected error occurred while processing this page. You can attempt to refresh or return to safety.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl font-bold bg-[#F5C754] text-black hover:bg-[#D49B24]"
          >
            Refresh View
          </Button>
          <Link to="/">
            <Button variant="outline" className="rounded-xl font-bold">
              Go Home
            </Button>
          </Link>
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
      { title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}` },
      {
        name: "description",
        content: SITE_CONFIG.description,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "shortcut icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap",
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
    <html lang="en" className="dark">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <AppProvider queryClient={queryClient}>
      <Outlet />
    </AppProvider>
  );
}
