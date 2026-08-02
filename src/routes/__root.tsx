import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

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
          An unexpected error occurred. You can attempt to refresh or return to safety.
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
      { name: "description", content: SITE_CONFIG.description },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <AppProvider queryClient={queryClient}>
      <Outlet />
    </AppProvider>
  );
}
