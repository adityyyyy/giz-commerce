import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { CartItem } from "../types/cart";

export const useGetAllCartItemsQuery = () =>
  useQuery({
    queryKey: ["cartItem", "cart"],
    queryFn: async () => (await apiClient.get<CartItem[]>("api/cart")).data,
  });
