import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Muted from "@/components/ui/typography/muted";
import Large from "@/components/ui/typography/large";

interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => {
  return (
    <main className="flex-1 flex-col justify-between gap-4">
      <Navbar />
      <div className="flex flex-col w-full px-6 gap-y-24 py-16 justify-center items-center min-h-[calc(100vh-7rem)]">
        <Outlet />
      </div>
      <Footer />
      <TanStackDevtools
        config={{
          position: "bottom-left",
          openHotkey: ["Alt", "A"],
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </main>
  );
};

const NotFoundComponent = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <Large className="mt-4">Oops! Page not found.</Large>
      <Muted className="mt-2">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Muted>
      <Button asChild className="mt-6">
        <Link to="/">Go to Homepage</Link>
      </Button>
    </div>
  </div>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundComponent,
});
