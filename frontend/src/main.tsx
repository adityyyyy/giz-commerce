import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/home.tsx";
import ProductPage from "./pages/product.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./store.tsx";
import CartPage from "./pages/cart.tsx";
import SignInPage from "./pages/signin.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SignInPage />} />
    </Route>,
  ),
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
);
