import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupInterceptors } from "./api/interceptors.ts";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

setupInterceptors();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
