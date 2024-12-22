import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createRouter } from "@tanstack/react-router";

import { RouterProvider } from "@tanstack/react-router";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";

import "./styles/global.css";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
