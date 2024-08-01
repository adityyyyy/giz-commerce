import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { Product } from "../types/product";

export const useGetProductQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      (await apiClient.get<{ count: number; data: Product[] }>(`api/product`))
        .data,
  });

export const useGetProductDetailsByIdQuery = (id: number) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/product/${id}`)).data,
  });
